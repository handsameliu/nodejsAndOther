var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
//启动了一个http静态服务器
//以build目录作为静态的根目录
gulp.task('server',function(){
    $.connect.server({
        root:'./build/html/',//静态文件根目录
        port:8080,//端口号
        livereload:true//实时监控
    });
});
gulp.task('copy-html',function(){
    gulp.src('./src/html/base.html')
        .pipe(gulp.dest('./build/html/'))//拷贝到指定根目录
        .pipe($.connect.reload())
});
gulp.task('watch',function(){
    gulp.watch('./src/html/base.html',['copy-html']);
});
gulp.task('default',['server','watch']);



/*var gulp = require('gulp');//考试题
gulp.task('copy-html',function(){
    gulp.src('./app/!**!/!*.html')
        .pipe(gulp.dest('./dist'))
        .pipe($.connect.reload());
});
gulp.task('copy-js',function(){
    gulp.src(['./app/js/!*.js','!./app/js/test.js'])
        .pipe($.concat('all.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe($.connect.reload());
});
gulp.task('copy-css',function(){
    gulp.src('./app/less/!*.less')
        .pipe($.less())
        .pipe($.concat('all.css'))
        .pipe($.uglify())
        .pipe(gulp.dest('./dist/css'))
        .pipe($.connect.reload());
});
gulp.task('copy-img',function(){
    gulp.src('./app/imgs/!*.{jpg,png}')
        .pipe($.imagemin())
        .pipe(gulp.dest('./dist/imgs'))
        .pipe($.connect.reload());
});
gulp.task('server',function(){
    $.connect.server({
        root:'./dist/',//静态文件根目录
        port:8080,//端口号
        livereload:true//实时监控
    });
});
gulp.task('watch',function(){
    gulp.watch('./dist',['copy-html','copy-js','copy-css','copy-img']);
});
gulp.task('default',['server','watch']);*/

