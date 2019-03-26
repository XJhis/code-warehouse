//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        voucherCode: '',
        pwd: null,
        disabled: true,
        show: false
    },
    // 密码显示隐藏
    pwdShowHide: function(e){
        this.setData({
            show: !this.data.show
        })
    },
    // 密码登录
    changePwd: function(e){
        this.setData({
            pwd: e.detail.value
        })
        if (e.detail.value.length >= 6) {
            this.setData({
                disabled: false
            })
        }else{
            this.setData({
                disabled: true
            })
        }
    },
    // 表单
    formSubmit: function(e) {
        let data = {
            voucherCode: this.data.voucherCode,
            password: app.$md5(this.data.pwd)
        };
        app.$http.post('auth/v1/password/reset', data).then(res => {
            if(res.success){
                wx.showToast({'title': '设置成功'});
                wx.navigateTo({
                    url: "../../signInUp/index/index?loginType=2"
                })
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(query) {
        this.setData({
            voucherCode: query.voucherCode
        })
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

    }
})
