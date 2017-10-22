/**
 * Created by kdebowski on 13.07.17.
 */
var gulp = require("gulp");
var ts = require("gulp-typescript");
var nodemon = require("gulp-nodemon");
var tsProject = ts.createProject("tsconfig.json");
var del = require('del');

gulp.task('clean', function () {
    return del ([
        'dist/**/*'
    ]);
});

gulp.task('build', function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

gulp.task('restart', function() {
    nodemon({
        script: './bin/www',
        ext: 'ts js json',
        verbose: true,
        ignore: ["dist/*"],
        tasks: ['clean', 'build']
    })
});

gulp.task('default', ['restart']);