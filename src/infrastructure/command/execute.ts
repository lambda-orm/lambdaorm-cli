/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import path from 'path'
import { OrmCliService } from '../../application'
import dotenv from 'dotenv'

export class ExecuteCommand implements CommandModule {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly ormCli:OrmCliService) {}

	command = 'execute'
	describe = 'Execute an expression or return metadata information'

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
			.option('d', {
				alias: 'data',
				describe: 'Data used to execute expression'
			})
			.option('e', {
				alias: 'envfile',
				describe: 'Read in a file of environment variables'
			})
			.option('o', {
				alias: 'output',
				describe: 'Generates an output with the information according to the following possible values [sentence|model|parameters|constraints|metadata] but it does not apply'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const query = args.query as string
		const data = args.data || {}
		const stage = args.stage as string
		const output = args.output as string
		const envfile = args.envfile as string

		if (envfile) {
			const fullPath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullPath, override: true })
		}
		try {
			await this.ormCli.execute(workspace, query, data, stage, output)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
