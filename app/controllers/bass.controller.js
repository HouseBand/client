'use strict';

angular.module('houseBand')

.controller('BassCtrl', function($stateParams, $state){
  this.message = "Mix it Up";

  if (!window.socket) {
    window.connectToRoom($stateParams.room);
  }

  if (!window.socketsSetup) {
    window.setupSocket();
  }

  window.socket.emit('reserved instrument', 'bass');

  this.riff = function (number, e) {
    var target = angular.element(e.target);
    var soundName = 'HAUS128-Bass' + number;

    if (window.audioConfig.nonLoop.indexOf(soundName) < 0) {
      if (target.hasClass('loop')) {
        target.removeClass('loop');
        window.socket.emit('stop bass', soundName);
      } else {
        target.addClass('loop');
        window.socket.emit('play bass', soundName);
      }
    } else {
      window.socket.emit('play bass', soundName);
    }
  };

  this.quit = function(){
    window.socket.disconnect();
    $state.go('play')
  }
});
