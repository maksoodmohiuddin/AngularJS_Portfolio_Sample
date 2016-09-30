(function () {
    'use strict';

    var joinModule = angular.module('ambassadors.joinModule');

    joinModule.controller('joinController', ['$scope', '$state', 'joinService', 
    function ($scope, $state, joinService) {

            var init = function () {
                loadData();
            };

            var loadData = function () {
                return joinService.getPublishedSpecs()
                 .then(                    
                      // Success Handler
                     function (result) {               
                         $scope.specializations = result;                        
                     },
                     // Failure Handler
                     function () {                         
                        // $state.go('error');
                     });
            };
        
            init();

        }]);
})();
