'use strict';

/* Services */

angular.module('myApp.services', [])
    .factory('webService', function ($http) {

        var getData = function (urlInput) {


            // Angular $http() and then() both return promises themselves
            return $http({method: "GET", url: urlInput}).then(function (result) {

                // What we return here is the data that will be accessible
                // to us after the promise resolves


                return result.data;

            });
        };


        return {getData: getData};


    })
    .factory('_', function () {
        return window._; // assumes underscore has already been loaded on the page
    })
    .factory('L', function () {
        return window.L;
    })
    .factory('myGPService', ['L', 'AOI', '$q', function (L, AOI, $q) {
        var myGPService = function (url) {
            var gpService = L.esri.GP.service({
                url: url,
                useCors: false,
                async: true,
                path: 'submitJob',
                asyncInterval: 1
            });

            var task = gpService.createTask();

            return {
                run: function () {
                    var deferred = $q.defer();

                    task.setParam("Report_Boundary", AOI.drawLayerShape);
                    task.setOutputParam("Output_Report");

                    task.run(function (error, geojson) {
                        if (error) {
                            deferred.resolve(error)
                        } else {
                            deferred.resolve({output: geojson.Output_Report})
                        }
                    });

                    return deferred.promise;
                }
            };
        };

        return myGPService;
    }])
    .provider('AOI', function () {
        var config = {
                ortMapServer: '',
                ortLayerAOI: '',
                ortLayerData: '',
                ortEnergyGPService: '',
                ortCommonGPService: '',
                ortTranspoGPService: '',
                ortNaturalGPService: '',
                ortEconGPService: ''
            },
            AOI;

        return {
            config: function (value) {
                config = value;
            },
            $get: ['$rootScope', '$window', function ($rootScope, $window) {


                AOI = {
                    OceanJobContributionsSeries: [],
                    drawAreaJobId: [],
                    Shared: false,
                    url: $window.location.href.split('#'),
                    config: config,
                    layer: null,
                    feature: null,
                    ID: null,
                    name: null,
                    added: false,
                    boem: [],
                    metadata: [],
                    arel: [],
                    wind: [],
                    disp: [],
                    mml: [],
                    hydrok: [],
                    optLayer: [],
                    CETribalLands: [],
                    surfsed: [],
                    wavepwr: [],
                    tidalpwr: [],
                    currentpwr: [],
                    beachNur: [],
                    OGPlanA: [],
                    OGLease: [],
                    OGWells: [],
                    OGresource: [],
                    coastfac: [],
                    CEElevation: [],
                    windclass: [],
                    CEAreaOfPoly: [],
                    CEFedGeoRegs: [],
                    CECongress: [],
                    CEHouse: [],
                    CESenate: [],
                    CECoastalCounties: [],
                    CEFederalAndState: [],
                    CEFederalTotal: 0,
                    CEStateTotal: 0,
                    TISubmarine: [],
                    TICoastal: [],
                    TIDangerZones: [],
                    NRCHabConcern: [],
                    NRCCriticalHab: [],
                    NRCMigratorySharks: [],
                    NRCMigratoryFish: [],
                    ECEcon: [],
                    ECEconEmploy: [],
                    ECEconGDP: [],
                    ECEconWages: [],
                    ECStateGDP: [],
                    ECCountyGDP: [],
                    CEPlaces: [],
                    TIShipping: [],
                    TIShippingTotal: 0,
                    TIRightWhale: [],
                    TIVessel: [],
                    TIPrincipalPorts: [],
                    NRCNearby: [],
                    NRCSoftCoral: [],
                    NRCStonyCoral: [],
                    NRCReefs: [],
                    NRCBarrier: [],
                    ECCoastalCounties: [],
                    ECFishRevenue: [],
                    TIPilot: [],
                    TIAnchorage: [],
                    map: {},

                    display: function (AOI_ID) {
                        this.ID = parseInt(AOI_ID);
                        if (this.ID === -9999) {
                            this.layer = L.geoJson(this.drawLayerShape, {
                                color: '#EB660C',
                                weight: 1.5,
                                fillOpacity: .3,
                                pane: 'AOIfeature'
                            }).addTo(AOI.map);
                            AOI.map.fitBounds(this.layer.getBounds(), {
                                padding: [1, 1]
                            });
                        } else {
                            this.layer = L.esri.featureLayer({
                                url: config.ortMapServer + config.ortLayerAOI,
                                color: '#EB660C', weight: 1.5, fillOpacity: .3,
                                where: "AOI_ID =" + this.ID + "",
                                pane: 'AOIfeature'
                            }).addTo(AOI.map);
                        }

                        this.layer.on("load", function (evt) {
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
                                AOI.map.fitBounds(mbounds);

                                AOI.layer.off('load'); // unwire the event listener so that it only fires once when the page is loaded or again on error
                            }
                            catch (err) {
                                //for some reason if we are zoomed in elsewhere and the bounds of this object are not in the map view, we can't read bounds correctly.
                                //so for now we will zoom out on error and allow this event to fire again.

                                AOI.map.setView([33.51, -78.3], 6); //it should try again.
                            }
                        });

                        this.isVisible = true;

                    },
                    hide: function () {
                        if (this.isVisible) {
                            AOI.map.removeLayer(this.layer);
                        }
                        AOI.map.setView([33.51, -78.3], 6);
                        this.isVisible = false;
                    },
                    zoomTo: function () {

                        var mbounds = L.latLngBounds([]);
                        // loop through the features returned by the server
                        this.layer.eachFeature(function (layer) {
                            // get the bounds of an individual feature
                            var layerBounds = layer.getBounds();
                            // extend the bounds of the collection to fit the bounds of the new feature
                            mbounds.extend(layerBounds);
                        });
                        AOI.map.fitBounds(mbounds);


                    },
                    isVisible: false,
                    loadData: function (AOI_ID, name) {

                        this.display(AOI_ID);

                        var vm = this;

                        vm.name = name;
                        vm.windrpLayer = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[0].num,
                            pane: 'optionalfeature0',
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

                        vm.windLeaseLayer = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[1].num,
                            pane: 'optionalfeature1',
                            style: function (feature) {

                                return {color: 'white', weight: 1, fillOpacity: .5};
                            }
                        });
                        vm.windPlanningLayer = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[2].num,
                            pane: 'optionalfeature2',
                            style: function (feature) {

                                return {color: 'Black', weight: 1, fillOpacity: .5};
                            }
                        });
                        vm.oceanDisposalSites = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[3].num,
                            pane: 'optionalfeature3',
                            style: function (feature) {
                                return {fillColor: '#FFA7A7', color: '#4A4A4A', weight: 1.5, fillOpacity: .5};
                            }
                        });
                        vm.marineMineralsLeases = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[4].num,
                            pane: 'optionalfeature4',
                            style: function (feature) {
                                return {color: '#7300D9', weight: 2, fillOpacity: 0};
                            }
                        });


                        vm.HydrokineticLeases = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[6].num,
                            pane: 'optionalfeature6',
                            pointToLayer: function (feature, latlng) {
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: 'img/HydrokineticLeasesGraphic.svg',
                                        iconSize: [32, 37],
                                        iconAnchor: [16, 37],
                                        popupAnchor: [0, -28]
                                    })
                                });
                            }
                        });

                        vm.wavePower = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[8].num,
                            pane: 'optionalfeature8',
                            style: function (feature) {
                                if (feature.properties.ann_wef > 40) {
                                    return {color: '#B0B497', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.ann_wef > 30.0) {
                                    return {color: '#B6BC9E', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.ann_wef > 20.0) {
                                    return {color: '#BBC1A4', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.ann_wef > 15.0) {
                                    return {color: '#C0C6A8', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.ann_wef > 10.0) {
                                    return {color: '#C9D0B1', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.ann_wef > 8.0) {
                                    return {color: '#D0D8B9', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.ann_wef > 6) {
                                    return {color: '#D5DDC0', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.ann_wef > 4.0) {
                                    return {color: '#DEE7C9', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.ann_wef > 2.0) {
                                    return {color: '#E4EFD2', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.ann_wef < 2.01) {
                                    return {color: '#EBF6D8', weight: 1, fillOpacity: .8};
                                } else {
                                    return {color: 'white', weight: 1, fillOpacity: .8};
                                }
                            }
                        });

                        vm.tidalPower = L.esri.dynamicMapLayer({
                            url: config.ortMapServer,
                            pane: 'optionalfeature9',
                            layers: [ortLayerOptional[9].num],
                            opacity: .8
                        });

                        vm.currentPower = L.esri.dynamicMapLayer({
                            url: config.ortMapServer,
                            pane: 'optionalfeature10',
                            layers: [ortLayerOptional[10].num],
                            opacity: .8
                        });

                        vm.beachNourish = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[11].num,
                            pane: 'optionalfeature11',
                            style: function (feature) {
                                return {color: '#8B572A', weight: 4, fillOpacity: 0};
                            }
                        });

                        vm.coastalEnergyFacilities = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[16].num,
                            pane: 'optionalfeature16',
                            pointToLayer: function (feature, latlng) {
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: 'img/CoastalEnergyGraphic.svg',
                                        iconSize: [32, 37],
                                        iconAnchor: [16, 37],
                                        popupAnchor: [0, -28]
                                    })
                                });
                            }
                        });

                        vm.CEElevation = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[26].num,
                            pane: 'optionalfeature26',
                            style: function (feature) {
                                return {color: '#3283BB', weight: 2, fillOpacity: 0};
                            }
                        });
                        vm.TISubmarineLayer = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[34].num,
                            pane: 'optionalfeature34',
                            style: function (feature) {
                                return {color: '#880cf4', weight: 2, fillOpacity: 0};
                            }
                        });
                        vm.TIDangerZonesLayer = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[35].num,
                            pane: 'optionalfeature35',

                            style: function (feature) {
                                if (feature.properties.agencyOfUse === 'NASA') {
                                    return {color: '#1a5dad', weight: 1, fillOpacity: .7};
                                } else if (feature.properties.agencyOfUse === 'U.S. Air Force') {
                                    return {color: '#7dc7ec', weight: 1, fillOpacity: .7};
                                } else if (feature.properties.agencyOfUse === 'U.S. Army') {
                                    return {color: '#ffd800', weight: 1, fillOpacity: .7};
                                } else if (feature.properties.agencyOfUse === 'U.S. Marine Corps') {
                                    return {color: '#b6100c', weight: 1, fillOpacity: .7};
                                } else if (feature.properties.agencyOfUse === 'U.S. Navy') {
                                    return {color: '#1c2f6b', weight: 1, fillOpacity: .7};
                                } else if (feature.properties.agencyOfUse === 'U.S. Coast Guard') {
                                    return {color: '#f3871a', weight: 1, fillOpacity: .7};
                                } else {
                                    return {color: '#b1b1b1', weight: 1, fillOpacity: .7};
                                }
                            }
                        });

                        vm.CEPlaceLayer = L.esri.featureLayer({
                            url: config.ortMapServer + [ortLayerOptional[36].num],
                            pane: 'optionalfeature36',
                            pointToLayer: function (feature, latlng) {
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: 'img/Map_marker.svg',
                                        iconSize: [32, 37],
                                        iconAnchor: [16, 37],
                                        popupAnchor: [0, -28]
                                    })
                                }).bindPopup(feature.properties.NAME);
                            }
                        });
                        vm.TIPrincipalPortsLayer = L.esri.featureLayer({
                            url: config.ortMapServer + [ortLayerOptional[39].num],
                            pane: 'optionalfeature39',
                            pointToLayer: function (feature, latlng) {
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: 'img/transportation-anchor.svg',
                                        iconSize: [32, 37],
                                        iconAnchor: [16, 37],
                                        popupAnchor: [0, -28]
                                    })
                                });
                            }
                        });
                        vm.NRCReefsLayer = L.esri.featureLayer({
                            url: config.ortMapServer + [ortLayerOptional[41].num],
                            pane: 'optionalfeature41',
                            pointToLayer: function (feature, latlng) {
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: 'img/svg-elements_reefs.svg',
                                        iconSize: [32, 37],
                                        iconAnchor: [16, 37],
                                        popupAnchor: [0, -28]
                                    })
                                });
                            }
                        });
                        vm.CETribalLayer = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[37].num,
                            pane: 'optionalfeature37',
                            style: function (feature) {
                                return {fillColor: '#ffffbe', color: '#e69901', weight: 1.5, fillOpacity: .5};
                            }
                        });
                        vm.NRCNearbyLayer = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[40].num,
                            pane: 'optionalfeature40',
                            style: function (feature) {
                                return {color: '#75bc73', weight: 1.5, fillOpacity: .7};
                            }
                        });
                        vm.NRCBarrierLayer = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[44].num,
                            pane: 'optionalfeature44',
                            style: function (feature) {
                                return {color: '#d6ce70', weight: 1.5, fillOpacity: .7};
                            }
                        });

                        vm.TIVessels = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[38].num,
                            pane: 'optionalfeature38',
                            style: function (feature) {
                                if (feature.properties.all_2011 > 1500) {
                                    return {color: '#d4321e', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.all_2011 > 750) {
                                    return {color: '#ee815e', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.all_2011 > 250) {
                                    return {color: '#fbd39e', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.all_2011 > 75) {
                                    return {color: '#d9dec1', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.all_2011 > 0) {
                                    return {color: '#a7b9c8', weight: 1, fillOpacity: .8};
                                } else if (feature.properties.all_2011 = 0) {
                                    return {color: '#4776b3', weight: 1, fillOpacity: .8};
                                } else {
                                    return {color: '#4776b3', weight: 1, fillOpacity: .8};
                                }
                            }
                        });

                        vm.NRCSoftCoralLayer = L.esri.dynamicMapLayer({
                            url: config.ortMapServer,
                            pane: 'optionalfeature42',
                            layers: [ortLayerOptional[42].num],
                            opacity: .8
                        });
                        vm.NRCStoneyCoralLayer = L.esri.dynamicMapLayer({
                            url: config.ortMapServer,
                            pane: 'optionalfeature43',
                            layers: [ortLayerOptional[43].num],
                            opacity: .8
                        });
                        vm.ECCoastalCountiesLayer = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[32].num,
                            pane: 'optionalfeature32',
                            style: function (feature) {
                                return {color: '#b613ba', weight: 1.5, fillOpacity: 0};
                            }
                        });

                        var query = L.esri.query({
                            url: config.ortMapServer + config.ortLayerData
                        });

                        if (vm.ID === -9999) {
                            var featureCollection = JSON.parse(JSON.stringify(vm.featureCollection));

                            var newarray = [];
                            angular.forEach(featureCollection.features, function (feature) {
                                var newobject = {};
                                angular.forEach(featureCollection.fields, function (field) {
                                    newobject[field.name] = feature.attributes[field.name];
                                });
                                newarray.push(newobject);
                            });

                            vm.massageData(newarray);

                        } else {
                            query.returnGeometry(false).where("AOI_ID =" + vm.ID + "").run(function (error, featureCollection, response) {

                                var newarray = [];
                                angular.forEach(featureCollection.features, function (feature) {
                                    var newobject = {};
                                    angular.forEach(response.fields, function (field) {
                                        newobject[field.name] = feature.properties[field.name];
                                    });
                                    newarray.push(newobject);
                                });
                                //the idea here is , since the two arrays that can make it to .massageData are organized differently, we need to parse them into a known structure.

                                vm.massageData(newarray);
                            });
                        }
                        vm.isLoaded = true;
                    }
                    ,

                    massageData: function (featureCollection) {
                        var vm = this;
                        var k = 0;
                        var ba = 0;
                        var bb = 0;
                        var bc = 0;
                        var bd = 0;
                        var be = 0;
                        var bf = 0;
                        var bg = 0;
                        var bh = 0;
                        var bi = 0;
                        var bj = 0;
                        var bk = 0;
                        var bl = 0;
                        var bm = 0;
                        var bn = 0;
                        var bo = 0;
                        var bp = 0;
                        var bq = 0;
                        var br = 0;
                        var bs = 0;
                        var bt = 0;
                        var bu = 0;
                        var bv = 0;
                        var bw = 0;
                        var bx = 0;
                        var by = 0;
                        var bz = 0;
                        var ca = 0;
                        var cb = 0;
                        var cc = 0;
                        var cd = 0;
                        var ce = 0;
                        var cf = 0;
                        var cg = 0;
                        var ch = 0;
                        var ci = 0;
                        var cj = 0;
                        var ck = 0;
                        var cl = 0;
                        var cm = 0;
                        var cn = 0;
                        var co = 0;
                        var cp = 0;
                        var cq = 0;
                        var cr = 0;
                        var cs = 0;
                        var ct = 0;
                        var cu = 0;
                        var cv = 0;

                        var ack = [];

                        for (var i = 0, j = featureCollection.length; i < j; i++) {
                            switch (featureCollection[i].DATASET_NM) {
                                case "Anchorage_Areas":
                                    vm.TIAnchorage[cv] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Name: (featureCollection[i].Name || 'Unknown'),
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 0)


                                    };


                                    if ((cv === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cv++;
                                    break;
                                case "Pilot_Boarding_Areas":
                                    vm.TIPilot[cu] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0)


                                    };


                                    if ((cu === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cu++;
                                    break;
                                case "SATL_FishRevenue_AllYrs":
                                    vm.ECFishRevenue[ct] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        FishingRev_value_min: (featureCollection[i].FishingRev_value_min || 0),
                                        FishingRev_value_max: (featureCollection[i].FishingRev_value_max || 0),
                                        FishingRev_total: (featureCollection[i].FishingRev_total || 0)


                                    };


                                    if ((ct === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    ct++;
                                    break;
                                case "CBRAs":
                                    vm.NRCBarrier[cs] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0)


                                    };


                                    if ((cs === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cs++;
                                    break;
                                case "ArtificialReefs":
                                    vm.NRCReefs[cr] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0)


                                    };


                                    if ((cr === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cr++;
                                    break;
                                case "StonyCoralALL":
                                    vm.NRCStonyCoral[cq] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),

                                        Coral_Suitability: (featureCollection[i].Coral_Suitability || '')


                                    };


                                    if ((cq === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cq++;
                                    break;
                                case "SoftCoralALL":
                                    vm.NRCSoftCoral[cp] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),

                                        Coral_Suitability: (featureCollection[i].Coral_Suitability || '')


                                    };


                                    if ((cp === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cp++;
                                    break;
                                case "MPA_selected":
                                    vm.NRCNearby[co] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Site_Name: (featureCollection[i].Site_Name || 'Unknown'),
                                        URL: (featureCollection[i].URL || '')


                                    };


                                    if ((co === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    co++;
                                    break;
                                case "PrincipalPorts":
                                    vm.TIPrincipalPorts[cn] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        PortName: (featureCollection[i].PortName || 'Unknown'),
                                        Total: (featureCollection[i].Total || 0),
                                        Dist_Mi: (featureCollection[i].Dist_Mi || 0)


                                    };


                                    if ((cn === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cn++;
                                    break;
                                case "vessel_traffic_atl_2011":
                                    vm.TIVessel[cm] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        all_2011_avg: (featureCollection[i].all_2011_avg || 0)


                                    };


                                    if ((cm === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cm++;
                                    break;
                                case "RightWhales":
                                    vm.TIRightWhale[cl] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 0)


                                    };


                                    if ((cl === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cl++;
                                    break;
                                case "ShippingLanes":
                                    vm.TIShipping[ck] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        THEMELAYER: (featureCollection[i].THEMELAYER || 'Unknown'),
                                        THEMELAYER_CNT: (featureCollection[i].THEMELAYER_CNT || 'Unknown')

                                    };
                                    vm.TIShippingTotal += featureCollection[i].THEMELAYER_CNT;

                                    if ((ck === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    ck++;
                                    break;

                                case "Places":
                                    vm.CEPlaces[cj] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Name: (featureCollection[i].Name || 'Unknown'),
                                        ST: (featureCollection[i].ST || 'Unknown'),
                                        Dist_Mi: (featureCollection[i].Dist_Mi || 0),
                                        Census2010: ((featureCollection[i].Census2010 === -1) ? ' ' : (featureCollection[i].Census2010 || ' '))

                                    };


                                    if ((cj === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cj++;
                                    break;
                                case "CoastalStates":
                                case "Coastal_Shoreline_Counties_2010":
                                    vm.ECCountyGDP[ci] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        cntyname: (featureCollection[i].cntyname || featureCollection[i].st_name),
                                        MedHHInc: (featureCollection[i].MedHHInc || 0),
                                        TotalHouses: (featureCollection[i].TotalHouses || 0),
                                        Population: (featureCollection[i].Population || 0),
                                        PercentTotGDP: (featureCollection[i].PercentTotGDP || 0)

                                    };


                                    if ((ci === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    ci++;
                                    break;


                                case "ENOW_2013":


                                    vm.ECEcon[cg] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Name: (featureCollection[i].Name || 'Unknown'),
                                        cntyname: (featureCollection[i].cntyname || 'Unknown'),
                                        st_name: (featureCollection[i].st_name || 'Unknown'),
                                        OceanSector: (featureCollection[i].OceanSector || 'Unknown'),
                                        Employment: (featureCollection[i].Employment || 0),
                                        Wages: (featureCollection[i].Wages || 0),
                                        GDP: (featureCollection[i].GDP || 0),

                                        Emp_LivingResources: (featureCollection[i].Emp_LivingResources || 0),
                                        Emp_MarineConstruction: (featureCollection[i].Emp_MarineConstruction || 0),
                                        Emp_MarineTransp: (featureCollection[i].Emp_MarineTransp || 0),
                                        Emp_OffshoreMineralExt: (featureCollection[i].Emp_OffshoreMineralExt || 0),
                                        Emp_ShipAndBoatBuilding: (featureCollection[i].Emp_ShipAndBoatBuilding || 0),
                                        Emp_TourismAndRec: (featureCollection[i].Emp_TourismAndRec || 0),
                                        Wages_LivingResources: (featureCollection[i].Wages_LivingResources || 0),
                                        Wages_MarineConstruction: (featureCollection[i].Wages_MarineConstruction || 0),
                                        Wages_MarineTransp: (featureCollection[i].Wages_MarineTransp || 0),
                                        Wages_OffshoreMineralExt: (featureCollection[i].Wages_OffshoreMineralExt || 0),
                                        Wages_ShipAndBoatBuilding: (featureCollection[i].Wages_ShipAndBoatBuilding || 0),
                                        Wages_TourismAndRec: (featureCollection[i].Wages_TourismAndRec || 0),

                                        GDP_LivingResources: ((featureCollection[i].GDP_LivingResources === -9999) ? 0 : (featureCollection[i].GDP_LivingResources || 0)),
                                        GDP_MarineConstruction: ((featureCollection[i].GDP_MarineConstruction === -9999) ? 0 : (featureCollection[i].GDP_MarineConstruction || 0)),
                                        GDP_MarineTransp: ((featureCollection[i].GDP_MarineTransp === -9999) ? 0 : (featureCollection[i].GDP_MarineTransp || 0)),
                                        GDP_OffshoreMineralExt: ((featureCollection[i].GDP_OffshoreMineralExt === -9999) ? 0 : (featureCollection[i].GDP_OffshoreMineralExt || 0)),
                                        GDP_ShipAndBoatBuilding: ((featureCollection[i].GDP_ShipAndBoatBuilding === -9999) ? 0 : (featureCollection[i].GDP_ShipAndBoatBuilding || 0)),
                                        GDP_TourismAndRec: ((featureCollection[i].GDP_TourismAndRec === -9999) ? 0 : (featureCollection[i].GDP_TourismAndRec || 0))


                                    };
                                    switch (featureCollection[i].OceanSector) {
                                        case "All Ocean Sectors":
                                            vm.ECEconEmploy[vm.ECEconEmploy.length] = [(featureCollection[i].cntyname || featureCollection[i].st_name), (featureCollection[i].Employment || 0)];
                                            vm.ECEconGDP[vm.ECEconGDP.length] = [(featureCollection[i].cntyname || featureCollection[i].st_name), (featureCollection[i].GDP || 0)];
                                            vm.ECEconWages[vm.ECEconWages.length] = [(featureCollection[i].cntyname || featureCollection[i].st_name), (featureCollection[i].Wages || 0)];
                                            break;

                                    }

                                    if ((cg === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cg++;
                                    break;
                                case "NMFS_HMS_Fish":
                                    vm.NRCMigratoryFish[ce] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        LIFE_STAGE: (featureCollection[i].LIFE_STAGE || 'Unknown'),
                                        SPECIES: (featureCollection[i].SPECIES || 'Unknown'),
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 'Unknown')

                                    };

                                    if ((ce === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    ce++;
                                    break;

                                case "NMFS_HMS_Sharks":
                                    vm.NRCMigratorySharks[cf] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        LIFE_STAGE: (featureCollection[i].LIFE_STAGE || 'Unknown'),
                                        SPECIES: (featureCollection[i].SPECIES || 'Unknown'),
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 'Unknown')

                                    };

                                    if ((cf === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cf++;
                                    break;
                                case "NMFS_CHD_SouthAtl":
                                    vm.NRCCriticalHab[cd] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        AREANAME: (featureCollection[i].AREANAME || 'Unknown'),
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 'Unknown')

                                    };

                                    if ((cd === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cd++;
                                    break;
                                case "SERO_HAPC_PartK":
                                    vm.NRCHabConcern[cc] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        AREA_NAME: (featureCollection[i].AREA_NAME || 'Unknown'),
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 'Unknown')

                                    };

                                    if ((cc === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cc++;
                                    break;
                                case "Danger_Zones_and_Restricted_Areas":
                                    vm.TIDangerZones[cb] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        boundaryType: (featureCollection[i].boundaryType || 'Unknown'),
                                        agencyOfUse: (featureCollection[i].agencyOfUse || 'Unknown'),
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 'Unknown'),
                                        Style: 'c_' + (featureCollection[i].agencyOfUse || 'Unknown').substr(-4, 4)

                                    };

                                    if ((cb === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    cb++;
                                    break;
                                case "Coastal_Maintained_Channels":
                                    vm.TICoastal[ca] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0)


                                    };

                                    if ((ca === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    ca++;
                                    break;
                                case "SubmarineCables":
                                    vm.TISubmarine[bz] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Owner: (featureCollection[i].Owner || 'Unknown'),
                                        STATUS: (featureCollection[i].STATUS || 'Unknown'),
                                        OwnerStatus: (featureCollection[i].Owner || 'Unknown') + " - " + (featureCollection[i].STATUS || 'Unknown')


                                    };

                                    if ((bz === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bz++;
                                    break;
                                case "FederalAndStateWaters":
                                    vm.CEFederalAndState[by] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        jurisdiction: (featureCollection[i].jurisdiction || 'Unknown'),
                                        perc_jurisdiction: (featureCollection[i].perc_jurisdiction || 'Unknown'),
                                        Area_mi2: (featureCollection[i].Area_mi2 || 'Unknown')

                                    };

                                    if ((by === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }

                                    if (featureCollection[i].TOTAL_CNT > 0) {

                                        if ((featureCollection[i].jurisdiction.substring(0, 3)) === "Fed") {

                                            vm.CEFederalTotal = parseInt(vm.CEFederalTotal, 10) + parseInt(featureCollection[i].Area_mi2, 10);


                                        } else  vm.CEStateTotal = parseInt(vm.CEStateTotal, 10) + parseInt(featureCollection[i].Area_mi2, 10);

                                    }

                                    by++;
                                    break;
                                case "CoastalCounties":
                                    vm.CECoastalCounties[bx] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        cntyname: (featureCollection[i].cntyname || 'Unknown'),
                                        st_abbr: (featureCollection[i].st_abbr || 'Unknown'),
                                        ctystate: (featureCollection[i].st_abbr || 'Unknown'),
                                        st_name: (featureCollection[i].st_name || 'Unknown')
                                    };

                                    if ((bx === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bx++;
                                    break;
                                case "Coastal_State_Legislative_Districts_House":
                                    vm.CEHouse[bv] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        NAMELSAD: (featureCollection[i].NAMELSAD || 'Unknown'),
                                        stateName: (featureCollection[i].stateName || 'Unknown')


                                    };

                                    if ((bv === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bv++;
                                    break;
                                case "Coastal_State_Legislative_Districts_Senate":
                                    vm.CESenate[bw] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        NAMELSAD: (featureCollection[i].NAMELSAD || 'Unknown'),
                                        stateName: (featureCollection[i].stateName || 'Unknown')


                                    };

                                    if ((bw === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bw++;
                                    break;
                                case "Coastal_Congressional_Districts_114th":
                                    vm.CECongress[bu] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        NAMELSAD: (featureCollection[i].NAMELSAD || 'Unknown'),
                                        stateName: (featureCollection[i].stateName || 'Unknown')


                                    };

                                    if ((bu === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bu++;
                                    break;
                                case "FederalGeoRegulations":
                                    vm.CEFedGeoRegs[bt] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        FederalGeoRegulationsName: (featureCollection[i].FederalGeoRegulationsName || 'Unknown'),
                                        FederalGeoRegulationsID: (featureCollection[i].FederalGeoRegulationsID || 'Unknown'),
                                        DescriptionURL: (featureCollection[i].DescriptionURL || '')


                                    };

                                    if ((bt === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bt++;
                                    break;
                                case "AOI_input":
                                    vm.CEAreaOfPoly[bs] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Area_mi2: (featureCollection[i].Area_mi2 || 'Unknown'),
                                        Area_km2: (featureCollection[i].Area_km2 || 'Unknown'),
                                        Area_nm2: (featureCollection[i].Area_nm2 || 'Unknown')

                                    };


                                    bs++;
                                    break;
                                case "crm_v1":
                                    vm.CEElevation[br] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        depth_min_m: (featureCollection[i].depth_min_m || 'Unknown'),
                                        depth_max_m: (featureCollection[i].depth_max_m || 'Unknown'),
                                        depth_mean_m: (featureCollection[i].depth_mean_m || 'Unknown')

                                    };

                                    if ((br === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    br++;
                                    break;
                                case "CoastalEnergyFacilities":
                                    vm.coastfac[bq] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Name: (featureCollection[i].Name || 'None'),
                                        Type: (featureCollection[i].Type || 'None'),
                                        CAPACITY: (featureCollection[i].CAPACITY || 'None'),
                                        Dist_Mi: (featureCollection[i].Dist_Mi || 'None')

                                    };

                                    if ((bq === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bq++;
                                    break;
                                case "OG_ResourcePotential":
                                    vm.OGresource[bp] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        OCS_Play: (featureCollection[i].OCS_Play || 'None'),
                                        UTRR_Oil: (featureCollection[i].UTRR_Oil || 'None'),
                                        UTRR_Gas: (featureCollection[i].UTRR_Gas || 'None'),
                                        UTRR_BOE: (featureCollection[i].UTRR_BOE || 'None')

                                    };

                                    if ((bp === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bp++;
                                    break;
                                case "OG_Wells":
                                    vm.OGWells[bo] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        COMPANY_NA: (featureCollection[i].COMPANY_NA || 'None'),
                                        STATUS: (featureCollection[i].STATUS || 'None')

                                    };

                                    if ((bo === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bo++;
                                    break;
                                case "al_20160301":
                                    vm.OGLease[bn] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Lease_Numb: (featureCollection[i].Lease_Numb || 'None'),
                                        Lease_expt: (featureCollection[i].Lease_expt || 'None')

                                    };

                                    if ((bn === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bn++;
                                    break;
                                case "OilandGasPlanningAreas":
                                    vm.OGPlanA[bm] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Region: (featureCollection[i].Region || 'unknown')

                                    };

                                    if ((bm === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bm++;
                                    break;
                                case "SC_BeachProjects":
                                    vm.beachNur[bl] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        BEACH_AREA: (featureCollection[i].BEACH_AREA || 'unknown'),
                                        YEAR: (featureCollection[i].YEAR || '0'),
                                        SAND_VOL_C: (featureCollection[i].SAND_VOL_C || '0'),
                                        Dist_Mi: ((featureCollection[i].Dist_Mi === ' ') ? '0' : featureCollection[i].Dist_Mi )
                                    };

                                    if ((bl === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bl++;
                                    break;
                                case "us_oc_ms":
                                    vm.currentpwr[bk] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        AVG_OCEAN_CURRENT: (featureCollection[i].AVG_OCEAN_CURRENT || 0),
                                        SUITABILITY_OCEAN_SPEED: (featureCollection[i].SUITABILITY_OCEAN_SPEED || 'NO')
                                    };

                                    if ((featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bk++;
                                    break;
                                case "usa_mc_wm":
                                    vm.tidalpwr[bj] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        AVG_TIDAL_CURRENT: (featureCollection[i].AVG_TIDAL_CURRENT || 0),
                                        SUITABILITY_TIDAL_DEPTH: (featureCollection[i].SUITABILITY_TIDAL_DEPTH || 'NO'),
                                        SUITABILITY_TIDAL_AREA: (featureCollection[i].SUITABILITY_TIDAL_AREA || 'NO'),
                                        SUITABILITY_TIDAL_SPEED: (featureCollection[i].SUITABILITY_TIDAL_SPEED || 'NO')
                                    };

                                    if ((featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bj++;
                                    break;
                                case "OceanWaveResourcePotential":
                                    vm.wavepwr[bi] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        AVG_WAVE_POWER: (featureCollection[i].AVG_WAVE_POWER || 0),
                                        SUITABILITY_OCEAN_POWER: (featureCollection[i].SUITABILITY_OCEAN_POWER || 'Unknown')
                                    };

                                    if ((featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bi++;
                                    break;

                                case "OceanDisposalSites":
                                    vm.disp[be] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        PRIMARY_USE: (featureCollection[i].primaryUse || 'Unknown')
                                    };

                                    if ((be === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    be++;
                                    break;
                                case "MarineHydrokineticProjects":
                                    if (featureCollection[i].TOTAL_CNT > 0) {
                                        vm.hydrok[bg] = {
                                            TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                            PRIMARY_USE: (featureCollection[i].energyType ) + ' projects'
                                        };
                                    }
                                    if ((bg === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }

                                    bg++;

                                    break;
                                case "ecstdb2014":
                                    if (featureCollection[i].TOTAL_CNT > 0) {
                                        vm.surfsed[bh] = {
                                            TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                            PRIMARY_USE: ((featureCollection[i].CLASSIFICA === ' ') ? 'Unknown' : featureCollection[i].CLASSIFICA )
                                        };
                                    }
                                    if ((bh === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bh++;

                                    break;

                                case "Sand_n_GravelLeaseAreas": //aka Marine Minerals Leases
                                    vm.mml[bf] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0)

                                    };

                                    if ((bf === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bf++;
                                    break;

                                case "TribalLands":
                                    vm.CETribalLands[bd] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        NAMELSAD: (featureCollection[i].NAMELSAD || 'Unknown'),
                                        Dist_Mi: (featureCollection[i].Dist_Mi || 0)
                                    };
                                    if ((bd === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bd++;
                                    break;


                                case  "BOEM_Wind_Planning_Areas":
                                    vm.boem[ba] = {
                                        INFO: featureCollection[i].INFO,
                                        PROT_NUMBE: featureCollection[i].PROT_NUMBE,
                                        LINK1: featureCollection[i].LINK1,
                                        LINK2: featureCollection[i].LINK2,
                                        PERC_COVER: featureCollection[i].PERC_COVER,
                                        TOTAL_BLOC: featureCollection[i].TOTAL_BLOC,
                                        TOTAL_CNT: featureCollection[i].TOTAL_CNT,
                                        METADATA_URL: featureCollection[i].METADATA_URL
                                    };
                                    if ((ba === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };

                                        k++;

                                    }

                                    ba++;
                                    break;
                                case "ActiveRenewableEnergyLeases":
                                    vm.arel[bc] = {
                                        Lease_Numb: featureCollection[i].Lease_Numb,
                                        Company: featureCollection[i].Company,
                                        INFO: featureCollection[i].INFO,
                                        PROT_NUMBE: featureCollection[i].PROT_NUMBE,
                                        LINK1: featureCollection[i].LINK1,
                                        LINK2: featureCollection[i].LINK2,
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 0),
                                        TOTAL_BLOC: (featureCollection[i].TOTAL_BLOC || 0),
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        METADATA_URL: featureCollection[i].METADATA_URL
                                    };
                                    if ((bc === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    bc++;
                                    break;
                                case  "WindResourcePotential":
                                    vm.wind[bb] = {
                                        WIND_CLASS: (featureCollection[i].WIND_CLASS),
                                        AVG_WGHT: (featureCollection[i].AVG_WGHT || 0).toFixed(2),
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 0),
                                        HOUSES_SUM: (featureCollection[i].HOUSES_SUM || 0).toLocaleString(),
                                        CAPACITY: (featureCollection[i].CAPACITY || 0).toLocaleString(),
                                        TOTAL_BLOC: (featureCollection[i].TOTAL_BLOC || 0),
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        METADATA_URL: featureCollection[i].METADATA_URL
                                    };
                                    if ((bb === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        vm.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV,
                                            METADATA_SORT: featureCollection[i].METADATA_SORT
                                        };
                                        k++;
                                    }


                                    if (featureCollection[i].TOTAL_CNT > 0) {
                                        switch (featureCollection[i].WIND_CLASS.substring(0, 3)) {
                                            case "Sup":
                                                vm.windclass[0] = featureCollection[i].PERC_COVER;
                                                break;
                                            case "Out":
                                                vm.windclass[1] = featureCollection[i].PERC_COVER;
                                                break;
                                            case "Exc":
                                                vm.windclass[2] = featureCollection[i].PERC_COVER;
                                                break;
                                            case "Goo":
                                                vm.windclass[3] = featureCollection[i].PERC_COVER;
                                                break;
                                            case "Fai":
                                                vm.windclass[4] = featureCollection[i].PERC_COVER;
                                                break;
                                            case "Uns":
                                                vm.windclass[5] = featureCollection[i].PERC_COVER;
                                                break;
                                        }

                                    }
                                    bb++;
                                    break;
                            }
                        }


                        var y = 35;
                        var x = 35;
                        var chartrow = 1;

                        for (i = 0; i < vm.ECEcon.length; i++) {

                            if (i && (i % 3 === 0)) {
                                y += 120;
                                x = 35;
                                chartrow++;
                            } else if (i) x += 135;

                            vm.OceanJobContributionsSeries[i] = {
                                center: [x, y],
                                "name": vm.ECEcon[i].Name,
                                "showInLegend": (i === 0 ? true : false),
                                "data": [
                                    ["Marine Construction", vm.ECEcon[i].GDP_MarineConstruction],
                                    ["Living Resources", vm.ECEcon[i].GDP_LivingResources],
                                    ["Marine Transportation", vm.ECEcon[i].GDP_MarineTransp],
                                    ["Offshore Mineral Extraction", vm.ECEcon[i].GDP_OffshoreMineralExt],
                                    ["Ship and Boat Building", vm.ECEcon[i].GDP_ShipAndBoatBuilding],
                                    ["Tourism and Recreation", vm.ECEcon[i].GDP_TourismAndRec]
                                ],
                                title: {

                                    style: {color: '#4a4a4a'},
                                    align: 'center',
                                    format: '{name}',
                                    verticalAlign: 'top',
                                    y: -20
                                }
                            }

                        }
                        vm.OceanJobContributionsChartHeight = ((chartrow * 120) + 18);


                        if (vm.wavepwr.length > 0) {
                            if (vm.wavepwr[0].AVG_WAVE_POWER > 40) {
                                vm.wavepwr[0].COLOR = '#B0B497';
                            } else if (vm.wavepwr[0].AVG_WAVE_POWER > 30.0) {
                                vm.wavepwr[0].COLOR = '#B6BC9E';
                            } else if (vm.wavepwr[0].AVG_WAVE_POWER > 20.0) {
                                vm.wavepwr[0].COLOR = '#BBC1A4';
                            } else if (vm.wavepwr[0].AVG_WAVE_POWER > 15.0) {
                                vm.wavepwr[0].COLOR = '#C0C6A8';
                            } else if (vm.wavepwr[0].AVG_WAVE_POWER > 10.0) {
                                vm.wavepwr[0].COLOR = '#C9D0B1';
                            } else if (vm.wavepwr[0].AVG_WAVE_POWER > 8.0) {
                                vm.wavepwr[0].COLOR = '#D0D8B9';
                            } else if (vm.wavepwr[0].AVG_WAVE_POWER > 6) {
                                vm.wavepwr[0].COLOR = '#D5DDC0';
                            } else if (vm.wavepwr[0].AVG_WAVE_POWER > 4.0) {
                                vm.wavepwr[0].COLOR = '#DEE7C9';

                            } else if (vm.wavepwr[0].AVG_WAVE_POWER > 2.0) {
                                vm.wavepwr[0].COLOR = '#E4EFD2';
                            } else if (vm.wavepwr[0].AVG_WAVE_POWER < 2.01) {
                                vm.wavepwr[0].COLOR = '#EBF6D8';
                            } else {
                                vm.wavepwr[0].COLOR = 'white';
                            }
                        }
                        vm.windclass[6] = (vm.windclass.reduce(function (prev, cur) {
                            return prev.toFixed(2) - cur.toFixed(2);
                        }, 100));
                        if (vm.boem[0] == null) {
                            vm.boem[0] = {
                                INFO: "NA",
                                PROT_NUMBE: 0,
                                LINK1: "NA",
                                LINK2: "NA",
                                PERC_COVER: 0,
                                TOTAL_BLOC: 0,
                                TOTAL_CNT: 0
                            };
                        }
                        if (vm.arel[0] == null) {
                            vm.arel[0] = {
                                Lease_Numb: 0,
                                Company: "NA",
                                INFO: "NA",
                                PROT_NUMBE: 0,
                                LINK1: "NA",
                                LINK2: "NA",
                                PERC_COVER: 0,
                                TOTAL_BLOC: 0,
                                TOTAL_CNT: 0
                            };
                        }
                        vm.TIPrincipalPorts.sort(function (a, b) {
                            return parseFloat(a.Dist_Mi) - parseFloat(b.Dist_Mi);
                        });
                        vm.CEPlaces.sort(function (a, b) {
                            return parseFloat(a.Dist_Mi) - parseFloat(b.Dist_Mi);
                        });
                        vm.boem.sort(function (a, b) {
                            return parseFloat(b.PERC_COVER) - parseFloat(a.PERC_COVER);
                        });
                        vm.arel.sort(function (a, b) {
                            return parseFloat(b.PERC_COVER) - parseFloat(a.PERC_COVER);
                        });

                        if (vm.boem[0].TOTAL_CNT === 0) {
                            vm.boem[0].PERC_COVER = 0;
                            vm.boem[0].TOTAL_BLOC = 0;
                        }
                        if (vm.arel[0] == null)vm.arel[0].TOTAL_CNT = 0;
                        if (vm.arel[0].TOTAL_CNT === 0) {
                            vm.arel[0].PERC_COVER = 0;
                            vm.arel[0].TOTAL_BLOC = 0;
                        }
                        this.loadWindChart();
                        this.loadStateChart();
                        this.loadOceanJobEmployeesChart();
                        this.loadOceanJobDollarsChart();
                        this.loadOceanJobContributionsChart();
                        //because? and until all direct DOM manipulation is removed from code, this $apply is useful to clear some digest issue that appear as timing issues.
                        if (vm.ID !== -9999)  $rootScope.$apply();


                    },
                    unloadData: function () {
                        if (this.isLoaded) {

                            AOI.map.removeLayer(this.oceanDisposalSites);
                            AOI.map.removeLayer(this.HydrokineticLeases);
                            AOI.map.removeLayer(this.windPlanningLayer);
                            AOI.map.removeLayer(this.windLeaseLayer);
                            AOI.map.removeLayer(this.windrpLayer);
                            AOI.map.removeLayer(this.marineMineralsLeases);
                            AOI.map.removeLayer(this.wavePower);
                            AOI.map.removeLayer(this.tidalPower);
                            AOI.map.removeLayer(this.currentPower);
                            AOI.map.removeLayer(this.beachNourish);
                            AOI.map.removeLayer(this.coastalEnergyFacilities);
                            AOI.map.removeLayer(this.CEElevation);
                            AOI.map.removeLayer(this.TISubmarineLayer);
                            AOI.map.removeLayer(this.TIDangerZonesLayer);
                            AOI.map.removeLayer(this.CEPlaceLayer);
                            AOI.map.removeLayer(this.CETribalLayer);
                            AOI.map.removeLayer(this.TIVessels);
                            AOI.map.removeLayer(this.TIPrincipalPortsLayer);
                            AOI.map.removeLayer(this.NRCNearbyLayer);
                            AOI.map.removeLayer(this.NRCReefsLayer);
                            AOI.map.removeLayer(this.NRCSoftCoralLayer);
                            AOI.map.removeLayer(this.NRCStoneyCoralLayer);
                            AOI.map.removeLayer(this.NRCBarrierLayer);
                            AOI.map.removeLayer(this.ECCoastalCountiesLayer);

                            this.windLeaseLayerIsVisible = false;
                            this.windrpLayerIsVisible = false;
                            this.windPlanningLayerIsVisible = false;
                            this.oceanDisposalSitesIsVisible = false;
                            this.marineMineralsLeases = false;
                            this.HydrokineticLeasesIsVisible = false;
                            this.wavePowerIsVisable = false;
                            this.tidalPowerIsVisable = false;
                            this.currentPowerIsVisable = false;
                            this.beachNourishIsVisable = false;
                            this.coastalEnergyFacilitiesIsVisable = false;
                            this.CEElevationIsVisable = false;
                            this.TISubmarineIsVisable = false;
                            this.TIDangerZonesIsVisable = false;
                            this.CEPlaceLayerIsVisible = false;
                            this.TIVesselsIsVisible = false;
                            this.TIPrincipalPortsIsVisible = false;
                            this.NRCNearbyLayerIsVisible = false;
                            this.NRCReefsLayerIsVisible = false;
                            this.NRCSoftCoralLayerIsVisible = false;
                            this.NRCStoneyCoralLayerIsVisible = false;
                            this.NRCBarrierLayerIsVisible = false;
                            this.ECCoastalCountiesLayerIsVisible = false;


                            this.wind.length = 0;
                            this.boem.length = 0;
                            this.metadata.length = 0;
                            this.optLayer.length = 0;
                            this.windclass.length = 0;
                            this.disp.length = 0;
                            this.mml.length = 0;
                            this.hydrok.length = 0;
                            this.CETribalLands.length = 0;
                            this.surfsed.length = 0;
                            this.wavepwr.length = 0;
                            this.tidalpwr.length = 0;
                            this.currentpwr.length = 0;
                            this.beachNur.length = 0;
                            this.OGPlanA.length = 0;
                            this.OGLease.length = 0;
                            this.OGWells.length = 0;
                            this.OGresource.length = 0;
                            this.coastfac.length = 0;
                            this.CEElevation.length = 0;
                            this.CEAreaOfPoly.length = 0;
                            this.CEFedGeoRegs.length = 0;
                            this.CECongress.length = 0;
                            this.CEHouse.length = 0;
                            this.CESenate.length = 0;
                            this.CECoastalCounties.length = 0;
                            this.CEFederalAndState.length = 0;
                            this.CEFederalTotal = 0;
                            this.CEStateTotal = 0;
                            this.TISubmarine.length = 0;
                            this.TICoastal.length = 0;
                            this.TIDangerZones.length = 0;
                            this.NRCHabConcern.length = 0;
                            this.NRCCriticalHab.length = 0;
                            this.NRCMigratoryFish.length = 0;
                            this.NRCMigratorySharks.length = 0;
                            this.ECEcon.length = 0;
                            this.ECEconEmploy.length = 0;
                            this.ECEconGDP.length = 0;
                            this.ECEconWages.length = 0;
                            this.ECStateGDP.length = 0;
                            this.ECCountyGDP.length = 0;
                            this.OceanJobContributionsSeries.length = 0;
                            this.drawAreaJobId.length = 0;
                            this.Shared = false;
                            this.CEPlaces.length = 0;
                            this.TIShipping.length = 0;
                            this.TIShippingTotal = 0;
                            this.TIRightWhale.length = 0;
                            this.TIVessel.length = 0;
                            this.TIPrincipalPorts.length = 0;
                            this.NRCNearby.length = 0;
                            this.NRCReefs.length = 0;
                            this.NRCSoftCoral.length = 0;
                            this.NRCStonyCoral.length = 0;
                            this.NRCBarrier.length = 0;
                            this.ECCoastalCounties.length = 0;
                            this.ECFishRevenue.length = 0;
                            this.TIAnchorage.length = 0;
                            this.TIPilot.length = 0;

                            this.hide();

                        }
                        this.isLoaded = false;
                    },
                    isLoaded: false,
                    ECCoastalCountiesLayerIsVisible: false,
                    toggleECCoastalCountiesLayer: function () {
                        if (!this.ECCoastalCountiesLayerIsVisible) {
                            this.ECCoastalCountiesLayer.addTo(AOI.map);
                            this.ECCoastalCountiesLayerIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.ECCoastalCountiesLayer);
                            this.ECCoastalCountiesLayerIsVisible = false;
                        }
                    },
                    NRCBarrierLayerIsVisible: false,
                    toggleNRCBarrierLayer: function () {
                        if (!this.NRCBarrierLayerIsVisible) {
                            this.NRCBarrierLayer.addTo(AOI.map);
                            this.NRCBarrierLayerIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.NRCBarrierLayer);
                            this.NRCBarrierLayerIsVisible = false;
                        }
                    },
                    NRCStoneyCoralLayerIsVisible: false,
                    toggleNRCStoneyCoralLayer: function () {
                        if (!this.NRCStoneyCoralLayerIsVisible) {
                            this.NRCStoneyCoralLayer.addTo(AOI.map);
                            this.NRCStoneyCoralLayerIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.NRCStoneyCoralLayer);
                            this.NRCStoneyCoralLayerIsVisible = false;
                        }
                    },
                    NRCSoftCoralLayerIsVisible: false,
                    toggleNRCSoftCoralLayer: function () {
                        if (!this.NRCSoftCoralLayerIsVisible) {
                            this.NRCSoftCoralLayer.addTo(AOI.map);
                            this.NRCSoftCoralLayerIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.NRCSoftCoralLayer);
                            this.NRCSoftCoralLayerIsVisible = false;
                        }
                    },
                    NRCReefsLayerIsVisible: false,
                    toggleNRCReefsLayer: function () {
                        if (!this.NRCReefsLayerIsVisible) {
                            this.NRCReefsLayer.addTo(AOI.map);
                            this.NRCReefsLayerIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.NRCReefsLayer);
                            this.NRCReefsLayerIsVisible = false;
                        }
                    },
                    NRCNearbyLayerIsVisible: false,
                    toggleNRCNearby: function () {
                        if (!this.NRCNearbyLayerIsVisible) {
                            this.NRCNearbyLayer.addTo(AOI.map);
                            this.NRCNearbyLayerIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.NRCNearbyLayer);
                            this.NRCNearbyLayerIsVisible = false;
                        }
                    },

                    TIPrincipalPortsIsVisible: false,
                    toggleTIPrincipalPorts: function () {
                        if (!this.TIPrincipalPortsIsVisible) {
                            this.TIPrincipalPortsLayer.addTo(AOI.map);
                            this.TIPrincipalPortsIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.TIPrincipalPortsLayer);
                            this.TIPrincipalPortsIsVisible = false;
                        }
                    },
                    TIVesselsIsVisible: false,
                    toggleTIVessels: function () {
                        if (!this.TIVesselsIsVisible) {
                            this.TIVessels.addTo(AOI.map);
                            this.TIVesselsIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.TIVessels);
                            this.TIVesselsIsVisible = false;
                        }
                    },
                    CEPlaceLayerIsVisible: false,
                    toggleCEPlaceLayer: function () {
                        if (!this.CEPlaceLayerIsVisible) {
                            this.CEPlaceLayer.addTo(AOI.map);
                            this.CETribalLayer.addTo(AOI.map);
                            this.CEPlaceLayerIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.CEPlaceLayer);
                            AOI.map.removeLayer(this.CETribalLayer);
                            this.CEPlaceLayerIsVisible = false;
                        }
                    },
                    windLeaseLayerIsVisible: false,
                    toggleWindLeaseLayer: function () {
                        if (!this.windLeaseLayerIsVisible) {
                            this.windLeaseLayer.addTo(AOI.map);
                            this.windLeaseLayerIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.windLeaseLayer);
                            this.windLeaseLayerIsVisible = false;
                        }
                    },
                    windPlanningLayerIsVisible: false,
                    toggleWindPlanningLayer: function () {
                        if (!this.windPlanningLayerIsVisible) {
                            this.windPlanningLayer.addTo(AOI.map);
                            this.windPlanningLayerIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.windPlanningLayer);
                            this.windPlanningLayerIsVisible = false;
                        }
                    },
                    oceanDisposalSitesIsVisible: false,
                    toggleOceanDisposalSites: function () {
                        if (!this.oceanDisposalSitesIsVisible) {
                            this.oceanDisposalSites.addTo(AOI.map);
                            this.oceanDisposalSitesIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.oceanDisposalSites);
                            this.oceanDisposalSitesIsVisible = false;
                        }
                    },
                    HydrokineticLeasesIsVisible: false,
                    toggleHydrokineticLeases: function () {
                        if (!this.HydrokineticLeasesIsVisible) {
                            this.HydrokineticLeases.addTo(AOI.map);
                            this.HydrokineticLeasesIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.HydrokineticLeases);
                            this.HydrokineticLeasesIsVisible = false;
                        }
                    },

                    marineMineralsLeasesIsVisable: false,
                    toggleMarineMineralsLeases: function () {
                        if (!this.marineMineralsLeasesIsVisable) {
                            this.marineMineralsLeases.addTo(AOI.map);
                            this.marineMineralsLeasesIsVisable = true;
                        } else {
                            AOI.map.removeLayer(this.marineMineralsLeases);
                            this.marineMineralsLeasesIsVisable = false;
                        }
                    },
                    wavePowerIsVisable: false,
                    togglewavePower: function () {
                        if (!this.wavePowerIsVisable) {
                            this.wavePower.addTo(AOI.map);
                            this.wavePowerIsVisable = true;
                        } else {
                            AOI.map.removeLayer(this.wavePower);
                            this.wavePowerIsVisable = false;
                        }
                    },
                    tidalPowerIsVisable: false,
                    toggletidalPower: function () {
                        if (!this.tidalPowerIsVisable) {
                            this.tidalPower.addTo(AOI.map);
                            this.tidalPowerIsVisable = true;
                        } else {
                            AOI.map.removeLayer(this.tidalPower);
                            this.tidalPowerIsVisable = false;
                        }
                    },
                    currentPowerIsVisable: false,
                    togglecurrentPower: function () {
                        if (!this.currentPowerIsVisable) {
                            this.currentPower.addTo(AOI.map);
                            this.currentPowerIsVisable = true;
                        } else {
                            AOI.map.removeLayer(this.currentPower);
                            this.currentPowerIsVisable = false;
                        }
                    },
                    beachNourishIsVisable: false,
                    togglebeachNourish: function () {
                        if (!this.beachNourishIsVisable) {
                            this.beachNourish.addTo(AOI.map);
                            this.beachNourishIsVisable = true;
                        } else {
                            AOI.map.removeLayer(this.beachNourish);
                            this.beachNourishIsVisable = false;
                        }
                    },
                    coastalEnergyFacilitiesIsVisable: false,
                    togglecoastalEnergyFacilities: function () {
                        if (!this.coastalEnergyFacilitiesIsVisable) {
                            this.coastalEnergyFacilities.addTo(AOI.map);
                            this.coastalEnergyFacilitiesIsVisable = true;
                        } else {
                            AOI.map.removeLayer(this.coastalEnergyFacilities);
                            this.coastalEnergyFacilitiesIsVisable = false;
                        }
                    },

                    windrpLayerIsVisible: false,
                    toggleWindrpLayer: function () {
                        if (!this.windrpLayerIsVisible) {
                            this.windrpLayer.addTo(AOI.map);
                            this.windrpLayerIsVisible = true;
                        } else {
                            AOI.map.removeLayer(this.windrpLayer);
                            this.windrpLayerIsVisible = false;
                        }
                    },
                    CEElevationIsVisable: false,
                    toggleCEElevation: function () {
                        if (!this.CEElevationIsVisable) {
                            this.CEElevation.addTo(AOI.map);
                            this.CEElevationIsVisable = true;
                        } else {
                            AOI.map.removeLayer(this.CEElevation);
                            this.CEElevationIsVisable = false;
                        }
                    },
                    TISubmarineIsVisable: false,
                    toggleTISubmarine: function () {
                        if (!this.TISubmarineIsVisable) {
                            this.TISubmarineLayer.addTo(AOI.map);
                            this.TISubmarineIsVisable = true;
                        } else {
                            AOI.map.removeLayer(this.TISubmarineLayer);
                            this.TISubmarineIsVisable = false;
                        }
                    },
                    TIDangerZonesIsVisable: false,
                    toggleTIDangerZones: function () {
                        if (!this.TIDangerZonesIsVisable) {
                            this.TIDangerZonesLayer.addTo(AOI.map);
                            this.TIDangerZonesIsVisable = true;
                        } else {
                            AOI.map.removeLayer(this.TIDangerZonesLayer);
                            this.TIDangerZonesIsVisable = false;
                        }
                    },
                    toggleFull: false,
                    toggleFullSlider: function (pageID) {

                        this.toggleFull = !this.toggleFull;
                        this.doFullSlider(pageID);
                    },
                    doFullSlider: function (pageID) {

                        if (this.toggleFull) {

                            // the following should be changed to a more angularjs friendly approach. not supposed to be do DOM manipulation here.
                            document.getElementById("slide1").style.width = '100%';
                            document.getElementById("togglefull").style.marginLeft = '0px';
                            document.getElementById("togglefull").style.WebkitTransform = "rotate(180deg)";
                            document.getElementById("togglefull").style.msTransform = "rotate(180deg)";
                            document.getElementById("togglefull").style.transform = "rotate(180deg)";

                            var elems = document.getElementsByClassName('AOItabClass2');
                            for (var i = 0; i < elems.length; i++) {
                                elems[i].style.display = 'inline-block';
                            }


                            if (pageID === "EM" || pageID === "CE" || pageID === "TI" || pageID === "NRC" || pageID === "EC") {


                                this.loadSmallMap(false);

                            }

                        } else {

                            document.getElementById("togglefull").style.marginLeft = "-25px";

                            document.getElementById("slide1").style.width = '50%';
                            var elems = document.getElementsByClassName('AOItabClass2');
                            for (var i = 0; i < elems.length; i++) {
                                elems[i].style.display = 'none';
                            }

                            document.getElementById("togglefull").style.WebkitTransform = "rotate(0deg)";
                            // Code for IE9
                            document.getElementById("togglefull").style.msTransform = "rotate(0deg)";
                            document.getElementById("togglefull").style.transform = "rotate(0deg)";

                        }


                    },
                    loadSmallMap: function (useCanvas) {
                        if (smallmap) {
                            smallmap.remove();

                        }
                        if (this.inPrintWindow) smallmap = L.map('map3', {preferCanvas: useCanvas}).setView([45.526, -122.667], 1);
                        else smallmap = L.map('map').setView([45.526, -122.667], 1);
                        L.esri.basemapLayer('Oceans', {useCors: true}).addTo(smallmap);
                        L.esri.basemapLayer('OceansLabels').addTo(smallmap);
                        esriOceans = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
                            attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
                            maxZoom: 12,
                            useCors: true
                        });

                        var minicLayer;
                        if (this.ID === -9999) {
                            minicLayer = L.geoJson(this.drawLayerShape, {
                                color: '#EB660C',
                                weight: 1.5,
                                fillOpacity: .3

                            }).addTo(smallmap);
                            this.minibounds = minicLayer.getBounds();
                            smallmap.fitBounds(this.minibounds);

                        } else {
                            minicLayer = L.esri.featureLayer({
                                url: config.ortMapServer + config.ortLayerAOI,
                                where: "AOI_ID =" + this.ID + "",
                                color: '#EB660C',
                                weight: 1.5,
                                fillOpacity: .3

                            }).addTo(smallmap);


                            minicLayer.on("load", function (evt) {
                                var bounds = L.latLngBounds([]);
                                minicLayer.eachFeature(function (layer) {
                                    var layerBounds = layer.getBounds();
                                    bounds.extend(layerBounds);
                                });
                                this.minibounds = bounds;
                                smallmap.fitBounds(bounds);
                                minicLayer.off('load');
                            });
                        }
                        smallmap.invalidateSize();
                        var test1 = false;
                        if ((this.inPrintWindow) && (test1)) {
                            leafletImage(smallmap, function (err, canvas) {
                                var img = document.createElement('img');
                                var dimensions = smallmap.getSize();
                                img.width = dimensions.x;
                                img.height = dimensions.y;
                                img.src = canvas.toDataURL();
                                document.getElementById('map3').innerHTML = '';
                                document.getElementById('map3').appendChild(img);
                            });
                        }

                    },
                    loadStateChart: function () {
                        if (AOI.highchartsNGState) AOI.highchartsNGState = null;

                        AOI.highchartsNGState = {
                            options: {
                                credits: {
                                    enabled: false
                                },
                                chart: {
                                    plotBackgroundColor: '#f4f8fc',
                                    plotBorderWidth: null,
                                    plotShadow: false,
                                    type: 'pie'
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'right',
                                    verticalAlign: 'top',
                                    floating: true,
                                    backgroundColor: '#f4f8fc'
                                },
                                tooltip: {
                                    pointFormat: '<b>{point.percentage:.1f}%</b>'
                                },
                                plotOptions: {
                                    pie: {
                                        dataLabels: {
                                            enabled: false
                                        },
                                        showInLegend: true
                                    }
                                }
                            },
                            series: [{
                                data: [{
                                    color: '#4a4a4a',
                                    y: AOI.CEFederalTotal,
                                    name: 'Federal'
                                }, {
                                    color: '#3284BC',
                                    y: AOI.CEStateTotal,
                                    name: 'State'
                                }]
                            }],
                            title: {
                                text: null
                            },
                            loading: false
                        }

                    },
                    loadOceanJobContributionsChart: function () {

                        if (AOI.OceanJobContributionsChart) AOI.OceanJobContributionsChart = null;
                        AOI.OceanJobContributionsChart = {
                            options: {
                                credits: {
                                    enabled: false
                                },
                                legend: {
                                    enabled: true,
                                    align: 'right',
                                    layout: 'vertical',
                                    verticalAlign: 'center',
                                    itemStyle: {
                                        fontSize: '10px'
                                    }
                                },
                                tooltip: {
                                    pointFormat: '<b>{point.percentage:.1f}%</b>'
                                },
                                chart: {

                                    height: AOI.OceanJobContributionsChartHeight,
                                    type: 'pie'
                                },
                                title: {
                                    enabled: false,
                                    text: null,
                                    align: 'center'
                                },
                                exporting: {enabled: false},
                                colors: ['#4572a7', '#aa4643', '#89a54e', '#71588f', '#4198af', '#db843d', '#93a9cf'],
                                yAxis: {

                                    title: {
                                        enabled: true
                                    }
                                },
                                xAxis: {
                                    type: 'category',
                                    title: {
                                        enabled: true
                                    },
                                    labels: {
                                        enabled: true
                                    }
                                },
                                plotOptions: {

                                    pie: {
                                        allowPointSelect: false,
                                        cursor: 'pointer',
                                        size: 100,

                                        dataLabels: {
                                            enabled: false
                                        },
                                        point: {
                                            events: {
                                                legendItemClick: function (e) {
                                                    e.preventDefault();
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            loading: false,
                            series: AOI.OceanJobContributionsSeries
                        }

                        ;

                    },
                    loadOceanJobDollarsChart: function () {

                        if (AOI.OceanJobDollarsChart) AOI.OceanJobDollarsChart = null
                        AOI.OceanJobDollarsChart = {
                            options: {
                                credits: {
                                    enabled: false
                                },
                                legend: {
                                    enabled: true,

                                    layout: 'horizontal',
                                    align: 'right',
                                    verticalAlign: 'top',
                                    floating: true,
                                    itemStyle: {

                                        fontSize: '10px',
                                        lineHeight: '10px'
                                    }
                                },
                                tooltip: {
                                    pointFormat: '<b>${point.y:,.2f}</b>'
                                },
                                chart: {
                                    type: 'column'
                                },
                                title: {
                                    enabled: false,
                                    text: null,
                                    align: 'left'
                                },
                                exporting: {enabled: false},
                                colors: ['#ffc000', '#92d050', '#A6C900', '#EFCF06', '#D96704', '#A90306', '#A1A1A1'],
                                yAxis: {
                                    title: {
                                        enabled: false
                                    }
                                },
                                xAxis: {
                                    type: 'category',
                                    title: {
                                        enabled: false
                                    },
                                    labels: {
                                        enabled: true
                                    }

                                }
                            },
                            loading: false,
                            series: [{
                                "name": 'Wages',
                                "data": this.ECEconWages
                            }, {
                                "name": 'Goods & Services',
                                "data": this.ECEconGDP
                            }
                            ]

                        };
                    },
                    loadOceanJobEmployeesChart: function () {

                        if (AOI.OceanJobEmployeesChart) AOI.OceanJobEmployeesChart = null
                        AOI.OceanJobEmployeesChart = {
                            options: {
                                credits: {
                                    enabled: false
                                },
                                legend: {
                                    enabled: false
                                },
                                tooltip: {
                                    pointFormat: '<b>{point.y:,.0f}</b>'
                                },
                                chart: {
                                    type: 'column'
                                },
                                title: {
                                    text: "Employees",
                                    align: 'left'
                                },
                                exporting: {enabled: false},
                                colors: ['#4f81bd', '#4f81bd', '#A6C900', '#EFCF06', '#D96704', '#A90306', '#A1A1A1'],
                                yAxis: {

                                    title: {
                                        enabled: false
                                    }
                                },
                                xAxis: {
                                    type: 'category',
                                    title: {
                                        enabled: false
                                    },
                                    labels: {
                                        enabled: true
                                    }
                                }

                            },
                            loading: false,
                            series: [{
                                "name": 'Employees',
                                "data": this.ECEconEmploy
                            }]

                        };


                    },
                    loadWindChart: function () {

                        if (AOI.highchartsNG) AOI.highchartsNG = null
                        AOI.highchartsNG = {
                            options: {
                                credits: {
                                    enabled: false
                                },
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
                                }

                            },
                            loading: false,
                            series: [{
                                showInLegend: false,
                                name: '',
                                data: [this.windclass[0]]
                            }, {
                                showInLegend: false,
                                name: '',
                                data: [this.windclass[1]]
                            }, {
                                showInLegend: false,
                                name: '',
                                data: [this.windclass[2]]
                            }, {
                                showInLegend: false,
                                name: '',
                                data: [this.windclass[3]]
                            }, {
                                showInLegend: false,
                                name: '',
                                data: [this.windclass[4]]
                            }, {
                                showInLegend: false,
                                name: '',
                                data: [this.windclass[5]]
                            }, {
                                showInLegend: false,
                                name: '',
                                data: [this.windclass[6]]
                            }
                            ]

                        };


                    },
                    reloadAbort:function(){

                        setTimeout(function(){

                            $window.location.reload();

                        },100);


                    },
                    ShowURL: function () {
                        var shareURL = AOI.url[0] + '#/AOI?AOI=' + AOI.ID;
                        if (AOI.ID === -9999) {
                            shareURL = shareURL +
                                '&TI=' + AOI.drawAreaJobId['TI'] +
                                '&EC=' + AOI.drawAreaJobId['EC'] +
                                '&CE=' + AOI.drawAreaJobId['CE'] +
                                '&NRC=' + AOI.drawAreaJobId['NRC'] +
                                '&EM=' + AOI.drawAreaJobId['EM']
                        }
                        return (shareURL);
                    }
                };

                return AOI;
            }]
        }
    })
;

