import { CommandStatus, SendCommandTypes, SiteStatus } from "../../../constants/constants"
import { CommandStatePayload } from "../../entities/corview.cloud/CommandStatePayload"
import { SiteStatePayload } from "../../entities/corview.cloud/SiteStatePayload"
import { AxiosRepository } from "../../repositories/axios"
import { GetAccessToken } from "../authorization/GetAccessToken"

export class GetSiteStatus {
    axiosRepo: AxiosRepository
    getAccessTokenService: GetAccessToken


    constructor(axiosRepo: AxiosRepository, getAccessTokenService: GetAccessToken) {
        this.axiosRepo = axiosRepo
        this.getAccessTokenService = getAccessTokenService
    }

    private _getStatusFromCommandType(commandType: SendCommandTypes) {
        switch (commandType) {
            case SendCommandTypes.TURN_ON:
                return SiteStatus.ON
            case SendCommandTypes.SHUT_OFF:
                return SiteStatus.OFF
            case SendCommandTypes.START_INTERRUPTING:
                return SiteStatus.INT
        }
    }

    async execute(siteId: string, companyId: string) {
        const [accessToken, timestamp] = await Promise.all([
            this.getAccessTokenService.execute(),
            this.axiosRepo.getTimestamp()
        ])
        const endDate = timestamp + 3600000
        const startDate = endDate - 86400000
        const siteStatePayload = new SiteStatePayload(siteId, companyId)
        const commandStatePayload = new CommandStatePayload(companyId, siteId, startDate, endDate)
        const [commandState, siteState] = await Promise.all([
            this.axiosRepo.commandStateRequest(accessToken, commandStatePayload),
            this.axiosRepo.siteStateRequest(accessToken, siteStatePayload)
        ])

        if (commandState.status === CommandStatus.AWAIT_CONFIRM)
            siteState.setStatus(SiteStatus.AWT)
        else if (commandState.status === CommandStatus.DONE_CONFIRMED || commandState.status === CommandStatus.DONE_NO_CONFIRM) {
            const dif = commandState.completionDate! - timestamp
            if (dif < 15000)
                if (commandState.commandType !== null)
                    siteState.setStatus(this._getStatusFromCommandType(commandState.commandType))
        }

        return {
            commandState,
            siteState
        }
    }
}