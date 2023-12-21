import { OrmCliService } from '../services/ormCli'

export class Drop {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService) {}

	public async execute (workspace:string, stage:string, output:string, force = false): Promise<void> {
		const orm = this.service.createOrm({ workspace })
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
