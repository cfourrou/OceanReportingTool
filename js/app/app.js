'use strict';

var toggle = false;

var mouseLayer, searchControl;


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
var smallmap;


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
                ortMapServer: result.data['ortMapServer'].data,
                ortLayerData: result.data['ortLayerData'].data,
                ortLayerAOI: result.data['ortLayerAOI'].data,
                ortEnergyGPService: result.data['ortEnergyGPService'].data,
                ortCommonGPService: result.data['ortCommonGPService'].data,
                ortTranspoGPService: result.data['ortTranspoGPService'].data,
                ortNaturalGPService: result.data['ortNaturalGPService'].data,
                ortEconGPService: result.data['ortEconGPService'].data,
                optionalLayers: {
                    windrpLayer: result.data['optionalLayerPanes'].windrpLayer.num,
                    windLeaseLayer: result.data['optionalLayerPanes'].windLeaseLayer.num,
                    windPlanningLayer: result.data['optionalLayerPanes'].windPlanningLayer.num,
                    oceanDisposalSites: result.data['optionalLayerPanes'].oceanDisposalSites.num,
                    marineMineralsLeases: result.data['optionalLayerPanes'].marineMineralsLeases.num,
                    HydrokineticLeases: result.data['optionalLayerPanes'].HydrokineticLeases.num,
                    wavePower: result.data['optionalLayerPanes'].wavePower.num,
                    tidalPower: result.data['optionalLayerPanes'].tidalPower.num,
                    currentPower: result.data['optionalLayerPanes'].currentPower.num,
                    beachNourish: result.data['optionalLayerPanes'].beachNourish.num,
                    coastalEnergyFacilities: result.data['optionalLayerPanes'].coastalEnergyFacilities.num,
                    CEElevation: result.data['optionalLayerPanes'].CEElevation.num,
                    ECCoastalCountiesLayer: result.data['optionalLayerPanes'].ECCoastalCountiesLayer.num,
                    TISubmarineLayer: result.data['optionalLayerPanes'].TISubmarineLayer.num,
                    TIDangerZonesLayer: result.data['optionalLayerPanes'].TIDangerZonesLayer.num,
                    CEPlaceLayer: result.data['optionalLayerPanes'].CEPlaceLayer.num,
                    CETribalLayer: result.data['optionalLayerPanes'].CETribalLayer.num,
                    TIVessels: result.data['optionalLayerPanes'].TIVessels.num,
                    TIPrincipalPortsLayer: result.data['optionalLayerPanes'].TIPrincipalPortsLayer.num,
                    NRCNearbyLayer: result.data['optionalLayerPanes'].NRCNearbyLayer.num,
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



