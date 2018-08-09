// var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require('formidable')

//开始页面
function start(response, postData) {

    var html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" http-equiv="Content-Type" content="text/html" />
        <title>Document</title>
    </head>
    <body>
        <div style="border:1px solid #f6f6f6; width: 500px; margin: 0 auto;padding: 40px">
            <form action="/upload" method="post" enctype="multipart/form-data">
                <input type="file" name="upload" multiple/>
                <input type="submit" value="上传图片" />
            </form>
        </div>
    </body>
    </html> `

    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write(html);
    response.end();
}

//上传文件
function upload(response, request) {
    // response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    // response.write("You've sent the text:" + querystring.parse(postData).text);
    // response.end();

    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        console.log("上传完毕:", files);
        fs.renameSync(files.upload.path, "/tmp/test.png");
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

//404页面
function notFound(response) {
    var body = `
        <h1 style="color:#ff6b00">404 Not Found</h1>
    `
    response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    response.write(body);
    response.end();
}

function show(response, postData) {
    fs.readFile('/tmp/test.png', 'binary', function(err, file) {
        if (err) {
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.write(err + "\n");
            response.end();
        } else {
            response.writeHead(200, { "Content-Type": "image/png" });
            response.write(file, "binary");
            response.end()
        }
    })
}



module.exports = {
    start,
    upload,
    notFound,
    show
}