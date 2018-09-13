module.exports = (grunt) => {
  grunt.initConfig({
    jsdoc: {
      dist: {
        src: ['db/*/*.js', 'db/*.js', 'test/*.js', 'libs/*.js'],
        options: {
          destination: 'doc',
          template: 'node_modules/ink-docstrap/template',
          configure: 'node_modules/ink-docstrap/template/jsdoc.conf.json',
        },
      },
    },
  });
  grunt.loadNpmTasks('grunt-jsdoc');
};
