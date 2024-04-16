import { InitializeSchemaArgs } from 'lambdaorm'

export interface WorkspaceService {
	init (args:InitializeSchemaArgs): Promise<void>
}

export interface WorkspaceFactory {
	create (workspace:string, url?:string): WorkspaceService
}
