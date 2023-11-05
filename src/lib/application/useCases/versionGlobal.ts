import { OrmCliService } from '../services/ormCli'

export class VersionGlobal {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService) {}

	public async execute (): Promise<string> {
		return this.service.getGlobalPackage('lambdaorm-cli')
	}
}
