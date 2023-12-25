import { CliFacade } from '../cli'

export class VersionGlobal {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (): Promise<string> {
		return this.service.getGlobalPackage('lambdaorm-cli')
	}
}
