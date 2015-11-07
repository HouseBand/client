'use strict';

angular.module('houseBand')

.controller('RhythmCtrl', function(io){
  this.message = "Mix it Up"

  io.socket.emit('reserved instrument', 'rhythm');
  io.socket.on('rhythm played', function(data){
    console.log(data)
  })

  this.riff = function(number){
    io.socket.emit('play rhythm', 'riff' + number)
  }
})
