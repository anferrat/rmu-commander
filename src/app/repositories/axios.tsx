import axios, { AxiosResponse } from "axios"
import { AuthorizationPayload } from "../entities/AuthorizationPayload"
import { TokenPayload } from "../entities/TokenPayload"
import { parseCode } from "../utils/parseCodeFromAuthResponse"
import { AccessToken } from "../entities/AccessToken"
import { LoginPayload } from "../entities/LoginPayload"
import { LogoutPayload } from "../entities/LogoutPayload"
import { parseVerificationToken } from "../utils/parseVerificationToken"
import { AntiforgeryResponse } from "../entities/AntiforgeryResponse"
import { UserInfo } from "../entities/corview.cloud/UserInfo"
import { Company } from "../entities/corview.cloud/Company"
import { Site } from "../entities/corview.cloud/Site"
import { Group } from "../entities/corview.cloud/Group"
import { CommandStatePayload } from "../entities/corview.cloud/CommandStatePayload"
import { CommandState } from "../entities/corview.cloud/CommandState"
import { CommandStatus, SiteStatus } from "../../constants/constants"
import { SiteStatePayload } from "../entities/corview.cloud/SiteStatePayload"
import { SiteState } from "../entities/corview.cloud/SiteState"
import { SendCommandPayload } from "../entities/corview.cloud/SendCommandPayload"

interface CompanyResponse {
    data: {
        id: string,
        name: string
    }[],
    total: number,
    pageTotal: 1,
    nextPageLink: any
}

interface SiteResponse {
    data: {
        hardwareType: {
            id: string
            displayName: string
        },
        group: {
            id: string,
            displayName: string
        },
        id: string,
        name: string,
    }[]
}

interface GroupResponse {
    data: {
        groupType: {
            id: string,
            displayName: string
        },
        id: string,
        name: string
    }[]
}

interface CommandHistoryResponse {
    data: {
        success: boolean,
        doneMessage: string,
        doneDate: string
    }[],
    total: number
}

interface SiteStateResponse {
    data: {
        id: string,
        name: string
        company: {
            id: string
        },
        group: {
            id: string,
            displayName: string
        }
        lastReading: {
            rmuInterruptStatus: {
                id: string
            }
        },
        lastInterruptMsgCommand: {
            interruptCycleTimeMs: number | null,
            interruptOffTimeMs: number | null
        },
        interruptCycleOrder: {
            id: string
        }

    }[]
}



export class AxiosRepository {
    AUTHORIZATION_ENDPOINT: string = 'https://account.corview.cloud/connect/authorize'
    TOKEN_ENDPOINT: string = 'https://account.corview.cloud/connect/token'
    END_SESSION_ENDPOINT: string = 'https://account.corview.cloud/connect/endsession'
    axios = axios.create({
        timeout: 10000,
        headers: {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 14; sdk_gphone64_arm64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Mobile Safari/537.36',
        }
    })
    constructor() {
    }

    /*  AUTH FLOW
    
    LOGIN
    1. Antiforgery request - generate mtx.antiforgery cookie for loging attempt
    2. Login request - POST x-www-form-urlencoded form with login and password to generate mtx.session and mtx.identity cookies
    3. Auth request - PKCE payload to auth endpoint with session and identity cookies in header
    4. Token request - Request to token endpoint with code and code_verifier. Returns access_token and id_token that can be decoded to get expiration time
    5. JWKS request - get JWKS from well known server? why? do we need to verify keys on the client?
    
    RENEW (300 sec per token)
    1. Auth request - PKCE request with new challange, state and nonce to silent-renew url
    2. Token request - Request to token endpoint with code and code verifier
   

    LOGOUT
    1. EndSessionRequest - send request with id_token to end session endpoint
    2. Set mtx.identity and mtx.session cookies expired. (Also Identity.External and Identity.TwoFactorUserId - seems like old stuff)
    */

