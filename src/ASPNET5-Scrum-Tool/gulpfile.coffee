﻿

gulp = require 'gulp'


cssmin = require 'gulp-cssmin'
jsmin = require 'gulp-uglify'

rimraf = require 'rimraf'
concat = require 'gulp-concat'
cssmin = require 'gulp-cssmin'
uglify = require 'gulp-uglify'
project = require './project.json'


sass = require 'gulp-sass'
coffee = require 'gulp-coffee'
gutil = require 'gulp-util' 
rename = require 'gulp-rename'
less_to_scss = require 'gulp-less-to-scss'

paths = 
  webroot: "./wwwroot/"
  js: './wwwroot/js/**/*.js'
  minJs: './wwwroot/js/**/*.min.js'
  css: './wwwroot/css/**/*.css'
  minCss: 'css/**/*.min.css'
  scss: './assets/scss/**/*.scss'
  coffee: './assets/coffee/**/*.coffee'
  
  
gulp.task 'sass-css', ->
    return gulp.src [paths.scss, '!' + './assets/scss/**/_*.scss']
           .pipe sass()
           .pipe gulp.dest paths.webroot + 'css/'


gulp.task 'coffee-js', ->
    return gulp.src paths.coffee
          .pipe(coffee(***REMOVED***bare: true***REMOVED***).on 'error', (gutil) -> gutil.log )
           .pipe gulp.dest paths.webroot + 'js/'
           
    
 gulp.task 'min:css', ['sass-css'], ->
   return gulp.src [paths.css, '!' + paths.webroot + 'css/**/*.min.css']
          .pipe cssmin()
          .pipe rename ***REMOVED***suffix: '.min'***REMOVED***
          .pipe gulp.dest paths.webroot + 'css/'
          
 gulp.task 'min:js', ['coffee-js'], ->
    return gulp.src [paths.js, '!' + paths.webroot + 'js/**/*.min.js']
           .pipe jsmin()
           .pipe rename ***REMOVED***suffix: '.min'***REMOVED***
           .pipe gulp.dest paths.webroot + 'js/'
 
 gulp.task 'watch', ['min:css', 'min:js'], ->
    gulp.watch paths.scss, ['min:css']
    gulp.watch paths.coffee, ['min:js']
    
 gulp.task 'less-scss', ->
    return gulp.src './**/*.less'
           .pipe less_to_scss()
           .pipe gulp.dest './'
