var express = require('express');
var app = express();
var cookieParse = require('cookie-parser');
var querystring = require('querystring');
//使用此中间件之后才有req.cookies
//app.use(cookieParse());
app.use(function(req,res,next){
    req.cookies = querystring.parse(req.header.cookie,'; ');//name=zfpx;age=8.如果不同字段之间的分隔符不是&符的话需要手工指定分隔符
    next();
});
//当使用express之后，res.cookie
app.get('/write',function(req,res){
    //domain指定下次想那个服务器发请求的时候要发送此cookie
    //res.cookie('name','domain',{domain:'a.zfpx.cn'});

    //path可以设置指定的请求，满足路径名要求后才能读取到cookie
    //res.cookie('name','path',{path:'/read2'});

    //设置cookie倒计时到期时间
    //res.cookie('name','path',{maxAge:20*1000});

    //设置cookie过期时间
    //res.cookie('name','path',{expires:new Date(Date.now()+20*1000)});

    //设置cookie不能通过浏览器修改
    res.cookie('name','path',{httpOnly:true});
    res.send('写入cookie');
});
app.get('/read',function(req,res){
    var cookie = req.headers.cookie;
    res.send(cookie);
});
app.get('/read2',function(req,res){
    var cookie = req.headers.cookie;
    res.send(cookie);
});
//统计此用户访问了多少次服务器
app.get('/visit',function(req,res){
    //var cookie = req.header.cookie;//visit=1
    //当使用了cookieParse之后，会增加req.cookies的属性{visit:1}
    var cookies = req.cookies;
    //如果cookies中有此属性，表示是老顾客，以前来过
    var visit = cookies.visit;
    if(visit){//老顾客，访问次数在原来基础上加一
        visit = parseInt(visit)+1;
    }else{//如果没有此属性，意味着第一次来或者卡丢了
        visit = 1;
    }
    //不管是新朋友还是老朋友，都要把最新的visit值写回客户端
    res.cookie('visit',visit);
    res.end(visit+'');
});
app.listen(9090);