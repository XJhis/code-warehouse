import { local } from "./util";
let goBackIndex = () => {
    local.remove('token');

    wx.reLaunch({
        url: "/pages/index/index"
    });
};
let baseUrl = 'https://weapp-hr.lieni.com/api/';
const http = data => {
    return new Promise(function(resolve, reject) {
        let token = local.get('token');
        let header = {
            accessToken: token ? token.sessionId : '',
            "content-type": "application/x-www-form-urlencoded" // 默认值
        };
        if(data.headers && data.headers.buryPoint){
            header.buryPoint = data.headers.buryPoint;
        }
        //发起网络请求
        wx.request({
            url: baseUrl + data.url,
            data: {...data.data},
            method: data.method,
            header: header,
            success: function(res) {
                console.log('ajax成功"'+ data.url + '"', res);

                switch(res.statusCode){
                    case 200:
                        if (res.data.success) {
                            resolve(res.data);
                        } else {
                            data.global && wx.showModal({
                                content: res.data.message,
                                showCancel: false,
                                confirmText: '我知道了',
                                confirmColor: '#FF6B00'
                            })
                            
                            resolve(res.data);
                        }
                        break;

                    case 401:
                        wx.showToast({title: '请登录后访问', icon: 'none', mask: true});
                        break;
                    case 403:
                        wx.showToast({title: '您没有权限操作或访问该页面', icon: 'none', mask: true});
                        break;
                    case -1:
                        wx.showToast({title: '网络连接异常，请稍后再试', icon: 'none', mask: true});
                        break;
                    default:
                        goBackIndex();
                }

                
            },
            fail: function(res) {
                console.log('ajax失败', res);
                // if (res.data.errorCode == 100) {
                //     goBackIndex();
                // }
                reject(res);
            },
            complete: function(res) {
                wx.hideLoading()
            }
        });
    });
};

const $http = {
    get: (url, data) => {
        return http({url: url, data: data, method: 'get'});
    },
    post: (url, data, notLoad, headers, global) => {
        !notLoad && wx.showLoading({title: ' ', mask: true});
        return http({url: url, data: data, headers: headers, method: 'post', global: !global});
    }
}

export default $http;
