var path = require('path');
var url = require('url');
module.exports = function(){
    //当调用此函数的时候返回一个函数，就是监听函数，有两个参数，分别是请求和响应
    var app =  function(req,res){
        //把url转换成对象形式
        var urlObj = url.parse(req.url,true);
        //获取请求中的方法名,由于method给出的是大写，所以要转为小写比对
        var method = req.method.toLowerCase();
        //取得路径名
        var pathName = urlObj.pathname;
        var index = 0;
        res.render = function (tmpl,data,callback){
            //定义在中间件离职后，后面所有的路由里都可以使用res.render方法了
            var viewEngine = app.getkey('view engine');//获得模版引擎
            if (viewEngine == 'ejs') {//如果是ejs的话就支持
                //如果原来的模版路径有后缀.ejs，则追加一个空字符串，否则加.ejs后缀
                tmpl = tmpl + (tmpl.endsWith('.ejs') ? '' : '.ejs');
                //等于模版的存放目录绝对路径加上模版文件的相对路径
                var fileName = path.join(app.getkey('views'), tmpl);
                fs.readFile(fileName, 'utf8', function (err, content) {
                    console.log(content);
                    content = content.replace(/<%=(\w+)%>/g, function () {
                        var match = arguments[0];//匹配到的字符子串
                        var attr = arguments[1];//第一个分组，起始就是变量名或属性名，
                        return data[attr];//返回数据对象的属性对应的值
                    });
                    if(callback){
                        callback(err,content);
                    }else{
                        //res.end(content);
                    }
                });
            } else {
                //return;
                res.end('当前不支持此模版！');
            }
        };
        //next表示调用下一层
        function next(){
            if(index>=app.layers.length){
                return res.end('CANNOT '+req.method+' '+pathName);
            }
            //取出当前层，然后让索引累加
            var layer = app.layers[index++];
            //如果此层是的类型是中间件的话
            if(layer.type=='middleware'){
                //如果请求的路径名是path开头的话
                if(pathName=='/' || pathName==layer.path||pathName.startsWith(layer.path+'/')){//路径以layer.path开头
                    //if(pathName.indexOf(layer.path)==0){
                    layer.listener(req,res,next);//中间件有三个参数，
                }else{
                    next();
                }
            }else{//如果是路由的话
                if((layer.method=='all' || method==layer.method) && (layer.path==pathName||layer.path=='*')) {
                    return layer.listener(req, res);//路由有两个参数
                }else{
                    next();
                }
            }
        }
        //定义完成后理科调用此方法开始迭代
        next();
        //循环保存在数组的每个路由配置对象
        for(var i=0;i<app.layers.length;i++){
            //取出当前的路由
            var route = app.layers[i];
            //如果方法名相同并且路径相当的话，就可以执行对应的回调函数
            if((route.method=='all' || method==route.method) && (route.path==pathName||route.path=='*')){
                return route.listener(req,res);
            }
        }
    };
    //app内部维护了一个监听路由或中间件的数组
    app.layers = [];
    var methods = ['get','post','delete','put','head','all'];//自动匹配规定的请求方式
    methods.forEach(function(method){
        //为app增加自定义属性，第一个参数是路由路径，第二个是请求监听函数
        app[method] = function(path,listener){
                //向数组中增加新的元素，是一个配置对象，由路径和监听函数组成
                app.layers.push({type:'route',path:path,listener:listener,method:method});
            };
    });
    //注册中间件，注册的时候可以省略path
    app.use = function(path,listener){
        if(typeof path == 'function'){//意味着没有传路径，值传了函数
            listener = path;//把函数引用赋给监听函数，中间件函数
            //中间件匹配路径的时候和路由不一样，只要前缀相同就可以匹配上
            path = '/';//给path赋一个默认值
        }
        //因为中间件不考虑方法名
        app.layers.push({type:'middleware',path:path+'/',listener:listener});
    };
    app.settings = {};//此对象中保存所有的配置项
    app.set = function(key,value){//把一个key和value设置到a品牌内部
        app.settings[key] = value;
    };
    app.getkey = function(key){//从app的settings获取一个key
        return app.settings[key];
    };
    app.listen = function(port){
        require('http').createServer(app).listen(port);
    };
    return app;
};

function reg(){
    //这时路径中指定的路径
    var str = 'book/:id/:name/3/:age';
    //提供此路径中的路径参数名称
    var matches = str.match(/\/:(\w+)/g);
    var paramNames = matches.map(function(item){return item.slice(2)});
    console.log(matches);
    console.log(paramNames);
    //把此路径转化成正则表达式
    var regex = str.replace(/\//g,'\\/').replace(/:\w+/g,'([^\/]+)');
    console.log(regex);
    //如何把此url转成一个对象 req.params = {id:1,name:liuwei,age:8}
    var url = '/book/1/liuWei/3/8';
    var urlMap = url.match(regex);
    var obj = {};
    paramNames.forEach(function(item,index){
        obj[item] = urlMap[index+1];
    });
    console.log(obj);
};
//reg();