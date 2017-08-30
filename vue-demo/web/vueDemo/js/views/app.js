
var storage = {
	set: function(key, item) {
		localStorage.setItem( key, JSON.stringify(item) );
	},
	get: function(key) {
		return  JSON.parse( localStorage.getItem(key) ) || [];
	}
}

var filterListObj = {
	all : function(list) {
		return list;
	},
	unFinished : function(list) {
		return list.filter(function(item){
			return !item.isChecked;
		})
	},
	finished : function(list) {
		return list.filter(function(item){
			return item.isChecked;
		})
	},
}

var list = storage.get('myVue-makeTask');


var vm = new Vue({
	el: '#app',
	//初始双绑数据
	data: {
		list: list,
		inputText: '',
		editText: '',
		status: 'all' //状态
	},
	//监控变量
	watch: {
		// list: function(newVal, oldVal) {	//浅度监控
		// 	// 好像newVal == oldVal
		// 	storage.set('myVue-makeTask', newVal)
		// }

		// 深度监控
		list: {
			handler: function(arg1) {
				storage.set('myVue-makeTask', arg1)
			},
			deep: true
		}
	},
	// 计算属性
	computed: {
		nodo: function() {
			console.log(666)
			return (this.list.filter(function(item) {
				return !item.isChecked
			}).length)	
		},
		filterList: function() {
			return filterListObj[this.status] ? filterListObj[this.status](this.list) : this.list
		},
		nowTime: function() {
			return Date.now();
		}
	},
	//事件方法
	methods: {
		//同计算属性一样
		unFinishedTask:function() {
			return (this.list.filter(function(item) {
				return !item.isChecked
			}).length)
		},

		//添加任务;
		addTask(event) {
			var list = this.list;

			list.push({
				title: this.inputText,
				isChecked: false,	
				isEdit: false
			})

			this.inputText = '';
		},	
		//删除任务
		delTask(key) {
			this.list.splice(key,1)
		},
		//编辑任务
		editTask(key, event) {
			this.editText = this.list[key].title;
			this.list[key].isEdit = true;	
		},
		finishTask(key) {
			console.log('成功')
			this.list[key].isEdit = false;
			this.list[key].title = this.editText;
			this.editText = '';
		},
		cancelTask(key) {
			console.log('取消')
			this.list[key].isEdit = false;
			this.editText = '';
		}
	},
	//自定义指令
	directives: {
		'focus': {
			update: function(el, binding) {
				binding.value && el.focus();
			}
		}
	}
})

// window.location.hash

// console.log(window.location.hash)
function hashChange() {
	vm.status =  window.location.hash.slice(1);
}

hashChange();


window.addEventListener( 'hashchange', hashChange )
