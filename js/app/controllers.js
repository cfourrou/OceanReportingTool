'use strict';

function PageslideCtrl (AOI, ModalService, $state, usSpinnerService, $location, $stateParams, $q, myGPService) {
    //this one loads once on start up
    var vm = this;

    vm.AOI = AOI;

    vm.baseMapControlOn = false;

    vm.AOI.inPrintWindow = false;

    vm.box = [];
    var len = 2000;
    for (var i = 0; i < len; i++) {
        vm.box.push({
            myid: i,
            isActive: false,
            level: 0,
            future: true
        });
    }
    vm.drawOrSubmitCommand = "DRAW";

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

    vm.checked = true; // This will be binded using the ps-open attribute


    vm.showSubmitModal = function () {
        ModalService.showModal({
            templateUrl: "modalDraw.html",
            controller: "submitModalController"
        }).then(function (modal) {
            modal.close.then(function (result) {
                vm.customResult = "All good!";
            });
        });
    };

    vm.startSpin = function () {
        usSpinnerService.spin('spinner-1');
    };
    vm.stopSpin = function () {
        usSpinnerService.stop('spinner-1');
    };
    var EMGPService = new myGPService(AOI.config.ortEnergyGPService);
    var CEGPService = new myGPService(AOI.config.ortCommonGPService);
    var TIGPService = new myGPService(AOI.config.ortTranspoGPService);
    var NRCGPService = new myGPService(AOI.config.ortNaturalGPService);
    var ECGPService = new myGPService(AOI.config.ortEconGPService);

    var allPromises = [];

    vm.drawIt = function () {

        switch (vm.drawOrSubmitCommand.substring(0, 4)) {

            case "DRAW":

                if (vm.drawtoolOn) {
                    if (vm.drawlocked) {
                        vm.drawOff();
                    } else {
                        vm.drawOn();
                    }
                }
                break;
            case "Subm":
                allPromises = [];

                vm.showSubmitModal();

                vm.drawOrSubmitCommand = "Working";

                vm.startSpin();

                allPromises.push(EMGPService.run());
                allPromises.push(CEGPService.run());
                allPromises.push(TIGPService.run());
                allPromises.push(NRCGPService.run());
                allPromises.push(ECGPService.run());

                $q.all(allPromises).then(function (results) {
                    delete AOI.featureCollection;

                    if (!results[0].error || !results[1].error || !results[2].error || !results[3].error || !results[4].error) {

                        if (results[0]) AOI.featureCollection = {
                            fields: results[0].fields,
                            features: results[0].features
                        };
                        if (results[1]) AOI.featureCollection.features.push.apply(AOI.featureCollection.features, results[1].features);
                        if (results[2])  AOI.featureCollection.features.push.apply(AOI.featureCollection.features, results[2].features);
                        if (results[3]) AOI.featureCollection.features.push.apply(AOI.featureCollection.features, results[3].features);
                        if (results[4])  AOI.featureCollection.features.push.apply(AOI.featureCollection.features, results[4].features);
                    }

                    vm.stopSpin();
                    vm.completeDraw();

                }).catch(function (result) {
                    vm.stopSpin();
                }).finally(function () {


                });

                break;
            case "Work":
                vm.showSubmitModal();
                break;
            case "Erro":
                vm.drawOrSubmitCommand = "Submit";
                break;
            case "Comp":
                vm.completeDraw();
                break;
        }
    };

    vm.cancelEVERYTHING = function () {
        if (EMGPdeferred) {
            EMGPdeferred.reject("canceled");

            allPromises = null;
        }
        if (CEGPdeferred)CEGPdeferred.reject("canceled");
        if (TIGPdeferred)TIGPdeferred.reject("canceled");
        if (NRCGPdeferred) NRCGPdeferred.reject("canceled");
        if (ECGPdeferred) ECGPdeferred.reject("canceled");


    };

    vm.completeDraw = function () {
        vm.drawtoolOn = false;
        vm.searchControlEnabled = false;
        vm.drawOrSubmitCommand = "DRAW";
        vm.baseMapControlOn = false;

        $state.go('CEview');
        vm.paneon();
        AOI.unloadData();
        AOI.loadData(AOI.featureCollection.features[0].attributes.AOI_ID, "My Report");
        AOI.name = (AOI.CEPlaces[0].Name ? ("Near " + AOI.CEPlaces[0].Name) : "My Report");
    };

    vm.toggle = function () { //toggles slider pane but does nothing about the AOI
        vm.checked = !vm.checked;
    };

    vm.t_menu_box = function (id, levl) {
        vm.box[id].level = levl;

        vm.box[id].isActive = !vm.box[id].isActive;
        for (i = 0; i < len; i++) {
            if ((i != id) && (levl <= vm.box[i].level)) {
                vm.box[i].isActive = false;
            }
        }

    };

    vm.startOver = function () {


        AOI.reloadAbort();

        vm.cancelEVERYTHING();
        vm.drawOrSubmitCommand = "DRAW";
        vm.reset();
    };
    vm.startMenu = function () {
        vm.reset();
    };
    vm.reset = function () { //unloads AOI but leaves slider pane on


        vm.AOIoff();
        vm.paneon();
        AOI.unloadData();
        vm.stopSpin();

        vm.resetMap();

        for (i = 0; i < len; i++) {
            vm.box[i].isActive = false;
        }

    };

    vm.off = function () { //unloads AOI and turns off slider pane
        vm.AOIoff();
        vm.paneoff();
        AOI.unloadData();
        vm.drawtoolOn = true;
    };

    vm.on = function (AOI, AOI_id) {//turns on AOI and slider pane
        vm.AOIon();
        vm.paneon();
    };

    vm.AOIoff = function () {

        toggle = false;
    };

    vm.AOIon = function () {
        vm.checkifAOI = true;
    };

    vm.paneoff = function () {
        vm.checked = false;
        AOI.toggleFull = false;
    };

    vm.paneon = function () {
        vm.checked = true;
        document.getElementById("slide1").style.width = '50%';
        AOI.toggleFull = false;
    };

    vm.aoismenu = [];
    vm.aoistates = [];


    var query = L.esri.query({
        url: AOI.config.ortMapServer + AOI.config.ortLayerAOI

    });

    query.returnGeometry(false).where("KNOWN_AREA='Special Interest Areas'").run(function (error, featureCollection, response) {

        var ba = 0;

        for (var i = 0, j = featureCollection.features.length; i < j; i++) {

            vm.aoismenu[ba] = {
                AOI_NAME: featureCollection.features[i].properties.AOI_NAME,
                COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                REPORT_TYPE: featureCollection.features[i].properties.REPORT_TYPE,
                AOI_ID: featureCollection.features[i].properties.AOI_ID,
                DATASET_NM: featureCollection.features[i].properties.DATASET_NM,
                DESC_: featureCollection.features[i].properties.DESC_
            };
            ba++;

        }

        vm.aoismenu.sort(function (a, b) {

            return a.AOI_NAME.localeCompare(b.AOI_NAME);
        });
    });


    query.returnGeometry(false).where("KNOWN_AREA='Other Areas by State'").run(function (error, featureCollection, response) {
            var ba = 0;
            for (var i = 0, j = featureCollection.features.length; i < j; i++) {
                vm.aoistates[ba] = {
                    AOI_NAME: featureCollection.features[i].properties.AOI_NAME,
                    COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                    REPORT_TYPE: featureCollection.features[i].properties.COMMON_NM,
                    AOI_ID: featureCollection.features[i].properties.AOI_ID,
                    DATASET_NM: featureCollection.features[i].properties.DATASET_NM,
                    DESC_: featureCollection.features[i].properties.DESC_
                };
                ba++;
            }

            vm.aoistates.sort(function (a, b) {
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

// functions defined in directive but placed here so nested controllers could inherit.
PageslideCtrl.prototype.mout = function (id) {};
PageslideCtrl.prototype.paneon = function (id) {};

function AOICtrl (AOI, webService) {
    var vm = this;

    vm.AOI = AOI;
    vm.AOI.inPrintWindow = false;
    vm.congressIsActive = true;
    vm.senateIsActive = false;
    vm.houseIsActive = false;
    vm.congressMenu = "-";
    vm.senateMenu = "+";
    vm.houseMenu = "+";

    webService.getData('CE_config.json').then(function (result) {
        vm.CEConfig = result;
    });
    webService.getData('narratives.json').then(function (result) {
        AOI.narratives = result;
    });

    vm.congressActivate = function () {
        vm.congressIsActive = true;
        vm.senateIsActive = false;
        vm.houseIsActive = false;
        vm.congressMenu = "-";
        vm.senateMenu = "+";
        vm.houseMenu = "+";
    };
    vm.houseActivate = function () {
        vm.congressIsActive = false;
        vm.senateIsActive = false;
        vm.houseIsActive = true;
        vm.congressMenu = "+";
        vm.senateMenu = "+";
        vm.houseMenu = "-";
    };
    vm.senateActivate = function () {
        vm.congressIsActive = false;
        vm.senateIsActive = true;
        vm.houseIsActive = false;
        vm.congressMenu = "+";
        vm.senateMenu = "-";
        vm.houseMenu = "+";
    };

    vm.childMouseOut(vm.AOI.ID);

    vm.paneon();

}

AOICtrl.prototype = Object.create(PageslideCtrl.prototype);
AOICtrl.prototype.childMouseOut = function (id) {
    this.mout(id);
};
AOICtrl.prototype.childPaneOn = function (id) {
    this.paneon(id);
};

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

    .controller('AOICtrl', ['AOI', 'webService', AOICtrl])
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

    .controller('pageslideCtrl', ['AOI', 'ModalService', '$state', 'usSpinnerService', '$location',
        '$stateParams', '$q', 'myGPService', PageslideCtrl]);


angular.element(document).ready(function () {

    c = angular.element(document.querySelector('#controller-demo')).scope();
});


angular.element(document).ready(function () {
    // if (console.assert)
    //     console.assert(document.querySelectorAll('body > .ng-pageslide').length == 12, 'Made all of them')
});
