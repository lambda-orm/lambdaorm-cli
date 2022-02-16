import { Respository, IOrm } from 'lambdaorm'
import { GroupUser, QryGroupUser } from './model'
export class GroupUserRespository extends Respository<GroupUser, QryGroupUser> {
	constructor (stage?: string, Orm?:IOrm) {
		super('GroupUsers', stage, Orm)
	}
	// Add your code here
}
