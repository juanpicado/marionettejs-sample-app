/*global require:false, module:false*/

'use strict';

var path = require('path');

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect['static'](path.resolve(point));
};

module.exports = function(grunt) {

  // Grunt project configuration

  grunt.initConfig({
    pkg: '<json:package.json>',

    dirs: {
      root: 'src/app',
      staging: 'temp/staging',
      dist: 'dist',
      sass : 'src/sass',
      test: 'src/test'
    },

    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration

    // clean the distribution folder.

    clean: {
      dist: ['<%= dirs.staging %>','<%= dirs.dist %>']
    },

    // server

    server: {
      dev: {
        options: {
          port: 3001,
          base: '<%= dirs.root %>',
          keepalive: false,
          middleware: function(connect, options) {
            return [
              lrSnippet,
              folderMount(connect, options.base)
            ];
          }
        }
      },
      pro: {
        options: {
          port: 3002,
          base: '<%= dirs.dist %>/public',
          keepalive: true
        }
      }
    },

    // prepare files to be minimized,
    //read the embebed configuration for each html in the projject

    'useminPrepare': {
      options: {
        dest: '<%= dirs.staging %>/step2'
      },
      html: '<%= dirs.staging %>/step1/*.html'
    },

    // files minimize process

    usemin: {
      options: {
        basedir: '<%= dirs.staging %>/step2'
      },

      html: {
        expand: true,
        cwd: '<%= dirs.staging %>/step2',
        src:['**/*.{html,css}']
      }
    },

   // copy task, define the build workflow

    copy: {

        'dist-step-1': {
          expand: true,
          cwd: '<%= dirs.root %>',
          src: ['**','!css/style.css'],
          dest: '<%= dirs.staging %>/step1/'
        },

        'dist-step-2': {
          expand: true,
          cwd: '<%= dirs.staging %>/step1',
          src: [
            "*",
            "**/*.js",
            "!js/modules",
            'js/vendor/modernizr/modernizr.js',
            "js/vendor/requirejs/require.js",
            "!js/modules/**/*.js",
            "ico/**"
          ],
          dest:  "<%= dirs.staging %>/step2/"
        },

        'dist-step-3': {
          expand: true,
          cwd: '<%= dirs.staging %>/step2',
          src: [
            "**/*.html",
            "**",
            "js/*.js",
            "!js/*main.js",
            '!**/vendor/**',
            'js/vendor/modernizr/*modernizr.js',
            "**/require.js",
            "!js/modules/**/*.js"
          ],
          dest:  "<%= dirs.staging %>/step3/"
        },

        'dist-final': {
          expand: true,
          cwd: '<%= dirs.staging %>/step3',
          src: ["**"],
          dest:  "<%= dirs.dist %>/public/"
        }
      },

      /**
       * RequireJS Main Configuration
       */
      requirejs: {

        options: {

          baseUrl: "<%= dirs.staging %>/step1/js",

          almond: true,

          optimize: "uglify2",

          useStrict: true,

          logLevel: 2,

          name: "vendor/almond/almond",

          include: ['modules/TwitterSearchApp'],

          mainConfigFile: "<%= dirs.staging %>/step1/js/main.js",

          wrap: true
        },

        dev: {
          options: {
            optimize: "none",
            out: "<%= dirs.staging %>/step1/js/amd-app.js"
          }
        },

        prod: {
          options: {
            out: "<%= dirs.staging %>/step1/js/amd-app.js"
          }
        }
      },

      /**
       * Compass configuration
       * @property compass
       */
      compass: {
        options: {
          sassDir: '<%= dirs.sass %>',
          raw:  'images_dir = "src/app/img"\n' +
                'http_images_path = "../img"\n' +
                'http_javascripts_path = "../js"\n' +
                'http_stylesheets_path = "."\n'
        },
        dev: {
          options: {
            cssDir: '<%= dirs.root %>/css',
            environment: 'development'
          }
        },
        dist: {
          options: {
            cssDir: '<%= dirs.staging %>/step1/css',
            environment: 'production',
            force: true
          }
        }
      },

      /**
       * File Revision Confiugration
       * @property
       */
      rev: {
        files: {
          expand: true,
          cwd: '<%= dirs.staging %>/step2',
          src: [  'js/custom/**/*.js',
                  'js/*.js',
                  '!js/vendor/*.js',
                  'js/vendor/modernizr/modernizr.js',
                  'css/**/*.css',
                  'img/**/*.{png,jpg}',
                  'css/imgages/**/*.{png,jpg}']
        }
      },

      /**
       * JSHint Configuration
       * @property
       */
      jshint: {
        options: {
          jshintrc: './.jshintrc'
        },
        gruntfile: ['Gruntfile.js'],
        js: ['<%= dirs.root %>js/modules/**/*.js'],
        'test-unit': ['<%= dirs.test %>/unit/**/*.js'],
        dev: {
          src: [ '<%= jshint.gruntfile %>',
                 '<%= jshint.js %>' ,
                 "<%= jshint['test-unit'] %>" ]
        },
        build: {
          src: [ '<%= jshint.gruntfile %>',
                 '<%= jshint.js %>' ]
        }
      },

      manifest:{
        dest: '<%= dirs.staging %>/step3/manifest.appcache',
        port: 3002
      },

      htmlmin: {
        dist: {
          options: {
            removeComments: true,
            collapseWhitespace: true
          },
          expand: true,
          cwd: '<%= dirs.staging %>/step2',
          src: '**/*.html',
          dest: '<%= dirs.staging %>/step3/'
        }
      },

      // regarde configuration

      regarde: {
        html: {
          files: ['<%= dirs.root %>/*.html'],
          tasks: ['livereload'],
          spawn: false
        },
        js: {
          files: ['<%= dirs.root %>/js/**/*.js'],
          tasks: ['jshint:dev', 'jasmine', 'livereload', 'wait:100'],
          spawn: false
        },
        compass: {
          files: [ '<%= dirs.sass %>/*.sass', '<%= dirs.sass %>/*.scss' ],
          tasks: [ 'compass:dev', 'livereload'],
          spawn: false
        },
        'test-unit': {
          files: ['<%= dirs.test %>/unit/**/*.js'],
          tasks: ['jshint:dev', 'wait:100'],
          spawn: false
        },
        gruntfile: {
          files: ['Gruntfile.js'],
          tasks: ['wait:100', 'jshint:dev'],
          spawn: false
        }
      }
    });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-manifest');


  // Default task.
  grunt.registerTask('production', [
    'jshint:build',
    'clean',
    'copy:dist-step-1',
    'compass:dist',
    'useminPrepare',
    "requirejs:prod",
    'concat',
    'cssmin',
    'uglify',
    'copy:dist-step-2',
    'rev',
    'usemin',
    'copy:dist-step-3',
    'htmlmin:dist',
    'manifest',
    'copy:dist-final'
  ]);

  // server task
  grunt.renameTask('connect', 'server');

  grunt.registerTask('dev', ['jshint:dev', 'compass:dev', 'livereload-start' , 'server:dev', 'regarde']);

  grunt.registerTask('default', ['production']);

  grunt.registerTask('dist', ['server:pro']);

};