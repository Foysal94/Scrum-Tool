/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function (grunt) ***REMOVED***
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) ***REMOVED***
    return string.replace(/[-\\^$*+?.()|[\]***REMOVED******REMOVED***]/g, '\\$&');
  ***REMOVED***;

  var fs = require('fs');
  var path = require('path');
  var npmShrinkwrap = require('npm-shrinkwrap');
  var generateGlyphiconsData = require('./grunt/bs-glyphicons-data-generator.js');
  var BsLessdocParser = require('./grunt/bs-lessdoc-parser.js');
  var getLessVarsData = function () ***REMOVED***
    var filePath = path.join(__dirname, 'less/variables.less');
    var fileContent = fs.readFileSync(filePath, ***REMOVED*** encoding: 'utf8' ***REMOVED***);
    var parser = new BsLessdocParser(fileContent);
    return ***REMOVED*** sections: parser.parseFile() ***REMOVED***;
  ***REMOVED***;
  var generateRawFiles = require('./grunt/bs-raw-files-generator.js');
  var generateCommonJSModule = require('./grunt/bs-commonjs-generator.js');
  var configBridge = grunt.file.readJSON('./grunt/configBridge.json', ***REMOVED*** encoding: 'utf8' ***REMOVED***);

  Object.keys(configBridge.paths).forEach(function (key) ***REMOVED***
    configBridge.paths[key].forEach(function (val, i, arr) ***REMOVED***
      arr[i] = path.join('./docs/assets', val);
***REMOVED***);
  ***REMOVED***);

  // Project configuration.
  grunt.initConfig(***REMOVED***

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %> license\n' +
            ' */\n',
    jqueryCheck: configBridge.config.jqueryCheck.join('\n'),
    jqueryVersionCheck: configBridge.config.jqueryVersionCheck.join('\n'),

    // Task configuration.
    clean: ***REMOVED***
      dist: 'dist',
      docs: 'docs/dist'
***REMOVED***,

    jshint: ***REMOVED***
      options: ***REMOVED***
        jshintrc: 'js/.jshintrc'
  ***REMOVED***,
      grunt: ***REMOVED***
        options: ***REMOVED***
          jshintrc: 'grunt/.jshintrc'
***REMOVED***,
        src: ['Gruntfile.js', 'package.js', 'grunt/*.js']
  ***REMOVED***,
      core: ***REMOVED***
        src: 'js/*.js'
  ***REMOVED***,
      test: ***REMOVED***
        options: ***REMOVED***
          jshintrc: 'js/tests/unit/.jshintrc'
***REMOVED***,
        src: 'js/tests/unit/*.js'
  ***REMOVED***,
      assets: ***REMOVED***
        src: ['docs/assets/js/src/*.js', 'docs/assets/js/*.js', '!docs/assets/js/*.min.js']
  ***REMOVED***
***REMOVED***,

    jscs: ***REMOVED***
      options: ***REMOVED***
        config: 'js/.jscsrc'
  ***REMOVED***,
      grunt: ***REMOVED***
        src: '<%= jshint.grunt.src %>'
  ***REMOVED***,
      core: ***REMOVED***
        src: '<%= jshint.core.src %>'
  ***REMOVED***,
      test: ***REMOVED***
        src: '<%= jshint.test.src %>'
  ***REMOVED***,
      assets: ***REMOVED***
        options: ***REMOVED***
          requireCamelCaseOrUpperCaseIdentifiers: null
***REMOVED***,
        src: '<%= jshint.assets.src %>'
  ***REMOVED***
***REMOVED***,

    concat: ***REMOVED***
      options: ***REMOVED***
        banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>',
        stripBanners: false
  ***REMOVED***,
      bootstrap: ***REMOVED***
        src: [
          'js/transition.js',
          'js/alert.js',
          'js/button.js',
          'js/carousel.js',
          'js/collapse.js',
          'js/dropdown.js',
          'js/modal.js',
          'js/tooltip.js',
          'js/popover.js',
          'js/scrollspy.js',
          'js/tab.js',
          'js/affix.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
  ***REMOVED***
***REMOVED***,

    uglify: ***REMOVED***
      options: ***REMOVED***
        compress: ***REMOVED***
          warnings: false
***REMOVED***,
        mangle: true,
        preserveComments: 'some'
  ***REMOVED***,
      core: ***REMOVED***
        src: '<%= concat.bootstrap.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
  ***REMOVED***,
      customize: ***REMOVED***
        src: configBridge.paths.customizerJs,
        dest: 'docs/assets/js/customize.min.js'
  ***REMOVED***,
      docsJs: ***REMOVED***
        src: configBridge.paths.docsJs,
        dest: 'docs/assets/js/docs.min.js'
  ***REMOVED***
***REMOVED***,

    qunit: ***REMOVED***
      options: ***REMOVED***
        inject: 'js/tests/unit/phantom.js'
  ***REMOVED***,
      files: 'js/tests/index.html'
***REMOVED***,

    less: ***REMOVED***
      compileCore: ***REMOVED***
        options: ***REMOVED***
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
***REMOVED***,
        src: 'less/bootstrap.less',
        dest: 'dist/css/<%= pkg.name %>.css'
  ***REMOVED***,
      compileTheme: ***REMOVED***
        options: ***REMOVED***
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>-theme.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>-theme.css.map'
***REMOVED***,
        src: 'less/theme.less',
        dest: 'dist/css/<%= pkg.name %>-theme.css'
  ***REMOVED***
***REMOVED***,

    autoprefixer: ***REMOVED***
      options: ***REMOVED***
        browsers: configBridge.config.autoprefixerBrowsers
  ***REMOVED***,
      core: ***REMOVED***
        options: ***REMOVED***
          map: true
***REMOVED***,
        src: 'dist/css/<%= pkg.name %>.css'
  ***REMOVED***,
      theme: ***REMOVED***
        options: ***REMOVED***
          map: true
***REMOVED***,
        src: 'dist/css/<%= pkg.name %>-theme.css'
  ***REMOVED***,
      docs: ***REMOVED***
        src: ['docs/assets/css/src/docs.css']
  ***REMOVED***,
      examples: ***REMOVED***
        expand: true,
        cwd: 'docs/examples/',
        src: ['**/*.css'],
        dest: 'docs/examples/'
  ***REMOVED***
***REMOVED***,

    csslint: ***REMOVED***
      options: ***REMOVED***
        csslintrc: 'less/.csslintrc'
  ***REMOVED***,
      dist: [
        'dist/css/bootstrap.css',
        'dist/css/bootstrap-theme.css'
      ],
      examples: [
        'docs/examples/**/*.css'
      ],
      docs: ***REMOVED***
        options: ***REMOVED***
          ids: false,
          'overqualified-elements': false
***REMOVED***,
        src: 'docs/assets/css/src/docs.css'
  ***REMOVED***
***REMOVED***,

    cssmin: ***REMOVED***
      options: ***REMOVED***
        // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
        //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
        compatibility: 'ie8',
        keepSpecialComments: '*',
        advanced: false
  ***REMOVED***,
      minifyCore: ***REMOVED***
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
  ***REMOVED***,
      minifyTheme: ***REMOVED***
        src: 'dist/css/<%= pkg.name %>-theme.css',
        dest: 'dist/css/<%= pkg.name %>-theme.min.css'
  ***REMOVED***,
      docs: ***REMOVED***
        src: [
          'docs/assets/css/src/pygments-manni.css',
          'docs/assets/css/src/docs.css'
        ],
        dest: 'docs/assets/css/docs.min.css'
  ***REMOVED***
***REMOVED***,

    csscomb: ***REMOVED***
      options: ***REMOVED***
        config: 'less/.csscomb.json'
  ***REMOVED***,
      dist: ***REMOVED***
        expand: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
  ***REMOVED***,
      examples: ***REMOVED***
        expand: true,
        cwd: 'docs/examples/',
        src: '**/*.css',
        dest: 'docs/examples/'
  ***REMOVED***,
      docs: ***REMOVED***
        src: 'docs/assets/css/src/docs.css',
        dest: 'docs/assets/css/src/docs.css'
  ***REMOVED***
***REMOVED***,

    copy: ***REMOVED***
      fonts: ***REMOVED***
        expand: true,
        src: 'fonts/*',
        dest: 'dist/'
  ***REMOVED***,
      docs: ***REMOVED***
        expand: true,
        cwd: 'dist/',
        src: [
          '**/*'
        ],
        dest: 'docs/dist/'
  ***REMOVED***
***REMOVED***,

    connect: ***REMOVED***
      server: ***REMOVED***
        options: ***REMOVED***
          port: 3000,
          base: '.'
***REMOVED***
  ***REMOVED***
***REMOVED***,

    jekyll: ***REMOVED***
      options: ***REMOVED***
        config: '_config.yml'
  ***REMOVED***,
      docs: ***REMOVED******REMOVED***,
      github: ***REMOVED***
        options: ***REMOVED***
          raw: 'github: true'
***REMOVED***
  ***REMOVED***
***REMOVED***,

    htmlmin: ***REMOVED***
      dist: ***REMOVED***
        options: ***REMOVED***
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true,
          removeComments: true
***REMOVED***,
        expand: true,
        cwd: '_gh_pages',
        dest: '_gh_pages',
        src: [
          '**/*.html',
          '!examples/**/*.html'
        ]
  ***REMOVED***
***REMOVED***,

    jade: ***REMOVED***
      options: ***REMOVED***
        pretty: true,
        data: getLessVarsData
  ***REMOVED***,
      customizerVars: ***REMOVED***
        src: 'docs/_jade/customizer-variables.jade',
        dest: 'docs/_includes/customizer-variables.html'
  ***REMOVED***,
      customizerNav: ***REMOVED***
        src: 'docs/_jade/customizer-nav.jade',
        dest: 'docs/_includes/nav/customize.html'
  ***REMOVED***
***REMOVED***,

    htmllint: ***REMOVED***
      options: ***REMOVED***
        ignore: [
          'Attribute "autocomplete" not allowed on element "button" at this point.',
          'Attribute "autocomplete" not allowed on element "input" at this point.',
          'Element "img" is missing required attribute "src".'
        ]
  ***REMOVED***,
      src: '_gh_pages/**/*.html'
***REMOVED***,

    watch: ***REMOVED***
      src: ***REMOVED***
        files: '<%= jshint.core.src %>',
        tasks: ['jshint:core', 'qunit', 'concat']
  ***REMOVED***,
      test: ***REMOVED***
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
  ***REMOVED***,
      less: ***REMOVED***
        files: 'less/**/*.less',
        tasks: 'less'
  ***REMOVED***
***REMOVED***,

    sed: ***REMOVED***
      versionNumber: ***REMOVED***
        pattern: (function () ***REMOVED***
          var old = grunt.option('oldver');
          return old ? RegExp.quote(old) : old;
***REMOVED***)(),
        replacement: grunt.option('newver'),
        exclude: [
          'dist/fonts',
          'docs/assets',
          'fonts',
          'js/tests/vendor',
          'node_modules',
          'test-infra'
        ],
        recursive: true
  ***REMOVED***
***REMOVED***,

    'saucelabs-qunit': ***REMOVED***
      all: ***REMOVED***
        options: ***REMOVED***
          build: process.env.TRAVIS_JOB_ID,
          throttled: 10,
          maxRetries: 3,
          maxPollRetries: 4,
          urls: ['http://127.0.0.1:3000/js/tests/index.html?hidepassed'],
          browsers: grunt.file.readYAML('grunt/sauce_browsers.yml')
***REMOVED***
  ***REMOVED***
***REMOVED***,

    exec: ***REMOVED***
      npmUpdate: ***REMOVED***
        command: 'npm update'
  ***REMOVED***
***REMOVED***,

    compress: ***REMOVED***
      main: ***REMOVED***
        options: ***REMOVED***
          archive: 'bootstrap-<%= pkg.version %>-dist.zip',
          mode: 'zip',
          level: 9,
          pretty: true
***REMOVED***,
        files: [
  ***REMOVED***
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: 'bootstrap-<%= pkg.version %>-dist'
  ***REMOVED***
        ]
  ***REMOVED***
***REMOVED***

  ***REMOVED***);


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, ***REMOVED*** scope: 'devDependencies' ***REMOVED***);
  require('time-grunt')(grunt);

  // Docs HTML validation task
  grunt.registerTask('validate-html', ['jekyll:docs', 'htmllint']);

  var runSubset = function (subset) ***REMOVED***
    return !process.env.TWBS_TEST || process.env.TWBS_TEST === subset;
  ***REMOVED***;
  var isUndefOrNonZero = function (val) ***REMOVED***
    return val === undefined || val !== '0';
  ***REMOVED***;

  // Test task.
  var testSubtasks = [];
  // Skip core tests if running a different subset of the test suite
  if (runSubset('core') &&
      // Skip core tests if this is a Savage build
      process.env.TRAVIS_REPO_SLUG !== 'twbs-savage/bootstrap') ***REMOVED***
    testSubtasks = testSubtasks.concat(['dist-css', 'dist-js', 'csslint:dist', 'test-js', 'docs']);
  ***REMOVED***
  // Skip HTML validation if running a different subset of the test suite
  if (runSubset('validate-html') &&
      // Skip HTML5 validator on Travis when [skip validator] is in the commit message
      isUndefOrNonZero(process.env.TWBS_DO_VALIDATOR)) ***REMOVED***
    testSubtasks.push('validate-html');
  ***REMOVED***
  // Only run Sauce Labs tests if there's a Sauce access key
  if (typeof process.env.SAUCE_ACCESS_KEY !== 'undefined' &&
      // Skip Sauce if running a different subset of the test suite
      runSubset('sauce-js-unit') &&
      // Skip Sauce on Travis when [skip sauce] is in the commit message
      isUndefOrNonZero(process.env.TWBS_DO_SAUCE)) ***REMOVED***
    testSubtasks.push('connect');
    testSubtasks.push('saucelabs-qunit');
  ***REMOVED***
  grunt.registerTask('test', testSubtasks);
  grunt.registerTask('test-js', ['jshint:core', 'jshint:test', 'jshint:grunt', 'jscs:core', 'jscs:test', 'jscs:grunt', 'qunit']);

  // JS distribution task.
  grunt.registerTask('dist-js', ['concat', 'uglify:core', 'commonjs']);

  // CSS distribution task.
  grunt.registerTask('less-compile', ['less:compileCore', 'less:compileTheme']);
  grunt.registerTask('dist-css', ['less-compile', 'autoprefixer:core', 'autoprefixer:theme', 'csscomb:dist', 'cssmin:minifyCore', 'cssmin:minifyTheme']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean:dist', 'dist-css', 'copy:fonts', 'dist-js']);

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'copy:fonts', 'test']);

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', 'sed');

  grunt.registerTask('build-glyphicons-data', function () ***REMOVED*** generateGlyphiconsData.call(this, grunt); ***REMOVED***);

  // task for building customizer
  grunt.registerTask('build-customizer', ['build-customizer-html', 'build-raw-files']);
  grunt.registerTask('build-customizer-html', 'jade');
  grunt.registerTask('build-raw-files', 'Add scripts/less files to customizer.', function () ***REMOVED***
    var banner = grunt.template.process('<%= banner %>');
    generateRawFiles(grunt, banner);
  ***REMOVED***);

  grunt.registerTask('commonjs', 'Generate CommonJS entrypoint module in dist dir.', function () ***REMOVED***
    var srcFiles = grunt.config.get('concat.bootstrap.src');
    var destFilepath = 'dist/js/npm.js';
    generateCommonJSModule(grunt, srcFiles, destFilepath);
  ***REMOVED***);

  // Docs task.
  grunt.registerTask('docs-css', ['autoprefixer:docs', 'autoprefixer:examples', 'csscomb:docs', 'csscomb:examples', 'cssmin:docs']);
  grunt.registerTask('lint-docs-css', ['csslint:docs', 'csslint:examples']);
  grunt.registerTask('docs-js', ['uglify:docsJs', 'uglify:customize']);
  grunt.registerTask('lint-docs-js', ['jshint:assets', 'jscs:assets']);
  grunt.registerTask('docs', ['docs-css', 'lint-docs-css', 'docs-js', 'lint-docs-js', 'clean:docs', 'copy:docs', 'build-glyphicons-data', 'build-customizer']);

  grunt.registerTask('prep-release', ['dist', 'docs', 'jekyll:github', 'htmlmin', 'compress']);

  // Task for updating the cached npm packages used by the Travis build (which are controlled by test-infra/npm-shrinkwrap.json).
  // This task should be run and the updated file should be committed whenever Bootstrap's dependencies change.
  grunt.registerTask('update-shrinkwrap', ['exec:npmUpdate', '_update-shrinkwrap']);
  grunt.registerTask('_update-shrinkwrap', function () ***REMOVED***
    var done = this.async();
    npmShrinkwrap(***REMOVED*** dev: true, dirname: __dirname ***REMOVED***, function (err) ***REMOVED***
      if (err) ***REMOVED***
        grunt.fail.warn(err);
  ***REMOVED***
      var dest = 'test-infra/npm-shrinkwrap.json';
      fs.renameSync('npm-shrinkwrap.json', dest);
      grunt.log.writeln('File ' + dest.cyan + ' updated.');
      done();
***REMOVED***);
  ***REMOVED***);
***REMOVED***;
