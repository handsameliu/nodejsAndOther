module.exports = function(){
    /***
     * 1 初始化一个空对象
     * 2 读取package.json文件，得到一个json  require('./package.json');
     * 3 取到devDependencies属性对象
     * 4 寻找次属性对象以gulp-开头的属性
     * 5 加载这些gulp插件模块，把返回值赋给$对象，属性名就是插件名gulp-
     *
     * @type {{}}
     */
    var $ = {};
    return Object.keys(require('./package.json').devDependencies).reduce(function($,key){
         //$代表当前对象key代表每个gulp插件模块的名字
         if(key.startsWith('gulp-')&&key!='gulp-load-plugins'){
         //if(key.indexOf('gulp-')==0){
             var attr = key.slice(5);
             //less concat minify-css 转为驼峰
             attr = attr.replace(/\-(\w)/,function(matched,group1){
                 return group1.toUpperCase();
             });
             $[attr] = require(key);
         }
        //console.log($);
        return $;
     },{});
     //最后返回$，是一个对象，他把所有的插件返回值都挂到了他的属性上
};
//module.exports();

function upperCase(str){
    str = str.replace(/\-(\w)/,function(matched,group1){
        return group1.toUpperCase();
    });
    return str;
}

