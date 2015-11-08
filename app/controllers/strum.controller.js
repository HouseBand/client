'use strict';

angular.module('houseBand')

.controller('StrumCtrl', function($http, $state){
  var self = this;

  this.message = "Instruments";
  this.choice = '';

  // Initial GET to see if anyone else has selected an instrument
  $http.get('http://houseband-api.elasticbeanstalk.com/instruments').then(function(data){
    self.available = data;
  });

  // POST to the server to select an instrument
  this.instrumentChoice = function(instrument, e){
    var target = angular.element(e.target)
    target.toggleClass('selected').next().toggleClass('bounceInDown')
    $http.post('http://houseband-api.elasticbeanstalk.com/instruments/' + instrument).then(function(data){
      console.log(data)
    });
    self.choice = target.text().toLowerCase();
  }

  this.goToInstrument = function(instrument){
    if(instrument !== ''){
      $state.go(instrument)
    }
    else {
      alert('Oops, Please select an instrument')
      return false;
    }
  };
});
