var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi;

function fcamelCase(all, letter) {
    //将传进来的字母转为大写
    return letter.toUpperCase();
}

//例子：将css里面的background-color: #fff ==> backgroundColor: #fff;
function camelCase(string) {
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
}