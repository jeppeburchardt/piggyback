module.exports = function(grunt) {
	
	grunt.config.merge({
		jshint: {
			development: {
				files: {
					src: ['public_source/**/*.js', 'public_source/**/*.jsx']
				},
				options: {
					jshintrc: '.jshintrc'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-jsxhint');

};