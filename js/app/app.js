'use strict';

var ortMapServer = '//it.innovateteam.com/arcgis/rest/services/OceanReporting/OceanReports/MapServer/';
var ortLayerAOI = '7';
var ortLayerData = '35';
var ortLayerOptional = [];

var windChart;

ortLayerOptional[0]=
{
    num:'19',
    displayName:'Wind Resource Potential'
};
ortLayerOptional[1]=
{
    num:'18',
    displayName:'Active Renewable Energy Leases'
};
ortLayerOptional[2]=
{
    num:'22',
    displayName:'BOEM_Wind_Planning_Areas'
};
ortLayerOptional[3]=
{
    num:'23',
    displayName:'OceanDisposalSites'
};
ortLayerOptional[4]=
{
    num:'21',
    displayName:'Marine Minerals Leases',
    layerName: 'Sand_n_GravelLeaseAreas'
};
ortLayerOptional[5]=
{
    num:null,
    displayName:'Sediment Resources'
};
ortLayerOptional[6]=
{
    num:'3',
    displayName:'Hydrokinetic Leases',
    layerName: 'MarineHydrokineticProjects'
};
ortLayerOptional[7]=
{
    num:null,
    displayName:'Surficial Sediment Classification'
};
ortLayerOptional[8]=
{
    num:20,
    displayName:'Wave Power',
    layerName:'Ocean Wave Resource Potential'
};
ortLayerOptional[9]=
{
    num:32,
    displayName:'Tidal Power',
    layerName:'usa_mc_wm'
};
ortLayerOptional[10]=
{
    num:31,
    displayName:'Current Power',
    layerName:'us_oc_ms'
};
ortLayerOptional[11]=
{
    num:6,
    displayName:'Beach Nourishment',
    layerName:'SC_BeachProjects'
};
ortLayerOptional[12]=
{
    num:null,
    displayName:'Oil and Gas Planing Area'
};
ortLayerOptional[13]=
{
    num:null,
    displayName:'Oil and Gas Active Lease'
};
ortLayerOptional[14]=
{
    num:null,
    displayName:'Oil and Gas Wells'
};
ortLayerOptional[15]=
{
    num:null,
    displayName:'Oil and Gas Resource potential'
};
ortLayerOptional[16]=
{
    num:1,
    displayName:'Coastal Energy Facilities'
};



ortLayerOptional[26]=
{
    num:30,
    displayName:'Coastal Relief Model'
};




var toggle = false;
var windclass = [];
var toggleFull = false;
var cLayer,mouseLayer,searchControl;
var menuitems= [];

function preloader() {
    if (document.images) {
        var img1 = new Image();

        img1.src = "img/wind_cc.svg";
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


var esriNatGeo = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
    maxZoom: 12
    }),
    esriOceans = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
        maxZoom: 12
    }),
    esriStreets = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
        maxZoom: 12
    });


var nauticalchart=L.esri.imageMapLayer({
    url: '//seamlessrnc.nauticalcharts.noaa.gov/arcgis/rest/services/RNC/NOAA_RNC/ImageServer',
    //mosaicRule: mosaicRule,
    useCors: false
});//.addTo(map);



var map = L.map('bigmap',{
    zoomControl: false,
    maxZoom:12
    //layers: [esriOceans]
});
var smallmap;
var baseMaps = {
    "Oceans": esriOceans,
    "Streets": esriStreets,
    "NatGeo World":esriNatGeo
};
var mapOverlay = {
   "Nautical Chart": nauticalchart
} ;

var baselayer = esriOceans.addTo(map);


//L.esri.basemapLayer('Oceans').addTo(map);
//L.esri.basemapLayer('OceansLabels').addTo(map);
//World_Street_Map
//NatGeo_World_Map
//World_Ocean_Base
//

//Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery",
// "ImageryLabels", "ImageryTransportation", "ShadedRelief", "ShadedReliefLabels", "Terrain" or "TerrainLabels"

L.control.zoom({
    position:'bottomleft'
}).addTo(map);

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
      'ngAnimate',
      'angularSpinner'

    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
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
          .state('print',{
             // url:'/print',
              templateUrl:'partials/printPreview.html',
              controller: 'printCtrl'
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



