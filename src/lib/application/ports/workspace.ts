import { Dialect } from 'lambdaorm'

export interface InitArgs {
	workspace:string
	url?:string
	source?:string
	dialect?:Dialect
	connection?:string
	dataPath?:string
}

export interface WorkspaceService {
	init (args:InitArgs): Promise<void>
}

export interface WorkspaceFactory {
	create (workspace:string, url?:string): WorkspaceService
}
