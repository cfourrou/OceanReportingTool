'use strict';

var ortMapServer = '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/';
var ortLayerAOI = '7';
var ortLayerData = '33';
var ortLayerOptional = [];

var windChart;

ortLayerOptional[0]=
{
    num:'18',
    name:'wind resource potential'
};
ortLayerOptional[1]=
{
    num:'17',
    name:'renewable energy leases'
};
ortLayerOptional[2]=
{
    num:'21',
    name:'BOEM_Wind_Planning_Areas'
};
ortLayerOptional[3]=
{
    num:'18',
    name:'future'
};

var map = L.map('bigmap',{
    zoomControl: false
});




var toggle = false;
var windclass = [];
var windrpLayer,windLeaseLayer,windPlanningLayer;
var toggleFull = false;
var cLayer,mouseLayer;
var menuitems= [];

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
L.control.zoom({
    position:'bottomleft'
}).addTo(map);
map.createPane('optionalfeature1');
map.createPane('optionalfeature2');
map.createPane('optionalfeature3');
map.createPane('AOIfeature');

map.setView([33.51, -78.3], 6);


// Declare app level module which depends on filters, and services
angular.module('myApp', [
      'ui.router',
      'angular.filter',
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
      //$urlRouterProvider.otherwise('/help');
        $urlRouterProvider.otherwise('/main');
      $stateProvider

          .state('otherwise', {
              url : '/main',
              templateUrl:'partials/splash.html',
          })
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
              //url:'/help',
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



