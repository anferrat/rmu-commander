export class LogoutPayload {
    idTokenHint: string
    postLogoutRedirectUri: string
    isTest: boolean

    constructor(idToken: string, isTest: boolean) {
        this.idTokenHint = idToken
        this.postLogoutRedirectUri = 'https://corview.cloud'
        this.isTest = isTest
    }

    toString(): string {
        const form = new URLSearchParams({
            'id_token_hint': this.idTokenHint,
            'post_logout_redirect_uri': this.postLogoutRedirectUri,
        })
        return form.toString()
    }
}