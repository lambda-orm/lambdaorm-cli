import { Orm } from 'lambdaorm'
import { Helper } from '../helper'
import { OrmCliService } from '../services/ormCli'

export class Execute {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService, private readonly helper:Helper) {}

	public async execute (workspace:string, query:string, data:any, stage?:string, output?:string): Promise<void> {
		if (query === undefined) {
			console.error('the query expression argument is required')
			return
		}
		const orm = new Orm(workspace)
		try {
			const _stage = await this.service.getStage(orm, workspace, stage)
			// execute or get metadata
			if (output) {
				if (output === 'plan') {
					const result = orm.plan(query, { stage: _stage.name })
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
				const _data = await this.helper.cli.readData(data)
				const result = await orm.execute(query, _data, { stage: _stage.name })
				console.log(JSON.stringify(result, null, 2))
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
