import { CliFacade } from '../cli'

export class Version {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (workspace:string, language:string): Promise<string> {
		const languageService = this.service.languages.get(language)
		return languageService.localVersion(workspace)
	}
}
