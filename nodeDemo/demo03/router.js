function route(handle, pathname) {
	console.info('wo shi lu you ' + pathname);

	if(handle[pathname]) {
		return handle[pathname]();
	}else {
		return '404 没找到页面'
	}
}

exports.route = route;