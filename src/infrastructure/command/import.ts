/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { Import } from '../../application'
import dotenv from 'dotenv'

export class ImportCommand implements CommandModule {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly _import:Import) {}
	command = 'import'
	describe = 'Import data from file to database'

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
		const stage = args.stage as string
		const data = args.data || {}
		const envfile = args.envfile as string

		if (envfile) {
			const fullPath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullPath, override: true })
		}
		await this._import.execute(workspace, data, stage)
	}
}
