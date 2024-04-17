import { CliFacade } from '../cli'

export class Introspect {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (workspace:string, data:any, name?:string, output?:string, url?:string): Promise<void> {
		if (data === undefined) {
			console.error('the data argument is required')
			return
		}
		const orm = this.service.orm.create({ workspace, url })
		try {
			await orm.init()
			const _data = await this.service.helper.cli.readData(data)
			const _name = name || this.service.helper.cli.nameFromFile(data)
			await orm.schema.introspect(_data, _name)
			const originalSchema = await orm.schema.originalSchema()
			this.service.output.execute(originalSchema, output)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
