const config = {
    moreBtnArr: {    
    	//新推荐	
    	'3': [
    		{name: '发起面试'},
    		{name: '发Offer'},
            {name: '简历拒绝'}
    	],
    	//简历拒绝
    	'4': [
    		{name: '发起面试'},
    		{name: '发Offer'}
    	],		
    	//评估中 
    	'5': [],
    	// "发起初试"
    	'6': [
    		{name: '发Offer'},
            {name: '修改面试'},
    		{name: '面试拒绝'}
    	],
    	// "面试拒绝"
    	'7': [
    		{name: '发起下轮面试'},
    		{name: '发Offer'}
    	],
    	// "猎头确认"
    	'8': [
    		{name: '发起下轮面试'},
            {name: '发Offer'},
            {name: '修改面试'},
            {name: '面试拒绝'},
            {name: '人选没来'},
            {name: '面试待定'}
    	],
    	// 面试待定
    	'9': [
    		{name: '发起下轮面试'},
    		{name: '面试拒绝'},
            {name: '发Offer'}
    	],
    	// Offer
    	'10':  [    		
    		{name: '确认上岗'},
    		{name: '查看Offer'},
            {name: '修改Offer'},
            {name: '放弃Offer'}
    	],
    	// 放弃Offer
    	'11': [    
    		{name: '确认上岗'},
    		{name: '查看Offer'}		
    	],
    	// 入职
    	'12': [    		
    		{name: '人选离职'},
    		{name: '查看Offer'}
    	],
    	// 上岗后离职
    	'13': [    		
    		{name: '查看Offer'}
    	],
    	// 已过保
    	'14': [    		
    		{name: '查看Offer'}
    	],
    	// 发起复试
    	'15': [   
    		{name: '发Offer'},
            {name: '修改面试'},
    		{name: '面试拒绝'}			
    	],
    	// 人选确认
    	'16': [
    		{name: '发起下轮面试'},
            {name: '发Offer'},
            {name: '修改面试'},
            {name: '面试拒绝'},
            {name: '人选没来'},
            {name: '面试待定'}
    	],
    	// 没来面试
    	'17': [
    		{name: '发起面试'},
    		{name: '发Offer'}
    	],
    	// 人选放弃
    	'18': []
    },
    btnPage: {
    	'发起面试': {
            url: 'startFace',
        },
        '发起下轮面试': {
    		url: 'startFace',
    	},
    	'修改面试': {
    		url: 'modifyFace',
    	},
    	'简历拒绝': {
    		url: 'refuse',
    	},
    	'面试拒绝': {
    		url: 'refuseM',
    	},
    	'面试待定': {
    		url: 'unConfirm',
    	},
    	'发Offer': {
    		url: 'offer',
    	},
    	'修改Offer': {
    		url: 'modifyOffer',
    	},
    	'查看Offer': {
    		url: 'modifyOffer',
    	},
    	'人选没来': {
    		url: '人选没来',
    	},
    	'确认上岗': {
    		url: 'confirmWork',
    	},
    	'放弃Offer': {
    		url: 'giveupWork',
    	},
    	'人选离职': {
    		url: 'leaveWork',
    	},

    }
}

export default config;
