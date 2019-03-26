// pages/resume/detail/index.js
import config from "../../../config.js";
//获取应用实例
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        spinShow: true,
        currentTab: 1,
        workMore: [],
        isMoreBtn: false,        
        candidateId: '',
        info: '',
        eval: [],
        hasMoreEval: false,
        actions:[],
        shareCount: null,
        shareModalShow: false,
        btnActions: [
            {
                name: '不要通知',
                color: '#000',
                openType: 'share',
                status: false
            },
            {
                name: '请通知我',
                color: '#ff6b00',
                openType: 'share',
                status: true
            }
        ],
        risk: '',
        report: '',
        gwInfo: '',
        status: '',
        moreBtnArr: [],
        bigBtn: '',
        isUninterview: false,
        isCall: false,
        topH: 0,
        isFixed:false,
    },  
    /*
    方法
    */
    // 设置高度
    setHeight: function(){
        wx.createSelectorQuery().select('.top-height').boundingClientRect((res) => {
            this.setData({
                topH : res.height
            })
        }).exec()
    },
    //候选人信息
    getResume(candidateId) {
        app.$http.get('candidate/details/v1/info', { candidateId }).then((res) => {
            if (res.success) {
                this.setData({
                    info: res.data || {},
                    risk: res.data.risksView || '',
                    report: res.data.report || '',
                    status: res.data.candidateInfo.recommendStatus,
                }, () => {
                    this.setHeight();
                })

                let status = this.data.status;

                //是否为电话
                if (status >= 8 && status <18) {
                    this.setData({
                        isCall: true
                    })
                }else {
                    this.setData({
                        isCall: false
                    })
                }                

                //设置操作
                this.setOperate(status)

                this.setData({
                    spinShow: false
                })

            }
        });
    },
    //设置操作
    setOperate(status) {
        let data = JSON.parse( JSON.stringify(config.moreBtnArr[status])  ),
            bigBtn = data[0];

        data.shift();
        this.setData({
            moreBtnArr: data,
            bigBtn: bigBtn||'',
        });

    },
    //大操作
    bigBtnFn(e) {
        if(e && e.detail && e.detail.formId){
            app.addFormId(e.detail.formId);
        }
        let name = e.target.dataset.params.name;
        this.toOperate(name);
    },
    //跳转到操作页面
    toOperate(name) {
        let url, str = config.btnPage[name].url;        
        if(str == '人选没来'){
            // 埋点
            app.$handleBury({evt: 'hx7'});
            this.setData({isUninterview: true});
            return false;
        }
        if (name == '查看Offer') {
            url = `../operating/${str}/index?candidateId=${this.data.candidateId}&type=1`;
            
            wx.navigateTo({ url });
            return false;
        }
        if (str) {
            url = `../operating/${str}/index?candidateId=${this.data.candidateId}&status=${this.data.status}`;
            
            wx.navigateTo({ url });
        };        
    },
    //按钮点击 
    handleClick({ detail }) {
        let name = this.data.moreBtnArr[detail.index].name;
        this.toOperate(name);
    }, 
    // 人选没来
    uninterview(){
        app.$http.post('candidate/v1/uninterview',{candidateId:this.data.candidateId}).then(res => {
            if(res.success){
                // 埋点
                app.$handleBury({evt: 'hx7a'});
                
                this.uninterviewHide();
                this.switchMoreBtn();

                this.updateData();
            }
        });
    },
    uninterviewHide(){
        this.setData({isUninterview: false});
    },
    //更多操作
    switchMoreBtn(e) {
        if(e && e.detail && e.detail.formId){
            app.addFormId(e.detail.formId);
        }
        this.setData({
            isMoreBtn: !this.data.isMoreBtn,
        })


    },    
    //获取评价
    getEval(candidateId) {
        let params = {
            candidateId,
            size: 3
        }
        app.$http.get('candidate/evaluate/v1/list', params).then((res) => {
            if (res.success) {
                if (res.data.pager.totalResults) {
                    this.setData({
                        eval: res.data.list
                    })
                }

                if (res.data.pager.totalResults > 3) {
                    this.setData({
                        hasMoreEval: true
                    })
                }
            }
        });
    },
    //更多评价
    toMoreEval() {
        let url = `../eval/index?candidateId=${this.data.candidateId}`;
        wx.navigateTo({ url })
    },
    tabChange({ detail }) {
        this.setData({
            currentTab: detail.key
        });
        if (detail.key==3) {
            this.getActions();
            
        }else if (detail.key==2) {
            this.getGw();
        }

        this.data.isFixed && wx.pageScrollTo({
          scrollTop: this.data.topH,
          duration: 300
        })
    },    
    //获取动态
    getActions() {
        let params = {
            candidateId: this.data.candidateId,
            page: 1,
            size: 100
        }
        app.$http.get('candidate/details/v1/actions/list', params).then((res) => {
            if (res.success) {               

                if (res.data.pager.totalResults>0) {
                    this.setData({
                        actions: res.data.list
                    })
                }                
            }
        });
    },
    //顾问信息
    getGw() {        
        let params = {
            candidateId: this.data.candidateId            
        }
        app.$http.get('candidate/details/v1/gw/info', params).then((res) => {
            if (res.success) {
                if (res.data) {
                    //等级图标
                    res.data.levelArr = this.countLevel(res.data.gwLevel);
                    res.data.recommendQ = this.countQuality(res.data.recommendQuality);
                    res.data.serviceQ = this.countQuality(res.data.serviceQuality);

                    this.setData({
                        gwInfo: res.data
                    })
                }                
            }
        });
    },
    //计算等级
    countLevel(val) {
        if (!val) { return [] };
        var levelArr = [],
            lenVal = val % 3,
            level = Math.floor((val-1)/3),
            len = lenVal ? lenVal : 3,
            arry = ['copperMedal','silverMedal','goldMedal','diamond','copperCrown','silverCrown','goldCrown'];

        for (var i=0 ; i<len ; i++) {
            levelArr.push(arry[level]);
        }

        return levelArr;
    },
    //计算星星
    countQuality(num) {
        let arr = [0, 0, 0, 0, 0],
            length = Math.floor( num ),
            isInt = num % 1 >= 0.5,
            i;

        if ( num == 0 ) {
            return arr;
        }

        for ( i = 0; i < length; i++) {
            arr[i] = 2;
        }

        if ( isInt ) {
            arr[length] = 1;
        }

        return arr;
    },
    //更多工作
    toggleWork(event) {
        var key = event.target.dataset.workKey;
        var name = 'workMore[' + key + ']';
        this.setData({
            [name]: !this.data.workMore[key],
        })
    },    
    //打电话
    makeCall(event) {
        
        let status = event.target.dataset.info.recommendStatus;
        let phone = event.target.dataset.info.candidatePhone;
        if (status >= 8 && status <18) {

            wx.makePhoneCall({
              phoneNumber: phone 
            })
        }
    },
    //更新数据
    updateData() {
        this.setData({
            isMoreBtn: false,
        })
        app.$http.get('candidate/evaluate/v1/count', {candidateId: this.data.candidateId}).then(res => {
            if(res.success){
                this.setData({
                    shareCount: res.data
                });
            }
        })

        this.getResume(this.data.candidateId);
        this.getEval(this.data.candidateId);
        this.getActions();
    },
    onPageScroll(e) {
        // 防抖动
        let scrollTop = e.scrollTop;
        if(scrollTop >= this.data.topH){
            if(!this.data.isFixed){
                this.setData({isFixed: true})    
            }
        }else{
            if(this.data.isFixed){
                this.setData({isFixed: false})    
            }
            
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            candidateId: options.candidateId
        });
        // this.updateData();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function(options) {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.updateData();
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
    shareModal: function(e){
        if(e.detail.formId){
            app.addFormId(e.detail.formId);
        }
        this.setData({
            shareModalShow: true
        })
    },
    shareHide: function(){
        this.setData({
            shareModalShow: false
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(obj) {
        this.shareHide();

        let sign = app.$md5( app.$local.get('user').phone + '' + Date.now());
        let needInform = true;
        if(obj.from == 'button'){
            needInform = obj.target.dataset.status;
        }
        let data = {
            candidateId: this.data.candidateId,
            needInform: needInform,
            sign: sign
        };
        app.$http.post('candidate/transmit/v1/record', data).then(res => {
            if(res.success){
                console.log('分享成功');
            }
        });
        return {
            title: '这份简历怎么样？' + ( !this.data.shareCount ? '' : '已有'+ this.data.shareCount +'人评价'),
            path: '/pages/index/index?type=share&candidateId=' + this.data.candidateId + '&sign=' + sign,
            imageUrl: app.$baseUrl + 'candidate/transmit/v1/thumb?candidateId=' + this.data.candidateId.replace('#','%23')
        }
    }
})
