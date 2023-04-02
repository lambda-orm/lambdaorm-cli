/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm } from 'lambdaorm'
import { h3lp } from 'h3lp'
import path from 'path'
import dotenv from 'dotenv'

export class ExportCommand implements CommandModule {
	command = 'export'
	describe = 'Export data from a database'

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				describe: 'project path.'
			})
			.option('s', {
				alias: 'stage',
				describe: 'Name of stage'
			})
			.option('e', {
				alias: 'envfile',
				describe: 'Read in a file of environment variables'
			})
			.option('t', {
				alias: 'target',
				describe: 'Destination file with export data.'
			}).option('f', {
				alias: 'force',
				describe: 'If there is an error in a statement, continue executing the next statements'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const stageName = args.stage as string
		const target = path.resolve(process.cwd(), args.target as string || '.')
		const envfile = args.envfile as string
		const force = args.force !== undefined

		if (envfile) {
			const fullPath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullPath, override: true })
		}
		const orm = new Orm(workspace)

		try {
			const schema = await orm.schema.get(workspace)
			await orm.init(schema)
			const stage = orm.schema.stage.get(stageName)
			const exportFile = path.join(target, stage.name + '-export.json')
			const dataExport = orm.stage.export({ stage: stage.name, tryAllCan: force })
			const data = await dataExport.execute()
			await h3lp.fs.write(exportFile, JSON.stringify(data))
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
