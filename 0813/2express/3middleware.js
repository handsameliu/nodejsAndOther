var express = require('./express_middleware');
//得到app监听函数
var app = express();
/*
* 1 路由数据中还是一个数组，里面有路由，还有中间件
*
*
*
* */



/*
* 1 昨天加班了，要报销昨晚的餐费，
*   发出/money的请求报销10000元
* 2 在整个处理过程中，请求和响应使用的是同一个对象
* 3 上一个中间件的结果可以传递给下一个中间件或路由
* 4 中间件可以通过是否调用next函数来决定是否将此请求继续向下传递
* 5 中间件的路径是以他的开头就可以，路由需要完全匹配
*
* 中间件过滤：
*   1 公用的处理或添加公共的方法
*   2 实现流程控制，可以决定请求是否可以继续
*
* */
//如果不穿路径，表示对所有的路径执行此中间件函数
app.use(function(req,res,next){
    res.setHeader('content-type','text/plain;charset=utf8');
    res.startDate = Date.now();
    //先把原来的end函数暂存以下
    var end = res.end;
    //重写end属性，用新的函数替代掉
    //因为end是在res原型上的方法，所以这时给res增加私有的方法
    res.end = function(msg){
        end.call(res,msg);
        console.log(Date.now()-res.startDate+'ms');
    };
    next();
});
//使用中间件 请求 响应 next函数


//部门经理审批
app.use('/money',function(req,res,next){
    res.money = 10000;
    console.log('部门经理',res.money);
    next();
});
//部门总监审批
app.use('/money',function(req,res,next){
    res.money = 100;
    console.log('部门总监',res.money);
    next();
});
//cto审批
app.use('/money',function(req,res,next){
    res.money = parseFloat(res.money)*parseFloat(1.2);
    console.log('cto',res.money);
    next();
});
//自己手里实现报销功能
app.get('/money',function(req,res){
    res.end('$'+res.money);
    console.log('自己',res.money);
});
app.all('/buy',function(req,res){
    res.setHeader('content-type','text/plain;charset=utf8');
    console.log('买');
    res.end('买'+req.money);
});

app.listen(9090);

