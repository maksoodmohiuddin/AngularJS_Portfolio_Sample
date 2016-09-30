'use strict';

describe('AdminAddSpecializationsUnitTests', function () {

    beforeEach(module('ambassadors'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('addSpecializationController', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('addSpecializationController', { $scope: $scope });
        });

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should do Display Name validation', function () {
            $scope.specialization = {
                displayName: "",
                description: "Test",
                isPublic: false,
                isPublished: false
            };

            $scope.createSpecialization();
            expect($scope.message).toBe("Display Name is required");
        });

        it('should do Description validation', function () {
            $scope.specialization = {
                displayName: "Test",
                description: "",
                isPublic: false,
                isPublished: false
            };

            $scope.createSpecialization();
            expect($scope.message).toBe("Description is required");
        });

        it('should pass UI validation if required parameters are provided', function () {
            $scope.specialization = {
                displayName: "Test",
                description: "Test",
                isPublic: false,
                isPublished: false
            };

            $scope.createSpecialization();
            expect($scope.message).toBe("");
        });
    });
});

