import { CommandState } from "../../../app/entities/corview.cloud/CommandState";
import { SiteState } from "../../../app/entities/corview.cloud/SiteState";
import { SiteStatus, TimeSelectionOptions } from "../../../constants/constants";

export const convertDataToStateValues = (commandState: CommandState, siteState: SiteState) => {
    const { siteName, status, groupName, on, off, onFirst, groupId } = siteState
    const { message } = commandState
    const isInterrupting = status === SiteStatus.INT
    return {
        siteName,
        groupId,
        groupName,
        status,
        doneMessage: message,
        on: isInterrupting ? on : null,
        off: isInterrupting ? off : null,
        onFirst,
        commandType: commandState.commandType
    }
}

export const getEndTime = (startDate: number, endDate: number) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const timeString = end.toLocaleString('default', { hour: '2-digit', minute: '2-digit' })
    if (start.getDate() === end.getDate())
        return timeString
    else
        return `${end.toLocaleString('default', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
}

export const isTimeDescriptionVisible = (timeSelectionOption: TimeSelectionOptions) => {
    switch (timeSelectionOption) {
        case TimeSelectionOptions.UNTIL_12_AM:
        case TimeSelectionOptions.UNTIL_3_PM:
        case TimeSelectionOptions.UNTIL_6_PM:
            return false
        default:
            return true
    }
}