'use strict';

angular.module('houseBand')

.controller('BassCtrl', function(){
  this.message = "Mix it Up"

  window.io.emit('reserved instrument', 'bass');

  this.riff = function(number){
    window.io.emit('play bass', 'BH-Bass' + number)
  }
});
