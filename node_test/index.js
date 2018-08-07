let sayHello = require('./hello.js')

setTimeout(function () {
	console.log('定时触发')
})

process.nextTick(function() {
	console.log('process.nextTick触发')
})

console.log('直接触发')