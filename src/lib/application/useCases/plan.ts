import { CliFacade } from '../cli'

export class Plan {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (workspace:string, query:string, stage?:string, output?:string): Promise<void> {
		if (query === undefined) {
			console.error('the query expression argument is required')
			return
		}
		const orm = this.service.orm.create({ workspace })
		try {
			await orm.init()
			const stageName = await orm.getStageName(stage)
			const result = orm.plan(query, { stage: stageName })
			this.service.output.execute(result, output)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
