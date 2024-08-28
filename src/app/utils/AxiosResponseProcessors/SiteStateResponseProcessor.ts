import { SiteStatus } from "../../../constants/constants"
import { SiteState } from "../../entities/corview.cloud/SiteState"

export interface SiteStateResponse {
    data: {
        id: string,
        name: string
        company: {
            id: string
        },
        group: {
            id: string,
            displayName: string
        }
        lastReading: {
            rmuInterruptStatus: {
                id: string
            }
        },
        lastInterruptMsgCommand: {
            interruptCycleTimeMs: number | null,
            interruptOffTimeMs: number | null
        },
        interruptCycleOrder: {
            id: string
        }

    }[]
}

export class SiteStateResponseProcessor {
    constructor() { }

    private _getCycleTimes(totalCycle: number | null, offCycle: number | null) {
        try {
            if (totalCycle && offCycle && totalCycle !== null && offCycle !== null)
                return {
                    on: totalCycle - offCycle,
                    off: offCycle
                }
            else throw 'oops'
        }
        catch {
            return {
                on: null,
                off: null
            }
        }
    }

    private _getStatus(statusId: string) {
        switch (statusId) {
            case 'JustOn':
            case 'On':
                return SiteStatus.ON
            case 'Off':
            case 'JustOff':
                return SiteStatus.OFF
            case 'OnCycling':
            case 'OffCycling':
                return SiteStatus.INT
            default:
                throw '100'
        }
    }


    execute(data: SiteStateResponse) {
        const { on, off } = this._getCycleTimes(data.data[0].lastInterruptMsgCommand.interruptCycleTimeMs, data.data[0].lastInterruptMsgCommand.interruptOffTimeMs)
        const onFirst = data.data[0].interruptCycleOrder.id !== 'OffFirst'
        const status = this._getStatus(data.data[0].lastReading.rmuInterruptStatus.id)
        const siteId = data.data[0].id
        const companyId = data.data[0].company.id
        const siteName = data.data[0].name
        const groupName = data.data[0].group.displayName
        const groupId = data.data[0].group.id
        return new SiteState(siteId, companyId, status, siteName, groupName, on, off, onFirst, groupId)
    }
}