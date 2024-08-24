
import { Company } from "../../../app/entities/corview.cloud/Company";
import { Group } from "../../../app/entities/corview.cloud/Group";
import { Site } from "../../../app/entities/corview.cloud/Site";

export const findDefaultCompanyIndex = (companies: Company[], defaultCompanyId: string | null) => {
    if (defaultCompanyId === null)
        return 0
    const index = companies.findIndex(({ id }) => id === defaultCompanyId)
    return ~index ? index : 0
}

export const getDisplayedSites = (sites: Site[], groups: Group[], selectedGroupIndex: null | number) => {
    if (selectedGroupIndex === null)
        return sites
    else if (groups[selectedGroupIndex])
        return sites.filter((site) => site.groupId === groups[selectedGroupIndex].id)
    else
        return sites
}

export const isValidConfig = (name: string | null, nameValid: boolean, onValid: boolean, on: string | null, offValid: boolean, off: string | null, companyId: string | null, siteId: string | null, userId: string | null, groupId: string | null) => {
    return nameValid && name !== null && name !== '' &&
        onValid && on !== null && on !== '' &&
        offValid && off !== null && off !== '' &&
        companyId !== null &&
        siteId !== null &&
        userId !== null
}