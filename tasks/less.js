module.exports = function(grunt) {
	
	grunt.config.merge({
		less: {
			development: {
				options: {
					yuicompress: false
				},
				files: {
					"./public_source/styles.css": "./public_source/styles/index.less"
				}
			},
			production: {
				options: {
					yuicompress: true
				},
				files: {
					"./public_build/styles.css": "./public_source/styles/index.less"
				}
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');

};