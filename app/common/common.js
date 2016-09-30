(function () {
    'use strict';

    var commonModule = angular.module('ambassadors.commonModule', [
        'ui.router'
    ]);


    commonModule.provider('entityManager', function() {
 
        var serviceEndpoint;
        var serviceRoot = window.location.protocol + '//' + window.location.host + '/';

        // configure the application for BreezeJS
        // Note: Using webApiOData4 does not work. Known issue. See https://github.com/Breeze/breeze.js/issues/39 
        breeze.config.initializeAdapterInstance('dataService', 'webApiOData',true);

        // convert between server-side PascalCase and client-side camelCase
        breeze.NamingConvention.camelCase.setAsDefault();

        // master entity manager all entity managers will inherit 
        var masterManager = new breeze.EntityManager(serviceRoot + 'odata/');

        //TODO: Determine how and if a client model should be used
        // configure the metadataStore with entity type extensions
        //model.configureMetadata(masterManager.metadataStore);

        return {
            setServiceEndpoint: function (value) {
                serviceEndpoint = value;
            },
            $get: function () {
                return {
                    createManager: createManager,
                    initialize: initialize,
                    refresh: refresh
                }
            }
        }

        // private function to create a new manager
        function createManager() {
            var manager = masterManager.createEmptyCopy(); // same configuration; no entities in cache.
            // ... copy in some entities (e.g.,picklists) from masterManager
            return manager;
        }

        // private function to load the masterManager with lookup entities and any other startup data
        //   incidentally loads the metadataStore with metadata from the service
        // return a promise
        function initialize() {
        }

        // private function to refresh masterManager cached entities
        // typically a subset of the initialize function
        function refresh() {
        }
    });
    
    //commonModule.config(['$stateProvider', 'entityManagerProvider', function ($stateProvider, entityManagerProvider) {

    commonModule.config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('error', {
            url: '/error',
            views: {
                "main": {
                    controller: 'commonController',
                    templateUrl: '/Scripts/app/common/views/error.tpl.html'
                }
            },
            resolve: {},
            data: {
                pageTitle: 'Error'
            }
        });

        $stateProvider.state('health', {
            url: '/health',
            views: {
                "main": {
                    controller: 'healthController',
                    templateUrl: '/Scripts/app/common/views/health.tpl.html'
                }
            },
            resolve: {},
            data: {
                pageTitle: 'Error'
            }
        });

        $stateProvider.state('feedback', {
            url: '/feedback',
            views: {
                "main": {
                    controller: 'feedbackController',
                    templateUrl: '/Scripts/app/common/views/feedback.tpl.html'
                }
            },
            resolve: {},
            data: {
                pageTitle: 'Feedback'
            }
        });

       //TODO: determine if this code should be used
       /*
        var serviceRoot = window.location.protocol + '//' + window.location.host + '/';
        entityManagerProvider.setServiceEndpoint(serviceRoot + 'api/');
       */

    }]);
   

})();