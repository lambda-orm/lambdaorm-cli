import { Respository, IOrm } from 'lambdaorm'
import { Addres, QryAddres } from './model'
export class AddresRespository extends Respository<Addres, QryAddres> {
	constructor (database?: string, Orm?:IOrm) {
		super('Address', database, Orm)
	}
	// Add your code here
}
