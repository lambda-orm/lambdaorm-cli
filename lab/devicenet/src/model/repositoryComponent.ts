import { Respository, IOrm } from 'lambdaorm'
import { Component, QryComponent } from './model'
export class ComponentRespository extends Respository<Component, QryComponent> {
	constructor (stage?: string, Orm?:IOrm) {
		super('Components', stage, Orm)
	}
	// Add your code here
}
