// pages/resume/operating/oftterEvaluation/index.js
const { $Toast } = require('../../../../components/base/index');
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        starIndex1: 0,
        starIndex2: 0,
        starIndex3: 0,
        count: 0,
        query: {}
    },
    onChange1(e) {
        this.setData({
            'starIndex1': e.detail.index
        })
    },
    onChange2(e) {
        const index = e.detail.index;
        this.setData({
            'starIndex2': e.detail.index
        })
    },
    onChange3(e) {
        this.setData({
            'starIndex3': e.detail.index
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

        if(!this.data.starIndex1){
            $Toast({
                content: '请先填写顾问推荐质量',
                type: 'error'
            });
            return false;
        }
        if(!this.data.starIndex2){
            $Toast({
                content: '请先填写顾问服务质量',
                type: 'error'
            });
            return false;
        }
        if(!this.data.starIndex3){
            $Toast({
                content: '请先填写交付经理服务质量',
                type: 'error'
            });
            return false;
        }

        let data = {
            candidateId: this.data.query.candidateId,
            evaluation: params.evaluation || '',
            recommendQuality: this.data.starIndex1,
            serviceQuality: this.data.starIndex2,
            pamServiceQuality: this.data.starIndex3
        };


        app.$http.post('hr/evaluation/v1/gw/add', data).then(res => {
            if(res.success){
                $Toast({
                    content: '评价成功',
                    type: 'success'
                });
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 2
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
        app.$http.get('candidate/details/v1/gw/info', {candidateId: query.candidateId}).then(res => {
            if(res.success){
                this.setData({
                    name: res.data.pamName
                })
            }
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
        wx.navigateBack({ 
          delta: 1,          
        })
    }
})
