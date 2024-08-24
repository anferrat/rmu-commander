import { SendCommandPayload } from "../../entities/corview.cloud/SendCommandPayload"
import { AxiosRepository } from "../../repositories/axios"
import { GetAccessToken } from "../authorization/GetAccessToken"
import { CommandListener } from "./CommandListener"

export class SendCommand {
    axiosRepo: AxiosRepository
    getAccessTokenService: GetAccessToken
    commandListenerService: CommandListener


    constructor(axiosRepo: AxiosRepository, getAccessTokenService: GetAccessToken, commandListenerService: CommandListener) {
        this.axiosRepo = axiosRepo
        this.getAccessTokenService = getAccessTokenService
        this.commandListenerService = commandListenerService
    }

    private async _addItemHandler(siteId: string, companyId: string) {
        try {
            await this.commandListenerService.addItem(siteId, companyId)
            return true
        }
        catch {
            return false
        }
    }

    async execute(sendCommandPayload: SendCommandPayload) {
        const accessToken = await this.getAccessTokenService.execute()
        const autoUpdate = await this._addItemHandler(sendCommandPayload.siteId, sendCommandPayload.companyId)
        await this.axiosRepo.sendCommandRequest(accessToken, sendCommandPayload)
        return autoUpdate
    }
}