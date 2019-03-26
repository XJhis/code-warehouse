// pages/signInUp/up/index.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        codeForm: {
            companyName: null,
            phone: null,
            // companyName: '快仓科技1',
            // phone: 18261372731,
            code: null,
            disabled: true,
            codeDisabled: true,
            codeShow: true,
            time: 60
        },
    },
    // 手机号
    changeData: function(e) {
        
        let name = e.target.dataset.name;
        if(name == 'companyName'){
            this.setData({
                ['codeForm.'+ name] : e.detail.value.trim()
            })
        }else{
            this.setData({
                ['codeForm.'+ name] : e.detail.value
            })    
        }
        
        let btn = true;
        // 当前数据
        if (this.data.codeForm.companyName && this.data.codeForm.companyName.length > 0) {
            btn = false;
        } 
        // 手机
        if (!btn && this.data.codeForm.phone && this.data.codeForm.phone.length == 11) {
            this.setData({
                'codeForm.codeDisabled': btn
            })
        }else{
            btn = true;
            this.setData({
                'codeForm.codeDisabled': btn
            })
        }
        // 验证码
        if (btn || !this.data.codeForm.code || this.data.codeForm.code.length != 6) {
            btn = true;
        }

            
        this.setData({
            'codeForm.disabled': btn
        })
    },
    // 获取验证码
    getCode: function(e) {
        if (!e.currentTarget.dataset.status) {
            let data = {
                companyName: this.data.codeForm.companyName,
                phone: this.data.codeForm.phone
            };

            app.$http.get('account/v1/register/check', data).then(res => {
                console.log('验证码',res);
                if(res.success){
                    return true;
                }
                
            }).then(res => {
                app.$http.post('account/v1/captcha/send', { phone: data.phone }).then(res => {
                    if(res.success){
                        wx.showToast({ title: '验证码发送成功' });
                    
                        this.countDown(this.data.codeForm.time);
                    }
                    
                })    
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
    // 下一步
    codeFormSubmit: function(e) {
        let data = {
            companyName: this.data.codeForm.companyName,
            phone: this.data.codeForm.phone,
            validateCode: this.data.codeForm.code
        };
        app.$http.post('account/v1/register/save', data).then(res => {
            if(res.success){
                console.log('下一步', res.data);
                wx.navigateTo({
                    url: "../../signInUp/upSetPass/index?registerVoucher="+ res.data
                })
            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options.phone){
            this.setData({
                'codeForm.phone': options.phone
            })    
        }
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

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
})
