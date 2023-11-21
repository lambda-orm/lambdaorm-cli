import { Orm } from 'lambdaorm'
import { OrmCliService } from '../services/ormCli'
import path from 'path'

export class Update {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService) {}

	public async execute (workspace:string, language:string, onlyModel:boolean, srcPath?:string, dataPath?:string): Promise<void> {
		const orm = new Orm(workspace)
		const languageService = this.service.getLanguage(language)
		let schema = await orm.schema.get(workspace)
		if (schema === null) {
			throw new Error(`Can't found schema in ${workspace}`)
		}
		schema = await orm.schema.initialize(schema)
		const _srcPath = srcPath || schema.infrastructure.paths.src
		const _dataPath = dataPath || schema.infrastructure.paths.data
		if (!onlyModel) {
			// create structure

			await languageService.createStructure(workspace, _srcPath, _dataPath)
			// add libraries for dialect
			if (schema.infrastructure && schema.infrastructure.sources && schema.infrastructure.sources.length > 0) {
				await languageService.addDialects(workspace, schema.infrastructure)
			}
		}
		// TODO cambiar por complete dado que el modelo se debe escribir sin extenderlo
		orm.schema.complete(schema)
		// write model and repositories
		const modelPath = path.join(workspace, _srcPath, _dataPath)
		await languageService.buildModel(modelPath, schema.domain)
		await languageService.buildRepositories(modelPath, schema.domain)
	}
}
