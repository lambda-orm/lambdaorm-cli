import { Languages } from 'lib/application/services/languages'
import { CliFacade, Helper, OutputService } from '../../application'
import { NodeLanguageService, ClientNodeLanguageService } from '../languages'
import { OrmFactoryImp } from '../orm/factory'
import { SchemaFacadeBuilder } from 'lambdaorm'
import { WorkspaceFactoryImp } from '../workspace/factory'
import { expressions } from '3xpr'
import { h3lp } from 'h3lp'
export class CliFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor () {}
	public build ():CliFacade {
		const languages = new Languages()
		const helper = new Helper(h3lp)
		const outputService = new OutputService()
		const schemaFacade = new SchemaFacadeBuilder(expressions, helper).build()
		languages.add(new NodeLanguageService(schemaFacade, helper))
		languages.add(new ClientNodeLanguageService(schemaFacade, helper))
		const ormFactory = new OrmFactoryImp()
		const workspaceFactory = new WorkspaceFactoryImp(schemaFacade, helper)
		const service = new CliFacade(languages, ormFactory, workspaceFactory, outputService, helper, schemaFacade)
		return service
	}
}
