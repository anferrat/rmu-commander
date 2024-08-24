export class AppSettings {
    autoLogin: boolean
    savePassword: boolean

    constructor(autoLogin: boolean, savePassword: boolean) {
        this.autoLogin = autoLogin
        this.savePassword = savePassword
    }

    static getDefault() {
        return new AppSettings(true, true)
    }
}