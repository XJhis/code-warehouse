var shopObj = [
	{
		active: false,
		imgUrl: 'imgs/phone.jpg',
		title: '苹果7【12期分期送壳膜】Apple/苹果 iPhone 7 全网通国行4G手机',
		describe: '赠送： 12期分期 送壳膜 正品国行',
		price: 5000,
		number: 1,
		total: 5000*1,
		link: 'http://www.baidu.com'
	},
	{
		active: true,
		imgUrl: 'imgs/clothe.jpg',
		title: '太平鸟男装 2017秋季黑色个性刺绣磨破外套宽松牛仔夹克',
		describe: '满2件,包邮；满2件,包邮',
		price: 399,
		number: 1,
		total: 399*1,
		link: 'http://www.baidu.com'
	},
	{
		active: false,
		imgUrl: 'imgs/pc.jpg',
		title: 'Lenovo/联想 拯救者 R720-15IKB游戏笔记本四核手提电脑15.6英寸',
		describe: '电竞游戏专用机型收藏下单赠5件套',
		price: 5298,
		number: 1,
		total: 5298*1,
		link: 'http://www.baidu.com'
	},
	{
		active: true,
		imgUrl: 'imgs/shoes.jpg',
		title: '烫社交女鞋银色闪钻亮片细跟尖头高跟鞋婚鞋女伴娘鞋宴会单鞋17新',
		describe: '你需要一双好鞋',
		price: 699,
		number: 2,
		total: 699*2,
		link: 'http://www.baidu.com'
	}
]

//默认都选中
// for (var i = 0; i < shopObj.length; i++) {
// 	shopObj[i].active = true;
// }

shopObj.forEach(function(value, key) {
	value.active = true;
})
var isChooseAll = true;

var app = new Vue({
	el: '#app',
	data: {
		shop: shopObj,
		key: 0,
		titleText: '删除',
		contText: '您确定删除该商品吗？',
		showConfirm: false,
		chooseAll: isChooseAll
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
	methods: {
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

			let thisChoose = this.chooseAll;

			this.shop.forEach(function(value, key) {
				value.active = thisChoose;	
			})

			// for (var i = 0; i < this.shop.length; i++) {
			// 	this.shop[i].active = this.chooseAll
			// }

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