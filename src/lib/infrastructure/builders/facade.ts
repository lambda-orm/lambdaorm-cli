import { Languages } from '../../application/services/languages'
import { CliFacade, Helper, OutputService } from '../../application'
import { NodeLanguageService, ClientNodeLanguageService } from '../languages'
import { OrmFactoryImp } from '../orm/factory'
import { LoggerBuilder, SchemaFacadeBuilder, SchemaStateBuilder } from 'lambdaorm'
import { WorkspaceFactoryImp } from '../workspace/factory'
import { expressions } from '3xpr'
import { h3lp } from 'h3lp'
export class CliFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor () {}
	public build ():CliFacade {
		const languages = new Languages()
		const logger = new LoggerBuilder().build()
		const helper = new Helper(h3lp, logger)
		const outputService = new OutputService()
		const schemaFacade = new SchemaFacadeBuilder(expressions, helper).build()
		const schemaState = new SchemaStateBuilder(expressions, schemaFacade, helper).build()
		languages.add(new NodeLanguageService(schemaState, helper))
		languages.add(new ClientNodeLanguageService(schemaState, helper))
		const ormFactory = new OrmFactoryImp()
		const workspaceFactory = new WorkspaceFactoryImp(schemaState, schemaFacade, helper)
		const service = new CliFacade(languages, ormFactory, workspaceFactory, outputService, helper, schemaFacade)
		return service
	}
}
