import { Events } from "../../../constants/events";
import { AxiosRepository } from "../../repositories/axios";
import { EventRegister } from "react-native-event-listeners";
import { GetAccessToken } from "../authorization/GetAccessToken";
import { CommandStatePayload } from "../../entities/corview.cloud/CommandStatePayload";

export class CommandListener {
    private axiosRepo: AxiosRepository
    private getAccessTokenService: GetAccessToken
    private items: {
        siteId: string
        companyId: string
        counter: number
    }[] = []
    private TICK = 1000
    private UPDATE_INTERVAL = 15
    private MAX_ITEMS_LENGTH = 5 //Limit this. Large number will increase number of requests + will slow down updates
    private MAX_ERROR_COUNT = 5
    private count = 0
    private timestamp = 0


    constructor(axiosRepo: AxiosRepository, getAccessTokenService: GetAccessToken) {
        this.axiosRepo = axiosRepo
        this.getAccessTokenService = getAccessTokenService
    }

    private _getTimeToUpdate(counter: number) {
        //Calculate time in sec until next update
        const dif = counter - this.count
        return Math.round((dif >= 0 ? dif : dif + this.UPDATE_INTERVAL) * 1000 / this.TICK)
    }

    async addItem(siteId: string, companyId: string) {
        //Current timestamp updates only when new item added
        if (this.items.length < this.MAX_ITEMS_LENGTH) {
            this.timestamp = await this.axiosRepo.getTimestamp()
            this.items.push({
                siteId,
                companyId,
                counter: this.count - 1
            })
        }
        else throw new Error(`Unable to send command. Please wait for other command to be completed. You can monitor up to ${this.MAX_ITEMS_LENGTH} command updates at one time.`)
    }

    deleteItem(siteId: string, companyId: string) {
        const index = this.items.findIndex(item => item.siteId === siteId && item.companyId === companyId)
        if (~index)
            this.items.splice(index, 1)
    }

    /*
    Listens for command status update. When item added it will send request to endpoint for command state update every (UPDATE_INTERVAL * TICK) ms.
    Can potentially generate large number of request, therefore we need to limit number of items.
    When new command status received, it will send event with the new CommandState and timestamp.
    
    Also sends events every TICK ms with siteId, companyId and time until next update in sec.
    */

    addListener() {
        let errorCount = 0 //count errors inside interval, if limit reach remove listener and throw error
        var counter = setInterval(() => {
            if (this.count >= this.UPDATE_INTERVAL)
                this.count = 0
            else
                this.count++

            if (this.items.length > 0) {
                try {
                    this.items.forEach(async ({ siteId, counter, companyId }) => {
                        const count = this.count
                        if (counter === count) {
                            //Event that update starts
                            EventRegister.emit(Events.UPDATING_COMMAND_STATE, { siteId, companyId })
                            const accessToken = await this.getAccessTokenService.execute()

                            //Getting timeframe for commandState request
                            const endDate = this.timestamp + 3600000
                            const startDate = endDate - 86400000
                            const commandStatePayload = new CommandStatePayload(companyId, siteId, startDate, endDate)

                            //Requesting command state
                            const commandState = await this.axiosRepo.commandStateRequest(accessToken, commandStatePayload)

                            //Updating counter for the site
                            counter = this.count
                            //Event with new command state
                            EventRegister.emit(Events.NEW_COMMAND_STATE, commandState)
                        }
                        else
                            EventRegister.emit(Events.TICK_UPDATE, { siteId, companyId, timeToUpdate: this._getTimeToUpdate(counter) })
                    })
                }
                catch (er) {
                    errorCount++
                    if (errorCount >= this.MAX_ERROR_COUNT) {
                        clearInterval(counter)
                        this.count = 0
                        this.items = []
                        throw new Error('Command listener error. Unable to get status of commands')
                    }
                }
            }
        }, this.TICK)

        return {
            remove: () => {
                clearInterval(counter)
                this.count = 0
                this.items = []
            }
        }
    }
}