// pages/resume/operating/giveup/index.js
const { $Toast } = require('../../../../components/base/index');
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        count: 0,
        query: {}
    },
    // 输入长度
    handleLen: function(e){
        this.setData({
            count: e.detail.value.length
        })
    },
    formSubmit(e) {
        if(e.detail.formId){
            app.addFormId(e.detail.formId);
        }
        let params = app.$trim(e.detail.value.content);

        if(!params){
            $Toast({
                content: '请填写放弃Offer理由',
                type: 'error'
            });
            return false;
        }

        let data = {
            candidateId: this.data.query.candidateId,
            reason: params
        };

        app.$http.post('candidate/v1/offer/refuse', data).then(res => {
            if(res.success){
                $Toast({
                    content: '放弃上岗成功',
                    type: 'success'
                });
                // 埋点
                app.$handleBury({evt: 'hx11a'});
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1
                    })    
                }, 1000);
                
            }
        });
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(query) {
        this.setData({
            query: query
        }); 
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
        // 埋点
        app.$handleBury({evt: 'hx11'});
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
