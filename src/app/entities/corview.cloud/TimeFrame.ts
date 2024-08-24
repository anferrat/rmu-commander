import { TimeSelectionOptions } from "../../../constants/constants"

export class TimeFrame {
    startDate: number
    endDate: number
    timeSelectionOption: TimeSelectionOptions
    constructor(startDate: number, endDate: number, timeSelectionOption: TimeSelectionOptions) {
        this.startDate = startDate
        this.endDate = endDate
        this.timeSelectionOption = timeSelectionOption
    }
}