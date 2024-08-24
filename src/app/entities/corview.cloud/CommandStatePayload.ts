export class CommandStatePayload {
    companyId: string
    siteId: string
    startDate: number
    endDate: number

    constructor(companyId: string, siteId: string, startDate: number, endDate: number) {
        this.companyId = companyId
        this.siteId = siteId
        this.startDate = startDate
        this.endDate = endDate
    }

    toString(): string {
        return (new URLSearchParams({
            'startDate': (new Date(this.startDate)).toISOString(),
            'endDate': (new Date(this.endDate)).toISOString(),
            'customerId': this.companyId,
            'siteId': this.siteId,
            'interruptionOnly': 'false',
            'lastCommandOnly': 'true',
        })).toString().concat('&').concat([
            '$skip=0',
            '$top=50'
        ].join('&'))
    }
}