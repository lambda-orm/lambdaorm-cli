import { Respository, IOrm } from 'lambdaorm'
import { Country, QryCountry } from './model'
export class CountryRespository extends Respository<Country, QryCountry> {
	constructor (stage?: string, Orm?:IOrm) {
		super('Countries', stage, Orm)
	}
	// Add your code here
}
