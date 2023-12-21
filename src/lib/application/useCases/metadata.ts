import { OutputService } from '../services/outputService'
import { OrmCliService } from '../services/ormCli'

export class Metadata {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService, private readonly outputService:OutputService) {}

	public async execute (workspace:string, query:string, output?:string): Promise<void> {
		if (query === undefined) {
			console.error('the query expression argument is required')
			return
		}
		const orm = this.service.createOrm({ workspace })
		try {
			await orm.init()
			const result = await orm.metadata(query)
			this.outputService.execute(result, output)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
