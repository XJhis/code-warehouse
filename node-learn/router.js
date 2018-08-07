function route(handle, pathname, response) {
    if (typeof handle[pathname] === 'function') {
        return handle[pathname](response);
    } else {
        handle.notFound(response)
    }
}

exports.route = route;