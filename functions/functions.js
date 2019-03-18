//检测函数
function isFunction(value) {
    return (typeof value === 'function')
}

//检测数组
function isArray(value) {
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

/*
浏览器
=====start=======
*/

//手机系统
/*toding-待真机测试*/

function phoneType() {

    var u = navigator.userAgent,
        text = '';

    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) { //安卓手机
        // return "Android";
        text = 'Android'
    } else if (u.indexOf('iPhone') > -1) { //苹果手机
        // return "iPhone";
        text = 'iPhone'
    } else if (u.indexOf('iPad') > -1) { //iPad
        // return "iPad";
        text = 'iPad'
    } else if (u.indexOf('Windows Phone') > -1) { //winphone手机
        // return "Windows Phone";
        text = 'Windows Phone'
    } else {
        text = ''
    }

    return text;
}

//浏览器类型
/*toding-待实测*/

function browserType() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) return "IE7"
        else if (fIEVersion == 8) return "IE8";
        else if (fIEVersion == 9) return "IE9";
        else if (fIEVersion == 10) return "IE10";
        else if (fIEVersion == 11) return "IE11";
        else return "IE7以下" //IE版本过低
    }

    if (isFF) return "FF";
    if (isOpera) return "Opera";
    if (isEdge) return "Edge";
    if (isSafari) return "Safari";
    if (isChrome) return "Chrome";
}

/*=====end=======*/

/*
日期相关
======start======
*/

//

/**
 * 时间戳转指定日期格式的字符串
 * 
 * @param  {date} 时间戳 Number
 * @param  {fmt} 日期格式 String
 * @return {String} 字符串 String
 *
 * @example formatTime(1517817273213, 'yyyy-MM-dd hh:mm') // -> 2018/02/05 15:54
 */

function formatTime(date, fmt) {
    var date = new Date(+date);
    if (/(y+)/.test(fmt)) {
        console.log('RegExp.$1', RegExp.$1)
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        console.log('sss:', (date.getFullYear() + '').substr(4 - RegExp.$1.length) )
        console.log('fmt:', fmt)
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        console.log('new RegExp(`(${k})`)', new RegExp(`(${k})`))
        console.log('RegExp.$1', RegExp.$1)
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
        }
    }
    return fmt;
}

/**
 * 获取某月的天数
 * 
 * @param  {year} 年份 Number
 * @param  {month} 月份 Number
 * @return {days} 天数 Number
 *
 * @example getMonthDays(2018, 2) // -> 28
 */

function getMonthDays(year, month) {
    return new Date(year, month, 0).getDate()
}

/**
 * 获取某年的第一天
 * 
 * @param  {time} 时间戳/日期字符串 Number/String
 * @return {String} 字符串 String
 *
 * @example getFirstDayOfYear('2018/7/6') // -> 2018/01/01 00:00
 */

function getFirstDayOfYear(time) {
    var year = new Date(time).getFullYear();
    return year + "/01/01 00:00:00";
}

/**
 * 获取某年的最后一天
 * 
 * @param  {time} 时间戳/日期字符串 Number/String
 * @return {String} 字符串 String
 *
 * @example formatTime('2018/7/6', 'yyyy-MM-dd hh:mm') // -> 2018/02/05 15:54
 */

function getLastDayOfYear(time) {
    var year = new Date(time).getFullYear(),
        lastMonth = getMonthDays(year, 12);

    return year + '/12/' + lastMonth + " 23:59:59";
}

/**
 * 获取某年有多少天
 * 
 * @param  {time} 时间戳/日期字符串 Number/String
 * @return {day} 天数  Number
 *
 * @example formatTime('2018/7/6') // -> 365
 */

/*获取某年有多少天*/
function getYearOfDay(time) {

    var firstDayYear = getFirstDayOfYear(time);
    var lastDayYear = getLastDayOfYear(time);
    var numSecond = (new Date(lastDayYear).getTime() - new Date(firstDayYear).getTime()) / 1000;
    return Math.ceil(numSecond / (24 * 3600));
}

/**
 * 获取某个日期是当年中的第几天
 * 
 * @param  {time} 日期字符串 String
 * @return {day} 天数  Number
 *
 * @example formatTime('2018/7/6') // -> 365
 * @注意 如果日期字符串只到天，返回结果需要加一
 */

function getDayOfYear(time) {
    var firstDayYear = getFirstDayOfYear(time);
    var numSecond = (new Date(time).getTime() - new Date(firstDayYear).getTime()) / 1000;
    return Math.ceil(numSecond / (24 * 3600));
}

//深拷贝1
//能基本满足深拷贝的需求
//缺点:当对象中有函数、undefined、正则、时间对象的时候，无法正确拷贝；
function deepCopy1(val) {
    return JSON.parse(JSON.stringify(val));
}

// 判断值得类型
function judgeType(obj) {
    // tostring会返回对应不同的标签的构造函数
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
    };
    if (obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
}


//深拷贝2
function deepCopy2(data) {
    var type = this.judgeType(data);
    var obj;
    if (type === 'array') {
        obj = [];
    } else if (type === 'object') {
        obj = {};
    } else {
        // 不再具有下一层次
        return data;
    }
    if (type === 'array') {
        // eslint-disable-next-line
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(this.deepClone(data[i]));
        }
    } else if (type === 'object') {
        // 对原型上的方法也拷贝了....
        // eslint-disable-next-line
        for (var key in data) {
            obj[key] = deepCopy2(data[key]);
        }
    }
    return obj;
}