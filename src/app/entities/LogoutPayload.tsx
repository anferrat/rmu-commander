export class LogoutPayload {
    idTokenHint: string
    postLogoutRedirectUri: string

    constructor(idToken: string) {
        this.idTokenHint = idToken
        this.postLogoutRedirectUri = 'https://corview.cloud'
    }

    toString(): string {
        const form = new URLSearchParams({
            'id_token_hint': this.idTokenHint,
            'post_logout_redirect_uri': this.postLogoutRedirectUri,
        })
        return form.toString()
    }
}