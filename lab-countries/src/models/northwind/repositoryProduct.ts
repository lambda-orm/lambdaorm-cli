import { Respository, IOrm } from 'lambdaorm'
import { Product, QryProduct } from './model'
export class ProductRespository extends Respository<Product, QryProduct> {
	constructor (database?: string, Orm?:IOrm) {
		super('Products', database, Orm)
	}
	// Add your code here
}
