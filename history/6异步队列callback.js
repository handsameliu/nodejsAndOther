
var gulp = {
    tasks:[],//存放所有任务的数组
    task:function(fn){//定义一个任务
        gulp.tasks.push(fn);
    },
    start:function(){//开始执行所有的任务
        /*gulp.tasks.forEach(function(task){
         task();
         });*/
        var index = 0;
        //没调用一次callback就相当于取出当前函数并执行
        function next(){
            if(index>=gulp.tasks.length){
                return;
            }
            var task = gulp.tasks[index++];//取出当前任务
            var length = task.length;//函数的length是参数的个数？？？
            if(length>0){//如果是异步任务，接收next参数，则执行此函数的时候把next穿进去
                task(next);
            }else{//如果是同步任务，不接受next参数则执行此任务的时候不需要传next进去，执行任务完成后自己手工调用next
                task();
                next();
            }
        }
        next();
    }

};
gulp.task(function(next){
    setTimeout(function(){
        console.log(1);
        next();
    },2000);
});
gulp.task(function(){
    console.log(2);
});
gulp.start();




