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
    },
    //查询信息
    getData(candidateId) {
        app.$http.get('candidate/v1/offer/info', { candidateId }).then((res) => {
            if (res.success) {
                
                let info = res.data;
                info.ss = (info.baseOfferSalary+info.supplyOfferSalary)*info.commissionPercent/100; 
                info.getDate = '';

                this.setData({
                    info: info
                })

            }
        });
    },
        
    bindDateChange(e) {
        this.setData({
            ['info.getDate']: e.detail.value
        })
    },
    //表单验证
    submitForm(e) {
        let date = this.data.info.getDate;
        let info = this.data.info;

        if (!date) {
            $Toast({
                content: "请先填写到岗日期",
                type: 'error'
            });
            return false;
        }
        
        let params = {};

        params.entryTime = new Date(date.replace(/-/g,'/')).getTime() 
        params.candidateId = this.data.candidateId;

        if(!info.discount){
           this.sendData(params); 
        }else{
            let content = '';
            if(info.surplusAmount){
                if((info.surplusAmount - info.discountReward) > 0){
                    content = '当前余额充足，本订单享受'+ info.discount*10 +'折优惠，确定后将扣除折后款项'
                }else if((info.surplusAmount - info.discountReward) == 0){
                    content = '当前余额充足，本订单享受'+ info.discount*10 +'折优惠，确定后将扣除折后款项,但服务费扣除后充值的余额为0元，会员权益折扣优惠将消失（建议先充值再操作入职可保留优惠），确定继续么？'
                }else{
                    content = '当前余额不足，本订单享受'+ info.discount*10 +'折优惠，确定后将扣除全部余额，剩余'+ (info.discountReward - info.surplusAmount) +'元请在15天内补上，本订单可依旧享受折扣优惠，扣除后会员将消失（建议先充值升级会员后，再操作到面），确定继续么？'
                }
            }else{
                content = '当前余额为0，本订单不享受折扣优惠（建议先充值再确认上岗可继续享受折扣优惠），确定继续确认上岗么？'   
            }               

            params.surplusAmount = info.surplusAmount || 0;                    

            wx.showModal({
                content: content,
                confirmColor: '#FF6B00',
                confirmText: '确定继续',
                cancelText: '返回',
                success:  res => {
                    if(res.confirm){
                        this.sendData(params);
                    }
                }
            })
        }

    },    
    //发送请求
    sendData(params) {

        app.$http.post('candidate/v1/offer/confirm', params, false, {}, true).then((res) => {
            if (res.success) {
                $Toast({
                    content: '确认上岗成功',
                    type: 'success'
                });
                // 埋点
                app.$handleBury({evt: 'hx9a'});                

                setTimeout(()=> {
                    wx.navigateBack({
                        delta: 1, // 回退前 delta(默认为1) 页面 
                        success: function(res) {                         
                        }                    
                    })
                }, 1000);
                
            }else {
                if(res.errCode == '16027') {

                    this.getData(this.data.candidateId);                    
                    $Toast({
                        content: '余额有变化，请重新确认',
                        type: 'error'
                    });
                }else {
                    $Toast({
                        content: res.message,
                        type: 'error'
                    });
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
        this.getData(options.candidateId||'#1000198');
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
        app.$handleBury({evt: 'hx9'});
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
