/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { _export } from '../builders/usesCases'
import path from 'path'
import dotenv from 'dotenv'

export class ExportCommand implements CommandModule {
	command = 'export'
	describe = 'Export data from a database'

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
			.option('e', {
				alias: 'envfile',
				describe: 'Read in a file of environment variables'
			})
			.option('t', {
				alias: 'target',
				describe: 'Destination file with export data.'
			}).option('f', {
				alias: 'force',
				describe: 'If there is an error in a statement, continue executing the next statements'
			})
			.option('u', {
				alias: 'url',
				describe: 'Url of service.'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const stage = args.stage as string
		const target = path.resolve(process.cwd(), args.target as string || '.')
		const envfile = args.envfile as string
		const force = args.force !== undefined
		const url = args.url as string|undefined

		if (envfile) {
			const fullPath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullPath, override: true })
		}
		_export.execute(workspace, target, stage, url, force)
	}
}
