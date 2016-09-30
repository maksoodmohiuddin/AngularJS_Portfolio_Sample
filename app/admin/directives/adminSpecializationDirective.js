(function () {
    'use strict';

    var adminModule = angular.module('ambassadors.adminModule');

    adminModule.directive('adminSpecializationDirective', ['$state',
      function ($state) {
          return {
              restrict: 'E',
              scope: {
                  specialization: '=' 
              },
              templateUrl: '/Scripts/app/admin/views/specialization/admin_specialization_directive.tpl.html',
              link: function (scope, element, attrs) {
                  scope.placeholderIconUri = "";

                  scope.manageSpecialization = function () {                      
                      $state.go('managespecialization', {
                          id: scope.specialization.specializationId
                      });
                  };
              }
          };          
      }]);
})();
