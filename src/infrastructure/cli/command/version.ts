/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { application } from '../../index'
import path from 'path'

export class VersionCommand implements CommandModule {
	command = 'version'
	describe = 'Prints lambdaorm version this project uses.'
	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				type: 'string',
				describe: 'project path.'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')

		const lambdaormCliVersion = await application.globalVersion()
		const lambdaormVersion = await application.localVersion(workspace)

		if (lambdaormCliVersion) {
			console.log(`Global lambdaorm cli version: ${lambdaormCliVersion}`)
		}
		if (lambdaormVersion) {
			console.log('Local lambdaorm version:', lambdaormVersion)
		} else {
			console.log('Local lambdaorm not found.')
		}
	}
}
