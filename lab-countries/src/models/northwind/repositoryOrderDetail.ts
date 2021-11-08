import { Respository, IOrm } from 'lambdaorm'
import { OrderDetail, QryOrderDetail } from './model'
export class OrderDetailRespository extends Respository<OrderDetail, QryOrderDetail> {
	constructor (database?: string, Orm?:IOrm) {
		super('OrderDetails', database, Orm)
	}
	// Add your code here
}
