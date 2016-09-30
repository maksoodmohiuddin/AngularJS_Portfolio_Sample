(function () {
    'use strict';

    var rewardsModule = angular.module('ambassadors.rewardsModule', [
        'ui.router'
    ]);

    rewardsModule.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('rewards', {
            url: '/rewards',
            views: {
                "main": {
                    controller: 'rewardsController',
                    templateUrl: '/Scripts/app/rewards/views/rewards.html'
                }
            },
            resolve: {},
            data: {
                pageTitle: 'Rewards'
            }
        });
    }]);

})();