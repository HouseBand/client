'use strict';

angular.module('houseBand')

.controller('BassCtrl', function(){
  this.message = "Mix it Up";

  if (!window.socket) {
    window.connectToRoom($stateParams.room);
  }

  window.io.emit('reserved instrument', 'bass');

  this.riff = function(number){
    window.io.emit('play bass', 'HAUS128-Bass' + number)
  }
});
