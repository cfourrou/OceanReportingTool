'use strict';

/* Controllers */






angular.module('myApp.controllers', ["pageslide-directive"])


    .controller('ModalController', function($scope, close) {

        $scope.close = function(result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        };

    })

    .controller('MyCtrl1', ['AOIData', '$scope', function (AOIData, $scope) {
       // AOIData.name = 'test name';
        $scope.name = "controller 1";
        console.log('1 '+$scope.Cur_AOI);
        map.setView([33.51, -78.3], 10);
    }])
    .controller('MyCtrl3', ['AOIData', '$scope', function (AOIData, $scope) {

        $scope.name = "controller 3";
        console.log('3 '+AOIData.name);
    }])
    .controller('MyCtrl4', ['$scope', function ($scope) {
        $scope.name = "controller 4";
        console.log('4 '+$scope.Cur_AOI);

    }])
    .controller('MyCtrl5', ['$scope', function ($scope) {
        $scope.name = "controller 5";
        console.log('5 '+$scope.Cur_AOI);
    }])

    .controller('MyCtrl2', ['$scope', function ($scope) {
        $scope.name = "controller 2";
        //map.setView([33.51, -78.3], 10);
        /*
         //over ride windclass for testing chart
         console.log(windclass[0]);
         windclass[0]=10;
         windclass[1]=25;
         windclass[2]=65;
         */
        //var smallmap= L.map('smallmap');
        var smallmap= L.map('smallmap').setView([33.51, -78.3], 8);
        smallmap.createPane('miniAOIfeature');
        L.esri.basemapLayer('Oceans').addTo(smallmap);
        L.esri.basemapLayer('OceansLabels').addTo(smallmap);

         var minicLayer = L.esri.featureLayer({
         url: '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/11',
         where: "DATASET_NM='AOI_input' AND AOI_NAME='" + $scope.Cur_AOI + "'",
         color: '#E59ECA', weight: 3, fillOpacity:.3,
         pane:'miniAOIfeature'
         }).addTo(smallmap);



        windChart = Highcharts.chart('container', {
            chart: {
                spacing: 0,
                margin: 0,
                type: 'column'
            },
            title: {
                text: null
            },
            exporting: { enabled: false },
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

        document.getElementById("togglefull").addEventListener("click", function () {
            toggleFull = !toggleFull;
            if (toggleFull) {
                //document.getElementById('map').className='smallmapclass';
                //document.getElementById('smallmap').innerHTML= document.getElementById('map').innerHTML;
                //console.log(document.getElementById('smallmap').className);
                //document.getElementById('smallmap').className='smallmapclass';

                document.getElementById("slide1").style.width = '100%';
                //document.getElementById('smallmap').style.visibility = "visible";
                //document.getElementById('AOItab2').style.height='794px';
                document.getElementById("togglefull").style.marginLeft='0px';
                // Code for Chrome, Safari, Opera
                document.getElementById("togglefull").style.WebkitTransform = "rotate(180deg)";
                // Code for IE9
                document.getElementById("togglefull").style.msTransform = "rotate(180deg)";
                document.getElementById("togglefull").style.transform = "rotate(180deg)";

                document.getElementById('AOItab2').style.display='block';
                smallmap.invalidateSize();
                document.getElementById('windRSel').style.visibility = "hidden";
            } else {
                //document.getElementById('smallmap').style.visibility = "hidden";
                document.getElementById("togglefull").style.marginLeft="-25px";
                    //.style.marginLeft='-25px';
                document.getElementById("slide1").style.width = '50%';
                document.getElementById('AOItab2').style.display='none';
               // document.getElementById('AOItab2').style.height='0px';
                document.getElementById('windRSel').style.visibility = "visible";

                // Code for Chrome, Safari, Opera
                document.getElementById("togglefull").style.WebkitTransform = "rotate(0deg)";
                // Code for IE9
                document.getElementById("togglefull").style.msTransform = "rotate(0deg)";
                document.getElementById("togglefull").style.transform = "rotate(0deg)";

            }
        });
     }])

    .controller('pageslideCtrl', ['$scope', function ($scope) { //this one loads once on start up


        //$scope.name = "bababooey";
        $scope.checked = false; // This will be binded using the ps-open attribute

        $scope.toggle = function () {
            $scope.checked = !$scope.checked
        }

        $scope.Cur_AOI = 'Grand Strand';
        var marker;
        $scope.wind = [];
        $scope.boem = [];

        var cMapLayer1 = '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/11';


        L.esri.basemapLayer('Oceans').addTo(map);
        L.esri.basemapLayer('OceansLabels').addTo(map);
        map.createPane('optionalfeature1');
        map.createPane('optionalfeature2');
        map.createPane('optionalfeature3');
        map.createPane('AOIfeature');

        var cLayer = L.esri.featureLayer({
            url: '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/11',
            where: "DATASET_NM='AOI_input' AND AOI_NAME='" + $scope.Cur_AOI + "'",
            color: '#E59ECA', weight: 3, fillOpacity:.3,
            pane:'AOIfeature'
        }).addTo(map);

        map.setView([33.51, -78.3], 6);
         windrpLayer = L.esri.featureLayer({ //windresource layer
            url: '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/32',
            //where: "DATASET_NM='Area of Interest'",
            //color: 'gray', weight: 2, fillOpacity: 0
            pane:'optionalfeature1',
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

         windLeaseLayer = L.esri.featureLayer({ //windresource layer
            url: '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/31',
            //where: "DATASET_NM='Area of Interest'",
            //color: 'gray', weight: 2, fillOpacity: 0
            pane:'optionalfeature2',
            style: function (feature) {

                    return {color: 'white', weight: 1, fillOpacity: .5};
                }
        });
        windPlanningLayer = L.esri.featureLayer({ //windresource layer
            url: '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/36',
            //where: "DATASET_NM='Area of Interest'",
            //color: 'gray', weight: 2, fillOpacity: 0
            pane:'optionalfeature3',
            style: function (feature) {

                return {color: 'Black', weight: 1, fillOpacity: .5};
            }
        });




        var query = L.esri.query({
            url: cMapLayer1
        });

        query.run(function (error, featureCollection, response) {

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
                            TOTAL_BLOC: featureCollection.features[i].properties.TOTAL_BLOC
                        };
                        ba++;
                        break;
                    case "ActiveRenewableEnergyLeases":
                        $scope.boem[bc] = {
                            Lease_Numb: featureCollection.features[i].properties.Lease_Numb,
                            Company: featureCollection.features[i].properties.Company
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
             $scope.boem.sort(function (a, b) {
                return parseFloat(b.PERC_COVER) - parseFloat(a.PERC_COVER);
            });
            console.log($scope.boem)
            $scope.$apply();
        });



        console.log('PS '+$scope.Cur_AOI);


    }
    ])
;



angular.element(document).ready(function(){

    c = angular.element(document.querySelector('#controller-demo')).scope();
});

// Test
angular.element(document).ready(function () {
   // if (console.assert)
   //     console.assert(document.querySelectorAll('body > .ng-pageslide').length == 12, 'Made all of them')
});
