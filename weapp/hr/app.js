import util from "utils/util.js";
import $http from "utils/http.js";
// import $baseData from "utils/baseData.js";
import Time from 'utils/time.js';

//app.js
App({
    // 本地存储
    $local: util.local,
    // md5
    $md5: util.md5,
    // http
    $http: $http,

    // url
    $baseUrl: 'https://weapp-hr.lieni.com/api/',
    //时间方法
    dateTimePicker: Time.dateTimePicker,
    getMonthDay: Time.getMonthDay,   
    $date: util.DATE,  
    $trim: util.trim,
    $savePoint: util.savePoint,
    // 埋点
    $handleBury: function(opt = {}){

            let pages = getCurrentPages().slice(-3).map(item => {
                return item.route;
            });
            let len = pages.length;

            //埋点数据模板
            let data = {
                't': 'json',                    //日志规范类型
                'v': '1.0',                     //日志规范版本     
                'extc': null,                   //客户端扩展字段 路由查询参数
                'tc': Date.now(),               //客户端时间
                'pdv': '1.0.0',                 //产品版本号
                'pd': 'hr-weapp',               //产品名称 gw/hr/am/gw-m/hr-m/am-m/lxt/tm-am/tm-hr/tm-c
                'op': 'operate',                       //增删改操作 insert/update/delete/operate/select
                'evt': '',                      //事件
                'bpt': 'front',                 //记录方式 前端：front  后端：back
                'io': 'in',                     //进入、离开
                'purl': '',                     //上一个页面URL
                'url': '',                      //当前页面URL
                'uipos': ''                    //客户端产品路径 最近三层
            };

            opt.op && (data.op = opt.op);
            data.evt = opt.evt;
            data.purl = pages[len - 1];
            pages[len - 2] && (data.purl = pages[len - 2]);
            data.uipos = pages.join();
            //序列化
            // var extc = {};
            // for (var item in ajaxData.extc) {
            //     if (ajaxData.extc[item]!==undefined && ajaxData.extc[item]!==null && ajaxData.extc[item]!=='') {
            //             extc[item] = escape(ajaxData.extc[item], "UTF-8");
            //     }
                
            // };
            // ajaxData.extc =  extc;    
              
            //转成字符串
            this.$http.post('burypoint/v1/handle', {}, false, {buryPoint: JSON.stringify( data )});

            wx.reportAnalytics(opt.evt, {
                hr_phone: this.globalData.user.phone,
                hr_name: this.globalData.user.name,
                hr_id: this.globalData.user.id,
            });


    },
    // 更新机制
    update: function() {
        if (wx.canIUse('getUpdateManager')) {
            const updateManager = wx.getUpdateManager();
            updateManager.onCheckForUpdate(function(res) {
                // 请求完新版本信息的回调
                if (res.hasUpdate) {
                    updateManager.onUpdateReady(function() {
                        wx.showModal({
                            title: '更新提示',
                            content: '新版本已经准备好，是否重启应用？',
                            success: function(res) {
                                if (res.confirm) {
                                    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                                    updateManager.applyUpdate()
                                }
                            }
                        })
                    })
                    updateManager.onUpdateFailed(function() {
                        // 新的版本下载失败
                        wx.showModal({
                            title: '已经有新版本了哟~',
                            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                        })
                    })
                }
            })
        }else{
            // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    },
    // 密码加密
    pwdMd5: function(data) {
        let session = this.$local.get('token');

        let a1 = data.loginName + ':' + session.realm + ':' + this.$md5(data.authorizeCode),
            a2 = 'POST:/auth/v1/login',
            ha1 = this.$md5(a1),
            ha2 = this.$md5(a2);
        data.authorizeCode = this.$md5(ha1 + ':' + session.nonce + ':' + ha2);



        return data;
    },
    // 存储formId
    addFormId: function(formId){
        this.$http.post('candidate/notice/v1/add', {formId: formId}, true).then(res => {
            if(res.success){
                console.info('formId存储成功');
            }
        });
    },
    
    // 初始化
    onLaunch: function() {
        // 检测是否有新版本
        this.update();
        // 初始化基础数据
        // this.$baseData.init();
    },
    onShow: function(res) {
        console.log('场景值',res);
        // 场景值
        this.globalData.showData = res;

        // wx.showToast({title: '您没有权限操作或访问该页面', mask: true, icon: 'none', duration: 5000, image: '../assets/img/man.png'});
        // wx.showLoading({title: '您没有权限操作或访问该页面', mask: true});
        // wx.showModal({
        //     title: '提示', 
        //     content: '您没有权限操作或访问该页面',
        //     mask: true,
        //     showCancel: false
        // });
    },
    globalData: {
        user: null,
        showData:{},
        first: false
    }
})
