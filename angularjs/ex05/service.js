/**
 * Created by Administrator on 2016/9/23 0023.
 */

//第一种service:方法;使用延迟承诺对象；
var myService = angular.module('ng.service',[]);
myService.service('$service',function ($http,$q) {
    var d = $q.defer();
   this.sendRequest = function (da,url) {
       $http({method:'get',url:url,params:da}).then(function (succ) {
           d.resolve(succ);
       },function (error) {
            d.reject(error);
       })
   };
   return d.promise;
});