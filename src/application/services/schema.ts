import { Dialect, Orm, Schema } from 'lambdaorm'
import { helper } from '../helper'
import path from 'path'
const yaml = require('js-yaml')

export class SchemaService {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly orm:Orm) {}

	public completeSchema (_schema: Schema, sourceName?: string, dialect?: string, connection?: any): Schema {
		const schema:Schema = helper.obj.clone(_schema)
		this.orm.schema.complete(schema)
		let source:any
		if (sourceName !== undefined) {
			source = schema.data.sources.find(p => p.name === sourceName)
			if (source === undefined) {
				throw Error(`source ${sourceName} not found`)
			}
		} else if (schema.data.sources.length === 1) {
			source = schema.data.sources[0]
		} else {
			// If the database is not defined, it creates it.
			if (connection === undefined) {
				connection = this.defaultConnection(dialect || Dialect.MySQL)
			}
			source = { name: 'test', dialect: dialect || Dialect.MySQL, mapping: source, connection }
			schema.data.sources.push(source)
		}
		// if database is defined, update dialect if applicable
		if ((dialect !== undefined && source.dialect !== dialect) || (source.dialect === undefined)) {
			source.dialect = dialect || Dialect.MySQL
		}
		// update the connection if applicable
		if (connection !== undefined) {
			source.connection = connection
		} else if (source.connection === undefined) {
			source.connection = this.defaultConnection(source.dialect)
		}
		// set the mapping if it was not set
		if (schema.data.mappings === undefined) {
			schema.data.mappings = []
		}
		if (source.mapping === undefined) {
			if (schema.data.mappings.length > 0) {
				source.mapping = schema.data.mappings[0].name
			} else {
				source.mapping = source.name
			}
		}
		// if the mapping does not exist it creates it
		const mapping = schema.data.mappings.find(p => p.name === source.mapping)
		if (mapping === undefined) {
			schema.data.mappings.push({ name: source.mapping, entities: [] })
		}
		// if the stage does not exist, create it
		if (schema.data.stages === undefined) {
			schema.data.stages = []
		}
		if (schema.data.stages.length === 0) {
			schema.data.stages.push({ name: 'default', sources: [{ name: source.name }] })
		}
		return schema
	}

	public defaultConnection (dialect: string): any {
		switch (dialect) {
		case Dialect.MySQL:
			return {
				host: 'localhost',
				port: 3306,
				user: 'test',
				password: 'test',
				database: 'test',
				multipleStatements: true,
				waitForConnections: true,
				connectionLimit: 10,
				queueLimit: 0
			}
		case Dialect.MariaDB:
			return {
				host: 'localhost',
				port: 3306,
				user: 'test',
				password: 'test',
				database: 'test',
				multipleStatements: true,
				waitForConnections: true,
				connectionLimit: 10,
				queueLimit: 0
			}
		// case 'sqlite':
		// return {
		// database: 'database.sqlite'
		// }
		// case 'better-sqlite3':
		// return {
		// database: 'database.sqlite'
		// }
		case Dialect.PostgreSQL:
			return {
				host: 'localhost',
				port: 5432,
				username: 'test',
				password: 'test',
				database: 'test'
			}
		case Dialect.SqlServer:
			return {
				// host: 'localhost',
				// username: 'sa',
				// password: 'Admin12345',
				// database: 'tempDb',
				server: 'localhost',
				authentication: { type: 'default', options: { userName: 'sa', password: 'Admin12345' } },
				options: { encrypt: false, database: 'tempDb' }
			}
		case Dialect.Oracle:
			return {
				host: 'localhost',
				username: 'system',
				password: 'oracle',
				port: 1521,
				sid: 'xe.oracle.docker'
			}
		case Dialect.MongoDB:
			return {
				url: 'mongodb://@localhost:27017',
				database: 'test'
			}
		default:
			throw new Error(`dialect: ${dialect} not supported`)
		}
	}

	public async writeSchema (configPath:string, schema: Schema): Promise<void> {
		if (path.extname(configPath) === '.yaml' || path.extname(configPath) === '.yml') {
			const content = yaml.dump(schema)
			await helper.fs.write(configPath, content)
		} else if (path.extname(configPath) === '.json') {
			const content = JSON.stringify(schema, null, 2)
			await helper.fs.write(configPath, content)
		} else {
			throw new Error(`Config file: ${configPath} not supported`)
		}
	}
}
