/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm } from 'lambdaorm'
import path from 'path'
import { Manager } from '../manager'
import dotenv from 'dotenv'

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
			.option('e', {
				alias: 'envfile',
				describe: 'Read in a file of environment variables'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const stageName = args.stage as string
		const data = args.data || {}
		const envfile = args.envfile as string

		if (data === undefined) {
			console.error('the data argument is required')
			return
		}
		if (envfile) {
			const fullPath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullPath, override: true })
		}
		const orm = new Orm(workspace)

		try {
			const schema = await orm.schema.get(workspace)
			await orm.init(schema)
			const stage = orm.schema.stage.get(stageName)
			const manager = new Manager(orm)
			// read Data
			const _data = await manager.readData(data)
 			// import data
			await orm.stage.import({ stage: stage.name }).execute(_data)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
