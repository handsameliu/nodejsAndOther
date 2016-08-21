var gulp = require('gulp');
//var less = require('gulp-less');//插件众多的情况下无法一直这样引用，会带来大量的冗余
var $ = require('gulp-load-plugins')();//自动加载所有插件，使用时点出即可
//var $ = require('./gulp-load-plugins')();//模拟系统插件写出的方法
/***
 * 1 安装相对应的插件
 * 2 引入此插件
 * 3 使用此插件
 *
 */
gulp.task('less',function(){
    //通过src获取到所有的less文件
    gulp.src('./src/less/**/*.less')
        .pipe($.less())//交由less插件进行编译处理
        .pipe(gulp.dest('build/css'));//最后输出到css目录中
});
//相当于实现命令行编译，结果是一样的。 命令行中输入：lessc index.less
