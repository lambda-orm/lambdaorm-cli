import { CliFacade } from '../cli'

export class Import {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (workspace:string, data:any, stage?:string): Promise<void> {
		if (data === undefined) {
			console.error('the data argument is required')
			return
		}
		const orm = this.service.orm.create({ workspace })
		try {
			await orm.init()
			const stageName = await orm.getStageName(stage)
			const _data = await this.service.helper.cli.readData(data)
			await orm.stage.import(stageName, _data)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
