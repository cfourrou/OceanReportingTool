'use strict';

function PageslideCtrl(AOI, ModalService, $state, usSpinnerService, $location, $stateParams, $q, myGPService,
                       myQueryService, AOIConfig) {
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
    var EMGPService = new myGPService(AOIConfig.ortEnergyGPService);
    var CEGPService = new myGPService(AOIConfig.ortCommonGPService);
    var TIGPService = new myGPService(AOIConfig.ortTranspoGPService);
    var NRCGPService = new myGPService(AOIConfig.ortNaturalGPService);
    var ECGPService = new myGPService(AOIConfig.ortEconGPService);

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
        //document.getElementById("slide1").style.width = '50%';
        AOI.toggleFull = false;
    };

    vm.aoismenu = [];
    vm.aoistates = [];


    var queryService = new myQueryService(AOIConfig.ortMapServer + AOIConfig.ortLayerAOI);

    queryService.query("KNOWN_AREA='Special Interest Areas'").then(function (featureCollection) {
        vm.aoismenu = [];
        angular.forEach(featureCollection.features, function (feature, i) {
            vm.aoismenu.push({
                AOI_NAME: feature.properties.AOI_NAME,
                COMMON_NM: feature.properties.COMMON_NM,
                REPORT_TYPE: feature.properties.REPORT_TYPE,
                AOI_ID: feature.properties.AOI_ID,
                DATASET_NM: feature.properties.DATASET_NM,
                DESC_: feature.properties.DESC_
            });
        });

        vm.aoismenu.sort(function (a, b) {
            return a.AOI_NAME.localeCompare(b.AOI_NAME);
        });
    }).catch(function (error) {
        // todo: what to do on error?
        console.log(error);
    });

    queryService.query("KNOWN_AREA='Other Areas by State'").then(function (featureCollection) {
        angular.forEach(featureCollection.features, function (feature, i) {
            vm.aoistates[i] = {
                AOI_NAME: featureCollection.features[i].properties.AOI_NAME,
                COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                REPORT_TYPE: featureCollection.features[i].properties.COMMON_NM,
                AOI_ID: featureCollection.features[i].properties.AOI_ID,
                DATASET_NM: featureCollection.features[i].properties.DATASET_NM,
                DESC_: featureCollection.features[i].properties.DESC_
            };
        });

        vm.aoistates.sort(function (a, b) {
            return a.AOI_NAME.localeCompare(b.AOI_NAME);
        });
    }).catch(function (error) {
        // todo: what to do on error?
        console.log(error);
    });

    if ($location.search().AOI) {
        AOI.Shared = true;
        if ($location.search().AOI !== '-9999') {
            AOI.loadData($location.search().AOI, '');
        } else {
            AOI.drawAreaJobId['CE'] = $location.search().CE;
            AOI.drawAreaJobId['EM'] = $location.search().EM;
            AOI.drawAreaJobId['EC'] = $location.search().EC;
            AOI.drawAreaJobId['NRC'] = $location.search().NRC;
            AOI.drawAreaJobId['TI'] = $location.search().TI;
            //AOI.name = "My Report";
            AOI.ID = -9999;

            AOI.loadData(AOI, "My Report");
        }
    }
}

// functions defined in directive but placed here so nested controllers could inherit.
PageslideCtrl.prototype.mout = function (id) {
};
PageslideCtrl.prototype.paneon = function (id) {
};

function AOICtrl(AOI, webService) {
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
AOICtrl.prototype.childPaneOn = function () {
    this.paneon();
};

function NaturalResourceCtrl(AOI, webService) {
    var vm = this;
    vm.AOI = AOI;
    vm.AOI.inPrintWindow = false;
    vm.name = "NaturalResourcesCtrl";
    webService.getData('NRC_config.json').then(function (result) {
        vm.NRCConfig = result;
    });

    vm.childPaneOn();
}

NaturalResourceCtrl.prototype = Object.create(PageslideCtrl.prototype);
NaturalResourceCtrl.prototype.childPaneOn = function () {
    this.paneon();
};

function TransportationAndInfrastructureCtrl(AOI, webService) {
    var vm = this;
    vm.AOI = AOI;
    vm.AOI.inPrintWindow = false;
    vm.name = "TransportationAndInfrastructureCtrl";
    webService.getData('TI_config.json').then(function (result) {
        vm.TIConfig = result;
    });


    vm.childPaneOn();

}
TransportationAndInfrastructureCtrl.prototype = Object.create(PageslideCtrl.prototype);
TransportationAndInfrastructureCtrl.prototype.childPaneOn = function () {
    this.paneon();
};

function EnergyAndMineralsCtrl(AOI, webService) {
    var vm = this;
    vm.AOI = AOI;
    vm.AOI.inPrintWindow = false;
    vm.name = "EnergyAndMineralsCtrl";
    webService.getData('EM_config.json').then(function (result) {
        vm.EMConfig = result;
    });


    vm.childPaneOn();
}

EnergyAndMineralsCtrl.prototype = Object.create(PageslideCtrl.prototype);
EnergyAndMineralsCtrl.prototype.childPaneOn = function () {
    this.paneon();
};

function EconCtrl(AOI, webService) {
    var vm = this;
    vm.AOI = AOI;
    vm.AOI.inPrintWindow = false;
    vm.name = "EconCtrl";
    webService.getData('EC_config.json').then(function (result) {
        vm.ECConfig = result;
    });


    vm.childPaneOn();

}

EconCtrl.prototype = Object.create(PageslideCtrl.prototype);
EconCtrl.prototype.childPaneOn = function () {
    this.paneon();
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


    .controller('EnergyAndMineralsCtrl', ['AOI', 'webService', EnergyAndMineralsCtrl])


    .controller('TransportationAndInfrastructureCtrl', ['AOI', 'webService', TransportationAndInfrastructureCtrl])

    .controller('NaturalResourcesCtrl', ['AOI', 'webService', NaturalResourceCtrl])

    .controller('EconCtrl', ['AOI', 'webService', EconCtrl])


    .controller('pageslideCtrl', ['AOI', 'ModalService', '$state', 'usSpinnerService', '$location',
        '$stateParams', '$q', 'myGPService', 'myQueryService', 'AOIConfig', PageslideCtrl]);


angular.element(document).ready(function () {

    c = angular.element(document.querySelector('#controller-demo')).scope();
});


angular.element(document).ready(function () {
    // if (console.assert)
    //     console.assert(document.querySelectorAll('body > .ng-pageslide').length == 12, 'Made all of them')
});
