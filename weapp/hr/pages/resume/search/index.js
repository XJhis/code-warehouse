// pages/resume/search/index.js

//获取应用实例
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        queryParam:'',
        history: [],
        list: [],
        pager: 1,
        noData: false,
        hasMore: true,
        isLoading: false,
    },
    //取历史记录
    getHistory() {
        let data = app.$local.get('searchHistory');

        if (data.length>10) {
            data = data.slice(0, 10);
        } 
        
        data && this.setData({
            history: data
        })

    },
    //存历史记录
    setHistory(val) {
        let data = app.$local.get('searchHistory') || [],
            index = data.indexOf(val);

        if (index>-1) {
            data.splice(index, 1)
        }

        data.unshift(val);  

        if (data.length>10) {
            data = data.slice(0, 10);
        }      

        app.$local.set('searchHistory', data);

    },
    //删除历史
    removeHis() {
        app.$local.remove('searchHistory');
        this.setData({
            history: []
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
    //手动输入
    confirmSearch(event) {
        let text = app.$trim(event.detail.value);

        this.search(text);
    },
    //搜索数据
    search(text) {   
        this.setData({
            list: []
        })    

        //存历史
        text && this.setHistory(text);

        console.log('搜索', this.data.id);

        this.getList({queryParam: text}).then(data => {
            if (data) {
                if (!data.list.length) {
                    this.setData({ noData: true,  history: [],});
                    return false; 
                }

                this.setData({ 
                    history: [],
                    list: data.list,
                    noData: false                    
                });
                
            }
        })

    },
    tapHis(event) {
        let text = event.currentTarget.dataset.text;
        this.setData({
            queryParam: text
        })

        this.search(text);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let user = app.$local.get('user');
        this.setData({
            id: user.id
        })
        this.getHistory();
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

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

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
    
})
