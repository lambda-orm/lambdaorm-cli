import { CliFacade } from '../cli'

export class Match {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (workspace:string, stage?:string, url?:string): Promise<void> {
		const orm = this.service.orm.create({ workspace, url })
		try {
			await orm.init()
			const stageName = await orm.getStageName(stage)
			await orm.stage.match(stageName)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
