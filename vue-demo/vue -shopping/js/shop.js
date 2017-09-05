
var app = new Vue({
	el: '#app',
	data: {
		shop: [],
		key: 0,
		titleText: '删除',
		contText: '您确定删除该商品吗？',
		showConfirm: false,
		chooseAll: false
	},
	computed: {
		//计算总价格
		allTotal: function() {
			var money = 0 ;
			this.shop.forEach(function(value, key) {

				if (value.active) {
					money = money + value.number*value.price;
				}
			})
			
			return money;
		}		
	},
	filters: {
		changeMoney: function(value) {
			return "'" + value + "'";
		}
	},
	mounted: function() {
		this.$nextTick(function() {
			app.getData();
		})
	},
	methods: {
		getData: function() {
			this.$http.get("data/list.json").then(res => {
				this.shop = JSON.parse(res.bodyText).data.list;
				this.totalMoney = JSON.parse(res.bodyText).data.totalMoney;
			})
		},
		//商品数量改变
		changeNum: function(key, type) {
			var add = type == 1 ? -1 : 1;

			if ( type==1 && this.shop[key].number <=0 ) {				
				return this.shop[key].number = 0;
			}

			this.shop[key].number =  this.shop[key].number + add;
			this.shop[key].total =  this.shop[key].number * this.shop[key].price;
		},
		chooseFn: function() {
			let all = true;
			this.shop.forEach(function(value, key) {
				if (!value.active) {
					all = false;
				}				
			})

			this.chooseAll = all
		},
		//全选、取消全选
		chooseAllFn: function() {

			/*es5 写法*/
			// let thisChoose = this.chooseAll;
			// this.shop.forEach(function(value, key) {
			// 	value.active = thisChoose;	
			// })	

			/*es6 箭头函数*/
			this.shop.forEach((value, key) => {
				value.active = this.chooseAll;	
			})			

		},		
		//删除商品
		showDelete: function(key) {
			this.key = key;			
			this.showConfirm = true;
		},
		//确定删除
		deleteFn: function() {
			this.showConfirm = false;
			this.shop.splice(this.key, 1); 

		},
		// 取消删除
		cancel: function() {
			this.showConfirm = false;
		}
	}

})