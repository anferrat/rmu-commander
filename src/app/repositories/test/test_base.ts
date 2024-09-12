export abstract class TestRepo {
    private MAX = 400
    private MIN = 100

    constructor() {
    }

    private getRandomDelay() {
        const diff = (this.MAX - this.MIN)
        return Math.round((Math.random() * diff) * 100) / 100 + this.MIN
    }

    _getDelayed<T>(func: () => T): Promise<T> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve.bind(this, func()), this.getRandomDelay())
        })
    }

}