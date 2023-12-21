import { Languages } from '../../application/services/languages'
import { CliOrm, OrmFactory, OrmFactoryArgs } from '../../application/orm/orm'
import { OrmClientWrapper } from './adapters/client'
import { OrmWrapper } from './adapters/lib'

export class OrmFactoryImp implements OrmFactory {
	// eslint-disable-next-line no-useless-constructor
	public constructor (private readonly languages: Languages) {}

	public create (args: OrmFactoryArgs): CliOrm {
		const workspace = args.workspace || process.cwd()
		if (args.host) {
			return new OrmClientWrapper(this.languages, workspace, args.host)
		}
		return new OrmWrapper(this.languages, workspace)
	}
}
