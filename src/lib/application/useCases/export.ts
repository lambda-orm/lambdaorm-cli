import { Helper } from '../helper'
import { OrmCliService } from '../services/ormCli'
import path from 'path'

export class Export {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService, private readonly helper:Helper) {}

	public async execute (workspace:string, target:string, stage?:string, force = false): Promise<void> {
		const orm = this.service.createOrm({ workspace })
		try {
			await orm.init()
			const stageName = await orm.getStageName(stage)
			const exportFile = path.join(target, stageName + '-export.json')
			const data = await orm.stage.export(stageName, force)
			await this.helper.fs.write(exportFile, JSON.stringify(data))
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
