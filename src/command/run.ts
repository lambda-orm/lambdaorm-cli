/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm } from 'lambdaorm'
import path from 'path'
import { Manager } from '../manager'

export class RunCommand implements CommandModule {
	command = 'run';
	describe = 'Run an expression lambda or return information';

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
				alias: 'expression',
				describe: 'Expression to execute'
			})
			.option('d', {
				alias: 'data',
				describe: 'Data used to execute expression'
			})
			.option('q', {
				alias: 'query',
				describe: 'Generates the queries but does not apply.'
			})
			.option('m', {
				alias: 'metadata',
				describe: 'Generates the metadata but does not apply.'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const expression = args.expression as string
		let data = args.data || {}
		const stageName = args.stage as string
		const query = args.query !== undefined
		const metadata = args.metadata !== undefined
		const orm = new Orm(workspace)
		if (expression === undefined) {
			console.error('the expression argument is required')
			return
		}
		try {
			const schema = await orm.schema.get(workspace)
			await orm.init(schema)
			const stage = orm.schema.stage.get(stageName)
			const manager = new Manager(orm)
			// read Data
			data = await manager.readData(data)
			// execute or get metadata
			if (query || metadata) {
				if (query) {
					const resullt = await orm.sentence(expression, stage.name)
					console.log(resullt)
				}
				if (metadata) {
					const model = await orm.model(expression)
					const metadata = await orm.metadata(expression)
					console.log('model:')
					console.log(JSON.stringify(model, null, 2))
					console.log('metadata:')
					console.log(JSON.stringify(metadata, null, 2))
				}
			} else {
				const result = await orm.execute(expression, data, {}, stage.name)
				console.log(JSON.stringify(result, null, 2))
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
