module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            before : ['dist/*', '.tmp'],
            after : ['dist/css', 'dist/js', 'dist/lib', 'dist/views', 'dist/assets/templates.js']
        },

        compass: {
            dist: {
                options : {
                    config : 'config.rb'
                }
            },
        },

        copy: {
            all: {
                files: [
                    {
                        expand: true,
                        cwd : 'app',
                        src: '**',
                        dest: 'dist'
                    },
                    {
                        expand : true,
                        flatten : true,
                        src : 'app/lib/bootstrap/fonts/*',
                        dest : 'dist/fonts/'
                    }
                ]
            }
        },

        ngtemplates: {
            dist: {
                cwd : 'app',
                src: 'views/*.html',
                dest: 'dist/assets/templates.js',
                options : {
                    module : 'kittylist',
                    usemin : 'assets/app.js'
                }
            }
        },

        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },

        usemin: {
            html : 'dist/index.html'
        },

        uglify : {
            options : {
                mangle : false
            }
        },

        targethtml : {
            dist : {
                files : {
                    'dist/index.html' : 'dist/index.html'
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean:before',
        'copy:all',
        'compass',
        'useminPrepare',
        'ngtemplates:dist',
        'concat',
        'cssmin',
        'uglify',
        'usemin',
        'targethtml',
        'clean:after'
    ]);

    grunt.registerTask('default', ['build']);
};