/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { update } from '../builders/usesCases'
export class UpdateCommand implements CommandModule {
	command = 'update'
	describe = 'Update workspace.'

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				type: 'string',
				describe: 'project path.'
			})
			.option('l', {
				alias: 'language',
				describe: 'develop language'
			})
			.option('only-model', {
				alias: 'onlyModel',
				describe: 'update only model'
			})
			.option('src-path', {
				alias: 'srcPath',
				describe: 'update only model'
			})
			.option('data-path', {
				alias: 'dataPath',
				describe: 'update only model'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const language = args.language as string || 'node'
		const onlyModel = args.onlyModel !== undefined
		const srcPath = args.srcPath as string|undefined
		const dataPath = args.dataPath as string|undefined
		try {
			await update.execute(workspace, language, onlyModel, srcPath, dataPath)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
