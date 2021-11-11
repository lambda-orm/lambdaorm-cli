/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm } from 'lambdaorm'
import { Manager } from '../manager'
import path from 'path'

export class UpdateCommand implements CommandModule {
	command = 'update';
	describe = 'Update workspace.';

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				describe: 'project path.'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const orm = new Orm(workspace)
		const manager = new Manager(orm)
		try {
			const config = await orm.lib.getConfig(workspace)
			// create structure
			await manager.createStructure(config)
			// add libraries for dialect
			await manager.addDialects(config)
			// write models
			await manager.writeModel(config)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
