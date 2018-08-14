var fs = require('fs');
var path = require('path');
var formidable = require('formidable');

//获取本地文件
function getHtml(name, callback) {
    var target = path.join(__dirname, `./${name}`); //文件在该设备上的绝对路径
    fs.readFile(target, (err, data) => {
        if (err) throw err;
        callback(err, data)
    });
}

//入口页面
function start(req, res) {

    getHtml('form.html', function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html;charset=UTF8" });
        res.end(data);
    })
}

function css(req, res) {
    var target = path.join(__dirname, './css/style.css');
    fs.readFile(target, (err, data) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/css;" });
        res.end(data);
    });
}

//普通表单提交
function send(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        console.log('fields:', fields);
        res.writeHead(200, { "Content-Type": "text/html;charset=UTF8" });
        res.end('表单提交成功！');
    });
}


//上传图片页面
function showUpload(req, res) {
    getHtml('upload.html', function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html;charset=UTF8" });
        res.end(data);
    })
}

//上传文件提交
function uploadFiles(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, './upload');
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        var oldpath = files.uploadImg.path;
        var newpath = path.join(path.dirname(oldpath), files.uploadImg.name);
        fs.rename(oldpath, newpath, (err) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html;charset=UTF8" });
            res.end('图片上传并改名成功！');
        })
    });
}

var handle = {};
handle['/'] = start;
handle['/start'] = start;
handle['/style.css'] = css;
handle['/send'] = send;
handle['/showUpload'] = showUpload;
handle['/uploadFiles'] = uploadFiles;

module.exports = handle