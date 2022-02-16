import { Respository, IOrm } from 'lambdaorm'
import { User, QryUser } from './model'
export class UserRespository extends Respository<User, QryUser> {
	constructor (stage?: string, Orm?:IOrm) {
		super('Users', stage, Orm)
	}
	// Add your code here
}
