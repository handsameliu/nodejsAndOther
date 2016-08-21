//用于打印一些调试信息
var debug = require('./debug');
//console.log(process.env.DEBUG);
//传入一个名字可以得到对应的日志记录器
var loggerServer = debug('logger:server');
//运行调用此函数在控制台输出日志
//输出的时候，会用此日期记录器的名字和环境变量中的DEBUG值进行比较，如果相同，则输出控制台，如果不相同，则不输出任何东西
loggerServer('server');
var loggerClient = debug('logger:client');
loggerClient('client');
/* 在控制台设置环境变量
* set DEBUG=logger:*
* set DEBUG=logger:server
* set DEBUG=logger:client
* */




