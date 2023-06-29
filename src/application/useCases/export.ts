import { Orm } from 'lambdaorm'
import { Helper } from '../helper'
import { OrmCliService } from '../services/ormCli'
import path from 'path'

export class Export {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService, private readonly helper:Helper) {}

	public async execute (workspace:string, target:string, stage?:string, force = false): Promise<void> {
		const orm = new Orm(workspace)
		try {
			const _stage = await this.service.getStage(orm, workspace, stage)
			const exportFile = path.join(target, _stage.name + '-export.json')
			const dataExport = orm.stage.export({ stage: _stage.name, tryAllCan: force })
			const data = await dataExport.execute()
			await this.helper.fs.write(exportFile, JSON.stringify(data))
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
