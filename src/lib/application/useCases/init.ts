import { CliFacade } from '../cli'

export class Init {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (workspace:string, source?:string, dialect?:string, connection?:string, dataPath?:string, host?:string): Promise<void> {
		const workspaceService = this.service.workspace.create(workspace, host)
		await workspaceService.init({ source, dialect, connection, dataPath })
	}
}
