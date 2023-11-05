import { Orm } from 'lambdaorm'
import { Helper } from '../helper'
import { OrmCliService } from '../services/ormCli'
import { SchemaService } from '../services/schema'
import path from 'path'

export class Create {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService, private readonly helper:Helper) {}

	public async execute (workspace:string, language:string, source?:string, dialect?:string, connection?:string): Promise<void> {
		const orm = new Orm(workspace)
		const schemaService = new SchemaService(orm, this.helper)
		const languageService = this.service.getLanguage(language)
		// const manager = new Manager(orm)
		// create workspace
		await this.helper.fs.create(workspace)
		// get or create config file
		let sourceSchema = await orm.schema.get(workspace)
		if (sourceSchema === null) {
			sourceSchema = await orm.schema.create()
		}
		// complete schema config
		const targetSchema = schemaService.completeSchema(sourceSchema, source, dialect, connection)
		// write lambdaorm config
		const configPath = path.join(workspace, 'lambdaORM.yaml')
		await schemaService.writeSchema(configPath, targetSchema)
		// create structure
		await languageService.createStructure(workspace, targetSchema)
		// add libraries for dialect
		await languageService.addDialects(workspace, targetSchema)
	}
}
