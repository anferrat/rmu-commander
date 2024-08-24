import { SiteStatus } from "../../../constants/constants"

export class SiteState {
    siteId: string
    companyId: string
    groupId: string
    status: SiteStatus
    siteName: string
    groupName: string
    on: number | null
    off: number | null
    onFirst: boolean

    constructor(siteId: string, companyId: string, status: SiteStatus, siteName: string, groupName: string, on: number | null, off: number | null, onFirst: boolean, groupId: string) {
        this.siteId = siteId
        this.companyId = companyId
        this.status = status
        this.siteName = siteName
        this.groupName = groupName
        this.on = on
        this.off = off
        this.onFirst = onFirst
        this.groupId = groupId
    }

    setStatus(status: SiteStatus) {
        this.status = status
    }
}