const gulp = require('gulp');
const babelify = require('babelify');
const watchify = require('watchify');
const fs = require('fs');
const browserify = require('browserify');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

function swallowError(error) {
  console.log(error.stack) // eslint-disable-line
  this.emit('end');
}

function build() {
  return browserify('./app/react/browser/main.js')
    .transform(babelify.configure({
      presets: ['react', 'es2015']
    }))
    .bundle()
    .on('error', swallowError)
    .pipe(fs.createWriteStream('./app/assets/javascripts/react.js'));
}

function watch() {
  const b = browserify({
    entries: ['./app/react/browser/main.js'],
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    debug: process.env.DEBUG,
    plugin: [watchify]
  });
  b.transform(babelify.configure({
    presets: ['react', 'es2015', 'stage-1', 'stage-2']
  }));

  function rebuild() {
    const startedAt = new Date
    console.log('Build started at ' + startedAt) //eslint-disable-line
    b.bundle()
      .on('error', swallowError)
      .pipe(fs.createWriteStream('./app/assets/javascripts/react.js'))
      .on('finish', () => console.log('Finished in ' + (new Date().getTime() - startedAt.getTime()) + 'ms')) //eslint-disable-line
  }

  b.on('error', swallowError);
  b.on('update', rebuild);
  b.bundle().pipe(fs.createWriteStream('./app/assets/javascripts/react.js'));

  return rebuild();
}

gulp.task('build', function() {
  console.log('Building ES6') // eslint-disable-line
  build();
});

gulp.task('default', ['watch']);

gulp.task('watch', function() {
  return watch();
});
