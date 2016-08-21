var express=require('express');
var uuid=require('uuid');
var cookieParser = require('cookie-parser');
console.log(uuid.v4());
var app=express();
//当使用此中间件之后，
app.use(cookieParser());
/*
 * 模拟session的实现
 * 1.第一次访问服务器的时候,服务器会生成一个sessionId(要求每个客户端不一样)
 * 2.在服务器端记录此sessionId对应的余额
 * 3.
 * */
//此对象记录着服务器所有的session
var sessions={};
var SESSION_KEY= 'connect.sid';
app.get('/',function(req,res){
    //取得请求头中的cookie对象
    var cookies = req.cookies;
    //取得此客户端的sessionId(就相当于卡号)
    var sessionId = cookies[SESSION_KEY];
    if(sessionId){
        //在sessionId中查询此id对应的数据对象{balance:100}
        var sessionObj = sessions[sessionId];
        if(sessionObj){
            sessionObj.balance-=10;
            res.send('欢迎再次光临，您的余额为'+sessionObj.balance+'元');
        }else{//如果客户端有卡号，但是找不到对应的信息
            genId();
        }
    }else{
        genId();
    }
    function genId(){
        //生成一个永远不会重复的字符串作为此客户端的会话唯一标识
        var sessionId=uuid.v4();
        sessions[sessionId]={balance:100};
        //把此sessionId发送给客户端
        res.cookie(SESSION_KEY,sessionId);
        res.send('欢迎光临，您的余额为100元');
    }
});
app.listen(9090);
