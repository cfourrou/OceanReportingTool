'use strict';


angular.module('myApp.controllers', ["pageslide-directive"])


    .controller('ModalController', function ($scope, metaurl, close) {

        $scope.metadataurl = metaurl;
        $scope.close = function (result) {
            close(result, 500); // close, but give 500ms for to animate
        };


    })
    .controller('submitModalController', function ($scope, close) {

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

        $scope.off();
        AOI.inPrintWindow = false;

        $scope.searchControlOn = true;

        if ($scope.drawOrSubmitCommand === "Working") $scope.startSpin();

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

    .controller('pageslideCtrl', ['$scope', 'AOI', 'ModalService', '$state', 'usSpinnerService', '$location',
        '$stateParams', '$q', 'myGPService',
        function ($scope, AOI, ModalService, $state, usSpinnerService, $location, $stateParams, $q, myGPService) {
            //this one loads once on start up

            $scope.AOI = AOI;

            $scope.baseMapControlOn = false;

            AOI.inPrintWindow = false;

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

            $scope.checked = true; // This will be binded using the ps-open attribute



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
            var EMGPService = new myGPService(AOI.config.ortEnergyGPService);
            var CEGPService = new myGPService(AOI.config.ortCommonGPService);
            var TIGPService = new myGPService(AOI.config.ortTranspoGPService);
            var NRCGPService = new myGPService(AOI.config.ortNaturalGPService);
            var ECGPService = new myGPService(AOI.config.ortEconGPService);


            var allPromises = [];
            $scope.drawIt = function () {

                switch ($scope.drawOrSubmitCommand.substring(0, 4)) {

                    case "DRAW":

                        if ($scope.drawtoolOn) {
                            if ($scope.drawlocked) {
                                $scope.drawOff();
                            } else {
                                $scope.drawOn();
                            }
                        }
                        break;
                    case "Subm":
                        $scope.showSubmitModal();

                        $scope.drawOrSubmitCommand = "Working";

                        $scope.startSpin();

                        allPromises.push(EMGPService.run());
                        allPromises.push(CEGPService.run());
                        allPromises.push(TIGPService.run());
                        allPromises.push(NRCGPService.run());
                        allPromises.push(ECGPService.run());

                        $q.all(allPromises).then(function (results) {
                            AOI.featureCollection = {
                                fields: null,
                                features: null
                            };

                            if (results[0].output || results[1].output || results[2].output || results[3].output || results[4].output) {

                                if (results[0].output) AOI.featureCollection = {
                                    fields: results[0].output.fields,
                                    features: results[0].output.features
                                };
                                if (results[1].output) AOI.featureCollection.features.push.apply(AOI.featureCollection.features, results[1].output.features);
                                if (results[2].output)  AOI.featureCollection.features.push.apply(AOI.featureCollection.features, results[2].output.features);
                                if (results[3].output) AOI.featureCollection.features.push.apply(AOI.featureCollection.features, results[3].output.features);
                                if (results[4].output)  AOI.featureCollection.features.push.apply(AOI.featureCollection.features, results[4].output.features);
                            }

                            $scope.stopSpin();
                            $scope.completeDraw();

                        }).catch(function (result) {
                            $scope.stopSpin();
                        }).finally(function () {


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

                    allPromises = null;
                }
                if (CEGPdeferred)CEGPdeferred.reject("canceled");
                if (TIGPdeferred)TIGPdeferred.reject("canceled");
                if (NRCGPdeferred) NRCGPdeferred.reject("canceled");
                if (ECGPdeferred) ECGPdeferred.reject("canceled");


            };

            $scope.completeDraw = function () {
                $scope.drawtoolOn = false;
                $scope.polyLayerOn = false;
                $scope.searchControlEnabled = false;
                $scope.drawOrSubmitCommand = "DRAW";
                $scope.baseMapControlOn = false;

                $state.go('CEview');
                $scope.paneon();
                AOI.unloadData();
                AOI.loadData(AOI.featureCollection.features[0].attributes.AOI_ID, "My Report");
                AOI.name = (AOI.CEPlaces[0].Name ? ("Near " + AOI.CEPlaces[0].Name) : "My Report");
            };

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

                $scope.resetMap();

                for (i = 0; i < len; i++) {
                    $scope.box[i].isActive = false;
                }

            };

            $scope.off = function () { //unloads AOI and turns off slider pane
                $scope.AOIoff();
                $scope.paneoff();
                AOI.unloadData();
                $scope.drawtoolOn = true;
            };

            $scope.on = function (AOI, AOI_id) {//turns on AOI and slider pane
                $scope.AOIon();
                $scope.paneon();
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

                        } else {
                            AOI.featureCollection = {fields: response.value.fields, features: response.value.features};
                            promise2.resolve();
                        }
                        L.esri.get(AOI.config.ortEnergyGPService + '/jobs/' + AOI.drawAreaJobId['EM'] + '/results/Output_Report', {}, function (error, response) {
                            if (error) {
                                ;
                            } else {
                                AOI.featureCollection.features.push.apply(AOI.featureCollection.features, response.value.features);
                                promise3.resolve();
                            }
                        });
                        L.esri.get(AOI.config.ortNaturalGPService + '/jobs/' + AOI.drawAreaJobId['NRC'] + '/results/Output_Report', {}, function (error, response) {
                            if (error) {

                            } else {
                                AOI.featureCollection.features.push.apply(AOI.featureCollection.features, response.value.features);
                                promise4.resolve();
                            }
                        });
                        L.esri.get(AOI.config.ortTranspoGPService + '/jobs/' + AOI.drawAreaJobId['TI'] + '/results/Output_Report', {}, function (error, response) {
                            if (error) {

                            } else {
                                AOI.featureCollection.features.push.apply(AOI.featureCollection.features, response.value.features);
                                promise5.resolve();
                            }
                        });
                        L.esri.get(AOI.config.ortEconGPService + '/jobs/' + AOI.drawAreaJobId['EC'] + '/results/Output_Report', {}, function (error, response) {
                            if (error) {

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
