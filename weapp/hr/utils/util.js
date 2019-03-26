import md5 from "md5.js";

// 本地存储
const local = {
    get: key => { //获取
        return wx.getStorageSync(key)
    },
    set: (key, data) => { //设置
        wx.setStorageSync(key, data)
    },
    remove: (key) => { //单个删除
        wx.removeStorageSync(key)
    },
    clear: (key) => { //清除所有
        wx.clearStorageSync()
    }

}
// 拷贝对象
const deepClone = (obj) => {
   let proto = Object.getPrototypeOf(obj);
   return Object.assign({},Object.create(proto),obj);
}

// 转一维对象
const aTo = (data) => {
    let obj = {};
    // 多维数组 转 一维
    function dataFormat(data) {
        for (let i = 0, j = data.length; i < j; i++) {
            let item = deepClone( data[i] );
            item.children = null;
            obj[item.code] = item;
            data[i].children && dataFormat(data[i].children);
        }

    }
    dataFormat(data);
    return obj;
}

const DATE = (date, fmt) => {
    if(!date){ return ''}
    var date = new Date(date*1);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
        }
    }
    return fmt;
}

// 去掉首尾空格
const trim = str => {
    console.log(str)

    if (typeof str != 'string') {
        return '';
    }
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

//保留小数（不四舍五入）
const savePoint = (number, amount) => {
    var str = '',
        amount = amount ||0,
        result;

    if (typeof + number !== 'number') {
        return number;
    }

    if (amount<0) {
        return number;
    }

    str = number + '';

    if (str.lastIndexOf('.') == -1) {

        return number;
    } else {

        result = +str.substring(0, str.lastIndexOf('.') + amount + 1);
        return result;
    }
}



module.exports = {
    local,
    deepClone,
    aTo,
    md5,
    DATE,
    trim,
    savePoint
}
