// pages/resume/operating/initiateInterview/index.js
const { $Toast } = require('../../../../components/base/index');

const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        candidateId: '',
        info: {},
        timeType: 1,
        dateTime: null,
        dateTimeArray: null,
        startYear: 2000,
        endYear: 2050,
        hrRemarkLeng: 0,
        fillAddress: '',
    },
    //初始化时间
    initTime(dd) {
        // 获取完整的年月日 时分秒，以及默认显示的数组
        var ss = app.$date(dd, 'yyyy-MM-dd hh:mm');
        
        var obj1 = app.dateTimePicker(this.data.startYear, this.data.endYear, ss);
        // 精确到分的处理，将数组的秒去掉
        var lastArray = obj1.dateTimeArray.pop();
        var lastTime = obj1.dateTime.pop();

        this.setData({
            dateTimeArray: obj1.dateTimeArray,
            dateTime: obj1.dateTime
        });

        

    },
    //查询面试信息
    getData(candidateId) {
        app.$http.get('candidate/v1/interview/basic', { candidateId }).then((res) => {
            if (res.success) {  
                res.data.interview.lieniHas = true;             

                this.setData({
                    info: res.data.interview,
                    timeType: res.data.interview.needConfirm ? 1 : 2 
                })

                this.initTime(res.data.interview.interviewTime)

            }
        });
    },
    //需要猎头确认;
    switchFn(e) {
        let conf = {
            1: '猎头稍后会和您确认面试时间',
            2: '您和猎头已确认面试信息，他们不再与您再次确认'
        }

        let type = e.detail.value ? 1 : 2;

        this.setData({
            timeType: type
        });

        $Toast({
            content: conf[type],
        });
    },
    //改变时间
    changeDateTime(e) {
        this.setData({ dateTime: e.detail.value });
    },
    //改变时间栏
    changeDateTimeColumn(e) {
        var arr = this.data.dateTime,
            dateArr = this.data.dateTimeArray;

        dateArr[2] = app.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

        this.setData({
            dateTimeArray: dateArr
        });
    },
    //备注
    remarkFn(e) {
        this.setData({
            hrRemarkLeng: e.detail.value.length || 0
        });
    },
    //表单验证
    submitForm(e) {
        const params = e.detail.value;        

        if (this.checkForm(params)) {

            if (this.data.timeType == 2) {

                params.interviewTime = this.countTimes();
            }

            params.candidateId = this.data.candidateId;

            delete params.lieniHas;
            


            this.sendData(params);
        }

    },
    //把控件时间转为时间错
    countTimes() {
        let res,
            dateTimeArray = this.data.dateTimeArray,
            dateTime = this.data.dateTime,
            str = `${dateTimeArray[0][dateTime[0]]}/${dateTimeArray[1][dateTime[1]]}/${dateTimeArray[2][dateTime[2]]} ${dateTimeArray[3][dateTime[3]]}:${dateTimeArray[4][dateTime[4]]}`;
        res = new Date(str).getTime();

        
        return res;

    },
    //表单提交
    checkForm(data) {
        let text;
        if (!data.contact) {
            text = "请先填写联系人";
        } else if (!data.contactPhone) {

            text = "请先填写联系电话";
        } else if (!data.proposeAddress) {

            text = "请先填写面试地址";
        } else if (this.data.timeType == 1 && !data.proposeTime) {

            text = '请先填写面试时间';
        } else if (!data.lieniHas[0]) {

            text = '请先勾选候选人归猎你网平台猎头所有';
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

        app.$http.post('candidate/v1/interview/edit', params).then((res) => {
            if (res.success) {
                $Toast({
                    content: '修改面试成功',
                    type: 'success'
                });
                // 埋点
                app.$handleBury({evt: 'hx4a'});

                setTimeout(()=> {
                    wx.navigateBack({
                        delta: 1, // 回退前 delta(默认为1) 页面 
                        success: function(res) {                         
                        }                    
                    })
                }, 1000)

                
            }
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            candidateId: options.candidateId
        });

        this.getData(options.candidateId);

        //初始化时间
        // this.initTime();

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
        app.$handleBury({evt: 'hx4'});
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
