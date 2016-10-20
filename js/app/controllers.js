'use strict';

function PageslideCtrl(AOI, $state, usSpinnerService, $location, myQueryService, AOIConfig, $scope, $rootScope, $anchorScroll) {
    //this one loads once on start up

    $rootScope.$on('$stateChangeStart',  function () {
        $anchorScroll();
    });

    var vm = this;
    vm.AOI = AOI;

    vm.baseMapControlOn = false;

    vm.AOI.inPrintWindow = false;

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



    vm.checked = true;

    $scope.currState = $state;

    vm.startSpin = function () {
        usSpinnerService.spin('spinner-1');
    };
    vm.stopSpin = function () {
        usSpinnerService.stop('spinner-1');
    };

    vm.drawIt = function () {

        switch (vm.drawOrSubmitCommand.substring(0, 4)) {

            case "DRAW":


                vm.startDrawing();

                //if (vm.drawtoolOn) {
                //    if (vm.drawLocked) {
                //        vm.drawOff();
                //
                //    } else {
                //        vm.startDrawing();
                //    }
                //}
                break;
            case "Subm":
                //allPromises = [];

                vm.drawOrSubmitCommand = "Working";


                //vm.drawOff();
                vm.paneOn();
                //map to 50%
                vm.mapHalfScreen();
                vm.startSpin();

                AOI.getReport().then(function () {
                    vm.stopSpin();
                    vm.searchControlEnabled = false;
                    vm.drawOrSubmitCommand = "DRAW";
                    vm.baseMapControlOn = false;
                    vm.drawOff();
                    $state.go('CEview');
                });

                break;
            case "Erro":
                vm.drawOrSubmitCommand = "Submit";
                break;
            case "Comp":
                vm.completeDraw();
                break;
        }
    };

    vm.toggle = function () { //toggles slider pane but does nothing about the AOI
        vm.checked = !vm.checked;
    };

    vm.menu = {};
    vm.toggleMenu = function (menuItem, menuIndentLevel) {
        if (vm.menu[menuItem] === undefined) {
            vm.menu[menuItem] = {}
        }
        vm.menu[menuItem].level = menuIndentLevel;
        vm.menu[menuItem].isActive = !vm.menu[menuItem].isActive;
        angular.forEach(vm.menu, function (value, key) {
            if ((key !== menuItem) && (menuIndentLevel <= value.level)) {
                vm.menu[key].isActive = false;
            }
        })
    };

    vm.startOver = function () {

        vm.drawOrSubmitCommand = "DRAW";
        vm.reset();
        $state.go('splash');

        AOI.reloadAbort();

    };
    vm.startMenu = function () {
        vm.reset();
    };

    vm.reset = function () { //unloads AOI but leaves slider pane on
        vm.paneOn();
        AOI.unloadData();
        vm.stopSpin();
        vm.resetMap();
    };

    vm.drawMenu = function () { //unloads AOI and turns off slider pane
        //if draw submitted but not returned yet, leave pane on
        if (vm.drawOrSubmitCommand !== "Working") {
            vm.paneOff();
            vm.drawOrSubmitCommand = "DRAW";
            vm.mapFullScreen();
        } else {
            vm.mapHalfScreen();
            vm.startSpin();
            vm.paneOn();
        }
        AOI.unloadData();
        vm.drawOn();
    };

    vm.paneOff = function () {
        vm.checked = false;
        AOI.toggleFull = false;
    };

    vm.paneOn = function () {
        vm.checked = true;
        AOI.toggleFull = false;
    };

    vm.specialInterestAreasMenu = [];
    vm.statesMenu = [];


    var queryService = new myQueryService(AOIConfig.ortMapServer + AOIConfig.ortLayerAOI);

    queryService.query("KNOWN_AREA='Special Interest Areas'").then(function (featureCollection) {
        vm.specialInterestAreasMenu = [];
        angular.forEach(featureCollection.features, function (feature) {
            vm.specialInterestAreasMenu.push({
                AOI_NAME: feature.properties.AOI_NAME,
                COMMON_NM: feature.properties.COMMON_NM,
                REPORT_TYPE: feature.properties.REPORT_TYPE,
                AOI_ID: feature.properties.AOI_ID,
                DATASET_NM: feature.properties.DATASET_NM,
                DESC_: feature.properties.DESC_
            });
        });

        vm.specialInterestAreasMenu.sort(function (a, b) {
            return a.AOI_NAME.localeCompare(b.AOI_NAME);
        });
    }).catch(function (error) {
        // todo: what to do on error?
        console.error(error);
    });

    queryService.query("KNOWN_AREA='Other Areas by State'").then(function (featureCollection) {
        angular.forEach(featureCollection.features, function (feature, i) {
            vm.statesMenu[i] = {
                AOI_NAME: featureCollection.features[i].properties.AOI_NAME,
                COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                REPORT_TYPE: featureCollection.features[i].properties.COMMON_NM,
                AOI_ID: featureCollection.features[i].properties.AOI_ID,
                DATASET_NM: featureCollection.features[i].properties.DATASET_NM,
                DESC_: featureCollection.features[i].properties.DESC_
            };
        });

        vm.statesMenu.sort(function (a, b) {
            return a.AOI_NAME.localeCompare(b.AOI_NAME);
        });
    }).catch(function (error) {
        // todo: what to do on error?
        console.error(error);
    });

    if ($location.search().AOI) {
        AOI.Shared = true;
        if ($location.search().AOI !== '-9999') {
            AOI.loadData($location.search().AOI, '');
        } else {
            AOI.drawAreaJobId.CE = $location.search().CE;
            AOI.drawAreaJobId.EM = $location.search().EM;
            AOI.drawAreaJobId.EC = $location.search().EC;
            AOI.drawAreaJobId.NRC = $location.search().NRC;
            AOI.drawAreaJobId.TI = $location.search().TI;
            AOI.ID = -9999;
            AOI.getSavedReport();
        }
    }

    var listener = $scope.$watch('currState.current.name', function (newValue, oldValue) {
        if (newValue !== oldValue && newValue === 'draw') {
            vm.drawMenu();
            listener();
        }
    });
}

