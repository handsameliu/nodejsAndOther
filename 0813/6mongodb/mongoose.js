var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/201605js');//localhost:端口号/数据库名称
//定义一个模型骨架，定义一个集合中字段的名称和类型
//如果字段名称不符，会忽略此字段，如果类型不符会报错
var personSchema = new mongoose.Schema({
    username:String,//用户名
    age:Number,//年龄
    email:String,//邮箱
    gender:String,//性别
    birthday:Date,//生日
    married:String//是否已婚
});
//定义一个可以操作数据库集合的model
var personModel = mongoose.model('Person',personSchema);
//类似命令行中的 db.person.。。。

//定义一个实体=集合中的文档对象
var wangwuEntity =  new personModel({
    username:'王五2',
    //email:'wangwu@qq.com',
    //qq:766582,
    age:15,
    gender:'男',
    birthday:new Date(),
    married:'离婚'
});
//entity默认只有一个方法，那就是添加对象保存到数据库
wangwuEntity.save(function(err,result){
    if(err){
        console.log(err);
    }else{
        //保存成功后的返回值
        console.log(result);
    }
});









