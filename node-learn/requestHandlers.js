var exec = require("child_process").exec;
var querystring = require("querystring");

function start(response, postData) {
    var content = "empty";
    var html = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <title>Document</title>
                    </head>
                    <body>
                        <div>
                            <form action="/upload" method="post">
                                <textarea name="" id="" cols="30" rows="10"></textarea>
                                <input type="submit" value="提交"/>
                            </form>
                        </div>
                    </body>
                </html>`

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(html);
    response.end();    
}

function upload(response, postData) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('you asd asd：'+querystring.parse(postData).text);
    response.end();
}

function notFound(response, postData) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write(`404:${postData}`);
    response.end();
}

// exports.start = start;
// exports.upload = upload;
module.exports = {
    start,
    upload,
    notFound
}