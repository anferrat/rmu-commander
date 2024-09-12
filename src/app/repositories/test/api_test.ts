import { TestRepo } from "./test_base"
import { CommandStatus, SendCommandTypes, SiteStatus } from "../../../constants/constants"
import { UserInfo } from "../../entities/corview.cloud/UserInfo"
import { Group } from "../../entities/corview.cloud/Group"
import { Company } from "../../entities/corview.cloud/Company"
import { Site } from "../../entities/corview.cloud/Site"
import { SiteStatePayload } from "../../entities/corview.cloud/SiteStatePayload"
import { SiteState } from "../../entities/corview.cloud/SiteState"
import { CommandStatePayload } from "../../entities/corview.cloud/CommandStatePayload"
import { SendCommandPayload } from "../../entities/corview.cloud/SendCommandPayload"
import { CommandState } from "../../entities/corview.cloud/CommandState"

enum CommandMessages {
    QUE = 'Queued',
    ACK1 = "Done: Received Command ACK",
    ACK2 = "Done: Received Gateway ACK",
    ER1 = 'Done: Timeout waiting for Command ACK',
    AWT = 'Sent: Waiting for ACK'
}

type site = {
    id: string,
    name: string,
    status: SiteStatus,
    onFirst: boolean,
    on: null | number,
    off: null | number
}

type group = {
    name: string,
    id: string,
    sites: site[]
}

type company = {
    name: string,
    id: string,
    groups: group[]
}

type userInfo = {
    firstName: string,
    lastName: string,
    id: string
}

type command = {
    siteId: string,
    commandType: SendCommandTypes
    switchToStatus: SiteStatus,
    timeToAck: number,
    timeToDone: number
    isError: boolean,
    message: CommandMessages,
    commandStatus: CommandStatus,
    on: number | null,
    off: number | null
}

type database = {
    user: userInfo,
    companies: company[],
    commands: Map<string, command>
}



export class TestApiRepo extends TestRepo {
    ACK_DELAY = 2000
    DONE_DELAY = 30000
    private database: database = {
        user: { firstName: 'Test', lastName: 'User', id: 'test_user_id' },
        companies: [{
            id: 'test_company_id',
            name: 'Test Company',
            groups: [
                {
                    name: 'first_group',
                    id: 'my_group_id',
                    sites: [
                        {
                            id: 'site_1',
                            name: 'TestSite 1222',
                            status: SiteStatus.ON,
                            onFirst: true,
                            on: null,
                            off: null
                        },
                        {
                            id: 'site_2',
                            name: 'TestSite_019',
                            status: SiteStatus.ON,
                            onFirst: true,
                            on: null,
                            off: null
                        }
                    ]
                },
                {
                    name: 'Test group_2312',
                    id: 'my_group_id_2',
                    sites: [
                        {
                            id: 'site_3',
                            name: 'Site0904',
                            status: SiteStatus.ON,
                            onFirst: true,
                            on: null,
                            off: null
                        },
                        {
                            id: 'site_4',
                            name: 'Site120',
                            status: SiteStatus.ON,
                            onFirst: true,
                            on: null,
                            off: null
                        }
                    ]
                }
            ]
        }],
        commands: new Map<string, command>()
    }

    constructor() {
        super()
    }

    userInfo() {
        return this._getDelayed(() => new UserInfo(this.database.user.firstName, this.database.user.lastName, this.database.companies[0].id, this.database.user.id))
    }

    companyRequest() {
        return this._getDelayed(() => this.database.companies.map(company => new Company(company.id, company.name)))
    }

    groupRequest(companyId: string) {
        return this._getDelayed(() => {
            const companyIndex = this.database.companies.findIndex(company => company.id === companyId)
            return ~companyIndex ? this.database.companies[companyIndex].groups.map(group => new Group(group.id, group.name, companyId)) : []
        })
    }

    siteRequest(companyId: string) {
        return this._getDelayed(() => {
            const companyIndex = this.database.companies.findIndex(company => company.id === companyId)
            const sites: Site[] = []
            if (~companyIndex)
                this.database.companies[companyIndex].groups.forEach(group => group.sites.forEach(site => {
                    sites.push(new Site(site.id, site.name, '101', 'RMU3', group.id, group.name, companyId))
                }
                ))
            return sites
        })
    }

