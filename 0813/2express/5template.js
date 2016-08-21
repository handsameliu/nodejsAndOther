var express = require('express');
//var express = require('./express_tmpl');
var path = require('path');
var fs = require('fs');
var app = express();

//设置一个变量保存在app内部，设置模版引擎类型
app.set('view engine','ejs');
//设置模版的存放目录
app.set('views',path.join(__dirname,'views'));//获取到绝对路径
app.use(function(req,res,next){
    res.locals.website = '刘伟';//公用的参数可以是用这个方法，避免过多的重复设置参数
    next();
});
//添加render方法
/*app.use(function(req,res,next){
    /!*
    * 1 把模版从硬盘上读取到，读到内存中，保存为字符串格式
    * 2 把模版里的变量用数据对象里的属性替换掉
    * 3 替换完成后，发给浏览器或客户端
    *
    * *!/
    res.render = function(tmpl,data){
        //定义在中间件离职后，后面所有的路由里都可以使用res.render方法了
        var viewEngine = app.getkey('view engine');//获得模版引擎
        if(viewEngine=='ejs'){//如果是ejs的话就支持
            //如果原来的模版路径有后缀.ejs，则追加一个空字符串，否则加.ejs后缀
            tmpl = tmpl + (tmpl.endsWith('.ejs')?'':'.ejs');
            //等于模版的存放目录绝对路径加上模版文件的相对路径
            var fileName = path.join(app.getkey('views'),tmpl);
            fs.readFile(fileName,'utf8',function(err,content){
                console.log(content);
                content = content.replace(/<%=(\w+)%>/g,function(){
                    var match = arguments[0];//匹配到的字符子串
                    var attr = arguments[1];//第一个分组，起始就是变量名或属性名，
                    return data[attr];//返回数据对象的属性对应的值
                });
                res.end(content);
            });
        }else{
            //return;
            res.end('当前不支持此模版！');
        }
    };
    next();
});*/

app.get('/user',function(req,res){
    //表示数据对象渲染模版
    //第一个参数是模版的相对路径（相对于模版的存放路径）
    //第二个参数是模版的数据来源对象
    /*
    * 如果传了第三个参数，那么render方法不会马上结束并发给客户端
    * 而是把选然后的html字符串发送给回调函数，让回调做出响应
    * */
    res.render('user',{username:'liuwei',age:24},function(err,data){
        res.end(data);
    });
});
/*
* 真正渲染模版的对象并不是第二个参数，而是res.locals
* :name 是路径参数
* */
/*
* 1 转成正则
* 2 记录原始的属性名
* 3 当请求到来的时候给parems赋值
*
*
* */

app.get('/home/:name/:id',function(req,res){
    res.locals.website = '刘伟';
    res.render('home',{username:'<h1>liuwei</h1>',age:24,title:'标题'},function(err,data){
        res.end(data);
    });
});
app.listen(9090);