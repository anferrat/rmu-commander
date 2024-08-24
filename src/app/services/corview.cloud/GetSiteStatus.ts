import { CommandStatus, SiteStatus } from "../../../constants/constants"
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

        return {
            commandState,
            siteState
        }
    }
}