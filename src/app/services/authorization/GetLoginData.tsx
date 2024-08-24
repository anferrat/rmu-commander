import { AppSettings } from "../../entities/AppSettings";
import { Credentials } from "../../entities/Credentials";
import { LoginData } from "../../entities/LoginData";
import { SecureStorage } from "../../repositories/secureStorage";
import { SettingRepo } from "../../repositories/settings";

export class GetLoginData {
    settingRepo: SettingRepo
    secureStorage: SecureStorage
    constructor(settingRepo: SettingRepo, secureStorage: SecureStorage) {
        this.settingRepo = settingRepo
        this.secureStorage = secureStorage
    }

    async execute() {
        const settings: AppSettings = await this.settingRepo.getSettings()
        let credentials = new Credentials(false, null, null)
        if (!settings.savePassword) {
            await this.secureStorage.removeCredentials()
        }
        credentials = await this.secureStorage.getCredentials()

        return new LoginData(credentials, settings)
    }
}