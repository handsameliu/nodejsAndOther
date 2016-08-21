//导入express
var express = require('express');
var fs = require('fs');
function static(p){
    //先读取req.path拿到用户输入的路径，和我们的当前传入的路径拼出一个绝对地址。如果有则读取出来返回，没有继续
    //我们当前访问的路径是
    return function(req,res,next){

        //将两个目录拼接起来就会生成一个绝对路径
        var filePath = path.join(p,req.path);
        console.log(filePath);
        var exist = fs.existsSync(filePath);
        if(exist){
            fs.createReadStream(filePath).pipe(res);
        }else{
            next();
        }
    }
}
function bodyParse(){
    return function(req,res,next){
        var result = '';
        req.on('data',function(data){
            result +=data;
        });
        req.on('end',function(){
            if(result!=''){
                req.body = JSON.parse(result);
            }
            next();
        });
    }
}
var path = require('path');
var app = express();
var books = [
    {id:1,name:'nodejs',price:30,count:1},
    {id:2,name:'js',price:20,count:1},
    {id:3,name:'angular',price:40,count:1},
    {id:4,name:'webpack',price:50,count:1}
];
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//设置静态文件夹
//app.use(static(path.resolve('express0818')));
//app.use(static(path.resolve('../node_modules')));
app.use(express.static(path.resolve('../node_modules')));
app.listen('8080');
//访问/的时候将首页进行返回
app.get('/',function(req,res){
    res.sendFile('./1bookstore.html',{root:__dirname});
});
app.delete('/book/:id',function(req,res){
    //我们需要获得最新的要删除的图书的id
    var bookid = req.params.id;
    books = books.filter(function(item){
        return item.id!=bookid;
    });
    res.send({'success':'删除成功'});//如果请求未完成则不会发出二次请求
});
app.get('/book',function(req,res){
    res.send(books);
});
app.post('/book/:id',function(req,res){
    //h获取请求体
    var book = req.body;
    //$scope.books = book.query();
    books.push(book);
    res.send({'success':'添加成功'});
});
app.put('/book/:id',function(req,res){
    var bookid = req.params.id;
    var book = req.body;//修改后的那本书
    books = books.map(function(item){
        if(item.id == bookid){
            return book;
        }
        return item;
    });
    res.send({'success':'添加成功'});
});


