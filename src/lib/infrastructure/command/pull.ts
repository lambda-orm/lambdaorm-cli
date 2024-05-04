/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { pull } from '../builders/usesCases'

export class PullCommand implements CommandModule {
	command = 'pull'
	describe = 'Pull the stage with the sources'

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				describe: 'project path'
			})
			.option('u', {
				alias: 'url',
				describe: 'Url of service.'
			})
			.option('e', {
				alias: 'envfile',
				describe: 'Read in a file of environment variables'
			})
			.option('s', {
				alias: 'stage',
				describe: 'Name of stage'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const stage = args.stage as string
		const url = args.url as string|undefined
		try {
			await pull.execute(workspace, stage, url)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
