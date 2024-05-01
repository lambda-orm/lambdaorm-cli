import { SchemaState, InitializeSchemaArgs } from 'lambdaorm'
import { OrmCliH3lp, WorkspaceService } from '../../../application'

export class LocalWorkspaceService implements WorkspaceService {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly workspace:string,
		private readonly state:SchemaState,
		private readonly helper:OrmCliH3lp
	) {}

	public async init (args: InitializeSchemaArgs): Promise<void> {
		const workspace = args.workspace || this.workspace
		if (!await this.helper.fs.exists(workspace)) {
			await this.helper.fs.create(workspace)
		}
		await this.state.initialize({
			workspace,
			source: args.source,
			dialect: args.dialect,
			connection: args.connection,
			dataPath: args.dataPath
		})
	}
}
