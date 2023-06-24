import { ApplicationService, Helper } from '../../application'
import { NodeLanguageAdapter } from '../languages'
export class ApplicationBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly helper:Helper) {}
	public build ():ApplicationService {
		const application = new ApplicationService(this.helper)
		application.addLanguage(new NodeLanguageAdapter(this.helper))
		return application
	}
}
