// pages/share/index/index.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoading: false,
        list: [],
        pager: 1,
        noData: false,
        hasMore: true,
        tabIndex: 1,
        url: {
            1: 'candidate/transmit/v1/list',
            2: 'candidate/read/v1/list'
        }
    },
    //列表请求
    getList(val = {}) {        
        let data = Object.assign({page: 1, size: 20}, val);
        
        return app.$http.get(this.data.url[this.data.tabIndex], data).then((res) => {
            if (res.success) { 
                return res.data;                
            }
        }); 
    },
    //首次获取数据
    init() {
        //获取数据
        this.getList().then( data => {
            if (data) {
                if (!data.list.length) {
                    this.setData({ noData: true });
                }else{
                    this.setData({ 
                        list: data.list,
                        noData: false
                    });    
                }
                
            }

        });
    },
    tabChange(e){
        if(e.target.dataset.key != this.data.tabIndex){
            this.setData({
                pager: 1,
                hasMore: true,
                tabIndex: e.target.dataset.key
            })
            this.init();
        }
        
    },
    //下拉更新
    onPullDownRefresh() {
        //在标题栏中显示加载
        wx.showNavigationBarLoading();
        //获取数据
        this.getList().then( data => {
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
            page: ++this.data.pager
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
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.init();   
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    }
})
