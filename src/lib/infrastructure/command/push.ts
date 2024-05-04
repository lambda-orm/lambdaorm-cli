/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import dotenv from 'dotenv'
import { push } from '../builders/usesCases'

export class PushCommand implements CommandModule {
	command = 'push'
	describe = 'Synchronize database/s.'

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
			.option('o', {
				alias: 'output',
				describe: 'Generates the queries but does not apply'
			}).option('f', {
				alias: 'force',
				describe: 'If there is an error in a statement, continue executing the next statements'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const stage = args.stage as string
		const output = args.output as string
		const envfile = args.envfile as string
		const force = args.force !== undefined
		if (envfile) {
			const fullPath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullPath, override: true })
		}
		await push.execute(workspace, stage, output, force)
	}
}
