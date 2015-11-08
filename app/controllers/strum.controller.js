'use strict';

angular.module('houseBand')

.controller('StrumCtrl', function($http, $state, $stateParams){
  var self = this;

  this.message = "Instruments";
  this.choice = '';
  this.room = $stateParams.room;
  var instrumentsUrl = window.apiConfig.roomUrl + self.room + '/instruments';

  // Initial GET to see if anyone else has selected an instrument
  $http.get(instrumentsUrl).then(function(data){
    self.available = data;
  });

  connectToRoom(this.room);
  window.socket.on('instruments changed', function(data) {
    self.available = data;
  });

  // POST to the server to select an instrument
  this.instrumentChoice = function(instrument, e){
    var target = angular.element(e.target);
    target.toggleClass('selected').next().toggleClass('bounceIn');
    $http.post(instrumentsUrl + '/' + instrument).then(function(data){
      console.log(data)
    });
    self.choice = target.text().toLowerCase();
  };

  this.goToInstrument = function(instrument){
    if(instrument !== ''){
      $state.go(instrument, {room: self.room})
    }
    else {
      alert('Oops, Please select an instrument');
      return false;
    }
  };
});
