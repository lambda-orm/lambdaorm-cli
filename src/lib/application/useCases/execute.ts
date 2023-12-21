import { Helper } from '../helper'
import { OrmCliService } from '../services/ormCli'
import { OutputService } from '../services/outputService'

export class Execute {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService, private readonly helper:Helper, private readonly outputService:OutputService) {}

	public async execute (workspace:string, query:string, data:any, stage?:string, output?:string): Promise<void> {
		if (query === undefined) {
			console.error('the query expression argument is required')
			return
		}
		const orm = this.service.createOrm({ workspace })
		try {
			await orm.init()
			const stageName = await orm.getStageName(stage)
			const _data = await this.helper.cli.readData(data)
			const result = await orm.execute(query, _data, { stage: stageName })
			this.outputService.execute(result, output)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
