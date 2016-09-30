(function () {
    'use strict';

    var joinModule = angular.module('ambassadors.joinModule');

    joinModule.directive('joinSpecializationDirective', ['$state', 'joinService', 
      function ($state, joinService) {
          return {
              restrict: 'E',
              scope: {
                  index: '=',
                  spec: '='
              },
              templateUrl: '/Scripts/app/join/views/join_specialization_directive.tpl.html',
              link: function (scope, element, attrs) {

                  scope.indexer = scope.index;

                  scope.joinSpec = function (spec) {                   
                      return joinService.joinSpecialization(spec)
                       .then(
                            // Success Handler
                           function (result) {
                               console.log(result)
                               spec.isPending = true;
                           },
                           // Failure Handler
                           function () {
                               $state.go('error');
                           });
                  };

                  scope.$on('joinSpecializationRequestResult', function (e, notificationType, specId) {                    
                      if (scope.spec.specializationId == specId) {
                          scope.spec.isPending = false;
                          if (notificationType === "JoinSpecializationSuccess") {
                              scope.spec.hasJoined = true;
                          }
                          else { // JoinSpecializationReject
                              scope.spec.isRejected = true;
                          }
                          scope.$apply();
                      }
                  });

              }
          };
      }]);
})();
