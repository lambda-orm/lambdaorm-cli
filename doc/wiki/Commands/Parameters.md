# Parameters

Return parameters associated with the query expression.

## Params

| parameter	| short | describe 																																									|
|-----------|-------|-------------------------------------------------------------------------------------------|
|workspace	| -w 		| project path.																																							|
|query			| -q 		| Query expression																																					|
|output			| -o 		| Generates an output according to the following possible values [json|beautiful|light|yaml]|
|url				| -u 		| When working with a client you must pass the url of the service	                          |

## Example

```sh
lambdaorm parameters -o beautiful -q "Orders.filter(p=>p.id==id).include(p=>p.details)"
```

Result:

```json
[
  {
    "name": "id",
    "type": "integer"
  },
  {
    "name": "details",
    "type": "Orders.details",
    "children": [
      {
        "name": "LambdaOrmParentId",
        "type": "any"
      }
    ]
  }
]
```
