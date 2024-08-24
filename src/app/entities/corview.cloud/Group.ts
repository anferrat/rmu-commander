export class Group {
    id: string
    name: string
    companyId: string

    constructor(id: string, name: string, companyId: string) {
        this.id = id
        this.name = name
        this.companyId = companyId
    }
}