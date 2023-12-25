import { SchemaFacade } from 'lambdaorm'
import { Helper } from './helper'
import { OrmFactory } from './ports/orm'
import { Languages } from './services/languages'
import { WorkspaceFactory } from './ports/workspace'
import { OutputService } from './services/outputService'
export class CliFacade {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		public readonly languages:Languages,
		public readonly orm:OrmFactory,
		public readonly workspace:WorkspaceFactory,
		public readonly output:OutputService,
		public readonly helper:Helper,
		public readonly schema:SchemaFacade) {}

	public async getGlobalPackage (name:string): Promise<string> {
		const exp = new RegExp(`${name}@(.*)\n`)
		const globalNpmList = await this.helper.cli.exec('npm list -g --depth=0')
		const globalMatches = globalNpmList.match(exp)
		return (globalMatches && globalMatches[1] ? globalMatches[1] : '').replace(/"invalid"/gi, '').trim()
	}
}
