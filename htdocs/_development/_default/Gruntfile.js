// #"Last Change: 04-Dec-2013."

module.exports = function(grunt) {

 'use strict';

  var mkdirp = require('mkdirp');
  var bower  = require('bower');

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
            //'sprite_parts/common/*.png'
         ],
         tasks: ['compass:force']
       },
       scss : {
         files: [
            'scss/**/*.scss',
            'scss/contents/**/*.scss',
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
         files: '../**/*.html',
         tasks: []
       },
       jade : {
         files: '../**/*.jade',
         tasks: ['jade:compie']
       }
    },
    jade: {
        compile: {
            options: {
                data: {
                    debug: false
                }
            },
            files: {
            }
        }
    },
    compass: {
      dev: {
        options: {
          config: "config.rb",
          environment: "development"
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
          environment: "production"
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
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jade' );
  grunt.loadNpmTasks('grunt-typescript');


  //タスク登録
  grunt.registerTask("svinit", "My Initialize Task", function(){
    create_directory();

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
    
    
      function err(err) {
          console.log( err ); 
      }
      function success() {
          console.log( 'success' ); 
      }
    }

    // library_install();
    // function library_install(){
    //     console.log( 'Install Library' );
    //     var library = [
    //         'jquery',
    //         'lodash'
    //     ];
    //     var options = {
    //         save: true
    //     };
    //     bower.commands
    //         .install( library, options, {} )
    //         .on( 'end', function ( data ) {
    //             data && console.log( data );
    //         });
    // }
  });



  grunt.registerTask("default", ["connect","watch"]);
  grunt.registerTask("development", ["connect","watch"]);
};
