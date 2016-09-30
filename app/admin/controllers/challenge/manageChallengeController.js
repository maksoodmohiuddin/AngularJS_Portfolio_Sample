(function () {
    'use strict';

    var adminModule = angular.module('ambassadors.adminModule');

    adminModule.controller('manageChallengeController', ['$scope', '$state', '$stateParams', '$timeout', '$filter', '$modal', 'adminService',
      function ($scope, $state, $stateParams, $timeout, $filter, $modal, adminService) {
          var init = function () {
              // Initialize
              $scope.challengeDefinitionId = $stateParams.challengedefinitionid;              
             
              // Note: In browsers that do not yet support the HTML5 date input, a text element will be used. 
              // In that case, text must be entered in a valid ISO-8601 date format (), for example: 2009-01-06. 
              // Since many modern browsers do not yet support this input type, providing cues to users on the expected input format via placeholder 
              $scope.dateFormat = 'yyyy-MM-dd';

              $scope.today = new Date();
              // Trick to elimiate time component from javascript time object so we can compare with Angular Date object
              $scope.today.setHours(0, 0, 0, 0);

              loadData();
             
              // Defining grid and cell template as per http://angular-ui.github.io/ng-grid/
              var checkboxCellTemplate = '<div class="ngSelectionCell"><input type="checkbox" ng-model="row.entity.isLinked" ng-change="linkUnlinkActivity(row.entity)"></div>';
             
              $scope.availableActivitiesGrid = {
                  data: 'activitiesForSpecialization',
                  enableCellSelection: true,
                  enableRowSelection: true,
                  enableCellEditOnFocus: true,
                  columnDefs: [                     
                      { displayName: 'Link', enableCellEdit: false, width: '10%', cellTemplate: checkboxCellTemplate },
                      { field: 'name', displayName: 'Activity', width: '70%', enableCellEdit: false },
                      { field: 'experiencePoints', displayName: 'XP', width: '20%', enableCellEdit: false }]
              };              
              
              $scope.message = "";
          };

          var loadData = function () {
              return adminService.getChallengeById($scope.challengeDefinitionId)
               .then(
                    // Success Handler
                   function (result) {                       
                       $scope.challenge = result.adminChallenge;                      
                       
                       $scope.activitiesForSpecialization = [];
                       _.each(result.activities, function (activity) {
                           var activityObject = {                              
                               isLinked: activity.isLinked,
                               name: activity.displayName,
                               experiencePoints: activity.experiencePoints,
                               activityId: activity.activityId                               
                           };

                           $scope.activitiesForSpecialization.push(activityObject);
                       });
                   },
                   // Failure Handler
                   function () {
                       $state.go('error');
                   });
          };

          $scope.updateChallenge = function () {
              $scope.message = "";

              if ($scope.challenge.displayName === "" || $scope.challenge.displayName  === null) {
                  $scope.message = "Display Name is required";
                  return;
              }

              if ($scope.challenge.description === "" || $scope.challenge.description === null) {
                  $scope.message = "Description is required";
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
                      $scope.message = "Effective Date cannot be before Expiration Date";;
                      return;
                  }                 
              }             

              adminService.postChallenge($scope.challenge).then(
                    // Success Handler
                   function (result) {
                       $scope.message = "Challenge updated.";
                       $timeout(function () {
                           $scope.message = "";
                           $state.go('managespecialization', {
                               id: $scope.challenge.specializationId
                           });
                       }, 3000);
                   },
                   // Failure Handler
                   function (error) {
                       $scope.message = "Error: " + error;
                   });
          };

          $scope.linkUnlinkActivity = function (activityToLinkUnlink) {
              
              var activity = {
                  challengeId: $scope.challengeDefinitionId,
                  activityId: activityToLinkUnlink.activityId
              }             
              
              if (activityToLinkUnlink.isLinked) {
                  activity.threshold = $scope.challenge.threshold;
                  linkActivityToChallenge(activity);
              }
              else {
                  unlinkActivityFromChallenge(activity);
              }
          }

          var linkActivityToChallenge = function (linkActivity) {
              adminService.linkActivityToChallenge(linkActivity).then(
                   // Success Handler
                  function (result) {
                      $scope.message = "Activity linked to challenge.";
                      $timeout(function () {
                          $scope.message = "";
                      }, 3000);
                  },
                  // Failure Handler
                  function () {
                      $scope.message = "Error linking activity to challenge.";
                  });
          };

          var unlinkActivityFromChallenge = function (unlinkActivity) {
              adminService.unlinkActivityFromChallenge(unlinkActivity).then(
                   // Success Handler
                  function (result) {
                      $scope.message = "Activity unlinked from challenge.";
                      $timeout(function () {
                          $scope.message = "";
                      }, 3000);
                  },
                  // Failure Handler
                  function () {
                      $scope.message = "Error unlinking activity from challenge.";
                  });
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

          $scope.showMessage = function () {
              return $scope.message && $scope.message.length > 0;
          };

          init();

      }]);
})();