import { Respository, IOrm } from 'lambdaorm'
import { DeviceStatus, QryDeviceStatus } from './model'
export class DeviceStatusRespository extends Respository<DeviceStatus, QryDeviceStatus> {
	constructor (stage?: string, Orm?:IOrm) {
		super('DeviceStatuses', stage, Orm)
	}
	// Add your code here
}
