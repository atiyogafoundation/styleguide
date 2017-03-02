var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var path = require('path');
var shell = require('gulp-shell');
var config = require('./config.json');
var merge = require('merge-stream');
var concatCss = require('gulp-concat-css');

// Errors handler
var onError = function(err) {
  plugins.notify.onError({
    title:    "Gulp Error",
    message:  "<%= error.message %>",
  })(err);
  this.emit('end');
};

function paths() {
  return config.paths;
}

function connect() {
  browserSync.init({
    proxy: '127.0.0.1:3002',
    snippetOptions: {
      // Ignore all HTML files within the templates folder
      blacklist: ['/index.html', '/', '/?*']
    },
    notify: {
      styles: [
      'display: none',
      'padding: 10px',
      'font-family: sans-serif',
      'position: fixed',
      'font-size: 14px',
      'z-index: 9999',
      'bottom: 0px',
      'right: 0px',
      'border-top-left-radius: 5px',
      'background-color: #1B2032',
      'opacity: 0.4',
      'margin: 0',
      'color: white',
      'text-align: center'
      ]
    }
  });
}

function reload() {
  browserSync.reload();
}

function watch() {

  var buildPaths = [
    path.resolve(paths().source.patterns, '**'),
    path.resolve(paths().source.data, '*.json'),
    path.resolve(paths().source.meta, '*'),
    path.resolve(paths().source.annotations + '/*')
  ];

  gulp.watch(buildPaths).on('change', gulp.series('patternlab:generate', reload));

  gulp.watch(path.resolve(paths().source.css, '**/*.css')).on('change', gulp.series('copy:css-map', 'copy:css'));
  gulp.watch(path.resolve(paths().source.js, '**/*.js')).on('change', gulp.series('copy:js', reload));
  gulp.watch(path.resolve(paths().source.fonts, '*')).on('change', gulp.series('copy:font', reload));
  gulp.watch(path.resolve(paths().source.images, '*')).on('change', gulp.series('copy:img', reload));
  gulp.watch(path.resolve(paths().source.media, '*')).on('change', gulp.series('copy:media', reload));
  gulp.watch(path.resolve(paths().source.ajax, '*')).on('change', gulp.series('copy:ajax', reload));
  gulp.watch(path.resolve(paths().source.styleguide, '**/*.*')).on('change', gulp.series('copy:styleguide', reload));

  gulp.watch(path.resolve(paths().builds.less.watch)).on('change', gulp.series('build:less'));
  gulp.watch(path.resolve(paths().builds.js.src, '*')).on('change', gulp.series('build:js'));

}

gulp.task('build:less', function() {
  return gulp.src(path.resolve(paths().builds.less.src))
    .pipe(plugins.plumber({errorHandler: onError}))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less({
      plugins: [require('less-plugin-glob')],
      compress: true
    }))
    .pipe(plugins.autoprefixer({
      browsers: ['> 1%','Last 2 versions', 'IE 9']
    }))
    .pipe(plugins.rename(function(path) {
      path.extname = ".min.css";
    }))
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(path.resolve(paths().builds.less.dist)))
    .pipe(plugins.notify({ message: 'LESS: style built', onLast: true }));
});

