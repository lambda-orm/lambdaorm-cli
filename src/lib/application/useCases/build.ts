import { OrmCliService } from '../services/ormCli'
export class Build {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService) {}

	public async execute (workspace:string, language:string, options:string[], srcPath?:string, dataPath?: string, domainPath?:string): Promise<void> {
		const orm = this.service.createOrm({ workspace })
		try {
			await orm.init()
			orm.build({ language, options, srcPath, dataPath, domainPath })
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
