

(function () {
    'use strict';

    var missionsModule = angular.module('ambassadors.missionsModule');

    missionsModule.controller('missionsController', ['$scope', '$state', 'missionsDataContext',
        function ($scope, $state, missionsDataContext) {

            
            var init = function () {
                loadData();
            };

            var loadData = function () {
                return missionsDataContext.getChallengeDefinitions(true)
                 .then(
                      // Success Handler
                     function (challengeDefinitions) {

                         $scope.userChallenges = [];
                         $scope.filterOptions = [];
                         $scope.specList = [];

                         //set some defaults

                         challengeDefinitions.forEach(function (challenge) {

                             var ambassadorChallenge = missionsDataContext.getAmbassadorChallengeLocally(challenge.challengeDefinitionId);

                             var challengeObj = {
                                 challengeDefinitionId: challenge.challengeDefinitionId,
                                 description: challenge.displayDescription,
                                 displayName: challenge.displayName,
                                 iconUri: challenge.iconUri,
                                 specializationDisplayName: challenge.specialization.displayName,
                                 specializationId: challenge.specializationId,
                                 startDate: challenge.effectiveDate,
                                 endDate: challenge.expirationDate,
                                 threshold: challenge.threshold,
                                 hasAccepted: ambassadorChallenge != null,
                                 hasCompleted: (ambassadorChallenge != null && ambassadorChallenge.closedDate != null) ? true : false,
                                 progress: (ambassadorChallenge != null) ? ambassadorChallenge.processedActivitiesCount : 0,
                                 lastActivityCompletedDate: (ambassadorChallenge != null) ? ambassadorChallenge.lastActivityCompletedDate : null,
                                 activities: []
                             };

                             var ambassadorClaimedRewards = missionsDataContext.getAmbassadorClaimedRewardsLocally(challenge.challengeDefinitionId);
                             var ambassadorClaimedRewardCount = (ambassadorClaimedRewards == null) ? 0 : ambassadorClaimedRewards.length;
                             challengeObj.hasClaimedRewards = challengeObj.hasCompleted && challenge.challengeRewards.length == ambassadorClaimedRewardCount;

                             //build up the list of specs but check for duplicates
                             if ($scope.specList.indexOf(challengeObj.specializationDisplayName) == -1) {
                                 $scope.specList.push(challengeObj.specializationDisplayName);
                             }

                             //  $scope.orderList = "-lastActivityCompletedDate";
                             $scope.hasAcceptedFilter = "";

                             //add enabled challenge activities
                             challenge.challengeActivities.forEach(function (challengeActivity) {
                                 if (challengeActivity.activity.isEnabled) {
                                     var activityObj = {
                                         activityId: challengeActivity.activity.activityId,
                                         displayName: challengeActivity.activity.displayName,
                                         description: challengeActivity.activity.displayDescription
                                     };
                                     challengeObj.activities.push(activityObj);
                                 }
                             });

                             $scope.userChallenges.push(challengeObj);
                         });
                         

                         //here we set the list of specs for the filter
                         for (var i = 0, tot = $scope.specList.length; i < tot; i++) {
                             $scope.filterOptions.push({ "specializationDisplayName": $scope.specList[i] });
                         }
                     },
                     // Failure Handler
                     function () {
                         // $state.go('error');
                     });
            };

            init();

        }]);
})();
