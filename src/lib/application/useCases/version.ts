import { OrmCliService } from '../services/ormCli'

export class Version {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService) {}

	public async execute (workspace:string, language:string): Promise<string> {
		const languageService = this.service.getLanguage(language)
		return languageService.localVersion(workspace)
	}
}
