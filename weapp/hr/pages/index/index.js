// pages/signInUp/index/index.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hidden: false,
        show: false,
        userShow: true,
        query: {},
        isFirst: true,
        isShare: false,
        share: {
            title: '猎你网',
            path: '/pages/index/index',
            imageUrl: '/assets/img/share.png'     
        }
    },
    // 切换账号密码登录
    pwdSign: function(){
        let params = '';
        if(this.data.query.type){
            params = '?type='+ this.data.query.type +'&candidateId='+ this.data.query.candidateId;
        }
        wx.navigateTo({
            url: "../signInUp/index/index" + params
        })
    },
    // 显示切换
    showSign: function(){
        this.setData({show: true});
    },
    hideSign: function(){
        this.setData({show: false});  
    },    
    // 直接注册
    showSignUp: function(){
        // 埋点
        app.$handleBury({evt: 'hx16'});
        wx.navigateTo({
            url: "/pages/signInUp/up/index"
        })
    },
    // 用户授权手机号
    getPhoneNumber: function(e){
        let data = {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
        }
        // TODO
        // if(this.data.query.type != 'share'){
        //     wx.navigateTo({
        //         url: "../signInUp/up/index?phone=18261372735"
        //     })
        //     return false;
        // }

        if(data.iv){
            // 手机号授权
            app.$http.post('auth/v1/phone/accredit', data).then(res => {
                if (res.success) {
                    let user = app.$local.get('user');

                    if(this.data.query.type != 'share' && res.data.userType == 3){
                        wx.navigateTo({
                            url: "../signInUp/up/index?phone=" + res.data.phone
                        })
                        return false;
                    }

                    if(user){
                        user.id = res.data.id;
                    }else{
                        user = {id: res.data.id, phone: res.data.phone};
                    }

                    app.$local.set('user', user);
                    // 详情可以回退到到列表
                    if(this.data.isFirst){
                        this.setData({ isFirst: false });
                    }
                    // 路由中转
                    this.middleRoute();
                }
            });    
        }
        
    },    
    // 路由中转
    middleRoute: function(params){
        let query = params || this.data.query;
        let user = app.$local.get('user');
        let id = user ? user.id : '';

        // 设置全局用户信息
        app.globalData.user = user;

        this.setData({
            isFirst: false,
            show: false
        });
        if(query.first){
            app.globalData.first = true;
            wx.switchTab({url: `../resume/list/index`});
            return false;
        }


        if(query.type == 'share'){
            wx.navigateTo({url: `../share/detail/index?candidateId=${query.candidateId}&sign=${query.sign}`});

        }else if(query.type == 'notice'){
            if(id){
                wx.navigateTo({url: `../resume/detail/index?candidateId=${query.candidateId}`});
            }else{
                wx.navigateTo({url: `../share/detail/index?candidateId=${query.candidateId}`});
            }
        }else if(query.type == 'sm'){
            wx.navigateTo({url: `../resume/detail/index?candidateId=${query.candidateId}`});
        }else {
            wx.switchTab({url: `../resume/list/index`});
        }
        return false;
    }, 
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(query) {


        
        // (#) 特殊处理
        if(query.candidateId && query.candidateId.indexOf('m') != -1){
            console.log('特殊处理');
            query.candidateId = query.candidateId.replace('m','#');
        }
        if(query.scene){
            let scene = decodeURIComponent(query.scene).split('&');
            let id = scene[0];
            console.log('scene', scene);
            this.setData({
                query: {
                    candidateId: scene[0],
                    type: scene[1]
                }
            })  
            if(scene[1] == 'am'){
                this.setData({
                    // scene=%23910253%26am
                    isShare: true,
                    share: {
                        title: '您有1份简历，点击查看',
                        path: '/pages/index/index?type=share&candidateId=' + id.replace('#','m'),
                        imageUrl: app.$baseUrl + 'candidate/transmit/v1/thumb?candidateId=' + scene[0].replace('#','%23')    
                    }
                });
                console.log('am', this.data.share);
                return false;
            }
        }else{
            this.setData({
                query: query
            })     
        }
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 token
                app.$http.get('auth/v1/link', { code: res.code }).then(res => {
                    if (res.success) {
                        // 存储token
                        app.$local.set('token', res.data);

                        let user = app.$local.get('user');
                        if(user){
                            user.userType = res.data.userType;
                            app.$local.set('user', user);
                        }
                        console.log('登录', 123);                        

                        // // 
                        // if(res.data.isLogin){
                        //     this.setData({ hidden: false})
                        //     return !(res.data.userType == 3);
                        // }else{
                        //     this.setData({ hidden: true})
                        // }

                        //**************
                        //1.1.6.1临时修改   
                        //**************                    

                        // 游客身份上次没走完下次就重新走
                        if (res.data.userType == 3) {
                            this.setData({ hidden: true });
                            return false;
                        }

                        // 
                        if (res.data.isLogin) {
                            this.setData({ hidden: false });
                            return true;
                        } else {
                            this.setData({ hidden: true });
                            return false;
                        }

                        
                    }
                }).then(res => {
                    // 获取用户信息
                    res && this.middleRoute();
                })

            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
    	// console.log('getCurrentPages:',getCurrentPages())
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // 判断是否要到到首页
        if(!this.data.isFirst){
            this.middleRoute({});
        }
         
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function(obj) {
        
        return this.data.share;
    }
})
