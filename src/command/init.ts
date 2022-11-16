import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { Orm } from 'lambdaorm'
import { h3lp } from 'h3lp'
import { Manager } from '../manager'

export class InitCommand implements CommandModule {
	command = 'init'
	describe = 'Generates lambdaorm project structure.'

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				default: 'my-project',
				describe: 'project path.'
			})
			.option('s', {
				alias: 'source',
				describe: 'Name of data source.'
			})
			.option('d', {
				alias: 'dialect',
				describe: 'Database type you\'ll use in your project.'
			})
			.option('c', {
				alias: 'connection',
				describe: 'string connection to database'
			})
	}

	async handler (args: Arguments) {
		try {
			const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
			const source:string|undefined = args.source as string
			const dialect: string = args.dialect as string
			const connection: string = args.connection as string
			const orm = new Orm(workspace)
			const manager = new Manager(orm)
			// create workspace
			await h3lp.fs.create(workspace)
			// create config file if not exists
			const sourceSchema = await orm.schema.get(workspace)
			// complete schema config
			const targetSchema = manager.completeSchema(sourceSchema, source, dialect, connection)
			// write lambdaorm config
			const configPath = path.join(workspace, 'lambdaORM.yaml')
			await manager.writeSchema(configPath, targetSchema)
			// create structure
			await manager.createStructure(targetSchema)
			// add libraries for dialect
			await manager.addDialects(targetSchema)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
