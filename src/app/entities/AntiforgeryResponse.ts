export class AntiforgeryResponse {
    isLoggedIn: boolean
    verificationToken: string | null

    constructor(isLoggedIn: boolean, verificationToken: string | null) {
        this.isLoggedIn = isLoggedIn
        this.verificationToken = verificationToken
    }
}