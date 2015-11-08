'use strict';

angular.module('houseBand', ['ui.router', 'ngSanitize', 'ngTouch'])

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
  .state('name', {
    url: '/name',
    templateUrl: './app/states/name.html',
    controller: 'NameCtrl as name'
  })
  .state('instruments', {
    url: '/instruments',
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
