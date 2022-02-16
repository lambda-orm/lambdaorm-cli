import { Respository, IOrm } from 'lambdaorm'
import { Journey, QryJourney } from './model'
export class JourneyRespository extends Respository<Journey, QryJourney> {
	constructor (stage?: string, Orm?:IOrm) {
		super('Journeys', stage, Orm)
	}
	// Add your code here
}
