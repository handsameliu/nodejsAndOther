var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
express.static = function(root){
    /*
    * 1 判断root下有没有此文件，如果有取出来返回，如果没有调用next继续向下匹配
    * */
    return function(req,res,next){
        var fileName = path.join(root,req.path);

        //判断文件是否存在
        fs.exists(fileName,function(exists){
            if(exists){
                fs.createReadStream(fileName).pipe(res);
            }else{
                next();
            }
        });

    }
};


app.use(express.static(path.resolve('public')));//resolve返回绝对路径，参数是一个相对路径

app.get('/',function(req,res){
    res.sendFile('./home.html',{root:path.resolve()});//__dirname
    //res.sendfile('./home.html');
});
app.listen(9090);

