import { SqliteRepository } from "../../repositories/sqlite"

export class GetConfigList {
    sqliteRepo: SqliteRepository

    constructor(sqliteRepo: SqliteRepository) {
        this.sqliteRepo = sqliteRepo
    }

    execute(userId: string | null) {
        return this.sqliteRepo.getAll(userId)
    }
}