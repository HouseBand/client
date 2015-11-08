'use strict';

angular.module('houseBand')

.controller('RhythmCtrl', function(){
  this.message = "Mix it Up"

  window.io.emit('reserved instrument', 'rhythm');

  this.riff = function(number){
    window.io.emit('play rhythm', 'HAUS128-Rhythm' + number)
  }
})
