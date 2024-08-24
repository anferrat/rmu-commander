import { AppSettings } from "./AppSettings";
import { Credentials } from "./Credentials";

export class LoginData {
    credentials: Credentials
    settings: AppSettings

    constructor(credentials: Credentials, settings: AppSettings) {
        this.credentials = credentials
        this.settings = settings
    }
}