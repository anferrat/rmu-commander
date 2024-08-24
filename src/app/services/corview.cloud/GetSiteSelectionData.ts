import { AxiosRepository } from "../../repositories/axios";
import { GetAccessToken } from "../authorization/GetAccessToken";

export class GetSiteSelectionData {
    axiosRepo: AxiosRepository
    getAccessTokenService: GetAccessToken


    constructor(axiosRepo: AxiosRepository, getAccessTokenService: GetAccessToken) {
        this.axiosRepo = axiosRepo
        this.getAccessTokenService = getAccessTokenService
    }



    async execute(companyId: string) {
        const accessToken = await this.getAccessTokenService.execute()

        const [sites, groups] = await Promise.all([
            this.axiosRepo.siteRequest(accessToken, companyId),
            this.axiosRepo.groupRequest(accessToken, companyId)
        ])

        return {
            sites,
            groups
        }
    }
}