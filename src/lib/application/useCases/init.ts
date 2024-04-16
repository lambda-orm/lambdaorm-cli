import { CliFacade } from '../cli'
import { InitializeSchemaArgs } from 'lambdaorm'

export class Init {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (args:InitializeSchemaArgs): Promise<void> {
		const workspaceService = this.service.workspace.create(args.workspace, args.url)
		await workspaceService.init(args)
	}
}
