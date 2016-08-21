//引入express，返回值是一个函数
var express = require('./express');
//调用此函数还会返回一个函数
var app = express();
/*
 * 如果发出非get请求
 *  1 chrome postman插件
 *  2 curl   例：curl -X POST http://localhost:8080/user    -X指定发送方式（get，post，delete，put...），后加网址
 *
 * */
//配置路由，当客户端以get方式访问路径的时候，进过get方法，找到对应的路由。返回一个homepage字符串
//不管方法名是什么，只要访问的路径是/user 那么就返回user
app.get('/user',function(req,res){
    res.end('get user');
});
app.all('/user',function(req,res){
    res.end('user');
});
/*
 app.post('/user',function(req,res){
 res.end('post user');
 });
 app.delete('/user',function(req,res){
 res.end('delete user');
 });
 app.put('/user',function(req,res){
 res.end('put user');
 });
 app.head('/user',function(req,res){
 res.end('head user');
 });
 */

/*
 //配置get请求 /a路径名执行的回调函数
 app.get('/a',function(req,res){
 res.end('a');
 });
 //‘*’通配符，表示匹配所有的路径
 app.get('*',function(req,res){
 res.end('404');
 });
 */

//启动一个服务器，监听8080端口
app.listen(8080);
//app起始就是一个监听函数，就是当客户端链接上来的时候指定的回调函数
//require('http').createServer(app).listen(8080);