'use strict';


angular.module('myApp.controllers', ["pageslide-directive"])


    .controller('ModalController', function ($scope, metaurl, close) {

        $scope.metadataurl = metaurl;
        $scope.close = function (result) {
            close(result, 500); // close, but give 500ms for to animate
        };

    })

    .controller('AOICtrl', ['AOI', '$scope', function (AOI, $scope) {
        $scope.AOI = AOI;
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
            map.fitBounds(mbounds);

            //console.log(mbounds);
            // unwire the event listener so that it only fires once when the page is loaded
            AOI.layer.off('load');
            $scope.mout($scope.AOI.ID);
        });

    }])
    .controller('SearchCtrl', ['AOI', '$scope', function (AOI, $scope) {
        //$scope.AOI = AOI;
        document.getElementById("bigmap").style.width = '100%';
        $scope.off();
        map.invalidateSize();

       // console.log("draw mode "+ $scope.drawtoolOn);

        var arcgisOnline = L.esri.Geocoding.arcgisOnlineProvider();

        searchControl = L.esri.Geocoding.geosearch({
            expanded: true,
            collapseAfterResult: false,
            providers: [
                arcgisOnline,

                new L.esri.Geocoding.FeatureLayerProvider({
                    url: 'https://it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/7',
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


    .controller('MyCtrl2', ['$scope', '$timeout', 'AOI', '$http', function ($scope, $timeout, AOI, $http) {
        $scope.AOI = AOI;
        var smallmap;
        $scope.name = "controller 2";
        $http.get('emconfig.json')
            .then(function (res) {
                $scope.emconfig = res.data;
            });
        /*//over ride windclass for testing chart
         console.log(windclass[0]);
         windclass[0]=10;
         windclass[1]=25;
         windclass[2]=65;
         */
        //console.log("windclass " + windclass);
        //      windclass[6] = (windclass.reduce(function (prev, cur) {
        //           return prev.toFixed(2) - cur.toFixed(2);
        //       }, 100));
        //console.log("windmill % unknown = " + windclass[6]);
        $scope.$on('$viewContentLoaded', function () {
            // Your document is ready, place your code here
            $timeout(function () {
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
                    colors: ['#0E3708', '#5C9227', '#A6C900', '#EFCF06', '#D96704', '#A90306', '#A1A1A1'],
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
                    }, {
                        showInLegend: false,
                        name: '',
                        data: [windclass[6]]
                    }
                    ]
                });

                /*  //over ride windclass for testing chart
                 // console.log(windclass[0]);
                 windclass[0]=10;
                 windclass[1]=25;
                 windclass[2]=65;
                 */

                smallmap = L.map('map').setView([45.526, -122.667], 1);
                L.esri.basemapLayer('Oceans').addTo(smallmap);
                L.esri.basemapLayer('OceansLabels').addTo(smallmap);
                //console.log("AOI_ID =" + $scope.AOI.ID + "");

                var minicLayer = L.esri.featureLayer({
                    url: ortMapServer + ortLayerAOI, //'//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/7',
                    where: "AOI_ID =" + $scope.AOI.ID + "",
                    color: '#EB660C',
                    weight: 3,
                    fillOpacity: .3,
                    //simplifyFactor: 5.0,
                    //precision: 3
                    //,            pane: 'miniAOIfeature'
                }).addTo(smallmap);
                // console.log(" minicLayer loaded " + $scope.AOI.ID);
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

            }, 1000);
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


                document.getElementById("slide1").style.width = '100%';
                //document.getElementById("slide1").style.position = 'absolute';

                document.getElementById("togglefull").style.marginLeft = '0px';
                // Code for Chrome, Safari, Opera
                document.getElementById("togglefull").style.WebkitTransform = "rotate(180deg)";
                // Code for IE9
                document.getElementById("togglefull").style.msTransform = "rotate(180deg)";
                document.getElementById("togglefull").style.transform = "rotate(180deg)";

                //document.getElementById('AOItab2').style.display = 'block';
                var elems = document.getElementsByClassName('AOItabClass2');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].style.display = 'inline-block';
                }
                ;
                var elems = document.getElementsByClassName('sliderbutton');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].style.visibility = "hidden";
                }
                ;
                smallmap.invalidateSize();
                smallmap.fitBounds($scope.minibounds);
                //document.getElementById('slider_but0').style.visibility = "hidden";
                //document.getElementById('slider_but1').style.visibility = "hidden";
                //document.getElementById('slider_but2').style.visibility = "hidden";
                document.getElementById('slbuttxt0').style.visibility = "hidden";
            } else {
                //document.getElementById('smallmap').style.visibility = "hidden";
                document.getElementById("togglefull").style.marginLeft = "-25px";
                //.style.marginLeft='-25px';
                document.getElementById("slide1").style.width = '50%';
                //document.getElementById("slide1").style.position = 'relative';
                //document.getElementById('AOItab2').style.display = 'none';
                var elems = document.getElementsByClassName('AOItabClass2');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].style.display = 'none';
                }
                ;
                var elems = document.getElementsByClassName('sliderbutton');
                for (var i = 0; i < elems.length; i++) {
                    elems[i].style.visibility = "visible";
                }
                ;
                // document.getElementById('AOItab2').style.height='0px';
                // document.getElementById('slider_but0').style.visibility = "visible";
                // document.getElementById('slider_but1').style.visibility = "visible";
                // document.getElementById('slider_but2').style.visibility = "visible";
                document.getElementById('slbuttxt0').style.visibility = "visible";
                // Code for Chrome, Safari, Opera
                document.getElementById("togglefull").style.WebkitTransform = "rotate(0deg)";
                // Code for IE9
                document.getElementById("togglefull").style.msTransform = "rotate(0deg)";
                document.getElementById("togglefull").style.transform = "rotate(0deg)";

            }
        });


    }])

    .controller('pageslideCtrl', ['$scope', 'AOI', function ($scope, AOI) { //this one loads once on start up
        $scope.AOI = AOI;

        $scope.box = [];
//        $scope.menuitems = [];
//        $scope.optLayer = [];
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
        //console.log("zoomlevel1 "+$scope.zoomlevel);
        //map.pm.addControls();
/*
        var ourCustomControl = L.Control.extend({

            options: {
                position: 'topleft'
                //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
            },

            onAdd: function (map) {
                var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

                container.style.backgroundColor = 'grey';
                container.style.width = '30px';
                container.style.height = '30px';
                container.style.top = '183px';
                container.style.left= '28px';
                container.onclick = function(){
                    console.log('buttonClicked');
                }
                return container;
            },

        });

        map.addControl(new ourCustomControl());
        */

        map.on('zoomend', function() {
            $scope.zoomlevel = map.getZoom();
           // console.log("zoomlevel "+ $scope.zoomlevel);
            console.log("zoom draw mode "+$scope.drawtoolOn);
            if ($scope.drawtoolOn) {
                if (($scope.zoomlevel <= 12) && ($scope.zoomlevel >= 10 )) {
                    $scope.drawenabled = true;
                } else {
                    $scope.drawenabled = false;
                }
                $scope.$apply();
            }

        });


        //$scope.name = "bababooey";
        $scope.checked = true; // This will be binded using the ps-open attribute

        $scope.drawit = function () {
            console.log("drawit clicked "+$scope.zoomlevel + " enl?"+ $scope.drawenabled);
            if ($scope.drawenabled){
                if ($scope.drawlocked) {
                    map.setMinZoom(1);
                    map.setMaxZoom(12);
                    console.log("unlock");
                    map.dragging.enable();
                    $scope.drawlocked=false;
                    map.pm.disableDraw('Poly');

                } else
                 {
                    console.log("lock");
                     map.setMinZoom(map.getZoom());
                     map.setMaxZoom(map.getZoom());
                    map.dragging.disable();
                    $scope.drawlocked=true;
                     if ($scope.polylayer)  map.removeLayer($scope.polylayer);
                     map.pm.enableDraw('Poly');


                }

            }
        };
        map.on('pm:create', function(e) {
            console.log(e);
            $scope.polylayer= e.layer;
            //map.removeLayer(e.layer);
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

        //$scope.opt_layer_button = function (id) {
        //    $scope.optLayer[id] = !$scope.optLayer[id];
        //    //console.log("button " + id);
        //    switch (id) {
        //        case 0:
        //            if ($scope.optLayer[0]) {
        //                windrpLayer.addTo(map);
        //            } else map.removeLayer(windrpLayer);
        //            break;
        //        case 1:
        //            if ($scope.optLayer[1]) {
        //                windLeaseLayer.addTo(map);
        //            } else map.removeLayer(windLeaseLayer);
        //            break;
        //        case 2:
        //            if ($scope.optLayer[2]) {
        //                windPlanningLayer.addTo(map);
        //            } else map.removeLayer(windPlanningLayer);
        //            break;
        //        case 3:
        //            if ($scope.optLayer[3]) {
        //                oceanDisposalSites.addTo(map);
        //            } else map.removeLayer(oceanDisposalSites);
        //            break;
        //    }
        //
        //
        //};


        $scope.reset = function () { //unloads AOI but leaves slider pane on


            $scope.AOIoff();
            $scope.paneon();
            AOI.unloadData();

            for (i = 0; i < len; i++) {
                $scope.box[i].isActive = false;
            }
            if ($scope.polylayer)  map.removeLayer($scope.polylayer);

            if ($scope.drawtoolOn) {
                map.setMinZoom(1);
                map.setMaxZoom(12);
                console.log("unlock");
                map.dragging.enable();
                $scope.drawlocked=false;
                document.getElementById("bigmap").style.width = '50%';
                map.removeControl(searchControl);
                $scope.drawtoolOn = false;
                // map.setView([33.51, -78.3], 6);
                map.invalidateSize();
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
            //console.log(AOI);
            //$scope.Cur_AOI = AOI;
            //$scope.AOI_ID = AOI_id;


            //console.log($scope.AOI_ID);
        };

        $scope.mover = function (AOI_id) {//turns on poly on mouse over in menu

            if (!mouseLayer) {
                mouseLayer = L.esri.featureLayer({ //AOI poly (7)
                    url: ortMapServer + ortLayerAOI, //'//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/7',
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
            toggleFull = false;
        };

        $scope.paneon = function () {
            $scope.checked = true;
            document.getElementById("slide1").style.width = '50%';
            toggleFull = false;
        };


        //$scope.Cur_AOI = 'Grand Strand';

        // $scope.wind = [];
        // $scope.boem = [];
        // $scope.arel = [];
        // $scope.metadata = [];
        // $scope.disp = [];
        // $scope.mml = [];
        // $scope.hydrok = [];
        // $scope.test = [];

        $scope.aoismenu = [];
        $scope.aoistates = [];
//        $scope.aoistate = [];

        var query = L.esri.query({
            url: ortMapServer + ortLayerAOI

        });
        //query.returnGeometry = false;
        query.returnGeometry(false).where("KNOWN_AREA='Special Interest Areas'").run(function (error, featureCollection, response) {
            //query.where("COMMON_NM='*'").run(function (error, featureCollection, response) {
            // query.where("COMMON_NM LIKE '%'").run(function (error, featureCollection, response) {


            var ba = 0;


            for (var i = 0, j = featureCollection.features.length; i < j; i++) {

                // switch (featureCollection.features[i].properties.REPORT_TYPE) {
                //    case  "High Priority Areas":

                $scope.aoismenu[ba] = {
                    AOI_NAME: featureCollection.features[i].properties.AOI_NAME,
                    COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                    REPORT_TYPE: featureCollection.features[i].properties.REPORT_TYPE,
                    AOI_ID: featureCollection.features[i].properties.AOI_ID,
                    DATASET_NM: featureCollection.features[i].properties.DATASET_NM,
                    DESC_: featureCollection.features[i].properties.DESC_
                };
                ba++;
                //      break;

                //}
            }
            //console.log($scope.aoismenu);
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


        //console.log($scope.aoismenu);

        //I think this would be the right place to put the menu data loop.

        /*        var cMapLayer3 = '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/34';

         var query = L.esri.query({
         url: cMapLayer3,

         });

         //console.log("2");

         query.where("AOI_NAME='Grand Strand' AND DATASET_NM='AOI_input'").run(function (error, featureCollection, response) {


         //console.log(featureCollection);
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
