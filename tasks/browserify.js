module.exports = function(grunt) {
	
	var reactify = require('reactify');

	grunt.config.merge({
		browserify: {
			options: {
				transform:  [reactify]
			},
			app: {
				src: './public_source/app.js',
				dest: './public_build/main.js',
			},
		}
	});

	grunt.loadNpmTasks('grunt-browserify');

};