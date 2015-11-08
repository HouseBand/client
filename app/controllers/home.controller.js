'use strict';

angular.module('houseBand')

.controller('HomeCtrl', function($sce, $stateParams, $http){
  var self = this;
  this.message = "Home"

  this.room = $stateParams.room

  $http.post(window.apiConfig.roomUrl + this.room).then(function(data){
    console.log(data)
  });

  this.shareLinkChrome = $sce.trustAsHtml("<a href='sms:?body=Lets%20Mix%20it%20Up'>Share from Chrome</a>")
  this.shareLinkiOS = $sce.trustAsHtml("<a href='sms:&body=Lets%20Mix%20it%20Up'>Share from iOS</a>")
});
