import { Company } from "../entities/corview.cloud/Company";
import { SiteState } from "../entities/corview.cloud/SiteState";
import { UserInfo } from "../entities/corview.cloud/UserInfo";
import { LoginData } from "../entities/LoginData";
import { SiteSelectionData } from "../entities/types/types";
import { AxiosRepository } from "../repositories/axios";
import { NetworkRepository } from "../repositories/network";
import { SecureStorage } from "../repositories/secureStorage";
import { SettingRepo } from "../repositories/settings";
import { SqliteRepository } from "../repositories/sqlite";
import { AppInitialization } from "../services/AppInitialization";
import { Authorization } from "../services/authorization/Authorization";
import { CommandListener } from "../services/corview.cloud/CommandListener";
import { GetCompanyList } from "../services/corview.cloud/GetCompanyList";
import { GetSiteSelectionData } from "../services/corview.cloud/GetSiteSelectionData";
import { GetSiteName } from "../services/corview.cloud/GetSiteName";
import { GetUserInfo } from "../services/corview.cloud/GetUserInfo";
import { TestForDevOnly } from "../services/corview.cloud/TestForDevOnly";
import { SaveConfiguration } from "../services/configs/SaveConfiguration";
import { GetAccessToken } from "../services/authorization/GetAccessToken";
import { GetLoginData } from "../services/authorization/GetLoginData";
import { Login } from "../services/authorization/Login";
import { LogoutService } from "../services/authorization/Logout";
import { TokenService } from "../services/authorization/TokenService";
import { Setting, UpdateSetting } from "../services/UpdateSetting";
import { Controller, Listener, Response } from "../utils/Controller";
import { CryptoUtil } from "../utils/Crypto";
import { GetSiteStatus } from "../services/corview.cloud/GetSiteStatus";
import { CommandState } from "../entities/corview.cloud/CommandState";
import { GetConfigList } from "../services/configs/GetConfigList";
import { Config } from "../entities/Config";
import { DeleteConfiguration } from "../services/configs/DeleteConfiguration";
import { GetConfigurationById } from "../services/configs/GetConfigurationById";
import { GetTimeFrame } from "../services/other/GetTimeFrame";
import { GetAvailableTimeFrames } from "../services/other/GetAvailableTimeFrames";
import { TimeFrame } from "../entities/corview.cloud/TimeFrame";
import { SendCommand } from "../services/corview.cloud/SendCommand";
import { SendCommandPayload } from "../entities/corview.cloud/SendCommandPayload";

class MainController extends Controller {
    axiosRepo: AxiosRepository = new AxiosRepository()
    secureStorageRepo: SecureStorage = new SecureStorage()
    sqliteRepo: SqliteRepository = new SqliteRepository()
    cryptoService: CryptoUtil = new CryptoUtil()
    settingRepo: SettingRepo = new SettingRepo()
    networkRepo: NetworkRepository = new NetworkRepository()
    tokenService: TokenService = new TokenService(this.axiosRepo, this.cryptoService, this.secureStorageRepo)
    loginService = new Login(this.axiosRepo)
    getTimeFrameService = new GetTimeFrame()
    authService: Authorization = new Authorization(this.secureStorageRepo, this.loginService, this.tokenService, this.settingRepo, this.networkRepo, this.axiosRepo)
    getLoginDataService: GetLoginData = new GetLoginData(this.settingRepo, this.secureStorageRepo)
    appInitializationService: AppInitialization = new AppInitialization(this.authService, this.axiosRepo, this.networkRepo, this.settingRepo, this.sqliteRepo, this.secureStorageRepo)
    logoutService: LogoutService = new LogoutService(this.axiosRepo, this.secureStorageRepo)
    updateSettingService: UpdateSetting = new UpdateSetting(this.settingRepo)
    getAccessTokenService: GetAccessToken = new GetAccessToken(this.authService, this.secureStorageRepo)
    getSiteSelectionDataService: GetSiteSelectionData = new GetSiteSelectionData(this.axiosRepo, this.getAccessTokenService)
    getCompanyListService: GetCompanyList = new GetCompanyList(this.axiosRepo, this.getAccessTokenService)
    getUserInfoService = new GetUserInfo(this.axiosRepo, this.getAccessTokenService)
    getSiteNameService = new GetSiteName(this.axiosRepo, this.getAccessTokenService)
    saveConfigService = new SaveConfiguration(this.sqliteRepo)
    commandListenerService = new CommandListener(this.axiosRepo, this.getAccessTokenService)
    getSiteStatusService = new GetSiteStatus(this.axiosRepo, this.getAccessTokenService)
    getConfigListService = new GetConfigList(this.sqliteRepo)
    deleteConfigService = new DeleteConfiguration(this.sqliteRepo, this.commandListenerService)
    getConfigByIdService = new GetConfigurationById(this.sqliteRepo)
    getAvailableTimeFrameService = new GetAvailableTimeFrames(this.axiosRepo, this.getTimeFrameService)
    sendCommandService = new SendCommand(this.axiosRepo, this.getAccessTokenService, this.commandListenerService)
    testService = new TestForDevOnly(this.axiosRepo, this.getAccessTokenService, this.sqliteRepo)
    constructor() {
        super()
    }

    login(login: string, password: string, savePassword: boolean, autoLogin: boolean): Promise<Response<void>> {
        return super.execute(async () => {
            return await this.authService.execute(login, password, savePassword, autoLogin)
        })
    }

    getLoginData(): Promise<Response<LoginData>> {
        return super.execute(async () => {
            return await this.getLoginDataService.execute()
        })
    }

