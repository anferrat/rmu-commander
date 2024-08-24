import { CommandStatePayload } from "../../entities/corview.cloud/CommandStatePayload"
import { AxiosRepository } from "../../repositories/axios"
import { SqliteRepository } from "../../repositories/sqlite"
import { GetAccessToken } from "../authorization/GetAccessToken"

export class TestForDevOnly {
    axiosRepo: AxiosRepository
    getAccessTokenService: GetAccessToken
    sqliteRepo: SqliteRepository

    constructor(axiosRepo: AxiosRepository, getAccessTokenService: GetAccessToken, sqliteRepo: SqliteRepository) {
        this.axiosRepo = axiosRepo
        this.getAccessTokenService = getAccessTokenService
        this.sqliteRepo = sqliteRepo
    }


    async execute() {
        this.sqliteRepo.reset()
        /*const accessToken = await this.getAccessTokenService.execute()
        const endDate = Date.now() + 3600000
        const startDate = endDate - 24 * 3600000
        const siteStatusPayload = new CommandStatePayload('549dc472-496f-4e15-b99b-2fcd9a82ad03', '3887de53-a763-4b06-ac01-26fbee9b3369', startDate, endDate)
        return await this.axiosRepo.commandStateRequest(accessToken, siteStatusPayload)

        */
    }
}