/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { plan } from '../builders/usesCases'
import dotenv from 'dotenv'

export class PlanCommand implements CommandModule {
	command = 'plan'
	describe = 'Return plan execution of query'

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				describe: 'project path'
			})
			.option('s', {
				alias: 'stage',
				describe: 'Name of stage'
			})
			.option('q', {
				alias: 'query',
				describe: 'Query expression'
			})
			.option('e', {
				alias: 'envfile',
				describe: 'Read in a file of environment variables'
			})
			.option('o', {
				alias: 'output',
				describe: 'Generates an output according to the following possible values [json|beautiful|light|yaml]'
			})
			.option('u', {
				alias: 'url',
				describe: 'Url of service.'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const query = args.query as string
		const stage = args.stage as string
		const output = args.output as string
		const envfile = args.envfile as string
		const url = args.url as string|undefined

		if (envfile) {
			const fullPath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullPath, override: true })
		}
		try {
			await plan.execute(workspace, query, stage, output, url)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
