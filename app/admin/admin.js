(function () {
    'use strict';

    var adminModule = angular.module('ambassadors.adminModule', [
        'ui.router',
    ]);

    adminModule.config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('viewspecializations', {
            url: '/admin',
            views: {
                "main": {
                    controller: 'viewSpecializationsController',
                    templateUrl: '/Scripts/app/admin/views/specialization/view_specializations.tpl.html'
                }
            },
            resolve: {           
            },
            data: {
                pageTitle: 'View Specializations'
            }
        });

        $stateProvider.state('managespecialization', {
            url: '/admin/specializations/:id',
            views: {
                "main": {
                    controller: 'manageSpecializationController',
                    templateUrl: '/Scripts/app/admin/views/specialization/manage_specialization.tpl.html'
                }
            },
            resolve: {},
            data: {
                pageTitle: 'Manage Specialization'
            }
        });

        $stateProvider.state('addspecialization', {
            url: '/admin/specialization/add',
            views: {
                "main": {
                    controller: 'addSpecializationController',
                    templateUrl: '/Scripts/app/admin/views/specialization/add_specialization.tpl.html'
                }
            },
            resolve: {},
            data: {
                pageTitle: 'Add Specialization'
            }
        });

        $stateProvider.state('addactivity', {
            url: '/admin/specialization/activity/add/:specializationid',
            views: {
                "main": {
                    controller: 'addActivityController',
                    templateUrl: '/Scripts/app/admin/views/activity/add_activity.tpl.html'
                }
            },
            resolve: {},
            data: {
                pageTitle: 'Specialization Add Activity'
            }
        });

        $stateProvider.state('manageactivity', {
            url: '/admin/specialization/activity/manage/:activityid',
            views: {
                "main": {
                    controller: 'manageActivityController',
                    templateUrl: '/Scripts/app/admin/views/activity/manage_activity.tpl.html'
                }
            },
            resolve: {},
            data: {
                pageTitle: 'Specialization Manage Activity'
            }
        });

        $stateProvider.state('specializationallactivities', {
            url: '/admin/specialization/activities/:specializationid',
            views: {
                "main": {
                    controller: 'allActivitiesController',
                    templateUrl: '/Scripts/app/admin/views/activity/specialization_all_activities.tpl.html'
                }
            },
            resolve: {},
            data: {
                pageTitle: 'Specialization All Activities'
            }
        });
        
        $stateProvider.state('addchallenge', {
            url: '/admin/specialization/challenge/add/:specializationid',
            views: {
                "main": {
                    controller: 'addChallengeController',
                    templateUrl: '/Scripts/app/admin/views/challenge/add_challenge.tpl.html'
                }
            },
            resolve: {},
            data: {
                pageTitle: 'Add Challenge'
            }
        });

        $stateProvider.state('managechallenge', {
            url: '/admin/specialization/challenge/manage/:challengedefinitionid',
            views: {
                "main": {
                    controller: 'manageChallengeController',
                    templateUrl: '/Scripts/app/admin/views/challenge/manage_challenge.tpl.html'
                }
            },
            resolve: {},
            data: {
                pageTitle: 'Manage Challenge'
            }
        });

    }]);
})();