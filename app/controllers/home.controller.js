'use strict';

angular.module('houseBand')

.controller('HomeCtrl', function($sce, $stateParams, $http){
  var self = this;
  this.message = "Home"

  this.room = $stateParams.room
  var newRoom = window.apiConfig.roomUrl + this.room;
  var instrumentsRoom = "http:" + newRoom + '/instruments'

  $http.post(newRoom).then(function(data){
    console.log(data)
  });

  this.shareLinkChrome = $sce.trustAsHtml("<a class='btn shareBtn' href='sms:?body=Lets%20Mix%20it%20Up%0A%0A" + instrumentsRoom +  "'>Share from Android</a>")
  this.shareLinkiOS = $sce.trustAsHtml("<a class='btn shareBtn' href='sms:&body=Lets%20Mix%20it%20Up%0A%0A" + instrumentsRoom +"'>Share from iOS</a>")
});
