var server = require('./server');
var router = require('./router');
var requestHandlers = require("./requestHandlers");

//定义一个路由路径对象
var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
handle['notFound'] = requestHandlers.notFound;

server.start(router.route, handle);