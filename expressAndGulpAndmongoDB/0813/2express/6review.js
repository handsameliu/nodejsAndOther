var express = require('express');
var path = require('path');
//app起始就是监听函数
var app = express();
//设置模版引擎为html
app.set('view engine','html');
//存放模版的目录，是一个绝对路径
app.set('views',path.join(__dirname,'views'));
//设置正对html后缀的渲染方法
app.engine('html',require('ejs').__express);

app.use(function(req,res,next){
    res.setHeader('content-type','text/html;charset=utf8');
    res.locals.label = '刘伟';
    next();
});

//get 请求的方法，path是路径，请求中的pathname匹配
app.get('/',function(req,res){
    //render负责渲染俺模版，第一个参数是模版的相对路径
    res.render('home',{title:"主页"});
    res.end('主页'+req.host+' ');
});
app.get('/user',function(req,res){
    res.setHeader('content-type','text/html;charset=utf8');
    res.render('user',{title:"用户",label:'珠峰'});
    res.end('用户');
});



app.listen(9090);


