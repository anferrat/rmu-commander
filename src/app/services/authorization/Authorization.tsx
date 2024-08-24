import { AccessToken } from "../../entities/AccessToken";
import { AppSettings } from "../../entities/AppSettings";
import { Credentials } from "../../entities/Credentials";
import { AxiosRepository } from "../../repositories/axios";
import { NetworkRepository } from "../../repositories/network";
import { SecureStorage } from "../../repositories/secureStorage";
import { SettingRepo } from "../../repositories/settings";
import { Login } from "./Login";
import { TokenService } from "./TokenService";

export class Authorization {
    secureStorageRepo: SecureStorage
    loginService: Login
    tokenService: TokenService
    settingRepo: SettingRepo
    networkRepo: NetworkRepository
    axiosRepo: AxiosRepository
    NETWORK_LAG: number = 5 // value in sec before expiration of current token, when new token should be requested

    constructor(secureStorageRepo: SecureStorage, loginService: Login, tokenService: TokenService, settingRepo: SettingRepo, networkRepo: NetworkRepository, axiosRepo: AxiosRepository) {
        this.secureStorageRepo = secureStorageRepo
        this.loginService = loginService
        this.tokenService = tokenService
        this.settingRepo = settingRepo
        this.networkRepo = networkRepo
        this.axiosRepo = axiosRepo
    }

    async execute(login: string, password: string, savePassword: boolean, autoLogin: boolean): Promise<void> {
        const isInternetOn: boolean = await this.networkRepo.checkConnection()
        if (isInternetOn) {
            await Promise.all([
                this.loginService.execute(login, password),
            ])
            //Save credentials only if login successfull
            if (savePassword) {
                const credentials = new Credentials(true, login, password)
                await this.secureStorageRepo.setCredentials(credentials)
            }
            await this.tokenService.execute(true)

        }
        else
            throw new Error('No internet access')
    }


    async executeSilently(): Promise<boolean> {
        const [settings, isInternetOn] = await Promise.all([
            this.settingRepo.getSettings(),
            this.networkRepo.checkConnection()
        ])
        if (isInternetOn) {
            try {
                const [accessToken, timestamp]: [AccessToken, number] = await Promise.all([
                    this.secureStorageRepo.getAccessToken(),
                    this.axiosRepo.getTimestamp()
                ])
                const { exp, nbf } = accessToken.decode()
                if (!(timestamp > nbf && timestamp < (exp - this.NETWORK_LAG))) {
                    //Token expired
                    //try to get new token with current credentials
                    await this.secureStorageRepo.removeAccessToken()
                    await this.tokenService.execute(true)
                }
                // Token was issued and it is valid
                return true
            }
            catch (er) {
                //Unable to get access token - attempting to login
                if (settings.autoLogin) {
                    const { username, password } = await this.secureStorageRepo.getCredentials()
                    if (username === null || password === null)
                        return false
                    try {
                        await this.loginService.execute(username, password)
                        await this.tokenService.execute(true)
                        return true
                    }
                    catch (er) {
                        return false
                    }
                }
                else
                    return false
            }
        }
        else
            throw new Error('No internet access')
    }
}