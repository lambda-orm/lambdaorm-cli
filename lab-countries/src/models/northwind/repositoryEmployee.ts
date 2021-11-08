import { Respository, IOrm } from 'lambdaorm'
import { Employee, QryEmployee } from './model'
export class EmployeeRespository extends Respository<Employee, QryEmployee> {
	constructor (database?: string, Orm?:IOrm) {
		super('Employees', database, Orm)
	}
	// Add your code here
}
