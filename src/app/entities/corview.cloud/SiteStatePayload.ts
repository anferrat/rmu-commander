export class SiteStatePayload {
    siteId: string
    companyId: string

    constructor(siteId: string, companyId: string) {
        this.siteId = siteId
        this.companyId = companyId
    }

    toString(): string {
        return[
            `$filter=${encodeURIComponent(`(company / id eq '${this.companyId}' and id eq '${this.siteId}' and active eq true)`)}`,
            '$skip=0',
            '$top=50',
            `$select=${encodeURIComponent(`id,name,company,group,lastReading,lastInterruptMsgCommand,interruptCycleOrder`)}`,
            `$expand=${encodeURIComponent(`company($select=id,displayName),lastInterruptMsgCommand($select=interruptCycleTimeMs,interruptOffTimeMs),group($select=id,displayName),interruptCycleOrder($select=id),lastReading($select=id,readingDate,batteryReading,temperature),lastReading($expand=rmuInterruptStatus($select=id,displayName))`)}`
        ].join('&')
    }
}