    async antiforgeryRequest(): Promise<AntiforgeryResponse> {
        try {
            //1. First we access account url. If no redirects, we have access, otherwise we need to login

            const response = await this.axios({
                method: 'get',
                url: 'https://account.corview.cloud/',
                maxRedirects: 0
            })
            if (response.request.responseURL === 'https://account.corview.cloud/')
                return new AntiforgeryResponse(true, null)
            else {
                const { data } = await this.axios({
                    method: 'get',
                    url: 'https://account.corview.cloud/',
                })
                const verificationToken = parseVerificationToken(data)
                return new AntiforgeryResponse(false, verificationToken)
            }
        }
        catch (er) {
            throw new Error('Unable to complete antiforgery request')
        }
    }

    async loginRequest(loginPayload: LoginPayload) {
        //Goal of login request is to create cookies for subsequent authorize request. 
        try {
            //1. Loggin in with credentials. Cookies will be created on success
            const response = await this.axios({
                method: 'post',
                url: 'https://account.corview.cloud/Account/Login?ReturnUrl=%2F',
                data: loginPayload.toString(),
                maxRedirects: 0,
                headers: {
                    "Accept": 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            })
            //2. If no redirects, most likely username or password are invalid
            if (response.request.responseURL === 'https://account.corview.cloud/Account/Login?ReturnUrl=%2F')
                throw '404'
        }
        catch (er) {
            if (er === '404')
                throw new Error('Invalid username or password')
            else
                throw new Error('Unable to complete login request')
        }
    }


    async authorizeRequest(authPayload: AuthorizationPayload) {
        try {
            const queryString = authPayload.toString()
            const result = await this.axios({
                method: 'get',
                url: this.AUTHORIZATION_ENDPOINT + '?' + queryString,
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'Referer': 'https://www.corview.cloud/'
                }
            })
            return parseCode(result)
        }
        catch (er) {
            throw new Error('Unable to complete authorize request')
        }
    }

    async tokenRequest(tokenPayload: TokenPayload) {
        try {
            const result = await this.axios({
                method: 'POST',
                url: this.TOKEN_ENDPOINT,
                withCredentials: false,
                data: tokenPayload.toString(),
                headers: {
                    "Accept": 'application/json, text/plain, */*',
                    "Accept-Encoding": "gzip, deflate, br, zstd",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Origin": 'https://corview.cloud',
                    "Priority": 'u=1, i',
                    "Referer": "https://corview.cloud/"
                }
            })
            const { id_token, access_token, expires_in } = result.data
            return new AccessToken(id_token, access_token, expires_in)
        }
        catch (er) {
            throw new Error('Unable to complete token request')
        }
    }

    async logout(logoutPayload: LogoutPayload) {
        try {
            await axios({
                method: 'get',
                url: this.END_SESSION_ENDPOINT + '?' + logoutPayload.toString(),
            })
        }
        catch (er) {
            throw new Error('Unable to complete logout request')
        }
    }


    async getTimestamp() {
        try {
            const { data } = await axios({
                method: 'get',
                url: 'http://worldtimeapi.org/api/timezone/Etc/UTC',
            })
            if (data.unixtime)
                return data.unixtime
            else
                throw 'oops'
        }
        catch (er) {
            return Math.floor(Date.now() / 1000)
        }
    }


    /* CORVIEW API REQUESTS
    1. CompanyRequest - gets list of the companies avaliable for the user
    2. GroupRequest - gets the list of standard and iterruption groups
    3. SiteRequest - gets the list of all the sites
    */

    private _getDate(dateString: string) {
        try {
            return new Date(dateString).getTime()
        }
        catch (er) {
            return Date.now()
        }
    }

