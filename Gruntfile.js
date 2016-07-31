module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [["babelify", {"presets": ["es2015"] }]]
        },
        files: {
          "./client/dist/bundle.js":["./client/src/app.js"]
        }
      }
    },
    watch: {
      scripts: {
        files: ["./client/src/*.js"],
        tasks: ["browserify"]
      }
    }
  });
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("build", ["browserify"]);
};
