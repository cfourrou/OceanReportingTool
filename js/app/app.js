'use strict';

var ortMapServer = '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/';
var ortLayerAOI = '7';
var ortLayerData = '35';
var ortLayerOptional = [];

var windChart;

ortLayerOptional[0]=
{
    num:'19',
    name:'wind resource potential'
};
ortLayerOptional[1]=
{
    num:'18',
    name:'renewable energy leases'
};
ortLayerOptional[2]=
{
    num:'22',
    name:'BOEM_Wind_Planning_Areas'
};
ortLayerOptional[3]=
{
    num:'23',
    name:'Ocean Disposal Sites'
};
ortLayerOptional[4]=
{
    num:'21',
    name:'Marine Minerals Leases'
};
ortLayerOptional[5]=
{
    num:null,
    name:'Sediment Resources'
};
ortLayerOptional[6]=
{
    num:'3',
    name:'Hydrokinetic Leases'
};
ortLayerOptional[7]=
{
    num:null,
    name:'Surficial Sediment Classification'
};
ortLayerOptional[8]=
{
    num:20,
    name:'Wave Power'
};
ortLayerOptional[9]=
{
    num:32,
    name:'Tidal Power'
};
ortLayerOptional[10]=
{
    num:31,
    name:'Current Power'
};
ortLayerOptional[11]=
{
    num:6,
    name:'Beach Nourishment'
};
ortLayerOptional[12]=
{
    num:null,
    name:'Oil and Gas Planing Area'
};
ortLayerOptional[13]=
{
    num:null,
    name:'Oil and Gas Active Lease'
};
ortLayerOptional[14]=
{
    num:null,
    name:'Oil and Gas Wells'
};
ortLayerOptional[15]=
{
    num:null,
    name:'Oil and Gas Resource potential'
};
ortLayerOptional[16]=
{
    num:1,
    name:'Coastal Energy Facilities'
};


var map = L.map('bigmap',{
    zoomControl: false,
    maxZoom:12
});




var toggle = false;
var windclass = [];
//var windrpLayer,windLeaseLayer,windPlanningLayer,oceanDisposalSites,marineMineralsLeases,HydrokineticLeases;
var toggleFull = false;
var cLayer,mouseLayer,searchControl;
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
console.log("number of optional layers " +ortLayerOptional.length);
for (var i = 0; i < ortLayerOptional.length; i++) {
    map.createPane('optionalfeature'+i);
};
map.setView([33.51, -78.3], 6);
map.createPane('AOIfeature');

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
              //url: '/AOI?detail',
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
          .state('meta',{
              //url:'/metadata',
              templateUrl:'partials/metadata.html',
              // controller: 'MyCtrl5'
          })
          .state('splash',{
              url:'/splash',
              templateUrl:'partials/splash.html',
             // controller: 'splashCtrl'
          })
          .state('menu',{
              url:'/menu',
              templateUrl:'partials/menu.html',
              // controller: 'splashCtrl'
          })
          .state('draw',{
              url:'/draw',
              templateUrl:'partials/draw.html',
              controller: 'SearchCtrl'
          })
      ;
    }])
    .config(function($animateProvider) {
      $animateProvider.classNameFilter(/angular-animate/);
    })

    .config(function ($analyticsProvider) {
      $analyticsProvider.firstPageview(true); /* Records pages that don't use $state or $route */
      $analyticsProvider.withAutoBase(true);  /* Records full path */
    })

;



