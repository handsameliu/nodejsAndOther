var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser('come'));//这里的come就是cookie的迷药，使用中间件的时候使用密钥
app.get('/write',function(req,res){
    res.cookie('name','liuwei',{signed:'true'});
    res.send('');
});
app.get('/read',function(req,res){
    //res.send(req.cookies);
    res.send(req.signedCookies);
});
app.listen(9090);