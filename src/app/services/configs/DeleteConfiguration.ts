import { SqliteRepository } from "../../repositories/sqlite"
import { CommandListener } from "../corview.cloud/CommandListener"

export class DeleteConfiguration {
    sqliteRepo: SqliteRepository
    commandListener: CommandListener

    constructor(sqliteRepo: SqliteRepository, commandListener: CommandListener) {
        this.sqliteRepo = sqliteRepo
        this.commandListener = commandListener
    }

    execute(id: number, siteId: string, companyId: string) {
        this.commandListener.deleteItem(siteId, companyId)
        return this.sqliteRepo.delete(id)
    }
}