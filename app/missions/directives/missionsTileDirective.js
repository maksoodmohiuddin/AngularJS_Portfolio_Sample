(function () {
    'use strict';

    var missionsModule = angular.module('ambassadors.missionsModule');

    missionsModule.directive('missionsTileDirective', ['$state', 'missionsService',
      function ($state, missionsService) {
          return {
              restrict: 'E',
              scope: {
                  index: '=',
                  challenge: '=',
                  maxProgress: "=",
                  currentProgress: "="
              },
              templateUrl: '/Scripts/app/missions/views/missions-tile-directive.tpl.html',
              link: function (scope, element, attrs) {
                  // DO NOT REMOVE this, for some weird reason angualar need the templateUrl to be defined in scope
                  scope.templateUrl = 'template.html';
                  scope.triggerEventStatusIcon = "";
                  scope.triggerEventTest = function (activity) {
                      console.log("trigged activity: " + activity.displayName);
                  };

                  scope.acceptChallenge = function (challenge) {
                      return missionsService.acceptChallenge(challenge)
                       .then(
                            // Success Handler
                           function (result) {
                               //console.log("acceptChallenge success " + result);
                               challenge.hasAccepted = true;
                           },
                           // Failure Handler
                           function () {
                               $state.go('error');
                           });
                  };


                  scope.triggerTestEvent = function (activity, selected) {                     

                      scope.selected = selected;

                      //scope.triggerEventStatusIcon = "fa fa fa-spin";
                      //scope.triggerEventStatusColor = "#FF8C00";

                      scope.triggerEventSuccess = false;
                      scope.triggerEventPending = true;
                      scope.triggerEventFailed = false;
                      //scope.triggerEventStatusColor = "#FF8C00";

                      return missionsService.recordActivity(activity)
                       .then(
                            // Success Handler
                           function (result) {
                               //scope.triggerEventStatusIcon = "fa fa fa-check fa-2";
                               //scope.triggerEventStatusColor = "#107c10";

                               scope.triggerEventSuccess = true;
                               scope.triggerEventPending = false;
                               scope.triggerEventFailed = false;
                               console.log("triggerTestEvent success " + result);
                           },
                           // Failure Handler
                           function () {
                               //$state.go('error');
                               //scope.triggerEventStatusIcon = "fa fa-minus-circle";
                               //scope.triggerEventStatusColor = "#FF0000";
                               scope.triggerEventFailed = true;
                               scope.triggerEventSuccess = false;
                               scope.triggerEventPending = false;

                               console.log("triggerTestEvent failed ");
                           });
                  };
              }
          };
      }]);
})();
