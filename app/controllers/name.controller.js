'use strict';

angular.module('houseBand')

.controller('NameCtrl', function($state){
  this.roomCheck = function(room){
    if(room){
      return $state.go('home', {room: room.toLowerCase()})
    }
    alert('Please name your band');
    return false
  }
});
