(function () {
    'use strict';

    var adminModule = angular.module('ambassadors.dashboardModule');

    adminModule.controller('dashboardController', ['$scope', '$state', '$filter','dashboardService', 'challengeDataContext', 
    function ($scope, $state, $filter, dashboardService, challengeDataContext) {
      
        var init = function () {          
            getUserMission();
            getDashboard();
            //getUserProfile();
        };

        var getUserMission = function () {
            return challengeDataContext.getChallengeDefinitions(true)
             .then(
                  // Success Handler
                 function (challengeDefinitions) {
                     var challenges = [];                    
                    
                     challengeDefinitions.forEach(function (challenge) {

                         var ambassadorChallenge = challengeDataContext.getAmbassadorChallengeLocally(challenge.challengeDefinitionId);                         

                         var remainingDate = new Date(challenge.expirationDate.getTime() - new Date().getTime());
                                          
                         var challengeObj = {
                             challengeDefinitionId: challenge.challengeDefinitionId,
                             description: challenge.displayDescription,
                             displayName: challenge.displayName,
                             iconUri: challenge.iconUri,
                             startDate: challenge.effectiveDate,
                             endDate: challenge.expirationDate,
                             remaining: remainingDate.getUTCDate() - 1,
                             threshold: challenge.threshold,
                             hasAccepted: ambassadorChallenge != null,
                             hasCompleted: (ambassadorChallenge != null && ambassadorChallenge.closedDate != null) ? true : false,
                             progress: (ambassadorChallenge != null) ? ambassadorChallenge.processedActivitiesCount : 0,
                             lastActivityCompletedDate: (ambassadorChallenge != null) ? ambassadorChallenge.lastActivityCompletedDate : null                            
                         };                                               
                                                
                         challenges.push(challengeObj);
                     });                    
                     
                     // underscore will sort by ascending only, so reverse it 
                     var challengesSorted = _.sortBy(challenges, function (challenge) { return challenge.progress });
                     challengesSorted.reverse();                    

                     // display top 3 only
                     $scope.userChallenges = _.initial(challengesSorted, [challengesSorted.length - 3]);
                                        
                 },
                 // Failure Handler
                 function () {
                     // $state.go('error');
                 });
        };               

        var getUserProfile = function () {           
            return dashboardService.getUserProfile()
             .then(
                  // Success Handler
                 function (result) {
                     console.log(result);
                     $scope.specializations = result.userSpecializations;
                     $scope.claims = result.claims;
                 },
                 // Failure Handler
                 function () {
                     $state.go('error');
                 })
             .finally(function () {               
                
             });
        };
        
        var getDashboard = function () {           
            return dashboardService.getDashboard()
             .then(
                  // Success Handler
                 function (result) {
                     var specs = [];

                     result.userSpecializations.forEach(function (spec) {                         
                         var specObj = {                             
                             displayName: spec.displayName,
                             iconUri: spec.iconUri,
                             joinDate: $filter('date')(spec.joinDate, 'MM/dd/yyyy')                             
                         };
                         specs.push(specObj);
                     });

                     // underscore will sort by ascending only, so reverse it 
                     var specsSorted = _.sortBy(specs, function (spec) { return spec.joinDate });
                     specsSorted.reverse();

                     // display top 3 only 
                     $scope.userSpecializations = _.initial(specsSorted, [specsSorted.length - 3]);
                     
                 },
                 // Failure Handler
                 function () {
                     //$state.go('error');
                 })
             .finally(function () {             
                
             });
        };


        // -------- code need to be wired up below ----
        var chart = [];
        var stickyMode = false;
        var firstRun = true;
        var specializationsShowing = new Array();
        var showingLeaderboard = false;

        //dummy data for graph
        var overallData = {
            labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Today'],
            series: [
                [100, 120, 440, 480, 560, 515, 692],
                [320, 213, 150, 168, 120, 222, 302]
            ]
        };

        var specificSpecData = {
            labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Today'],
            series: [
              [423, 266, 539, 458, 179, 375, 548],
              [590, 359, 614, 320, 589, 443, 721]
            ]
        };


        function toggleSpecializationData(specId) {

            var ix = $.inArray(specId, specializationsShowing);
            //not in current showing
            if (ix == -1) {
                specializationsShowing.push(specId);
            } else {
                specializationsShowing.splice(ix, 1);
            }

            var combinedData = {
                Xp: 0, Events: 0, EventVerb: 'Activities', GraphData: null
            };

            $.each(specializationsShowing, function (i, sid) {
                //check payload, retrieve xp, events, etc...
                // add it to ongoing "combinedData" object

                //psuedo: 
                //var data = getSpecData(sid);
                //combinedData.Xp += data.XpEarned;
                //... etc

            });

            //demo dummy data
            combinedData = {
                Xp: 7235, Events: 117, EventVerb: 'activities completed', GraphData: specificSpecData
            };

            countUp($('#xp-stat'), combinedData.Xp);
            countUp($('#event-stat'), combinedData.Events);
            $('#event-verb').html(combinedData.EventVerb);
            drawGraph(combinedData.GraphData);
        }

        // replaces the html of a passed in dom element with a number that "counts up"
        //dom - dom element to place the number animation in
        //num - the number to count up to
        function countUp(dom, num) {
            var duration = 3000;  //timing value (not in miliseconds...)
            var timeOut = 20; //time between chunk change
            var showing = 0; // starting value
            var chunk = num / (duration / timeOut);  //chunk size
            chunkUp(dom, showing, num, chunk, timeOut); // loop start
        }

        // draws the graph with a data set. (or redraws if it already has been drawn)
        function drawGraph(gData) {

            var graphOptions = {
                showArea: true,
                showPoint: true,
                lineSmooth: true,
                axisX: {
                    showGrid: true
                },
                axisY: {
                    showGrid: true
                }
            };

            if (isIE()) {
                $('#ie-slider').show();
            }
            chart = new Chartist.Line('.ct-chart', gData, graphOptions);

            //animation stuffz. set up sequence
            var seq = 0;
            chart.on('created', function () {
                seq = 0;
            });

            if (isIE()) {
                if (firstRun) {
                    setTimeout(toggleIeSlider, 500);
                    firstRun = false;
                } else {
                    toggleIeSlider();
                }
            } else {
                $('#ie-slider').hide();
                //animation launch
                chart.on('draw', function (data) {
                    if (data.type === 'line' || data.type === 'point') {
                        data.element.animate({
                            opacity: {
                                begin: seq++ * 40,
                                dur: 150,
                                from: 0,
                                to: 1
                            },
                            x1: {
                                begin: seq++ * 40,
                                dur: 150,
                                from: data.x - 100,
                                to: data.x,
                                easing: Chartist.Svg.Easing.easeOutQuart
                            }
                        });
                    }
                });
            }
        }

        //////////// "Private Methods" ////////////////
        function isIE(userAgent) {
            userAgent = userAgent || navigator.userAgent;
            return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
        }
        function toggleIeSlider() {
            $('#ie-slider').toggle('slide', { direction: 'right' }, 500);
        }
        function chunkUp(dom, showing, num, chunk, timeOut) {
            dom.html(csn(parseInt(showing)));
            showing += chunk;
            if (showing + chunk < num) {
                setTimeout(function () {
                    chunkUp(dom, showing, num, chunk, timeOut);
                });
            } else {
                dom.html(csn(num));
            }
        }
        function csn(val) {
            while (/(\d+)(\d{3})/.test(val.toString())) {
                val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
            }
            return val;
        }

        $('#avatar-circle-graph').circlize();
        $('#normal-stat-circle').circlize();
        $('#small-stat-cirlce').circlize();

        drawGraph(overallData);

        $(window).scroll(function () {
            var pos = $(window).scrollTop();
            var banner = $('#profile-banner');
            if (pos > 185) {
                if (!stickyMode) {
                    var ourBanner = $('.shell-category-header');
                    stickyMode = true;
                    banner.addClass('profile-banner-sticky');
                    banner.css('top', 0 + ourBanner.height());
                }
            } else {
                stickyMode = false;
                banner.removeClass('profile-banner-sticky');
                banner.css('top', '');
            }

        });

        $('.spec-item').click(function () {
            toggleSpecializationData(1);
        });

        $('#middle-circle').click(function () {
            if (!showingLeaderboard) {
                $('#default-statistics').hide();
                $('#leaderboard-statistics').toggle('slide');
                $(this).addClass('active');
                showingLeaderboard = true;
            } else {
                $('#leaderboard-statistics').hide();
                $('#default-statistics').toggle('slide');
                drawGraph(overallData);
                $(this).removeClass('active');
                showingLeaderboard = false;
            }
        });

        countUp($('#xp-stat'), 17691);
        countUp($('#event-stat'), 623);

        $('[data-toggle="tooltip"]').tooltip();


        init();

    }]);
})();