    async userInfo(accessToken: AccessToken): Promise<UserInfo> {
        try {
            const { data } = await axios({
                method: 'get',
                url: 'https://account.corview.cloud/connect/userinfo',
                headers: {
                    'Authorization': `Bearer ${accessToken.token}`,
                    'Host': 'api.corview.cloud',
                    'Origin': 'https://corview.cloud',
                    'Connection': 'keep-alive'
                }
            })
            const { given_name, family_name, default_company_id, sub } = data
            return new UserInfo(given_name, family_name, default_company_id, sub)
        }
        catch (er) {
            throw new Error('Unable to get user info')
        }
    }

    async companyRequest(accessToken: AccessToken): Promise<Company[]> {
        try {
            const { data } = await axios<any, AxiosResponse<CompanyResponse>>({
                method: 'get',
                url: 'https://api.corview.cloud/v1/Company?$orderby=name&$select=id%2Cname',
                headers: {
                    'Authorization': `Bearer ${accessToken.token}`,
                    'Host': 'api.corview.cloud',
                    'Origin': 'https://corview.cloud',
                    'Connection': 'keep-alive'
                }
            })
            return data.data.map(({ id, name }) => new Company(id, name))
        }
        catch (er) {
            throw new Error('Unable to get company list')
        }
    }

    async groupRequest(accessToken: AccessToken, companyId: string): Promise<Group[]> {
        try {
            const { data } = await axios<any, AxiosResponse<GroupResponse>>({
                method: 'get',
                url: `https://api.corview.cloud/v1/Group?$filter=(groupType%2Fid%20eq%20%27Standard%27)&$orderby=name&$select=id%2Cname%2CgroupType%2CrmuCount&$expand=groupType(%24select%3DdisplayName%2Cid)&CompanyIds=${companyId}`,
                headers: {
                    'Authorization': `Bearer ${accessToken.token}`,
                    'Host': 'api.corview.cloud',
                    'Origin': 'https://corview.cloud',
                    'Connection': 'keep-alive'
                }
            })
            return data.data.map(({ id, name }) => {
                return new Group(id, name, companyId)
            })
        }
        catch (er) {
            throw new Error('Unable to get site list')
        }
    }

    async siteRequest(accessToken: AccessToken, companyId: string): Promise<Site[]> {
        try {
            const { data } = await axios<any, AxiosResponse<SiteResponse>>({
                method: 'get',
                url: `https://api.corview.cloud/v1/Site?$filter=(controlEnabled%20eq%20true)%20and%20(company%2Fid%20eq%20%27${companyId}%27)&$select=id%2Cname%2Cnumber%2Cactive%2ChasGps%2Crmu%2Cgroup%2ChardwareType%2CinterruptCycleOrder%2CcontrolEnabled%2CremoteLimitsCapable%2CremoteLimitsEnabled%2Cesn%2CcontrolComments%2CremoteLimitsIsExpired%2Cgroups&$expand=rmu(%24select%3Did%2CdisplayName)%2ChardwareType(%24select%3Did%2CdisplayName)%2Cgroup(%24select%3Did%2CdisplayName)%2CinterruptCycleOrder(%24select%3Did%2CdisplayName)%2Cgroups(%24select%3Did)&Active=true`,
                headers: {
                    'Authorization': `Bearer ${accessToken.token}`,
                    'Host': 'api.corview.cloud',
                    'Origin': 'https://corview.cloud',
                    'Connection': 'keep-alive'
                }
            })
            return data.data.map(({ hardwareType, group, id, name }) => new Site(id, name, hardwareType.id, hardwareType.displayName, group.id, group.displayName, companyId))
        }
        catch (er) {
            throw new Error('Unable to get site list')
        }
    }

