import { SchemaFacade, SchemaState } from 'lambdaorm'
import { WorkspaceFactory, WorkspaceService, Helper } from '../../application'
import { ClientWorkspaceService } from './adapters/client'
import { LocalWorkspaceService } from './adapters/local'

export class WorkspaceFactoryImp implements WorkspaceFactory {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly schemaState:SchemaState,
		private readonly schemaFacade:SchemaFacade,
		private readonly helper:Helper) {}

	public create (workspace:string, url?:string): WorkspaceService {
		if (url) {
			return new ClientWorkspaceService(workspace, url, this.helper)
		}
		return new LocalWorkspaceService(workspace, this.schemaState, this.schemaFacade, this.helper)
	}
}
