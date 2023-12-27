# Build

build model, repositories.

## Params

| parameter		| short | describe 																												|
|-------------|-------|-----------------------------------------------------------------|
|workspace		| -w 		| Project path.																										|
|url					| -u 		| When working with a client you must pass the url of the service	|
|language			| -l 		| Develop language.																								|
|model				| -m 		| Build model.																										|
|repositories	| -r 		| Build repositories.																							|
|all					| -a 		| Build model and repositories.																		|
|src-path			| -s 		| Relative source code path in workspace.													|
|data-path		| -d 		| Relative data path in workspace.																|
|domain-path	| -o 		| Relative domain path in source code path.												|

## Example

```sh
lambdaorm build -w lab/countries
```
