import { AccessToken } from "../../entities/AccessToken"
import { AuthorizationPayload } from "../../entities/AuthorizationPayload"
import { TokenPayload } from "../../entities/TokenPayload"
import { AxiosRepository } from "../../repositories/axios"
import { SecureStorage } from "../../repositories/secureStorage"
import { CryptoUtil } from "../../utils/Crypto"

export class TokenService {
    axiosRepo: AxiosRepository
    crypto: CryptoUtil
    secureStorage: SecureStorage
    constructor(authRepo: AxiosRepository, crypto: CryptoUtil, secureStorage: SecureStorage) {
        this.axiosRepo = authRepo
        this.crypto = crypto
        this.secureStorage = secureStorage
    }

    private _genAuthPayload(isNew: boolean, isTest: boolean, codeVerifier: string): AuthorizationPayload {
        const state = this.crypto.createRandom(40)
        const nonce = this.crypto.createRandom(40)
        const codeChallenge = this.crypto.createCodeChallenge(codeVerifier)
        return new AuthorizationPayload(isNew, nonce, state, codeChallenge, isTest)
    }

    async execute(isNew: boolean, isTest: boolean): Promise<void> {
        const codeVerifier: string = this.crypto.createRandom(67)
        const code = await this.axiosRepo.authorizeRequest(this._genAuthPayload(isNew, isTest, codeVerifier))
        const tokenPayload = new TokenPayload(isNew, codeVerifier, code)
        const accessToken: AccessToken = await this.axiosRepo.tokenRequest(tokenPayload)
        await this.secureStorage.setAccessToken(accessToken)
    }
}