/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule } from 'yargs'
import { Orm } from 'lambdaorm'

export class VersionCommand implements CommandModule {
	command = 'version';
	describe = 'Prints lambdaorm version this project uses.';

	async handler () {
		const orm = new Orm()

		const lambdaormVersion = await orm.lib.getLocalPackage('lambdaorm', process.cwd())
		const lambdactlVersion = await orm.lib.getGlobalPackage('lambdactl')

		if (lambdactlVersion) {
			console.log(`Global lambdactl version: ${lambdactlVersion}`)
		}
		if (lambdaormVersion) {
			console.log('Local lambdaorm version:', lambdaormVersion)
		} else {
			console.log('Local lambdaorm not found.')
		}
	}
}
