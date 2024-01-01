/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { schema } from '../builders/usesCases'

export class SchemaCommand implements CommandModule {
	command = 'schema'
	describe = 'Return schema information'

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				describe: 'project path'
			})
			.option('p', {
				alias: 'path',
				describe: 'data path'
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
		const dataPath = args.path as string
		const output = args.output as string
		const url = args.url as string|undefined
		try {
			await schema.execute(workspace, dataPath, output, url)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
