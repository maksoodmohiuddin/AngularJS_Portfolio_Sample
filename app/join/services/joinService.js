(function () {
    'use strict';

    var joinModule = angular.module('ambassadors.joinModule');

    joinModule.service('joinService', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
 
        this.getPublishedSpecs = function () {           

            var deferred = $q.defer();

            $http.get('/api/userspecializations')
                .success(function (response) {                   
                    deferred.resolve(response);
                })
                .error(function (response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        this.joinSpecialization = function (specialization) {            
            var deferred = $q.defer();

            var joinSpecCommandModel = JSON.stringify({
                'specializationId': specialization.specializationId
            });

            $http.post('/api/specializationcommand', joinSpecCommandModel)
               .success(function (response) {
                   deferred.resolve(response);
                    if ($rootScope.isAmbassador == "false")
                        $rootScope.isAmbassador = "true";
                   console.log("join spec post success")
                })
               .error(function (response) {
                   deferred.reject(response);
                   console.log("join spec post fail")
               });

            return deferred.promise;
        };

    }]);
})();