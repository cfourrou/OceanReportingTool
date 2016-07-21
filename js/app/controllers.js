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

            //img = img.replace('data:image/png;base64,', '');
            // window.open(img);
            $('#binaryImage').attr('src', img);
            //'data:image/png;base64,'+img);


        }

    }])

    .controller('AOICtrl', ['AOI', '$scope', '$http', function (AOI, $scope, $http) {
        $scope.AOI = AOI;
        AOI.inPrintWindow = false;
        $scope.congressIsActive = true;
        $scope.senateIsActive = false;
        $scope.houseIsActive = false;
        $scope.congressMenu = "-";
        $scope.senateMenu = "+";
        $scope.houseMenu = "+";
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
        }
        $scope.houseActivate = function () {
            $scope.congressIsActive = false;
            $scope.senateIsActive = false;
            $scope.houseIsActive = true;
            $scope.congressMenu = "+";
            $scope.senateMenu = "+";
            $scope.houseMenu = "-";
        }
        $scope.senateActivate = function () {
            $scope.congressIsActive = false;
            $scope.senateIsActive = true;
            $scope.houseIsActive = false;
            $scope.congressMenu = "+";
            $scope.senateMenu = "-";
            $scope.houseMenu = "+";
        }

        AOI.layer.on("load", function (evt) {
            // create a new empty Leaflet bounds object

            var mbounds = L.latLngBounds([]);
            // loop through the features returned by the server

            AOI.layer.eachFeature(function (layer) {
                // get the bounds of an individual feature
                var layerBounds = layer.getBounds();
                // extend the bounds of the collection to fit the bounds of the new feature
                mbounds.extend(layerBounds);
            });

            try {
                map.fitBounds(mbounds);
                //console.log("here?");
                AOI.layer.off('load'); // unwire the event listener so that it only fires once when the page is loaded or again on error
            }
            catch (err) {
                //for some reason if we are zoomed in elsewhere and the bounds of this object are not in the map view, we can't read bounds correctly.
                //so for now we will zoom out on error and allow this event to fire again.
                // console.log("AOI bounds out of bounds, zooming out");
                map.setView([33.51, -78.3], 6); //it should try again.
            }


            $scope.mout($scope.AOI.ID);


        });

        // console.log("in CE ctrl=" + AOI.CEFederalTotal);

        //$scope.$on('$viewContentLoaded', function () {
        //    // for some reason the data on the first partial in Common elements isn't visable until an action is performed like clicking on another button.
        //    //I can't just apply scope here because it is already running. if i give the current one a little time to complete before running this, every thing works.
        //    $timeout(function () {
        //
        //        $scope.$apply();
        //
        //
        //    }, 1250);
        //});
        //AOI.doFullSlider('CE');
        $scope.paneon();

    }])
    .controller('SearchCtrl', ['AOI', '$scope', function (AOI, $scope) {
        //$scope.AOI = AOI;
        document.getElementById("bigmap").style.width = '100%';
        $scope.off();
        map.invalidateSize();
        AOI.inPrintWindow = false;
        // console.log("draw mode "+ $scope.drawtoolOn);

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

        //AOI.doFullSlider('EM');
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


        //AOI.loadWindChart();
        //AOI.doFullSlider('TI');
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

    .controller('pageslideCtrl', ['$scope', 'AOI', 'ModalService', '$state', 'usSpinnerService', '$location', '$stateParams', function ($scope, AOI, ModalService, $state, usSpinnerService, $location, $stateParams) { //this one loads once on start up

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
                useUTC: false,

            },
            lang: {
                decimalPoint: '.',
                thousandsSep: ',',
                numericSymbols:[ "k" , "M" , "B" , "T" , "P" , "E"]
            }
        });

        map.on('zoomend', function () {
            $scope.zoomlevel = map.getZoom();
            // console.log("zoomlevel "+ $scope.zoomlevel);

            if ($scope.drawtoolOn) {
                $scope.drawenabled = $scope.zoomLevelGood();
                $scope.$apply();
            }
            //console.log("zoom draw mode " + $scope.drawtoolOn);
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

        }
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
        }

        $scope.showSubmitModal = function () {

            ModalService.showModal({
                templateUrl: "modalDraw.html",
                controller: "submitModalController",
            }).then(function (modal) {
                modal.close.then(function (result) {
                    $scope.customResult = "All good!";
                });
            });

        };

        $scope.startSpin = function () {
            usSpinnerService.spin('spinner-1');
        }
        $scope.stopSpin = function () {
            usSpinnerService.stop('spinner-1');
        }
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
            //console.log("basemap " + $scope.baseMapControlOn);
            if ($scope.baseMapControlOn) {
                map.removeControl(baseMapControl);
                $scope.baseMapControlOn = false;

            } else {
                baseMapControl.addTo(map);
                $scope.baseMapControlOn = true;
            }
        }


        $scope.drawIt = function () {
            // console.log("drawIt clicked " + $scope.zoomlevel + " enl?" + $scope.drawenabled);
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

                    //console.log("submit");
                    //console.log($scope.polylayer);
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
                        AOI.featureCollection = {fields: EMReport.fields, features: EMReport.features};
                        AOI.featureCollection.features.push.apply(AOI.featureCollection.features, CEReport.features);
                        AOI.featureCollection.features.push.apply(AOI.featureCollection.features, TIReport.features);
                        AOI.featureCollection.features.push.apply(AOI.featureCollection.features, NRCReport.features);
                        AOI.featureCollection.features.push.apply(AOI.featureCollection.features, ECReport.features);
                        // console.log("Stop Spinner");
                        console.log(AOI.featureCollection);
                        $scope.stopSpin();
                        $scope.$apply();
                    });
                    EMGPTask.run(function (error, EMgeojson, EMresponse) {
                        // console.log(EMresponse);
                        if (error) {
                            $scope.drawOrSubmitCommand = "Error " + error;
                            console.log("EM " + error);
                        }
                        else if (EMgeojson) {
                            $scope.drawOrSubmitCommand = "Complete";
                            //AOI.featureCollection = EMgeojson.Output_Report;
                            EMReport = EMgeojson.Output_Report;
                            console.log(EMReport);
                            console.log("EM Complete");
                        }
                        stopSpinnerRequest();

                    });
                    CEGPTask.run(function (error, CEgeojson, CEresponse) {
                        // console.log(CEresponse);
                        if (error) {
                            $scope.drawOrSubmitCommand = "Error " + error;
                            console.log("CE " + error);
                        }
                        else if (CEgeojson) {
                            $scope.drawOrSubmitCommand = "Complete";
                            CEReport = CEgeojson.Output_Report;
                            console.log(CEReport);
                            console.log("CE Complete");

                        }
                        stopSpinnerRequest();

                    });
                    TIGPTask.run(function (error, TIgeojson, TIresponse) {
                        // console.log(CEresponse);
                        if (error) {
                            $scope.drawOrSubmitCommand = "Error " + error;
                            console.log("TI " + error);
                        }
                        else if (TIgeojson) {
                            $scope.drawOrSubmitCommand = "Complete";
                            TIReport = TIgeojson.Output_Report;
                            console.log(TIReport);
                            console.log("TI Complete");

                        }
                        stopSpinnerRequest();

                    });
                    NRCGPTask.run(function (error, NRCgeojson, NRCresponse) {
                        // console.log(CEresponse);
                        if (error) {
                            $scope.drawOrSubmitCommand = "Error " + error;
                            console.log("NRC " + error);
                        }
                        else if (NRCgeojson) {
                            $scope.drawOrSubmitCommand = "Complete";
                            NRCReport = NRCgeojson.Output_Report;
                            console.log(NRCReport);
                            console.log("NRC Complete");

                        }
                        stopSpinnerRequest();

                    });
                    ECGPTask.run(function (error, ECgeojson, ECresponse) {
                        // console.log(CEresponse);
                        if (error) {
                            $scope.drawOrSubmitCommand = "Error " + error;
                            console.log("EC " + error);
                        }
                        else if (ECgeojson) {
                            $scope.drawOrSubmitCommand = "Complete";
                            ECReport = ECgeojson.Output_Report;
                            console.log(ECReport);
                            console.log("EC Complete");

                        }
                        stopSpinnerRequest();

                    });

                    break;
                case "Work":
                    $scope.showSubmitModal();
                    break;
                case "Erro":
                    // console.log("Error pressed");
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
                    //AOI.zoomTo();
                    AOI.loadData(AOI.featureCollection.features[0].attributes.AOI_ID, AOI.featureCollection.features[0].attributes.AOI_NAME);
                    break;

            }
        };


        map.on('pm:create', function (e) {
            //console.log(e);
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
            //console.log($scope.box[id].myid + " "+id+" is " +$scope.box[id].isActive);
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
            //map.fire('zoomend');

            $scope.drawenabled = $scope.zoomLevelGood();

            $scope.drawtoolOn = true;

        };

        $scope.on = function (AOI, AOI_id) {//turns on AOI and slider pane
            $scope.AOIon();
            $scope.paneon();
            //console.log(AOI);
            //$scope.Cur_AOI = AOI;
            //$scope.AOI_ID = AOI_id;


            //console.log($scope.AOI_ID);
        };

        $scope.mover = function (AOI_id) {//turns on poly on mouse over in menu

            if (!mouseLayer) {
                mouseLayer = L.esri.featureLayer({ //AOI poly (7)
                    url: AOI.config.ortMapServer + AOI.config.ortLayerAOI,
                    //where: "AOI_NAME='" + $scope.Cur_AOI + "'",
                    where: "AOI_ID =" + AOI_id + "",
                    color: '#EB660C', weight: 3, fillOpacity: .3,
                    //pane: 'AOIfeature',
                    simplifyFactor: 2.0,
                    // precision: 2
                }).addTo(map);
                //console.log(" mouseLayer loaded " + AOI_id);
            }
            ;

            // console.log(AOI_id);

        };
        $scope.mout = function (AOI_id) {//turns on poly on mouse over in menu

            if (mouseLayer) {
                map.removeLayer(mouseLayer);
                mouseLayer = null;
                //console.log(" mouseLayer UNloaded " + AOI_id);
            }
            //console.log("mouselayer = " + mouseLayer )
            // console.log(AOI_id);

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
            //console.log($scope.aoismenu);
            $scope.aoismenu.sort(function (a, b) {
                //return parseFloat(a.AOI_NAME) - parseFloat(b.AOI_NAME);
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
                //console.log($scope.aoistates);
                $scope.aoistates.sort(function (a, b) {
                    return a.AOI_NAME.localeCompare(b.AOI_NAME);
                });
                //console.log($scope.aoistates);
            }
        );

        // console.log("AOIdetail is " + $stateParams.AOIdetail);
        if ($location.search().AOI) {
            query.returnGeometry(false).where("AOI_ID=" + $location.search().AOI).run(function (error, featureCollection, response) {
                    AOI.name = featureCollection.features[0].properties.AOI_NAME;
                }
            );
            AOI.loadData($location.search().AOI, AOI.name);
            // $state.go('CEview');
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
