	
// 多选按钮组-全部、取消全部
// const cityOptions = ['上海', '北京', '广州', '深圳'];
// var app = new Vue({
// 	el: '#app',
// 	data: {
// 		checkAll: false,
// 		cities: cityOptions,
// 		checkedCities: ['上海', '北京'],
// 		isIndeterminate: true
// 	},
// 	methods: {
// 		handleCheckAllChange(val) {
// 			console.log('点击全部事件', val)
// 	        this.checkedCities = val ? cityOptions : [];
// 	        this.isIndeterminate = false;
//       	},
//       	handleCheckedCitiesChange(value) { //value值为v-model的值
//       		console.log('单个点击', value)
//       	  let checkedCount = value.length;
//       	  this.checkAll = checkedCount === this.cities.length;
//       	  this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
//       	}

// 	}
// })

// var app = new Vue({
// 	el: '#app',
// 	data: {
// 		checkedCities1: ['上海'],
// 		cities: ['上海', '北京', '广州', '深圳', '武汉']
// 	},

// })

var app = new Vue({
	el: '#app',
	data: {
		input2: '让人作呕',
		textarea: '为什么有这样的人啊',
		num1: 2
	},
	methods: {
		querySearch() {
			console.log('触发事件')
		},
		handleChange() {
			console.log('改变了')
		},
	}

})

  
