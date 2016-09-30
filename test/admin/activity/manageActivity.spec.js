'use strict';

describe('AdminManageActivityUnitTests', function () {

    beforeEach(module('ambassadors'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('manageActivityController', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('manageActivityController', { $scope: $scope });
        });

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should do Name validation', function () {           
            $scope.specializationid = 1;
            $scope.activity = {
                specializationId: $scope.specializationid,
                displayName: "",
                description: "Test",
                effectiveDate: "2016/1/1",
                expirationDate: "2016/2/1",
                experiencePoints: 1
            };

            $scope.updateActivity();
            expect($scope.message).toBe("Display Name is required");
        });


        it('should do Description validation', function () {
            $scope.specializationid = 1;
            $scope.activity = {
                specializationId: $scope.specializationid,
                displayName: "Test",
                description: "",
                effectiveDate: "2016/1/1",
                expirationDate: "2016/2/1",
                experiencePoints: 1
            };

            $scope.updateActivity();
            expect($scope.message).toBe("Description is required");
        });

        it('should do Effective Date validation', function () {
            $scope.specializationid = 1;
            $scope.activity = {
                specializationId: $scope.specializationid,
                displayName: "Test",
                description: "Test",
                effectiveDate: "",
                expirationDate: "2016/2/1",
                experiencePoints: 1
            };

            $scope.updateActivity();
            expect($scope.message).toBe("Effective Date is required");
        });

        it('should do Effective Date validation against prior date', function () {
            $scope.specializationid = 1;
            var priorDate = new Date("2015/1/1");

            $scope.activity = {
                specializationId: $scope.specializationid,
                displayName: "Test",
                description: "Test",
                effectiveDate: priorDate,
                expirationDate: "2016/2/1",
                experiencePoints: 1
            };

            $scope.updateActivity();
            expect($scope.message).toBe("Effective Date cannot be before today's date");
        });


        it('should do Expiration Date validation', function () {
            $scope.specializationid = 1;
            $scope.activity = {
                specializationId: $scope.specializationid,
                displayName: "Test",
                description: "Test",
                effectiveDate: "2016/1/1",
                expirationDate: "",
                experiencePoints: 1
            };

            $scope.updateActivity();
            expect($scope.message).toBe("");
        });

        it('should do Expiration Date validation against Effective date', function () {
            $scope.specializationid = 1;
            var effectiveDate = new Date("2016/2/1");
            var expirationDate = new Date("2016/1/1");

            $scope.activity = {
                specializationId: $scope.specializationid,
                displayName: "Test",
                description: "Test",
                effectiveDate: effectiveDate,
                expirationDate: expirationDate,
                experiencePoints: 1
            };

            $scope.updateActivity();
            expect($scope.message).toBe("Effective Date cannot be before Expiration Date");
        });

        it('should do Expiration Date validation against prior date', function () {
            $scope.specializationid = 1;
            var priorDate = new Date("2015/1/1");

            $scope.activity = {
                specializationId: $scope.specializationid,
                displayName: "Test",
                description: "Test",
                effectiveDate: "2016/1/1",
                expirationDate: priorDate,
                experiencePoints: 1
            };

            $scope.updateActivity();
            expect($scope.message).toBe("Expiration Date cannot be before today's date");
        });


        it('should pass UI validation with no Expiration Date', function () {
            $scope.specializationid = 1;
            $scope.activity = {
                specializationId: $scope.specializationid,
                displayName: "Test",
                description: "Test",
                effectiveDate: "2016/1/1",
                expirationDate: "",
                experiencePoints: 1
            };

            $scope.updateActivity();
            expect($scope.message).toBe("");
        });

        it('should pass UI validation if required parameters are provided', function () {
            $scope.specializationid = 1;
            $scope.activity = {
                specializationId: $scope.specializationid,
                displayName: "Test",
                description: "Test",
                effectiveDate: "2016/1/1",
                expirationDate: "2016/2/1",
                experiencePoints: 1
            };

            $scope.updateActivity();
            expect($scope.message).toBe("");
        });
    });
});

