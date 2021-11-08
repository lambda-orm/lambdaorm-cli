import { Respository, IOrm } from 'lambdaorm'
import { City, QryCity } from './model'
export class CityRespository extends Respository<City, QryCity> {
	constructor (database?: string, Orm?:IOrm) {
		super('Cities', database, Orm)
	}
	// Add your code here
}
