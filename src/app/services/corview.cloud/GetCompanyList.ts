import { AxiosRepository } from "../../repositories/axios"
import { GetAccessToken } from "../authorization/GetAccessToken"

export class GetCompanyList {
    axiosRepo: AxiosRepository
    getAccessTokenService: GetAccessToken


    constructor(axiosRepo: AxiosRepository, getAccessTokenService: GetAccessToken) {
        this.axiosRepo = axiosRepo
        this.getAccessTokenService = getAccessTokenService
    }


    async execute() {
        const accessToken = await this.getAccessTokenService.execute()
        return await this.axiosRepo.companyRequest(accessToken)
    }
}