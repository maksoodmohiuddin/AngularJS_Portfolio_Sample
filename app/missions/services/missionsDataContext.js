/***
 * Service: challengeDataContext 
 *
 * Handles all persistence and creation/deletion of user challenge entities
 * using BreezeJS.
 *
 ***/
(function () {
    'use strict';

    var missionsModule = angular.module('ambassadors.missionsModule');
    var serviceId = 'missionsDataContext';

    missionsModule.factory(serviceId,
    ['$q', '$state', 'logger', 'entityManager', dataContext]);

    function dataContext($q, $state, logger, emProvider) {
        //logger = logger.forSource(serviceId);
        //var logError = logger.logError;
        //var logSuccess = logger.logSuccess;
        //var logWarning = logger.logWarning;

        var manager = emProvider.createManager();

        var service = {
            getChangesCount: getChangesCount,
            getHasChanges: hasChanges,
            getChallengeDefinitions: getChallengeDefinitions,
            getAcceptedChallenges: getAcceptedChallenges,
            getAmbassadorChallengeLocally: getAmbassadorChallengeLocally,
            getAmbassadorClaimedRewardsLocally: getAmbassadorClaimedRewardsLocally
        };

        return service;

        /*** implementation ***/

        function getChangesCount() {
            return manager.getChanges().length;
        }

        function getChallengeDefinitions(forceRefresh) {
            debugger
            var count;
            if (forceRefresh) {
                if (manager.hasChanges()) {
                    count = getChangesCount();
                    manager.rejectChanges(); // undo all unsaved changes!
                    //logWarning('Discarded ' + count + ' pending change(s)', null, true);
                }
            }

            var challengeDefinitionPromise = breeze.EntityQuery.from('ChallengeDefinitions')
                .expand('specialization, challengeActivities, challengeActivities.activity, challengeRewards')
                .using(manager).execute();

            var ambassadorChallengesPromise = breeze.EntityQuery.from('AmbassadorChallenges') 
                .using(manager).execute();

            var ambassadorClaimedRewardsPromise = breeze.EntityQuery.from('AmbassadorClaimedRewards')
                .using(manager).execute();

            return $q.all([challengeDefinitionPromise, ambassadorChallengesPromise, ambassadorClaimedRewardsPromise])
                .then(success)
                .catch(failed);

            function success(data) {
                debugger
                return data[0].results;
            }
            function failed(error) {
                var message = error.message || "challenges query failed";
                //logError(message, error, true);
                console.log("challenges query failed: " + message);
                //$state.go('error');
            }
        }

        function getAmbassadorChallengeLocally(challengeDefinitionId) {

            var query = breeze.EntityQuery
                .from('AmbassadorChallenges')
                .where('challengeDefinitionId', 'equals', challengeDefinitionId)
                .toType('AmbassadorChallenge');

            var ambassadorChallenges = query.using(manager).executeLocally();

            if (ambassadorChallenges == undefined || ambassadorChallenges.length == 0)
                return null;

            return ambassadorChallenges[0];
        }

        function getAmbassadorClaimedRewardsLocally(challengeDefinitionId) {

            var query = breeze.EntityQuery
                .from('AmbassadorClaimedRewards')
                .where('challengeDefinitionId', 'equals', challengeDefinitionId)
                .toType('AmbassadorClaimedReward');

            var ambassadorClaimedRewards = query.using(manager).executeLocally();

            if (ambassadorClaimedRewards == undefined || ambassadorClaimedRewards.length == 0)
                return null;

            return ambassadorClaimedRewards;
        }

        function getAcceptedChallenges(forceRefresh) {
            var count;
            if (forceRefresh) {
                if (manager.hasChanges()) {
                    count = getChangesCount();
                    manager.rejectChanges(); // undo all unsaved changes!
                    //logWarning('Discarded ' + count + ' pending change(s)', null, true);
                }
            }

            //Todo: when no forceRefresh, consider getting from cache rather than remotely
            return breeze.EntityQuery.from('AmbassdorChallenges').orderByDesc("createdDate")
                //.orderBy('created desc, title')
                .expand('challengeDefinitions')
                .using(manager).execute()
                //.expand('Activities')
                .then(success).catch(failed);

            function success(response) {
                count = response.results.length;
                console.log('Got ' + count + ' challenges(s)', response, true);
                return response.results;
            }
            function failed(error) {
                var message = error.message || "challenges query failed";
                console.log("failed: " + message);
                //$state.go('error');
            }
        }

        function hasChanges() {
            return manager.hasChanges();
        }

    }
})();