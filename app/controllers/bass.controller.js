'use strict';

angular.module('houseBand')

.controller('BassCtrl', function(io){
  this.message = "Mix it Up"

  io.socket.emit('reserved instrument', 'bass');
  io.socket.on('bass played', function(data){
    console.log(data)
  })

  this.riff = function(number){
    io.socket.emit('play bass', 'riff' + number)
  }
})
