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
        //循环保存在数组的每个路由配置对象
        for(var i=0;i<app.routes.length;i++){
            //取出当前的路由
            var route = app.routes[i];
            //如果方法名相同并且路径相当的话，就可以执行对应的回调函数
            if((route.method=='all' || method==route.method) && (route.path==pathName||route.path=='*')){
                return route.listener(req,res);
            }
        }
    };
    //app内部维护了一个监听路由的数组
    app.routes = [];
    var methods = ['get','post','delete','put','head','all'];//自动匹配规定的请求方式
    methods.forEach(function(method){
        //为app增加自定义属性，第一个参数是路由路径，第二个是请求监听函数
        app[method] = function(path,listener){
                //向数组中增加新的元素，是一个配置对象，由路径和监听函数组成
                app.routes.push({path:path,listener:listener,method:method});
            };
    });
    app.listen = function(port){
        require('http').createServer(app).listen(port);
    };

    return app;
};


