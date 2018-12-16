
//对data里面的数据进行劫持
function observe(data) {
	if (typeof data !=='object' || data==null) {
		return false;
	}

	Object.keys(data).forEach(function(val, key) {
		defineName(data, val, data[val]);
	});
}

function defineName(data, name, val) {
	// body...
	observe(val);
	
}