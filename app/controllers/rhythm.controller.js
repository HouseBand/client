'use strict';

angular.module('houseBand')

.controller('RhythmCtrl', function($stateParams){
  this.message = "Mix it Up";

  if (!window.socket) {
    window.connectToRoom($stateParams.room);
  }

  window.socket.emit('reserved instrument', 'rhythm');

  this.riff = function(number){
    window.socket.emit('play rhythm', 'HAUS128-Rhythm' + number)
  }
});
