'use strict';


var initInjector = angular.injector(["ng"]);
var $http = initInjector.get("$http");

$http.get("data/gis_config.json").then(function (result) {

// Declare app level module which depends on filters, and services
    angular.module('ortApp', [
            'ui.router',
            'angular.filter',
            'ortApp.filters',
            'ortApp.services',
            'ortApp.directives',
            'ortApp.controllers',
            'angulartics',
            'angulartics.google.analytics',
            'pageslide-directive',
            'angularModalService',
            'ngAnimate',
            'angularSpinner',
            'highcharts-ng',
            'ngAria'

        ])
        .constant("COMMAND", {
            "DRAW": "DRAW",
            "SUBMIT": "Submit",
            "WORKING": "Working",
            "ERROR": "Error",
            "COMPLETE": "Complete"
        })
        .config(['$stateProvider', '$urlRouterProvider', 'AOIConfigProvider', function ($stateProvider, $urlRouterProvider, AOIConfigProvider) {
            $urlRouterProvider.otherwise('/main');
            AOIConfigProvider.set({
                ortMapServer: result.data['ortMapServer'].data,//Ocean Reporting Tool map server URL
                ortLayerData: result.data['ortLayerData'].data,//Ocean Reporting Tool layer ID number for REPORT_INFO table
                ortLayerAOI: result.data['ortLayerAOI'].data,//Ocean Reporting Tool map Layer for this Area Of Interest
                ortReportExpires: result.data['ortReportExpires'].data,//Ocean Reporting Tool custom drawn report data expiration text
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
                    EMWindResourcePotentialLayer: result.data['optionalLayerPanes'].EMWindResourcePotentialLayer, //EM is for Energy and Minerals
                    EMActiveRenewableEnergyLeasesLayer: result.data['optionalLayerPanes'].EMActiveRenewableEnergyLeasesLayer,
                    EMWindPlanningAreaLayer: result.data['optionalLayerPanes'].EMWindPlanningAreaLayer,
                    EMOceanDisposalSitesLayer: result.data['optionalLayerPanes'].EMOceanDisposalSitesLayer,
                    EMMarineMineralsLeasesLayer: result.data['optionalLayerPanes'].EMMarineMineralsLeasesLayer,
                    EMMarineHydrokineticProjectsLayer: result.data['optionalLayerPanes'].EMMarineHydrokineticProjectsLayer,
                    EMOceanWaveResourcePotentialLayer: result.data['optionalLayerPanes'].EMOceanWaveResourcePotentialLayer,
                    EMTidalPowerLayer: result.data['optionalLayerPanes'].EMTidalPowerLayer,
                    EMCurrentPowerLayer: result.data['optionalLayerPanes'].EMCurrentPower,
                    EMBeachNourishmentProjectsLayer: result.data['optionalLayerPanes'].EMBeachNourishmentProjectsLayer,
                    EMCoastalEnergyFacilitiesLayer: result.data['optionalLayerPanes'].EMCoastalEnergyFacilitiesLayer,
                    CEElevationLayer: result.data['optionalLayerPanes'].CEElevationLayer,//CE is for Common Elements but was renamed to General Information
                    ECCoastalCountiesLayer: result.data['optionalLayerPanes'].ECCoastalCountiesLayer,//EC is for Economics and Commerce
                    TISubmarineLayer: result.data['optionalLayerPanes'].TISubmarineLayer,//TI is for Transportation and Infrastructure
                    TIDangerZonesLayer: result.data['optionalLayerPanes'].TIDangerZonesLayer,
                    CEPlaceLayer: result.data['optionalLayerPanes'].CEPlaceLayer,
                    CETribalLayer: result.data['optionalLayerPanes'].CETribalLayer,
                    TIVesselLayer: result.data['optionalLayerPanes'].TIVesselLayer,
                    TIPrincipalPortsLayer: result.data['optionalLayerPanes'].TIPrincipalPortsLayer,
                    NRCNearbyLayer: result.data['optionalLayerPanes'].NRCNearbyLayer,//NRC is for Natural Resources and Conservation
                    NRCReefsLayer: result.data['optionalLayerPanes'].NRCReefsLayer,
                    NRCSoftCoralLayer: result.data['optionalLayerPanes'].NRCSoftCoralLayer,
                    NRCStoneyCoralLayer: result.data['optionalLayerPanes'].NRCStoneyCoralLayer,
                    NRCBarrierLayer: result.data['optionalLayerPanes'].NRCBarrierLayer
                }
            });

            $stateProvider
                .state('otherwise', {
                    cache: false,
                    url: '/main',
                    templateUrl: 'partials/splash.html'
                })
                .state('CEview', {
                    templateUrl: 'partials/GeneralInformation.html',
                    controller: 'AOICtrl as AOIvm'
                })
                .state('LoadAOI', {
                    cache: false,
                    url: '/AOI?AOIdetail',
                    templateUrl: 'partials/GeneralInformation.html',
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
                    cache: false,
                    url: '/splash',
                    templateUrl: 'partials/splash.html'
                })
                .state('menu', {
                    cache: false,
                    url: '/menu',
                    templateUrl: 'partials/KnownAreasMenu.html'
                })
                .state('draw', {
                    cache: false,
                    url: '/draw',
                    templateUrl: 'partials/draw.html',
                    controller: 'SearchCtrl as Searchvm'
                })
                .state('print', {
                    templateUrl: 'partials/printPreview.html',
                    controller: 'PrintCtrl as Printvm'
                });
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
        angular.bootstrap(document, ['ortApp']);
    });
});



