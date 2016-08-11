'use strict';

//var ortMapServer = '//it.innovateteam.com/arcgis/rest/services/OceanReporting/OceanReports/MapServer/';
//var ortLayerAOI = '7';
//var ortLayerData = '35';
var ortLayerOptional = [];


ortLayerOptional[0] =
{
    num: '19',
    displayName: 'Wind Resource Potential'
};
ortLayerOptional[1] =
{
    num: '18',
    displayName: 'Active Renewable Energy Leases'
};
ortLayerOptional[2] =
{
    num: '22',
    displayName: 'BOEM_Wind_Planning_Areas'
};
ortLayerOptional[3] =
{
    num: '23',
    displayName: 'OceanDisposalSites'
};
ortLayerOptional[4] =
{
    num: '21',
    displayName: 'Marine Minerals Leases',
    layerName: 'Sand_n_GravelLeaseAreas'
};
ortLayerOptional[5] =
{
    num: null,
    displayName: 'Sediment Resources'
};
ortLayerOptional[6] =
{
    num: '3',
    displayName: 'Hydrokinetic Leases',
    layerName: 'MarineHydrokineticProjects'
};
ortLayerOptional[7] =
{
    num: null,
    displayName: 'Surficial Sediment Classification'
};
ortLayerOptional[8] =
{
    num: 20,
    displayName: 'Wave Power',
    layerName: 'Ocean Wave Resource Potential'
};
ortLayerOptional[9] =
{
    num: 32,
    displayName: 'Tidal Power',
    layerName: 'usa_mc_wm'
};
ortLayerOptional[10] =
{
    num: 31,
    displayName: 'Current Power',
    layerName: 'us_oc_ms'
};
ortLayerOptional[11] =
{
    num: 6,
    displayName: 'Beach Nourishment',
    layerName: 'SC_BeachProjects'
};
ortLayerOptional[12] =
{
    num: null,
    displayName: 'Oil and Gas Planing Area'
};
ortLayerOptional[13] =
{
    num: null,
    displayName: 'Oil and Gas Active Lease'
};
ortLayerOptional[14] =
{
    num: null,
    displayName: 'Oil and Gas Wells'
};
ortLayerOptional[15] =
{
    num: null,
    displayName: 'Oil and Gas Resource potential'
};
ortLayerOptional[16] =
{
    num: 1,
    displayName: 'Coastal Energy Facilities'
};


ortLayerOptional[26] =
{
    num: 5,
    displayName: 'bathymetric_Contours'
};
ortLayerOptional[27] =
{
    num: null,
    displayName: 'smallmap'
};
ortLayerOptional[28] =
{
    num: null,
    displayName: 'smallmapprint'
};
ortLayerOptional[29] =
{
    num: null,
    displayName: 'Area of Polygon'
};
ortLayerOptional[30] =
{
    num: null,
    displayName: 'FederalGeoRegulations'
};
ortLayerOptional[31] =
{
    num: null,
    displayName: 'PoliticalBoundaries'
};
ortLayerOptional[32] =
{
    num: 53,
    displayName: 'CoastalCounties'
}
ortLayerOptional[33] =
{
    num: null,
    displayName: 'FederalAndStateWaters'
}
ortLayerOptional[34] =
{
    num: 34,
    displayName: 'SubmarineCables'
}
ortLayerOptional[35] =
{
    num: 37,
    displayName: 'DangerZones'
}
ortLayerOptional[36] =
{
    num: 0,
    displayName: 'Places'
}
ortLayerOptional[37] =
{
    num: 9,
    displayName: 'tribal Lands'
}

ortLayerOptional[38] =
{
    num: 42,
    displayName: 'vessel count'
}
ortLayerOptional[39] =
{
    num: 33,
    displayName: 'Principle Ports'
}
ortLayerOptional[40] =
{
    num: 49,
    displayName: 'Nearby Protected Areas',
    layerName: 'MPA_selected'

}
ortLayerOptional[41] =
{
    num: 43,
    displayName: 'Artificial Reefs',
    layerName: 'ArtificialReefs'

}
ortLayerOptional[42] =
{
    num: 50,
    displayName: 'Soft Coral'
}
ortLayerOptional[43] =
{
    num: 51,
    displayName: 'Stoney Coral'

}
ortLayerOptional[44] =
{
    num: 44,
    displayName: 'Coastal Barrier'

}
var toggle = false;
//var windclass = [];
//var toggleFull = false;
//var cLayer,
var mouseLayer, searchControl;
//var menuitems = [];

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
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}
addLoadEvent(preloader);

/**
 * Pie title plugin
 * Author: Torstein Hønsi
 * Original: http://jsfiddle.net/highcharts/tnSRA/
 * Last revision: 2015-08-31
 */
