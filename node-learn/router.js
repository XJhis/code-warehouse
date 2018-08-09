function route(handle, pathname, response, postData, request) {
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](response, request);
    } else {
        handle.notFound(response)
    }
}

exports.route = route;

