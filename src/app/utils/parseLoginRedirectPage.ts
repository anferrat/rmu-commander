export function parseLoginRedirectPage(url: string): string {
    const address: string = url.split('?')[0]
    return address.substring(address.lastIndexOf('/') + 1)
}