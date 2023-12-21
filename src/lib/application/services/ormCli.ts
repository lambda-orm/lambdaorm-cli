import { Orm, Stage } from 'lambdaorm'
import { Helper } from '../helper'

import { LanguagePort } from '../../domain'
import { CliOrm, OrmFactory, OrmFactoryArgs } from '../orm/orm'
export class OrmCliService {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly ormFactory:OrmFactory, private readonly helper:Helper, private readonly languages:LanguagePort[] = []) {}

	public addLanguage (value:LanguagePort):void {
		this.languages.push(value)
	}

	public getLanguage (name = 'node'): LanguagePort {
		const languagePort = this.languages.find(p => p.name === name)
		if (languagePort === undefined) {
			throw new Error(`Language ${name} not found`)
		}
		return languagePort
	}

	public createOrm (args: OrmFactoryArgs):CliOrm {
		return this.ormFactory.create(args)
	}

	public async getGlobalPackage (name:string): Promise<string> {
		const exp = new RegExp(`${name}@(.*)\n`)
		const globalNpmList = await this.helper.cli.exec('npm list -g --depth=0')
		const globalMatches = globalNpmList.match(exp)
		return (globalMatches && globalMatches[1] ? globalMatches[1] : '').replace(/"invalid"/gi, '').trim()
	}

	public async getStage (orm:Orm, workspace:string, stage?:string):Promise<Stage> {
		const schema = await orm.schema.get(workspace)
		if (schema === null) {
			throw new Error(`Can't found schema in ${workspace}`)
		}
		await orm.init(schema)
		return orm.schema.stage.get(stage)
	}
}
