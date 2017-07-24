var jq = {};  


// 过滤数组
jq.grep = function(arr, callback, isBoolean) {

    var callbackReturn,
        length = arr.length,
        resultArr = [],
        i = 0
    callbackSend = !isBoolean;

    for (; i < length; i++) {
        callbackReturn = !callback(arr[i], i);

        if (callbackReturn !== callbackSend) {
            resultArr.push(arr[i])
        }
    }

    return resultArr;
}

//合并数组
jq.merge = function(first, second) {
    var firL = first.length,
        len = second.length,
        i = 0;

    console.log(second.length)

    if (typeof len === 'number') {

        while (i < len) {
            first[firL++] = second[i++];
        }

    } else {
        while (second[i] !== undefined) {
            first[firL++] = second[i++];
        }
    }

    first.length = firL;

    return first;

}


//遍历数组或者对象，进行过滤(注意：对象可以用这个方法)
// 不会改变原有数组

jq.map = function(elem, callback, arg) {
    var length,
        value,
        res = [],
        isArray = Object.prototype.toString.call(elem) === '[object Array]', //为了判断是否是数组
        i;


    if (isArray) {
        console.log('数组')
        length = elem.length;
        //遍历数组
        for (i = 0; i < length; i++) {
            value = callback(elem[i], i, arg);

            if (value !== null) {
                res.push(value);
            }

        }

    } else {
        console.log('对象')
            // 遍历对象
        for (i in elem) {
            value = callback(elem[i], i, arg);

            if (value !== null) {
                res.push(value);
            }
        }

    }

    //可以将2维数组变成一位数组
    return Array.prototype.concat.apply([], res);
}

//将类数组转为数组

// jquery中方法	没什么卵用

jq.makeArray = function() {

}

// 我自己的方法 没什么卵用
jq.transArray = function(elem, arr) {
    var insideArr = [],
        result = arr || [],
        isSlice = typeof insideArr.slice;

    if (isSlice) {
        return jq.merge(result, insideArr.slice.call(elem));
    }
}

//模拟原生 typeof 

jq.type = function(obj) {
	var arr,		
		i = 0,
		class2type = {},
		str = "Boolean Number String Function Array Date RegExp Object Error Symbol",
		toString = Object.prototype.toString;

	arr = str.split(' ');

	for ( ; i < arr.length; i++) {

		class2type["[object " + arr[i] + "]"] = arr[i].toLowerCase();
	}

	// null 和 undefined 直接判断出去
	if (obj == null) {
		return obj + '';
	}

	return (typeof obj === "object" || typeof obj === 'function') ?
			class2type[toString.call(obj)] || "object" : 
			typeof obj;		

}

//判断是否是函数
jq.isFunction = function(value) {
    return jq.type(value) === 'function';
}

//判断是不是数组
jq.isArray = function(value) {
    return jq.type(value) === 'array';
}

//判断是不是window
jq.isWindow = function(value) {
    return value != null && value == value.window;
}

// 判断对象是不是空的对象
jq.isEmptyObject = function(value) {
    var name;
    for (name in value) {
        return false;
    }

    return true

}




