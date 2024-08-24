import { Config } from "../../entities/Config";
import { SqliteRepository } from "../../repositories/sqlite";

export class GetConfigurationById {
    sqliteRepo: SqliteRepository

    constructor(sqliteRepo: SqliteRepository) {
        this.sqliteRepo = sqliteRepo
    }

    execute(id: number) {
        return this.sqliteRepo.getById(id)
    }
}