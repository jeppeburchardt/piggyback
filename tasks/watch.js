module.exports = function(grunt) {
	
	grunt.config.merge({
		watch: {
			files: "./public_source/styles/**",
			tasks: ["less:development"]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	
};