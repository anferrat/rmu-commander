import { SiteStatePayload } from "../../entities/corview.cloud/SiteStatePayload"
import { AxiosRepository } from "../../repositories/axios"
import { GetAccessToken } from "../authorization/GetAccessToken"

export class GetSiteName {
    axiosRepo: AxiosRepository
    getAccessTokenService: GetAccessToken


    constructor(axiosRepo: AxiosRepository, getAccessTokenService: GetAccessToken) {
        this.axiosRepo = axiosRepo
        this.getAccessTokenService = getAccessTokenService
    }

    async execute(siteId: string, companyId: string) {
        const accessToken = await this.getAccessTokenService.execute()
        const siteStatePayload = new SiteStatePayload(siteId, companyId)
        return (await this.axiosRepo.siteStateRequest(accessToken, siteStatePayload)).siteName
    }
}