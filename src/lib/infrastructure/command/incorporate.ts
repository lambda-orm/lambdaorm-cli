/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { incorporate } from '../builders/usesCases'

export class Incorporate implements CommandModule {
	command = 'incorporate'
	describe = 'Update schema and sync source and import data.'

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				describe: 'project path'
			})
			.option('u', {
				alias: 'url',
				describe: 'Url of service'
			})
			.option('s', {
				alias: 'stage',
				describe: 'Name of stage'
			})
			.option('e', {
				alias: 'envfile',
				describe: 'Read in a file of environment variables'
			})
			.option('d', {
				alias: 'data',
				describe: 'Data file to incorporate'
			})
			.option('n', {
				alias: 'name',
				describe: 'Name of root entity'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const url = args.url as string|undefined
		const stage = args.stage as string
		const data = args.data || {}
		const name = args.name as string
		try {
			await incorporate.execute(workspace, data, name, stage, url)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
