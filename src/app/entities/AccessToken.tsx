import { jwtDecode } from "jwt-decode"

type DecodedJWT = {
    nbf: number
    exp: number
    iss: string
    aud: string | string[]
    iat: number
}

export class AccessToken {
    idToken: string
    token: string
    expiresIn: number

    constructor(idToken: string, token: string, expiresIn: number) {
        this.idToken = idToken
        this.token = token
        this.expiresIn = expiresIn
    }

    decode(): DecodedJWT {
        const decoded = jwtDecode(this.idToken)
        const { nbf, exp, iss, aud, iat } = decoded
        if (nbf && exp && iss && aud && iat)
            return {
                nbf,
                exp,
                iss,
                aud,
                iat
            }
        else
            return {
                nbf: 0,
                exp: 0,
                iss: "",
                aud: "",
                iat: 0
            }
    }

}