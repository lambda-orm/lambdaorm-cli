import { SchemaFacade } from 'lambdaorm'
import { Helper } from '../../application'
import { NodeLanguageService } from './node'

export class ClientNodeLanguageService extends NodeLanguageService {
	public constructor (schemaFacade:SchemaFacade, helper:Helper) {
		super(schemaFacade, helper)
		this.library = 'lambdaorm-client-node'
	}

	public get name (): string {
		return 'client-node'
	}

	public override async localVersion (workspace:string): Promise<string> {
		return await this.getLocalPackage('lambdaorm', workspace)
	}
}
