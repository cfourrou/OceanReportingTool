'use strict';


angular.module('myApp.controllers', ["pageslide-directive"])


    .controller('ModalController', function ($scope, metaurl, close) {

        $scope.metadataurl = metaurl;
        $scope.close = function (result) {
            close(result, 500); // close, but give 500ms for to animate
        };


    })
    .controller('submitModalController', function ($scope, close) {

        //$scope.close = function (result) {
        //    close(result, 500); // close, but give 500ms for to animate
        //
        //};

        close(false, 6000);//close after 10 seconds anyway.

    })

    .controller('printCtrl', ['AOI', '$scope', '$timeout', '$document', 'webService', function (AOI, $scope, $timeout, $document, webService) {
        $scope.AOI = AOI;
        AOI.inPrintWindow = true;
        $scope.congressIsActive = true;
        $scope.senateIsActive = true;
        $scope.houseIsActive = true;
        $scope.congressMenu = "-";
        $scope.senateMenu = "-";
        $scope.houseMenu = "-";
        webService.getData('CE_config.json').then(function (result) {
            $scope.CEConfig = result;
        });
        webService.getData('EM_config.json').then(function (result) {
            $scope.EMConfig = result;
        });
        webService.getData('TI_config.json').then(function (result) {
            $scope.TIConfig = result;
        });
        webService.getData('NRC_config.json').then(function (result) {
            $scope.NRCConfig = result;
        });
        webService.getData('EC_config.json').then(function (result) {
            $scope.ECConfig = result;
        });


        $scope.$on('$viewContentLoaded', function () {
            // document is ready, place  code here
            $timeout(function () {
                AOI.loadSmallMap(false);
                $scope.saveAsBinary();
                $timeout(function () {
                    $scope.updatePrint();
                }, 3000);
            }, 1500);


        });


        $scope.saveAsBinary = function () {

            var svg = document.getElementById('container')
                .children[0].innerHTML;
            var canvas = document.createElement("canvas");
            canvg(canvas, svg, {});

            var img = canvas.toDataURL("image/png"); //img is data:image/png;base64


            $('#binaryImage').attr('src', img);


        }

    }])

    .controller('AOICtrl', ['AOI', '$scope', 'webService', function (AOI, $scope, webService) {


        $scope.AOI = AOI;
        AOI.inPrintWindow = false;
        $scope.congressIsActive = true;
        $scope.senateIsActive = false;
        $scope.houseIsActive = false;
        $scope.congressMenu = "-";
        $scope.senateMenu = "+";
        $scope.houseMenu = "+";

        webService.getData('CE_config.json').then(function (result) {
            $scope.CEConfig = result;
        });
        webService.getData('narratives.json').then(function (result) {
            AOI.narratives = result;
        });

        $scope.congressActivate = function () {
            $scope.congressIsActive = true;
            $scope.senateIsActive = false;
            $scope.houseIsActive = false;
            $scope.congressMenu = "-";
            $scope.senateMenu = "+";
            $scope.houseMenu = "+";
        };
        $scope.houseActivate = function () {
            $scope.congressIsActive = false;
            $scope.senateIsActive = false;
            $scope.houseIsActive = true;
            $scope.congressMenu = "+";
            $scope.senateMenu = "+";
            $scope.houseMenu = "-";
        };
        $scope.senateActivate = function () {
            $scope.congressIsActive = false;
            $scope.senateIsActive = true;
            $scope.houseIsActive = false;
            $scope.congressMenu = "+";
            $scope.senateMenu = "-";
            $scope.houseMenu = "+";
        };

        $scope.mout($scope.AOI.ID);

        $scope.paneon();

    }])
    .controller('SearchCtrl', ['AOI', '$scope', function (AOI, $scope) {

        document.getElementById("bigmap").style.width = '100%';
        $scope.off();
        map.invalidateSize();
        AOI.inPrintWindow = false;

        if ($scope.drawOrSubmitCommand === "Working") $scope.startSpin();
        var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

        searchControl = L.esri.Geocoding.geosearch({
            expanded: true,
            collapseAfterResult: false,
            useMapBounds: true,
            searchBounds: L.latLngBounds([[24, -84], [39, -74]]),
            providers: [
                arcgisOnline,

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

        searchControl.on('results', function (response) {
            if (response.results[0].properties.AOI_NAME !== undefined) {
                console.warn(response.results[0])
            }
        });


    }])


    .controller('EnergyAndMineralsCtrl', ['$scope', 'AOI', 'webService', function ($scope, AOI, webService) {
        $scope.AOI = AOI;
        AOI.inPrintWindow = false;
        $scope.name = "EnergyAndMineralsCtrl";
        webService.getData('EM_config.json').then(function (result) {
            $scope.EMConfig = result;
        });


        $scope.paneon();
    }])

    .controller('TransportationAndInfrastructureCtrl', ['$scope', 'AOI', 'webService', function ($scope, AOI, webService) {
        $scope.AOI = AOI;
        AOI.inPrintWindow = false;
        $scope.name = "TransportationAndInfrastructureCtrl";
        webService.getData('TI_config.json').then(function (result) {
            $scope.TIConfig = result;
        });


        $scope.paneon();

    }])
    .controller('NaturalResourcesCtrl', ['$scope', 'AOI', 'webService', function ($scope, AOI, webService) {
        $scope.AOI = AOI;
        AOI.inPrintWindow = false;
        $scope.name = "NaturalResourcesCtrl";
        webService.getData('NRC_config.json').then(function (result) {
            $scope.NRCConfig = result;
        });

        $scope.paneon();
    }])

    .controller('EconCtrl', ['$scope', 'AOI', 'webService', function ($scope, AOI, webService) {
        $scope.AOI = AOI;
        AOI.inPrintWindow = false;
        $scope.name = "EconCtrl";
        webService.getData('EC_config.json').then(function (result) {
            $scope.ECConfig = result;
        });


        $scope.paneon();
    }])

    .controller('pageslideCtrl', ['$scope', 'AOI', 'ModalService', '$state', 'usSpinnerService', '$location', '$stateParams', '$q',
        function ($scope, AOI, ModalService, $state, usSpinnerService, $location, $stateParams, $q) { //this one loads once on start up

            $scope.AOI = AOI;
            $scope.baseMapControlOn = false;


            AOI.inPrintWindow = false;
            var baseMapControl = L.control.layers(baseMaps, mapOverlay, {
                position: 'topleft',
                collapsed: false
            });


            $scope.box = [];
            var len = 2000;
            for (var i = 0; i < len; i++) {
                $scope.box.push({
                    myid: i,
                    isActive: false,
                    level: 0,
                    future: true
                });
            }
            $scope.drawenabled = false;
            $scope.drawlocked = false;
            $scope.zoomlevel = map.getZoom();
            $scope.drawOrSubmitCommand = "DRAW";

            Highcharts.setOptions({
                global: {
                    useUTC: false

                },
                lang: {
                    decimalPoint: '.',
                    thousandsSep: ',',
                    numericSymbols: ["k", "M", "B", "T", "P", "E"]
                }
            });

            map.on('zoomend', function () {
                $scope.zoomlevel = map.getZoom();


                if ($scope.drawtoolOn) {
                    $scope.drawenabled = $scope.zoomLevelGood();
                    $scope.$apply();
                }

            });

            $scope.zoomLevelGood = function () {
                $scope.zoomlevel = map.getZoom();
                if (($scope.zoomlevel <= 12) && ($scope.zoomlevel >= 10 )) {
                    return true;
                } else {
                    return false;
                }
            };


            $scope.checked = true; // This will be binded using the ps-open attribute

            $scope.drawOff = function () {
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

            };
            $scope.drawOn = function () {
                map.setMinZoom(map.getZoom()); //lock map view at current zoom level
                map.setMaxZoom(map.getZoom());
                map.dragging.disable(); //no panning
                map.touchZoom.disable(); //no 2 finger zooms from touchscreens
                map.doubleClickZoom.disable();
                map.boxZoom.disable(); //no shift mouse drag zooming.
                //map.zoomControl.disable(); //https://github.com/Leaflet/Leaflet/issues/3172
                searchControl.disable()
                $scope.drawlocked = true;
                $scope.drawOrSubmitCommand = "Drawing";
                if ($scope.polylayer)  map.removeLayer($scope.polylayer);
                map.pm.enableDraw('Poly');
            };

            $scope.showSubmitModal = function () {

                ModalService.showModal({
                    templateUrl: "modalDraw.html",
                    controller: "submitModalController"
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        $scope.customResult = "All good!";
                    });
                });

            };

            $scope.startSpin = function () {
                usSpinnerService.spin('spinner-1');
            };
            $scope.stopSpin = function () {
                usSpinnerService.stop('spinner-1');
            };
            var EMGPService = L.esri.GP.service({
                url: AOI.config.ortEnergyGPService,
                useCors: false,
                async: true,
                path: 'submitJob',
                asyncInterval: 1
            });
            var CEGPService = L.esri.GP.service({
                url: AOI.config.ortCommonGPService,
                useCors: false,
                async: true,
                path: 'submitJob',
                asyncInterval: 1
            });
            var TIGPService = L.esri.GP.service({
                url: AOI.config.ortTranspoGPService,
                useCors: false,
                async: true,
                path: 'submitJob',
                asyncInterval: 1
            });
            var NRCGPService = L.esri.GP.service({
                url: AOI.config.ortNaturalGPService,
                useCors: false,
                async: true,
                path: 'submitJob',
                asyncInterval: 1
            });
            var ECGPService = L.esri.GP.service({
                url: AOI.config.ortEconGPService,
                useCors: false,
                async: true,
                path: 'submitJob',
                asyncInterval: 1
            });

            $scope.baseMapSwitch = function () {

                if ($scope.baseMapControlOn) {
                    map.removeControl(baseMapControl);
                    $scope.baseMapControlOn = false;

                } else {
                    baseMapControl.addTo(map);
                    $scope.baseMapControlOn = true;
                }
            };


            var EMGPdeferred, CEGPdeferred, TIGPdeferred, NRCGPdeferred, ECGPdeferred;
            var allPromises;
            $scope.drawIt = function () {
                //var EMGPdeferred, CEGPdeferred, TIGPdeferred, NRCGPdeferred, ECGPdeferred;


                switch ($scope.drawOrSubmitCommand.substring(0, 4)) {

                    case "DRAW":

                        if ($scope.drawenabled) {
                            if ($scope.drawlocked) {
                                $scope.drawOff();
                            } else {
                                $scope.drawOn();
                            }
                        }
                        break;
                    case "Subm":
                        var drawPromises = [];
                        EMGPdeferred = null, CEGPdeferred = null, TIGPdeferred = null, NRCGPdeferred = null, ECGPdeferred = null;
                        EMGPdeferred = $q.defer(), CEGPdeferred = $q.defer(), TIGPdeferred = $q.defer(), NRCGPdeferred = $q.defer(), ECGPdeferred = $q.defer();
                        drawPromises = [EMGPdeferred.promise, CEGPdeferred.promise, TIGPdeferred.promise, NRCGPdeferred.promise, ECGPdeferred.promise];
                        $scope.showSubmitModal();

                        AOI.drawLayerShape = $scope.polylayer.toGeoJSON();

                        $scope.drawOrSubmitCommand = "Working";
                        var EMGPTask = EMGPService.createTask();
                        var CEGPTask = CEGPService.createTask();
                        var TIGPTask = TIGPService.createTask();
                        var NRCGPTask = NRCGPService.createTask();
                        var ECGPTask = ECGPService.createTask();

                        EMGPTask.setParam("Report_Boundary", $scope.polylayer.toGeoJSON());
                        EMGPTask.setOutputParam("Output_Report");
                        CEGPTask.setParam("Report_Boundary", $scope.polylayer.toGeoJSON());
                        CEGPTask.setOutputParam("Output_Report");
                        TIGPTask.setParam("Report_Boundary", $scope.polylayer.toGeoJSON());
                        TIGPTask.setOutputParam("Output_Report");
                        NRCGPTask.setParam("Report_Boundary", $scope.polylayer.toGeoJSON());
                        NRCGPTask.setOutputParam("Output_Report");
                        ECGPTask.setParam("Report_Boundary", $scope.polylayer.toGeoJSON());
                        ECGPTask.setOutputParam("Output_Report");

                        $scope.startSpin();


                        EMGPTask.run(function (error, EMgeojson, EMresponse) {

                            //console.log("EM jobId is " + EMgeojson.jobId);
                            if (error) {
                                $scope.drawOrSubmitCommand = "Error " + error;
                                console.error("EM " + error);

                                $scope.$apply();
                                EMGPdeferred.resolve();
                            }
                            else if (EMgeojson) {
                                                                EMGPdeferred.resolve(EMgeojson.Output_Report);
                                console.log("EM Complete");
                                AOI.drawAreaJobId['EM'] = EMgeojson.jobId;
                            }
                        });

                        CEGPTask.run(function (error, CEgeojson, CEresponse) {
                            // console.log("CE jobId is " + CEgeojson.jobId);
                            if (error) {
                                $scope.drawOrSubmitCommand = "Error " + error;
                                console.error("CE " + error);

                                $scope.$apply();
                                CEGPdeferred.resolve();
                            }
                            else if (CEgeojson) {
                                CEGPdeferred.resolve(CEgeojson.Output_Report);
                                console.log("CE Complete");
                                AOI.drawAreaJobId['CE'] = CEgeojson.jobId;

                            }

                        });
                        TIGPTask.run(function (error, TIgeojson, TIresponse) {
                            //console.log("TI jobId is " + TIgeojson.jobId);
                            if (error) {
                                $scope.drawOrSubmitCommand = "Error " + error;
                                console.error("TI " + error);
                                TIGPdeferred.resolve();
                                $scope.$apply();
                            }
                            else if (TIgeojson) {
                                TIGPdeferred.resolve(TIgeojson.Output_Report);
                                console.log("TI Complete");
                                AOI.drawAreaJobId['TI'] = TIgeojson.jobId;
                            }

                        });
                        NRCGPTask.run(function (error, NRCgeojson, NRCresponse) {
                            // console.log("NRC jobId is " + NRCgeojson.jobId);
                            if (error) {
                                $scope.drawOrSubmitCommand = "Error " + error;
                                console.error("NRC " + error);
                                NRCGPdeferred.resolve();
                                $scope.$apply();
                            }
                            else if (NRCgeojson) {
                                NRCGPdeferred.resolve(NRCgeojson.Output_Report);
                                console.log("NRC Complete");
                                AOI.drawAreaJobId['NRC'] = NRCgeojson.jobId;
                            }

                        });
                        ECGPTask.run(function (error, ECgeojson, ECresponse) {
                            // console.log("EC jobId is " + ECgeojson.jobId);
                            if (error) {
                                $scope.drawOrSubmitCommand = "Error " + error;
                                console.error("EC " + error);
                                ECGPdeferred.resolve();

                                $scope.$apply();
                            }
                            else if (ECgeojson) {
                                ECGPdeferred.resolve(ECgeojson.Output_Report);
                                console.log("EC Complete");
                                AOI.drawAreaJobId['EC'] = ECgeojson.jobId;

                            }

                        });
                        allPromises = $q.all(drawPromises);
                        console.log("you made me");
                        allPromises.then(function (results) {
                            AOI.featureCollection = {
                                fields: null,
                                features: null
                            };
                            console.log(results);
                            if (results[0] || results[1] || results[2] || results[3] || results[4]) {
                                console.log("promises promises");
                                if (results[0]) AOI.featureCollection = {
                                    fields: results[0].fields,
                                    features: results[0].features
                                };
                                if (results[1]) AOI.featureCollection.features.push.apply(AOI.featureCollection.features, results[1].features);
                                if (results[2])  AOI.featureCollection.features.push.apply(AOI.featureCollection.features, results[2].features);
                                if (results[3]) AOI.featureCollection.features.push.apply(AOI.featureCollection.features, results[3].features);
                                if (results[4])  AOI.featureCollection.features.push.apply(AOI.featureCollection.features, results[4].features);

                                $scope.stopSpin();
                                $scope.completeDraw();


                            }
                            console.log("Why don't I believe?");
                        }).catch(function (result) {
                            console.log(result);
                            $scope.stopSpin();
                        }).finally(function () {
                            console.log('finally');

                        });

                        break;
                    case "Work":
                        $scope.showSubmitModal();
                        break;
                    case "Erro":
                        $scope.drawOrSubmitCommand = "Submit";
                        break;
                    case "Comp":
                        $scope.completeDraw();
                        break;
                }
            };

            $scope.cancelEVERYTHING = function () {
                if (EMGPdeferred) {
                    EMGPdeferred.reject("canceled");
                    console.log("dump");
                    allPromises = null;
                }
                if (CEGPdeferred)CEGPdeferred.reject("canceled");
                if (TIGPdeferred)TIGPdeferred.reject("canceled");
                if (NRCGPdeferred) NRCGPdeferred.reject("canceled");
                if (ECGPdeferred) ECGPdeferred.reject("canceled");


            };

            $scope.completeDraw = function () {
                $scope.drawOff();
                map.removeLayer($scope.polylayer);
                map.removeControl(searchControl);
                $scope.drawtoolOn = false;
                $scope.drawOrSubmitCommand = "DRAW";
                if ($scope.baseMapControlOn) {
                    map.removeControl(baseMapControl);
                    $scope.baseMapControlOn = false;
                }
                $state.go('CEview');
                $scope.paneon();
                document.getElementById("bigmap").style.width = '50%';
                map.invalidateSize();
                AOI.unloadData();
                AOI.loadData(AOI.featureCollection.features[0].attributes.AOI_ID, "My Report");
                AOI.name = (AOI.CEPlaces[0].Name ? ("Near " + AOI.CEPlaces[0].Name) : "My Report");
            };

            map.on('pm:create', function (e) {
                $scope.polylayer = e.layer;
                $scope.drawOrSubmitCommand = "Submit";
                $scope.$apply();
            });

            $scope.toggle = function () { //toggles slider pane but does nothing about the AOI
                $scope.checked = !$scope.checked;
            };

            $scope.t_menu_box = function (id, levl) {
                $scope.box[id].level = levl;

                $scope.box[id].isActive = !$scope.box[id].isActive;
                for (i = 0; i < len; i++) {
                    if ((i != id) && (levl <= $scope.box[i].level)) {
                        $scope.box[i].isActive = false;
                    }
                }

            };

            $scope.startOver = function () {


                AOI.reloadAbort();
                console.log("byebye");
                $scope.cancelEVERYTHING();
                $scope.drawOrSubmitCommand = "DRAW";
                $scope.reset();
            };
            $scope.startMenu = function () {

                $scope.reset();
            };
            $scope.reset = function () { //unloads AOI but leaves slider pane on


                $scope.AOIoff();
                $scope.paneon();
                AOI.unloadData();
                $scope.stopSpin();
                if ($scope.baseMapControlOn) {
                    map.removeControl(baseMapControl);
                    $scope.baseMapControlOn = false;
                }

                for (i = 0; i < len; i++) {
                    $scope.box[i].isActive = false;
                }
                if ($scope.polylayer)  map.removeLayer($scope.polylayer);

                if ($scope.drawtoolOn) {
                    $scope.drawOff();
                    document.getElementById("bigmap").style.width = '50%';
                    map.removeControl(searchControl);
                    $scope.drawtoolOn = false;


                    map.invalidateSize();
                }
                map.setView([33.51, -78.3], 6);
            };

            $scope.off = function () { //unloads AOI and turns off slider pane
                $scope.AOIoff();
                $scope.paneoff();
                AOI.unloadData();


                $scope.drawenabled = $scope.zoomLevelGood();

                $scope.drawtoolOn = true;

            };

            $scope.on = function (AOI, AOI_id) {//turns on AOI and slider pane
                $scope.AOIon();
                $scope.paneon();
            };

            $scope.mover = function (AOI_id) {//turns on poly on mouse over in menu

                if (!mouseLayer) {
                    mouseLayer = L.esri.featureLayer({
                        url: AOI.config.ortMapServer + AOI.config.ortLayerAOI,
                        where: "AOI_ID =" + AOI_id + "",
                        color: '#EB660C', weight: 1.5, fillOpacity: .3,
                        simplifyFactor: 2.0,
                    }).addTo(map);

                }


            };
            $scope.mout = function (AOI_id) {//turns on poly on mouse over in menu

                if (mouseLayer) {
                    map.removeLayer(mouseLayer);
                    mouseLayer = null;

                }
            };

            $scope.AOIoff = function () {

                toggle = false;
            };

            $scope.AOIon = function () {
                $scope.checkifAOI = true;
            };

            $scope.paneoff = function () {
                $scope.checked = false;
                AOI.toggleFull = false;
            };

            $scope.paneon = function () {
                $scope.checked = true;
                document.getElementById("slide1").style.width = '50%';
                AOI.toggleFull = false;
            };

            $scope.aoismenu = [];
            $scope.aoistates = [];


            var query = L.esri.query({
                url: AOI.config.ortMapServer + AOI.config.ortLayerAOI

            });

            query.returnGeometry(false).where("KNOWN_AREA='Special Interest Areas'").run(function (error, featureCollection, response) {

                var ba = 0;

                for (var i = 0, j = featureCollection.features.length; i < j; i++) {

                    $scope.aoismenu[ba] = {
                        AOI_NAME: featureCollection.features[i].properties.AOI_NAME,
                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                        REPORT_TYPE: featureCollection.features[i].properties.REPORT_TYPE,
                        AOI_ID: featureCollection.features[i].properties.AOI_ID,
                        DATASET_NM: featureCollection.features[i].properties.DATASET_NM,
                        DESC_: featureCollection.features[i].properties.DESC_
                    };
                    ba++;

                }

                $scope.aoismenu.sort(function (a, b) {

                    return a.AOI_NAME.localeCompare(b.AOI_NAME);
                });
            });


            query.returnGeometry(false).where("KNOWN_AREA='Other Areas by State'").run(function (error, featureCollection, response) {
                    var ba = 0;
                    for (var i = 0, j = featureCollection.features.length; i < j; i++) {
                        $scope.aoistates[ba] = {
                            AOI_NAME: featureCollection.features[i].properties.AOI_NAME,
                            COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                            REPORT_TYPE: featureCollection.features[i].properties.COMMON_NM,
                            AOI_ID: featureCollection.features[i].properties.AOI_ID,
                            DATASET_NM: featureCollection.features[i].properties.DATASET_NM,
                            DESC_: featureCollection.features[i].properties.DESC_
                        };
                        ba++;
                    }

                    $scope.aoistates.sort(function (a, b) {
                        return a.AOI_NAME.localeCompare(b.AOI_NAME);
                    });

                }
            );


            if ($location.search().AOI) {
                AOI.Shared = true;
                if ($location.search().AOI !== '-9999') {
                    query.returnGeometry(false).where("AOI_ID=" + $location.search().AOI).run(function (error, featureCollection, response) {
                            AOI.name = featureCollection.features[0].properties.AOI_NAME;
                        }
                    );
                    AOI.loadData($location.search().AOI, AOI.name);


                } else {
                    AOI.drawAreaJobId['CE'] = $location.search().CE;
                    AOI.drawAreaJobId['EM'] = $location.search().EM;
                    AOI.drawAreaJobId['EC'] = $location.search().EC;
                    AOI.drawAreaJobId['NRC'] = $location.search().NRC;
                    AOI.drawAreaJobId['TI'] = $location.search().TI;
                    AOI.name = "My Report";
                    AOI.ID = -9999;

                    var promise1 = $q.defer(), promise2 = $q.defer(), promise3 = $q.defer(), promise4 = $q.defer(), promise5 = $q.defer(), promise6 = $q.defer();
                    var promises = [promise1.promise, promise2.promise, promise3.promise, promise4.promise, promise5.promise, promise6.promise];

                    L.esri.get(AOI.config.ortCommonGPService + '/jobs/' + AOI.drawAreaJobId['CE'] + '/inputs/Report_Boundary', {}, function (error, response) {
                        if (error) {
                            console.error(error);
                        } else {

                            AOI.drawLayerShape = {
                                type: "Feature",
                                geometry: {
                                    type: "Polygon",
                                    coordinates: response.value.features[0].geometry.rings,

                                }

                            };

                            promise1.resolve();
                        }
                    });

                    L.esri.get(AOI.config.ortCommonGPService + '/jobs/' + AOI.drawAreaJobId['CE'] + '/results/Output_Report', {}, function (error, response) {
                        if (error) {
                            console.error(error);
                        } else {
                            AOI.featureCollection = {fields: response.value.fields, features: response.value.features};
                            promise2.resolve();
                        }
                        L.esri.get(AOI.config.ortEnergyGPService + '/jobs/' + AOI.drawAreaJobId['EM'] + '/results/Output_Report', {}, function (error, response) {
                            if (error) {
                                console.error(error);
                            } else {
                                AOI.featureCollection.features.push.apply(AOI.featureCollection.features, response.value.features);
                                promise3.resolve();
                            }
                        });
                        L.esri.get(AOI.config.ortNaturalGPService + '/jobs/' + AOI.drawAreaJobId['NRC'] + '/results/Output_Report', {}, function (error, response) {
                            if (error) {
                                console.error(error);
                            } else {
                                AOI.featureCollection.features.push.apply(AOI.featureCollection.features, response.value.features);
                                promise4.resolve();
                            }
                        });
                        L.esri.get(AOI.config.ortTranspoGPService + '/jobs/' + AOI.drawAreaJobId['TI'] + '/results/Output_Report', {}, function (error, response) {
                            if (error) {
                                console.error(error);
                            } else {
                                AOI.featureCollection.features.push.apply(AOI.featureCollection.features, response.value.features);
                                promise5.resolve();
                            }
                        });
                        L.esri.get(AOI.config.ortEconGPService + '/jobs/' + AOI.drawAreaJobId['EC'] + '/results/Output_Report', {}, function (error, response) {
                            if (error) {
                                console.error(error);
                            } else {
                                AOI.featureCollection.features.push.apply(AOI.featureCollection.features, response.value.features);
                                promise6.resolve();
                            }
                        });

                    });
                    $q.all(promises).then(function () {
                        AOI.loadData(AOI.ID, AOI.name);
                        AOI.name = (AOI.CEPlaces[0].Name ? ("Near " + AOI.CEPlaces[0].Name) : "My Report");
                    });


                }
            }
        }
    ])
;


angular.element(document).ready(function () {

    c = angular.element(document.querySelector('#controller-demo')).scope();
});


angular.element(document).ready(function () {
    // if (console.assert)
    //     console.assert(document.querySelectorAll('body > .ng-pageslide').length == 12, 'Made all of them')
});
