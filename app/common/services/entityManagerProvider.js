/***
 * Service: entityManagerProvider
 * Configures BreezeJS and creates a new instance of the 
 * BreezeJS EntityManager for use in a datacontext service
 * see http://www.getbreezenow.com/documentation/multiple-managers for more information
 *
 ***/
(function() {
    'use strict';

    var commonModule = angular.module('ambassadors.commonModule');

    /*
    commonModule.provider('entityManager', function () {

        var serviceEndpoint;

        // configure the application for Breeze
        var masterManager = new breeze.EntityManager(serviceEndpoint);
        breeze.config.initializeAdapterInstance('dataService', 'webApiOData', true);

        // convert between server-side PascalCase and client-side camelCase
        breeze.NamingConvention.camelCase.setAsDefault();

        // configure the metadataStore with entity type extensions
        //model.configureMetadata(masterManager.metadataStore);

        return {
            setServiceEndpoint: function(value) {
                serviceEndpoint = value;
            },
            $get: function() {
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
    */

})();