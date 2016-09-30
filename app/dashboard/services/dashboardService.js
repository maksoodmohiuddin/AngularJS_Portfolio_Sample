(function () {
    'use strict';

    var dashboardModule = angular.module('ambassadors.dashboardModule');

    dashboardModule.service('dashboardService', ['$http', '$q', function ($http, $q) {
 
        this.getDashboard = function () {            

            var deferred = $q.defer();

            $http.get('/api/dashboard')
                .success(function (response) {                   
                    deferred.resolve(response);
                })
                .error(function () {                    
                    deferred.reject();
                });

            return deferred.promise
        };

        this.getUserProfile = function () {

            var deferred = $q.defer();

            $http.get('/api/profile')
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise
        };
             
    }]);
})();