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
        type: 0,
    },
    //查询信息
    getData(candidateId) {
        app.$http.get('candidate/v1/offer/info', { candidateId }).then((res) => {
            if (res.success) {
                if (!this.data.type) {
                    res.data.getDate = '';
                }

                let info = res.data;

                info.ss = (info.baseOfferSalary+info.supplyOfferSalary)*info.commissionPercent/100; 
                
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
    submitForm() {
        let date = this.data.info.getDate;

        if (!date) {
            $Toast({
                content: "请先填写到岗日期",
                type: 'error'
            });
            return false;
        }
        
        let params = {};

        params.getDate = new Date(date.replace(/-/g,'/')).getTime() 
        params.candidateId = this.data.candidateId;

        


        this.sendData(params);

    },    
    //发送请求
    sendData(params) {

        app.$http.post('candidate/v1/entryDate/modify', params).then((res) => {
            if (res.success) {
                $Toast({
                    content: '修改成功',
                    type: 'success'
                });

                app.$handleBury({evt: 'hx12a'});

                setTimeout(()=> {
                    wx.navigateBack({
                        delta: 1, // 回退前 delta(默认为1) 页面 
                        success: function(res) {                         
                        }                    
                    })
                }, 1000);
                
            }
        });
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        
        if (options.type==1) {
            wx.setNavigationBarTitle({
              title: '查看Offer'
            });
            this.setData({
                type: 1
            })
        }
        this.setData({
            candidateId: options.candidateId
        });

        //TODO...
        this.getData(options.candidateId);
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
        if(this.data.type == 1){
            app.$handleBury({evt: 'hx10'});
        }else{
            app.$handleBury({evt: 'hx12'});
        }
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
