import { Languages } from 'lib/application/services/languages'
import { OrmCliService, Helper } from '../../application'
import { NodeLanguageAdapter, ClientNodeLanguageAdapter } from '../languages'
import { OrmFactoryImp } from '../orm/factory'
export class OrmCliServiceBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly helper:Helper) {}
	public build ():OrmCliService {
		const languages = new Languages()
		languages.add(new NodeLanguageAdapter(this.helper))
		languages.add(new ClientNodeLanguageAdapter(this.helper))
		const ormFactory = new OrmFactoryImp(languages)
		const service = new OrmCliService(ormFactory, this.helper)
		return service
	}
}
