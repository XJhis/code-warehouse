/**
 * Created by Administrator on 2016/9/23 0023.
 */
var app = angular.module('myApp',['ui.router']);
app.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider.state('home',{
        url:'/index',
        views:{
            left:{templateUrl:'views/left.html'},
            right:{templateUrl:'views/right.html'}
        }
    });
    $urlRouterProvider.otherwise('/index');
});

