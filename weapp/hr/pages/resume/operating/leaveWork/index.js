// pages/resume/operating/giveup/index.js
const { $Toast } = require('../../../../components/base/index');

const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: '',
        
        count: 0,
        query: {}
    },
    bindDateChange(e) {
        this.setData({
            date: e.detail.value
        })
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
        let params = e.detail.value;
        
        if(!params.unGuaranteedTime){
            $Toast({
                content: '请先填写离职时间',
                type: 'error'
            });
            return false;
        }
        if(!params.reason){
            $Toast({
                content: '请先填写离职理由',
                type: 'error'
            });
            return false;
        }



        let data = {
            candidateId: this.data.query.candidateId,
            reason: params.reason,
            unGuaranteedTime: new Date(params.unGuaranteedTime.replace(/-/g,'/')).getTime() 
        };


        app.$http.post('candidate/v1/unGuaranteed', data).then(res => {
            if(res.success){
                $Toast({
                    content: '操作成功',
                    type: 'success'
                });

                app.$handleBury({evt: 'hx13a'});
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
        app.$handleBury({evt: 'hx13'});
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
