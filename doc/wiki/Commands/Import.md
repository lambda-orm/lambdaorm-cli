# Import

Import data from file to database.

## Params

| parameter	| short | describe 																												|
|-----------|-------|-----------------------------------------------------------------|
|workspace	| -w 		| project path.																										|
|stage			| -s 		| Name of stage																										|
|envfile		| -e 		| Read in a file of environment variables.												|
|data				| -d 		| Data file to import.																						|
|url				| -u 		| When working with a client you must pass the url of the service	|

## Example

```sh
lambdaorm import -w lab/countries -e lab/countries/.env -d ./lab/countries/data/default-export.json
```
