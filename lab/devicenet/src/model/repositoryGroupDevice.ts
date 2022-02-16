import { Respository, IOrm } from 'lambdaorm'
import { GroupDevice, QryGroupDevice } from './model'
export class GroupDeviceRespository extends Respository<GroupDevice, QryGroupDevice> {
	constructor (stage?: string, Orm?:IOrm) {
		super('GroupDevices', stage, Orm)
	}
	// Add your code here
}
