var fs = require('fs')
var path = require('path')
//入口页面
function upload(req, res) {
	var target = path.join(__dirname, './form.html');
	// console.log('target:', target)//文件在该设备上的绝对路径
    fs.readFile(target,(err,data)=>{
        if(err) throw err;
        res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
        res.end(data);
    });
}

function css(req, res) {
	var target = path.join(__dirname, './css/style.css');
    fs.readFile(target,(err,data)=>{
        if(err) throw err;
        res.writeHead(200,{"Content-Type":"text/css;"});
        res.end(data);
    });
}
module.exports = {
	upload,
	css
}