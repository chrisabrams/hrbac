var execSync               = require('child_process').execSync,
    eslint                 = require('gulp-eslint'),
    gulp                   = require('gulp'),
    mocha                  = require('gulp-mocha'),
    path                   = require('path'),
    spawn                  = require('child_process').spawn

gulp.task('lint', function () {

    return gulp.src([
      'src/**/*.js',
      'test/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())

})

gulp.task('mocha', function(done) {

  gulp
    .src([
      './test/setup.js',
      './test/unit/**.js',
    ], {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .on('end', async function () {

      process.exit()

    })
    .on('error', async function (e) {
      console.error(e)
    })

})

gulp.task('test', ['mocha'])

gulp.task('t', ['test'])
