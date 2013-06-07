var _   = require('underscore'),
  fs  = require("fs");

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    axure_prototype: '<%= pkg.axure_prototype %>',
    staticFilesRun: {
      src: ['<%= pkg.axure_prototype %>*.html']
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['fonts/*'], dest: '<%= pkg.axure_prototype %>/resources/', filter: 'isFile'},
          {expand: true, src: ['css/*'], dest: '<%= pkg.axure_prototype %>/resources/', filter: 'isFile'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // We never process these files
  var excludes = [  grunt.config('axure_prototype') + 'chm_start.html',
                    grunt.config('axure_prototype') + 'start.html',
                    grunt.config('axure_prototype') + 'index.html'];

  grunt.registerMultiTask('staticFilesRun', function (arg) {
    files = _.without.apply(_, [this.filesSrc].concat(excludes));

    _.each(files, function (file) {
      var currentFile = grunt.file.read(file);
      if (currentFile.indexOf("fonts.css") === -1) {
        currentFile = currentFile.replace('</head>',
          '    <link href="resources/css/fonts.css" type="text/css" rel="stylesheet">\n</head>');
        grunt.file.write(file, currentFile);
        grunt.log.ok(file + ' updated');
      } else {
        grunt.log.error(file + ' already has fonts.css added');
      }
    });
  });

  grunt.registerTask('default', ['staticFilesRun', 'copy']);
};