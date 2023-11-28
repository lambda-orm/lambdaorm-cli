import { Repository, IOrm } from 'lambdaorm'
import { Shipper, QryShipper } from './model'
export class ShipperRepository extends Repository<Shipper, QryShipper> {
	constructor (stage?: string, orm?:IOrm) {
		super('Shippers', stage, orm)
	}
	// Add your code here
}
