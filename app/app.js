(function () {
    'use strict';

    /* App Module */
    var ambassadorsWebsite = angular.module('ambassadors', [
        'ui.router',
        'ui.bootstrap',
        'ngGrid',
        'ngCookies',
        'breeze.angular',
        'ambassadors.commonModule',
        'ambassadors.homeModule',
        'ambassadors.adminModule',
        'ambassadors.joinModule',
        'ambassadors.dashboardModule', 
        'ambassadors.missionsModule',
        'ambassadors.loungeModule',
        'ambassadors.rewardsModule'
    ]);

    ambassadorsWebsite.run(['$state', '$rootScope', '$modal', 'commonService','breeze',
    function ($state, $rootScope, $modal, commonService, breeze) {
        
        // Get MVC model property into angular from DOM 
        $rootScope.isAmbassador = angular.element(document.getElementById('isAmbassador')).text();
        $rootScope.isAdministrator = angular.element(document.getElementById('isAdministrator')).text();
        $rootScope.isAuthenticated = angular.element(document.getElementById('isAuthenticated')).text();

        // Feedback is only for alpha release, will need to remove it before public release
        $rootScope.feedbackPopup = function () {
            var modalInstance = $modal.open({
                templateUrl: '/Scripts/app/common/views/popup.tpl.html',
                backdrop: 'static',
                resolve: {
                },
                controller: ('PopupController', ['$scope', '$modalInstance', '$timeout', 'commonService',
                    function ($scope, $modalInstance, $timeout, commonService) {
                        $scope.close = function () {
                            $modalInstance.close();
                        };

                        $scope.submitFeedback = function (){                            
                          

                            $scope.feedback = {
                                FeedbackRating: $scope.score,
                                FeedbackSubject: $scope.subject,
                                FeedbackUpload: 'upload',
                                FeedbackDescription: $scope.description
                               
                            };

                            commonService.submitFeedback($scope.feedback).then(
                            // Success Handler
                             function (result) {
                                 $modalInstance.close();
                                 $scope.message = "Feedback submitted";
                                 $timeout(function () {
                                     $scope.message = "";
                                 }, 3000);
                             },
                            // Failure Handler
                            function () {
                                $scope.message = "Error submitting feedback";
                            });
                        }
                    }])
            });
        }
        $rootScope.showFeedback = true;
        $rootScope.closeFeedback = function () {
            $rootScope.showFeedback = false;
        }
        // feedback end

        // set user claims 
        var setUserClaims = function () {
            return commonService.getUserClaims()
             .then(
                  // Success Handler
                 function (result) {
                     $rootScope.claims = result;
                 },
                 // Failure Handler
                 function (result) {
                     $rootScope.claims = result;
                 });
        };

       var startSignalR = function () {
            // Declare a proxy to reference the hub.
            var notificationHub = $.connection.notificationHub;

            // Add a client-side hub method that the server will call
            notificationHub.client.getNotification = function (notification) {
               
                if (notification.Type === "Success") {                   
                    //toastr.success(notification.Message);
                    Toast(ToastClassification.Important, notification.Message, 'check');
                }
                else if (notification.Type === "Error") {
                    //toastr.error(notification.Message);
                    Toast(ToastClassification.Error, notification.Message);
                }
                else {
                    //toastr.info(notification.Message);
                    Toast(ToastClassification.Informational, notification.Message, 'info');
                }

                // broadcast event so client can update UI
                if (notification.NotificationType === "JoinSpecializationSuccess" || notification.NotificationType === "JoinSpecializationReject") {
                    $rootScope.$broadcast('joinSpecializationRequestResult', notification.NotificationType, notification.Target);
                }                                  
            };

            // Start the connection
            $.connection.hub.start().done();
        };

        startSignalR();
        setUserClaims();
        $state.go('home');
    }]);

    //like OnStartup()
    ambassadorsWebsite.config(['$stateProvider', '$locationProvider', '$httpProvider', '$compileProvider', 
    function ($stateProvider, $locationProvider, $httpProvider, $compileProvider) {

        $locationProvider.html5Mode(true);
         
        // recommended for production as per https://docs.angularjs.org/guide/production
        // $compileProvider.debugInfoEnabled(false);

    }]);

    ambassadorsWebsite.controller('AppController', ['$rootScope', '$scope', '$state',
        function ($rootScope, $scope, $state) {           

        }]);
})();

