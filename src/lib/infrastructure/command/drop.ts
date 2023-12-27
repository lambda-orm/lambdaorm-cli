/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { drop } from '../builders/usesCases'
import path from 'path'
import dotenv from 'dotenv'

export class DropCommand implements CommandModule {
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
			.option('u', {
				alias: 'url',
				describe: 'Url of service.'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const stage = args.stage as string
		const output = args.output as string
		const force = args.force !== undefined
		const envfile = args.envfile as string
		const url = args.url as string|undefined

		if (envfile) {
			const fullPath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullPath, override: true })
		}
		try {
			await drop.execute(workspace, stage, output, url, force)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
