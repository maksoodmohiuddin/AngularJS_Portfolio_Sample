/***
 * Service: rewardDataContext 
 *
 * Handles all persistence and creation/deletion of reward entities
 * using BreezeJS.
 *
 ***/
(function () {
    'use strict';

    var adminModule = angular.module('ambassadors.adminModule');

    adminModule.factory('rewardsDataContext',
    ['$q', '$state', 'logger', 'entityManager', dataContext]);

    function dataContext($q, $state, logger, emProvider) {
   
        var manager = emProvider.createManager();

        var service = {
            getChangesCount: getChangesCount,
            getHasChanges: hasChanges,
            getRewardDefinitions: getRewardDefinitions
        };

        return service;

        /*** implementation ***/

        function getChangesCount() {
            return manager.getChanges().length;
        }

        function hasChanges() {
            return manager.hasChanges();
        }

        function getRewardDefinitions(forceRefresh) {
            debugger
            var count;
            if (forceRefresh) {
                if (manager.hasChanges()) {
                    count = getChangesCount();
                    manager.rejectChanges(); // undo all unsaved changes!                   
                }
            }

            var rewardDefinitionsPromise = breeze.EntityQuery.from('RewardDefinitions')
                .using(manager).execute();

            return $q.all([rewardDefinitionsPromise])
                .then(success)
                .catch(failed);

            function success(data) {
                debugger
                return data[0].results;
            }
            function failed(error) {
                var message = error.message || "reward query failed";           
            }
        }       
    }
})();