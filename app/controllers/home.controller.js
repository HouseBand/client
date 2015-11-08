'use strict';

angular.module('houseBand')

.controller('HomeCtrl', function($sce){
  this.message = "Home"

  this.shareLinkChrome = $sce.trustAsHtml("<a href='sms:5613025096?body=Lets%20Mix%20it%20Up'>ShareChrome</a>")
  this.shareLinkiOS = $sce.trustAsHtml("<a href='sms:5613025096&body=Lets%20Mix%20it%20Up'>ShareiOS</a>")
});
