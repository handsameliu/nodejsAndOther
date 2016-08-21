var gulp = require('gulp');
var util = require('util');
//把src下面的所有的文件都拷贝到build目录下
gulp.task('default',function(){
    //生成的目录=dest目录+通配符开始匹配的目录
    //base是指定基准目录
    //如果指定了base，那么生成的目录=dest目录+（源文件的完成目录-base路径）
     gulp.src(['./src/javascript/!*.js','./src/html/!*.html'],{base:'./src'})
        .pipe(gulp.dest('./build'));
});
gulp.task('copy-imgs',function(){
    gulp.src('./src/image/*.{jpg,png}').pipe(gulp.dest('./build'));
    //gulp.src('./src/image/*.@(jpg|png)').pipe(gulp.dest('./build'));
});





