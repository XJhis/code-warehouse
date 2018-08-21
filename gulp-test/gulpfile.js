var gulp = require('gulp'),
    replace = require('gulp-replace'),
    useref = require('gulp-useref');

// gulp.task('temp', function(){
//   gulp.src(['file.txt'])
//     .pipe(replace('foo', 'hehe'))
//     .pipe(gulp.dest('build/'));
// });

// gulp.task('temp', function() {
//     gulp.src(['file.txt'])
//         .pipe(replace(/foo(.{3})/g, function(match, p1, offset, string) {
//             // Replace foobaz with barbaz and log a ton of information
//             // See http://mdn.io/string.replace#Specifying_a_function_as_a_parameter
//             console.log('Found ' + match + ' with param ' + p1 + ' at ' + offset + ' inside of ' + string);
//             return 'bar' + p1;
//         }))
//         .pipe(gulp.dest('build/'));
// });    
 
// gulp.task('test', function () {
//     return gulp.src('src/*.html')
//         .pipe(useref())
//         .pipe(gulp.dest('dist'));
// });

var gulp = require('gulp'),
    useref = require('gulp-useref');
 
gulp.task('test', function () {
    return gulp.src('src/*.html')
        .pipe(useref({ searchPath: '.tmp' }))
        .pipe(gulp.dest('dist'));
});