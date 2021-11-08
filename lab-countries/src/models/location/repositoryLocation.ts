import { Respository, IOrm } from 'lambdaorm'
import { Location, QryLocation } from './model'
export class LocationRespository extends Respository<Location, QryLocation> {
	constructor (database?: string, Orm?:IOrm) {
		super('Locations', database, Orm)
	}
	// Add your code here
}
