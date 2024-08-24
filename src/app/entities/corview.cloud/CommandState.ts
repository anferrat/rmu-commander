import { CommandStatus } from "../../../constants/constants"

export class CommandState {
    siteId: string
    companyId: string
    message: string
    status: CommandStatus
    completionDate: number | null
    timestamp: number //server response time in header. Use to determine response order

    constructor(siteId: string, companyId: string, message: string, status: CommandStatus, completionDate: number, timestamp: number) {
        this.siteId = siteId
        this.companyId = companyId
        this.message = message
        this.status = status
        this.completionDate = completionDate
        this.timestamp = timestamp
    }


}