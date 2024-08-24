export class TokenPayload {
    grantType: string
    clientId: string
    codeVerifier: string
    code: string
    redirectUri: string


    constructor(isNew: boolean, codeVerifier: string, code: string) {
        this.grantType = 'authorization_code'
        this.clientId = 'corViewSpa'
        this.codeVerifier = codeVerifier
        this.code = code
        this.redirectUri = isNew ? 'https://www.corview.cloud/auth-return' : 'https://www.corview.cloud/silent-renew.html'
    }

    toString(): string {
        const params = new URLSearchParams({
            'grant_type': this.grantType,
            'client_id': this.clientId,
            'code_verifier': this.codeVerifier,
            'code': this.code,
        })
        return params.toString() + '&redirect_uri=' + this.redirectUri
    }
}