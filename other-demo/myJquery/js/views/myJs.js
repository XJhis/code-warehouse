/*
====================
    js深入---熊炬辉
====================
*/


var verson = '1.0.0',
    core = [];
    core_indexOf = core.indexOf,
    str_trim = verson.trim,
    jq = {},
    rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jq.trim = str_trim && str_trim.call("\uFEFF\xA0") ?

    function(text) {
        console.log('默认')
        return text === null ?
            "" :
            str_trim.call(text);
    } :
    function(text) {
        console.log('自己写')
        return text === null ?
            "" :
            (text + "").replace(rtrim, '');

    }




/*
    检测数据类型
===================
*/

jq.isString = function(value) {
    return typeof value === 'string';
}

jq.isNumber = function(value) {
    return typeof value === 'number';
}

jq.isBoolean = function(value) {
    return typeof value === 'boolean';
}

jq.isUndefined = function(value) {
    return typeof value === 'undefined';
}

jq.isDefined = function(value) {
    return typeof value !== 'undefined';
}

//检测函数的最佳方案就是用 typeof (可以跨帧使用) 但是在ie8及更早的版本中，没有将DOM实现为内置的javascript方法，导致typeof 返回'object'
// 在ie8及其一下版本测试是否有dom方法，用item in objecta方法

jq.isFunction = function(value) {
    return typeof value === 'function';
}

//检测数组

jq.isArray = function(value) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(value);
    } else {
        return Array.prototype.toString.call(value) === "[object Array]";
    }
}

// 遍历数组或则对象
jq.each = function(obj, callback, arr) {
    var result,
        i = 0,
        length = obj.length,
        isArray = jq.isArray(obj);

    //第三个参数有没有，分2中情况
    if ( arr ) {
        if ( isArray ) {

            for ( ; i < length; i++ ) {
                result = callback.apply( obj[i],arr );

                if (result === false) {
                    break;
                }
            }
        }else{
            for (i in obj) {
                result = callback.apply( obj[i],arr );

                if ( result === false ) {
                    break;
                }

            }

        }

    }else {

        if ( isArray ) {

            for ( ; i < length; i++ ) {
                result = callback.call( obj[i], i, obj[i] );

                if (result === false) {
                    break;
                }
            }
        }else{
            for (i in obj) {
                result = callback.call( obj[i], i, obj[i] );

                if ( result === false ) {
                    break;
                }

            }

        }
    }
}   

//查找指定值在数组中的下标位置

jq.inArray = function(ele, arr, i) {

    if ( arr ) {

        if (core_indexOf) {
            return core_indexOf.call(arr, ele, i);
        }

        var length = arr.length;

        i = i?( i<0 ? Math.max(i+length) :i ):0;

        for ( ; i < length; i++) {
            
            if ( i in arr && ele === arr[i] ) {
                return i
            }

        }

    }

    return -1

}

