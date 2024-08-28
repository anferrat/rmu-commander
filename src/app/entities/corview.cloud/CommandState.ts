import { CommandStatus, SendCommandTypes } from "../../../constants/constants"

export class CommandState {
    siteId: string
    companyId: string
    message: string
    status: CommandStatus
    commandType: SendCommandTypes | null
    completionDate: number | null
    timestamp: number //server response time in header. Use to determine response order

    constructor(siteId: string, companyId: string, message: string, status: CommandStatus, completionDate: number, timestamp: number, commandType: SendCommandTypes | null) {
        this.siteId = siteId
        this.companyId = companyId
        this.message = message
        this.status = status
        this.completionDate = completionDate
        this.timestamp = timestamp
        this.commandType = commandType
    }


}