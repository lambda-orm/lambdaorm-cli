import { Dialect, Mapping, Schema, SchemaState, SchemaFacade, Source } from 'lambdaorm'
import { Helper, InitArgs, WorkspaceService } from '../../../application'
import path from 'path'

export class LocalWorkspaceService implements WorkspaceService {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly workspace:string,
		private readonly schemaState:SchemaState,
		private readonly schemaFacade:SchemaFacade,
		private readonly helper:Helper
	) {}

	public async init (args: InitArgs): Promise<void> {
		// create workspace
		await this.helper.fs.create(this.workspace)
		// get or create config file
		let sourceSchema = await this.schemaState.load(this.workspace)
		if (sourceSchema === null) {
			sourceSchema = this.schemaFacade.create()
		}
		// complete schema config
		const targetSchema = await this.completeSchema(sourceSchema, args.source, args.dialect, args.connection)
		// write lambdaorm config
		const configPath = path.join(this.workspace, 'lambdaORM.yaml')
		const _dataPath = args.dataPath || targetSchema.infrastructure?.paths?.data || 'data'
		await this.helper.cli.writeSchema(configPath, targetSchema)
		// create structure
		await this.createStructure(this.workspace, _dataPath)
	}

	private async completeSchema (_schema: Schema, sourceName?: string, dialect?: Dialect, connection?: any): Promise<Schema> {
		const schema = await this.schemaState.load(this.helper.obj.clone(_schema))
		let source:Source|undefined
		let mapping:Mapping|undefined
		if (schema.infrastructure === undefined) {
			mapping = { name: 'default', entities: [] }
			source = { name: 'default', dialect: dialect || Dialect.MySQL, mapping: mapping.name, connection }
			schema.infrastructure = { sources: [source], mappings: [{ name: 'default', entities: [] }], stages: [] }
		} else {
			if (!schema.infrastructure.mappings || schema.infrastructure.mappings.length === 0) {
				mapping = { name: 'default', entities: [] }
				schema.infrastructure.mappings = [mapping]
			} else {
				mapping = schema.infrastructure.mappings[0]
			}
			if (!schema.infrastructure.sources) {
				source = { name: 'default', dialect: dialect || Dialect.MySQL, mapping: schema.infrastructure.mappings[0].name, connection }
				schema.infrastructure.sources = []
			}
			if (sourceName && schema.infrastructure.sources && schema.infrastructure.sources.length > 1) {
				source = schema.infrastructure?.sources.find(p => p.name === sourceName)
				if (source === undefined) {
					throw Error(`source ${sourceName} not found`)
				}
			} else if (schema.infrastructure?.sources.length === 1) {
				source = schema.infrastructure.sources[0]
			}
		}
		// if the mapping does not exist it creates it
		if (source && mapping && schema.infrastructure.mappings) {
			if (source.mapping === undefined) {
				if (schema.infrastructure && schema.infrastructure.mappings.length > 0) {
					source.mapping = schema.infrastructure.mappings[0].name
				} else {
					source.mapping = mapping.name
				}
			}
		}
		// update the connection if applicable
		if (source) {
			if (!connection) {
				source.connection = connection
			} else if (!source.connection) {
				source.connection = this.defaultConnection(source.dialect)
			}
		}

		// if the stage does not exist, create it
		if (schema.infrastructure.stages === undefined) {
			schema.infrastructure.stages = []
		}
		if (source && schema.infrastructure.stages.length === 0) {
			schema.infrastructure.stages.push({ name: 'default', sources: [{ name: source.name }] })
		}
		return schema
	}

	private defaultConnection (dialect: string): any {
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

	private async createStructure (workspace:string, dataPath?:string): Promise<void> {
		// create initial structure
		if (dataPath) {
			await this.helper.fs.create(path.join(workspace, dataPath))
		}
	}
}