gulp.task('build:js', function () {
  return gulp.src(path.resolve(paths().builds.js.src, '*'))
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.plumber())
    .pipe(plugins.concat('scripts.min.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sourcemaps.write('.'))
    .pipe(gulp.dest(path.resolve(paths().builds.js.dist)))
    .pipe(plugins.notify({ message: 'JS: scripts built', onLast: true }));
});

gulp.task('build:vendors-js', function() {

  var vendorsTop, vendorsBottom;

  if(paths().builds.js.vendors.top) {
    vendorsTop = gulp.src(paths().builds.js.vendors.top)
      .pipe(plugins.plumber())
      .pipe(plugins.concat('vendors-top.min.js'))
      .pipe(plugins.uglify())
      .pipe(gulp.dest('source/js'))
      .pipe(plugins.notify({ message: 'JS: top vendors minified', onLast: true }));
  }

  if(paths().builds.js.vendors.bottom) {
    vendorsBottom = gulp.src(paths().builds.js.vendors.bottom)
      .pipe(plugins.plumber())
      .pipe(plugins.concat('vendors-bottom.min.js'))
      .pipe(plugins.uglify())
      .pipe(gulp.dest('source/js'))
      .pipe(plugins.notify({ message: 'JS: bottom vendors minified', onLast: true }));
  }

  if(paths().builds.js.vendors.top && paths().builds.js.vendors.bottom)
    return merge(vendorsTop, vendorsBottom);

  if(paths().builds.js.vendors.top)
    return vendorsTop;

  if(paths().builds.js.vendors.top)
    return vendorsBottom;

});

gulp.task('build:vendors-css', function() {
  var vendors;

  if (paths().builds.css.vendors) {
    vendors = gulp.src(paths().builds.css.vendors)
      .pipe(concatCss('vendors.min.css', { rebaseUrls: false }))
      .pipe(gulp.dest('source/css'))
      .pipe(plugins.notify({ message: 'CSS: vendors minified', onLast: true }));
  }
});

// CSS Copy
gulp.task('copy:css', function(){
  return gulp.src(path.resolve(paths().source.css, '*.css'))
    .pipe(gulp.dest(path.resolve(paths().public.css)))
    .pipe(browserSync.stream());
});

// CSS Map Copy
gulp.task('copy:css-map', function(){
  return gulp.src(path.resolve(paths().source.css, '*.map'))
    .pipe(gulp.dest(path.resolve(paths().public.css)));
});

// JS copy
gulp.task('copy:js', function(){
  return gulp.src('**/*.js', {cwd: path.resolve(paths().source.js)} )
    .pipe(gulp.dest(path.resolve(paths().public.js)));
});

// Fonts copy
gulp.task('copy:font', function(){
  return gulp.src('*', {cwd: path.resolve(paths().source.fonts)})
    .pipe(gulp.dest(path.resolve(paths().public.fonts)));
});

// Images copy
gulp.task('copy:img', function(){
  return gulp.src('**/*.*',{cwd: path.resolve(paths().source.images)} )
    .pipe(gulp.dest(path.resolve(paths().public.images)));
});

// Media copy
gulp.task('copy:media', function(){
  return gulp.src('**/*.*',{cwd: path.resolve(paths().source.media)} )
    .pipe(gulp.dest(path.resolve(paths().public.media)));
});

// Ajax copy
gulp.task('copy:ajax', function(){
  return gulp.src('**/*',{cwd: path.resolve(paths().source.ajax)} )
    .pipe(gulp.dest(path.resolve(paths().public.ajax)));
});

// Favicon copy
gulp.task('copy:favicon', function(){
  return gulp.src('favicon.ico', {cwd: path.resolve(paths().source.root)} )
    .pipe(gulp.dest(path.resolve(paths().public.root)));
});

// Styleguide Copy
gulp.task('copy:styleguide', function(){
  return gulp.src(path.resolve(paths().source.styleguide, '**'))
    .pipe(gulp.dest(path.resolve(paths().public.root)))
    .pipe(browserSync.stream());
});

gulp.task('patternlab:generate', shell.task('php core/console --generate'));

gulp.task('patternlab:version', shell.task('php core/console --version'));

gulp.task('php:server', shell.task('php -S 127.0.0.1:3002 -t ' + path.resolve(paths().public.root) + ' >& /dev/null'));

gulp.task('connect', function(done) {
  connect();
  done();
});

gulp.task('build', gulp.series('copy:styleguide', 'patternlab:generate', function(done) {
  done();
}));

gulp.task('watch', gulp.series('copy:styleguide', 'patternlab:generate', gulp.parallel('php:server', 'connect', watch), function(done) {
  done();
}));

gulp.task('default', gulp.series('copy:styleguide', 'patternlab:generate', gulp.parallel('php:server', 'connect'), function(done) {
  done();
}));
