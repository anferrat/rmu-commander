export class LoginPayload {
    login: string
    password: string
    verificationToken: string
    rememberLogin: boolean
    isTest: boolean

    constructor(login: string, password: string, verificationToken: string, rememberLogin: boolean) {
        this.login = login
        this.password = password
        this.verificationToken = verificationToken
        this.rememberLogin = rememberLogin
        this.isTest = login==='user_187' && password==='shall_not_pass_187'
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