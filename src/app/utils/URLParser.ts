export class URLParser {
    url: string
    regex: RegExp = /[?&]([^=#]+)=([^&#]*)/g
    params: Map<string, string> = new Map()

    constructor(url: string) {
        this.url = url
        let match: RegExpExecArray | null
        while (match = this.regex.exec(url)) {
            if (match !== null)
                this.params.set(match[1], match[2])
        }
    }

    get(key: string) {
        return this.params.get(key) ?? null
    }
}