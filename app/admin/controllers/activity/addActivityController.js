(function () {
    'use strict';

    var adminModule = angular.module('ambassadors.adminModule');

    adminModule.controller('addActivityController', ['$scope', '$state', '$stateParams', '$timeout', '$filter', 'adminService',
      function ($scope, $state, $stateParams, $timeout, $filter, adminService) {
          var init = function () {
              // Initialize
              $scope.specializationid = $stateParams.specializationid;

              // Note: In browsers that do not yet support the HTML5 date input, a text element will be used. 
              // In that case, text must be entered in a valid ISO-8601 date format (), for example: 2009-01-06. 
              // Since many modern browsers do not yet support this input type, providing cues to users on the expected input format via placeholder 
              $scope.dateFormat = 'yyyy-MM-dd';

              $scope.today = new Date();
              // Trick to elimiate time component from javascript time object so we can compare with Angular Date object
              $scope.today.setHours(0, 0, 0, 0);
              
              $scope.activity = {
                  specializationId: $scope.specializationid,
                  displayName: "",
                  description: "",
                  effectiveDate: "",
                  expirationDate: "",
                  experiencePoints: ""              
              };

              $scope.message = "";
          };

          $scope.addActivity = function () {
              $scope.message = "";

              if ($scope.activity.displayName === "" || $scope.activity.displayName === null) {
                  $scope.message = "Display Name is required";
                  return;
              }

              if ($scope.activity.description === "" || $scope.activity.displayName === null) {
                  $scope.message = "Description is required";
                  return;
              }

              if ($scope.activity.experiencePoints === "" || $scope.activity.experiencePoints == null) {
                  $scope.message = "XP is required";
                  return;
              }

              if ($scope.activity.effectiveDate === "" || $scope.activity.effectiveDate === null) {
                  $scope.message = "Effective Date is required";
                  return;
              }
              else if ($scope.activity.effectiveDate < $scope.today) {
                $scope.message = "Effective Date cannot be before today's date";
                return;
              }              

              // expiration date can be null
              if ($scope.activity.expirationDate !== "") {
                  if ($scope.activity.expirationDate < $scope.today) {
                      $scope.message = "Expiration Date cannot be before today's date";
                      return;
                  }

                  if ($scope.activity.expirationDate < $scope.activity.effectiveDate) {
                      $scope.message = "Effective Date cannot be before Expiration Date";;
                      return;
                  }                
              }
                      
              adminService.putActivity($scope.activity).then(
                    // Success Handler
                   function (result) {
                       $scope.message = "Activity added to the specialization";
                       $timeout(function () {
                           $scope.message = "";
                           $state.go('managespecialization', {
                               id: $scope.specializationid
                           });
                       }, 3000);
                   },
                   // Failure Handler
                   function () {
                       $scope.message = "Error adding activity to the specialization";
                   });
          };

          $scope.showMessage = function () {
              return $scope.message && $scope.message.length > 0;
          };            
              
          init();

      }]);
})();