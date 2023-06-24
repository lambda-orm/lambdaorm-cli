/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { ApplicationService } from '../../application'
import path from 'path'

export class VersionCommand implements CommandModule {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly application:ApplicationService) {}
	command = 'version'
	describe = 'Prints lambdaorm version this project uses.'
	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				type: 'string',
				describe: 'project path.'
			}).option('l', {
				alias: 'language',
				describe: 'develop language'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const language = args.language as string || 'node'
		const lambdaormCliVersion = await this.application.globalVersion()
		const lambdaormVersion = await this.application.localVersion(workspace, language)

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
