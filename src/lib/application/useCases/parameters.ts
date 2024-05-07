import { CliFacade } from '../cli'

export class Parameters {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (workspace:string, query:string, output?:string, url?:string): Promise<void> {
		if (query === undefined) {
			console.error('the query argument is required')
			return
		}
		const orm = this.service.orm.create({ workspace, url })
		try {
			await orm.init()
			const result = await orm.parameters(query)
			this.service.output.execute(result, output)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
