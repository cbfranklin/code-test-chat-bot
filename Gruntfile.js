module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            internal: {
                files: [{
                    expand: true,
                    cwd: 'src/styles',
                    src: ['*.scss'],
                    dest: './dist/',
                    ext: '.css'
                }]
            }
        },
        browserSync: {
            bsFiles: {
                src: './dist/**/*'
            },
            options: {
                server: {
                    baseDir: "./dist"
                },
                ghostMode: false,
                watchTask: true,
            }
        },
        copy: {
            views: {
                files: [{
                    expand: true,
                    flatten: true,
                    dest: './dist',
                    src: [
                        './src/views/*.*'
                    ]
                }]
            },
            libs: {
                files: [{
                    expand: true,
                    flatten: true,
                    dest: './dist/js',
                    src: [
                        './node_modules/jquery/dist/jquery.min.js'
                    ]
                }]
            },
            images: {
                files: [{
                    expand: true,
                    flatten: true,
                    dest: './dist/',
                    src: [
                        './src/images/*.*'
                    ]
                }]
            },
            js: {
                files: [{
                    expand: true,
                    flatten: true,
                    dest: './dist/js',
                    src: [
                        './src/scripts/*.*'
                    ]
                }]
            }
        },
        clean: {
            dist: {
                src: ['./dist']
            }
        },
        watch: {
            styles: {
                files: ["./src/styles/**/*"],
                tasks: ["sass"]
            },
            views: {
                files: ["./src/views/**/*"],
                tasks: ["copy:views"]
            },
            gruntfile: {
                files: ["./Gruntfile.js"],
                tasks: ["sass", "copy"]
            }
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'sass', 'copy', 'browserSync', 'watch']);

};
