# Sync

Synchronize database/s.

## Params

| parameter	| short | describe 																	|
|-----------|-------|-------------------------------------------|
|workspace	| -w 		| project path.															|
|stage			| -s 		| Name of stage															|
|envfile		| -e 		| Read in a file of environment variables.	|
|output			| -o 		| Generates the queries but does not apply.	|

## Example

```sh
lambdaorm sync -w lab/countries -e lab/countries/.env
```
