(function () {
    'use strict';

    var adminModule = angular.module('ambassadors.adminModule');

    adminModule.controller('addSpecializationController', ['$scope', '$state', '$timeout', 'adminService',
      function ($scope, $state, $timeout, adminService) {
          var init = function () {
              // Initialize
              $scope.specialization = {
                  displayName: "",
                  description: "",
                  isPublic: false,
                  isPublished: false, 
                  iconUri: '../../../../Content/images/defaults/specialization.png'
              };

              $scope.message = "";
          };
      
          $scope.createSpecialization = function () {              
              $scope.message = "";

              if ($scope.specialization.displayName === "") {
                  $scope.message = "Display Name is required";
                  return;
              }

              if ($scope.specialization.description === "") {
                  $scope.message = "Description is required";;
                  return;
              }

              adminService.putSpecialization($scope.specialization).then(                  
                    // Success Handler
                   function (result) {                       
                       $scope.message = "Specialization created";                      
                       $timeout(function () {
                           $scope.message = "";
                           $state.go('managespecialization', {
                               id: result
                           });
                       }, 3000);
                   },
                   // Failure Handler
                   function (result) {
                       $scope.message = result;
                   });
          };

          $scope.showMessage = function () {
              return $scope.message && $scope.message.length > 0;
          };

          init();

      }]);
})();