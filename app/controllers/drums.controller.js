'use strict';

angular.module('houseBand')

.controller('DrumsCtrl', function(io){
  this.message = "Mix it Up"

  io.socket.emit('reserved instrument', 'drums');
  // io.socket.on('lead played', function(data){
  //   console.log(data)
  // })
  //
  // this.riff = function(number){
  //   io.socket.emit('play lead', 'riff' + number)
  // }
})
