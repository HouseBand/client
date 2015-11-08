'use strict';

angular.module('houseBand')

.controller('RhythmCtrl', function($stateParams){
  this.message = "Mix it Up";

  if (!window.socket) {
    window.connectToRoom($stateParams.room);
  }

  window.socket.emit('reserved instrument', 'rhythm');

  this.riff = function (number, e) {
    var target = angular.element(e.target);
    var soundName = 'HAUS128-Rhythm' + number;

    if (window.audioConfig.nonLoop.indexOf(soundName) < 0) {
      if (target.hasClass('loop')) {
        target.removeClass('loop');
        window.socket.emit('stop rhythm', soundName);
      } else {
        target.addClass('loop');
        window.socket.emit('play rhythm', soundName);
      }
    } else {
      window.socket.emit('play rhythm', soundName);
    }
  };

  this.quit = function(){
    window.socket.disconnect();
    $state.go('play')
  }
});
