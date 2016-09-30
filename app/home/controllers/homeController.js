(function () {
    'use strict';

    var homeModule = angular.module('ambassadors.homeModule');

    homeModule.controller('homeController', ['$scope', '$sce', 'homeService',
      function ($scope, $sce, homeService) {

          $scope.date = Date.now();

          //grab this data from homeService? or hard code for now...
          this.rotatingData = [
              { noun: 'ROLE MODELS', icon: 'fa-star' },
              { noun: 'UPLOADERS', icon: 'fa-youtube' },
              { noun: 'FANS', icon: 'fa-heart' },
              { noun: 'STREAMERS', icon: 'fa-twitch' },
              { noun: 'COMMUNITY', icon: 'fa-group' },
              { noun: 'LEADERS', icon: 'fa-flag' },
              { noun: 'VOLUNTEERS', icon: 'fa-gift' }
          ];

          this.loggedIn = false;

          this.rotationPosition = 0;
          this.lastRotationPosition = this.rotatingData.length - 1;

          var home = this;

          //using Jquery UI Animations here
          this.cycle = function () {
              $('#rotating-icon').fadeOut(250);
              $('#noun').toggle('slide', { direction: 'up' }, 250, function () {
                  //console.log('last: ' + lastPos + '| pos: ' + cyclePos + ' | icon: ' + demo[cyclePos].icon + ' | noun: ' + demo[cyclePos].noun);
                  $('#rotating-icon').removeClass(home.rotatingData[home.lastRotationPosition].icon);
                  $('#rotating-icon').addClass(home.rotatingData[home.rotationPosition].icon);
                  $('#noun').text(home.rotatingData[home.rotationPosition].noun);
                  $('#rotating-icon').fadeIn(250);
                  $('#noun').toggle('slide', { direction: 'down' }, 250, function () {
                      home.lastRotationPosition = home.rotationPosition;
                      home.rotationPosition++;
                      if (home.rotationPosition > home.rotatingData.length - 1) {                         
                          home.rotationPosition = 0;
                          home.lastRotationPosition = home.rotatingData.length - 1;
                      }
                      setTimeout(home.cycle, 2500);
                  });

              });
          }

          this.cycle();

          var init = function () {
              loadData();
          };

          var loadData = function () {
              return homeService.getHomeContent()
               .then(
                    // Success Handler
                   function (result) {
                       console.log("result.content.title" + result.content.value);
                       $scope.homeContent = $sce.trustAsHtml(result.content.value);
                       console.log("$scope.homeContent" + $scope.homeContent);
                   },
                   // Failure Handler
                   function () {
                       // $state.go('error');
                   });
          };

          init();
      }]);


    homeModule.controller('carouselController', [
        '$scope', 'homeService', function ($scope, homeService) {

            this.slides = [
                {
                    title: 'SEASON ONE ENDS SOON',
                    subText: '24 days left in the season.',
                    style: 'default',
                    imageUrl: '/content/images/season1.jpg',
                    redirect: '/missions'
                },
                {
                    title: 'CONGRATS TO DER FELIX',
                    subText: 'on achieving WIZARD TIER',
                    style: 'icon',
                    imageUrl: '/content/images/derfelix.png',
                    redirect: '/profile/porschiey'
                },
                {
                    title: 'NEW REWARDS FOR FORZA',
                    subText: 'Racers in Forza can now get rewarded',
                    style: 'icon',
                    imageUrl: '/content/images/cara4.jpg',
                    redirect: '/rewards'
                }
            ];


        }
    ]);

    homeModule.controller('newsController', [
        '$scope', 'homeService', function ($scope, homeService) {
            this.items = [
                {
                    id: 1,
                    headline: 'xbox at E3',
                    author: 'Porschiey',
                    publishDate: 1434736592193,
                    image: '/content/images/news1.jpg',
                    content: 'E3 was insane. Xbox put on one heck of a show. Here is some latin that describes it more. Lorem ipsum sagittis nisi efficitur.Curabitur quis purus id turpis commodo semper. \nSuspendisse vehicula bibendum magna id accumsan. Aenean elit nunc, malesuada nec sapien sed, elementum rhoncus urna. Proin mattis enim et dolor sagittis porta. Vivamus ut odio ac elit mattis iaculis. Praesent aliquet ultrices tortor et volutpat. Nunc dignissim augue mauris, cursus malesuada diam rhoncus nec. Maecenas convallis nulla a tellus dignissim, ac sagittis nisi efficitur. Vivamus ut odio ac elit mattis iaculis. Praesent aliquet ultrices tortor et volutpat. Nunc dignissim augue mauris, cursus malesuada diam rhoncus nec. Maecenas convallis nulla a tellus dignissim, ac sagittis nisi efficitur.'
                },
                {
                    id: 2,
                    headline: 'Valentin is really good at Halo',
                    author: 'der Felix',
                    publishDate: 1434536582050,
                    image: '/content/images/news2.jpg',
                    content: 'Guys. You don\'t even understand - Valentin is extremely good at Halo. Last night I played 30 games with him, and I begged to be on his team every time. At one point he went so killtacular, he started shouting taunts at the enemy team in different languages. Valentin is a force to be reckoned with.'
                },
                {
                    id: 3,
                    headline: 'Welcome to Ambassadors v next',
                    author: 'ivory tower',
                    publishDate: 1434436191000,
                    image: '/content/images/news2.jpg',
                    content: 'Vivamus ut odio ac elit mattis iaculis. Praesent aliquet ultrices tortor et volutpat. Nunc dignissim augue mauris, cursus malesuada diam rhoncus nec. Maecenas convallis nulla a tellus dignissim, ac sagittis nisi efficitur. Curabitur quis purus id turpis commodo semper. Suspendisse vehicula bibendum magna id accumsan. Aenean elit nunc, malesuada nec sapien sed, elementum rhoncus urna. Proin mattis enim et dolor sagittis porta.'
                }
            ];
        }
    ]);
})();
