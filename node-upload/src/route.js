var url = require('url');
var handle = require('./handle');

function route(req, res) {
	var pathname = url.parse(req.url).pathname;
	// console.log('req:', req.url)
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](req, res);
    } else {
        var body = `<h1 style="color:#ff6b00">404 Not Found</h1>`
	    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
	    res.write(body);
	    res.end();
    }
}

module.exports = route;

