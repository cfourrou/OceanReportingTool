'use strict';

function PageslideCtrl(AOI, ModalService, $state, usSpinnerService, $location, $stateParams, $q, myGPService,
                       myQueryService, AOIConfig, $rootScope) {
    //this one loads once on start up
    var vm = this;
    vm.AOI = AOI;

    vm.baseMapControlOn = false;

    vm.AOI.inPrintWindow = false;

    vm.box = [];
    //'box' is used by the known areas menu to construct a multilevel but unknown number of levels and items
    //different catagories of menu levels are given ranges of index numbers

    for (var i = 0; i < 2000; i++) {
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

    vm.checked = true;

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
                //allPromises = [];

                vm.showSubmitModal();

                vm.drawOrSubmitCommand = "Working";

                vm.startSpin();

                AOI.getReport().then(function () {
                    vm.stopSpin();
                    vm.drawtoolOn = false;
                    vm.searchControlEnabled = false;
                    vm.drawOrSubmitCommand = "DRAW";
                    vm.baseMapControlOn = false;

                    $state.go('CEview');
                    vm.paneOn();
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

    vm.toggle = function () { //toggles slider pane but does nothing about the AOI
        vm.checked = !vm.checked;
    };


    vm.tMenuBox = function (id, menuIndentLevel) {
        vm.box[id].level = menuIndentLevel;
        vm.box[id].isActive = !vm.box[id].isActive;
        angular.forEach(vm.box, function (myBox, index) {
            if ((index != id) && (menuIndentLevel <= myBox.level)) {
                myBox.isActive = false;
            }
        })
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
        vm.paneOn();
        AOI.unloadData();
        vm.stopSpin();

        vm.resetMap();

        angular.forEach(vm.box, function (myBox) {
            myBox.isActive = false;
        })

    };

    vm.off = function () { //unloads AOI and turns off slider pane
        vm.AOIoff();
        vm.paneoff();
        AOI.unloadData();
        vm.drawtoolOn = true;
    };

    vm.on = function (AOI, AOI_id) {//turns on AOI and slider pane
        vm.AOIon();
        vm.paneOn();
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

    vm.paneOn = function () {
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
            AOI.drawAreaJobId.CE = $location.search().CE;
            AOI.drawAreaJobId.EM = $location.search().EM;
            AOI.drawAreaJobId.EC = $location.search().EC;
            AOI.drawAreaJobId.NRC = $location.search().NRC;
            AOI.drawAreaJobId.TI = $location.search().TI;
            AOI.ID = -9999;
            AOI.getSavedReport();
        }
    }

    $rootScope.$on('$stateChangeSuccess', function (e, toState) {
        if (toState.name === 'draw') {
            vm.off();
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

    vm.childMouseOut(vm.AOI.ID);

    vm.paneOn();

}

AOICtrl.prototype = Object.create(PageslideCtrl.prototype);
AOICtrl.prototype.childMouseOut = function (id) {
    this.mout(id);
};
AOICtrl.prototype.childPaneOn = function () {
    this.paneOn();
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
    this.paneOn();
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
    this.paneOn();
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
    this.paneOn();
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
    this.paneOn();
};


function PrintCtrl($rootScope, AOI, $timeout, webService, $q) {
    //what is going on?
    var vm = this;
    vm.AOI = AOI;
    vm.AOI.inPrintWindow = true;
    var allPromises = [AOI.reloadAllCharts()];
    vm.readyToPrint = $q.all(allPromises);
    vm.name = "PrintCtrl";
    vm.congressIsActive = true;
    vm.senateIsActive = true;
    vm.houseIsActive = true;
    vm.congressMenu = "-";
    vm.senateMenu = "-";
    vm.houseMenu = "-";
    webService.getData('CE_config.json').then(function (result) {
        vm.CEConfig = result;
    });
    webService.getData('EM_config.json').then(function (result) {
        vm.EMConfig = result;
    });
    webService.getData('TI_config.json').then(function (result) {
        vm.TIConfig = result;
    });
    webService.getData('NRC_config.json').then(function (result) {
        vm.NRCConfig = result;
    });
    webService.getData('EC_config.json').then(function (result) {
        vm.ECConfig = result;
    });
}

PrintCtrl.prototype = Object.create(PageslideCtrl.prototype);

function SearchCtrl(AOI) {
    var vm = this;
    AOI.inPrintWindow = false;
    if (vm.childDrawOrSubmitCommand === "Working") vm.childStartSpin();
}

SearchCtrl.prototype = Object.create(PageslideCtrl.prototype);
SearchCtrl.prototype.childDrawOrSubmitCommand = function () {
    return this.drawOrSubmitCommand;
};
SearchCtrl.prototype.childStartSpin = function () {
    this.startSpin();
};

angular.module('myApp.controllers', ["pageslide-directive"])
    .controller('ModalController', function ($scope, metaurl, close) {
        $scope.metadataurl = metaurl;
        $scope.close = function (result) {
            close(result, 500); // close, but give 500ms for to animate
        };
    })

    .controller('submitModalController', function (close) {
        close(false, 6000);//close after 10 seconds anyway.
    })

    .controller('PrintCtrl', ['$rootScope', 'AOI', '$timeout', 'webService', '$q', PrintCtrl])
    .controller('AOICtrl', ['AOI', 'webService', AOICtrl])
    .controller('SearchCtrl', ['AOI', SearchCtrl])
    .controller('EnergyAndMineralsCtrl', ['AOI', 'webService', EnergyAndMineralsCtrl])
    .controller('TransportationAndInfrastructureCtrl', ['AOI', 'webService', TransportationAndInfrastructureCtrl])
    .controller('NaturalResourcesCtrl', ['AOI', 'webService', NaturalResourceCtrl])
    .controller('EconCtrl', ['AOI', 'webService', EconCtrl])
    .controller('pageslideCtrl', ['AOI', 'ModalService', '$state', 'usSpinnerService', '$location',
        '$stateParams', '$q', 'myGPService', 'myQueryService', 'AOIConfig', '$rootScope', PageslideCtrl]);


angular.element(document).ready(function () {

    c = angular.element(document.querySelector('#controller-demo')).scope();
});


angular.element(document).ready(function () {
    // if (console.assert)
    //     console.assert(document.querySelectorAll('body > .ng-pageslide').length == 12, 'Made all of them')
});
