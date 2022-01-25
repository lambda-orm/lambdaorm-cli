/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm } from 'lambdaorm'
import path from 'path'
import { Manager } from '../manager'

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
			.option('d', {
				alias: 'data',
				describe: 'Data file to import.'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const stageName = args.stage as string
		const data = args.data || {}

		if (data === undefined) {
			console.error('the data argument is required')
			return
		}
		const orm = new Orm(workspace)

		try {
			const schema = await orm.schema.get(workspace)
			await orm.init(schema)
			const stage = orm.schema.stage.get(stageName)
			const manager = new Manager(orm)
			// read Data
			const _data = await manager.readData(data)

			// // get content
			// const content = await Helper.readFile(source)
			// if (content === null) {
			// throw new Error(`source: ${source} not found or empty`)
			// }
			// // import data
			// const data = JSON.parse(content)
			await orm.stage.import(stage.name).execute(_data)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
