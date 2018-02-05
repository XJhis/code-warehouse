//检测函数
function isFunction(value) {
	return (typeof value === 'function')
}

//检测数组
function isArray(value){
	return Array.isArray ? Array.isArray(value) : 
		(Object.prototype.toString.call(value) === "[object Array]");
}

// 检测对象 一般正常的对象，不是泛指的对象
function isObject(value) {
	return Object.prototype.toString.call(value) === "[object Object]";
}

// 检测是不是数字类型
function isNumber(value) {
	return (typeof value === 'number');
}

// 检测是不是字符串
function isString(value) {
	return (typeof value === 'string');
}

//检测是否是日期类型
function isDate(value) {
	return Object.prototype.toString.call(value) === '[object Date]';
}

//检测是否是正则对象
function isRegExp(value) {
	return Object.prototype.toString.call(value) === '[object RegExp]';
}

//检测是不是undefined
function isUndefined(value) {
	return typeof value === 'undefined';
}

//检测是不是已定义
function isDefined(value) {
	return typeof value !== 'undefined';
}

function isNull(value) {
	return value === null;
}

function isOjectNoName(value) {
	return JSON.stringify(value) === "{}"
}

function phoneType () {

    var u = navigator.userAgent,
    	text = '';

    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
        // return "Android";
        text = 'Android'
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        // return "iPhone";
        text = 'iPhone'
    } else if (u.indexOf('iPad') > -1) {//iPad
        // return "iPad";
        text = 'iPad'
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
        // return "Windows Phone";
        text = 'Windows Phone'
    }else{
    	text = '什么也不是'
    }

    alert(text)
}



