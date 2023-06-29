import { Orm } from 'lambdaorm'
import { OrmCliService } from '../services/ormCli'

export class Drop {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly service:OrmCliService) {}

	public async execute (workspace:string, stage:string, output:string, force = false): Promise<void> {
		const orm = new Orm(workspace)
		try {
			const _stage = await this.service.getStage(orm, workspace, stage)
			// TODO: en vez de output debería ser generar sentences
			if (output) {
				const sentences = await orm.stage.clean({ stage: _stage.name }).sentence()
				console.log(sentences)
			} else {
				const result = await orm.stage.clean({ stage: _stage.name, tryAllCan: force }).execute()
				console.log(JSON.stringify(result, null, 2))
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
