'use strict';

angular.module('houseBand', ['ui.router', 'ngSanitize'])

.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/play');

  $stateProvider
  .state('play', {
    url: '/play',
    templateUrl: './app/states/play.html',
    controller: 'PlayCtrl as play'
  })
  .state('home', {
    url: '/',
    templateUrl: './app/states/home.html',
    controller: 'HomeCtrl as home'
  })
  .state('instruments', {
    url: '/instruments',
    templateUrl: './app/states/instruments.html',
    controller: 'StrumCtrl as strum'
  })
})
