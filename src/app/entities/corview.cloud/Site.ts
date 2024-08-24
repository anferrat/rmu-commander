export class Site {
    id: string
    name: string
    hardwareTypeId: string
    hardwareName: string
    groupId: string
    groupName: string
    companyId: string
    constructor(id: string, name: string, hardwareTypeId: string, hardwareName: string, groupId: string, groupName: string, companyId: string) {
        this.id = id
        this.name = name
        this.hardwareTypeId = hardwareTypeId
        this.hardwareName = hardwareName
        this.groupId = groupId
        this.groupName = groupName
        this.companyId = companyId
    }
}