//检测函数
function isFunction(value) {
	return (typeof value === 'function')
}

//检测数组
function(value) isArray{
	return Array.isArray ? Array.isArray(value) : 
		(Object.prototype.toString.call(value) === "[object Array]")
}

// 检测对象
function isObject(value) {
	return (value !==null && typeof value === 'function');
}

// 检测是不是没有原型的对象
function isBlankObject(value) {
	return (value !==null && typeof value === 'function' && !Object.getPrototypeOf(value));
}

// 检测是不是数字类型
function isNumber(value) {
	return (typeof value === 'number');
}

// 检测是不是字符串
function isString(value) {
	return Object.prototype.toString.call(value) === "[object String]";
}

//检测是否是日期类型
function isDate(value) {
	return Object.prototype.toString.call(value) === "[object Date]";
}

//检测是否是正则对象
function isRegExp(value) {
	return Object.prototype.toString.call(value) === "[object RegExp]";
}

//检测是不是undefined
function isUndefined(value) {
	return typeof value === 'undefined';
}

//检测是不是已定义
function isDefined(value) {
	return typeof value !== 'undefined';
}

function isOjectNoName(value) {
	return JSON.stringify(value) === "{}";
}


