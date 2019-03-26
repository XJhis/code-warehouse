// pages/download/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    copyUrl: function() {
        wx.setClipboardData({
            data: 'https://www.lieni.com/api/mobile/v1/download/app',
            success(res) {
                wx.getClipboardData({
                    success(res) {
                        // console.log(res.data) // data
                    }
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
