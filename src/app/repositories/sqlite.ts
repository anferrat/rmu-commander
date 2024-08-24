import { DB, open } from '@op-engineering/op-sqlite'
import { Config } from '../entities/Config'

export class SqliteRepository {
    db: DB

    constructor() {
        this.db = open({
            name: 'commander.sqlite'
        })
    }

    async initialize() {
        try {
            await Promise.all(
                [
                    this.db.executeAsync('CREATE TABLE IF NOT EXISTS configs (id INTEGER PRIMARY KEY NOT NULL, name TEXT, companyId TEXT, groupId TEXT, siteId TEXT, userId TEXT, offFirst BOOLEAN, cycle_on INTEGER, cycle_off INTEGER, note TEXT, timeModified INTEGER)'),
                ]
            )
        }
        catch (er) {
            throw new Error('Unable to initialize database')
        }
    }

    async create(config: Config) {
        const { name, companyId, siteId, userId, on, off, note, groupId, timeModified } = config
        try {
            const { insertId } = await this.db.executeAsync('INSERT INTO configs (name, companyId, siteId, userId, cycle_on, cycle_off, note, groupId, timeModified) VALUES (?,?,?,?,?,?,?,?,?)', [name, companyId, siteId, userId, on, off, note, groupId, timeModified])
            if (insertId !== undefined)
                return new Config(insertId, name, companyId, groupId, userId, siteId, on, off, note, timeModified)
            else throw 'oops'
        }
        catch (er) {
            throw new Error('Unable to add new config')
        }
    }

    async update(config: Config) {
        const { id, name, companyId, siteId, userId, on, off, note, groupId, timeModified } = config
        try {
            const result = await this.db.executeAsync('UPDATE configs SET name=?, companyId=?, siteId=?, userId=?, cycle_on=?, cycle_off=?, note=?, groupId=?, timeModified=? WHERE id=?', [name, companyId, siteId, userId, on, off, note, groupId, timeModified, id])
            if (result.rowsAffected > 0)
                return config
            else
                throw 'oops'
        }
        catch (er) {
            throw new Error('Unable to update config')
        }
    }

    async getById(configId: number) {
        try {
            const { rows } = await this.db.executeAsync('SELECT * FROM configs WHERE id=?', [configId])
            const { id, name, companyId, siteId, userId, cycle_on, cycle_off, note, groupId, timeModified } = rows?._array[0]
            return new Config(id, name, companyId, groupId, userId, siteId, cycle_on, cycle_off, note, timeModified)
        }
        catch (er) {
            throw new Error('Unable to get config by id')
        }
    }

    async delete(configId: number) {
        try {
            await this.db.executeAsync('DELETE from configs WHERE id=?', [configId])
        }
        catch (er) {
            throw new Error('Unable to delete config')
        }
    }

    async getAll(userId: string | null) {
        try {
            const { rows } = await this.db.executeAsync('SELECT * FROM configs WHERE userId = ? ORDER BY name', [userId])
            const result: Config[] = []
            rows?._array.forEach(({ id, name, companyId, siteId, userId, cycle_on, cycle_off, note, groupId, timeModified }) => {
                result.push(new Config(id, name, companyId, groupId, userId, siteId, cycle_on, cycle_off, note, timeModified))
            })
            return result
        }
        catch (er) {
            throw new Error('Unable to delete config')
        }
    }

    reset() {
        try {
            return this.db.execute('DROP TABLE configs')
        }
        catch (er) {
            throw new Error('Unable to delete database')
        }
    }

}