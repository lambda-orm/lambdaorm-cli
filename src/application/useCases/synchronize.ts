import { Orm } from 'lambdaorm'

export class Synchronize {
	public async execute (workspace:string, stage?:string, output?:string, force = false): Promise<void> {
		const orm = new Orm(workspace)
		try {
			const schema = await orm.schema.get(workspace)
			if (schema === null) {
				throw new Error(`Can't found schema in ${workspace}`)
			}
			await orm.init(schema)
			const _stage = orm.schema.stage.get(stage)
			if (output) {
				const sentence = await orm.stage.sync({ stage: _stage.name }).sentence()
				console.log(sentence)
			} else {
				await orm.stage.sync({ stage: _stage.name, tryAllCan: force }).execute()
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			orm.end()
		}
	}
}
