import { Orm } from 'lambdaorm'
import { Helper } from '../helper'
import path from 'path'
import { SchemaService } from './schema'
import { LanguagePort } from '../../domain'

export class ApplicationService {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly helper:Helper, private readonly languages:LanguagePort[] = []) {}

	public addLanguage (value:LanguagePort):void {
		this.languages.push(value)
	}

	private getLanguage (name = 'node'): LanguagePort {
		const languagePort = this.languages.find(p => p.name === name)
		if (languagePort === undefined) {
			throw new Error(`Language ${name} not found`)
		}
		return languagePort
	}

	public async create (workspace:string, language:string, source?:string, dialect?:string, connection?:string): Promise<void> {
		const orm = new Orm(workspace)
		const schemaService = new SchemaService(orm, this.helper)
		const languageService = this.getLanguage(language)
		// const manager = new Manager(orm)
		// create workspace
		await this.helper.fs.create(workspace)
		// create config file if not exists
		const sourceSchema = await orm.schema.get(workspace)
		if (sourceSchema === null) {
			throw new Error(`Can't found source schema in ${workspace}`)
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

	public async update (workspace:string, language:string, onlyModel:boolean): Promise<void> {
		const orm = new Orm(workspace)
		const languageService = this.getLanguage(language)
		const schema = await orm.schema.get(workspace)
		if (schema === null) {
			throw new Error(`Can't found schema in ${workspace}`)
		}
		if (!onlyModel) {
			// create structure
			await languageService.createStructure(workspace, schema)
			// add libraries for dialect
			await languageService.addDialects(workspace, schema)
		}
		// TODO cambiar por complete dado que el modelo se debe escribir sin extenderlo
		orm.schema.complete(schema)
		// write model
		await languageService.buildModel(workspace, schema)
		// write repositories
		await languageService.buildRepositories(workspace, schema)
	}

	public async build (workspace:string, language:string, options:string[]): Promise<void> {
		const orm = new Orm(workspace)
		const languageService = this.getLanguage(language)
		const schema = await orm.schema.get(workspace)
		if (schema === null) {
			throw new Error(`Can't found schema in ${workspace}`)
		}
		if (options.includes('model')) {
			// write model
			await languageService.buildModel(workspace, schema)
		}
		if (options.includes('repositories')) {
			// write repositories
			await languageService.buildRepositories(workspace, schema)
		}
	}

	public async synchronize (workspace:string, stage?:string, output?:string, force = false): Promise<void> {
		const orm = new Orm(workspace)
		try {
			const schema = await orm.schema.get(workspace)
			if (schema === null) {
				throw new Error(`Can't found schema in ${workspace}`)
			}
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

	public async localVersion (workspace:string, language:string): Promise<string> {
		const languageService = this.getLanguage(language)
		return languageService.localVersion(workspace)
	}

	public async getGlobalPackage (name:string): Promise<string> {
		const exp = new RegExp(`${name}@(.*)\n`)
		const globalNpmList = await this.helper.cli.exec('npm list -g --depth=0')
		const globalMatches = globalNpmList.match(exp)
		return (globalMatches && globalMatches[1] ? globalMatches[1] : '').replace(/"invalid"/gi, '').trim()
	}
}
