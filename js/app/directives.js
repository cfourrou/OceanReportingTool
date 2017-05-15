'use strict';

/* Directives */


function printDirective($state, $timeout) {
    function link(scope, element, attrs) {
        scope.loadPromise.then(function () {
            $timeout(function () { // $timeout used to give just a little extra time for elements to render in print. Without it some of the vector graphics don't show.
                var printElement = element[0].cloneNode(true);
                printElement.id = 'printSectionChrome';
                angular.element(document.body).append(printElement);
                window.print();
                printElement.innerHTML = "";
                $state.go('CEview');
            });
        });
    }

    return {
        link: link,
        restrict: "A",
        scope: {
            loadPromise: '='
        }
    };
}

angular.module('ortApp.directives', [])
    .directive("ngPrint", ['$state', '$timeout', printDirective])
    .directive('bindHtmlCompile', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.bindHtmlCompile);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        };
    }])

    .directive('exposeSize', function ($window) {
        return function ($scope) {

            $scope.initializeWindowSize = function () {
                $scope.windowHeight = $window.innerHeight;
                $scope.windowWidth = $window.innerWidth;
            };

            angular.element($window).bind('resize', function () {
                $scope.initializeWindowSize();
                $scope.$apply();
            });

            // Initiate the resize function default values
            $scope.initializeWindowSize();


        };
    })
    .directive('infoDirective', function () {
        return {
            restrict: 'E',
            scope: {
                modalTemplate: '@',
                modalImg: '@',
                message: '=',
                metadataUrl: '@',
                varData: '@',
                alttext: '@',
                modalCustom: '@',
                modalTitle: '@',
                modalText: '@',
            },
            template: '<a href ng-click="show(modalTemplate)" role="button" style="color:inherit;" aria-label="{{alttext}}">{{varData}}<div ng-if="!varData" ng-include="" src="modalImg" ></div></a>',
            controller: function ($scope, ModalService) {

                $scope.show = function (modalTemplate) {
                    ModalService.showModal({
                        templateUrl: modalTemplate,
                        controller: "ModalController",
                        inputs: {
                            metaurl: $scope.metadataUrl,
                            myvarData: $scope.varData,
                            modalcustom: $scope.modalCustom,
                            modaltext: $scope.modalText,
                            modaltitle: $scope.modalTitle
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
                basemapOn: '=',
                basemapOff: '=',
                basemapControlEnabled: '=',
                map: '=',
                startDrawing: '=',
                mapFullScreen: '=',
                mapHalfScreen: '=',
                toggleBaseLayer: '=',

            },
            replace: true,
            templateUrl: 'partials/ortMap.html',
            controller: ['$scope', '$element', 'L', 'AOI', 'AOIConfig', '$q',
                function ($scope, $element, L, AOI, AOIConfig, $q) {
                    function clearMouseLayer() {
                        if (mouseLayer) {
                            $scope.map.removeLayer(mouseLayer);
                            mouseLayer = null;
                        }
                    }

                    $scope.map = L.map('map', {
                        zoomControl: false,
                        maxZoom: 12
                    });
                    var deferred = $q.defer();
                    $scope.map.isLoaded = deferred.promise;

                    $scope.map.on('load', function (e) {
                        deferred.resolve();
                    });
                    // create panes???
                    angular.forEach(AOIConfig.optionalLayers, function (value, key) {
                        $scope.map.createPane(key + 'Pane');
                    });
                    $scope.map.setView([32.06, -78.3], 6); //33.51, -78.3

                    $scope.map.createPane('AOIfeature');

                    var esriNatGeo = L.tileLayer(AOIConfig.baseMapLayers.esriNatGeo.url, {
                            attribution: AOIConfig.baseMapLayers.esriNatGeo.attribution,
                            maxZoom: AOIConfig.baseMapLayers.esriNatGeo.maxZoom
                        }),
                        esriOceans = L.tileLayer(AOIConfig.baseMapLayers.esriOceans.url, {
                            attribution: AOIConfig.baseMapLayers.esriOceans.attribution,
                            maxZoom: AOIConfig.baseMapLayers.esriOceans.maxZoom
                        }),
                        esriStreets = L.tileLayer(AOIConfig.baseMapLayers.esriStreets.url, {
                            attribution: AOIConfig.baseMapLayers.esriStreets.attribution,
                            maxZoom: AOIConfig.baseMapLayers.esriStreets.maxZoom
                        }),
                        esriGrey = L.tileLayer(AOIConfig.baseMapLayers.esriGrey.url, {
                            attribution: AOIConfig.baseMapLayers.esriGrey.attribution,
                            maxZoom: AOIConfig.baseMapLayers.esriGrey.maxZoom
                        });

                    esriOceans.addTo($scope.map);

                    var baseMaps = {
                        "Grey": esriGrey,
                        "Oceans": esriOceans,
                        "Streets": esriStreets,
                        "NatGeo World": esriNatGeo
                    };

                    var nauticalChart = L.esri.imageMapLayer({
                        url: AOIConfig.nauticalChart.url,
                        useCors: AOIConfig.nauticalChart.useCors,
                        opacity: AOIConfig.nauticalChart.opacity
                    });

                    var mapOverlay = {
                        "Nautical Chart": nauticalChart
                    };

                    var baseMapControl = L.control.layers(baseMaps, mapOverlay, {
                        position: 'topleft',
                        collapsed: false
                    });
                    //$scope.toggleBaseLayer = function (layer) {
                    //    console.log(layer);
                    //   //esriGrey.addTo($scope.map);
                    //};

                    $scope.toggleBaseLayer = function (destLayer) {
                        for (var base in baseMaps) {
                            if ($scope.map.hasLayer(baseMaps[base]) && baseMaps[base] != baseMaps[destLayer]) {
                                $scope.map.removeLayer(baseMaps[base]);
                            }
                        }
                        $scope.map.addLayer(baseMaps[destLayer]);
                    };

                    $scope.toggleOverlayLayer = function (destLayer) {

                        if ($scope.map.hasLayer(mapOverlay[destLayer])) {
                            $scope.map.removeLayer(mapOverlay[destLayer]);

                        } else {
                            $scope.map.addLayer(mapOverlay[destLayer]);
                        }

                    };

                    $scope.overlayLayerOn = function (destLayer) {

                        if ($scope.map.hasLayer(mapOverlay[destLayer])) {
                            return (true);

                        } else {
                            return false;
                        }

                    };


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

                    var polyLayer;

                    $scope.map.on('pm:create', function (e) {
                        polyLayer = e.layer;
                        AOI.drawLayerShape = polyLayer.toGeoJSON();
                        $scope.drawButtonText = "Submit";
                        $scope.$apply();
                    });

                    $scope.drawAvailable = false;

                    $scope.startDrawing = function () {

                        if ($scope.drawAvailable) {
                            $scope.map.setMinZoom($scope.map.getZoom()); //lock map view at current zoom level
                            $scope.map.setMaxZoom($scope.map.getZoom());
                            $scope.map.dragging.disable(); //no panning
                            $scope.map.touchZoom.disable(); //no 2 finger zooms from touchscreens
                            $scope.map.doubleClickZoom.disable();
                            $scope.map.boxZoom.disable(); //no shift mouse drag zooming.
                            //$scope.map.zoomControl.disable(); //https://github.com/Leaflet/Leaflet/issues/3172
                            $scope.drawLocked = true;
                            $scope.drawButtonText = "Drawing";
                            $scope.polyLayerEnabled = false;
                            if (searchControl) searchControl.disable();
                            $scope.map.pm.enableDraw('Poly');
                            $scope.drawEnabled = true;
                        }
                    };

                    $scope.drawOn = function () {

                        clearMouseLayer();
                        searchControl.addTo($scope.map);
                        $scope.drawEnabled = true;
                    };
                    $scope.basemapOn = function () {
                        $scope.basemapControlEnabled = true;
                    };
                    $scope.basemapOff = function () {
                        $scope.basemapControlEnabled = false;
                    };
                    $scope.mapFullScreen = function () {

                        $element.css('width', '100%');
                        $element.find('#map').css('width', '100%');
                        $scope.map.invalidateSize();
                    };
                    $scope.mapHalfScreen = function () {
                        $element.css('width', '50%');
                        $element.find('#map').css('width', '50%');
                        $scope.map.invalidateSize();
                        if (AOI.drawLayerShape) {
                            var bounds = L.geoJson(AOI.drawLayerShape, {
                                className: 'map-AOIfeature',
                                pane: 'AOIfeature'
                            }).getBounds();
                            $scope.map.fitBounds(bounds);
                        }
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
                        $scope.drawLocked = false;
                        $scope.map.pm.disableDraw('Poly');
                        $scope.map.removeControl(searchControl);
                        if (baseMapControl) $scope.map.removeControl(baseMapControl);
                        $scope.drawEnabled = false;
                        $scope.drawAvailable = false;
                        if (polyLayer) {
                            $scope.map.removeLayer(polyLayer);
                            polyLayer = null;
                        }
                    };

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

                        var zoomLevel = $scope.map.getZoom();

                        if ((zoomLevel <= 12) && (zoomLevel >= 10 ) && !$scope.drawAvailable) {
                            $scope.drawAvailable = true;
                            if ($scope.drawEnabled) $scope.$apply();
                        } else if ((zoomLevel > 12) || (zoomLevel < 10) && $scope.drawAvailable) {
                            $scope.drawAvailable = false;
                            if ($scope.drawEnabled) $scope.$apply();
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
                            className: 'map-AOIfeature--mouseover',
                            simplifyFactor: 2.0
                        }).addTo($scope.map);
                    };

                    $scope.mouseOut = function () {
                        clearMouseLayer();
                    };

                    $scope.resetMap = function () {
                        $scope.mapHalfScreen();
                        $scope.basemapControlEnabled = false;
                        $scope.searchControlEnabled = false;
                        $scope.drawOff();
                        $scope.polyLayerEnabled = false;
                        $scope.map.setView([32.06, -78.3], 6);
                        clearMouseLayer();
                    };
                }
            ]
        }
    }])
    .directive('smallOrtMap', function () {
        return {
            restrict: 'E',
            scope: {
                mapPromise: '=',
                resetDrawArea: '='
            },
            templateUrl: 'partials/smallOrtMap.html',
            controller: ['$scope', 'L', 'AOI', 'AOIConfig', '$q', function ($scope, L, AOI, AOIConfig, $q) {
                function setDrawnArea() {
                    minicLayer = L.geoJson($scope.AOI.drawLayerShape, {
                        className: 'smallmap-AOIfeature',
                    }).addTo($scope.AOI.smallMap);
                    var minibounds = minicLayer.getBounds();
                    $scope.AOI.smallMap.fitBounds(minibounds);
                }

                $scope.AOI = AOI;
                var mapDeferred = $q.defer(), basemapDefered = $q.defer(),
                    basemapLabelsDefered = $q.defer();
                var allPromises = [
                    mapDeferred.promise, basemapDefered.promise, basemapLabelsDefered.promise
                ];

                if ($scope.AOI.smallMap) $scope.AOI.smallMap.remove();
                $scope.AOI.smallMap = L.map('smallMap', {zoomAnimation: false, fadeAnimation: false});
                $scope.AOI.smallMap.setView([45.526, -122.667], 1);

                $scope.mapPromise = $q.all(allPromises);

                $scope.AOI.smallMap.on('zoomend', function (e) {
                    mapDeferred.resolve();
                    mapDeferred = $q.defer();
                });

                var basemap = L.esri.basemapLayer('Oceans');
                basemap.on("load", function () {
                    basemapDefered.resolve();
                    basemapDefered = $q.defer();
                });
                basemap.addTo($scope.AOI.smallMap);

                var basemapLabels = L.esri.basemapLayer('OceansLabels');
                basemapLabels.on("load", function () {
                    basemapLabelsDefered.resolve();
                    basemapLabelsDefered = $q.defer();
                });
                basemapLabels.addTo($scope.AOI.smallMap);

                var minicLayer;
                if (AOI.ID === -9999) {
                    setDrawnArea();
                } else {
                    minicLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.ortLayerAOI,
                        where: "AOI_ID =" + AOI.ID + "",
                        className: 'smallmap-AOIfeature',
                    }).addTo($scope.AOI.smallMap);


                    minicLayer.on("load", function (evt) {
                        var bounds = L.latLngBounds([]);
                        minicLayer.eachFeature(function (layer) {
                            var layerBounds = layer.getBounds();
                            bounds.extend(layerBounds);
                        });
                        $scope.AOI.smallMap.fitBounds(bounds);
                        //$scope.AOI.smallMap.zoomOut(2);
                        minicLayer.off('load');
                    });
                }

                $scope.AOI.smallMap.invalidateSize();

                $scope.$watch('AOI.ID', function (newValue, oldValue) {
                    if (newValue !== oldValue && newValue === -9999) {
                        setDrawnArea();
                    }
                })
            }]
        }
    });


