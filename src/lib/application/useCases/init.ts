import { CliFacade } from '../cli'
import { InitArgs } from '../ports/workspace'

export class Init {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (args:InitArgs): Promise<void> {
		const workspaceService = this.service.workspace.create(args.workspace, args.url)
		await workspaceService.init(args)
	}
}
