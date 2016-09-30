(function () {
    'use strict';

    var loungeModule = angular.module('ambassadors.loungeModule', [
        'ui.router'
    ]);

    loungeModule.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('lounge', {
            url: '/lounge',
            resolve: {
                //specializations: ['joinService',
                //    function (joinService) {
                //        return joinService.getPublishedSpecs();
                //    }]
            },
            views: {
                "main": {
                    controller: 'loungeController',
                    templateUrl: '/Scripts/app/lounge/views/lounge.tpl.html'
                }
            },
            data: {
                pageTitle: 'Lounge'
            }
        });
    }]);
})();