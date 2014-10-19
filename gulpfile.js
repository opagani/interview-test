var gulp = require('gulp'),
    concat = require('gulp-concat'),
    html2js = require('gulp-html2js'),
    del = require('del'),
    karma = require('gulp-karma'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

var paths = {
  appScripts: ['client/src/**/*.js'],
  vendorScripts: [
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/angular-ui-utils/ui-utils.js',
    'bower_components/angular-ui-bootstrap-bower/ui-bootstrap.js',
    'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
    'bower_components/underscore/underscore.js'
  ],
  css: [
    'bower_components/bootstrap/dist/css/bootstrap.css',
    'public/stylesheets/style.css'
  ],
  testPaths: [
    'public/build/vendor.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'public/build/app.js',
    'client/test/unit/**/*.js'
  ],
  templatePaths: [
    'client/src/partials/**/*.html'
  ]
};

gulp.task('test', function() {
  gulp.src(paths.testPaths)
    .pipe(karma({
      configFile: 'client/test/conf/karma.conf.js',
      action:'run'
    }))
    .on('error', function(err){
      console.log(err);
    })

    // Triggers a live reload to show changes immediately
    .pipe(livereload());

})

gulp.task('server', function() {
   nodemon({ script: 'app.js' })
    .on('restart', function () {
      console.log('restarted!')
    })
})

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('templates', ['clean'], function() {
  gulp.src(paths.templatePaths)
    .pipe(html2js({
      outputModuleName:'opentable-templates',
      base:"client/src"
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('public/build'))

    // Triggers a live reload to show changes immediately
    .pipe(livereload());
})

var createConcatTask = function(name, pathsGlob, concatName ) {
  gulp.task(name, ['clean'], function() {
    return gulp.src(pathsGlob)
      .pipe(concat(concatName))
      .pipe(gulp.dest('public/build'));
  });

  gulp.watch(pathsGlob, [name]);

}

// Watches front-end files for changes and reruns tasks as needed
gulp.task('watch', [ 'server' ], function(){
    livereload.listen();


    gulp.watch(paths.testPaths, ['test']);
    gulp.watch(paths.templatePaths, ['templates']);
});

createConcatTask('appScripts', paths.appScripts, 'app.js');
createConcatTask('vendorScripts', paths.vendorScripts, 'vendor.js');
createConcatTask('css', paths.css, 'app.css');


// The default task (called when you run `gulp` from cli)
gulp.task('build', ['appScripts','vendorScripts' , 'css', 'templates'])
gulp.task('default', ['build', 'test', 'server', 'watch']);
