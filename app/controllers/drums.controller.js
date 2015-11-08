'use strict';

angular.module('houseBand')

.controller('DrumsCtrl', function($stateParams){
  this.message = "Mix it Up";

  if (!window.socket) {
    window.connectToRoom($stateParams.room);
  }

  window.socket.emit('reserved instrument', 'drums');

  this.riff = function (number, e) {
    var target = angular.element(e.target);
    var soundName = 'HAUS128-Drum' + number;

    if (window.audioConfig.nonLoop.indexOf(soundName) < 0) {
      if (target.hasClass('loop')) {
        target.removeClass('loop');
        window.socket.emit('stop drums', soundName);
      } else {
        target.addClass('loop');
        window.socket.emit('play drums', soundName);
      }
    } else {
      window.socket.emit('play drums', soundName);
    }
  };
});
