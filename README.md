# λORM CLI

λORM CLI is a command line application to use [λORM](https://www.npmjs.com/package/lambdaorm)

## Installation

Install the package globally to use the CLI commands to help you create and maintain projects

```sh
npm install lambdaorm-cli -g
```

## CLI

| Command    	| Description                                  									  		|
|:------------|:--------------------------------------------------------------------|
|	version	 		| Prints lambdaorm version this project uses.													|
|	init				| Generates lambdaorm project structure.															|
|	push				|	Synchronize sources with schema																		  |
|	pull				|	Synchronize schema whit sources																		  |
|	fetch				|	Show differences the schema whit sources													  |
|	introspect  |	Update schema with structure of data and push  				              |
|	incorporate |	Update schema with structure of data, push and importa data  	      |
|	execute			| Execute an expression lambda.																				|
| metadata		|	Return metadata of query expression.																|
| parameters	|	Return parameters of query expression.															|
| model				|	Return model of query expression.																		|
| plan				|	Return plan execution of query expression.													|
| schema	    |	Return schema information.															            |
|	import			| Import data from file to database.																	|
|	export			| Export data from a database. 																				|
|	build				| add configuration, model and repositories according to the language.|
|	drop				|	Removes all database objects but not the database.									|

## Usage

### version

Prints lambdaorm version this project uses.

```sh
lambdaorm version
```

Result:

```sh
Global lambdaorm cli version: 0.9.21
Local lambdaorm version: 0.8.96
```

### init

will create the project folder with the basic structure.

```sh
lambdaorm init -w lab
```

It will generate:

```sh
├── orm_state
└── lambdaORM.yaml
```

### init client node

will create the project folder with the basic structure.

```sh
lambdaorm init -w client-lab -u http://localhost:9291
```

It will generate:

```sh
├── orm_state
└── lambdaORM.yaml
```

### push

Synchronize Stage configured in lambdaORM schema with database/s.

```sh
lambdaorm push
```

In the case the default stage is associated with several data sources, it generates a file for each data source and a file with the current model.

```sh
data
├── default-ddl-20231201T191054280Z-push-Catalog.sql
├── default-ddl-20231201T191054280Z-push-Crm.sql
├── default-ddl-20231201T191054281Z-push-Ordering.json
├── default-model.json
```

### execute

Execute an expression lambda.

```sh
lambdaorm execute -e .env -q "Orders.filter(p => p.customerId == customerId).include(p => [p.customer.map(p => p.name), p.details.include(p => p.product.include(p => p.category.map(p => p.name)).map(p => p.name)).map(p => [p.quantity, p.unitPrice])]).page(1,1)" -d "{\"customerId\": \"HANAR\"}"
```

Result:

```json
[
  {
    "id": 3,
    "customerId": "HANAR",
    "employeeId": 4,
    "orderDate": "1996-07-08T00:00:00.000+02:00",
    "requiredDate": "1996-08-05",
    "shippedDate": "1996-07-12",
    "shipViaId": 2,
    "freight": 65.83,
    "name": "Hanari Carnes",
    "address": "Rua do Pao, 67",
    "city": "Rio de Janeiro",
    "region": "RJ",
    "postalCode": "05454-876",
    "country": "Brazil",
    "details": [
      {
        "quantity": 10,
        "unitPrice": 7.7,
        "product": {
          "name": "Jack's New England Clam Chowder",
          "category": {
            "name": "Seafood"
          }
        }
      },
      {
        "quantity": 35,
        "unitPrice": 42.4,
        "product": {
          "name": "Manjimup Dried Apples",
          "category": {
            "name": "Produce"
          }
        }
      },
      {
        "quantity": 15,
        "unitPrice": 16.8,
        "product": {
          "name": "Louisiana Fiery Hot Pepper Sauce",
          "category": {
            "name": "Condiments"
          }
        }
      }
    ],
    "customer": {
      "name": "Hanari Carnes"
    }
  }
]
```

In this example:

- The .env file is used to obtain the environment variables.
- The lambda expression is used to obtain an order from the "HANAR" client.

### Plan

Return plan execution of query expression.

```sh
lambdaorm plan -e .env -s default -q "Orders.filter(p => p.customerId == customerId).include(p => p.customer.map(p => p.name)).order(p=> p.id).page(1,1)" -o beautiful
```

Result:

```json
{
  "entity": "Orders",
  "dialect": "MongoDB",
  "source": "Ordering",
  "sentence": "[{ \"$match\" : { \"CustomerID\":{{customerId}} } }, { \"$project\" :{ \"_id\": 0 , \"id\":\"$_id\", \"customerId\":\"$CustomerID\", \"orderDate\":\"$OrderDate\", \"__customerId\":\"$CustomerID\" }} , { \"$sort\" :{ \"_id\":1 } } , { \"$skip\" : 0 }, { \"$limit\" : 1 } , { \"$project\": { \"_id\": 0 } }]",
  "children": [
    {
      "entity": "Customers",
      "dialect": "PostgreSQL",
      "source": "Crm",
      "sentence": "SELECT c.CompanyName AS \"name\", c.CustomerID AS \"LambdaOrmParentId\" FROM Customers c  WHERE  c.CustomerID IN ($1) "
    }
  ]
}
```

In this example:

- The .env file is used to obtain the environment variables.
- The Plan obtained is about the stage default.
- The lambda expression is used to obtain an order from the "HANAR" client.
- The plan is obtained in a beautiful format.

### import

Import data from file to datasources asociados a un stage.

```sh

```sh
lambdaorm import -e .env -s default -d ./data.json
```

In this example:

- The datasources associated with the default stage are known.
- The .env file is used to obtain environment variables.
- Data is obtained from data.json file

### export

Export data from a datasource associated to a stage.

```sh
lambdaorm export  -s stage1 -e .env 
```

In this example:

- Data is exported from the datasources associated with stage1.
- The .env file is used to obtain the environment variables.
- A file called "stage1-export.json" will be created with all the data associated with the stage1 datasources.

### Build

Running the build command will create or update the following:

- Folder that will contain the source code and is taken from the "infrastructure.paths.scr" configuration in the lambdaorm.yaml file
- Folder that will contain the domain files, the path is relative to the src folder and is taken from the "infrastructure.paths.domain" configuration in the lambdaorm.yaml file
- Model file: file with the definition of the entities
- Repository files: one file for each entity with data access methods
- Install the necessary dependencies according to the databases used

#### Build Node example

Add configuration, model and repositories according to the language.

```sh
lambdaorm build -l node
```

Result:

```sh
├── orm_state
├── lambdaORM.yaml
├── package.json
├── src
│   └── countries
│       └── domain
│           ├── model.ts
│           ├── repositoryCountry.ts
│           └── repositoryState.ts
└── tsconfig.json
```

#### Build Client Node example

```sh
lambdaorm build -l client-node --all -u http://localhost:9291
```

Result:

```sh
├── orm_state
├── lambdaORM.yaml
├── package.json
├── src
│   ├── index.ts
│   └── northwind
│       └── domain
│           ├── model.ts
│           ├── repositoryCategory.ts
│           ├── repositoryCustomer.ts
│           ├── repositoryOrdersDetail.ts
│           ├── repositoryOrder.ts
│           └── repositoryProduct.ts
└── tsconfig.json
```

### Drop

Removes all database objects but not the database.

```sh
lambdaorm drop -e .env -s default
lambdaorm drop -e .env -s insights
```

Result:

```sh
orm_state
├── default-ddl-20231129T110712162Z-push-Catalog.sql
├── default-ddl-20231129T110712163Z-push-Crm.sql
├── default-ddl-20231129T110712163Z-push-Ordering.json
├── default-ddl-20231129T111730593Z-clean-Catalog.sql
├── default-ddl-20231129T111730594Z-clean-Crm.sql
├── default-ddl-20231129T111730594Z-clean-Ordering.json
├── insights-ddl-20231129T110303423Z-push-Insights.sql
└── insights-ddl-20231129T111738316Z-clean-Insights.sql
```

In this example:

- The .env file is used to obtain the environment variables.
- The first execution drops all the database objects associated with the default datasources.
- The second execution drops all the database objects associated with the insights data sources.
- The clean files associated with each datasource of each stage are generated.
- The model file associated with each stage is removed.

## Documentation

Full documentation is available in the [Wiki](https://github.com/lambda-orm/lambdaorm-cli/wiki).

## Related projects

- [Lambda ORM](https://www.npmjs.com/package/lambdaorm)
- [Lambda ORM Service](https://github.com/lambda-orm/lambdaorm-svc)
- [Client Node](https://www.npmjs.com/package/lambdaorm-client-node)
- [Client Kotlin](https://github.com/lambda-orm/lambdaorm-client-kotlin)

## Labs

You can access various labs at [github.com/lambda-orm/lambdaorm-labs](https://github.com/lambda-orm/lambdaorm-labs)
