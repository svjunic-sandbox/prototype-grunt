// #"Last Change: 05-Jun-2014."

var DOCUMENT_ROOT = '../';

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
         options: {
            livereload: true,
            nospawn: true
         },
         /* 全ファイル */
         files: [
            DOCUMENT_ROOT + 'js/**/*.js'
         ],
         /* ディレクトリ以下 */
         //files: ['../js/*'],
         //files: '*.js',
         /* 単一 */
         //files: 'mogeta.js',
         tasks: []
       },
       devjs : {
         files: [
            './js/**/*.js'
         ],
         tasks: ['copy:dev']
       },
       html : {
         files: [ 
             DOCUMENT_ROOT + '**/*.html',
             DOCUMENT_ROOT + '!_development/**/*.html'
         ],
         tasks: []
       },
       coffee : {
         files: 'coffee/**/*.coffee',
         tasks: ['coffee']
       },
       jade : {
         files: 'jade/**/*.jade',
         tasks: ['jade']
       }
    },
    coffee: {
      compile: {
        files:[{ 
          expand: true,
          cwd: './coffee',
          src: ['**/*.coffee'],
          dest: './js',
          ext: '.js',
        }]
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
                dest: DOCUMENT_ROOT,
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
    },

    /* uglify
     * */
    uglify : {
      prod : {
        files: [{
          expand: true,
          ext: '.min.js',
          cwd: DOCUMENT_ROOT + 'js',
          src: '**/*.js',
          dest: DOCUMENT_ROOT + 'js'
        }]
      }
    },


    /* copy 
     * */
    copy : {
      dev : {
        expand: true,
        cwd: './js',
        src: ['**'],
        dest: DOCUMENT_ROOT + 'js'
      },
      prod : {
        expand: true,
        cwd: './js',
        src: ['**', '!_development', '!_development/**/*'],
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
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-typescript');


  //タスク登録
  grunt.registerTask("svinit", "My Initialize Task", function(){

    function create_directory() {
    
      var directory= [
          'scss',
          'sprite_parts',
          'jade',
          'jade/_includes',
          'coffee/contents',
          DOCUMENT_ROOT + 'img',
          DOCUMENT_ROOT + 'js' ,
          DOCUMENT_ROOT + 'js/libs',
          DOCUMENT_ROOT + 'js/contents',
          DOCUMENT_ROOT + 'css/contents'
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
  grunt.registerTask("deploy:prod", [ 'jade:prod','compass:prod',"copy:prod","uglify:prod" ]);
};