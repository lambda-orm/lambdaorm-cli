import { Repository, IOrm } from 'lambdaorm'
import { Employee, QryEmployee } from './model'
export class EmployeeRepository extends Repository<Employee, QryEmployee> {
	constructor (stage?: string, orm?:IOrm) {
		super('Employees', stage, orm)
	}
	// Add your code here
}
