module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            min: {
                files: [
                    {
                        src:  ["src/*.js", "src/events/*.js"],
                        dest: "dist/githubFeed.min.js"
                    }
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
};
