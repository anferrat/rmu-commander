import { AppSettings } from "../entities/AppSettings";
import { SettingRepo } from "../repositories/settings";

export type Setting = 'savePassword' | 'autoLogin'

export class UpdateSetting {
    settingRepo: SettingRepo
    constructor(settingRepo: SettingRepo) {
        this.settingRepo = settingRepo
    }

    async execute(setting: Setting, value: boolean) {
        const settings = await this.settingRepo.getSettings()
        const newSettings = new AppSettings(setting === 'autoLogin' ? value : settings.autoLogin, setting === 'savePassword' ? value : settings.savePassword)
        await this.settingRepo.updateSettings(newSettings)
    }
}