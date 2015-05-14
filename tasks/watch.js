module.exports = function(grunt) {
	
	grunt.config.merge({
		watch: {
			files: ['./public_source/**'],
			tasks: ['less:development', 'jshint']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	
};