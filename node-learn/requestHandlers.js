// var exec = require("child_process").exec;
var querystring = require("querystring");

//开始页面
function start(response, postData) {

    var html =`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" >
        <title>Document</title>
    </head>
    <body>
        <div>
            <form action="/upload" method="post">
                <textarea name="text" cols="30" rows="10"></textarea>
                <input type="submit" value="提交" />
            </form>
        </div>
    </body>
    </html> `

    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write(html);
    response.end();
}

//上传文件
function upload(response, postData) {
    response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    response.write("You've sent the text:" + querystring.parse(postData).text);
    response.end();
}

//404页面
function notFound(response, postData) {
    var body = `
        <h1 style="color:#ff6b00">404 Not Found</h1>
    `
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write(body);
    response.end();
}

module.exports = {
    start,
    upload,
    notFound
}