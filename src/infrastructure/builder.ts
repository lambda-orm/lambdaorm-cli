import { ApplicationService } from '../application'
import { NodeLanguageAdapter } from './languages'
export class ApplicationBuilder {
	public build ():ApplicationService {
		const application = new ApplicationService()
		application.addLanguage(new NodeLanguageAdapter())
		return application
	}
}
