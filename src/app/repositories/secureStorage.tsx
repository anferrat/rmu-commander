import RNSecureStorage from "rn-secure-storage";
import { Credentials } from "../entities/Credentials";
import { AccessToken } from "../entities/AccessToken";


export class SecureStorage {
    constructor() {

    }

    async getCredentials() {
        try {
            const [username, password] = await Promise.all([
                RNSecureStorage.getItem('username'),
                RNSecureStorage.getItem('password')
            ])
            return new Credentials(true, username, password)
        }
        catch (er) {
            return new Credentials(false, null, null)
        }
    }

    async setCredentials(credentials: Credentials) {
        try {
            if (credentials.username !== null && credentials.password !== null)
                await Promise.all([
                    RNSecureStorage.setItem('username', credentials.username, {}),
                    RNSecureStorage.setItem('password', credentials.password, {})
                ])
            else throw 'oops'
        }
        catch (er) {
            throw new Error('Unable to store credentials')
        }
    }

    async removeCredentials() {
        try {
            await Promise.all([
                RNSecureStorage.removeItem('username'),
                RNSecureStorage.removeItem('password')
            ])
        }
        catch (er) {
            //dont throw here
        }
    }

    async setAccessToken(accessToken: AccessToken) {
        try {
            if (accessToken.token && accessToken.idToken) {
                await RNSecureStorage.setItem('accessToken', JSON.stringify(accessToken), {})
            }
            else throw 'oops'
        }
        catch (er) {
            console
            throw new Error('Unable to store access token')
        }
    }

    async removeAccessToken() {
        try {
            await RNSecureStorage.removeItem('accessToken')
        }
        catch (er) {
            //Not a big deal if we cant remove it
        }
    }

    async getAccessToken() {
        try {
            const tokenString = await RNSecureStorage.getItem('accessToken')
            if (tokenString) {
                const token = JSON.parse(tokenString)
                return new AccessToken(token.idToken, token.token, token.expiresIn)
            }
            else throw 'oops'
        }
        catch (er) {
            throw new Error('Unable to retrieve access token')
        }
    }

}