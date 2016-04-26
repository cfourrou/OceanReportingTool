'use strict';


angular.module('myApp.controllers', ["pageslide-directive"])


    .controller('ModalController', function ($scope, close) {

        $scope.close = function (result) {
            close(result, 500); // close, but give 500ms for to animate
        };

    })

    .controller('AOICtrl', ['AOIData', '$scope', function (AOIData, $scope) {
        // AOIData.name = 'test name';
        // this would be where we need to load the AOI, all of it.
        //$scope.name = "AOICtrl";

        // map.setView([33.51, -78.3], 10); //this is specific to Grand Strand


        //-----------------------------

        if (!cLayer) {
            cLayer = L.esri.featureLayer({ //AOI poly (7)
                url: ortMapServer + ortLayerAOI, //'//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/7',
                //where: "AOI_NAME='" + $scope.Cur_AOI + "'",
                where: "AOI_ID =" + $scope.AOI_ID + "",
                color: '#EB660C', weight: 3, fillOpacity: .3,
                pane: 'AOIfeature',
                simplifyFactor: 5.0,
                precision: 2,
            }).addTo(map);
            console.log(" layer loaded " + $scope.AOI_ID);

            cLayer.on("load", function (evt) {
                // create a new empty Leaflet bounds object

                var mbounds = L.latLngBounds([]);
                // loop through the features returned by the server
                cLayer.eachFeature(function (layer) {
                    // get the bounds of an individual feature
                    var layerBounds = layer.getBounds();
                    // extend the bounds of the collection to fit the bounds of the new feature
                    mbounds.extend(layerBounds);
                });
                map.fitBounds(mbounds);

                //console.log(mbounds);
                // unwire the event listener so that it only fires once when the page is loaded
                cLayer.off('load');
            });


            //-----------------------------------

            windrpLayer = L.esri.featureLayer({ //wind resource potential (18)
                url: ortMapServer + ortLayerOptional[0].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/18',
                pane: 'optionalfeature1',
                //simplifyFactor: 5.0,
                //precision: 3,
                style: function (feature) {
                    if (feature.properties.Speed_90 >= 8.8) {
                        return {color: '#0E3708', weight: 1, fillOpacity: .8};
                    } else if (feature.properties.Speed_90 >= 8.0) {
                        return {color: '#5C9227', weight: 1, fillOpacity: .8};
                    } else if (feature.properties.Speed_90 >= 7.5) {
                        return {color: '#A6C900', weight: 1, fillOpacity: .8};
                    } else if (feature.properties.Speed_90 >= 7.0) {
                        return {color: '#EFCF06', weight: 1, fillOpacity: .8};
                    } else if (feature.properties.Speed_90 >= 6.6) {
                        return {color: '#D96704', weight: 1, fillOpacity: .8};
                    } else if (feature.properties.Speed_90 < 6.6) {
                        return {color: '#A90306', weight: 1, fillOpacity: .8};
                    } else {
                        return {color: 'white', weight: 1, fillOpacity: .8};
                    }
                }
            });

            windLeaseLayer = L.esri.featureLayer({ //renewable energy leases (17)
                url: ortMapServer + ortLayerOptional[1].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/17',
                pane: 'optionalfeature2',
                style: function (feature) {

                    return {color: 'white', weight: 1, fillOpacity: .5};
                }
            });
            windPlanningLayer = L.esri.featureLayer({ //BOEM_Wind_Planning_Areas (21)
                url: ortMapServer + ortLayerOptional[2].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/21',
                pane: 'optionalfeature3',
                style: function (feature) {

                    return {color: 'Black', weight: 1, fillOpacity: .5};
                }
            });


            // var cMapLayer1 = '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/33';

            var query = L.esri.query({
                url: ortMapServer + ortLayerData,

            });


            query.returnGeometry(false).where("AOI_ID =" + $scope.AOI_ID + "").run(function (error, featureCollection, response) {

                var k = 0;
                var ba = 0;
                var bb = 0;
                var bc = 0;

                for (var i = 0, j = featureCollection.features.length; i < j; i++) {

                    switch (featureCollection.features[i].properties.DATASET_NM) {
                        case  "BOEM_Wind_Planning_Areas":
                            $scope.boem[ba] = {
                                INFO: featureCollection.features[i].properties.INFO,
                                PROT_NUMBE: featureCollection.features[i].properties.PROT_NUMBE,
                                LINK1: featureCollection.features[i].properties.LINK1,
                                LINK2: featureCollection.features[i].properties.LINK2,
                                PERC_COVER: featureCollection.features[i].properties.PERC_COVER,
                                TOTAL_BLOC: featureCollection.features[i].properties.TOTAL_BLOC,
                                TOTAL_CNT: featureCollection.features[i].properties.TOTAL_CNT
                            };
                            ba++;
                            break;
                        case "ActiveRenewableEnergyLeases":
                            $scope.arel[bc] = {
                                Lease_Numb: featureCollection.features[i].properties.Lease_Numb,
                                Company: featureCollection.features[i].properties.Company,
                                INFO: featureCollection.features[i].properties.INFO,
                                PROT_NUMBE: featureCollection.features[i].properties.PROT_NUMBE,
                                LINK1: featureCollection.features[i].properties.LINK1,
                                LINK2: featureCollection.features[i].properties.LINK2,
                                PERC_COVER: featureCollection.features[i].properties.PERC_COVER,
                                TOTAL_BLOC: featureCollection.features[i].properties.TOTAL_BLOC,
                                TOTAL_CNT: featureCollection.features[i].properties.TOTAL_CNT
                            };
                            bc++;
                            break;
                        case  "WindResourcePotential":
                            $scope.wind[bb] = {
                                WIND_CLASS: featureCollection.features[i].properties.WIND_CLASS,
                                AVG_WGHT: featureCollection.features[i].properties.AVG_WGHT.toFixed(2),
                                PERC_COVER: featureCollection.features[i].properties.PERC_COVER,
                                HOUSES_SUM: featureCollection.features[i].properties.HOUSES_SUM.toLocaleString(),
                                TOTAL_BLOC: featureCollection.features[i].properties.TOTAL_BLOC
                            };
                            switch (featureCollection.features[i].properties.WIND_CLASS.substring(0, 3)) {
                                case "Sup":
                                    windclass[0] = featureCollection.features[i].properties.PERC_COVER;
                                    break;
                                case "Out":
                                    windclass[1] = featureCollection.features[i].properties.PERC_COVER;
                                    break;
                                case "Exc":
                                    windclass[2] = featureCollection.features[i].properties.PERC_COVER;
                                    break;
                                case "Goo":
                                    windclass[3] = featureCollection.features[i].properties.PERC_COVER;
                                    break;
                                case "Fai":
                                    windclass[4] = featureCollection.features[i].properties.PERC_COVER;
                                    break;
                                case "Uns":
                                    windclass[5] = featureCollection.features[i].properties.PERC_COVER;
                                    break;
                            }
                            bb++;
                            break;
                    }
                }
                //console.log($scope.arel.length);
                $scope.boem.sort(function (a, b) {
                    return parseFloat(b.PERC_COVER) - parseFloat(a.PERC_COVER);
                });
                $scope.arel.sort(function (a, b) {
                    return parseFloat(b.PERC_COVER) - parseFloat(a.PERC_COVER);
                });
                if ($scope.boem[0].TOTAL_CNT === 0) {
                    $scope.boem[0].PERC_COVER = 0;
                    $scope.boem[0].TOTAL_BLOC = 0;
                }
                if ($scope.arel[0].TOTAL_CNT === 0) {
                    $scope.arel[0].PERC_COVER = 0;
                    $scope.arel[0].TOTAL_BLOC = 0;
                }
                $scope.$apply();
            });
        }


        //-------------------------------


    }])


    .controller('MyCtrl2', ['$scope', function ($scope) {
        $scope.name = "controller 2";


        windChart = Highcharts.chart('container', {
            chart: {
                spacing: 0,
                margin: 0,
                type: 'column'
            },
            title: {
                text: null
            },
            exporting: {enabled: false},
            colors: ['#0E3708', '#5C9227', '#A6C900', '#EFCF06', '#D96704', '#A90306'],
            xAxis: {
                title: {
                    enabled: false
                },
                labels: {
                    enabled: false
                },
                tickLength: 0
            },
            yAxis: {
                title: {
                    enabled: false
                },
                labels: {
                    enabled: false
                },
                TickLength: 0
            },
            plotOptions: {
                series: {
                    pointWidth: 190
                },
                column: {
                    stacking: 'percent'
                }
            },
            series: [{
                showInLegend: false,
                name: '',
                data: [windclass[0]]
            }, {
                showInLegend: false,
                name: '',
                data: [windclass[1]]
            }, {
                showInLegend: false,
                name: '',
                data: [windclass[2]]
            }, {
                showInLegend: false,
                name: '',
                data: [windclass[3]]
            }, {
                showInLegend: false,
                name: '',
                data: [windclass[4]]
            }, {
                showInLegend: false,
                name: '',
                data: [windclass[5]]
            }]
        });
        /*
         $scope.layers_toggle = (toggle ? "Click to hide Layer" : "Click to view on Map");
         document.getElementById("windRSel").addEventListener("click", function () {
         toggle = !toggle;
         if (toggle) {
         windrpLayer.addTo(map);
         windLeaseLayer.addTo(map);
         windPlanningLayer.addTo(map);
         //windrpLayer.setOpacity(.1);
         //windrpLayer.bringToBack();
         document.getElementById("layerviewlink").innerHTML = "Click to hide Layer";

         } else {
         map.removeLayer(windPlanningLayer);
         map.removeLayer(windLeaseLayer);
         map.removeLayer(windrpLayer);

         document.getElementById("layerviewlink").innerHTML = "Click to view on Map";
         }
         });
         */
        document.getElementById("togglefull").addEventListener("click", function () {
            toggleFull = !toggleFull;
            $scope.toggleFull = toggleFull;
            if (toggleFull) {
                //document.getElementById('map').className='smallmapclass';
                //document.getElementById('smallmap').innerHTML= document.getElementById('map').innerHTML;
                //console.log(document.getElementById('smallmap').className);
                //document.getElementById('smallmap').className='smallmapclass';

                document.getElementById("slide1").style.width = '100%';

                //document.getElementById('smallmap').style.visibility = "visible";
                //document.getElementById('AOItab2').style.height='794px';
                document.getElementById("togglefull").style.marginLeft = '0px';
                // Code for Chrome, Safari, Opera
                document.getElementById("togglefull").style.WebkitTransform = "rotate(180deg)";
                // Code for IE9
                document.getElementById("togglefull").style.msTransform = "rotate(180deg)";
                document.getElementById("togglefull").style.transform = "rotate(180deg)";

                document.getElementById('AOItab2').style.display = 'block';
                smallmap.invalidateSize();
                smallmap.fitBounds($scope.minibounds);
                document.getElementById('slider_but0').style.visibility = "hidden";
                document.getElementById('slider_but1').style.visibility = "hidden";
                document.getElementById('slider_but2').style.visibility = "hidden";
                document.getElementById('slbuttxt0').style.visibility = "hidden";
            } else {
                //document.getElementById('smallmap').style.visibility = "hidden";
                document.getElementById("togglefull").style.marginLeft = "-25px";
                //.style.marginLeft='-25px';
                document.getElementById("slide1").style.width = '50%';
                document.getElementById('AOItab2').style.display = 'none';
                // document.getElementById('AOItab2').style.height='0px';
                document.getElementById('slider_but0').style.visibility = "visible";
                document.getElementById('slider_but1').style.visibility = "visible";
                document.getElementById('slider_but2').style.visibility = "visible";
                document.getElementById('slbuttxt0').style.visibility = "visible";
                // Code for Chrome, Safari, Opera
                document.getElementById("togglefull").style.WebkitTransform = "rotate(0deg)";
                // Code for IE9
                document.getElementById("togglefull").style.msTransform = "rotate(0deg)";
                document.getElementById("togglefull").style.transform = "rotate(0deg)";

            }
        });


        /*  //over ride windclass for testing chart
         console.log(windclass[0]);
         windclass[0]=10;
         windclass[1]=25;
         windclass[2]=65;
         */

        var smallmap = L.map('map').setView([45.526, -122.667], 1);
        L.esri.basemapLayer('Oceans').addTo(smallmap);
        L.esri.basemapLayer('OceansLabels').addTo(smallmap);


        var minicLayer = L.esri.featureLayer({
            url: ortMapServer + ortLayerAOI, //'//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/7',
            where: "AOI_ID =" + $scope.AOI_ID + "",
            color: '#EB660C',
            weight: 3,
            fillOpacity: .3,
            simplifyFactor: 5.0,
            precision: 3
            //,            pane: 'miniAOIfeature'
        }).addTo(smallmap);

        minicLayer.on("load", function (evt) {
            // create a new empty Leaflet bounds object

            var bounds = L.latLngBounds([]);
            // loop through the features returned by the server
            minicLayer.eachFeature(function (layer) {
                // get the bounds of an individual feature

                var layerBounds = layer.getBounds();
                // extend the bounds of the collection to fit the bounds of the new feature
                bounds.extend(layerBounds);
            });

            // once we've looped through all the features, zoom the map to the extent of the collection
            $scope.minibounds = bounds;
            smallmap.fitBounds(bounds);


            // unwire the event listener so that it only fires once when the page is loaded
            minicLayer.off('load');
        });
        //smallmap.invalidateSize();

    }])

    .controller('pageslideCtrl', ['$scope', function ($scope) { //this one loads once on start up

        $scope.box = [];
        $scope.menuitems = [];
        $scope.optLayer = [];
        var len = 2000;
        for (var i = 0; i < len; i++) {
            $scope.box.push({
                myid: i,
                isActive: false,
                level: 0,
                future: true
            });
        }


        //$scope.name = "bababooey";
        $scope.checked = true; // This will be binded using the ps-open attribute


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
            console.log($scope.box[id].myid + " "+id+" is " +$scope.box[id].isActive);
        };

        $scope.opt_layer_button = function (id) {
            $scope.optLayer[id] = !$scope.optLayer[id];
            //console.log("button " + id);
            switch (id) {
                case 0:
                    if ($scope.optLayer[0]) {
                        windrpLayer.addTo(map);
                    } else map.removeLayer(windrpLayer);
                    break;
                case 1:
                    if ($scope.optLayer[1]) {
                        windLeaseLayer.addTo(map);
                    } else map.removeLayer(windLeaseLayer);
                    break;
                case 2:
                    if ($scope.optLayer[2]) {
                        windPlanningLayer.addTo(map);
                    } else map.removeLayer(windPlanningLayer);
                    break;
            }


        };


        $scope.reset = function () { //unloads AOI but leaves slider pane on
            $scope.AOIoff();
            $scope.paneon();
            for (i = 0; i < len; i++) {
                $scope.box[i].isActive = false;
            }

        };

        $scope.off = function () { //unloads AOI and turns off slider pane
            $scope.AOIoff();
            $scope.paneoff();
        };

        $scope.on = function (AOI, AOI_id) {//turns on AOI and slider pane
            $scope.AOIon();
            $scope.paneon();
            //console.log(AOI);
            $scope.Cur_AOI = AOI;
            $scope.AOI_ID = AOI_id;
            console.log($scope.AOI_ID);
        };

        $scope.AOIoff = function () {
            $scope.checkifAOI = false;
            toggle = false;
            if (cLayer) {
                map.removeLayer(windPlanningLayer);
                map.removeLayer(windLeaseLayer);
                map.removeLayer(windrpLayer);
                map.removeLayer(cLayer);
                cLayer = null;
            }
            map.setView([33.51, -78.3], 6);
            $scope.wind.length = 0;
            $scope.boem.length = 0;
            $scope.arel.length = 0;
            $scope.optLayer.length = 0;
            windclass.length = 0;
            //map.setView([33.51, -68.3], 6);
        };

        $scope.AOIon = function () {
            $scope.checkifAOI = true;
        };

        $scope.paneoff = function () {
            $scope.checked = false;
            toggleFull = false;
        };

        $scope.paneon = function () {
            $scope.checked = true;
            document.getElementById("slide1").style.width = '50%';
            toggleFull = false;
        };

        //$scope.Cur_AOI = 'Grand Strand';

        $scope.wind = [];
        $scope.boem = [];
        $scope.arel = [];

        $scope.aoismenu = [];
        $scope.aoistates = [];
        $scope.aoistate = [];

        var query = L.esri.query({
            url: ortMapServer + ortLayerAOI

        });
        //query.returnGeometry = false;
        query.returnGeometry(false).where("KNOWN_AREA='High Priority Areas'").run(function (error, featureCollection, response) {
            //query.where("COMMON_NM='*'").run(function (error, featureCollection, response) {
            // query.where("COMMON_NM LIKE '%'").run(function (error, featureCollection, response) {


            var ba = 0;


            for (var i = 0, j = featureCollection.features.length; i < j; i++) {

                // switch (featureCollection.features[i].properties.REPORT_TYPE) {
                //    case  "High Priority Areas":

                $scope.aoismenu[ba] = {
                    AOI_NAME: featureCollection.features[i].properties.AOI_NAME,
                    COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                    REPORT_TYPE: featureCollection.features[i].properties.COMMON_NM,
                    AOI_ID: featureCollection.features[i].properties.AOI_ID,
                    DATASET_NM:featureCollection.features[i].properties.DATASET_NM
                };
                ba++;
                //      break;

                //}
            }

            $scope.aoismenu.sort(function (a, b) {
                //return parseFloat(a.AOI_NAME) - parseFloat(b.AOI_NAME);
                return a.AOI_NAME.localeCompare(b.AOI_NAME);
            });
        });


        //query.returnGeometry(false).where("KNOWN_AREA='Other Areas by State'").run(function (error, featureCollection, response) {
        query.returnGeometry(false).where("KNOWN_AREA='Other Areas by State'").run(function (error, featureCollection, response) {
                var ba = 0;
                for (var i = 0, j = featureCollection.features.length; i < j; i++) {
                    $scope.aoistates[ba] = {
                        AOI_NAME: featureCollection.features[i].properties.AOI_NAME,
                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                        REPORT_TYPE: featureCollection.features[i].properties.COMMON_NM,
                        AOI_ID: featureCollection.features[i].properties.AOI_ID,
                        DATASET_NM:featureCollection.features[i].properties.DATASET_NM
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


        //console.log($scope.aoismenu);

        //I think this would be the right place to put the menu data loop.

        /*        var cMapLayer3 = '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/34';

         var query = L.esri.query({
         url: cMapLayer3,

         });

         console.log("2");

         query.where("AOI_NAME='Grand Strand' AND DATASET_NM='AOI_input'").run(function (error, featureCollection, response) {


         console.log(featureCollection);
         });
         */
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