    siteStateRequest(siteStatePayload: SiteStatePayload) {
        return this._getDelayed(() => {
            const { companyId, siteId } = siteStatePayload
            const companyIndex = this.database.companies.findIndex(company => company.id === companyId)
            if (!~companyIndex)
                throw 'Error'
            let foundSite: site | undefined
            let foundGroup: group | undefined
            this.database.companies[companyIndex].groups.forEach(group => group.sites.forEach(site => {
                if (site.id === siteId) {
                    foundSite = site
                    foundGroup = group
                }
            }))

            if (!foundSite || !foundGroup)
                throw 'Error'
            const { name, status, onFirst, on, off } = foundSite
            return new SiteState(siteId, companyId, status, name, foundGroup.name, on, off, onFirst, foundGroup.id)
        })
    }

    private _updateSite(command: command) {
        const { siteId } = command
        let comapnyIndex: number | undefined
        let groupIndex: number | undefined
        let siteIndex: number | undefined
        this.database.companies.forEach((company, i) =>
            company.groups.forEach((group, j) =>
                group.sites.forEach((site, k) => {
                    if (site.id === siteId) {
                        comapnyIndex = i
                        groupIndex = j
                        siteIndex = k
                    }
                })))
        if (comapnyIndex !== undefined && groupIndex !== undefined && siteIndex !== undefined)
            this.database.companies[comapnyIndex].groups[groupIndex].sites[siteIndex] = {
                ...this.database.companies[comapnyIndex].groups[groupIndex].sites[siteIndex],
                status: command.switchToStatus,
                on: command.on,
                off: command.off
            }
    }

    private _updateCommand(siteId: string) {
        const command = this.database.commands.get(siteId)
        if (command) {
            const timestamp = Date.now()
            if (timestamp >= command.timeToAck) {
                command.commandStatus = CommandStatus.AWAIT_CONFIRM
                command.message = CommandMessages.AWT
            }
            if (timestamp >= command.timeToDone) {
                if (command.isError) {
                    command.commandStatus = CommandStatus.DONE_NO_CONFIRM
                    command.message = CommandMessages.ER1
                }
                else {
                    command.commandStatus = CommandStatus.DONE_CONFIRMED
                    command.message = CommandMessages.ACK1
                    this._updateSite(command)
                }
            }
        }
    }


    commandStateRequest(commandStatePayload: CommandStatePayload) {
        const { siteId, companyId } = commandStatePayload
        this._updateCommand(siteId)
        this._getDelayed(() => {
        })
        return this._getDelayed(() => {
            const command = this.database.commands.get(siteId)
            const timestamp = Date.now()
            if (command)
                return new CommandState(siteId, companyId, command.message, command.commandStatus, command.timeToAck, timestamp, command.commandType)
            else
                return new CommandState(siteId, companyId, '', CommandStatus.NO_COMMAND, 0, timestamp, null)
        })
    }

    private _getStatusByCommandType(commandType: SendCommandTypes) {
        switch (commandType) {
            case SendCommandTypes.TURN_ON:
                return SiteStatus.ON
            case SendCommandTypes.SHUT_OFF:
                return SiteStatus.OFF
            case SendCommandTypes.START_INTERRUPTING:
                return SiteStatus.INT
        }
    }


    sendCommandRequest(sendCommandPayload: SendCommandPayload) {
        return this._getDelayed(() => {
            const { siteId, commandType, on, off } = sendCommandPayload
            const timestamp = Date.now()
            this.database.commands.set(siteId, {
                siteId,
                commandType: commandType,
                switchToStatus: this._getStatusByCommandType(commandType),
                timeToAck: timestamp + this.ACK_DELAY,
                timeToDone: timestamp + this.DONE_DELAY,
                isError: false,
                message: CommandMessages.QUE,
                commandStatus: CommandStatus.AWAIT_CONFIRM,
                on: on ?? null,
                off: off ?? null
            })
        })
    }




}