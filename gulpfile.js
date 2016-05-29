var gulp = require("gulp"),
    coffee = require("gulp-coffee"),
    gutil = require("gutil");


gulp.task('compileSettings', function(){
    return gulp.src('src/settings/*.coffee')
        .pipe(coffee({bare: true})).on('error', gutil.log)
        .pipe(gulp.dest('dist/chrome/app/'))
});

gulp.task('compileChromeExtension', function() {
   return gulp.src('src/extension/*.coffee')
       .pipe(coffee({bare: true})).on('error', gutil.log)
       .pipe(gulp.dest('dist/chrome/app/'))
});

gulp.task('default', ['compileSettings', 'compileChromeExtension']);