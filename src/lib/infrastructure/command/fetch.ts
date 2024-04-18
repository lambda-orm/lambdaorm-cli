/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { fetch } from '../builders/usesCases'

export class FetchCommand implements CommandModule {
	command = 'fetch'
	describe = 'Read and analyze data and update schemas'

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
			.option('o', {
				alias: 'output',
				describe: 'Generates an output according to the following possible values [json|beautiful|light|yaml]'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const stage = args.stage as string
		const url = args.url as string|undefined
		const output = args.output as string
		try {
			await fetch.execute(workspace, stage, output, url)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
