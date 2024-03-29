import { CliFacade } from '../cli'

export class Drop {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (workspace:string, stage:string, output:string, url?:string, force = false): Promise<void> {
		const orm = this.service.orm.create({ workspace, url })
		const _output = output !== undefined
		try {
			await orm.init()
			const stageName = await orm.getStageName(stage)
			const result = await orm.stage.drop(stageName, _output, force)
			console.log(JSON.stringify(result, null, 2))
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
