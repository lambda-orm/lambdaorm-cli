import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { create } from '../builders/usesCases'
export class InitCommand implements CommandModule {
	command = 'init'
	describe = 'Generates lambdaorm project structure.'

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				default: 'my-project',
				describe: 'project path.'
			})
			.option('l', {
				alias: 'language',
				describe: 'develop language'
			})
			.option('s', {
				alias: 'source',
				describe: 'Name of data source.'
			})
			.option('d', {
				alias: 'dialect',
				describe: 'Database type you\'ll use in your project.'
			})
			.option('c', {
				alias: 'connection',
				describe: 'string connection to database'
			})
			.option('src-path', {
				alias: 'srcPath',
				describe: 'relative source code path in workspace'
			})
			.option('data-path', {
				alias: 'dataPath',
				describe: 'relative data path in workspace'
			})
	}

	async handler (args: Arguments) {
		try {
			const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
			const language = args.language as string || 'node'
			const source:string|undefined = args.source as string
			const dialect: string = args.dialect as string
			const connection: string = args.connection as string
			const srcPath = args.srcPath as string|undefined
			const dataPath = args.dataPath as string|undefined

			await create.execute(workspace, language, source, dialect, connection, srcPath, dataPath)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
