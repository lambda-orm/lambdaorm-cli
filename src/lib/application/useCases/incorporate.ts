import { CliFacade } from '../cli'

export class Incorporate {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (workspace:string, data:any, name?:string, stage?:string, url?:string): Promise<void> {
		if (data === undefined) {
			console.error('the data argument is required')
			return
		}
		const orm = this.service.orm.create({ workspace, url })
		try {
			await orm.init()
			const _data = await this.service.helper.cli.readData(data)
			const _name = name || this.service.helper.cli.nameFromFile(data)
			const result = await orm.stage.incorporate(_data, _name, stage)
			this.service.output.showExecuteResult(result)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
