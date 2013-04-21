'use strict';

module.exports = function(grunt) {

  // Grunt project configuration

  grunt.initConfig({
    pkg: '<json:package.json>',

    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    // Task configuration

    // clean the distribution folder.
    clean: {
      src: ['dist']
    },

    // concat plugin configuration
    concat: {

      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },

      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/ba-<%= pkg.name %>.js'
      }
    },

    // require-js-configuration
    requirejs: {
      compile: {
        // !! You can drop your app.build.js config wholesale into 'options'
        options: {
          appDir: "src/app/js",
          baseUrl: ".",
          dir: "target/",
          optimize: 'none',
          mainConfigFile:'./src/app/js/main.js',
          // modules:[
          //   {
          //     name:'modules/model/moduleA'
          //   }
          // ],
          logLevel: 0,
          findNestedDependencies: true,
          fileExclusionRegExp: /^\./,
          inlineText: true
        }
      }
    },

    uglify: {

      options: {
        banner: '<%= banner %>'
      },

      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/ba-<%= pkg.name %>.min.js'
      }
    },

    qunit: {
      files: ['test/**/*.html']
    },

    jshint: {

      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },

      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['src/js/modules/**/*.js', 'src/js/mail.js']
      },

      test: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },

    watch: {

      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },

      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },

      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-manifest');


  // Default task.
  grunt.registerTask('default', [
    'jshint',
    //'qunit',
    'clean',
    //'concat',
    'uglify']);

};