import { Orm } from 'lambdaorm'
import { Helper } from '../helper'
import { OrmCliService } from '../services/ormCli'

export class Import {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService, private readonly helper:Helper) {}

	public async execute (workspace:string, data:any, stage?:string): Promise<void> {
		if (data === undefined) {
			console.error('the data argument is required')
			return
		}
		const orm = new Orm(workspace)
		try {
			const _stage = await this.service.getStage(orm, workspace, stage)
			// read Data
			const _data = await this.helper.cli.readData(data)
			// import data
			await orm.stage.import({ stage: _stage.name }).execute(_data)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
