import { Orm } from 'lambdaorm'
import { OrmCliService } from '../services/ormCli'

export class Build {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService) {}

	public async execute (workspace:string, language:string, options:string[]): Promise<void> {
		const orm = new Orm(workspace)
		const languageService = this.service.getLanguage(language)
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
}
