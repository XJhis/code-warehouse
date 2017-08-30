//引入内置模块
var http = require("http");
var url = require("url");

function start(route, handle) {

	//这个函数可以在start外申明，但是我们把实现某一功能的代码块放在一起；
	function onRequest(request, response) {

		//路由：
		var pathname = url.parse(request.url).pathname; //注意pathname 没有用驼峰式;
		console.log('request for' + pathname + 'received');
		var content = route(handle, pathname);

		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write(content);
		response.end();
	}

	http.createServer(onRequest).listen(8888);
	console.info('Server has Started');
}

exports.start = start;