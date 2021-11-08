import { Respository, IOrm } from 'lambdaorm'
import { Order, QryOrder } from './model'
export class OrderRespository extends Respository<Order, QryOrder> {
	constructor (database?: string, Orm?:IOrm) {
		super('Orders', database, Orm)
	}
	// Add your code here
}
