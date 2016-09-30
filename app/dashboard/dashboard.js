(function () {
    'use strict';

    var dashboardModule = angular.module('ambassadors.dashboardModule', [
        'ui.router'
    ]);

    dashboardModule.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('dashboard', {
            url: '/dashboard',
            resolve: {               
            },
            views: {
                "main": {
                    controller: 'dashboardController',
                    templateUrl: '/Scripts/app/dashboard/views/dashboard.tpl.html'
                }
            },
            data: {
                pageTitle: 'Dashboard'
            }
        });
    }]);
})();