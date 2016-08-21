var express = require('./express_params');
var url = require('url');

var app = express();

app.use(function(req,res,next){
    //http://localhost:9090/user?name=liuwei&age=18   详看浏览器控制台
    var urlObj = url.parse(req.url,true);
    req.path = urlObj.pathname;//端口好和问号之间的部分
    req.query = urlObj.query;//查询字符串转成的对象
    req.hostname = req.headers.host.split(':')[0];//从请求头中去除主机名
    next();
});

app.get('/user',function(req,res){
    //1 获取路径 请求名
    console.log(req.path);
    //2 获取主机名
    console.log(req.hostname);
    //3 获取查询对象 起始就是查询字符串对应的对象（浏览器get明文传输的参数）
    console.log(req.query);
    res.end('ok');

});
//http://localhost:9090/book/111/222
///book/:id/:name    ->  /book\/([^\/])\/([^\/])
app.get('/book/:id/:name',function(req,res){
    console.log(req.params);//获取请求URL中的参数值
    res.end(req.params.id+' '+req.params.name);
});


app.listen(9090);


