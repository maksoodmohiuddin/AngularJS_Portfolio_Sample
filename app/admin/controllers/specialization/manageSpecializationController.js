(function () {
    'use strict';

    var adminModule = angular.module('ambassadors.adminModule');

    adminModule.controller('manageSpecializationController', ['$scope', '$state', '$stateParams', '$timeout', '$modal', 'adminService', 'rewardsDataContext',
      function ($scope, $state, $stateParams, $timeout, $modal, adminService, rewardsDataContext) {
          var init = function () {             
              
              $scope.specializationId = $stateParams.id;
              $scope.messageInfo = "";
              $scope.messageRequirement = "";          
             
              loadData();
              loadRewards();
          };

          var loadData = function () {

              $scope.loading = true;

              return adminService.getSpecializationById($scope.specializationId)
               .then(
                    // Success Handler
                   function (result) {                       
                       $scope.specialization = result.adminSpecializations[0];
                       $scope.requirementsForSpecialization = result.adminSpecializationRequirements;                      

                       $scope.challengesForSpecialization = [];
                       _.each($scope.specialization.challenges, function (challenge) {
                           var challengeObject = {
                               challengeDefinitionId: challenge.challengeDefinitionId,
                               name: challenge.displayName,
                               description: challenge.description,
                               threshold: challenge.Threshold
                           };

                           $scope.challengesForSpecialization.push(challengeObject);
                       });

                       $scope.activitiesForSpecialization = [];
                       _.each($scope.specialization.activities, function (activity) {
                           var activityObject = {
                               activityId: activity.activityId,
                               name: activity.displayName,
                               description: activity.description,
                               experiencePoints: activity.experiencePoints
                           };

                           $scope.activitiesForSpecialization.push(activityObject);
                       });
                   },
                   // Failure Handler
                   function () {                      
                       $state.go('error');
                   })
               .finally(function () {
                   $scope.loading = false;
               });
          };

          var loadRewards = function () {
              return rewardsDataContext.getRewardDefinitions(true)
               .then(
                    // Success Handler
                   function (rewardDefinitions) {
                       debugger
                       console.log(rewardDefinitions);
                       $scope.rewards = [];

                       rewardDefinitions.forEach(function (reward) {

                           var rewardObj = {
                               rewardDefinitionId: reward.rewardDefinitionId,
                               displayName: reward.displayName,
                               displayDescription: reward.displayDescription,
                               payload: reward.payload,
                               rewardType: reward.rewardType,
                               totalClaimedRewards: reward.totalClaimedRewards,
                               createdDate: reward.createdDate,
                               availableRewardsNotificationThreshold: reward.availableRewardsNotificationThreshold
                           };                         

                           $scope.rewards.push(rewardObj);
                       });

                   },
                   // Failure Handler
                   function () {                       
                   });
          };

          var editChallengeCellTemplate = '<div class="ngSelectionCell"><button class="glyphicon glyphicon-pencil" ng-click="editChallenge(row.entity.challengeDefinitionId)" ng-bind="row.getProperty(col.field)"></button></div>';
          $scope.specializationChallengesGrid = {
              data: 'challengesForSpecialization',
              enableCellSelection: false,
              enableRowSelection: true,
              enableCellEditOnFocus: false,
              columnDefs: [
                  { field: 'challengeDefinitionId', displayName: 'Id', enableCellEdit: false, width: '10%', cellTemplate: editChallengeCellTemplate },
                  { field: 'name', displayName: 'Name', width: '20%', enableCellEdit: false },
                  { field: 'description', displayName: 'Description', width: '70%', enableCellEdit: false }]
          };

          var editActivityCellTemplate = '<div class="ngSelectionCell"><button class="glyphicon glyphicon-pencil" ng-click="editActivity(row.entity.activityId)" ng-bind="row.getProperty(col.field)"></button></div>';
          $scope.specializationActivitiesGrid = {
              data: 'activitiesForSpecialization',
              enableCellSelection: false,
              enableRowSelection: true,
              enableCellEditOnFocus: false,
              columnDefs: [
                  { field: 'activityId', displayName: 'Id', enableCellEdit: false, width: '10%', cellTemplate: editActivityCellTemplate },
                  { field: 'name', displayName: 'Name', width: '20%', enableCellEdit: false },
                  { field: 'description', displayName: 'Description', width: '70%', enableCellEdit: false }]
          };
                  
          var linkCellTemplate = '<div class="ngSelectionCell col-md-3"><input type="checkbox" ng-model="row.entity.isLinked" ng-change="linkUnlinkRequirement(row.entity)"></div>';
          var valueCellTemplate = '<div><input type="text" style="font-color:red" ng-if="row.entity.isValueRequired" ng-model="row.entity.value" ng-click="setToUnlinked(row.entity)"></div>';
          
          $scope.specializationRequirementsGrid = {
              data: 'requirementsForSpecialization',
              enableCellSelection: true,
              enableRowSelection: true,
              enableCellEditOnFocus: true,
              columnDefs: [
                  { displayName: 'Link', enableCellEdit: false, width: '5%', cellTemplate: linkCellTemplate },
                  { field: 'requirement', displayName: 'Value', enableCellEdit: false, visible: false, width: '0%', },
                  { field: 'requirementText', displayName: 'Requirement', enableCellEdit: false, width: '80%' },
                  //{ displayName: 'Value', enableCellEdit: true, width: '15%', cellTemplate: valueCellTemplate }]
                  { field: 'value', displayName: 'Value', enableCellEdit: true, width: '15%', cellTemplate: valueCellTemplate }]
          };
          
          var editRewardCellTemplate = '<div class="ngSelectionCell"><button class="glyphicon glyphicon-pencil" ng-click="editReward(row.entity.rewardDefinitionId)" ng-bind="row.getProperty(col.field)"></button></div>';
          $scope.rewardsGrid = {
              data: 'rewards',
              enableCellSelection: false,
              enableRowSelection: true,
              enableCellEditOnFocus: false,
              columnDefs: [
                  { field: 'rewardDefinitionId', displayName: 'Id', enableCellEdit: false, width: '10%', cellTemplate: editRewardCellTemplate },
                  { field: 'displayName', displayName: 'Name', width: '20%', enableCellEdit: false },
                  { field: 'payload', displayName: 'Payload', width: '70%', enableCellEdit: false }]
          };
          
          $scope.updateSpecialization = function () {
              $scope.messageInfo = "";

              if ($scope.specialization.displayName === "") {
                  $scope.messageInfo = "Display Name is required";
                  return;
              }

              if ($scope.specialization.description === "") {
                  $scope.messageInfo = "Description is required";;
                  return;
              }
                         
              adminService.postSpecialization($scope.specialization).then(
                    // Success Handler
                   function (result) {
                       $scope.messageInfo = "Specialization updated";
                       $timeout(function () {
                           $scope.messageInfo = "";
                       }, 3000);
                   },
                   // Failure Handler
                   function () {
                       $scope.messageInfo = "Error updating specialization";
                   });
          };

          $scope.createActivity = function () {
              $state.go('addactivity', {
                  specializationid: $scope.specializationId
              });
          };

          $scope.editActivity = function (activityId) {
              $state.go('manageactivity', {
                  activityid: activityId
              });
          };

          $scope.createChallenge = function () {
              $state.go('addchallenge', {
                  specializationid: $scope.specializationId
              });
          };

          $scope.editChallenge = function (challengeDefinitionId) {
              $state.go('managechallenge', {
                  challengedefinitionid: challengeDefinitionId
              });
          };

          $scope.createReward = function () {
              console.log('createReward');
          };

          $scope.editReward = function (rewardDefinitionId) {
              console.log('editReward');
          };

          $scope.uploadIcon = function (files) {
              $scope.loading = true;

              // take the first file, its kind of a heck since angular does not have ng-model support for File
              var icon = files[0];

              adminService.uploadIcon(icon).then(
                   // Success Handler
                  function (result) {                     
                      // update the scec icon in the controller 
                      $scope.specialization.iconUri = result[0].location;

                      // update the backend with updated spec uri
                      $scope.updateSpecialization();
                     
                  },                 
                  // Failure Handler
                  function () {
                      $scope.messageInfo = "Error uploading specialization icon";
                  })
                 .finally(function () {
                     $scope.loading = false;
              });
          };

          $scope.linkUnlinkRequirement = function (requirementToLinkUnlink) {              
              var requirement = {
                  specializationId: $scope.specializationId,
                  requirement: requirementToLinkUnlink.requirement,
                  value: requirementToLinkUnlink.value
              }

              if (requirementToLinkUnlink.isLinked) {                  
                  if (requirementToLinkUnlink.isValueRequired && requirementToLinkUnlink.value === ""){
                      $scope.messageRequirement = "Value is required to link this requirement.";
                      // update UI to reflect validation fail
                      requirementToLinkUnlink.isLinked = false;
                      return;
                  }

                  linkRequirementToSpecialization(requirement);
              }
              else {
                  unlinkRequirementFromSpecialization(requirement);
              }
          }

          $scope.setToUnlinked = function (requirement) {              
              requirement.isLinked = false;
          }
                  
          var linkRequirementToSpecialization = function (linkRequirement) {
              adminService.linkRequirementToSpecialization(linkRequirement).then(
                   // Success Handler
                  function (result) {
                      $scope.messageRequirement = "Requirement linked to Specialization.";
                      $timeout(function () {
                          $scope.messageRequirement = "";
                      }, 3000);
                  },
                  // Failure Handler
                  function () {
                      $scope.messageRequirement = "Error linking requirement to Specialization.";
                  });
          };

          var unlinkRequirementFromSpecialization = function (unlinkRequirement) {
              adminService.unlinkRequirementFromSpecialization(unlinkRequirement).then(
                   // Success Handler
                  function (result) {
                      $scope.messageRequirement = "Requirement unlinked from Specialization.";
                      $timeout(function () {
                          $scope.messageRequirement = "";
                      }, 3000);
                  },
                  // Failure Handler
                  function () {
                      $scope.messageRequirement = "Error unlinking requirement from Specialization.";
                  });
          };
                    
          $scope.showMessageInfo = function () {
              return $scope.messageInfo && $scope.messageInfo.length > 0;
          };

          $scope.showMessageRequirement = function () {
              return $scope.messageRequirement && $scope.messageRequirement.length > 0;
          };


          $scope.showMessageIcon = function () {
              return $scope.messageIcon && $scope.messageIcon.length > 0;
          };

          $scope.publishSpecializationdDialog = function () {
              var message = "";
              if ($scope.specialization.isPublished) {
                  message = "This will published the specialization and user will be able join the specialization, do you like to proceed?";
              }
              else {
                  message = "This will un-published the specialization and user will not be able join the specialization, do you like to proceed?";
              }

              var modalInstance = $modal.open({
                  templateUrl: '/Scripts/app/admin/views/specialization/publish_specialization_dialog.tpl.html',
                  // using resolve is the way to pass data into modal controller from calling controller, data can be any JS objects
                  resolve: {
                      dialogMessage: function () {
                          return message;
                      }
                  },
                  controller: ('publishSpecializationdController', ['$scope', '$modalInstance', 'dialogMessage',
                      function ($scope, $modalInstance, dialogMessage) {
                      $scope.dialogMessage = dialogMessage;
                      $scope.publishSpecializationdDialogOk = function () {
                          // update        
                          $scope.isCancelled = false;                          
                          // using paramater in close is the way to pass data into modal controller back to calling controller, data can be any JS objects
                          $modalInstance.close($scope.isCancelled);
                      };

                      $scope.publishSpecializationdDialogCancel = function () {
                          $scope.isCancelled = true;
                          $modalInstance.close($scope.isCancelled);
                      };
                  }
                  ])
              });

              // using paramater in close is the way to pass data into modal controller back to calling controller, data can be any JS objects
              modalInstance.result.then(function (isCancelled) {
                  // reverse the selection
                  if (isCancelled) {
                      $scope.specialization.isPublished = !$scope.specialization.isPublished;
                  }
              });
          }        

          init();

      }]);
})();
