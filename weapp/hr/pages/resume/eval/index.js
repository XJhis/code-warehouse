// pages/resume/eval/index.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eval: [],
  },

  /*
    方法
  */

  //获取评价
  getEval(candidateId) { 
    let params = {
        candidateId,
        size: 100
    }   
    app.$http.get('candidate/evaluate/v1/list', params).then((res) => {
        if (res.success) { 
            if (res.data.pager.totalResults) {
                this.setData({
                    eval: res.data.list
                })
            }
                      
        }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getEval(options.candidateId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})
