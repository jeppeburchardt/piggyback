module.exports = function(grunt) {
	
	grunt.config.merge({
		copy: {

			main: {
				expand: true,
				flatten: true,
				src: [
					'public_source/index.html',
					'public_source/require.js'
				], 
				'dest': 'public_build',
				'filter':'isFile'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');

};