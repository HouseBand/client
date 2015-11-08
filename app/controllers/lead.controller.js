'use strict';

angular.module('houseBand')

    .controller('LeadCtrl', function ($stateParams) {
        this.message = "Mix it Up";

        if (!window.socket) {
            window.connectToRoom($stateParams.room);
        }

        if (!window.socketsSetup) {
            window.setupSocket();
        }

        window.socket.emit('reserved instrument', 'lead');

        this.riff = function (number, e) {
            var target = angular.element(e.target);
            var soundName = 'HAUS128-Lead' + number;

            if (window.audioConfig.nonLoop.indexOf(soundName) < 0) {
                if (target.hasClass('loop')) {
                    target.removeClass('loop');
                    window.socket.emit('stop lead', soundName);
                } else {
                    target.addClass('loop');
                    window.socket.emit('play lead', soundName);
                }
            } else {
                window.socket.emit('play lead', soundName);
            }
        }

        this.quit = function(){
          window.socket.disconnect();
          $state.go('play')
        }

    });
