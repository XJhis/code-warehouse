/**
 * Created by Administrator on 2016/9/23 0023.
 */
var app = angular.module('myApp',['ng.service']);
app.controller('firCtrl',function ($scope,$service) {
    $scope.send = function () {
        var data = {
            userID:'XJh123',
            password:'123123123',
            status:'login'
        };
        var loginUrl = 'http://datainfo.duapp.com/shopdata/userinfo.php';
       var d = $service.sendRequest(data,loginUrl);
        d.then(function (ss) {
            console.info(ss)
        },function (er) {
            console.info(er)
        })
    }
});