/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { introspect } from '../builders/usesCases'

export class Introspect implements CommandModule {
	command = 'introspect'
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
			.option('d', {
				alias: 'data',
				describe: 'Data file to introspect.'
			})
			.option('n', {
				alias: 'name',
				describe: 'Name of root entity'
			})
			.option('o', {
				alias: 'output',
				describe: 'Generates an output according to the following possible values [json|beautiful|light|yaml]'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const data = args.data || {}
		const name = args.name as string
		const url = args.url as string|undefined
		const output = args.output as string
		try {
			await introspect.execute(workspace, data, name, output, url)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
