(function () {
    'use strict';

    var adminModule = angular.module('ambassadors.adminModule');

    adminModule.directive('adminRequirementDirective', ['$state', '$timeout', 'adminService', 
    function ($state, $timeout, adminService) {
        return {             
              restrict: 'E',
              scope: {
                  requirements: '='              
              },
              templateUrl: '/Scripts/app/admin/views/requirement/admin_requirement_directive.tpl.html',
              link: function (scope, element, attrs) {
                  debugger
                  scope.messageRequirement = "";
                                  
                  var checkboxCellTemplate = '<div class="ngSelectionCell col-md-3"><input type="checkbox" ng-model="row.entity.isLinked" ng-change="linkUnlinkRequirement(row.entity)"></div>';
                  scope.specializationRequirementsGrid = {
                      data: 'requirements',
                      enableCellSelection: true,
                      enableRowSelection: true,
                      enableCellEditOnFocus: true,
                      columnDefs: [
                          { displayName: 'Link', enableCellEdit: false, width: '5%', cellTemplate: checkboxCellTemplate },
                          { field: 'requirement', displayName: 'Value', enableCellEdit: false, visible: false, width: '0%', },
                          { field: 'requirementText', displayName: 'Requirement', enableCellEdit: false, width: '80%' },
                          { field: 'value', displayName: 'Value', enableCellEdit: true, width: '15%' }]
                  };

                  scope.linkUnlinkRequirement = function (requirementToLinkUnlink) {
                      var requirement = {
                          specializationId: scope.specializationId,
                          requirement: requirementToLinkUnlink.requirement,
                          value: requirementToLinkUnlink.value
                      }

                      if (requirementToLinkUnlink.isLinked) {
                          linkRequirementToSpecialization(requirement);
                      }
                      else {
                          unlinkRequirementFromSpecialization(requirement);
                      }
                  };

                  scope.showMessageRequirement = function () {
                      return scope.messageRequirement && scope.messageRequirement.length > 0;
                  };

                  var linkRequirementToSpecialization = function (linkRequirement) {
                      adminService.linkRequirementToSpecialization(linkRequirement).then(
                           // Success Handler
                          function (result) {
                              scope.messageRequirement = "Requirement linked to Specialization.";
                              $timeout(function () {
                                  scope.messageRequirement = "";
                              }, 3000);
                          },
                          // Failure Handler
                          function () {
                              scope.messageRequirement = "Error linking requirement to Specialization.";
                          });
                  };

                  var unlinkRequirementFromSpecialization = function (unlinkRequirement) {
                      adminService.unlinkRequirementFromSpecialization(unlinkRequirement).then(
                           // Success Handler
                          function (result) {
                              scope.messageRequirement = "Requirement unlinked from Specialization.";
                              $timeout(function () {
                                  scope.messageRequirement = "";
                              }, 3000);
                          },
                          // Failure Handler
                          function () {
                              scope.messageRequirement = "Error unlinking requirement from Specialization.";
                          });
                  };
              }
          };
      }]);
})();
