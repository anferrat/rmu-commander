import { SendCommandTypes } from "../../../constants/constants";

interface PayloadType {
    accessCode: string,
    commandId: number,
    companyId: string,
    cycleOrderType: string,
    fastSampleTier: number,
    fotaFileName: string,
    groupId: string,
    includeInactiveSites: boolean,
    nonMatchingCycleOrderOnly: boolean,
    rdl1ReportInterval: number,
    reportInterval: number,
    siteId: string,
    siteSelectionTypeId: string,
    userId: string,
    cycleTimeMs?: string,
    endDateUtc?: string,
    offTimeMs?: string,
    startDateUtc?: string,
    rectifierStateNote?: string,
}


export class SendCommandPayload {
    private commandType: SendCommandTypes
    private userId: string
    siteId: string
    private groupId: string
    companyId: string
    private onFirst: boolean
    private on?: number
    private off?: number
    private startTime?: number
    private endTime?: number
    private note?: string

    constructor(commandType: SendCommandTypes, userId: string, siteId: string, groupId: string, companyId: string, onFirst: boolean, on?: number, off?: number, startTime?: number, endTime?: number, note?: string) {
        this.commandType = commandType
        this.userId = userId
        this.groupId = groupId
        this.siteId = siteId
        this.companyId = companyId
        this.onFirst = onFirst
        this.on = on
        this.off = off
        this.startTime = startTime
        this.endTime = endTime
        this.note = note
    }

    private _getCommandId() {
        switch (this.commandType) {
            case SendCommandTypes.TURN_ON:
                return 3
            case SendCommandTypes.SHUT_OFF:
                return 4
            case SendCommandTypes.START_INTERRUPTING:
                return 5
        }
    }

    getUrl() {
        switch (this.commandType) {
            case SendCommandTypes.TURN_ON:
                return 'https://api.corview.cloud/v1/MsgCommand/cmd/RectifierOn'
            case SendCommandTypes.SHUT_OFF:
                return 'https://api.corview.cloud/v1/MsgCommand/cmd/RectifierOff'
            case SendCommandTypes.START_INTERRUPTING:
                return 'https://api.corview.cloud/v1/MsgCommand/cmd/ContinuousInterruption'
        }
    }

    toString() {
        const payload: PayloadType = {
            accessCode: "",
            commandId: this._getCommandId(),
            companyId: this.companyId,
            cycleOrderType: this.onFirst ? "OnFirst" : "OffFirst",
            fastSampleTier: 0,
            fotaFileName: "",
            groupId: this.groupId,
            includeInactiveSites: false,
            nonMatchingCycleOrderOnly: false,
            rdl1ReportInterval: 0,
            reportInterval: 0,
            siteId: this.siteId,
            siteSelectionTypeId: "siteName",
            userId: this.userId,
        }

        if (this.commandType === SendCommandTypes.START_INTERRUPTING) {
            if (this.endTime && this.startTime && this.on && this.off && this.note !== undefined) {
                payload.endDateUtc = new Date(this.endTime).toISOString()
                payload.startDateUtc = new Date(this.startTime).toISOString()
                payload.cycleTimeMs = (this.on + this.off).toFixed(0)
                payload.offTimeMs = this.off.toFixed(0)
                payload.rectifierStateNote = this.note
            }
        }
        return JSON.stringify(payload)
    }
}