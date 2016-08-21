var express = require('express');
var path = require('path');
var session = require('express-session');//express的session中间件
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(session);
var app = express();
app.set('views',path.join(__dirname,'views'));//模版存放目录
app.set('view engine','html');
app.engine('html',require('ejs').__express);
//为true时用query把字符串转成对象，false用bodyParser自带的转换器转换
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'zfpx',//提供cookie加密
    resave:true,//每次iqngqiu都重新保存session
    saveUnititilized:true, //保存未初始化的seddeion
    //指定session的存储位置
    store:new MongoStore({
        //指定mongodb数据库地址
        url:'mongodb://127.0.0.1/sessionstall'//123.57.143.189
    })
}));
//显示空白额方式提交
app.get('/login',function(req,res){
    res.render('login','');
});
//以post方式提交表单
app.post('/login',function(req,res){
    var user = req.body;
    console.log(user);
    if(user.username=='admin'&&user.password=='admin'){
        req.session.username = user.username;
        //username = user.username;
        res.redirect('/user')
    }else{
        res.redirect('/back')
    }
     user= req.body;
});
app.get('/user',function(req,res){
    res.render('user2',{username:req.session.username});
});

app.listen(9090);


