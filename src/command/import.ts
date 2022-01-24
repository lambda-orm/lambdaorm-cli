/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm, Helper } from 'lambdaorm'
import path from 'path'

export class ImportCommand implements CommandModule {
	command = 'import';
	describe = 'Import data from file to database';

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
			.option('s', {
				alias: 'source',
				describe: 'Source file to import.'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const stageName = args.stage as string
		const source = args.source as string
		const orm = new Orm(workspace)

		if (source === undefined) {
			console.error('the source argument is required')
			return
		}

		try {
			const schema = await orm.schema.get(workspace)
			const stage = orm.schema.stage.get(stageName)
			await orm.init(schema)
			// get content
			const content = await Helper.readFile(source)
			if (content === null) {
				throw new Error(`source: ${source} not found or empty`)
			}
			// import data
			const data = JSON.parse(content)
			await orm.stage.import(stage.name).execute(data)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
