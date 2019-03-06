"use strict";

let gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel');

gulp.task('sass', function () {
	return gulp.src('dev/scss/**/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dev/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: "../",
			index: "index.html",
			directory: true
		},
		notify: false
	});
});

gulp.task('scripts', function () {
	return gulp.src(['dev/js/*.js'])
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dev/js'));
});

gulp.task('css-libs', ['sass'], function () {
	return gulp.src('dev/css/main.css')
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dev/css'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function () {
	gulp.watch('dev/scss/**/*.scss', ['sass']);
	gulp.watch('dev/*.html', browserSync.reload);
	gulp.watch('dev/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function () {
	return del.sync('dist');
});

gulp.task('img', function () {
	return gulp.src('dev/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function () {

	let buildCss = gulp.src([
		'dev/css/main.css',
		'dev/css/main.min.css'
	])
		.pipe(gulp.dest('dist/css'));

	let buildFonts = gulp.src('dev/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	let buildJs = gulp.src('dev/js/**/*')
		.pipe(gulp.dest('dist/js'));

	let buildHtml = gulp.src('dev/*.html')
		.pipe(gulp.dest('dist'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
});

gulp.task('default', ['watch']);
