// pages/resume/operating/InterviewAddress/index.js
const { $Toast } = require('../../../../components/base/index');

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        moreAddress: '',
        region: ['请选择'],
    },
    bindRegionChange: function(e) {

        this.setData({
            region: e.detail.value
        })
    },
    //表单处理
    submitForm(e) {
        const params = e.detail.value;

        if (this.checkForm(params)) {
            let tt = params.region.reduce((res, val) => {
                return res + val;
            });

            let address = tt + params.moreAddress;

            var pages = getCurrentPages();
            // var currPage = pages[pages.length - 1]; //当前页面
            var prevPage = pages[pages.length - 2]; //上一个页面

            //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去            

            prevPage.setData({
                ['info.proposeAddress']: address
            });

            wx.navigateBack({
                delta: 1
            })

        }
    },
    //表单验证
    checkForm(data) {
        let text;

        if (data.region[0] === "请选择") {

            text = "请先选择面试地址";
        } else if (!data.moreAddress) {

            text = "请先填写详细地址";
        }

        if (text) {
            $Toast({
                content: text,
                type: 'error'
            });

            return false;
        } else {
            return true;
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        this.setData({
            moreAddress: options.address
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

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

})
