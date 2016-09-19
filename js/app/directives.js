'use strict';

/* Directives */


function printDirective($state) {
    var printSection = document.getElementById("printSection");

    function printElement(elem) {
        var domClone = elem.cloneNode(true);
        if (!printSection) {
            printSection = document.createElement("div");
            printSection.id = "printSection";
            document.body.appendChild(printSection);
        } else {
            printSection.innerHTML = "";
        }
        printSection.appendChild(domClone);
    }

    function link($scope, element, attrs) {
        element.on("click", function () {
            var elemToPrint = document.getElementById(attrs.printElementId);
            if (elemToPrint) {
                printElement(elemToPrint);
                window.print();
                $state.go('CEview');
            }
        });
        $scope.updatePrint = function () {
            var elemToPrint = document.getElementById(attrs.printElementId);
            if (elemToPrint) {
                printElement(elemToPrint);
                window.print();
                $state.go('CEview');
            }
        }
    }

    return {
        link: link,
        restrict: "A"
    };
}


angular.module('myApp.directives', [])
    .directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])
    .directive("ngPrint", ['$state', printDirective])
    .directive('infoDirective', function () {
        return {
            restrict: 'E',
            scope: {
                modalTemplate: '@',
                modalImg: '@',
                message: '=',
                metadataUrl: '@',
                vardata: '@',
                alttext: '@'
            },
            template: '<a href ng-click="show(modalTemplate)" role="button" style="color:inherit;" aria-label="{{alttext}}">{{vardata}}<div ng-if="!vardata" ng-include="" src="modalImg" ></div></a>',
            controller: function ($scope, ModalService) {

                $scope.show = function (modalTemplate) {
                    ModalService.showModal({
                        templateUrl: modalTemplate,
                        controller: "ModalController",
                        inputs: {
                            metaurl: $scope.metadataUrl,
                            myvarData: $scope.vardata

                        }

                    }).then(function (modal) {
                        modal.close.then(function (result) {
                            $scope.message = "You said " + result;

                        });
                    });
                };

            }
        }
    })
    .directive('renewableEnergy', function () {
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'partials/EM_RenewableEnergyLeases.html',
            controller: function ($scope, AOI) {
                $scope.AOI = AOI;
            }
        }
    })
    .directive('ortMap', [function () {
        return {
            restrict: 'E',
            scope: {
                zoomLevel: '=',
                drawEnabled: '=',
                drawLocked: '=',
                basemapControlEnabled: '=',
                searchControlEnabled: '=',
                mouseOver: '=',
                mouseOut: '=',
                polyLayerEnabled: '=',
                resetMap: '='
            },
            templateUrl: 'partials/ortMap.html',
            controller: ['$scope', '$element', 'L', 'AOI', function ($scope, $element, L, AOI) {


                var map = L.map('map', {
                    zoomControl: false,
                    maxZoom: 12
                });

                map.setView([33.51, -78.3], 6);
                map.createPane('AOIfeature');

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
                    });

                esriOceans.addTo(map);

                var baseMaps = {
                    "Grey": esriGrey,
                    "Oceans": esriOceans,
                    "Streets": esriStreets,
                    "NatGeo World": esriNatGeo
                };

                var nauticalchart = L.esri.imageMapLayer({
                    url: '//seamlessrnc.nauticalcharts.noaa.gov/arcgis/rest/services/RNC/NOAA_RNC/ImageServer',
                    useCors: false,
                    opacity: .5
                });

                var mapOverlay = {
                    "Nautical Chart": nauticalchart
                };

                var baseMapControl = L.control.layers(baseMaps, mapOverlay, {
                    position: 'topleft',
                    collapsed: false
                });

                var searchControl = L.esri.Geocoding.geosearch({
                    expanded: true,
                    collapseAfterResult: false,
                    useMapBounds: true,
                    searchBounds: L.latLngBounds([[24, -84], [39, -74]]),
                    providers: [
                        L.esri.Geocoding.arcgisOnlineProvider(),
                        new L.esri.Geocoding.FeatureLayerProvider({
                            url: AOI.config.ortMapServer + AOI.config.ortLayerAOI,
                            searchFields: ['AOI_NAME'],
                            label: 'Known Areas',
                            bufferRadius: 5000,
                            formatSuggestion: function (feature) {
                                return feature.properties.AOI_NAME;
                            }
                        })
                    ]
                }).addTo(map);

                $scope.zoomLevel = map.getZoom();



                var polylayer;

                map.on('pm:create', function (e) {
                    polylayer = e.layer;
                    AOI.drawLayerShape = polylayer.toGeoJSON();
                    $scope.drawOrSubmitCommand = "Submit";
                    $scope.$apply();
                });

                $scope.$watch('polyLayerEnabled', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        if (!newValue) map.removeLayer(polyLayer);
                    }
                });

                $scope.$watch('drawEnabled', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        if (newValue) {
                            map.setMinZoom(map.getZoom()); //lock map view at current zoom level
                            map.setMaxZoom(map.getZoom());
                            map.dragging.disable(); //no panning
                            map.touchZoom.disable(); //no 2 finger zooms from touchscreens
                            map.doubleClickZoom.disable();
                            map.boxZoom.disable(); //no shift mouse drag zooming.
                            //map.zoomControl.disable(); //https://github.com/Leaflet/Leaflet/issues/3172
                            searchControl.disable();
                            $scope.drawlocked = true;
                            $scope.drawOrSubmitCommand = "Drawing";
                            $scope.polyLayerEnabled = false;
                            map.pm.enableDraw('Poly');

                            $element[0].css('width', '100%');
                            map.invalidateSize();
                        } else {
                            map.setMinZoom(1);
                            map.setMaxZoom(12);
                            map.dragging.enable(); // panning
                            map.touchZoom.enable(); // 2 finger zooms from touchscreens
                            map.doubleClickZoom.enable();
                            map.boxZoom.enable(); // shift mouse drag zooming.
                            //map.zoomControl.enable(); //https://github.com/Leaflet/Leaflet/issues/3172
                            map.dragging.enable();
                            searchControl.enable();
                            $scope.drawlocked = false;
                            map.pm.disableDraw('Poly');

                            $element[0].css('width', '50%');
                            map.invalidateSize();
                        }
                    }
                });



                $scope.$watch('basemapControlEnabled', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        if (newValue) baseMapControl.addTo(map);
                        else map.removeControl(baseMapControl);
                    }
                });

                $scope.removeLayer = function (layer) {
                    map.removeLayer(layer);
                };

                map.on('zoomend', function (e) {
                    var zoomlevel = map.getZoom();
                    $scope.drawAvailable = ((zoomlevel <= 12) && (zoomlevel >= 10 ));
                });

                $scope.$watch('searchControlEnabled', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        if (newValue) searchControl.addTo(map);
                        else map.removeControl(searchControl);
                    }
                });

                var mouseLayer;

                $scope.mouseOver = function (AOI_id) {
                    mouseLayer = L.esri.featureLayer({
                        url: AOI.config.ortMapServer + AOI.config.ortLayerAOI,
                        where: "AOI_ID =" + AOI_id + "",
                        color: '#EB660C', weight: 1.5, fillOpacity: .3,
                        simplifyFactor: 2.0
                    }).addTo(map);
                };

                $scope.mouseOut = function () {
                    map.removeLayer(mouseLayer);
                    mouseLayer = null;
                };

                $scope.resetMap = function () {
                    $scope.baseMapControlOn = false;
                    $scope.searchControlOn = false;
                    $scope.drawtoolOn = false;
                    $scope.polyLayerOn = false;
                    map.setView([33.51, -78.3], 6);
                }

            }]
        }
    }]);


