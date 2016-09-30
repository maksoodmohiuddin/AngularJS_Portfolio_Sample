'use strict';

describe('AdminManageSpecializationsUnitTests', function () {

    beforeEach(module('ambassadors'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('manageSpecializationController', function () {
        var $scope, controller, $state;

        beforeEach(inject(function ($injector) {
            $scope = {};
            controller = $controller('manageSpecializationController', { $scope: $scope });
            $state = $injector.get('$state');           
        }));

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

            $scope.updateSpecialization();
            expect($scope.messageInfo).toBe("Display Name is required");
        });

        it('should do Description validation', function () {
            $scope.specialization = {
                displayName: "Test",
                description: "",
                isPublic: false,
                isPublished: false
            };

            $scope.updateSpecialization();
            expect($scope.messageInfo).toBe("Description is required");
        });

        it('should pass UI validation if required parameters are provided', function () {
            $scope.specialization = {
                displayName: "Test",
                description: "Test",
                isPublic: false,
                isPublished: false
            };

            $scope.updateSpecialization();
            expect($scope.messageInfo).toBe("");
        });
        
        it('should be able to route to create activity page', function () {
            var state = $state.get('addactivity');
            expect(state.url).toBe('/admin/specialization/activity/add/:specializationid');
        });

        it('should be able to route to manage activity page', function () {
            var state = $state.get('manageactivity');
            expect(state.url).toBe('/admin/specialization/activity/manage/:activityid');
        });

        it('should be able to route to create challenge page', function () {
            var state = $state.get('addchallenge');
            expect(state.url).toBe('/admin/specialization/challenge/add/:specializationid');
        });

        it('should be able to route to manage challenge page', function () {
            var state = $state.get('managechallenge');
            expect(state.url).toBe('/admin/specialization/challenge/manage/:challengedefinitionid');
        });
        
        it('should be able to update spec with icon', function () {
            var files = [];

            $scope.specialization = {
                displayName: "Test",
                description: "Test",
                isPublic: false,
                isPublished: false,
                iconUri: "https://ambdevelopment.blob.core.windows.net/images/AmbassadorAlter.jpg"
            };

            $scope.uploadIcon(files);
            expect($scope.messageInfo).toBe("");
        });
        
        it('should be able to link requirement', function () {
            $scope.specializationId = 1;
            var requirementToLink = {
                requirement: 1,
                value: 1,
                isLinked: true
            };

            $scope.linkUnlinkRequirement(requirementToLink);
            expect($scope.messageRequirement).toBe("");
        });

        it('should be able to unlink requirement', function () {
            $scope.specializationId = 1;
            var requirementToUnlink = {
                requirement: 1,
                value: 1,
                isLinked: false
            };

            $scope.linkUnlinkRequirement(requirementToUnlink);
            expect($scope.messageRequirement).toBe("");
        });

        it('should be able to link requirement without value that does not require value', function () {
            $scope.specializationId = 1;
            var requirementToLink = {
                requirement: 1,
                value: 1,
                isLinked: true,
                isValueRequired: false
            };

            $scope.linkUnlinkRequirement(requirementToLink);
            expect($scope.messageRequirement).toBe("");
        });

        it('should not be able to link requirement without value that require value', function () {
            $scope.specializationId = 1;
            var requirementToLink = {
                requirement: 1,
                value: "",
                isLinked: true,
                isValueRequired: true
            };

            $scope.linkUnlinkRequirement(requirementToLink);
            expect($scope.messageRequirement).toBe("Value is required to link this requirement.");
        });

    });
});

