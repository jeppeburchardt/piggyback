module.exports = function(grunt) {
	
	grunt.config.merge({
		requirejs: {
			compile: {
				options: {
					baseUrl: './public_source',
					mainConfigFile: './public_source/main.js',
					out: './public_build/main.js',
					name: 'app',
					preserveLicenseComments: false,
					generateSourceMaps: true,
					optimize: 'uglify2'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');

};