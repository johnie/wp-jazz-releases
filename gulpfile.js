var gulp = require('gulp');
var jpegoptim = require('imagemin-jpegoptim');

gulp.task('default', function () {
    return gulp.src('./images/*.jpg')
        .pipe(jpegoptim({
        	progressive: true,
        	max: 50,
        })())
        .pipe(gulp.dest('./images'));
});