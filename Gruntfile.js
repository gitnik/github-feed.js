module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            min: {
                files: {
                    "dist/githubFeed.min.js":       ["src/*.js", "src/events/*.js"],
                    "dist/polymer-platform.min.js": ["lib/polymer-platform/platform.js"],
                    "dist/jasmine.min.js":          ["lib/jasmine/lib/jasmine-core/jasmine.js", "lib/jasmine/lib/jasmine-core/jasmine-html.js", "lib/jasmine/lib/jasmine-core/boot.js"]
                }

            }
        },
        cssmin: {
            minify: {
                files: {
                    "dist/jasmine.min.css": ["lib/jasmine/lib/jasmine-core/jasmine.css"]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

// Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin']);
};
