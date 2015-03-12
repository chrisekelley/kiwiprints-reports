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
      coffee: {
        files: ['couch/app/_attachments/**/*.coffee','couch/app/lists/**/*.coffee','couch/app/views/**/*.coffee'],
        tasks: ['coffee', 'couch']
      },
      allJs: {
        files: ['couch/app/_attachments/**/*.js','couch/app/lists/**/*.js','couch/app/views/**/*.js'],
        tasks: ['couch']
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
        cwd: ".",
        src: ["**/*.coffee"],
        dest: '.',
        ext: ".js"
        //files: {
        //  'couch/app/_attachments/**/*.js': 'couch/app/_attachments/**/*.coffee' // 1:1 compile,
        //}
      }
    },
      'couch-compile': {
        app: {
          files: {
            'tmp/reports.json': ['couch/*',  '!.coffee', '!_attachments/js/KiwiUtils.coffee']
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
          'http://localhost:5984/grunt-couch-test': 'tmp/reports.json'
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
    }
  });

  // Requires the needed plugin
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-couch');
  grunt.registerTask('default',['couch']);
  grunt.registerTask('default',['less']);

};
