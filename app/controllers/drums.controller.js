'use strict';

angular.module('houseBand')

.controller('DrumsCtrl', function(){
  this.message = "Mix it Up"

  window.io.emit('reserved instrument', 'drums');

  this.kick = function(e){
    if(e){
      e.preventDefault();
    }
    window.io.emit('play drums', 'BH-Kick')
  }
  this.hat = function(){
    window.io.emit('play lead', 'BH-Hat')
  }
  this.sfx1 = function(){
    window.io.emit('play lead', 'BH-SFX1')
  }
  this.sfx2 = function(){
    window.io.emit('play lead', 'BH-SFX2')
  }
  this.snare = function(){
    window.io.emit('play lead', 'BH-Snare')
  }
  this.ride = function(){
    window.io.emit('play lead', 'BH-Ride')
  }
})
