import { useCallback, useEffect, useState } from "react"
import { EventRegister } from "react-native-event-listeners"
import { Events } from "../../../constants/events"
import { TimeSelectionOptions } from "../../../constants/constants"
import { TimeFrame } from "../../../app/entities/corview.cloud/TimeFrame"
import { getAvailableTimeFrames } from "../../../app/controllers/controller"
import { errorHandler } from "../../../errors/errorHandler"

type SiteDataType = {
    siteId: null | string
    companyId: null | string
}

const initialSiteData = {
    siteId: null,
    companyId: null
}


export const useTimeSelect = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<SiteDataType>(initialSiteData)
    const [timeFrames, setTimeFrames] = useState<TimeFrame[]>([])
    const visible = data.siteId !== null && data.companyId !== null

    useEffect(() => {
        const timeSelectionListener: any = EventRegister.addEventListener(Events.SHOW_TIME_SELECTION, async ({ siteId, companyId }) => {
            setData({
                siteId,
                companyId
            })
        })
        return () => {
            EventRegister.removeEventListener(timeSelectionListener)
        }
    }, [])

    useEffect(() => {
        if (visible) {
            const loadData = async () => {
                const { isOk, response, error } = await getAvailableTimeFrames()
                if (isOk) {
                    setTimeFrames(response!)
                }
                else {
                    errorHandler(error!)
                    reset()
                }
                setLoading(false)
            }
            loadData()
        }
        return () => {
            if (visible) {
                setLoading(true)
                setTimeFrames([])
            }
        }
    }, [visible])

    const onSelect = (startTime: number, endTime: number) => {
        if (visible) {
            EventRegister.emit(Events.TIME_SELECTED, { siteId: data.siteId, companyId: data.companyId, startTime, endTime })
            reset()
        }
    }

    const reset = useCallback(() => {
        setData(initialSiteData)
    }, [])



    return {
        visible,
        timeFrames,
        loading,
        onSelect,
        reset
    }

}