export class Credentials {
    isOk: boolean;
    username: string | null;
    password: string | null;
    constructor(isOk: boolean, username: string | null, password: string | null) {
        this.isOk = isOk
        this.username = username
        this.password = password
    }
}