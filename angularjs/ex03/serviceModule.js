/**
 * Created by Administrator on 2016/9/22 0022.
 */
var myModule = angular.module('ngService',[]);//模块名称
myModule.service('$ss',function () {//$ss为该模块的作用域！；
    this.say=function () {
        alert('我是自定义的一个模块！');
    }
});