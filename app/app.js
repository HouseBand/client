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
    url: '/rooms/:room/instruments/lead',
    templateUrl: './app/states/lead.html',
    controller: 'LeadCtrl as lead'
  })
  .state('rhythm', {
    url: '/rooms/:room/instruments/rhythm',
    templateUrl: './app/states/rhythm.html',
    controller: 'RhythmCtrl as rhy'
  })
  .state('bass', {
    url: '/rooms/:room/instruments/bass',
    templateUrl: './app/states/bass.html',
    controller: 'BassCtrl as bass'
  })
  .state('drums', {
    url: '/rooms/:room/instruments/drums',
    templateUrl: './app/states/drums.html',
    controller: 'DrumsCtrl as drums'
  })
});
