'use strict';
var map = L.map('map');
var toggle = false;
var windclass = [];
var windrpLayer,windLeaseLayer,windPlanningLayer;
var toggleFull = false;
var cLayer;

function preloader() {
    if (document.images) {
        var img1 = new Image();
       // var img2 = new Image();
       // var img3 = new Image();

        img1.src = "img/wind_cc.svg";
       // img2.src = "img/GandH.png";
       // img3.src = "img/info.png";
    }
}
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(preloader);

var marker;
L.esri.basemapLayer('Oceans').addTo(map);
L.esri.basemapLayer('OceansLabels').addTo(map);
map.createPane('optionalfeature1');
map.createPane('optionalfeature2');
map.createPane('optionalfeature3');
map.createPane('AOIfeature');

map.setView([33.51, -78.3], 6);


// Declare app level module which depends on filters, and services
angular.module('myApp', [
      'ui.router',
      'myApp.filters',
      'myApp.services',
      'myApp.directives',
      'myApp.controllers',
      'angulartics',
      'angulartics.google.analytics',
      'pageslide-directive',
      'angularModalService',
      'ngAnimate'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
      //$urlRouterProvider.otherwise('/view1');
      $stateProvider
          .state('CEview', {
           // url: '/view1',
            templateUrl: 'partials/CE.html',
            controller: 'AOICtrl'
          })
          .state('view3', {
           // url: '/view3',
            templateUrl: 'partials/NRC.html',
            //controller: 'MyCtrl3'
          })
          .state('view4',{
          //  url:'/view4',
            templateUrl:'partials/TI.html',
           // controller: 'MyCtrl4'
          })
        .state('EMview', {
          //  url: '/EM',
            templateUrl: 'partials/EnergyMineral.html',
            controller: 'MyCtrl2'
        })
          .state('view5',{
           //   url:'/view5',
              templateUrl:'partials/EC.html',
             // controller: 'MyCtrl5'
          })
          .state('splash',{
              //   url:'/view5',
              templateUrl:'partials/splash.html',
             // controller: 'splashCtrl'
          })
          .state('search',{
              //   url:'/view5',
              templateUrl:'partials/search.html',
              // controller: 'splashCtrl'
          })
      ;
    }])
    .config(function($animateProvider) {
      $animateProvider.classNameFilter(/angular-animate/);
    })
    .config(function ($analyticsProvider) {
      $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
      $analyticsProvider.withAutoBase(true);  /* Records full path */
    });



