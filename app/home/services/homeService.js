(function () {
    'use strict';

    var homeModule = angular.module('ambassadors.homeModule');

    homeModule.service('homeService', ['$http', '$q', function ($http, $q) {

        this.getHomeContent = function () {

            var deferred = $q.defer();

            $http.get('/api/compasshomecontent')
                .success(function (response) {
                    console.log('/api/compasshomecontent success');
                    console.log(JSON.stringify(response));
                    deferred.resolve(response);
                })
                .error(function (response) {
                    console.log('/api/compasshomecontent error');
                    console.log(JSON.stringify(response));
                    deferred.reject(response);
                });

            return deferred.promise;
        };
    }]);
})();