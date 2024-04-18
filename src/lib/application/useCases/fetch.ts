import { CliFacade } from '../cli'

export class Fetch {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (workspace:string, stage?:string, output?:string, url?:string): Promise<void> {
		const orm = this.service.orm.create({ workspace, url })
		try {
			await orm.init()
			const stageName = await orm.getStageName(stage)
			const mappings = await orm.stage.fetch(stageName)
			this.service.output.execute(mappings, output)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
