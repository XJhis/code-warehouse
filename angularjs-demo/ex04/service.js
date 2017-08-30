/**
 * Created by Administrator on 2016/9/22 0022.
 */
var myApp = angular.module('ng.service',[]);
//定义一个模块（功能:发送ajax请求数据！）
myApp.service('$ss',function ($http,$q) {
    //声明一个延迟承诺函数（为了返回数据？？？）
    var logUrl = 'http://datainfo.duapp.com/shopdata/userinfo.php';
    this.login = function (obj) {
        var d = $q.defer();
        $http({method:'get',url:logUrl,params:obj}).then(function (success) {
            d.resolve(success);
        },function (error) {
            d.reject(error);
        });
        return d.promise;
    };

});