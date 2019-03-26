//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        codeForm: {
            phone: null,
            code: null,
            disabled: true,
            codeDisabled: true,
            codeShow: true,
            time: 60
        },
    },
    // 手机号
    changePhone: function(e) {
        this.setData({
            'codeForm.phone': e.detail.value
        })
        // 验证码
        if (e.detail.value.length == 11) {
            this.setData({
                'codeForm.codeDisabled': false
            })
            if (this.data.codeForm.code && this.data.codeForm.code.length == 6) {
                this.setData({
                    'codeForm.disabled': false
                })
            }
        } else {
            this.setData({
                'codeForm.disabled': true,
                'codeForm.codeDisabled': true
            })
        }
    },
    // 验证码
    changeCode: function(e) {
        this.setData({
            'codeForm.code': e.detail.value
        })
        if (e.detail.value.length == 6) {
            if (this.data.codeForm.phone && this.data.codeForm.phone.length == 11) {
                this.setData({
                    'codeForm.disabled': false
                })
            }
        }else{
            this.setData({
                'codeForm.disabled': true
            })
        }
    },
    // 获取验证码
    getCode: function(e) {
        if (!e.currentTarget.dataset.status) {
            app.$http.post('auth/v1/captcha/send', { phone: this.data.codeForm.phone }).then(res => {
                if(res.success){
                    wx.showToast({ title: '验证码发送成功' });
                
                    this.countDown(this.data.codeForm.time);
                }
                
            })
        }
    },
    // 到计时
    countDown: function(time) {
        if (time == 0) {
            this.setData({
                'codeForm.codeShow': true,
                'codeForm.time': 60
            })
            return;
        } else {
            this.setData({
                'codeForm.codeShow': false,
                'codeForm.time': time--
            })
        }
        setTimeout(() => {
            this.countDown(time);
        }, 1000)
    },
    // 验证码登录
    codeFormSubmit: function(e) {
        let data = {
            mobileCaptcha: this.data.codeForm.code,
            account: this.data.codeForm.phone
        };
        app.$http.post('auth/v1/password/prepareReset', data).then(res => {
            if(res.success){
                // console.info('重置密码', res.data);

                wx.navigateTo({
                    url: "../../signInUp/setPass/index?voucherCode="+ res.data.voucherCode
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
