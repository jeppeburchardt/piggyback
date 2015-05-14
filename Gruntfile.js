module.exports = function(grunt) {


	

	grunt.config.init({
		pkg: require('./package.json'),
	});

	grunt.task.loadTasks('tasks');

	grunt.registerTask('dev', ['less', 'watch']);
	grunt.registerTask('build', ['less', 'requirejs', 'copy']);

	grunt.registerTask('default', ['less']);

};