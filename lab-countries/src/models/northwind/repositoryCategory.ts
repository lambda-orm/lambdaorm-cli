import { Respository, IOrm } from 'lambdaorm'
import { Category, QryCategory } from './model'
export class CategoryRespository extends Respository<Category, QryCategory> {
	constructor (database?: string, Orm?:IOrm) {
		super('Categories', database, Orm)
	}
	// Add your code here
}
