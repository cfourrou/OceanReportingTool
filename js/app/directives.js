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
                drawEnabled: '=',
                searchControlEnabled: '=',
                mouseOver: '=',
                mouseOut: '=',
                polyLayerEnabled: '=',
                resetMap: '=',
                drawButtonText: '=',
                drawIt: '=',
                drawOn: '=',
                drawOff: '=',
                map: '='
            },
            replace: true,
            templateUrl: 'partials/ortMap.html',
            controller: ['$scope', '$element', 'L', 'AOI', 'AOIConfig', function ($scope, $element, L, AOI, AOIConfig) {


                $scope.map = L.map('map', {
                    zoomControl: false,
                    maxZoom: 12
                });

                $scope.map.setView([33.51, -78.3], 6);
                $scope.map.createPane('AOIfeature');

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

                esriOceans.addTo($scope.map);

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
                            url: AOIConfig.ortMapServer + AOIConfig.ortLayerAOI,
                            searchFields: ['AOI_NAME'],
                            label: 'Known Areas',
                            bufferRadius: 5000,
                            formatSuggestion: function (feature) {
                                return feature.properties.AOI_NAME;
                            }
                        })
                    ]
                });

                $scope.zoomLevel = $scope.map.getZoom();
                $scope.basemapControlEnabled = false;

                var polylayer;

                $scope.map.on('pm:create', function (e) {
                    polylayer = e.layer;
                    AOI.drawLayerShape = polylayer.toGeoJSON();
                    $scope.drawButtonText = "Submit";
                    $scope.$apply();
                });

                $scope.drawAvailable = false;

                $scope.drawOn = function () {
                    $scope.map.setMinZoom($scope.map.getZoom()); //lock map view at current zoom level
                    $scope.map.setMaxZoom($scope.map.getZoom());
                    $scope.map.dragging.disable(); //no panning
                    $scope.map.touchZoom.disable(); //no 2 finger zooms from touchscreens
                    $scope.map.doubleClickZoom.disable();
                    $scope.map.boxZoom.disable(); //no shift mouse drag zooming.
                    //$scope.map.zoomControl.disable(); //https://github.com/Leaflet/Leaflet/issues/3172
                    if (searchControl) searchControl.disable();
                    $scope.drawLocked = true;
                    $scope.drawButtonText = "Drawing";
                    $scope.polyLayerEnabled = false;
                    $scope.map.pm.enableDraw('Poly');

                    //$element.css('width', '100%');
                    //$scope.map.invalidateSize();
                };

                $scope.drawOff = function () {
                    $scope.map.setMinZoom(1);
                    $scope.map.setMaxZoom(12);
                    $scope.map.dragging.enable(); // panning
                    $scope.map.touchZoom.enable(); // 2 finger zooms from touchscreens
                    $scope.map.doubleClickZoom.enable();
                    $scope.map.boxZoom.enable(); // shift mouse drag zooming.
                    //$scope.map.zoomControl.enable(); //https://github.com/Leaflet/Leaflet/issues/3172
                    $scope.map.dragging.enable();
                    if (searchControl) searchControl.enable();
                    $scope.drawLocked = false;
                    $scope.map.pm.disableDraw('Poly');
                };

                $scope.$watch('drawEnabled', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        if (newValue) {
                            searchControl.addTo($scope.map);
                            $element.css('width', '100%');
                            $element.find('#map').css('width', '100%');
                            $scope.map.invalidateSize();
                        } else {
                            $scope.map.removeControl(searchControl);
                            $element.css('width', '50%');
                            $element.find('#map').css('width', '50%');
                            $scope.map.invalidateSize();
                            $scope.drawOff();
                            if (polylayer) {
                                $scope.map.fitBounds(polylayer.getBounds());
                                $scope.map.removeLayer(polylayer);
                            }
                        }
                    }
                });


                $scope.$watch('basemapControlEnabled', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        if (newValue) baseMapControl.addTo($scope.map);
                        else $scope.map.removeControl(baseMapControl);
                    }
                });

                $scope.removeLayer = function (layer) {
                    $scope.map.removeLayer(layer);
                };

                $scope.map.on('zoomend', function (e) {
                    if ($scope.drawEnabled) {
                        var zoomlevel = $scope.map.getZoom();
                        if ((zoomlevel <= 12) && (zoomlevel >= 10 ) && !$scope.drawAvailable) {
                            $scope.drawAvailable = true;
                            $scope.$apply();
                        } else if ((zoomlevel > 12) && (zoomlevel < 10) && $scope.drawAvailable) {
                            $scope.drawAvailable = false;
                            $scope.$apply();
                        }
                    }
                });

                $scope.$watch('searchControlEnabled', function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        if (newValue) searchControl.addTo($scope.map);
                        else $scope.map.removeControl(searchControl);
                    }
                });

                var mouseLayer;

                $scope.mouseOver = function (AOI_id) {
                    mouseLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.ortLayerAOI,
                        where: "AOI_ID =" + AOI_id + "",
                        color: '#EB660C', weight: 1.5, fillOpacity: .3,
                        simplifyFactor: 2.0
                    }).addTo($scope.map);
                };

                $scope.mouseOut = function () {
                    if (mouseLayer) {
                        $scope.map.removeLayer(mouseLayer);
                        mouseLayer = null;
                    }
                };

                $scope.resetMap = function () {
                    $scope.baseMapControlEnabled = false;
                    $scope.searchControlEnabled = false;
                    $scope.drawEnabled = false;
                    $scope.polyLayerEnabled = false;
                    $scope.map.setView([33.51, -78.3], 6);
                };

                // create panes???
                angular.forEach(AOIConfig.optionalLayers,function(value, key){
                    $scope.map.createPane(key + 'Pane');
                });
            }]
        }
    }]);


