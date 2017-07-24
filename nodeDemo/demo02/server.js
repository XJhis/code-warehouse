//引入http协议：
var http = require('http');

//创建一个服务对象；
http.createServer(function(request, response) {
	//设置返回 
	// 200 ==> http请求状态
	// http头的内容类型（Content-Type）
	
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('你好，Boy!');
	//请求结束；
	response.end();

}).listen(8080);
