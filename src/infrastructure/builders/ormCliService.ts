import { OrmCliService, Helper } from '../../application'
export class OrmCliBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly helper:Helper) {}
	public build ():OrmCliService {
		return new OrmCliService(this.helper)
	}
}
