export interface InitArgs {
	source?:string
	dialect?:string
	connection?:string
	dataPath?:string
}

export interface WorkspaceService {
	init (args:InitArgs): Promise<void>
}

export interface WorkspaceFactory {
	create (workspace:string, hots?:string): WorkspaceService
}
