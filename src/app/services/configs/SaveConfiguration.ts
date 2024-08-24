import { Config } from "../../entities/Config";
import { SqliteRepository } from "../../repositories/sqlite";

export class SaveConfiguration {
    sqliteRepo: SqliteRepository

    constructor(sqliteRepo: SqliteRepository) {
        this.sqliteRepo = sqliteRepo
    }

    async execute(id: number | null, name: string, on: number, off: number, note: string, companyId: string, siteId: string, userId: string, groupId: string | null) {
        const timestamp = Date.now()
        const config = new Config(id, name, companyId, groupId, userId, siteId, on, off, note, timestamp)
        return await (
            id === null ?
                this.sqliteRepo.create(config) :
                this.sqliteRepo.update(config))
    }
}