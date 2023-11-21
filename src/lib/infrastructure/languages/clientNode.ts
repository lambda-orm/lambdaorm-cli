import { Helper } from '../../application'
import { NodeLanguageAdapter } from './node'

export class ClientNodeLanguageAdapter extends NodeLanguageAdapter {
	public constructor (helper:Helper) {
		super(helper)
		this.library = 'lambdaorm-client-node'
	}

	public get name (): string {
		return 'client-node'
	}

	public override async localVersion (workspace:string): Promise<string> {
		return await this.getLocalPackage('lambdaorm', workspace)
	}
}
