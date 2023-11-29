import { Orm } from 'lambdaorm'
import { OutputService } from '../services/outputService'

export class Parameters {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly outputService:OutputService) {}

	public async execute (workspace:string, query:string, output?:string): Promise<void> {
		if (query === undefined) {
			console.error('the query expression argument is required')
			return
		}
		const orm = new Orm(workspace)
		try {
			const result = orm.parameters(query)
			this.outputService.execute(result, output)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
