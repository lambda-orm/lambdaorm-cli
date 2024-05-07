/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { constraints } from '../builders/usesCases'
import dotenv from 'dotenv'

export class ConstraintsCommand implements CommandModule {
	command = 'constraints'
	describe = 'Return constraints associated with the query'

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				describe: 'project path'
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
		const output = args.output as string
		const envfile = args.envfile as string
		const url = args.url as string|undefined

		if (envfile) {
			const fullPath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullPath, override: true })
		}
		try {
			await constraints.execute(workspace, query, output, url)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
