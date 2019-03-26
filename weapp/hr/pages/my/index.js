// pages/my/index.js
//获取应用实例
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isSign: true,
        id: '',
        user: app.globalData.user,
        statisic: {},
        is: false
    },
    // 退出
    logout: function(){
        wx.showModal({
            content: '是否退出当前账号',
            confirmColor: '#FF6B00',
            success: function(res){
                if(res.confirm){
                    app.$http.get('auth/v1/logout').then(res => {
                        app.$local.remove('user');
                        app.$local.remove('token');
                        app.globalData.user = null;
                        wx.reLaunch({
                            url: "../index/index"
                        });    
                    })
                    
                }
            }
        })
    },
    // 转发
    forwarding: function(){
        wx.navigateTo({
            url: "../share/index/index"
        })
    },
    // 用户信息
    updataUserInfo: function(){
        // 授权就更新 没 授权直接进行下一步
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            let data = {
                                encryptedData: res.encryptedData,
                                iv: res.iv
                            }
                            app.$http.post('auth/v1/info/accredit', data, true).then(res => {
                                if (res.success) {
                                    // 保存用户信息用于个人中心使用
                                    app.$local.set('user', res.data);
                                    app.globalData.user = res.data;
                                    this.setData({user: res.data});

                                }
                            });
                        }
                    })
                    this.setData({isSign: true});
                }else{
                    this.setData({isSign: false});
                }
            }
        })
    },
    // 用户授权信息
    getUserInfo: function(e) {
        let data = {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
        } 
        if(data.iv){
            this.updataUserInfo();
        }
        
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
        let user = app.globalData.user;
        console.log('个人中心', user);
        this.setData({
            id: user.id,
            user: user
        })
        // 更新用户信息
        this.updataUserInfo();

        user.id && app.$http.get('user/v1/statisic').then(res => {
            if(res.success){
                this.setData({statisic: res.data});
            }
        });
        // 是否有新的转发信息
        app.$http.get('candidate/evaluate/v1/unread/count').then(res => {
            if(res.success){
                this.setData({is: res.data > 0});
            }
        })
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

    }
})
