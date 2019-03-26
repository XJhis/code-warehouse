// pages/resume/operating/refuse/index.js
//获取应用实例
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        placeHolder: "例如：该候选人的项目经验虽然是做现金贷产品的，方向上和职位是符合的，但是该项目级别太小，才几百万，我们需要招一个有上亿流水项目经验的候选人。",
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
        let params = app.$trim(e.detail.value.content);
        if(!params){
            wx.showToast({
                title: '请先填写拒绝理由',
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
            refuseReason: params
        };

        app.$http.post('candidate/v1/interview/refuse', data).then(res => {
            if(res.success){
                wx.showToast({title: '拒绝成功'});
                // 埋点
                app.$handleBury({evt: 'hx5a'});
                
                setTimeout(() => {
                    wx.navigateTo({ url : `../evalM/index?candidateId=${this.data.query.candidateId}` });   
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
        app.$handleBury({evt: 'hx5'});
        
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
