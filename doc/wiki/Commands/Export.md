# Export

Export data from a database.

## Params

| parameter	| short | describe 																												|
|-----------|-------|-----------------------------------------------------------------|
|workspace	| -w 		| project path.																										|
|stage			| -s 		| Name of stage																										|
|envfile		| -e 		| Read in a file of environment variables.												|
|target			| -t 		| Destination file with export data.															|
|url				| -u 		| When working with a client you must pass the url of the service	|

## Example

```sh
lambdaorm export -w lab/countries -e lab/countries/.env -t ./lab/countries/data
```
