import { Respository, IOrm } from 'lambdaorm'
import { Shipper, QryShipper } from './model'
export class ShipperRespository extends Respository<Shipper, QryShipper> {
	constructor (database?: string, Orm?:IOrm) {
		super('Shippers', database, Orm)
	}
	// Add your code here
}
