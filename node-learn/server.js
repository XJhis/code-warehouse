var http = require('http');
var url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
     var postData = "",
         pathname = url.parse(request.url).pathname;

        // request.setEncoding("utf8");

        request.on("data", function(postDataChunk) {
            postData += postDataChunk;            
        });

        request.on("end", function() {
            console.log('postData:', postData)
            route(handle, pathname, response, postData);
        });

    }

    http.createServer(onRequest).listen(8080)
}

exports.start = start

//提交表单数据
var http = require('http');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
    //req.url不同则返回的页面不同
    if ('/' == req.url) {
        var html = ``
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write([
            '<form method="post" action="/url">',
            '<h1>My Form</h1>',
            '<fieldset>',
            '<label>Personal Information</label>',
            '<p>What is your name?</p>',
            '<input type="text" name="name">',
            '<button>submit</button>',
            '</form>'
        ].join(''));
        res.end();
    } else if ('/url' == req.url && req.method == 'POST') {
        var reqBody = '';
        req.on('data', function(data) {
            console.log('data：', data)
            reqBody += data;
        });
        req.on('end', function() { //用于数据接收完成后再获取
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('you have sent a ' + req.method + ' request\n');
            res.write('<p>Content-Type:' + req.headers['content-type'] + '</p>' +
                '<p>Data:your name is ' + querystring.parse(reqBody).name + '</p>');
            res.end();
        })
    } else {
        res.writeHead(404);
        res.write('Not Found');
        res.end();
    }
}).listen(3000, function() {
    console.log('server is listening 3000');
});