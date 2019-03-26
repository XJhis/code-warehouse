// pages/resume/operating/unConfirm/index.js
//获取应用实例
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        items: ['简历符合要求，请帮我约面试', '简历不符合要求，此人淘汰', '通过我的面试，可以进入复试', '通过我的面试，建议发offer', '没有通过我的面试'],
        query: {},
        
        count: 0
    },
    // 输入长度
    handleLen: function(e){
        this.setData({
            count: e.detail.value.length
        })
    },
    // 表单提交
    formSubmit(e) {
        let params = e.detail.value;
        // 埋点
        app.$handleBury({evt: 'hx15'});
        
        if(!params.radio && !params.content){
            wx.showToast({title: '请选择或者输入评价',icon: 'none'});
            return false;
        }
        if(e.detail.formId){
            app.addFormId(e.detail.formId);
        }

        let data = {...this.data.query};
        data.content = !params.radio ? params.content : !params.content ? params.radio : params.radio + ',' + params.content;

        app.$http.post('candidate/evaluate/v1/create', data).then(res => {
            if(res.success){
                wx.showToast({title: '评价成功'});
                // 埋点
                app.$handleBury({evt: 'hx15a'});
                
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
