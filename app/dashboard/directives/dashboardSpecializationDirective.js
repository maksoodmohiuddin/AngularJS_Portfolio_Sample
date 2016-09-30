(function () {
    'use strict';

    var dashboardModule = angular.module('ambassadors.dashboardModule');

    dashboardModule.directive('dashboardSpecializationDirective', ['$state',
      function ($state) {
          return {
              restrict: 'E',
              scope: {
                  specialization: '='
              },
              templateUrl: '/Scripts/app/dashboard/views/dashboard_specialization_directive.tpl.html',
              link: function (scope, element, attrs) {
                  
              }
          };
      }]);
})();