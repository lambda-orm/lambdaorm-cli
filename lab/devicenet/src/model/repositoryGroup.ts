import { Respository, IOrm } from 'lambdaorm'
import { Group, QryGroup } from './model'
export class GroupRespository extends Respository<Group, QryGroup> {
	constructor (stage?: string, Orm?:IOrm) {
		super('Groups', stage, Orm)
	}
	// Add your code here
}
