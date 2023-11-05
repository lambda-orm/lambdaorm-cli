module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt)
	grunt.initConfig({
		exec: {
			tsc: { cmd: 'npx tsc ' },
			lint: { cmd: 'npx eslint src ' },
			test: { cmd: 'npx jest --config jest-config.json' },
			doc: { cmd: 'npx typedoc --plugin typedoc-plugin-markdown --out doc/source src/lib/doc.index.ts' },
			release: { cmd: './task/release.sh' },
			to_develop: { cmd: './task/to_develop.sh' }
		},
		clean: {
			build: ['build'],
			dist: ['dist']
		},
		copy: {
			sintaxis: { expand: true, cwd: './src/lib/domain', src: './sintaxis.d.ts', dest: 'build/domain' },
			lib: { expand: true, cwd: 'build/lib', src: '**', dest: 'dist/' },
			readme: { expand: true, src: './README.md', dest: 'dist/' },
			license: { expand: true, src: './LICENSE', dest: 'dist/' },
			jest: { expand: true, src: './jest-config.json', dest: 'dist/' }
		}
	})
	grunt.registerTask('create-package', 'create package.json for dist', function () {
		const fs = require('fs')
		const data = require('../package.json')
		delete data.devDependencies
		delete data.private
		data.scripts = {
			test: data.scripts.test
		}
		data.main = 'index.js'
		data.bin = { lambdaorm: 'index.js' }
		data.types = 'index.d.ts'
		fs.writeFileSync('dist/package.json', JSON.stringify(data, null, 2), 'utf8')
	})
	grunt.registerTask('lint', ['exec:lint'])
	grunt.registerTask('build', ['lint', 'clean:build', 'exec:tsc', 'copy:sintaxis'])
	grunt.registerTask('test', ['build', 'exec:test'])
	grunt.registerTask('doc', ['exec:doc'])
	grunt.registerTask('dist', ['test', 'clean:dist', 'copy:lib', 'copy:jest', 'copy:readme', 'copy:license', 'create-package'])
	grunt.registerTask('to_develop', ['test', 'exec:to_develop'])
	grunt.registerTask('release', ['dist', 'doc', 'exec:release'])
	grunt.registerTask('default', [])
}
