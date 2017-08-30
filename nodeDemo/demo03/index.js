//引用我们自己定义的模块
var server = require('./server.js');
var router = require('./router.js');
var requestHandlers = require('./requestHandlers.js');

//定义一个对象，专门处理不同请求
var handle = {};

handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;

server.start(router.route, handle);