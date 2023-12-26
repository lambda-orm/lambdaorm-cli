import { CliFacade } from '../cli'
import { BuildArgs } from '../ports/orm'

export class Build {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}
	public async execute (args:BuildArgs): Promise<void> {
		try {
			const languageService = this.service.languages.get(args.language)
			languageService.build(args)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
