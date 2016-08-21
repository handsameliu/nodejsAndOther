var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/201605js');//localhost:端口号/数据库名称
//定义一个模型骨架，定义一个集合中字段的名称和类型
//如果字段名称不符，会忽略此字段，如果类型不符会报错
var personSchema = new mongoose.Schema({
    username:String,//用户名
    age:Number//年龄
});
//定义一个可以操作数据库集合的model
var personModel = mongoose.model('Person',personSchema);

/**
 * find 查询方法 （异步）
 * 参数1 查询的字段范围
 * 参数2 回调函数，查询完成后执行的方法，参数有两个，1为错误err，2为查询后的结果集合文档
 */
/*personModel.find({},function(err,docs){
    if(err){
        console.log(err);
    }else{
        console.log(docs);
    }
});*/

//model模型 module模块seajs，requirejs,webpack,commonjs

/**
 * 保存文档
 * 参数1 添加的字段信息
 * 参数2 回调函数，添加完成后执行的方法，参数有两个，1为错误err，2为查询后返回的文档对象
 */
/*personModel.create({username:'liuliu',age:18},function(err,doc){
    if(err){
        console.log(err);
    }else{
        console.log(doc);
    }
});*/
/*
* 修改文档  默认只修改匹配到的第一条信息
* 参数1 修改的文档查询条件
* 参数2 想要替换的信息
* 参数3 回调函数
* */
/*personModel.update({username:'liuliu'},{$set:{age:100}},function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});*/
/*
* 删除文档  可以批量删除
* 参数1 删除的查询条件
* 参数2 回调函数
* */
/*personModel.remove({name:'liuliu'},function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});*/
/*
* 批量添加文档信息
* */
var people = [];
for(var i=0;i<10;i++){
    people.push({age:i,username:'liu'+i});
}
//不仅可以添加对象还能添加数组
personModel.create(people,function(err,docs){
    if(err){
        console.log(err);
    }else{
        console.log(docs);
    }
});







