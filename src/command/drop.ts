/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm } from 'lambdaorm'
import path from 'path'

export class DropCommand implements CommandModule {
	command = 'drop';
	describe = 'Removes all database objects but not the database.';

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				describe: 'project path.'
			})
			.option('s', {
				alias: 'stage',
				describe: 'Name of stage'
			})
			.option('q', {
				alias: 'query',
				describe: 'Generates the queries but does not apply.'
			})
			.option('f', {
				alias: 'force',
				describe: 'If there is an error in a statement, continue executing the next statements.'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const stageName = args.stage as string
		const query = args.query !== undefined
		const force = args.force !== undefined
		const orm = new Orm(workspace)

		try {
			const schema = await orm.schema.get(workspace)
			await orm.init(schema)
			const stage = orm.schema.stage.get(stageName)

			if (query) {
				const sentences = await orm.stage.clean(stage.name).sentence()
				console.log(sentences)
			} else {
				const result = await orm.stage.clean(stage.name).execute(force)
				console.log(JSON.stringify(result, null, 2))
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
