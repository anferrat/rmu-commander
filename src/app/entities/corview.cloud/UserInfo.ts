export class UserInfo {
    firtsName: string | null
    lastName: string | null
    defaultCompanyId: string | null
    userId: string

    constructor(firstName: string | null, lastName: string | null, defaultCompanyId: string | null, userId: string) {
        this.firtsName = firstName
        this.lastName = lastName
        this.defaultCompanyId = defaultCompanyId
        this.userId = userId
    }
}