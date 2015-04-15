// #"Last Change: 15-Apr-2015."

var DOCUMENT_ROOT = '../';

module.exports = function(grunt) {

 'use strict';

  var mkdirp = require('mkdirp');

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    connect: {
        livereload: {
            options: {
                livereload : true
            }
        }
    },
    esteWatch: {
      options: {
        dirs: [ '../jade_ssi_includes/**', '../jade_includes/**', 'jade/**', 'coffee/**', 'scss/**', 'sprite_parts/**', DOCUMENT_ROOT ],
        livereload: {
          enabled: true,
          extensions: [ 'jade', 'scss', 'coffee', 'html', 'js', 'css', 'png', 'jpg', 'gif' ],
          port: 35729
        }
      },
      html   : function( filepath ) { return; },
      jade   : function( filepath ) { return [ 'newer:jade:dev' ]; },
      scss   : function( filepath ) { return [ 'compass:dev' ]; },
      //scss   : function( filepath ) { return [ 'compass:prod' ]; },
      coffee : function( filepath ) { return [ 'coffee:compile', 'concat:js', 'uglify:prod' ]; },
      js     : function( filepath ) { return [ 'uglify:prod' ]; }
    },

    coffee: {
      compile: {
        options:{
          bare: false
        },
        files:[{ 
          expand: true,
          cwd: './coffee/',
          src: ['**/*.coffee'],
          dest: './js',
          ext: '.js',
        }]
      }
    },

    jade: {
       dev : {
            options: {
                client: false,
                pretty: false
            },
            files: [ {
                cwd: "jade",
                src: [
                  "*.jade",
                  "**/*.jade",
                  "!_includes",
                  "!_includes/*",
                  "!_includes/**/*"
                ],
                dest: DOCUMENT_ROOT,
                expand: true,
                ext: ".html"
            } ]
       },
       prod: {
            options: {
                client: false,
                pretty: true
            },
            files: [ {
                cwd: "jade",
                src: [
                  "*.jade",
                  "**/*.jade",
                  "!_includes",
                  "!_includes/*",
                  "!_includes/**/*"
                ],
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


    /* concat
     * */
    concat: {
      options: {
        separator: ';',
      },
      coffee : {
        files: {
          './coffee/contents/src/classes.coffee' : [
            './coffee/contents/src/class/**/*.coffee'
          ],
        }
      },
      js : {
        files: {
          './js/contents/app.js' : [
            './js/contents/src/classes.js',
            './js/contents/src/main.js'
          ],
        },
      },
    },


    /* uglify
     * */
    uglify : {
      prod : {
        files: [{
          expand: true,
          ext: '.min.js',
          cwd: './js/contents',
          src: '*.js',
          dest: './js/contents'
        }]
      }
    },


    /* grunt-img
     * */
    imagemin: {
      release: {
        files: [
          {
            expand : true,
            cwd    : '../',
            src    : [
              '*.{png,jpg,gif}',
              '**/*.{png,jpg,gif}',
              '!_development/*.{png,jpg,gif}',
              '!_development/**/*.{png,jpg,gif}',
              '!_includes*.{png,jpg,gif}',
              '!_includes/**/*.{png,jpg,gif}'
            ],
            dest   : DOCUMENT_ROOT + '../release'
          }
        ]
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
        dest: DOCUMENT_ROOT + 'js',
        src: ['**', '!_development', '!_development/**/*'],
      },
      root: {
        expand : true,
        cwd    : '../',
        dest: DOCUMENT_ROOT + '../release',
        src    : ['**', '!_development', '!_development/**/*', '!_includes', '!_includes/**/*', '!**/src', '!**/src/*', '!**/src/**/*'],
      }
    }

  });



  //プラグインの読み
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jade' );
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-este-watch');


  //タスク登録
  grunt.registerTask("svinit", "My Initialize Task", function(){

    function create_directory() {
    
      var directory= [
          'scss',
          'sprite_parts',
          'jade',
          'jade/_includes',
          'coffee',
          'coffee/contents',
          'coffee/contents/src',
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


  grunt.registerTask("default", ["connect","esteWatch"]);
  grunt.registerTask("development", ["connect","esteWatch"]);
  grunt.registerTask("deploy:prod", [ 'jade:prod','compass:prod',"copy:prod","uglify:prod" ]);
  grunt.registerTask("deploy:root", [ 'jade:prod','compass:prod',"copy:prod","uglify:prod","copy:root","imagemin:release" ]);
};
