/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { OrmCliService } from '../../application'
import path from 'path'
import dotenv from 'dotenv'

export class DropCommand implements CommandModule {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly ormCli:OrmCliService) {}

	command = 'drop'
	describe = 'Removes all database objects but not the database.'

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				type: 'string',
				describe: 'project path'
			})
			.option('s', {
				alias: 'stage',
				type: 'string',
				describe: 'Name of stage'
			})
			.option('e', {
				alias: 'envfile',
				type: 'string',
				describe: 'Read in a file of environment variables'
			})
			.option('o', {
				alias: 'output',
				type: 'string',
				describe: 'Generates the queries but does not apply'
			})
			.option('f', {
				alias: 'force',
				describe: 'If there is an error in a statement, continue executing the next statements'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const stage = args.stage as string
		const output = args.output as string
		const force = args.force !== undefined
		const envfile = args.envfile as string

		if (envfile) {
			const fullPath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullPath, override: true })
		}
		try {
			await this.ormCli.drop(workspace, stage, output, force)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
