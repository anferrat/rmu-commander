import { LoginPayload } from "../../entities/LoginPayload"
import { AxiosRepository } from "../../repositories/axios"

export class Login {
    axiosRepo: AxiosRepository

    constructor(authRepo: AxiosRepository) {
        this.axiosRepo = authRepo
    }


    async execute(login: string, password: string) {
        const antiforgeryResponse = await this.axiosRepo.antiforgeryRequest()
        const loginPayload: LoginPayload = new LoginPayload(login, password, antiforgeryResponse.verificationToken!, true)
        if (!antiforgeryResponse.isLoggedIn) {
            await this.axiosRepo.loginRequest(loginPayload)
        }
        return loginPayload.isTest
    }
}