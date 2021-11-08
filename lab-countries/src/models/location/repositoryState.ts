import { Respository, IOrm } from 'lambdaorm'
import { State, QryState } from './model'
export class StateRespository extends Respository<State, QryState> {
	constructor (database?: string, Orm?:IOrm) {
		super('States', database, Orm)
	}
	// Add your code here
}
