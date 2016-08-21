var gulp = require('gulp');
var util = require('util');
//定义一个复制文件的任务
//把src-indexx.html拷贝
gulp.task('default',function(){
    //src获取指定文件的可读流
    // * 能匹配任意祖父，除了路径分隔符
    //** 如果不是单独出现就不能匹配路径分隔符
    //如果单独的出现才鞥匹配路径分割符

    //dest的参数是一个目录名，而不是一个文件名
     gulp.src('./src/**/*.less')
         //dest的参数是一个目录名，而不是一个i额文件名
        .pipe(
            gulp.dest('./build')
         ); //通过管道的方式注入到可写流
    //最后生成目录-dest的参考目录，+源文件中通配符开始匹配的内容
});



