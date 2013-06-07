var _   = require('underscore'),
  fs  = require("fs");

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['<%= pkg.axure_prototype %>*.html'],
      tasks: ['copy', 'updateFiles'],
      options: {
        nospawn: true,
        event: 'all'
      }
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

  // Empty object to hold the changed files
  var changedFiles = [];

  // We never process these files
  var excludes = [  '../../Documents/Axure/Prototypes/PublicKnowledge/chm_start.html',
                    '../../Documents/Axure/Prototypes/PublicKnowledge/start.html',
                    '../../Documents/Axure/Prototypes/PublicKnowledge/index.html'];

  // Our task for updating the files
  grunt.registerTask('updateFiles', function () {

    // First we exclude the usual suspects
    // This is a fancy way of calling _.without with an Arrray for the excludes
    changedFiles = _.without.apply(_, [changedFiles].concat(excludes));

    // Then ensure we don't have any dupes
    changedFiles = _.uniq(changedFiles);

    // And next iterate over the files to be changed
    _.each(changedFiles, function (file) {
      var toWrite = '';

      // We remove it now because this can get called multiple times and writeFile is async
      // this prevents double updates.
      changedFiles = _.without(changedFiles, file);

      // Read the file in and look for the right spot to insert the css file.
      fs.readFileSync(file).toString().split('\n').forEach(function (line) {
        if (line.indexOf("</head>") !== -1) {
          toWrite += '<link href="resources/css/fonts.css" type="text/css" rel="stylesheet"> \n';
          toWrite += line + '\n';
        } else {
          toWrite += line + '\n';
        }
      });

      // Replace the file with the inserted CSS Line
      fs.writeFile(file, toWrite, function (err) {
        if (err) {
          throw err;
        }

        // Notify the user of success
        grunt.log.write('Axure file successfully updated ' + file + ' ').ok();
      });
    });
  });

  grunt.event.on('watch', function (action, filepath) {
    // When a file changes it, add it to the changedFiles queue.
    changedFiles.push(filepath);
  });
};