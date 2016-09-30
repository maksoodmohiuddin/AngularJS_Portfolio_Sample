'use strict';

describe('AdminViewSpecializationsUnitTests', function () {

    beforeEach(module('ambassadors'));
   
    var $controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('viewSpecializationsController', function () {
        var $scope, controller, $state;
      
        beforeEach(inject(function ($injector) {
            $scope = {};
            controller = $controller('viewSpecializationsController', { $scope: $scope });
            $state = $injector.get('$state');
        }));
   
        it('should be defined', function() {           
            expect(controller).toBeDefined();
        });

        it('should be able to route to add specialization page', function () {
            var state = $state.get('addspecialization');
            expect(state.url).toBe('/admin/specialization/add');
        });
    });
});

