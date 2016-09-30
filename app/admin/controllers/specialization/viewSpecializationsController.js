(function () {
    'use strict';

    var adminModule = angular.module('ambassadors.adminModule');

    adminModule.controller('viewSpecializationsController', ['$scope', '$state', '$modal', 'adminService', 
    function ($scope, $state, $modal, adminService) {
         var init = function () {            
              loadData();
         };
     
         var loadData = function () {                       
             return adminService.getAllSpecializations()
              .then(
                   // Success Handler
                  function (result) {                     
                      $scope.specializations = result;
                  },
                  // Failure Handler
                  function (data) {                     
                      console.log("failure " + data);
                  })
              .finally(function () {                     
               });
         };

         $scope.createSpecialization = function () {
             $state.go('addspecialization');
         };

         $scope.broadcast = function () {           
             var modalInstance = $modal.open({
                 templateUrl: '/Scripts/app/admin/views/specialization/broadcast_notification_dialog.tpl.html',
                 // using resolve is the way to pass data into modal controller from calling controller, data can be any JS objects
                 resolve: {                     
                 },
                 controller: ('broadcastNotificationController', ['$scope', '$modalInstance', 'adminService', 
                     function ($scope, $modalInstance, adminService) {
                         $scope.notificationMessage = "";
                    
                         $scope.broadcast = function () {
                             if ($scope.notificationMessage === "") {
                                 $scope.message = "Notification message required";
                                 return;
                             }

                             var notificationModel = {
                                 Message: $scope.notificationMessage
                             };
                                                   
                             // send notification message to service bus       
                             adminService.broadcastNotification(notificationModel);
                             closeDialog();
                         };

                         $scope.cancel = function () {
                             closeDialog();
                         };

                         var closeDialog = function () {
                             $scope.message = "";
                             $modalInstance.close();
                         };

                         $scope.showMessage = function () {
                             return $scope.message && $scope.message.length > 0;
                         };
                     }])
             });
         };       

         init();

      }]);
})();
