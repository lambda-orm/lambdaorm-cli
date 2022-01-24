import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { Orm, Helper } from 'lambdaorm'
import { Manager } from '../manager'

export class InitCommand implements CommandModule {
	command = 'init';
	describe = 'Generates lambdaorm project structure.';

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				default: 'my-project',
				describe: 'project path.'
			})
			.option('n', {
				alias: 'name',
				describe: 'Name of database.'
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
			const workspace = path.resolve(process.cwd(), args.workspace as string || '.') // args.workspace as string || path.join(process.cwd(), name)
			const database = args.name as string || path.basename(workspace) // name of database
			const dialect: string = args.dialect as string
			const connection: string = args.connection as string
			const orm = new Orm(workspace)
			const manager = new Manager(orm)

			// create workspace
			await Helper.createIfNotExists(workspace)
			// create config file if not exists
			const schema = await orm.schema.get(workspace)
			// if (config.app.workspace === undefined) {
			// config.app.workspace = workspace
			// }
			manager.completeSchema(schema, database, dialect, connection)
			// write lambdaorm config
			const configPath = path.join(workspace, 'lambdaorm.yaml')
			await manager.writeSchema(configPath, schema)
			// create structure
			await manager.createStructure(schema)
			// add libraries for dialect
			await manager.addDialects(schema)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
