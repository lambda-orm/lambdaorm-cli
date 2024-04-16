import { OrmCliH3lp, WorkspaceService } from '../../../application'
import { InitializeSchemaArgs } from 'lambdaorm'
import { Orm } from 'lambdaorm-client-node'
import path from 'path'
const yaml = require('js-yaml')

export class ClientWorkspaceService implements WorkspaceService {
	private orm: Orm
	constructor (private readonly workspace:string,
		private readonly url:string,
		private readonly helper:OrmCliH3lp
	) {
		this.orm = new Orm(this.url)
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async init (args: InitializeSchemaArgs): Promise<void> {
		try {
			// create workspace
			await this.helper.fs.create(this.workspace)
			// init orm
			await this.orm.init(args.url)
			// create initial structure
			const domainSchema = await this.orm.schema.domain()
			const schema = { domain: domainSchema, infrastructure: { service: { url: this.url } } }
			// write lambdaorm config
			const configPath = path.join(this.workspace, 'lambdaORM.yaml')
			await this.helper.fs.write(configPath, yaml.dump(schema))
		} catch (error) {
			await this.orm.end()
			throw error
		}
	}
}
