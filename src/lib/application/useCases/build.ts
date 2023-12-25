import { CliFacade } from '../cli'

export class Build {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}
	public async execute (workspace:string, language:string, options:string[], srcPath?:string, dataPath?: string, domainPath?:string): Promise<void> {
		try {
			const languageService = this.service.languages.get(language)
			languageService.build({ workspace, language, options, srcPath, dataPath, domainPath })
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
