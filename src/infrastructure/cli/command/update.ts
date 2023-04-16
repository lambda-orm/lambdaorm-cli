/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { application } from '../../index'
import path from 'path'

export class UpdateCommand implements CommandModule {
	command = 'update'
	describe = 'Update workspace.'

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				type: 'string',
				describe: 'project path.'
			}).option('only-model', {
				alias: 'onlyModel',
				describe: 'update only model'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const onlyModel = args.onlyModel !== undefined
		try {
			await application.update(workspace, onlyModel)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
