import { Respository, IOrm } from 'lambdaorm'
import { State, QryState } from './model'
export class StateRespository extends Respository<State, QryState> {
	constructor (stage?: string, Orm?:IOrm) {
		super('States', stage, Orm)
	}
	// Add your code here
}
