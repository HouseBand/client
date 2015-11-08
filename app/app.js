'use strict';

angular.module('houseBand', ['ui.router', 'ngSanitize', 'ngTouch'])

.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('play', {
    url: '/',
    templateUrl: './app/states/play.html',
    controller: 'PlayCtrl as play'
  })
  .state('name', {
    url: '/name',
    templateUrl: './app/states/name.html',
    controller: 'NameCtrl as name'
  })
  .state('home', {
    url: '/home/:room',
    templateUrl: './app/states/home.html',
    controller: 'HomeCtrl as home'
  })
  .state('instruments', {
    url: '/instruments/:room',
    templateUrl: './app/states/instruments.html',
    controller: 'StrumCtrl as strum'
  })
  .state('lead', {
    url: '/instruments/lead',
    templateUrl: './app/states/lead.html',
    controller: 'LeadCtrl as lead'
  })
  .state('rhythm', {
    url: '/instruments/rhythm',
    templateUrl: './app/states/rhythm.html',
    controller: 'RhythmCtrl as rhy'
  })
  .state('bass', {
    url: '/instruments/bass',
    templateUrl: './app/states/bass.html',
    controller: 'BassCtrl as bass'
  })
  .state('drums', {
    url: '/instruments/drums',
    templateUrl: './app/states/drums.html',
    controller: 'DrumsCtrl as drums'
  })
});
