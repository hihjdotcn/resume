var gulp = require('gulp'),
    minifyHtml = require("gulp-minify-html"),    // html压缩
    autoprefixer = require('gulp-autoprefixer'), // 处理css中浏览器兼容的前缀
    rename = require('gulp-rename'),            //重命名
    cleanCss = require("gulp-clean-css"),          // css的层级压缩合并
    less = require('gulp-less'),                //less编译
    uglify = require('gulp-uglify'),            //js压缩
    concat = require('gulp-concat'),            //合并文件
    imagemin = require('gulp-imagemin');        //图片压缩

var Config = require('./gulpfile.config.js');
//======= gulp build 打包资源 ===============
function prod() {
    /**
     * HTML处理
     */
    gulp.task('html', function () {
        return gulp.src(Config.html.src).pipe(minifyHtml()).pipe(gulp.dest(Config.html.dist));
    });
    /**
     * assets文件夹下的所有文件处理
     */
    gulp.task('assets', function () {
        return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist));
    });
    /**
     * CSS样式处理
     */
    gulp.task('css', function () {
        return gulp.src(Config.css.src).pipe(autoprefixer('last 2 version')).pipe(cleanCss()).pipe(gulp.dest(Config.css.dist));
    });
    /**
     * less样式处理
     */
    gulp.task('less', function () {
        return gulp.src(Config.less.src).pipe(autoprefixer('last 2 version')).pipe(less()).pipe(gulp.dest(Config.css.dist)).pipe(rename({
            suffix: '.min'
        })).pipe(cleanCss()).pipe(gulp.dest(Config.css.dist));
    });
    /**
     * js处理
     */
    gulp.task('js', function () {
        return gulp.src(Config.js.src).pipe(gulp.dest(Config.js.dist)).pipe(rename({
            suffix: '.min'
        })).pipe(uglify()).pipe(gulp.dest(Config.js.dist));
    });
    /**
     * 合并所有js文件并做压缩处理
     */
    gulp.task('js-concat', function () {
        return gulp.src(Config.js.src).pipe(concat(Config.js.build_name)).pipe(gulp.dest(Config.js.dist)).pipe(uglify()).pipe(gulp.dest(Config.js.dist));
    });
    /**
     * 图片处理
     */
    gulp.task('images', function () {
        return gulp.src(Config.img.src).pipe(imagemin({
            optimizationLevel: 3
            , progressive: true
            , interlaced: true
        })).pipe(gulp.dest(Config.img.dist));
    });
    gulp.task('build', ['html', 'css', 'less', 'js', 'assets', 'images']);
}
module.exports = prod;