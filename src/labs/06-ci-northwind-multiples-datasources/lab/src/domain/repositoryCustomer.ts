import { Repository, IOrm } from 'lambdaorm'
import { Customer, QryCustomer } from './model'
export class CustomerRepository extends Repository<Customer, QryCustomer> {
	constructor (stage?: string, orm?:IOrm) {
		super('Customers', stage, orm)
	}
	// Add your code here
}
