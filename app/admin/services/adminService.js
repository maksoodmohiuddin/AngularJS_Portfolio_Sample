(function () {
    'use strict';

    var adminModule = angular.module('ambassadors.adminModule');

    adminModule.service('adminService', [ '$http', '$q',  function ($http, $q) {
        this.getAllSpecializations = function () {
            var deferred = $q.defer();
            
            $http.get('/api/specializations')
                .success(function (response) {
                    deferred.resolve(response);                   
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        };

        this.getSpecializationById = function (specializationId) {
            var deferred = $q.defer();       

            $http.get('/api/specializations/' + specializationId)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function () {
                    deferred.reject();
                });

            return deferred.promise;
        };

        this.putSpecialization = function (specialization) {
            var deferred = $q.defer();

            $http.put('/api/specialization/', specialization)
               .success(function (response) {
                   deferred.resolve(response);
               })
               .error(function (response) {
                   deferred.reject(response);                   
               });

            return deferred.promise;
        };

        this.postSpecialization = function (specialization) {
            var deferred = $q.defer();

            $http.post('/api/specialization/', specialization)
               .success(function () {
                   deferred.resolve();
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };

        this.getActivityById = function (activityId) {
            var deferred = $q.defer();

            $http.get('/api/specialization/activity/' + activityId)           
               .success(function (response) {
                   deferred.resolve(response);
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };

        this.putActivity = function (activity) {
            var deferred = $q.defer();

            $http.put('/api/specialization/activity/', activity)
               .success(function () {
                   deferred.resolve();
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };

        this.postActivity = function (activity) {
            var deferred = $q.defer();

            $http.post('/api/specialization/activity/', activity)
               .success(function () {
                   deferred.resolve();
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };

        this.getActivitiesForSpecialization = function (specializationId) {
            var deferred = $q.defer();

            $http.get('/api/specialization/activities/' + specializationId)
               .success(function (response) {
                   deferred.resolve(response);
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };

        this.getChallengeById = function (challenegDefinationId) {
            var deferred = $q.defer();

            $http.get('/api/specialization/challenge/' + challenegDefinationId)
               .success(function (response) {
                   deferred.resolve(response);
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };

        this.putChallenge = function (challenge) {
            var deferred = $q.defer();

            $http.put('/api/specialization/challenge/', challenge)
               .success(function (response) {
                   deferred.resolve(response);
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };

        this.postChallenge = function (challenge) {
            var deferred = $q.defer();

            $http.post('/api/specialization/challenge/', challenge)
               .success(function () {
                   deferred.resolve();
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };

        this.linkActivityToChallenge = function (linkActivity) {
            var deferred = $q.defer();

            $http.post('/api/specialization/challenge/linkactivity/', linkActivity)
               .success(function () {
                   deferred.resolve();
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };

        this.unlinkActivityFromChallenge = function (unlinkActivity) {
            var deferred = $q.defer();

            $http.post('/api/specialization/challenge/unlinkactivity/', unlinkActivity)
               .success(function () {
                   deferred.resolve();
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };

        this.linkRequirementToSpecialization = function (linkRequirement) {
            var deferred = $q.defer();            
            $http.post('/api/specialization/requirements/linkrequirement/', linkRequirement)
               .success(function () {
                   deferred.resolve();
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };

        this.unlinkRequirementFromSpecialization = function (unlinkRequirement) {
            var deferred = $q.defer();            
            $http.post('/api/specialization/requirements/unlinkrequirement/', unlinkRequirement)
               .success(function () {
                   deferred.resolve();
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };


        this.uploadIcon = function (icon) {

            // As per http://stackoverflow.com/questions/13963022/angularjs-how-to-implement-a-simple-file-upload-with-multipart-form
            //        https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs

            var iconFormData = new FormData();
            iconFormData.append("file", icon);

            var deferred = $q.defer();
                  
            $http.post('/api/file', iconFormData, {
                    withCredentials: true,
                    headers: { 'Content-Type': undefined },
                    transformRequest: angular.identity
               })
               .success(function (response) {
                   deferred.resolve(response);
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };

        this.broadcastNotification = function (NotificationModel) {            
            var deferred = $q.defer();
            $http.post('/api/specialization/broadcastnotification/', NotificationModel)
               .success(function () {
                   deferred.resolve();
               })
               .error(function () {
                   deferred.reject();
               });

            return deferred.promise;
        };

        
    }]);
})();
