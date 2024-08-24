import { TimeSelectionOptions } from "../../../constants/constants"
import { TimeFrame } from "../../entities/corview.cloud/TimeFrame"

export class GetTimeFrame {
    constructor() { }



    private _roundTimestamp(timestamp: number) {
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const monthIndex = date.getUTCMonth()
        const day = date.getUTCDate()
        const hours = date.getUTCHours()
        const minutes = date.getUTCMinutes()
        return Date.UTC(year, monthIndex, day, hours, minutes, 0)
    }

    private _getTimestampToHour(timestamp: number, hour: number) {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const monthIndex = date.getMonth()
        const day = date.getDate()
        return new Date(year, monthIndex, day, hour, 0, 0).getTime()
    }

    private _getMidnightTimestamp(timestamp: number) {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const monthIndex = date.getMonth()
        const day = date.getDate()
        return new Date(year, monthIndex, day, 0, 0, 0).getTime() + 8.64e+7
    }

    private _getEndDate(timestamp: number, timeSelectionOption: TimeSelectionOptions) {
        switch (timeSelectionOption) {
            case TimeSelectionOptions.ONE_HOUR:
                return timestamp + 3.6e+6
            case TimeSelectionOptions.TWO_HOURS:
                return timestamp + 7.2e+6
            case TimeSelectionOptions.FOUR_HOURS:
                return timestamp + 1.44e+7
            case TimeSelectionOptions.EIGHT_HOURS:
                return timestamp + 2.88e+7
            case TimeSelectionOptions.TWELVE_HOURS:
                return timestamp + 4.32e+7
            case TimeSelectionOptions.TWENTY_FOUR_HOURS:
                return timestamp + 8.64e+7
            case TimeSelectionOptions.UNTIL_3_PM:
                return this._getTimestampToHour(timestamp, 15)
            case TimeSelectionOptions.UNTIL_6_PM:
                return this._getTimestampToHour(timestamp, 18)
            case TimeSelectionOptions.UNTIL_12_AM:
                return this._getMidnightTimestamp(timestamp)
            default:
                throw new Error('Unknown option selected')
        }
    }

    execute(timestamp: number, timeSelectionOption: TimeSelectionOptions) {
        const roundedTimestamp = this._roundTimestamp(timestamp)
        return new TimeFrame(roundedTimestamp, this._getEndDate(roundedTimestamp, timeSelectionOption), timeSelectionOption)
    }
}