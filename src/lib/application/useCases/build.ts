import { Orm } from 'lambdaorm'
import { OrmCliService } from '../services/ormCli'
import path from 'path'
export class Build {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService) {}

	public async execute (workspace:string, language:string, options:string[], srcPath?:string, dataPath?:string): Promise<void> {
		const orm = new Orm(workspace)
		const languageService = this.service.getLanguage(language)
		const schema = await orm.schema.get(workspace)
		if (schema === null) {
			throw new Error(`Can't found schema in ${workspace}`)
		}
		const _srcPath = srcPath || schema.infrastructure.paths.src
		const _dataPath = dataPath || schema.infrastructure.paths.data
		const modelPath = path.join(workspace, _srcPath, _dataPath)
		if (options.includes('model')) {
			await languageService.buildModel(modelPath, schema.domain)
		}
		if (options.includes('repositories')) {
			await languageService.buildRepositories(modelPath, schema.domain)
		}
	}
}
