'use strict';

describe('AdminManageChallengeUnitTests', function () {

    beforeEach(module('ambassadors'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('manageChallengeController', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('manageChallengeController', { $scope: $scope });
        });

        it('should be defined', function () {
            expect(controller).toBeDefined();
        });

        it('should do Display Name validation', function () {
            $scope.specializationid = 1;
            $scope.challenge = {
                specializationId: $scope.specializationId,
                displayName: "",
                description: "Test",
                effectiveDate: "2016/1/1",
                expirationDate: "2016/2/1",
            };

            $scope.updateChallenge();
            expect($scope.message).toBe("Display Name is required");
        });


        it('should do Description validation', function () {
            $scope.specializationid = 1;
            $scope.challenge = {
                specializationId: $scope.specializationId,
                displayName: "Test",
                description: "",
                effectiveDate: "2016/1/1",
                expirationDate: "2016/2/1",
            };

            $scope.updateChallenge();
            expect($scope.message).toBe("Description is required");
        });

        it('should do Effective Date validation', function () {
            $scope.specializationid = 1;
            $scope.challenge = {
                specializationId: $scope.specializationId,
                displayName: "Test",
                description: "Test",
                effectiveDate: "",
                expirationDate: "2016/2/1",
            };

            $scope.updateChallenge();
            expect($scope.message).toBe("Effective Date is required");
        });

        it('should do Effective Date validation against prior date', function () {
            $scope.specializationid = 1;
            var priorDate = new Date("2015/1/1");

            $scope.challenge = {
                specializationId: $scope.specializationId,
                displayName: "Test",
                description: "Test",
                effectiveDate: priorDate,
                expirationDate: "2016/2/1",
            };

            $scope.updateChallenge();
            expect($scope.message).toBe("Effective Date cannot be before today's date");
        });

        it('should do Expiration Date validation', function () {
            $scope.specializationid = 1;
            $scope.challenge = {
                specializationId: $scope.specializationId,
                displayName: "Test",
                description: "Test",
                effectiveDate: "2016/1/1",
                expirationDate: "",
            };

            $scope.updateChallenge();
            expect($scope.message).toBe("");
        });

        it('should do Effective Date validation against prior date', function () {
            $scope.specializationid = 1;
            var priorDate = new Date("2015/1/1");

            $scope.challenge = {
                specializationId: $scope.specializationId,
                displayName: "Test",
                description: "Test",
                effectiveDate: "2016/1/1",
                expirationDate: priorDate,
            };

            $scope.updateChallenge();
            expect($scope.message).toBe("Expiration Date cannot be before today's date");
        });

        it('should do Expiration Date validation against Effective date', function () {
            $scope.specializationid = 1;
            var effectiveDate = new Date("2016/2/1");
            var expirationDate = new Date("2016/1/1");

            $scope.challenge = {
                specializationId: $scope.specializationId,
                displayName: "Test",
                description: "Test",
                effectiveDate: effectiveDate,
                expirationDate: expirationDate,
            };

            $scope.updateChallenge();
            expect($scope.message).toBe("Effective Date cannot be before Expiration Date");
        });

        it('should pass UI validation with no Expiration Date', function () {
            $scope.specializationid = 1;
            $scope.challenge = {
                specializationId: $scope.specializationId,
                displayName: "Test",
                description: "Test",
                effectiveDate: "2016/1/1",
                expirationDate: "",
            };

            $scope.updateChallenge();
            expect($scope.message).toBe("");
        });

        it('should pass UI validation if required parameters are provided', function () {
            $scope.specializationid = 1;
            $scope.challenge = {
                specializationId: $scope.specializationId,
                displayName: "Test",
                description: "Test",
                effectiveDate: "2016/1/1",
                expirationDate: "2016/2/1",
            };

            $scope.updateChallenge();
            expect($scope.message).toBe("");
        });

        it('should be able to link activity', function () {
            $scope.specializationId = 1;
            $scope.challengeDefinitionId = 1;

            $scope.challenge = {
                threshold: 1
            };

            var activityToLink = {
                challengeId: $scope.challengeDefinitionId,
                activityId: 1,
                threshold: 1,
                isLinked: true
            };

            $scope.linkUnlinkActivity(activityToLink);
            expect($scope.message).toBe("");
        });

        it('should be able to unlink activity', function () {
            $scope.specializationId = 1;
            $scope.challengeDefinitionId = 1;
            var activityToLink = {
                challengeId: $scope.challengeDefinitionId,
                activityId: 1,
                isLinked: false
            };
            $scope.linkUnlinkActivity(activityToLink);
            expect($scope.message).toBe("");
        });
    });
});

