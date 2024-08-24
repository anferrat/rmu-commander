export class Config {
    id: number | null;
    name: string;
    companyId: string;
    siteId: string;
    userId: string
    groupId: string | null
    on: number;
    off: number;
    note: string;
    timeModified: number

    constructor(id: number | null, name: string, companyId: string, groupId: string | null, userId: string, siteId: string, on: number, off: number, note: string, timeModified: number) {
        this.id = id
        this.name = name
        this.companyId = companyId
        this.siteId = siteId
        this.groupId = groupId
        this.userId = userId
        this.on = on
        this.off = off
        this.note = note
        this.timeModified = timeModified
    }
}