import { Orm } from 'lambdaorm'
import { helper } from '../application/helper'
import path from 'path'
export class OrmCliService {
	public async drop (workspace:string, stage:string, output:string, force = false): Promise<void> {
		const orm = new Orm(workspace)
		try {
			const schema = await orm.schema.get(workspace)
			await orm.init(schema)
			const _stage = orm.schema.stage.get(stage)

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

	public async execute (workspace:string, query:string, data:any, stage?:string, output?:string): Promise<void> {
		if (query === undefined) {
			console.error('the query expression argument is required')
			return
		}
		const orm = new Orm(workspace)
		try {
			const schema = await orm.schema.get(workspace)
			await orm.init(schema)
			const _stage = orm.schema.stage.get(stage)
			// execute or get metadata
			if (output) {
				if (output === 'sentence') {
					const result = orm.getInfo(query, { stage: _stage.name })
					console.log(JSON.stringify(result, null, 2))
				} else if (output === 'model') {
					const model = orm.model(query)
					console.log(JSON.stringify(model, null, 2))
				} else if (output === 'parameters') {
					const metadata = orm.parameters(query)
					console.log(JSON.stringify(metadata, null, 2))
				} else if (output === 'constraints') {
					const metadata = orm.constraints(query)
					console.log(JSON.stringify(metadata, null, 2))
				} else if (output === 'metadata') {
					const metadata = orm.metadata(query)
					console.log(JSON.stringify(metadata))
				} else {
					// output metadata is default
					const metadata = orm.metadata(query)
					console.log(JSON.stringify(metadata, null, 2))
				}
			} else {
				// read Data
				const _data = await helper.cli.readData(data)
				const result = await orm.execute(query, _data, { stage: _stage.name })
				console.log(JSON.stringify(result, null, 2))
			}
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}

	public async export (workspace:string, target:string, stage?:string, force = false): Promise<void> {
		const orm = new Orm(workspace)
		try {
			const schema = await orm.schema.get(workspace)
			await orm.init(schema)
			const _stage = orm.schema.stage.get(stage)
			const exportFile = path.join(target, _stage.name + '-export.json')
			const dataExport = orm.stage.export({ stage: _stage.name, tryAllCan: force })
			const data = await dataExport.execute()
			await helper.fs.write(exportFile, JSON.stringify(data))
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}

	public async import (workspace:string, data:any, stage?:string): Promise<void> {
		if (data === undefined) {
			console.error('the data argument is required')
			return
		}
		const orm = new Orm(workspace)
		try {
			const schema = await orm.schema.get(workspace)
			await orm.init(schema)
			const _stage = orm.schema.stage.get(stage)
			// read Data
			const _data = await helper.cli.readData(data)
			// import data
			await orm.stage.import({ stage: _stage.name }).execute(_data)
		} catch (error) {
			console.error(`error: ${error}`)
		} finally {
			await orm.end()
		}
	}
}
export const ormCli = new OrmCliService()
