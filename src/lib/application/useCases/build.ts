import { Orm } from 'lambdaorm'
import { OrmCliService } from '../services/ormCli'
import path from 'path'
export class Build {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService) {}

	public async execute (workspace:string, language:string, options:string[], srcPath?:string, dataPath?: string, domainPath?:string): Promise<void> {
		const orm = new Orm(workspace)
		const languageService = this.service.getLanguage(language)
		let schema = await orm.schema.get(workspace)
		if (schema === null) {
			throw new Error(`Can't found schema in ${workspace}`)
		}
		const _srcPath = srcPath || schema.infrastructure.paths.src
		const _dataPath = dataPath || schema.infrastructure.paths.data
		const _domainPath = domainPath || schema.infrastructure.paths.domain
		schema = await orm.schema.initialize(schema)
		await languageService.updateStructure(workspace, _srcPath, _dataPath)
		// add libraries for dialect
		if (schema.infrastructure && schema.infrastructure.sources && schema.infrastructure.sources.length > 0) {
			await languageService.addDialects(workspace, schema.infrastructure)
		}
		// TODO cambiar por complete dado que el modelo se debe escribir sin extenderlo
		orm.schema.complete(schema)
		const __domainPath = path.join(workspace, _srcPath, _domainPath)
		if (options.includes('model')) {
			await languageService.buildModel(__domainPath, schema.domain)
		}
		if (options.includes('repositories')) {
			await languageService.buildRepositories(__domainPath, schema.domain)
		}
	}
}
