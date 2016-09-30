(function () {
    'use strict';

    var joinModule = angular.module('ambassadors.joinModule', [
        'ui.router'
    ]);

    joinModule.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('join', {
            url: '/join',
            resolve: {
                //specializations: ['joinService',
                //    function (joinService) {
                //        return joinService.getPublishedSpecs();
                //    }]
            },
            views: {
                "main": {
                    controller: 'joinController',
                    templateUrl: '/Scripts/app/join/views/join.tpl.html'
                }
            },
            data: {
                pageTitle: 'Join'
            }
        });
    }]);
})();