import { OrmCliService } from '../services/ormCli'

export class Synchronize {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService) {}

	public async execute (workspace:string, stage?:string, output?:string, force = false): Promise<void> {
		const _output = output !== undefined
		const orm = this.service.createOrm({ workspace })
		try {
			await orm.init()
			const stageName = await orm.getStageName(stage)
			const result = await orm.stage.sync(stageName, _output, force)
			console.log(result)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			orm.end()
		}
	}
}
