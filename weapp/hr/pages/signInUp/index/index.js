// pages/login/login/index.js
//获取应用实例
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        query: {},
        loginType: 1,
        codeForm: {
            phone: null,
            code: null,
            disabled: true,
            codeDisabled: true,
            codeShow: true,
            time: 60
        },
        pwdForm: {
            phone: null,
            pwd: null,
            disabled: true,
            show: true
        }
    },
    // 切换登录方式
    changeLogin: function(e) {
        var type = e.currentTarget.dataset.type;
        this.setData({
            loginType: type
        })
    },
    // 手机号
    changePhone: function(e) {
        this.setData({
            'codeForm.phone': e.detail.value,
            'pwdForm.phone': e.detail.value
        })
        
        // 验证码登录
        if (e.currentTarget.dataset.status == 'code') {
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
        }
        if (e.currentTarget.dataset.status == 'pwd') {
            if (e.detail.value.length == 11) {
                this.setData({
                    'codeForm.codeDisabled': false
                })
                if (this.data.pwdForm.pwd && this.data.pwdForm.pwd.length >= 6) {
                    this.setData({
                        'pwdForm.disabled': false
                    })
                }
            } else {
                this.setData({
                    'pwdForm.disabled': true
                })
            }
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
        // console.info('条件');
        if (!e.currentTarget.dataset.status) {
            app.$http.post('auth/v1/captcha/send', { phone: this.data.codeForm.phone }).then(res => {
                if(res.success){
                    wx.showToast({ title: '验证码发送成功' });
                
                    this.countDown(this.data.codeForm.time);
                }
                
            })
        }
    },
    // 密码显示隐藏
    pwdShowHide: function(e){
        this.setData({
            'pwdForm.show': !this.data.pwdForm.show
        })
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
    // 密码登录
    changePwd: function(e){
        // console.info(e);
        this.setData({
            'pwdForm.pwd': e.detail.value
        })
        if (e.detail.value.length >= 6) {
            if (this.data.pwdForm.phone && this.data.pwdForm.phone.length == 11) {
                this.setData({
                    'pwdForm.disabled': false
                })
            }
        }else{
            this.setData({
                'pwdForm.disabled': true
            })
        }
    },
    // 验证码登录
    codeFormSubmit: function(e) {
        // console.info(this.data.codeForm);
        let data = {
            captcha: this.data.codeForm.code,
            phone: this.data.codeForm.phone
        };
        app.$http.post('auth/v1/captcha/login', data).then(res => {
            if(res.success){
                app.$local.set('user', {id: res.data.id});
                wx.showToast({'title': '登录成功'});
                let params = '';
                if(this.data.query.type){
                    params = '?type='+ this.data.query.type +'&candidateId='+ this.data.query.candidateId;
                }
                wx.navigateTo({
                    url: "../../index/index" + params
                })
            }
        })

    },
    // 密码登录
    pwdFormSubmit: function(e) {
        let data = {
            authorizeCode: this.data.pwdForm.pwd,
            loginName: this.data.pwdForm.phone
        };
        app.$http.post('auth/v1/login', app.pwdMd5(data)).then(res => {
            if(res.success){
                app.$local.set('user', {id: res.data.id});
                wx.showToast({'title': '登录成功'});
                let params = '';
                if(this.data.query.type){
                    params = '?type='+ this.data.query.type +'&candidateId='+ this.data.query.candidateId;
                }
                wx.navigateTo({
                    url: "../../index/index" + params
                })
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('登录', options);
        this.setData({
            loginType: options.loginType || 1,
            query: options
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

    }

})
