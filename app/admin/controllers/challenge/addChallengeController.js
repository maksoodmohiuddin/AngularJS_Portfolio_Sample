(function () {
    'use strict';

    var adminModule = angular.module('ambassadors.adminModule');

    adminModule.controller('addChallengeController', ['$scope', '$state', '$stateParams', '$timeout', '$filter', 'adminService',
      function ($scope, $state, $stateParams, $timeout, $filter, adminService) {
          var init = function () {
              // Initialize
              $scope.specializationId = $stateParams.specializationid;
             

              // Note: In browsers that do not yet support the HTML5 date input, a text element will be used. 
              // In that case, text must be entered in a valid ISO-8601 date format (), for example: 2009-01-06. 
              // Since many modern browsers do not yet support this input type, providing cues to users on the expected input format via placeholder 
              $scope.dateFormat = 'yyyy-MM-dd';

              $scope.today = new Date();
              // Trick to elimiate time component from javascript time object so we can compare with Angular Date object
              $scope.today.setHours(0, 0, 0, 0);

              $scope.message = "";              

              $scope.challenge = {
                  specializationId: $scope.specializationId,
                  displayName: "",
                  description: "",
                  threshold: "",
                  effectiveDate: "",
                  expirationDate: "",
                  iconUri: '../../../../Content/images/defaults/mission.png',                  
                  enabled:false
              };
             
              $scope.message = "";
          };

          $scope.addChallenge = function () {              
              $scope.message = "";

              if ($scope.challenge.displayName === "" || $scope.challenge.displayName === null) {
                  $scope.message = "Display Name is required";
                  return;
              }

              if ($scope.challenge.description === "" || $scope.challenge.description === null) {
                  $scope.message = "Description is required";
                  return;
              }
              
              if ($scope.challenge.threshold === "" || $scope.challenge.threshold === null) {
                  $scope.message = "Threshold is required";
                  return;
              }

              if ($scope.challenge.effectiveDate === "" || $scope.challenge.effectiveDate === null) {
                  $scope.message = "Effective Date is required";
                  return;
              }
              else if ($scope.challenge.effectiveDate < $scope.today) {
                  $scope.message = "Effective Date cannot be before today's date";
                  return;
              }

              if ($scope.challenge.expirationDate !== "") {
                  if ($scope.challenge.expirationDate < $scope.today) {
                      $scope.message = "Expiration Date cannot be before today's date";
                      return;
                  }

                  if ($scope.challenge.expirationDate < $scope.challenge.effectiveDate) {
                      $scope.message = "Effective Date cannot be before Expiration Date";
                      return;
                  }
              }              

              adminService.putChallenge($scope.challenge).then(
                    // Success Handler
                   function (result) {
                       $scope.challengeDefinitionId = result;
                       $scope.message = "Challenge added to the specialization";
                       $timeout(function () {
                           $scope.message = "";
                           $state.go('managechallenge', {
                               challengedefinitionid: $scope.challengeDefinitionId
                           });                     
                       }, 3000);
                   },
                   // Failure Handler
                   function () {
                       $scope.message = "Error adding challenge to the specialization";
                   });
          };

          $scope.showMessage = function () {
              return $scope.message && $scope.message.length > 0;
          };


          $scope.uploadIcon = function (files) {
              // take the first file, its kind of a heck since angular does not have ng-model support for File
              var icon = files[0];

              adminService.uploadIcon(icon).then(
                   // Success Handler
                  function (result) {
                      // update the scec icon in the controller 
                      $scope.challenge.iconUri = result[0].location;
                  },
                  // Failure Handler
                  function () {
                      $scope.messageInfo = "Error uploading challenge icon";
                  })
                 .finally(function () {
                 });
          };

          // Note: This is not needed yet but if we decide to link activites in Challenge creation then we will need this
          var loadActivitiesForSpecialization = function () {
              return adminService.getActivitiesForSpecialization($scope.challenge.specializationId)
               .then(
                    // Success Handler
                   function (result) {
                       $scope.activitiesForSpecialization = [];
                       _.each(result, function (activity) {
                           var activityObject = {
                               isLinked: false,
                               name: activity.displayName,
                               experiencePoints: activity.experiencePoints,
                               activityId: activity.activityId,
                               threshold: 0
                           };

                           $scope.activitiesForSpecialization.push(activityObject);
                       });
                   },
                   // Failure Handler
                   function () {
                       $state.go('error');
                   });
          };


          init();

      }]);
})();