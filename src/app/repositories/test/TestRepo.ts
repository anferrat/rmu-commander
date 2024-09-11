export abstract class TestRepo {
    private NUMBER_OF_DELAYS = 5
    private delays: number[] = []
  
    constructor() {
      }

    _getDelayed<T>(func: () => T): Promise<T> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve.bind(this, func()), 1000)
        })
    }

}