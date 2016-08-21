var gulp = require('gulp');
var util = require('util');
//如果运行gulp的时候没有指定任务名，则自动执行default任务
/*
* gulp.src 可以接收文件迷宫，返回一个可读流
* 可读流里放的是一个个FILE对象
* 这个对象中有此文件对象的路径，文件名，文件的内容
*
* */
gulp.task('default',function(){
    //返回一个可读流
    var rs = gulp.src('./package.json');
    rs.on('data',function(data){
        console.log(Object.keys(data));
        for(var attr in data){
            console.log(attr,data[attr]);
        }
    });
});



