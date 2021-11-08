import { Respository, IOrm } from 'lambdaorm'
import { Address, QryAddress } from './model'
export class AddressRespository extends Respository<Address, QryAddress> {
	constructor (database?: string, Orm?:IOrm) {
		super('Addresses', database, Orm)
	}
	// Add your code here
}
