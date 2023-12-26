import { Helper, InitArgs, WorkspaceService } from '../../../application'
import { Orm, SchemaFacade } from 'lambdaorm-client-node'
import path from 'path'

export class ClientWorkspaceService implements WorkspaceService {
	private orm: Orm
	constructor (private readonly workspace:string,
		private readonly url:string,
		private readonly schemaFacade:SchemaFacade,
		private readonly helper:Helper
	) {
		this.orm = new Orm(this.url)
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async init (args: InitArgs): Promise<void> {
		try {
			// create workspace
			await this.helper.fs.create(this.workspace)
			// init orm
			await this.orm.init(args.url)
			// create initial structure
			const domainSchema = await this.orm.schema.domain()
			const schema = { domain: domainSchema, infrastructure: { service: { url: this.url }, paths: this.schemaFacade.createService.newPathsApp() } }
			// write lambdaorm config
			const configPath = path.join(this.workspace, 'lambdaORM.yaml')
			await this.helper.cli.writeSchema(configPath, schema)
		} catch (error) {
			await this.orm.end()
			throw error
		}
	}
}
