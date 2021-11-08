import { Respository, IOrm } from 'lambdaorm'
import { Supplier, QrySupplier } from './model'
export class SupplierRespository extends Respository<Supplier, QrySupplier> {
	constructor (database?: string, Orm?:IOrm) {
		super('Suppliers', database, Orm)
	}
	// Add your code here
}
