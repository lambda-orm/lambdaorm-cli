import { Repository, IOrm } from 'lambdaorm'
import { OrdersDetail, QryOrdersDetail } from './model'
export class OrdersDetailRepository extends Repository<OrdersDetail, QryOrdersDetail> {
	constructor (stage?: string, orm?:IOrm) {
		super('Orders.details', stage, orm)
	}
	// Add your code here
}