    async commandStateRequest(accessToken: AccessToken, commandStatusPayload: CommandStatePayload) {
        try {
            const { data, headers } = await axios<any, AxiosResponse<CommandHistoryResponse>>({
                method: 'get',
                url: `https://api.corview.cloud/v1/MsgCommand/GetCommandHistory?${commandStatusPayload.toString()}`,
                headers: {
                    'Authorization': `Bearer ${accessToken.token}`,
                    'Host': 'api.corview.cloud',
                    'Origin': 'https://corview.cloud',
                    'Connection': 'keep-alive'
                }
            })
            const timestamp = this._getDate(headers['date'])
            if (data.total === 0)
                return new CommandState(commandStatusPayload.siteId, commandStatusPayload.companyId, '', CommandStatus.NO_COMMAND, 0, timestamp)
            else {
                const response = data.data[0]
                if (response.success)
                    return new CommandState(commandStatusPayload.siteId, commandStatusPayload.companyId, response.doneMessage, CommandStatus.DONE_CONFIRMED, new Date(response.doneDate).getTime(), timestamp)
                else if (response.doneDate === null)
                    return new CommandState(commandStatusPayload.siteId, commandStatusPayload.companyId, response.doneMessage, CommandStatus.AWAIT_CONFIRM, 0, timestamp)
                else
                    return new CommandState(commandStatusPayload.siteId, commandStatusPayload.companyId, response.doneMessage, CommandStatus.DONE_NO_CONFIRM, new Date(response.doneDate).getTime(), timestamp)
            }
        }
        catch (er) {
            throw new Error('Unable to get command status')
        }
    }

    async siteStateRequest(accessToken: AccessToken, siteStatePayload: SiteStatePayload) {
        try {
            const getCycleTimes = (lastIntCommandMsg: { interruptCycleTimeMs: number | null, interruptOffTimeMs: number | null }) => {
                try {
                    if (lastIntCommandMsg.interruptCycleTimeMs && lastIntCommandMsg.interruptOffTimeMs && lastIntCommandMsg.interruptCycleTimeMs !== null && lastIntCommandMsg.interruptOffTimeMs !== null)
                        return {
                            on: lastIntCommandMsg.interruptCycleTimeMs - lastIntCommandMsg.interruptOffTimeMs,
                            off: lastIntCommandMsg.interruptOffTimeMs
                        }
                    else throw 'oops'
                }
                catch {
                    return {
                        on: null,
                        off: null
                    }
                }
            }

            const getStatus = (statusId: string) => {
                switch (statusId) {
                    case 'JustOn':
                    case 'On':
                        return SiteStatus.ON
                    case 'Off':
                    case 'JustOff':
                        return SiteStatus.OFF
                    case 'OnCycling':
                        return SiteStatus.INT
                    default:
                        throw '100'
                }
            }

            const { data } = await axios<any, AxiosResponse<SiteStateResponse>>({
                method: 'get',
                url: `https://api.corview.cloud/v1/SiteStatus?${siteStatePayload.toString()}`,
                headers: {
                    'Authorization': `Bearer ${accessToken.token}`,
                    'Host': 'api.corview.cloud',
                    'Origin': 'https://corview.cloud',
                    'Connection': 'keep-alive'
                }
            })
            const response = data.data[0]
            const { on, off } = getCycleTimes(response.lastInterruptMsgCommand)
            const onFirst = response.interruptCycleOrder.id !== 'OffFirst'
            const status = getStatus(response.lastReading.rmuInterruptStatus.id)
            return new SiteState(response.id, response.company.id, status, response.name, response.group.displayName, on, off, onFirst, response.group.id)
        }
        catch (er) {
            if (er === '100')
                throw new Error('Unable to understand site status')
            else
                throw new Error('Unable to get command status')
        }
    }

    async sendCommandRequest(accessToken: AccessToken, sendCommandPayload: SendCommandPayload) {
        try {
            await axios<any, AxiosResponse>({
                method: 'post',
                url: sendCommandPayload.getUrl(),
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken.token}`,
                    'Host': 'api.corview.cloud',
                    'Origin': 'https://corview.cloud',
                    'Connection': 'keep-alive'
                },
                data: sendCommandPayload.toString()
            })
               }
        catch (er) {
            throw new Error('Unable to send command to RMU')
        }
    }
}