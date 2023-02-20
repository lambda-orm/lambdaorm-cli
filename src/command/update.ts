/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm } from 'lambdaorm'
import { Manager } from '../manager'
import path from 'path'

export class UpdateCommand implements CommandModule {
	command = 'update'
	describe = 'Update workspace.'

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				type: 'string',
				describe: 'project path.'
			}).option('only-model', {
				alias: 'onlyModel',
				describe: 'update only model'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const onlyModel = args.onlyModel !== undefined
		const orm = new Orm(workspace)
		const manager = new Manager(orm)
		try {
			const schema = await orm.schema.get(workspace)
			if (!onlyModel) {
				// create structure
				await manager.createStructure(schema)
				// add libraries for dialect
				await manager.addDialects(schema)
			}
			// write models
			await manager.writeModel(schema)
		} catch (error) {
			console.error(`error: ${error}`)
		}
	}
}
