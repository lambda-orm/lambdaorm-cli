/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm } from 'lambdaorm'
import path from 'path'
import { Manager } from '../manager'
import dotenv from 'dotenv'

export class ExecuteCommand implements CommandModule {
	command = 'execute'
	describe = 'Execute an expression or return metadata information'

	builder (args: Argv) {
		return args
			.option('w', {
				alias: 'workspace',
				describe: 'project path'
			})
			.option('s', {
				alias: 'stage',
				describe: 'Name of stage'
			})
			.option('q', {
				alias: 'query',
				describe: 'Query expression'
			})
			.option('d', {
				alias: 'data',
				describe: 'Data used to execute expression'
			})
			.option('e', {
				alias: 'envfile',
				describe: 'Read in a file of environment variables'
			})
			.option('o', {
				alias: 'output',
				describe: 'Generates an output with the information according to the following possible values [sentence|model|parameters|constraints|metadata] but it does not apply'
			})
	}

	async handler (args: Arguments) {
		const workspace = path.resolve(process.cwd(), args.workspace as string || '.')
		const query = args.query as string
		const data = args.data || {}
		const stageName = args.stage as string
		const output = args.output as string
		const envfile = args.envfile as string

		if (envfile) {
			const fullPath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullPath, override: true })
		}

		const orm = new Orm(workspace)
		if (query === undefined) {
			console.error('the query expression argument is required')
			return
		}
		try {
			const schema = await orm.schema.get(workspace)
			await orm.init(schema)
			const stage = orm.schema.stage.get(stageName)
			const manager = new Manager(orm)
			// execute or get metadata
			if (output) {
				if (output === 'sentence') {
					const result = orm.sentence(query, { stage: stage.name })
					console.log(JSON.stringify(result, null, 2))
				} else if (output === 'model') {
					const model = orm.model(query)
					console.log(JSON.stringify(model, null, 2))
				} else if (output === 'parameters') {
					const metadata = orm.parameters(query)
					console.log(JSON.stringify(metadata, null, 2))
				} else if (output === 'constraints') {
					const metadata = orm.constraints(query)
					console.log(JSON.stringify(metadata, null, 2))
				} else if (output === 'metadata') {
					const metadata = orm.metadata(query)
					console.log(JSON.stringify(metadata))
				} else {
					// output metadata is default
					const metadata = orm.metadata(query)
					console.log(JSON.stringify(metadata, null, 2))
				}
			} else {
				// read Data
				const _data = await manager.readData(data)
				const result = await orm.execute(query, _data, { stage: stage.name })
				console.log(JSON.stringify(result, null, 2))
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
