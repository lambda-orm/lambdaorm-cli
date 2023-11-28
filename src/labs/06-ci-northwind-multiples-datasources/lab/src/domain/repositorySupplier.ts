import { Repository, IOrm } from 'lambdaorm'
import { Supplier, QrySupplier } from './model'
export class SupplierRepository extends Repository<Supplier, QrySupplier> {
	constructor (stage?: string, orm?:IOrm) {
		super('Suppliers', stage, orm)
	}
	// Add your code here
}
