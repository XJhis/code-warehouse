var http = require('http');
var route = require('./route');

 http.createServer(function (req, res) {
    route(req, res);
}).listen(8080)

