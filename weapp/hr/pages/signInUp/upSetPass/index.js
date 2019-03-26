// pages/signInUp/upSetPass/index.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        registerVoucher: '',
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
            registerVoucher: this.data.registerVoucher,
            password: app.$md5(this.data.pwd)
        };
        app.$http.post('account/v1/password/set', data).then(res => {
            if(res.success){
                let user = res.data;
                user.userType = 1;
                app.$local.set('user', res.data);
                wx.showToast({'title': '注册成功',success: function(){
                    wx.navigateTo({
                        url: "../../index/index?first=true"
                    })    
                }});
                
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (query) {
        this.setData({
            registerVoucher: query.registerVoucher
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
})
