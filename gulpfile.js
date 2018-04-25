const del = require('del');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const cleanCss = require('gulp-clean-css');
const runsequence= require('run-sequence');
const npmFiles = require('gulp-npm-files');

function isFixed(file){
    return file.eslint != null && file.eslint.fixed;
}

gulp.task('clean-build', () =>
    del('./build/*', {force: true})
);

gulp.task('npm-dependencies', () =>
    gulp.src(npmFiles(), {base: '.'})
    .pipe(gulp.dest('./build/'))
);

gulp.task('compress-js',() =>
    gulp.src('./components/**/*.js', {base: '.'})
    .pipe(babel({presets: ['env']}))
    .pipe(uglify())
    .pipe(gulp.dest('./build/'))
);

gulp.task('compress-css', () =>
    gulp.src('./components/**/*.css', {base: '.'})
    .pipe(cleanCss())
    .pipe(gulp.dest('./build/'))
);

gulp.task('lint-js', () =>
    gulp.src(['./components/**/*.js'], {base: '.'})
        .pipe(eslint({ fix: true}))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest('.')))
        .pipe(eslint.failAfterError())
);

gulp.task('compress-html', () => 
    gulp.src(['index.html','./components/**/*.html'], {base: '.'})
    .pipe(htmlmin({collapseWhitespace: true, minifyCSS: true}))
    .pipe(gulp.dest('./build/'))
);

gulp.task('default', () =>
    runsequence(
        'clean-build',
        'npm-dependencies',
        'lint-js',
        'compress-js',
        'compress-css',
        'compress-html'
    )
);

gulp.task('watch-js', () =>
    gulp.watch('./components/**/*.js', ['lint-js'])
);