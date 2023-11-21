import { OrmCliService, Helper } from '../../application'
import { NodeLanguageAdapter, ClientNodeLanguageAdapter } from '../languages'
export class OrmCliServiceBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly helper:Helper) {}
	public build ():OrmCliService {
		const service = new OrmCliService(this.helper)
		service.addLanguage(new NodeLanguageAdapter(this.helper))
		service.addLanguage(new ClientNodeLanguageAdapter(this.helper))
		return service
	}
}
