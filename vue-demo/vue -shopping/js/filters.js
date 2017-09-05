Vue.filter("formatMoney", function(value, num, text) {

	return '￥'+value.toFixed(num) + text
})