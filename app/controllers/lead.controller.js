'use strict';

angular.module('houseBand')

.controller('LeadCtrl', function(){
  this.message = "Mix it Up"

  window.io.emit('reserved instrument', 'lead');

  this.riff = function(number){
    window.io.emit('play lead', 'BH-Rhythm' + number)
  }

})
