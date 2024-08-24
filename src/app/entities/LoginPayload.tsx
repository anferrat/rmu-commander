export class LoginPayload {
    login: string
    password: string
    verificationToken: string
    rememberLogin: boolean

    constructor(login: string, password: string, verificationToken: string, rememberLogin: boolean) {
        this.login = login
        this.password = password
        this.verificationToken = verificationToken
        this.rememberLogin = rememberLogin
    }

    toString(): string {
        const form = new URLSearchParams({
            'ReturnUrl': '/',
            'UsernameOrEmail': this.login,
            'Password': this.password,
            'button': 'login',
            '__RequestVerificationToken': this.verificationToken,
            'RememberLogin': this.rememberLogin.toString()
        })
        return form.toString()
    }
}