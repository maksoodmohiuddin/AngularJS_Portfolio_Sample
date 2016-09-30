(function () {
    'use strict';

    var commonModule = angular.module('ambassadors.commonModule');

    commonModule.service('commonService', ['$http', '$q', function ($http, $q) {

        this.getSettingsView = function () {

            var deferred = $q.defer();

            $http.get('/api/settings')
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        };

        this.getUserClaims = function () {
            var deferred = $q.defer();

            $http.get('/api/profile')
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        this.submitFeedback = function (feedback) {
            var deferred = $q.defer();

            $http.post('/api/feedback', feedback)
               .success(function () {
                   deferred.resolve();
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };
    }]);
})();
