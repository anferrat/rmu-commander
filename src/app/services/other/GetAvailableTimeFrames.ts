import { TimeSelectionOptions } from "../../../constants/constants"
import { AxiosRepository } from "../../repositories/axios"
import { GetTimeFrame } from "./GetTimeFrame"

export class GetAvailableTimeFrames {
    // in ms, min time where end date must be greater than the start date
    private MIN_TIME_GAP = 60000
    private axiosRepo: AxiosRepository
    private getTimeFrameService: GetTimeFrame

    constructor(axiosRepo: AxiosRepository, getTimeFrameService: GetTimeFrame) {
        this.axiosRepo = axiosRepo
        this.getTimeFrameService = getTimeFrameService
    }

    async execute() {
        const timestamp = await this.axiosRepo.getTimestamp()
        return Object.values(TimeSelectionOptions).map((option) => this.getTimeFrameService.execute(timestamp, option)).filter(timeFrame => timeFrame.endDate - timeFrame.startDate > this.MIN_TIME_GAP)
    }
}