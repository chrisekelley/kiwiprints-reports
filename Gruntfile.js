module.exports = function(grunt) {

  grunt.initConfig({
    dirs: {
      handlebars: 'couch/app/_attachments/templates'
    },
    watch: {
      handlebars: {
        files: ['<%= handlebars.compile.src %>'],
        tasks: ['handlebars:compile', 'couch']
      },
      less: {
        files: ['couch/app/_attachments/bower_components/bootstrap/less/*.less'],
        tasks: ['less', 'couch']
      },
      //coffee: {
      //  files: ['couch/app/_attachments/**/*.coffee','couch/app/lists/**/*.coffee','couch/app/views/**/*.coffee'],
      //  tasks: ['coffee', 'couch']
      //},
      coffee: {
        files: ['couch/app/_attachments/**/*.coffee','couch/app/lists/**/*.coffee','couch/app/views/**/*.coffee'],
        tasks: ['coffee', 'couch']
      },
      allJsHtml: {
        files: ['couch/app/_attachments/**/*.js','couch/app/lists/**/*.js','couch/app/views/**/*.js','couch/app/templates/**/*.html', 'couch/app/_attachments/**/*.html'],
        tasks: ['copy','couch']
      },
      configFiles: {
        files: [ 'Gruntfile.js']
      }
    },
    handlebars: {
      compile: {
        options: {
          amd: false
        },
        src: ["couch/app/_attachments/templates/**/*.handlebars"],
        dest: "couch/app/_attachments/templates/precompiled.handlebars.js"
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'couch',
        src: '**/*.html',
        dest: 'dist/'
      },
      js: {
        expand: true,
        cwd: 'couch',
        src: '**/*.js',
        dest: 'dist/'
      },
      css: {
        expand: true,
        cwd: 'couch',
        src: '**/*.css',
        dest: 'dist/'
      }
    },
    less: {
      development: {
        options: {
          paths: ["couch/app/_attachments/bower_components/bootstrap/less", "couch/app/_attachments/bower_components/bootstrap/dist/css"],
          cleancss: true,
          yuicompress: true,
          compress: true,
          sourceMap: true,
          sourceMapFilename: "couch/app/_attachments/bower_components/bootstrap/dist/css/bootstrap.css.map",
          sourceMapBasepath: "couch/app/_attachments/bower_components/bootstrap/dist/css/"
        },
        files: {
          "couch/app/_attachments/bower_components/bootstrap/dist/css/bootstrap.css": "couch/app/_attachments/bower_components/bootstrap/less/bootstrap.less"
        }
      }
    },
    coffee: {
      compile: {
        options: {
          bare: true
        },
        expand: true,
        flatten: false,
        cwd: "couch/app",
        src: ["**/*.coffee"],
        dest: 'dist/app',
        ext: ".js"
        //files: {
        //  'couch/app/_attachments/**/*.js': 'couch/app/_attachments/**/*.coffee' // 1:1 compile,
        //}
      }
    },
    'couch-compile': {
        app: {
          files: {
            'tmp/reports.json': ['dist/*',  '!.coffee', '!_attachments/js/KiwiUtils.coffee']
          }
        }
      },
    'couch-push': {
      options: {
        user: 'admin',
        pass: 'password'
      },
      localhost: {
        files: {
          'http://localhost:5984/coconut-moz-2015-reports': 'tmp/reports.json'
        }
      }
    },
    'couch-replication': {
      options: {
        user: 'admin',
        pass: 'password'
      },
      localhost: {
        files: {
          'http://localhost:5984': 'couch/replications/*.json'
        }
      }
    },
    bowercopy: {
      options: {},
      libs: {
        options: {
          destPrefix: 'couch/app/_attachments/js'
        },
        files: {
          'jquery.js': 'jquery/dist/jquery.js',
          'bootstrap.js': 'bootstrap/dist/js/bootstrap.js',
        }
      },
      css: {
        options: {
          destPrefix: 'couch/app/_attachments/css'
        },
        files: {
          'bootstrap.css': 'bootstrap/dist/css/bootstrap.css',
          'bootstrap.css.map': 'bootstrap/dist/css/bootstrap.css.map',
        }
      }
    }
  });

  // Requires the needed plugin
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-couch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bowercopy');

  grunt.registerTask('default',['couch']);
  grunt.registerTask('default',['less']);

};
