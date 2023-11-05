import { Orm } from 'lambdaorm'
import { OrmCliService } from '../services/ormCli'

export class Update {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService) {}

	public async execute (workspace:string, language:string, onlyModel:boolean): Promise<void> {
		const orm = new Orm(workspace)
		const languageService = this.service.getLanguage(language)
		let schema = await orm.schema.get(workspace)
		if (schema === null) {
			throw new Error(`Can't found schema in ${workspace}`)
		}
		schema = await orm.schema.initialize(schema)
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
}
