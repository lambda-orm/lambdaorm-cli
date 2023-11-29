/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { plan } from '../builders/usesCases'
import dotenv from 'dotenv'

export class PlanCommand implements CommandModule {
	command = 'execute'
	describe = 'Return plan execution of query expression'

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
			.option('o', {
				alias: 'output',
				describe: 'Generates an output according to the following possible values [json|beautiful|light|yaml]'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const query = args.query as string
		const stage = args.stage as string
		const output = args.output as string
		const envfile = args.envfile as string

		if (envfile) {
			const fullPath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullPath, override: true })
		}
		try {
			await plan.execute(workspace, query, stage, output)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
