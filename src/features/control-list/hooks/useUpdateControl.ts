import { useEffect, useState } from "react"
import { EventRegister } from "react-native-event-listeners"
import { Events } from "../../../constants/events"

type UseUpdateControlProps = {
    siteId: string
    companyId: string
}


export const useUpdateControl = ({ siteId, companyId }: UseUpdateControlProps) => {

    const [timeToUpdate, setTimeToUpdate] = useState<number>(-1)

    useEffect(() => {
        const tickListener: any = EventRegister.addEventListener(Events.TICK_UPDATE, tick => {
            if (tick.siteId === siteId && tick.companyId === companyId && !isNaN(Number(tick.timeToUpdate)))
                setTimeToUpdate(Number(tick.timeToUpdate))
        })

        const resetListener: any = EventRegister.addEventListener(Events.RESET_TIME_TO_UPDATE, data => {
            if (data.siteId === siteId && data.companyId === companyId)
                setTimeToUpdate(-1)
        })
        return () => {
            EventRegister.removeEventListener(tickListener)
            EventRegister.removeEventListener(resetListener)
        }
    }, [siteId, companyId])

    return timeToUpdate

}