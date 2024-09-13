import { useCallback, useEffect, useState } from "react"
import { Company } from "../../../app/entities/corview.cloud/Company"
import { Group } from "../../../app/entities/corview.cloud/Group"
import { Site } from "../../../app/entities/corview.cloud/Site"
import { getCompanyData, getSiteSelectionData } from "../../../app/controllers/controller"
import { errorHandler } from "../../../errors/errorHandler"
import { findDefaultCompanyIndex, getDisplayedSites } from "../helpers/functions"
import { useTypedSelector } from "../../../stores/global"

const initialCompanies: Company[] = []

const initialGroups: Group[] = []

const initialSites: Site[] = []

type UseSiteSelectionProps = {
    hideModal: () => void,
    onSelectSite: (siteId: string, groupId: string | null, companyId: string) => void,
    visible: boolean
}

export const useSiteSelection = ({ hideModal, onSelectSite, visible }: UseSiteSelectionProps) => {
    const [loading, setLoading] = useState<boolean>(true)
    const defaultCompanyId = useTypedSelector(state => state.global.defaultCompanyId)
    const [companies, setCompanies] = useState(initialCompanies)
    const [groups, setGroups] = useState(initialGroups)
    const [sites, setSites] = useState(initialSites)

    const [selectedCompanyIndex, setSelectedCompanyIndex] = useState<null | number>(null)
    const [selectedGroupIndex, setSelectedGroupIndex] = useState<null | number>(null)
    const [selectedSiteIndex, setSelectedSiteIndex] = useState<null | number>(null)
    const displayedSites = getDisplayedSites(sites, groups, selectedGroupIndex)

    useEffect(() => {
        const loadData = async () => {
            const { response, isOk, error } = await getCompanyData()
            if (isOk) {
                const defaultCompanyIndex = findDefaultCompanyIndex(response!, defaultCompanyId)
                setSelectedCompanyIndex(defaultCompanyIndex)
                setCompanies(response!)
                return
            }
            hideModal()
            errorHandler(error!)
        }
        loadData()
        return () => {
            setLoading(true)
            setCompanies(initialCompanies)
            setGroups(initialGroups)
            setSites(initialSites)
            setSelectedCompanyIndex(null)
            setSelectedGroupIndex(null)
            setSelectedSiteIndex(null)
        }
    }, [])

    useEffect(() => () => {
        if (visible) {
            setSelectedGroupIndex(null)
            setSelectedSiteIndex(null)
        }
    }, [visible])

    useEffect(() => {
        if (selectedCompanyIndex !== null && companies[selectedCompanyIndex!]) {
            const loadData = async () => {
                setLoading(true)

                const { response, isOk, error } = await getSiteSelectionData(companies[selectedCompanyIndex!].id)
                if (isOk) {
                    const { sites, groups } = response!
                    setGroups(groups)
                    setSites(sites)
                }
                else {
                    errorHandler(error!)
                    hideModal()
                }
                setLoading(false)
            }
            loadData()
        }
    }, [selectedCompanyIndex, companies])

    useEffect(() => {
        setSelectedSiteIndex(null)
    }, [selectedGroupIndex])

    const onSelectHandler = () => {
        if (selectedSiteIndex === null || selectedCompanyIndex === null)
            hideModal()
        else {
            const site = displayedSites[selectedSiteIndex]
            const company = companies[selectedCompanyIndex]
            const groupId = selectedGroupIndex === null ? null : groups[selectedGroupIndex]?.id ?? null
            if (site && company && site?.id && company?.id)
                onSelectSite(site.id, groupId, company.id)
            else
                errorHandler('Unable to select site')
            hideModal()
        }
    }

    const onSiteSelect = useCallback((index: number | null) => setSelectedSiteIndex(state => state === index ? null : index), [])

    return {
        loading,
        companies,
        sites: displayedSites,
        groups,
        selectedSiteIndex,
        selectedGroupIndex,
        selectedCompanyIndex,
        setSelectedCompanyIndex,
        setSelectedGroupIndex,
        setSelectedSiteIndex: onSiteSelect,
        onSelectHandler
    }
}