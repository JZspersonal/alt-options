'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  // 'angular-loading-bar',
  'ngAnimate',
  'nvd3',
  "ui.bootstrap.modal",
  "ui-notification",
  "react"
]).
config(['$routeProvider', function($routeProvider) {
  //
  $routeProvider.when('/', {
    templateUrl: 'js/AOApp/trading.html',
    controller: 'tradingCtrl'
  });

  $routeProvider.when('/app', {
    templateUrl: 'js/AOApp/trading.html',
    controller: 'tradingCtrl'
  });

  $routeProvider.when('/trading', {
    templateUrl: 'js/AOApp/trading.html',
    controller: 'tradingCtrl'
  });

  $routeProvider.when('/settings', {
    templateUrl: 'js/AOApp/settings.html',
    controller:'settingsCtrl'
  });

  $routeProvider.when('/analytics',{
    templateUrl: 'js/AOApp/analytics.html',
    controller:'analyticsCtrl'
  });

  $routeProvider.otherwise({redirectTo:'/trading'});

}]);
angular.module('myApp.services', []);
angular.module('myApp.controllers', ['myApp.services']);