// functions defined in directive but placed here so nested controllers could inherit.
PageslideCtrl.prototype.mout = function (id) {
};
PageslideCtrl.prototype.paneOn = function (id) {
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

}

function NaturalResourceCtrl(AOI, webService) {
    var vm = this;
    vm.AOI = AOI;
    vm.AOI.inPrintWindow = false;
    vm.name = "NaturalResourcesCtrl";
    webService.getData('NRC_config.json').then(function (result) {
        vm.NRCConfig = result;
    });

}

function TransportationAndInfrastructureCtrl(AOI, webService) {
    var vm = this;
    vm.AOI = AOI;
    vm.AOI.inPrintWindow = false;
    vm.name = "TransportationAndInfrastructureCtrl";
    webService.getData('TI_config.json').then(function (result) {
        vm.TIConfig = result;
    });
}

function EnergyAndMineralsCtrl(AOI, webService) {
    var vm = this;
    vm.AOI = AOI;
    vm.AOI.inPrintWindow = false;
    vm.name = "EnergyAndMineralsCtrl";
    webService.getData('EM_config.json').then(function (result) {
        vm.EMConfig = result;
    });
}


function EconCtrl(AOI, webService) {
    var vm = this;
    vm.AOI = AOI;
    vm.AOI.inPrintWindow = false;
    vm.name = "EconCtrl";
    webService.getData('EC_config.json').then(function (result) {
        vm.ECConfig = result;
    });

}

function PrintCtrl($rootScope, AOI, webService, $q) {

    var vm = this;
    vm.AOI = AOI;
    vm.AOI.inPrintWindow = true;

    vm.name = "PrintCtrl";
    vm.congressIsActive = true;
    vm.senateIsActive = true;
    vm.houseIsActive = true;
    vm.congressMenu = "-";
    vm.senateMenu = "-";
    vm.houseMenu = "-";
    var printDeferred = $q.defer();
    vm.readyToPrint = printDeferred.promise;
    var chartPromise = AOI.reloadAllCharts();
    var allPromises = [];

    allPromises.push(webService.getData('CE_config.json').then(function (result) {
        vm.CEConfig = result;
    }));
    allPromises.push(webService.getData('EM_config.json').then(function (result) {
        vm.EMConfig = result;
    }));
    allPromises.push(webService.getData('TI_config.json').then(function (result) {
        vm.TIConfig = result;
    }));
    allPromises.push(webService.getData('NRC_config.json').then(function (result) {
        vm.NRCConfig = result;
    }));
    allPromises.push(webService.getData('EC_config.json').then(function (result) {
        vm.ECConfig = result;
    }));

    $q.all(allPromises).then(function () {
        $q.all([chartPromise, vm.mapPromise]).then(function () {
            printDeferred.resolve();
        });
    });
}

function SearchCtrl(AOI) {
    var vm = this;
    //AOI.inPrintWindow = false;
    //AOI.toggleFull = true;
}


angular.module('myApp.controllers', ["pageslide-directive"])
    .controller('ModalController', function ($scope, metaurl, close) {
        $scope.metadataurl = metaurl;
        $scope.close = function (result) {
            close(result, 500); // close, but give 500ms for to animate
        };
    })

    .controller('PrintCtrl', ['$rootScope', 'AOI', 'webService', '$q', PrintCtrl])
    .controller('AOICtrl', ['AOI', 'webService', AOICtrl])
    .controller('SearchCtrl', ['AOI', SearchCtrl])
    .controller('EnergyAndMineralsCtrl', ['AOI', 'webService', EnergyAndMineralsCtrl])
    .controller('TransportationAndInfrastructureCtrl', ['AOI', 'webService', TransportationAndInfrastructureCtrl])
    .controller('NaturalResourcesCtrl', ['AOI', 'webService', NaturalResourceCtrl])
    .controller('EconCtrl', ['AOI', 'webService', EconCtrl])
    .controller('pageslideCtrl', ['AOI', '$state', 'usSpinnerService', '$location', 'myQueryService',
        'AOIConfig', '$scope', '$rootScope', '$anchorScroll', PageslideCtrl]);



