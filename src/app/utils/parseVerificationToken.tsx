export function parseVerificationToken(html: string): string {
    try {
        const PARAMETER: string = '<input name="__RequestVerificationToken" type="hidden" value="'
        const position: number = html.search(PARAMETER)
        if (~position) {
            const start: number = position + PARAMETER.length
            const cutOff: string = html.substring(start)
            return html.substring(start, start + cutOff.search('"'))
        }
        return ""
    }
    catch (er) {
        return ""
    }
}