    initialize(): Promise<Response<boolean>> {
        return super.execute(async () => {
            return await this.appInitializationService.execute()
        })
    }

    logout(): Promise<Response<void>> {
        return super.execute(async () => {
            return await this.logoutService.execute()
        })
    }

    updateSetting(setting: Setting, value: boolean): Promise<Response<void>> {
        return super.execute(async () => {
            return await this.updateSettingService.execute(setting, value)
        })
    }

    getSiteSelectionData(companyId: string): Promise<Response<SiteSelectionData>> {
        return super.execute(async () => {
            return await this.getSiteSelectionDataService.execute(companyId)
        })
    }

    getCompanyList(): Promise<Response<Company[]>> {
        return super.execute(async () => {
            return await this.getCompanyListService.execute()
        })
    }

    getUserInfo(): Promise<Response<UserInfo>> {
        return super.execute(async () => {
            return await this.getUserInfoService.execute()
        })
    }

    getSiteName(siteId: string, companyId: string): Promise<Response<string>> {
        return super.execute(async () => {
            return await this.getSiteNameService.execute(siteId, companyId)
        })
    }

    saveConfig(id: null | number, name: string, on: number, off: number, note: string, companyId: string, siteId: string, userId: string, groupId: string | null): Promise<Response<Config>> {
        return super.execute(async () => {
            return await this.saveConfigService.execute(id, name, on, off, note, companyId, siteId, userId, groupId)
        })
    }

    deleteConfig(id: number, siteId: string, companyId: string): Promise<Response<void>> {
        return super.execute(async () => {
            return await this.deleteConfigService.execute(id, siteId, companyId)
        })
    }

    getConfigById(id: number): Promise<Response<Config>> {
        return super.execute(async () => {
            return await this.getConfigByIdService.execute(id)
        })
    }


    getSiteStatus(siteId: string, companyId: string): Promise<Response<{ siteState: SiteState, commandState: CommandState }>> {
        return super.execute(async () => {
            return await this.getSiteStatusService.execute(siteId, companyId)
        })
    }

    getConfigList(userId: string | null): Promise<Response<Config[]>> {
        return super.execute(async () => {
            return await this.getConfigListService.execute(userId)
        })
    }

    getAvailableTimeFrames(): Promise<Response<TimeFrame[]>> {
        return super.execute(async () => {
            return await this.getAvailableTimeFrameService.execute()
        })
    }

    sendCommand(sendCommandPayload: SendCommandPayload): Promise<Response<boolean>> {
        return super.execute(async () => {
            return await this.sendCommandService.execute(sendCommandPayload)
        })
    }

    addCommandListener(): Listener {
        return this.commandListenerService.addListener()
    }

    addItemToCommandListener(siteId: string, companyId: string): Promise<Response<void>> {
        return super.execute(async () => {
            return await this.commandListenerService.addItem(siteId, companyId)
        })
    }

    removeItemFromCommandListener(siteId: string, companyId: string): Promise<Response<void>> {
        return super.execute(async () => {
            return this.commandListenerService.deleteItem(siteId, companyId)
        })
    }

    test() {
        return super.execute(async () => {
            return await this.testService.execute()
        })
    }
}

const mainController: MainController = new MainController()

export function login(login: string, password: string, savePassword: boolean, autoLogin: boolean): Promise<Response<void>> {
    return mainController.login(login, password, savePassword, autoLogin)
}

export function getLoginData(): Promise<Response<LoginData>> {
    return mainController.getLoginData()
}

export function initializeApp(): Promise<Response<boolean>> {
    return mainController.initialize()
}

export function logout(): Promise<Response<void>> {
    return mainController.logout()
}

export function updateSetting(setting: Setting, value: boolean): Promise<Response<void>> {
    return mainController.updateSetting(setting, value)
}

export function getSiteSelectionData(companyId: string): Promise<Response<SiteSelectionData>> {
    return mainController.getSiteSelectionData(companyId)
}

export function getCompanyData(): Promise<Response<Company[]>> {
    return mainController.getCompanyList()
}

export function getUserInfo() {
    return mainController.getUserInfo()
}

export function getSiteName(siteId: string, companyId: string) {
    return mainController.getSiteName(siteId, companyId)
}

export function saveConfig(id: null | number, name: string, on: number, off: number, note: string, companyId: string, siteId: string, userId: string, groupId: string | null) {
    return mainController.saveConfig(id, name, on, off, note, companyId, siteId, userId, groupId)
}

export function addCommandListener() {
    return mainController.addCommandListener()
}

export function addItemToCommandListener(siteId: string, companyId: string) {
    return mainController.addItemToCommandListener(siteId, companyId)
}

export function removeItemFromCommandListener(siteId: string, companyId: string) {
    return mainController.removeItemFromCommandListener(siteId, companyId)
}

export function getSiteStatus(siteId: string, companyId: string) {
    return mainController.getSiteStatus(siteId, companyId)
}

export function getConfigList(userId: string | null) {
    return mainController.getConfigList(userId)
}

export function deleteConfig(id: number, siteId: string, companyId: string) {
    return mainController.deleteConfig(id, siteId, companyId)
}

export function getConfigById(id: number) {
    return mainController.getConfigById(id)
}

export function getAvailableTimeFrames() {
    return mainController.getAvailableTimeFrames()
}

export function sendCommand(sendCommandPayload: SendCommandPayload) {
    return mainController.sendCommand(sendCommandPayload)
}

export function testDevOnly() {
    return mainController.test()
}