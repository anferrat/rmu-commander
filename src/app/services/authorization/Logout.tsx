import { AccessToken } from "../../entities/AccessToken";
import { LogoutPayload } from "../../entities/LogoutPayload";
import { AxiosRepository } from "../../repositories/axios";
import { SecureStorage } from "../../repositories/secureStorage";

export class LogoutService {
    axiosRepo: AxiosRepository
    secureStorage: SecureStorage

    constructor(axiosRepo: AxiosRepository, secureStorage: SecureStorage) {
        this.axiosRepo = axiosRepo
        this.secureStorage = secureStorage
    }

    async execute() {
        const accessToken: AccessToken = await this.secureStorage.getAccessToken()
        const { idToken } = accessToken
        const logoutPayload = new LogoutPayload(idToken)
        await Promise.all([
            this.axiosRepo.logout(logoutPayload),
            this.secureStorage.removeAccessToken()
        ])
    }
}