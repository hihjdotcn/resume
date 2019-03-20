var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'), // 处理css中浏览器兼容的前缀
    less = require('gulp-less'),                 //less编译
    rename = require('gulp-rename'),             //重命名
    concat = require('gulp-concat'),             //合并文件
    imagemin = require('gulp-imagemin'),         //图片压缩
    connect = require('gulp-connect'),           //浏览器自动刷新
    reload = connect.reload;                     //浏览器自动刷新
    proxy = require('http-proxy-middleware');    //跨域代理

var Config = require('./gulpfile.config.js');
//======= gulp dev 开发环境下 ===============
function dev() {
    /**
     * HTML处理
     */
    gulp.task('html:dev', function () {
        return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist)).pipe(reload());
    });
    /**
     * assets文件夹下的所有文件处理
     */
    gulp.task('assets:dev', function () {
        return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist)).pipe(reload());
    });
    /**
     * CSS样式处理
     */
    gulp.task('css:dev', function () {
        return gulp.src(Config.css.src).pipe(gulp.dest(Config.css.dist)).pipe(reload());
    });
    /**
     * less样式处理
     */
    gulp.task('less:dev', function () {
        return gulp.src(Config.less.src).pipe(less()).pipe(rename({
            suffix: '.min'
        })).pipe(gulp.dest(Config.css.src_min)).pipe(reload());
    });
    /**
     * js处理
     */
    gulp.task('js:dev', function () {
        return gulp.src(Config.js.src).pipe(gulp.dest(Config.js.dist)).pipe(reload());
    });
    /**
     * 图片处理
     */
    gulp.task('images:dev', function () {
        return gulp.src(Config.img.src).pipe(imagemin({
            optimizationLevel: 3
            , progressive: true
            , interlaced: true
        })).pipe(gulp.dest(Config.img.dist)).pipe(reload());
    });

    gulp.task('dev', ['html:dev', 'css:dev', 'less:dev', 'js:dev', 'assets:dev', 'images:dev'], function () {
        connect.server({
            root: ['./'],
            port:8090,
            livereload:true,
            middleware: function(connect, opt) {
                return [
                    proxy('/hb-controller',  {
                        target: 'http://192.168.1.7:8080',
                        changeOrigin:true
                    }),
                    /*proxy('/hb',  {
                        target: 'http://192.168.0.102:8080/hb-controller',
                        changeOrigin:true
                    }),*/
                    proxy('/otherServer', {
                        target: 'http://IP:Port',
                        changeOrigin:true
                    })
                ]
            }
        });
        // Watch .html files
        gulp.watch(Config.html.src, ['html:dev']);
        // Watch .css files
        gulp.watch(Config.css.src, ['css:dev']);
        // Watch .less files
        gulp.watch(Config.less.src, ['less:dev']);
        // Watch assets files
        gulp.watch(Config.assets.src, ['assets:dev']);
        // Watch .js files
        gulp.watch(Config.js.src, ['js:dev']);
        // Watch image files
        gulp.watch(Config.img.src, ['images:dev']);
    });
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;
