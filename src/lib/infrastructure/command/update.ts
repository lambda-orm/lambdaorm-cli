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
				describe: 'relative source code path in workspace'
			})
			.option('data-path', {
				alias: 'dataPath',
				describe: 'relative data path in workspace'
			})
			.option('domain-path', {
				alias: 'domainPath',
				describe: 'relative domain path in source code path'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const language = args.language as string || 'node'
		const onlyModel = args.onlyModel !== undefined
		const srcPath = args.srcPath as string|undefined
		const domainPath = args.domainPath as string|undefined
		const dataPath = args.dataPath as string|undefined
		try {
			await update.execute(workspace, language, onlyModel, srcPath, dataPath, domainPath)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
