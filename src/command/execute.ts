/* eslint-disable no-mixed-spaces-and-tabs */
import { CommandModule, Argv, Arguments } from 'yargs'
import { Orm } from 'lambdaorm'
import path from 'path'
import { Manager } from '../manager'
import dotenv from 'dotenv'

export class ExecuteCommand implements CommandModule {
	command = 'execute';
	describe = 'Execute an expression lambda or return information';

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
		let data = args.data || {}
		const stageName = args.stage as string
		const output = args.output as string
		const envfile = args.envfile as string

		if (envfile) {
			const fullpath = path.resolve(process.cwd(), envfile)
			dotenv.config({ path: fullpath, override: true })
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
			// read Data
			data = await manager.readData(data)
			// execute or get metadata
			if (output) {
				if (output === 'sentence') {
					const resullt = await orm.sentence(query, stage.name)
					console.log(JSON.stringify(resullt, null, 2))
				} else if (output === 'model') {
					const model = await orm.model(query)
					console.log(JSON.stringify(model, null, 2))
				} else if (output === 'parameters') {
					const metadata = await orm.parameters(query)
					console.log(JSON.stringify(metadata, null, 2))
				} else if (output === 'constraints') {
					const metadata = await orm.constraints(query)
					console.log(JSON.stringify(metadata, null, 2))
				} else if (output === 'metadata') {
					const metadata = await orm.metadata(query)
					console.log(JSON.stringify(metadata))
				} else {
					// output metadata is default
					const metadata = await orm.metadata(query)
					console.log(JSON.stringify(metadata, null, 2))
				}
			} else {
				const result = await orm.execute(query, data, stage.name)
				console.log(JSON.stringify(result, null, 2))
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
