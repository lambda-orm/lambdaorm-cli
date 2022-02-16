import { Respository, IOrm } from 'lambdaorm'
import { Device, QryDevice } from './model'
export class DeviceRespository extends Respository<Device, QryDevice> {
	constructor (stage?: string, Orm?:IOrm) {
		super('Devices', stage, Orm)
	}
	// Add your code here
}
