// pages/resume/list/index.js
//获取应用实例
const app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        first: false,
        isTips: false,
        spinShow: true,
        topH: 0,
        isFixed: false,
        isLoading: false,
        list: [],
        pager: 1,
        noData: false,
        hasMore: true,
        activeSatus: 99,
        recomStatus: {
            '+99': {name: '全部'},
            '+3': {name: '新推荐'},
            '+6': {name: '发起初试'},
            '+8': {name: '猎头确认'},
            '+16': {name: '人选确认'},
            '+15': {name: '发起复试'},
            '+10': {name: 'offer'},
            '+12': {name: '入职'},
            '+14': {name: '过保'}
        }
    },
    // 关闭第一次弹窗
    closeFirst(){
        app.globalData.first = false;

        this.setData({
            first: app.globalData.first
        })

    },
    //列表请求
    getList(val = {}) {        
        let data = Object.assign({page: 1, size: 20}, val);

        return app.$http.get('candidate/v1/list', data).then((res) => {
            if (res.success) { 
                return res.data;                
            }
        });
    },
    //计算各推荐状态的数量
    countStatus(arr) {
        let result = this.data.recomStatus;

        if (!arr.length) { return result };

        arr.forEach( val => {
            if ( result['+'+val.key] ) {                
                result['+'+val.key].num = val.num||0;
            }            
        })
        return result;
    },
    //首次获取数据
    init() {
        //获取数据
        this.getList({recommendStatus: this.data.activeSatus}).then( data => {
            if (data) {

                //设置数量
                this.setData({
                    recomStatus: this.countStatus(data.countStatistic)  
                })

                if (!data.list.length) {
                    this.setData({ noData: true });
                    return false; 
                }

                this.setData({ 
                    list: data.list
                });

                this.setData({
                    spinShow: false
                })
            }

        });
    },    
    //状态筛选
    selectStatus({ detail }){
        
        let id = +detail.key;

        this.setData({
            activeSatus: id,
            noData: false,
            hasMore: true,
            list:[],
            pager:1
        });

        //获取数据
        this.getList({recommendStatus:id, page: 1}).then( data => {
            if (data) {

                //设置数量
                this.setData({
                    recomStatus: this.countStatus(data.countStatistic)  
                })

                if (!data.list.length) {
                    this.setData({ noData: true });
                    return false; 
                }

                this.setData({
                    list: data.list,
                    hasMore: true,                      
                });

                
            }

        });
    },
    // 设置高度
    setHeight: function(){
        wx.createSelectorQuery().select('.resume-top').boundingClientRect((res) => {
            this.setData({
                topH : res.height
            })
            
        }).exec()
    },
    //页面滚动触发
    onPageScroll(e) {
        let scrollTop = e.scrollTop;
        if(scrollTop >= this.data.topH){
            if(!this.data.isFixed){
                this.setData({isFixed: true})    
            }
        }else{
            if(this.data.isFixed){
                this.setData({isFixed: false})    
            }
            
        }
        
    },
    //下拉更新
    onPullDownRefresh() {
        //在标题栏中显示加载
        wx.showNavigationBarLoading();
        //获取数据
        this.getList({recommendStatus: this.data.activeSatus}).then( data => {
            if (data) {
                if (!data.list.length) {
                    this.setData({ noData: true });
                }else{
                    this.setData({
                        list: data.list,
                        noData: false
                    });
                }

                this.setData({
                    pager: 1,
                    hasMore: true,                    
                    recomStatus: this.countStatus(data.countStatistic)
                })

                wx.hideNavigationBarLoading() //完成停止加载
                wx.stopPullDownRefresh() //停止下拉刷新
                
            }

        });
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        let params = {};

        if (!this.data.hasMore) return;  

        this.setData({
            isLoading: true
        })

        params = {
            page: ++this.data.pager, 
            recommendStatus: this.data.activeSatus
        }

        this.getList(params).then( data => {
            if (data) {
                if (!data.list.length) {
                    this.setData({
                        hasMore: false
                    })
                }else {
                    this.setData({
                        list: this.data.list.concat(data.list)
                    }) 
                }

                this.setData({
                    isLoading: false,
                    pager: params.page
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let user = app.$local.get('user');
        this.setData({
            id: user.id,
            first: app.globalData.first
        })
        this.init();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.setHeight();
    },
    //打电话
    makeCall(e) {
        wx.makePhoneCall({
          phoneNumber: e.target.dataset.phone
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let user = app.$local.get('user');
        this.setData({
            id: user.id
        })
        user.id && app.$http.get('company/v1/status').then((res) => {
            if (res.success) { 
                this.setData({
                    isTips: !res.data.auditResult
                })                     
            }
        });
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    }
})
