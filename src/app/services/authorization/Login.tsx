import { LoginPayload } from "../../entities/LoginPayload"
import { AxiosRepository } from "../../repositories/axios"

export class Login {
    axiosRepo: AxiosRepository

    constructor(authRepo: AxiosRepository) {
        this.axiosRepo = authRepo
    }


    async execute(login: string, password: string) {
        const antiforgeryResponse = await this.axiosRepo.antiforgeryRequest()
        if (!antiforgeryResponse.isLoggedIn) {
            const loginPayload: LoginPayload = new LoginPayload(login, password, antiforgeryResponse.verificationToken!, true)
            await this.axiosRepo.loginRequest(loginPayload)
        }
    }

}