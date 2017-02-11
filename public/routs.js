(function(){
  'use strict'
  angular
    .module('ss')
    .config(function($stateProvider, $urlRouterProvider, $authProvider){ 

      $urlRouterProvider.otherwise('/');

      // let skipIfLoggedIn = ['$q', '$location', '$auth', ($q, $location, $auth) => {
      //   let deferred = $q.defer();
      //   if ($auth.isAuthenticated()) $location.path('/main')
      //   else  deferred.resolve();
      //   return deferred.promise;
      // }];
      // let loginRequired = ['$q', '$location', '$auth', ($q, $location, $auth) => {
      //   let deferred = $q.defer();
      //   if ($auth.isAuthenticated()) deferred.resolve();
      //   else $location.path('/login');
      //   return deferred.promise;
      // }];

      $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'routs/main/main.html',
        controller: 'MainCtrl as vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'routs/login/login.html',
        controller: 'loginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'routs/signup/signup.html',
        controller: 'signupCtrl'
      })

      //This is satellizer --> 
      // $authProvider.loginUrl = '/auth/login'
      // $authProvider.signupUrl = '/auth/signup'

    })
    
})();//End of IIFE