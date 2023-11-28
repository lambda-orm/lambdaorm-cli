import { Repository, IOrm } from 'lambdaorm'
import { Category, QryCategory } from './model'
export class CategoryRepository extends Repository<Category, QryCategory> {
	constructor (stage?: string, orm?:IOrm) {
		super('Categories', stage, orm)
	}
	// Add your code here
}
