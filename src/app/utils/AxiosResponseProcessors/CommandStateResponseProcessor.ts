import { CommandStatus, SendCommandTypes } from "../../../constants/constants";
import { CommandState } from "../../entities/corview.cloud/CommandState";
import { CommandStatePayload } from "../../entities/corview.cloud/CommandStatePayload";

export interface CommandHistoryResponse {
    data: {
        success: boolean,
        doneMessage: string,
        doneDate: string,
        commandDate: string,
        msgWebCommand: {
            id: string
        }


    }[],
    total: number
}

export class CommandStateResponseProcessor {
    constructor() {
    }

    private _getDate(dateString: string) {
        try {
            return new Date(dateString).getTime()
        }
        catch (er) {
            return Date.now()
        }
    }

    private _getDoneMessage = (data: CommandHistoryResponse, commandType: SendCommandTypes | null) => {
        if (data.total === 0 || commandType === null)
            return ''
        else return data.data[0].doneMessage
    }

    private _getCommandStatus(data: CommandHistoryResponse, commandType: SendCommandTypes | null) {
        if (data.total === 0 || commandType === null)
            return CommandStatus.NO_COMMAND
        else if (data.data[0].success && data.data[0].doneDate !== null)
            return CommandStatus.DONE_CONFIRMED
        else if (data.data[0].doneDate === null)
            return CommandStatus.AWAIT_CONFIRM
        else
            //Not sure here how to capture error state. Needs more testing with actually failing commands, which is difficult to reproduce
            return CommandStatus.DONE_NO_CONFIRM
    }

    private _getCommandType(data: CommandHistoryResponse) {
        if (data.total === 0)
            return null
        else {
            switch (data.data[0].msgWebCommand.id) {
                case "2":
                    return SendCommandTypes.START_INTERRUPTING
                case "4":
                    return SendCommandTypes.TURN_ON
                case "5":
                    return SendCommandTypes.SHUT_OFF
                default:
                    return null
            }
        }
    }

    private _getDoneTime(data: CommandHistoryResponse, commandStatus: CommandStatus) {
        if (data.total === 0)
            return 0
        else
            if (data.data[0].doneDate === null)
                return 0
            else switch (commandStatus) {
                case CommandStatus.AWAIT_CONFIRM:
                    return 0
                default:
                    return new Date(data.data[0].doneDate).getTime()
            }
    }


    execute(payload: CommandStatePayload, data: CommandHistoryResponse, headers: any) {
        const timestamp = this._getDate(headers['date'])
        const commandType = this._getCommandType(data)
        const commandStatus = this._getCommandStatus(data, commandType)
        const doneMessage = this._getDoneMessage(data, commandType)
        const doneTime = this._getDoneTime(data, commandStatus)
        return new CommandState(payload.siteId, payload.companyId, doneMessage, commandStatus, doneTime, timestamp, commandType)
    }

}