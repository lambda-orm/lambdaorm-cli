import { OrmFactory, OrmFactoryArgs, OrmService } from '../../application'
import { RestOrmService } from './adapters/rest'
import { LibOrmService } from './adapters/lib'

export class OrmFactoryImp implements OrmFactory {
	// eslint-disable-next-line no-useless-constructor
	public constructor () {}

	public create (args: OrmFactoryArgs): OrmService {
		const workspace = args.workspace || process.cwd()
		if (args.url) {
			return new RestOrmService(args.url)
		}
		return new LibOrmService(workspace)
	}
}
