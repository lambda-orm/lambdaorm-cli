import { CliFacade } from '../cli'
import path from 'path'

export class Export {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (workspace:string, target:string, stage?:string, force = false): Promise<void> {
		const orm = this.service.orm.create({ workspace })
		try {
			await orm.init()
			const stageName = await orm.getStageName(stage)
			const exportFile = path.join(target, stageName + '-export.json')
			const data = await orm.stage.export(stageName, force)
			await this.service.helper.fs.write(exportFile, JSON.stringify(data))
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
