import { useEffect, useState } from "react"
import { getSiteName } from "../../../app/controllers/controller"

type UseSiteStatusProps = {
    siteId: null | string
    companyId: null | string,
    setName: React.Dispatch<React.SetStateAction<string>>
}


export function useSiteStatus({ siteId, companyId, setName }: UseSiteStatusProps) {
    const [siteName, setSiteName] = useState<null | string>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const loadData = async () => {
            setLoading(true)
            if (siteId !== null && companyId !== null) {
                const { isOk, response } = await getSiteName(siteId, companyId)
                if (isOk) {
                    setSiteName(response!)
                    setName(state => state === "" ? response! : state)
                }
            }
            setLoading(false)
        }
        loadData()
    }, [siteId, companyId])

    return {
        siteName,
        loading
    }
}