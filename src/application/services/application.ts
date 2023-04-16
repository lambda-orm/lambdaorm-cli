import { Orm } from 'lambdaorm'
import { helper } from '../helper'
import path from 'path'
import { SchemaService } from './schema'
import { LanguageService } from './language'

export class ApplicationService {
	public async create (workspace:string, source?:string, dialect?:string, connection?:string): Promise<void> {
		const orm = new Orm(workspace)
		const schemaService = new SchemaService(orm)
		const languageService = new LanguageService(workspace)
		// const manager = new Manager(orm)
		// create workspace
		await helper.fs.create(workspace)
		// create config file if not exists
		const sourceSchema = await orm.schema.get(workspace)
		// complete schema config
		const targetSchema = schemaService.completeSchema(sourceSchema, source, dialect, connection)
		// write lambdaorm config
		const configPath = path.join(workspace, 'lambdaORM.yaml')
		await schemaService.writeSchema(configPath, targetSchema)
		// create structure
		await languageService.createStructure(targetSchema)
		// add libraries for dialect
		await languageService.addDialects(targetSchema)
	}

	public async update (workspace:string, onlyModel:boolean): Promise<void> {
		const orm = new Orm(workspace)
		const languageService = new LanguageService(workspace)
		const schema = await orm.schema.get(workspace)
		if (!onlyModel) {
			// create structure
			await languageService.createStructure(schema)
			// add libraries for dialect
			await languageService.addDialects(schema)
		}
		// TODO cambiar por complete dado que el modelo se debe escribir sin extenderlo
		orm.schema.complete(schema)
		// write model
		await languageService.buildModel(schema)
		// write repositories
		await languageService.buildRepositories(schema)
	}

	public async synchronize (workspace:string, stage?:string, output?:string, force = false): Promise<void> {
		const orm = new Orm(workspace)
		try {
			const schema = await orm.schema.get(workspace)
			await orm.init(schema)
			const _stage = orm.schema.stage.get(stage)
			if (output) {
				const sentence = await orm.stage.sync({ stage: _stage.name }).sentence()
				console.log(sentence)
			} else {
				await orm.stage.sync({ stage: _stage.name, tryAllCan: force }).execute()
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			orm.end()
		}
	}

	public async globalVersion (): Promise<string> {
		return this.getGlobalPackage('lambdaorm-cli')
	}

	public async localVersion (workspace:string): Promise<string> {
		const languageService = new LanguageService(workspace)
		return languageService.localVersion()
	}

	public async getGlobalPackage (name:string): Promise<string> {
		const exp = new RegExp(`${name}@(.*)\n`)
		const globalNpmList = await helper.cli.exec('npm list -g --depth=0')
		const globalMatches = globalNpmList.match(exp)
		return (globalMatches && globalMatches[1] ? globalMatches[1] : '').replace(/"invalid"/gi, '').trim()
	}
}
