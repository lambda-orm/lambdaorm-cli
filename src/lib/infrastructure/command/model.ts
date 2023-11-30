/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { model } from '../builders/usesCases'
import dotenv from 'dotenv'

export class ModelCommand implements CommandModule {
	command = 'model'
	describe = 'Return model that will be returned in the query execution'

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
			.option('o', {
				alias: 'output',
				describe: 'Generates an output according to the following possible values [json|beautiful|light|yaml]'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const query = args.query as string
		const output = args.output as string
		const envfile = args.envfile as string

		if (envfile) {
			const fullPath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullPath, override: true })
		}
		try {
			await model.execute(workspace, query, output)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
