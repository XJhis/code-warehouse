var http = require('http');
var url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
     var postData = "",
         pathname = url.parse(request.url).pathname;

        request.setEncoding("utf8");
        
        route(handle, pathname, response, postData, request);

    }

    http.createServer(onRequest).listen(8080)
}

exports.start = start;