(function (Highcharts) {
    Highcharts.seriesTypes.pie.prototype.setTitle = function (titleOption) {
        var chart = this.chart,
            center = this.center || (this.yAxis && this.yAxis.center),
            labelBBox,
            box,
            format;

        if (center && titleOption) {
            box = {
                x: chart.plotLeft + center[0] - 0.5 * center[2],
                y: chart.plotTop + center[1] - 0.5 * center[2],
                width: center[2],
                height: center[2]
            };

            format = titleOption.text || titleOption.format;
            format = Highcharts.format(format, this);

            if (this.title) {
                this.title.attr({
                    text: format
                });

            } else {
                this.title = this.chart.renderer.label(format)
                    .css(titleOption.style)
                    .add()
            }
            labelBBox = this.title.getBBox();
            titleOption.width = labelBBox.width;
            titleOption.height = labelBBox.height;
            this.title.align(titleOption, null, box);
        }
    };

    Highcharts.wrap(Highcharts.seriesTypes.pie.prototype, 'render', function (proceed) {
        proceed.call(this);
        this.setTitle(this.options.title);
    });

}(Highcharts));


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
        attribution: 'Tiles &copy; Esri &mdash; Sources: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
        maxZoom: 12
    }),
    esriGrey = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Sources: Esri, DeLorme, HERE, MapmyIndia, © OpenStreetMap contributors, and the GIS community',
        maxZoom: 12
    })
    ;


var nauticalchart = L.esri.imageMapLayer({
    url: '//seamlessrnc.nauticalcharts.noaa.gov/arcgis/rest/services/RNC/NOAA_RNC/ImageServer',
    //mosaicRule: mosaicRule,
    useCors: false
});//.addTo(map);


var map = L.map('bigmap', {
    zoomControl: false,
    maxZoom: 12,
    //layers: [esriOceans]
});
var smallmap;
var baseMaps = {
    "Grey": esriGrey,
    "Oceans": esriOceans,
    "Streets": esriStreets,
    "NatGeo World": esriNatGeo
};
var mapOverlay = {
    "Nautical Chart": nauticalchart
};

var baselayer = esriOceans.addTo(map);


//L.esri.basemapLayer('Oceans').addTo(map);
//L.esri.basemapLayer('OceansLabels').addTo(map);
//World_Street_Map
//NatGeo_World_Map
//World_Ocean_Base
//

//Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery",
// "ImageryLabels", "ImageryTransportation", "ShadedRelief", "ShadedReliefLabels", "Terrain" or "TerrainLabels"
/*
 L.control.zoom({
 position: 'bottomleft'
 }).addTo(map);
 */
for (var i = 0; i < ortLayerOptional.length; i++) {
    map.createPane('optionalfeature' + i);
}
;
map.setView([33.51, -78.3], 6);
map.createPane('AOIfeature');

var initInjector = angular.injector(["ng"]);
var $http = initInjector.get("$http");

$http.get("gis_config.json").then(function (result) {


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
            'angularSpinner',
            'highcharts-ng',
            'ngAria'

        ])
        .config(['$stateProvider', '$urlRouterProvider', 'AOIProvider', function ($stateProvider, $urlRouterProvider, AOIProvider) {
            $urlRouterProvider.otherwise('/main');

            AOIProvider.config({
                ortMapServer: result.data['ortMapServer'].data,
                ortLayerData: result.data['ortLayerData'].data,
                ortLayerAOI: result.data['ortLayerAOI'].data,
                ortEnergyGPService: result.data['ortEnergyGPService'].data,
                ortCommonGPService: result.data['ortCommonGPService'].data,
                ortTranspoGPService: result.data['ortTranspoGPService'].data,
                ortNaturalGPService: result.data['ortNaturalGPService'].data,
                ortEconGPService: result.data['ortEconGPService'].data
            });


            $stateProvider

                .state('otherwise', {
                    url: '/main',
                    templateUrl: 'partials/splash.html',
                })
                .state('CEview', {
                    //url: '/AOI?detail',
                    templateUrl: 'partials/CommonElements.html',
                    controller: 'AOICtrl'
                })
                .state('LoadAOI', {
                    url: '/AOI?AOIdetail',
                    templateUrl: 'partials/CommonElements.html',
                    controller: 'AOICtrl'
                })
                .state('NRCview', {
                    // url: '/view3',
                    templateUrl: 'partials/NaturalResourcesAndConservation.html',
                    controller: 'NaturalResourcesCtrl'
                })
                .state('TIview', {
                    //  url:'/view4',
                    templateUrl: 'partials/TransportationAndInfrastructure.html',
                    controller: 'TransportationAndInfrastructureCtrl'
                })
                .state('EMview', {
                    //  url: '/EM',
                    templateUrl: 'partials/EnergyAndMinerals.html',
                    controller: 'EnergyAndMineralsCtrl'
                })
                .state('ECview', {
                    //   url:'/view5',
                    templateUrl: 'partials/EconomicsAndCommerce.html',
                    controller: 'EconCtrl'
                })
                .state('meta', {
                    //url:'/metadata',
                    templateUrl: 'partials/metadata.html',
                    // controller: 'MyCtrl5'
                })
                .state('splash', {
                    url: '/splash',
                    templateUrl: 'partials/splash.html',
                    // controller: 'splashCtrl'
                })
                .state('menu', {
                    url: '/menu',
                    templateUrl: 'partials/KnownAreasMenu.html',
                    // controller: 'splashCtrl'
                })
                .state('draw', {
                    url: '/draw',
                    templateUrl: 'partials/draw.html',
                    controller: 'SearchCtrl'
                })
                .state('print', {
                    // url:'/print',
                    templateUrl: 'partials/printPreview.html',
                    controller: 'printCtrl'
                })
            ;
        }])
        .config(function ($animateProvider) {
            $animateProvider.classNameFilter(/angular-animate/);
        })

        .config(function ($analyticsProvider) {
            $analyticsProvider.firstPageview(true);
            /* Records pages that don't use $state or $route */
            $analyticsProvider.withAutoBase(true);
            /* Records full path */
        });
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['myApp']);
    });
});



