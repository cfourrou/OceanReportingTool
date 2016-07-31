'use strict';


angular.module('myApp.controllers', ["pageslide-directive"])


    .controller('ModalController', function ($scope, metaurl, close) {

        $scope.metadataurl = metaurl;
        $scope.close = function (result) {
            close(result, 500); // close, but give 500ms for to animate
        };

    })
    .controller('submitModalController', function ($scope, close) {

        $scope.close = function (result) {
            close(result, 500); // close, but give 500ms for to animate
        };

    })

    .controller('printCtrl', ['AOI', '$scope', '$http', '$timeout', '$document', function (AOI, $scope, $http, $timeout, $document) {
        $scope.AOI = AOI;
        AOI.inPrintWindow = true;
        $scope.congressIsActive = true;
        $scope.senateIsActive = true;
        $scope.houseIsActive = true;
        $scope.congressMenu = "-";
        $scope.senateMenu = "-";
        $scope.houseMenu = "-";
        $http.get('CE_config.json')
            .then(function (res) {
                $scope.CEConfig = res.data;
            });
        $http.get('EM_config.json')
            .then(function (res) {
                $scope.emconfig = res.data;
            });
        $http.get('TI_config.json')
            .then(function (res) {
                $scope.TIConfig = res.data;
            });
        $http.get('NRC_config.json')
            .then(function (res) {
                $scope.NRCConfig = res.data;
            });
        $http.get('EC_config.json')
            .then(function (res) {
                $scope.ECConfig = res.data;
            });

        $scope.$on('$viewContentLoaded', function () {
            // document is ready, place  code here
            $timeout(function () {

                AOI.loadSmallMap(false);


                $scope.saveAsBinary();


            }, 1500);
        });
        AOI.loadWindChart();

        $scope.saveAsBinary = function () {

            var svg = document.getElementById('container')
                .children[0].innerHTML;
            var canvas = document.createElement("canvas");
            canvg(canvas, svg, {});

            var img = canvas.toDataURL("image/png"); //img is data:image/png;base64


            $('#binaryImage').attr('src', img);


        }

    }])

    .controller('AOICtrl', ['AOI', '$scope', '$http', 'webService', function (AOI, $scope, $http, webService) {


        $scope.AOI = AOI;
        AOI.inPrintWindow = false;
        $scope.congressIsActive = true;
        $scope.senateIsActive = false;
        $scope.houseIsActive = false;
        $scope.congressMenu = "-";
        $scope.senateMenu = "+";
        $scope.houseMenu = "+";

        var myDataPromise = webService.getData();
        myDataPromise.then(function (result) {

            // this is only run after getData() resolves
            $scope.ddata = result;
            // console.log("data.name" + $scope.ddata);
            //move the http gets in here
        });

        $http.get('CE_config.json')
            .then(function (res) {
                $scope.CEConfig = res.data;
            });

        $http.get('narratives.json')
            .then(function (res) {
                AOI.narratives = res.data;
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
        //$scope.AOI = AOI;
        document.getElementById("bigmap").style.width = '100%';
        $scope.off();
        map.invalidateSize();
        AOI.inPrintWindow = false;


        var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

        searchControl = L.esri.Geocoding.geosearch({
            expanded: true,
            collapseAfterResult: false,
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
                console.log(response.results[0])
            }
        });


    }])


    .controller('EnergyAndMineralsCtrl', ['$scope', 'AOI', '$http', function ($scope, AOI, $http) {
        $scope.AOI = AOI;
        AOI.inPrintWindow = false;
        $scope.name = "EnergyAndMineralsCtrl";
        $http.get('EM_config.json')
            .then(function (res) {
                $scope.emconfig = res.data;
            });


        AOI.loadWindChart();

        $scope.paneon();
    }])

    .controller('TransportationAndInfrastructureCtrl', ['$scope', 'AOI', '$http', function ($scope, AOI, $http) {
        $scope.AOI = AOI;
        AOI.inPrintWindow = false;
        $scope.name = "TransportationAndInfrastructureCtrl";
        $http.get('TI_config.json')
            .then(function (res) {
                $scope.TIConfig = res.data;
            });

        $scope.paneon();

    }])
    .controller('NaturalResourcesCtrl', ['$scope', 'AOI', '$http', function ($scope, AOI, $http) {
        $scope.AOI = AOI;
        AOI.inPrintWindow = false;
        $scope.name = "NaturalResourcesCtrl";
        $http.get('NRC_config.json')
            .then(function (res) {
                $scope.NRCConfig = res.data;
            });


        //AOI.loadWindChart();

        //AOI.doFullSlider('ERC');
        $scope.paneon();
    }])

    .controller('EconCtrl', ['$scope', 'AOI', '$http', function ($scope, AOI, $http) {
        $scope.AOI = AOI;
        AOI.inPrintWindow = false;
        $scope.name = "EconCtrl";
        $http.get('EC_config.json')
            .then(function (res) {
                $scope.ECConfig = res.data;
            });


        //AOI.loadWindChart();

        //AOI.doFullSlider('ERC');
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
                $scope.drawOrSubmitCommand = "DRAW";
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


            $scope.drawIt = function () {

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
                        var EMReport, CEReport, TIReport, NRCReport, ECReport;

                        var stopSpinnerRequest = _.after(5, function () {
                            //AOI.featureCollection = _.extend({}, EMReport,CEReport);
                            //AOI.featureCollection =angular.merge([],EMReport, CEReport);
                            if (EMReport) AOI.featureCollection = {
                                fields: EMReport.fields,
                                features: EMReport.features
                            };
                            if (CEReport) AOI.featureCollection.features.push.apply(AOI.featureCollection.features, CEReport.features);
                            if (TIReport)  AOI.featureCollection.features.push.apply(AOI.featureCollection.features, TIReport.features);
                            if (NRCReport) AOI.featureCollection.features.push.apply(AOI.featureCollection.features, NRCReport.features);
                            if (ECReport)  AOI.featureCollection.features.push.apply(AOI.featureCollection.features, ECReport.features);

                            $scope.stopSpin();
                            $scope.$apply();

                        });
                        EMGPTask.run(function (error, EMgeojson, EMresponse) {

                            if (error) {
                                $scope.drawOrSubmitCommand = "Error " + error;
                                console.log("EM " + error);
                                $scope.$apply();
                            }
                            else if (EMgeojson) {
                                $scope.drawOrSubmitCommand = "Complete";
                                EMReport = EMgeojson.Output_Report;
                                AOI.drawAreaJobId['EM'] = EMgeojson.jobId;
                            }
                            stopSpinnerRequest();
                        });
                        CEGPTask.run(function (error, CEgeojson, CEresponse) {
                            if (error) {
                                $scope.drawOrSubmitCommand = "Error " + error;
                                console.log("CE " + error);
                                $scope.$apply();
                            }
                            else if (CEgeojson) {
                                $scope.drawOrSubmitCommand = "Complete";
                                CEReport = CEgeojson.Output_Report;
                                AOI.drawAreaJobId['CE'] = CEgeojson.jobId;
                            }
                            stopSpinnerRequest();

                        });
                        TIGPTask.run(function (error, TIgeojson, TIresponse) {
                            if (error) {
                                $scope.drawOrSubmitCommand = "Error " + error;
                                console.log("TI " + error);
                                $scope.$apply();
                            }
                            else if (TIgeojson) {
                                $scope.drawOrSubmitCommand = "Complete";
                                TIReport = TIgeojson.Output_Report;
                                AOI.drawAreaJobId['TI'] = TIgeojson.jobId;
                            }
                            stopSpinnerRequest();
                        });
                        NRCGPTask.run(function (error, NRCgeojson, NRCresponse) {

                            if (error) {
                                $scope.drawOrSubmitCommand = "Error " + error;
                                console.log("NRC " + error);
                                $scope.$apply();
                            }
                            else if (NRCgeojson) {
                                $scope.drawOrSubmitCommand = "Complete";
                                NRCReport = NRCgeojson.Output_Report;
                                AOI.drawAreaJobId['NRC'] = NRCgeojson.jobId;
                            }
                            stopSpinnerRequest();
                        });
                        ECGPTask.run(function (error, ECgeojson, ECresponse) {
                            if (error) {
                                $scope.drawOrSubmitCommand = "Error " + error;
                                console.log("EC " + error);
                                $scope.$apply();
                            }
                            else if (ECgeojson) {
                                $scope.drawOrSubmitCommand = "Complete";
                                ECReport = ECgeojson.Output_Report;
                                AOI.drawAreaJobId['EC'] = ECgeojson.jobId;
                            }
                            stopSpinnerRequest();
                        });
                        break;
                    case "Work":
                        $scope.showSubmitModal();
                        break;
                    case "Erro":
                        $scope.drawOrSubmitCommand = "Submit";
                        break;
                    case "Comp":
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
                        AOI.loadData(AOI.featureCollection.features[0].attributes.AOI_ID, AOI.featureCollection.features[0].attributes.AOI_NAME);
                        break;
                }
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
                    $scope.drawOrSubmitCommand = "DRAW";

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
                    mouseLayer = L.esri.featureLayer({ //AOI poly (7)
                        url: AOI.config.ortMapServer + AOI.config.ortLayerAOI,
                        where: "AOI_ID =" + AOI_id + "",
                        color: '#EB660C', weight: 3, fillOpacity: .3,
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
                // there is probably a better place for this
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
                    AOI.name = "Shared Draw Area";
                    AOI.ID = -9999;

                    var promise1 = $q.defer(), promise2 = $q.defer(), promise3 = $q.defer(), promise4 = $q.defer(), promise5 = $q.defer(), promise6 = $q.defer();
                    var promises = [promise1.promise, promise2.promise, promise3.promise, promise4.promise, promise5.promise, promise6.promise];

                    L.esri.get(AOI.config.ortCommonGPService + '/jobs/' + AOI.drawAreaJobId['CE'] + '/inputs/Report_Boundary', {}, function (error, response) {
                        if (error) {
                            console.log(error);
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
                            console.log(error);
                        } else {
                            //get teh first report
                            AOI.featureCollection = {fields: response.value.fields, features: response.value.features};
                            promise2.resolve();
                        }
                        //get teh rest of the reports
                        L.esri.get(AOI.config.ortEnergyGPService + '/jobs/' + AOI.drawAreaJobId['EM'] + '/results/Output_Report', {}, function (error, response) {
                            if (error) {
                                console.log(error);
                            } else {
                                AOI.featureCollection.features.push.apply(AOI.featureCollection.features, response.value.features);
                                promise3.resolve();
                            }
                        });
                        L.esri.get(AOI.config.ortNaturalGPService + '/jobs/' + AOI.drawAreaJobId['NRC'] + '/results/Output_Report', {}, function (error, response) {
                            if (error) {
                                console.log(error);
                            } else {
                                AOI.featureCollection.features.push.apply(AOI.featureCollection.features, response.value.features);
                                promise4.resolve();
                            }
                        });
                        L.esri.get(AOI.config.ortTranspoGPService + '/jobs/' + AOI.drawAreaJobId['TI'] + '/results/Output_Report', {}, function (error, response) {
                            if (error) {
                                console.log(error);
                            } else {
                                AOI.featureCollection.features.push.apply(AOI.featureCollection.features, response.value.features);
                                promise5.resolve();
                            }
                        });
                        L.esri.get(AOI.config.ortEconGPService + '/jobs/' + AOI.drawAreaJobId['EC'] + '/results/Output_Report', {}, function (error, response) {
                            if (error) {
                                console.log(error);
                            } else {
                                AOI.featureCollection.features.push.apply(AOI.featureCollection.features, response.value.features);
                                promise6.resolve();
                            }
                        });

                    });
                    $q.all(promises).then(function () {
                        AOI.loadData(AOI.ID, AOI.name);
                    });


                }
            }
        }
    ])
;


angular.element(document).ready(function () {

    c = angular.element(document.querySelector('#controller-demo')).scope();
});

// Test
angular.element(document).ready(function () {
    // if (console.assert)
    //     console.assert(document.querySelectorAll('body > .ng-pageslide').length == 12, 'Made all of them')
});
