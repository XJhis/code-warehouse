// pages/resume/operating/oftter/index.js
const { $Toast } = require('../../../../components/base/index');

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        candidateId: '',
        info: {},
        commission: '',
        hrRemarkLeng: 0,
    },
    //查询信息
    getData(candidateId) {
        app.$http.get('candidate/v1/offer/info', { candidateId }).then((res) => {
            if (res.success) {
                this.setData({
                    info: res.data
                })

            }
        });
    },
    //输入年薪
    entrySalary(e) {
        let val = +e.detail.value;
        let info = this.data.info;

        if (info.commissionType == 1) {
            let money = +info.commissionPercent * val / 100;
            money = app.$savePoint(money, 1);
            this.setData({
                commission: money
            })
        }
        if (info.commissionType == 3) {
            let money = +info.commissionPercent * val / info.salaryMonth / 100;
            money = app.$savePoint(money, 1);
            this.setData({
                commission: money
            })
        }
    },
    remarkFn(e) {
        this.setData({
            hrRemarkLeng: e.detail.value.length || 0
        });
    },
    bindDateChange(e) {
        this.setData({
            ['info.getDate']: e.detail.value
        })
    },
    //表单验证
    submitForm(e) {
        const params = e.detail.value;

        if (this.checkForm(params)) {
            params.getDate = new Date(params.getDate.replace(/-/g, '/')).getTime()
            params.candidateId = this.data.candidateId;
            params.vip = this.data.info.vip;

            this.sendData(params); 
        }

    },
    //表单验证
    checkForm(data) {
        let text;
        if (!data.baseOfferSalary) {

            text = "请先填写Offer年薪";
        } else if (data.baseOfferSalary == '0') {

            text = "请输入大于0的年薪";
        } else if (this.data.info.commissionType == 1 && this.data.commission < 10000) {

            text = "预计佣金不能低于1万元";
        } else if (this.data.info.commissionType == 3 && this.data.commission < 2500) {

            text = "佣金不能低于2500元";
        } else if (!data.getDate) {

            text = "请先填写到岗日期";
        } else if (!data.contact) {

            text = "请先填写财务联系人";
        } else if (!data.contactPhone) {

            text = "请先填写联系人电话";
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
    //发送请求
    sendData(params) {
        if (params.vip===null) {
            delete params.vip;
        };


        app.$http.post('candidate/v1/offer', params, false, {}, true).then((res) => {
            if (res.success) {

                $Toast({
                    content: '发起Offer成功',
                    type: 'success'
                });
                // 埋点
                app.$handleBury({evt: 'hx2a'});
                
                setTimeout(() => {
                    wx.navigateTo({
                        url: `../evalOffer/index?candidateId=${this.data.candidateId}`
                    })
                }, 1000);

            }else{
                if(res.errCode == 16025){
                    wx.showModal({
                        content: '您当前会员权益已消失，不再享受折扣优惠（建议先充值会员再发offer可继续享受折扣优惠），确定继续发offer么？',
                        confirmColor: '#FF6B00',
                        confirmText: '确定继续',
                        cancelText: '返回',
                        success:  res => {
                            if(res.confirm){
                                this.data.info.vip = !this.data.info.vip;
                                params.vip = false;
                                this.sendData(params);
                            }
                        }
                    })
                }else if(res.errCode == 16026){
                    wx.showModal({
                        content: `您当前为会员客户，享受${this.data.info.discount*10}折优惠，确定发offer么？`,
                        confirmColor: '#FF6B00',
                        confirmText: '确定继续',
                        cancelText: '返回',
                        success:  res => {
                            if(res.confirm){
                                this.data.info.vip = !this.data.info.vip;
                                params.vip = true;
                                this.sendData(params);
                            }
                        }
                    })
                }else{
                    wx.showModal({
                        content: res.message,
                        showCancel: false,
                        confirmText: '我知道了',
                        confirmColor: '#FF6B00'
                    })
                }
            }
        });
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            candidateId: options.candidateId || '#1000198'
        });

        //TODO...
        this.getData(options.candidateId || '#1000198');
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
        app.$handleBury({evt: 'hx2'});
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
