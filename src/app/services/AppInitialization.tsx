import { AxiosRepository } from "../repositories/axios";
import { NetworkRepository } from "../repositories/network";
import { SecureStorage } from "../repositories/secureStorage";
import { SettingRepo } from "../repositories/settings";
import { SqliteRepository } from "../repositories/sqlite";
import { Authorization } from "./authorization/Authorization";

export class AppInitialization {
    authorizationService: Authorization
    axiosRepo: AxiosRepository
    networkRepo: NetworkRepository
    settingRepo: SettingRepo
    sqliteRepo: SqliteRepository
    secureStorage: SecureStorage

    constructor(authorizationService: Authorization, axiosRepo: AxiosRepository, networkRepo: NetworkRepository, settingRepo: SettingRepo, sqliteRepo: SqliteRepository, secureStorage: SecureStorage) {
        this.authorizationService = authorizationService
        this.axiosRepo = axiosRepo
        this.networkRepo = networkRepo
        this.settingRepo = settingRepo
        this.sqliteRepo = sqliteRepo
        this.secureStorage = secureStorage
    }

    private async _silentAuth(): Promise<boolean> {
        try {
            return await this.authorizationService.executeSilently()
        }
        catch (er) {
            return false
        }
    }

    async execute() {
        await Promise.all([
            this.settingRepo.initialize(),
            this.sqliteRepo.initialize()
        ])
        return await this._silentAuth()
    }
}