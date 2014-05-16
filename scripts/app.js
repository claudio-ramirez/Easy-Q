'use strict';
/* global app:true */

var app = angular.module('angNewsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'AuthCtrl'
    })
    .when('/', {
      templateUrl: 'views/tests.html',
      controller: 'TestsCtrl'
    })
    .when('/addtest', {
      templateUrl: 'views/addtest.html',
      controller: 'NavCtrl'
    })
    .when('/tests/:testId', {
      templateUrl: 'views/showtest.html',
      controller: 'TestViewCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'AuthCtrl'
    })
    .when('/users/:username', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
})
.constant('FIREBASE_URL', 'https://tideeasyq.firebaseio.com/');
