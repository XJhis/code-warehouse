// var exec = require("child_process").exec;
var querystring = require("querystring");

//开始页面
function start(response, postData) {
    var content = "empty";
    var html = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8" http-equiv="Content-Type" content="text/html">
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

//上传文件
function upload(response, postData) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('you asd asd：'+querystring.parse(postData).text);
    response.end();
}

//404页面
function notFound(response, postData) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write(`404:${postData}`);
    response.end();
}


module.exports = {
    start,
    upload,
    notFound
}