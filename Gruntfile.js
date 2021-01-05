module.exports = function (grunt){
    
    grunt.initConfig({
        sass: {
            dist: {
                files: [{
		    expand: true,
		    cwd: 'public/style',
		    src: ['*.scss'],
		    dest: 'public/style',
		    ext: '.css'
		}]
	    }
	},
	
	watch: {
	    files: ['public/style/*.scss', 'public/style/src/*.scss'],
	    tasks: ['css'],
	},

	browserSync: {
            dev: {
                bsFiles: {
	           src: [
		       'public/style/*.css',
		       'public/*.html',
		       'public/scripts/*.js'
		   ] 
		},
		options: {
	            watchTask: true,
		    server:{
			baseDir: 'public/',
		    }
		}
	    }
	    
	},
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch'])
};
