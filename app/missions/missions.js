(function () {
    'use strict';

    var missionsModule = angular.module('ambassadors.missionsModule', [
        'ui.router',
        'ambassadors.commonModule'
    ]);

    missionsModule.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('challenges', {
            url: '/missions',
            resolve: {
            },
            views: {
                "main": {
                    controller: 'missionsController',
                    templateUrl: '/Scripts/app/missions/views/missions.tpl.html'
                }
            },
            data: {
                pageTitle: 'Challenges'
            }
        });
    }]);
})();