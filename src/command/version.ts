/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule } from 'yargs'
import { Orm } from 'lambdaorm'
import { Manager } from '../manager'

export class VersionCommand implements CommandModule {
	command = 'version';
	describe = 'Prints lambdaorm version this project uses.';

	async handler () {
		const orm = new Orm()
		const manager = new Manager(orm)

		const lambdaormVersion = await manager.getLocalPackage('lambdaorm', process.cwd())
		const lambdactlVersion = await manager.getGlobalPackage('lambdactl')

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
