import { AccessToken } from "../../entities/AccessToken"
import { SecureStorage } from "../../repositories/secureStorage"
import { Authorization } from "./Authorization"

export class GetAccessToken {
    authService: Authorization
    secureStorage: SecureStorage
    inProgress = false
    MAX_ATTEMPT = 10 //
    RETRY_TIME = 1000 //ms
    attempts = 0

    constructor(authService: Authorization, secureStorage: SecureStorage) {
        this.authService = authService
        this.secureStorage = secureStorage
    }

    private async _getToken() {
        const shouldLogOut = !(await this.authService.executeSilently())
        if (shouldLogOut)
            throw new Error('shouldLogOut')
        return await this.secureStorage.getAccessToken()
    }

    private async _wait() {
        return new Promise((resolve) => {
            setTimeout(()=>resolve(''), this.RETRY_TIME)
        })
    }

    async execute(): Promise<AccessToken> {
        if (!this.inProgress) {
            this.inProgress = true
            try {
                const accessToken = await this._getToken()
                this.inProgress = false
                return accessToken
            }
            catch (er) {
                this.inProgress = false
                throw er
            }
        }
        else {
            this.attempts++
            if (this.attempts <= this.MAX_ATTEMPT) {
                await this._wait()
                return await this.execute().finally(() => {
                    this.attempts = 0
                })
            }
            else {
                this.attempts = 0
                throw new Error('Unable to get access token. MAX_ATTEMPT reached')
            }
        }
    }
}