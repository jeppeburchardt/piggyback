module.exports = function(grunt) {


	

	grunt.config.init({
		pkg: require('./package.json'),
	});

	grunt.task.loadTasks('tasks');

	grunt.registerTask('dev', ['less', 'jshint']);
	grunt.registerTask('dev-watch', ['less', 'jshint', 'watch']);
	grunt.registerTask('build', ['less', 'requirejs', 'copy']);

	grunt.registerTask('default', ['less']);

};