var gulp = require('gulp');
gulp.task('one',function(){
    console.log('1');
});
gulp.task('two',function(){
    console.log('2');
});
gulp.task('default',function(){
    //gulp.watch('./src/index.html',['one','two']);//监听
    gulp.watch('./src/*',function(event){
        //删除或者修改的文件可以被监控，但是无法监听新创建的文件，
        //type 变化的类型 changed  deleted
        //path 修改的文件路径
        //是一个对象的形式展现
        console.log(event);
    });
});
//监控文件的变化





