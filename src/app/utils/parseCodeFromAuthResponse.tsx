import { URLParser } from "./URLParser"

export function parseCode(axiosResponse: any): string {
    try {
        if (axiosResponse && axiosResponse.request && axiosResponse.request.responseURL) {
            const params = new URLParser(axiosResponse.request.responseURL)
            const code = params.get('code')
            return code !== null ? code : ""
        }
        return ""
    }
    catch (er) {
        return ""
    }

}