import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppSettings } from "../entities/AppSettings"

export class SettingRepo {
    constructor() {

    }

    async initialize() {
        try {
            const data = await AsyncStorage.getItem('settings')
            if (data === null) {
                const defaultSettings = AppSettings.getDefault()
                await AsyncStorage.setItem('settings', JSON.stringify(defaultSettings))
            }
        }
        catch (er) {
            //No error throws on initializion
        }
    }


    async getSettings() {
        try {
            const data = await AsyncStorage.getItem('settings')
            if (data !== null) {
                const { autoLogin, savePassword } = JSON.parse(data)
                return new AppSettings(autoLogin, savePassword)
            }
            else throw 'oops'
        }
        catch (er) {
            throw new Error('Unable to get settings')
        }
    }

    async updateSettings(appSettings: AppSettings) {
        try {
            const data = await AsyncStorage.setItem('settings', JSON.stringify(appSettings))
        }
        catch (er) {
            throw new Error('Unable to update settings')
        }
    }


}