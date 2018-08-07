var exec = require("child_process").exec;

function start(response) {
    var content = "empty";
    exec("ls-index.js", function(error, stdout, stderr) {
    	content = stdout
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write(content);
        response.end();
    });    
}

function upload(response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('uploading........');
    response.end();
}

function notFound(response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('404 not Found!!!');
    response.end();
}

// exports.start = start;
// exports.upload = upload;
module.exports = {
    start,
    upload,
    notFound
}