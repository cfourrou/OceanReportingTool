'use strict';

var toggle = false;

//var mouseLayer, searchControl;


function preloader() {
    if (document.images) {
        var img1 = new Image();
        var img2 = new Image();
        img1.src = "img/wind_cc.svg";
        img2.src = "img/BOEM_logo.svg";
    }
}
function addLoadEvent(func) {
    var oldOnLoad = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldOnLoad) {
                oldOnLoad();
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
var smallMap;


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
        .config(['$stateProvider', '$urlRouterProvider', 'AOIConfigProvider', function ($stateProvider, $urlRouterProvider, AOIConfigProvider) {
            $urlRouterProvider.otherwise('/main');
            AOIConfigProvider.set({
                ortMapServer: result.data['ortMapServer'].data,//Ocean Reporting Tool map server URL
                ortLayerData: result.data['ortLayerData'].data,//Ocean Reporting Tool layer ID number for REPORT_INFO table
                ortLayerAOI: result.data['ortLayerAOI'].data,//Ocean Reporting Tool map Layer for this Area Of Interest
                ortEnergyGPService: result.data['ortEnergyGPService'].data, //ORT Energy GeoProcessing Service URL
                ortCommonGPService: result.data['ortCommonGPService'].data, //ORT Common Elements or General Information GeoProcessing Service URL
                ortTranspoGPService: result.data['ortTranspoGPService'].data,//ORT Transporation and Infrastructure GeoProcessing Service URL
                ortNaturalGPService: result.data['ortNaturalGPService'].data,//ORT Natural Resources GeoProcessing Service URL
                ortEconGPService: result.data['ortEconGPService'].data, //ORT Economics GeoProcessing Service URL
                nauticalChart: {
                    url: result.data['nauticalChart'].url,
                    useCors: result.data['nauticalChart'].useCors,
                    opacity: result.data['nauticalChart'].opacity
                },
                baseMapLayers: {
                    esriNatGeo: {
                        url: result.data['baseMapLayers'].esriNatGeo.url,
                        attribution: result.data['baseMapLayers'].esriNatGeo.attribution,
                        maxZoom: result.data['baseMapLayers'].esriNatGeo.maxZoom
                    },
                    esriOceans: {
                        url: result.data['baseMapLayers'].esriOceans.url,
                        attribution: result.data['baseMapLayers'].esriOceans.attribution,
                        maxZoom: result.data['baseMapLayers'].esriOceans.maxZoom
                    },
                    esriStreets: {
                        url: result.data['baseMapLayers'].esriStreets.url,
                        attribution: result.data['baseMapLayers'].esriStreets.attribution,
                        maxZoom: result.data['baseMapLayers'].esriStreets.maxZoom
                    },
                    esriGrey: {
                        url: result.data['baseMapLayers'].esriGrey.url,
                        attribution: result.data['baseMapLayers'].esriGrey.attribution,
                        maxZoom: result.data['baseMapLayers'].esriGrey.maxZoom
                    }
                },
                optionalLayers: {
                    EMWindResourcePotentialLayer: result.data['optionalLayerPanes'].EMWindResourcePotentialLayer.num,
                    EMActiveRenewableEnergyLeasesLayer: result.data['optionalLayerPanes'].EMActiveRenewableEnergyLeasesLayer.num,
                    EMWindPlanningAreaLayer: result.data['optionalLayerPanes'].EMWindPlanningAreaLayer.num,
                    oceanDisposalSites: result.data['optionalLayerPanes'].oceanDisposalSites.num,
                    marineMineralsLeases: result.data['optionalLayerPanes'].marineMineralsLeases.num,
                    HydrokineticLeases: result.data['optionalLayerPanes'].HydrokineticLeases.num,
                    wavePower: result.data['optionalLayerPanes'].wavePower.num,
                    tidalPower: result.data['optionalLayerPanes'].tidalPower.num,
                    EMCurrentPowerLayer: result.data['optionalLayerPanes'].EMCurrentPower.num,
                    beachNourish: result.data['optionalLayerPanes'].beachNourish.num,
                    coastalEnergyFacilities: result.data['optionalLayerPanes'].coastalEnergyFacilities.num,
                    CEElevationLayer: result.data['optionalLayerPanes'].CEElevationLayer.num,//Common Elements Elevation Layer
                    ECCoastalCountiesLayer: result.data['optionalLayerPanes'].ECCoastalCountiesLayer.num,//Economics and Commerce Coastal Counties Layer
                    TISubmarineLayer: result.data['optionalLayerPanes'].TISubmarineLayer.num,//Transportation and Infrastructure Submarine Layer
                    TIDangerZonesLayer: result.data['optionalLayerPanes'].TIDangerZonesLayer.num,
                    CEPlaceLayer: result.data['optionalLayerPanes'].CEPlaceLayer.num,
                    CETribalLayer: result.data['optionalLayerPanes'].CETribalLayer.num,
                    TIVessels: result.data['optionalLayerPanes'].TIVessels.num,
                    TIPrincipalPortsLayer: result.data['optionalLayerPanes'].TIPrincipalPortsLayer.num,
                    NRCNearbyLayer: result.data['optionalLayerPanes'].NRCNearbyLayer.num,//Natural Resources and Conservation NearbyLayer
                    NRCReefsLayer: result.data['optionalLayerPanes'].NRCReefsLayer.num,
                    NRCSoftCoralLayer: result.data['optionalLayerPanes'].NRCSoftCoralLayer.num,
                    NRCStoneyCoralLayer: result.data['optionalLayerPanes'].NRCStoneyCoralLayer.num,
                    NRCBarrierLayer: result.data['optionalLayerPanes'].NRCBarrierLayer.num
                }
            });

            $stateProvider

                .state('otherwise', {
                    url: '/main',
                    templateUrl: 'partials/splash.html'
                })
                .state('CEview', {

                    templateUrl: 'partials/CommonElements.html',
                    controller: 'AOICtrl as AOIvm'
                })
                .state('LoadAOI', {
                    url: '/AOI?AOIdetail',
                    templateUrl: 'partials/CommonElements.html',
                    controller: 'AOICtrl as AOIvm'
                })
                .state('NRCview', {

                    templateUrl: 'partials/NaturalResourcesAndConservation.html',
                    controller: 'NaturalResourcesCtrl as NRCvm'
                })
                .state('TIview', {

                    templateUrl: 'partials/TransportationAndInfrastructure.html',
                    controller: 'TransportationAndInfrastructureCtrl as TIvm'
                })
                .state('EMview', {

                    templateUrl: 'partials/EnergyAndMinerals.html',
                    controller: 'EnergyAndMineralsCtrl as EMvm'
                })
                .state('ECview', {

                    templateUrl: 'partials/EconomicsAndCommerce.html',
                    controller: 'EconCtrl as ECvm'
                })
                .state('meta', {

                    templateUrl: 'partials/metadata.html'

                })
                .state('splash', {
                    url: '/splash',
                    templateUrl: 'partials/splash.html'
                })
                .state('menu', {
                    url: '/menu',
                    templateUrl: 'partials/KnownAreasMenu.html'
                })
                .state('draw', {
                    url: '/draw',
                    templateUrl: 'partials/draw.html',
                    controller: 'SearchCtrl as Searchvm'
                })
                .state('print', {

                    templateUrl: 'partials/printPreview.html',
                    controller: 'PrintCtrl as Printvm'
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



