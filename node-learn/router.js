function route(handle, pathname, response, postData) {
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](response, postData);
    } else {
        handle.notFound(response, postData)
    }
}

exports.route = route;