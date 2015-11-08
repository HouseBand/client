'use strict';

angular.module('houseBand')

.controller('LeadCtrl', function(){
  this.message = "Mix it Up"

  window.io.emit('reserved instrument', 'lead');

  this.riff = function(number, e){
    var target = angular.element(e.target);
    if(number === 2){
      if(target.hasClass('loop')){
        ion.sound.destroy('HAUS128-Lead' + number);
        target.removeClass('loop');
        return false;
      }
      else {
        target.addClass('loop')
      }

    }
    window.io.emit('play lead', 'HAUS128-Lead' + number)
  }

})
