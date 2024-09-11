export class AuthorizationPayload {
    clientId: string
    redirectUri: string
    responseType: string
    scope: string[]
    nonce: string
    state: string
    codeChallenge: string
    codeChallengeMethod: string = 'S256'
    prompt: string | null = 'none'
    isTest: boolean

    constructor(isNew: boolean, nonce: string, state: string, codeChallenge: string, isTest: boolean) {
        this.clientId = 'corViewSpa'
        this.redirectUri = isNew ? 'https://www.corview.cloud/auth-return' : 'https://www.corview.cloud/silent-renew.html'
        this.responseType = 'code'
        this.scope = ['openid', 'profile', 'corview.api', 'corview.web']
        this.nonce = nonce
        this.state = state
        this.codeChallenge = codeChallenge
        this.prompt = isNew ? null : 'none'
        this.isTest = isTest
    }

    toString(): string {
        const params = new URLSearchParams({
            'client_id': this.clientId,
            'redirect_uri': this.redirectUri,
            'response_type': this.responseType,
            'scope': this.scope.join(' '),
            'nonce': this.nonce,
            'state': this.state,
            'code_challenge': this.codeChallenge,
            'code_challenge_method': this.codeChallengeMethod,
        })
        if (this.prompt !== null)
            params.append('prompt', 'none')

        return params.toString()
    }
}