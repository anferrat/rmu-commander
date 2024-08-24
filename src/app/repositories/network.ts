import NetInfo from '@react-native-community/netinfo'

export class NetworkRepository {
    constructor() { }

    async checkConnection(): Promise<boolean> {
        try {
            const isReachable = (await NetInfo.fetch()).isInternetReachable
            if (isReachable === null)
                throw 'oops'
            else return isReachable
        }
        catch (er) {
            throw new Error('Unable to get connectivity status')
        }
    }

    addNetworkListener(callback: Function) {
        return NetInfo.addEventListener(({ isInternetReachable }) => callback(isInternetReachable))
    }
}