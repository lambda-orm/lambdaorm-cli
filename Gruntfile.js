const fs = require('fs')

module.exports = function (grunt) {
	// Load the plugins
	require('load-grunt-tasks')(grunt)
	// Project configuration.
	grunt.initConfig({
		exec: {
			lint: { cmd: 'npx eslint src ' },
			tsc: { cmd: 'npx tsc ' },
			release: { cmd: './release.sh' },
			to_develop: { cmd: './to_develop.sh' }
		},
		clean: {
			build: ['build'],
			dist: ['dist']
		},
		copy: {
			sintaxis: { expand: true, cwd: './src', src: './sintaxis.d.ts', dest: 'build/' },
			build: { expand: true, cwd: 'build/', src: '**', dest: 'dist/' },
			readme: { expand: true, src: './README.md', dest: 'dist/' },
			license: { expand: true, src: './LICENSE', dest: 'dist/' },
			jest: { expand: true, src: './jest-unit-config.json', dest: 'dist/' }
		}
	})
	grunt.registerTask('create-package', 'create package.json for dist', function () {
		const data = require('./package.json')
		delete data.devDependencies
		delete data.private
		data.scripts = {
			test: data.scripts.test
		}
		data.main = 'index.js'
		data.bin = { lambdaorm: 'infrastructure/index.js' }
		data.types = 'index.d.ts'
		fs.writeFileSync('dist/package.json', JSON.stringify(data, null, 2), 'utf8')
	})
	grunt.registerTask('build', ['clean:build', 'exec:tsc', 'copy:sintaxis', 'exec:lint'])
	grunt.registerTask('dist', ['clean:dist', 'build', 'copy:build', 'copy:jest', 'copy:readme', 'copy:license', 'create-package'])
	grunt.registerTask('release', ['dist', 'exec:release'])
	grunt.registerTask('to_develop', ['build', 'exec:to_develop'])
	grunt.registerTask('default', [])
}
