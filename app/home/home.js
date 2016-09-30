(function () {
    'use strict';

    var homeModule = angular.module('ambassadors.homeModule', [
        'ui.router'
    ]);

    homeModule.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            views: {
                "main": {
                    controller: 'homeController',
                    templateUrl: '/Scripts/app/home/views/home.html'
                }
            },
            resolve: {},
            data: {
                pageTitle: 'Home'
            }
        });
    }]);
    
})();