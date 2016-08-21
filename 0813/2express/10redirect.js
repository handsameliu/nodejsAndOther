var express = require('express');
var app = express();
var path = require('path');
var bodyparse = require('body-parser');
var cookieParse = require('cookie-parser');
app.use(cookieParse());
app.set('view engine', 'html');
app.set('views', path.join(__dirname,'views'));
//把请求体转换成对象存放到req.body上了
app.engine('html', require('ejs').__express);

/*app.use(function (req, res, next) {

 });*/

app.use(bodyparse.urlencoded({extended:true}));

/*app.use(function (req, res, next) {
 res.redirect = function (url) {
 //设置响应码为302
 res.statusCode = 302;
 res.setHeader('Location', url)
 res.end();;
 }
 next();
 });*/


app.get('/', function (req, res) {
    res.render('home');
});
app.get('/login', function (req, res) {
    res.render('login');
});
app.post('/login', function (req, res) {
    //从请求体中取得请求对象
    var user = req.body;
    //如果用户名和密码都正确
    if (user.username === 'admin' && user.password == 'admin'){
        //登录成功后写一个cookie
        res.cookie('username',user.name);
        //重定向就是告诉 客户端向新的地址发起请求
        res.redirect('/user');
    } else {
        res.redirect('back');
    }
});
app.get('/user', function (req, res) {
    res.render('user',{username:req.cookies.username});
});


app.listen(8080);