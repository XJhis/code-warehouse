// pages/resume/operating/unConfirm/index.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: ['候选人已经通过初选，还想多考虑考虑', '由于一些原因，现在还没办法做决定','其他待定原因'],
        show: false,
        count: 0,
        query: {}
    },
    // 其他
    radioChange: function({detail}){
        this.setData({
            show: detail.value == 2
        })
    },
    // 输入长度
    handleLen: function(e){
        this.setData({
            count: e.detail.value.length
        })
    },
    formSubmit(e) {
        let params = e.detail.value;
        if(!params.radio || (params.radio == 2 && !params.content)){
            wx.showToast({
                title: '请选择或者输入待定理由',
                icon: 'none',
                duration: 2000
            });
            return false;
        }
        if(e.detail.formId){
            app.addFormId(e.detail.formId);
        }

        let data = {
            candidateId: this.data.query.candidateId,
            undeterminedReason: params.radio == 2 ? params.content : this.data.items[params.radio]
        };

        app.$http.post('candidate/v1/interview/undetermined', data).then(res => {
            if(res.success){
                wx.showToast({title: '待定成功'});
                // 埋点
                app.$handleBury({evt: 'hx8a'});
                
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
        app.$handleBury({evt: 'hx8'});
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
