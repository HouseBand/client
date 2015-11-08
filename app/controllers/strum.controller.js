'use strict';

angular.module('houseBand')

    .controller('StrumCtrl', function ($http, $state, $stateParams) {
        var self = this;

        this.message = "Instruments";
        this.choice = '';
        this.room = $stateParams.room;
        var instrumentsUrl = window.apiConfig.roomUrl + self.room + '/instruments';
        this.available = {
            lead: false,
            rhythm: false,
            drums: false,
            bass: false
        };

        // Initial GET to see if anyone else has selected an instrument
        $http.get(instrumentsUrl).then(function (res) {
            self.available = res.data;
        });

        connectToRoom(this.room);
        window.socket.on('instruments changed', function (data) {
            self.available = data;
        });

        // POST to the server to select an instrument
        this.instrumentChoice = function (instrument) {
            if (self.available[instrument]) {
                $http.delete(instrumentsUrl + '/' + instrument).then(function (data) {
                    console.log(data);
                    self.available[instrument] = !self.available[instrument];
                    self.choice = '';
                });
            } else {
                $http.post(instrumentsUrl + '/' + instrument).then(function (data) {
                    console.log(data);
                    self.available[instrument] = !self.available[instrument];
                    self.choice = instrument;
                });
            }
        };

        this.goToInstrument = function (instrument) {
            if (instrument !== '') {
                $state.go(instrument, {room: self.room})
            }
            else {
                alert('Oops, Please select an instrument');
                return false;
            }
        };
    });
