module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: { // Begin Sass Plugin
			dist: {
				options: {
					sourcemap: 'none',
					loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
				},
				files: [{
					expand: true,
					cwd: 'sass',
					src: ['**/*.scss'],
					dest: 'css',
					ext: '.css'
				}]
			}
		},
		postcss: { // Begin Post CSS Plugin
			options: {
				map: false,
				processors: [
					require('autoprefixer')({
						browsers: ['last 2 versions']
					})
				]
			},
			dist: {
				src: 'css/style.css'
			}
		},
		stripCssComments: {
			dist: {
				options: {
					preserve: false
				},
				files: {
					'css/style.min.css': 'css/style.min.css'
				}
			}
		},
		cssmin: { // Begin CSS Minify Plugin
			target: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.css', '!*.min.css'],
					dest: 'css',
					ext: '.min.css'
				}]
			}
		},
		uglify: { // Begin JS Uglify Plugin
			build: {
				src: [ 'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js', 'src/*.js'],
				dest: 'js/script.min.js'
			}
		},
		browserSync: {
            dev: {
                // What files to inject
                bsFiles: {
                    src: ['css/style.min.css', 'index.html']
                },
                options: {
                    watchTask: true,
                    server: {
						baseDir: "./"
					}
                }
            }
        },
		watch: {
			options: {
				interval: 5000
			},
			css: {
				files: 'sass/*.scss',
				tasks: ['sass', 'postcss', 'cssmin', 'stripCssComments']
			},
			js: {
				files: 'src/*.js',
				tasks: ['uglify']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-strip-css-comments');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['browserSync', 'watch']);
};
