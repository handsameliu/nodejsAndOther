
/***
 * 什么时候全局安装？
 *  当我需要在cmd中运行这个命令的时候需要全局安装
 *  1.因为全局安装会把这个模块装到全局目录下面
 *  2.因为这个全局被配置到环境变量中的path中了
 *  3.在命令行中执行命令的时候，回去path中指定的目录中找这个可执行文件，安装了就能找到，不安装就找不到
 *  4.在领命行中执行此命令的时候，找到命令就执行，找不到就报错
 *  5.全局安装后在整个电脑下都可以执行此命令
 * 什么时候本地安装？
 *  1.如果你需要在你的项目中使用此模块的话，需要本地安装
 * @type {Gulp|exports|module.exports}
 */
//写gulp就是用node.js编写gulpfile文件
var gulp = require('gulp');
//使用task方法可以定义一个任务，第一个参数是任务名称，可以随便起；第二个参数是任务的定义，是一个匿名函数
gulp.task('hello',function(){
    console.log('hello');
});
gulp.task('world',function(){
    console.log('world');
});
/*
 * 1 执行gulp任务的时候，默认会在当前目录下找gulpfile.js文件
 * 2 --gulpfile手动指定一个gulpfile文件
 *   ->gulp hello --gulpfile ./history
 * 3 --cwd可以指定当前工作目录，gulp会在此目录下寻找gulpfile.js文件
 *   ->gulp help --cwd ./history
 * 4 -t或--tasks，会显示所指定 gulpfile 的 task 依赖树
 *   ->gulp -t
 * 5 --silent 禁止所有的gulp日志
 *   ->gulp --silent
 *
 * */


