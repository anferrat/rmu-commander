export type Response<Type> = {
    response: Type | null,
    isOk: boolean,
    error: string | null
}



export type Listener = {
    remove: () => void
}

export class Controller {

    async execute<Type>(service: Function): Promise<Response<Type>> {
        try {
            const result: Type = await service()
            return {
                response: result,
                isOk: true,
                error: null
            }
        }
        catch (er) {
            return {
                response: null,
                isOk: false,
                error: String(er),
            }
        }
    }
}