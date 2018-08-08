var http = require('http');
var url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
    	var postData = "",
        	pathname = url.parse(request.url).pathname;

        request.setEncoding("utf-8");

        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("接受数据块：" +
                postDataChunk + "'.");
        });

        request.addListener("end", function() {
        	console.log('end')
            route(handle, pathname, response, postData);
        });

    }

    http.createServer(onRequest).listen(8080)
}

exports.start = start