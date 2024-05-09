import { CliFacade } from '../cli'

export class Push {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:CliFacade) {}

	public async execute (workspace:string, stage?:string, output?:string, force = false): Promise<void> {
		const _output = output !== undefined
		const orm = this.service.orm.create({ workspace })
		try {
			await orm.init()
			const stageName = await orm.getStageName(stage)
			const result = await orm.stage.push(stageName, _output, force)
			this.service.output.showExecuteResult(result)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			orm.end()
		}
	}
}
