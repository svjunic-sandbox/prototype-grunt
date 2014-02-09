// #"Last Change: 10-Feb-2014."

module.exports = function(grunt) {

 'use strict';

  var mkdirp = require('mkdirp');
  //var bower  = require('bower');

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    connect: {
        livereload: {
            options: {
                livereload : true
            }
        }
    },
    watch:{
       options: {
          livereload: true,
          nospawn: true
       },
       sprite : {
         files: [
            './sprite_parts/**/*.png'
         ],
         tasks: ['compass:force']
       },
       scss : {
         files: [
            './scss/**/*.scss'
            //'scss/contents/**/*.scss',
         ],
         tasks: ['compass:dev']
       },
       js : {
         /* 全ファイル */
         files: [
            '../js/**/*.js'
         ],
         /* ディレクトリ以下 */
         //files: ['../js/*'],
         //files: '*.js',
         /* 単一 */
         //files: 'mogeta.js',
         tasks: []
       },
       html : {
         files: [ 
             '../**/*.html',
             '../!_development/**/*.html'
         ],
         tasks: []
       },
       jade : {
         files: 'jade/**/*.jade',
         tasks: ['jade']
       }
    },
    jade: {
       compile: {
            options: {
                client: false,
                pretty: true
            },
            files: [ {
                cwd: "jade",
                src: "**/*.jade",
                dest: "../",
                expand: true,
                ext: ".html"
            } ]
        }
    },
    compass: {
      dev: {
        options: {
          config: "config.rb",
          environment: "development",
          force: true
        }
      },
      force: {
        options: {
          config: "config.rb",
          environment: "development",
          force: true
        }
      },
      clean: {
        options: {
          clean: 'true'
        }
      },
      prod: {
        options: {
          config: "config.rb",
          environment: "production",
          force: true
        }
      }
    }
  });

  //プラグインの読み
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jade' );
  grunt.loadNpmTasks('grunt-typescript');


  //タスク登録
  grunt.registerTask("svinit", "My Initialize Task", function(){

    function create_directory() {
    
      var directory= [
          'scss',
          'sprite_parts',
          'jade',
          '../img',
          '../js' ,
          '../js/contents',
          '../js/libs',
          '../css/contents'
      ];
    
      directory.forEach( function( path, index, arr ){
          mkdirp( path , err, success );
      });
    
      function err( error ) {
          console.log( error ); 
      }
      function success() {
          console.log( 'success' ); 
      }
    }

    create_directory();
  });


  grunt.registerTask("default", ["connect","watch"]);
  grunt.registerTask("development", ["connect","watch"]);
};
