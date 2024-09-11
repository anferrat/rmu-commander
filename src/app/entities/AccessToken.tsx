import { jwtDecode } from "jwt-decode"

type DecodedJWT = {
    nbf: number
    exp: number
    iss: string
    aud: string | string[]
    iat: number,
    sub: string
}

export class AccessToken {
    idToken: string
    token: string
    expiresIn: number
    isTest: boolean

    constructor(idToken: string, token: string, expiresIn: number) {
        this.idToken = idToken
        this.token = token
        this.expiresIn = expiresIn
        this.isTest = jwtDecode(this.idToken)?.sub === 'test_user'
    }

    decode(): DecodedJWT {
        const decoded = jwtDecode(this.idToken)
        const { nbf, exp, iss, aud, iat, sub } = decoded
        if (nbf && exp && iss && aud && iat && sub)
            return {
                nbf,
                exp,
                iss,
                aud,
                iat,
                sub
            }
        else
            return {
                nbf: 0,
                exp: 0,
                iss: "",
                aud: "",
                iat: 0,
                sub: ""
            }
    }

}