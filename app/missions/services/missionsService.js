(function () {
    'use strict';

    var missionsModule = angular.module('ambassadors.missionsModule');

    missionsModule.service('missionsService', ['$http', '$q', function ($http, $q) {

        this.acceptChallenge = function (challenge) {
            console.log("Accept challenge");
            var deferred = $q.defer();

            var acceptChallengeCommandModel = JSON.stringify({
                'ChallengeDefinitionId': challenge.challengeDefinitionId
            });

            $http.post('/api/command/acceptchallenge', acceptChallengeCommandModel)
               .success(function (response) {
                   deferred.resolve(response);
                    console.log("accept challenge  success " + challenge.challengeDefinitionId);
                })
               .error(function (response) {
                   deferred.reject(response);
                   challenge.hasAccepted = true;//need to set this to true to change the UI on success
                console.log("accept challenge error " + challenge.challengeDefinitionId);
            });

            return deferred.promise;
        };

        this.recordActivity = function (activity) {
            console.log("record activity");
            var deferred = $q.defer();

            var recordActivityCommandModel = JSON.stringify({
                'ActivityId': activity.activityId,
                'Puid': null,
                'ActivityDateTime': null
            });

            $http.post('/api/command/recordactivity', recordActivityCommandModel)
               .success(function (response) {
                   deferred.resolve(response);
                    console.log("put activity success" + activity.activityId);
                })
               .error(function (response) {
                   deferred.reject(response);
                console.log("put activity error " + activity.activityId);
            });

            return deferred.promise;
        };

    }]);

})();