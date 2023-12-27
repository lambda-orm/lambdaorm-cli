# Execute

Execute an query expression.

## Params

| parameter	| short | describe 																																									|
|-----------|-------|-------------------------------------------------------------------------------------------|
|workspace	| -w 		| project path.																																							|
|stage			| -s 		| Name of stage																																							|
|query			| -q 		| Query expression																																					|
|data				| -d 		| Data used to execute expression																														|
|envfile		| -e 		| Read in a file of environment variables.																									|
|output			| -o 		| Generates an output according to the following possible values [json|beautiful|light|yaml]|
|url				| -u 		| When working with a client you must pass the url of the service	                          |

## Examples

### BulkInsert

```sh
lambdaorm execute -w lab/countries -e lab/countries/.env -q Countries.bulkInsert().include(p => p.states) -d ./lab/countries/countries.json
```

### Query

```sh
lambdaorm execute -e ".env" -o beautiful -q "Products.distinct(p => ({ quantity: p.quantity, category: p.category.name })).sort(p => p.category).page(1,3)"
```

Result:

```json
[
  {
    "quantity": "10 boxes x 20 bags",
    "category": "Beverages"
  },
  {
    "quantity": "24 - 12 oz bottles",
    "category": "Beverages"
  },
  {
    "quantity": "12 - 355 ml cans",
    "category": "Beverages"
  }
]
```
