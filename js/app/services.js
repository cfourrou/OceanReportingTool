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
    .provider('AOIConfig', function () {
        var config = {
            ortMapServer: '',
            ortLayerAOI: '',
            ortLayerData: '',
            ortEnergyGPService: '',
            ortCommonGPService: '',
            ortTranspoGPService: '',
            ortNaturalGPService: '',
            ortEconGPService: ''
        };

        return {
            set: function (value) {
                config = value;
            },
            $get: [function () {
                return config
            }]
        };
    })
    .factory('myGPService', ['L', '$q', function (L, $q) {
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
                run: function (shape) {
                    var deferred = $q.defer();

                    task.setParam("Report_Boundary", shape);
                    task.setOutputParam("Output_Report");

                    task.run(function (error, geojson) {
                        if (error) deferred.resolve(error);
                        else {
                            geojson.Output_Report.jobId = geojson.jobId;
                            deferred.resolve(geojson.Output_Report)
                        }
                    });

                    return deferred.promise;
                }
            };
        };

        return myGPService;
    }])
    .factory('myQueryService', ['L', '$q', function (L, $q) {
        var myQueryService = function (url) {
            var leafletQuery = L.esri.query({
                url: url
            });

            return {
                query: function (where) {
                    var deferred = $q.defer();
                    leafletQuery.returnGeometry(false).where(where).run(function (error, featureCollection, response) {
                        if (error) deferred.reject(error);
                        else {
                            featureCollection.fields = response.fields;
                            deferred.resolve(featureCollection);
                        }
                    });
                    return deferred.promise;
                }
            }
        };
        return myQueryService;
    }])
    .factory('myGetService', ['L', '$q', 'AOIConfig', function (L, $q, AOIConfig) {
        return {
            get: function (url, jobId) {
                var deferred = $q.defer();
                L.esri.get(url + '/jobs/' + jobId + '/results/Output_Report', {}, function (error, response) {
                    if (error) deferred.reject(error);
                    else deferred.resolve(response);
                });
                return deferred.promise;
            }
        };
    }])
    .service('AOI', ['$rootScope', '$window', 'L', '$q', 'AOIConfig', 'myQueryService', 'myGetService', 'myGPService',
        function ($rootScope, $window, L, $q, AOIConfig, myQueryService, myGetService, myGPService) {
            var AOI = {
                OceanJobContributionsSeries: [],
                drawAreaJobId: {},
                Shared: false,
                url: $window.location.href.split('#'),
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

                    AOI.ID = parseInt(AOI_ID);
                    if (AOI.ID === -9999) {
                        AOI.layer = L.geoJson(AOI.drawLayerShape, {
                            color: '#EB660C',
                            weight: 1.5,
                            fillOpacity: .3,
                            pane: 'AOIfeature'
                        }).addTo(AOI.map);
                        AOI.map.fitBounds(AOI.layer.getBounds(), {
                            padding: [1, 1]
                        });
                    } else {
                        AOI.layer = L.esri.featureLayer({
                            url: AOIConfig.ortMapServer + AOIConfig.ortLayerAOI,
                            color: '#EB660C', weight: 1.5, fillOpacity: .3,
                            where: "AOI_ID =" + AOI.ID + "",
                            pane: 'AOIfeature'
                        }).addTo(AOI.map);
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
                            AOI.map.fitBounds(mbounds);

                            AOI.layer.off('load'); // unwire the event listener so that it only fires once when the page is loaded or again on error
                        }
                        catch (err) {
                            //for some reason if we are zoomed in elsewhere and the bounds of this object are not in the map view, we can't read bounds correctly.
                            //so for now we will zoom out on error and allow this event to fire again.

                            AOI.map.setView([33.51, -78.3], 6); //it should try again.
                        }
                    });

                    AOI.isVisible = true;

                },
                hide: function () {

                    if (AOI.isVisible) {
                        AOI.map.removeLayer(AOI.layer);
                    }
                    AOI.map.setView([33.51, -78.3], 6);
                    AOI.isVisible = false;
                },
                zoomTo: function () {

                    var mbounds = L.latLngBounds([]);
                    // loop through the features returned by the server
                    AOI.layer.eachFeature(function (layer) {
                        // get the bounds of an individual feature
                        var layerBounds = layer.getBounds();
                        // extend the bounds of the collection to fit the bounds of the new feature
                        mbounds.extend(layerBounds);
                    });
                    AOI.map.fitBounds(mbounds);


                },
                isVisible: false,
                getReport: function () {
                    var allPromises = [];

                    var EMGPService = new myGPService(AOIConfig.ortEnergyGPService);
                    var CEGPService = new myGPService(AOIConfig.ortCommonGPService);
                    var TIGPService = new myGPService(AOIConfig.ortTranspoGPService);
                    var NRCGPService = new myGPService(AOIConfig.ortNaturalGPService);
                    var ECGPService = new myGPService(AOIConfig.ortEconGPService);

                    allPromises.push(EMGPService.run(AOI.drawLayerShape));
                    allPromises.push(CEGPService.run(AOI.drawLayerShape));
                    allPromises.push(TIGPService.run(AOI.drawLayerShape));
                    allPromises.push(NRCGPService.run(AOI.drawLayerShape));
                    allPromises.push(ECGPService.run(AOI.drawLayerShape));

                    return $q.all(allPromises).then(function (results) {
                        AOI.featureCollection = {fields: null, features: []};

                        AOI.drawAreaJobId.EM = results[0].jobId;
                        AOI.drawAreaJobId.CE = results[1].jobId;
                        AOI.drawAreaJobId.TI = results[2].jobId;
                        AOI.drawAreaJobId.NRC = results[3].jobId;
                        AOI.drawAreaJobId.EC = results[4].jobId;

                        angular.forEach(results, function (result, i) {
                            if (!result.error) {
                                if (!AOI.featureCollection.fields) AOI.featureCollection.fields = result.fields;
                                AOI.featureCollection.features.push.apply(AOI.featureCollection.features, result.features);
                            }
                        });

                        AOI.unloadData();
                        AOI.loadData(-9999, '');
                        AOI.name = (AOI.CEPlaces[0].Name ? ("Near " + AOI.CEPlaces[0].Name) : "My Report");
                    });


                },
                getSavedReport: function () {
                    var promises = [];

                    var shapeDeferred = $q.defer();
                    promises.push(shapeDeferred.promise);
                    L.esri.get(AOIConfig.ortCommonGPService + '/jobs/' + AOI.drawAreaJobId.CE + '/inputs/Report_Boundary', {}, function (error, response) {
                        if (error) {

                        } else {
                            AOI.drawLayerShape = {
                                type: "Feature",
                                geometry: {
                                    type: "Polygon",
                                    coordinates: response.value.features[0].geometry.rings
                                }
                            };
                            shapeDeferred.resolve();
                        }
                    });
                    AOI.featureCollection = {fields: null, features: []};
                    promises.push(myGetService.get(AOIConfig.ortCommonGPService, AOI.drawAreaJobId.CE));
                    promises.push(myGetService.get(AOIConfig.ortEnergyGPService, AOI.drawAreaJobId.EM));
                    promises.push(myGetService.get(AOIConfig.ortNaturalGPService, AOI.drawAreaJobId.NRC));
                    promises.push(myGetService.get(AOIConfig.ortTranspoGPService, AOI.drawAreaJobId.TI));
                    promises.push(myGetService.get(AOIConfig.ortEconGPService, AOI.drawAreaJobId.EC));


                    $q.all(promises).then(function (results) {
                        angular.forEach(results, function (result, i) {
                            if (result) {
                                if (!result.error) {
                                    if (!AOI.featureCollection.fields) AOI.featureCollection.fields = result.value.fields;
                                    AOI.featureCollection.features.push.apply(AOI.featureCollection.features, result.value.features);
                                }
                            }
                        });
                        AOI.loadData(-9999, '');
                        AOI.name = (AOI.CEPlaces[0].Name ? ("Near " + AOI.CEPlaces[0].Name) : "My Report");
                    });
                },
                loadData: function (AOI_ID, name) {
                    AOI.display(AOI_ID);

                    AOI.name = name;

                    AOI.windrpLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.windrpLayer,
                        pane: 'windrpLayerPane',
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

                    AOI.windLeaseLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.windLeaseLayer,
                        pane: 'windLeaseLayerPane',
                        style: function (feature) {

                            return {color: 'white', weight: 1, fillOpacity: .5};
                        }
                    });
                    AOI.windPlanningLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.windPlanningLayer,
                        pane: 'windPlanningLayerPane',
                        style: function (feature) {

                            return {color: 'Black', weight: 1, fillOpacity: .5};
                        }
                    });
                    AOI.oceanDisposalSites = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.oceanDisposalSites,
                        pane: 'oceanDisposalSitesPane',
                        style: function (feature) {
                            return {fillColor: '#FFA7A7', color: '#4A4A4A', weight: 1.5, fillOpacity: .5};
                        }
                    });
                    AOI.marineMineralsLeases = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.marineMineralsLeases,
                        pane: 'marineMineralsLeasesPane',
                        style: function (feature) {
                            return {color: '#7300D9', weight: 2, fillOpacity: 0};
                        }
                    });


                    AOI.HydrokineticLeases = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.HydrokineticLeases,
                        pane: 'HydrokineticLeasesPane',
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

                    AOI.wavePower = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.wavePower,
                        pane: 'wavePowerPane',
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

                    AOI.tidalPower = L.esri.dynamicMapLayer({
                        url: AOIConfig.ortMapServer,
                        pane: 'tidalPowerPane',
                        layers: [AOIConfig.optionalLayers.tidalPower],
                        opacity: .8
                    });

                    AOI.currentPower = L.esri.dynamicMapLayer({
                        url: AOIConfig.ortMapServer,
                        pane: 'currentPowerPane',
                        layers: [AOIConfig.optionalLayers.currentPower],
                        opacity: .8
                    });

                    AOI.beachNourish = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.beachNourish,
                        pane: 'beachNourishPane',
                        style: function (feature) {
                            return {color: '#8B572A', weight: 4, fillOpacity: 0};
                        }
                    });

                    AOI.coastalEnergyFacilities = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.coastalEnergyFacilities,
                        pane: 'coastalEnergyFacilitiesPane',
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

                    AOI.CEElevationLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.CEElevationLayer,
                        pane: 'CEElevationPane',
                        style: function (feature) {
                            return {color: '#3283BB', weight: 2, fillOpacity: 0};
                        }
                    });
                    AOI.TISubmarineLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.TISubmarineLayer,
                        pane: 'TISubmarineLayerPane',
                        style: function (feature) {
                            return {color: '#880cf4', weight: 2, fillOpacity: 0};
                        }
                    });
                    AOI.TIDangerZonesLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.TIDangerZonesLayer,
                        pane: 'TIDangerZonesLayerPane',

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

                    AOI.CEPlaceLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + [AOIConfig.optionalLayers.CEPlaceLayer],
                        pane: 'CEPlaceLayerPane',
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
                    AOI.TIPrincipalPortsLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + [AOIConfig.optionalLayers.TIPrincipalPortsLayer],
                        pane: 'TIPrincipalPortsLayerPane',
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
                    AOI.NRCReefsLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + [AOIConfig.optionalLayers.NRCReefsLayer],
                        pane: 'NRCReefsLayerPane',
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
                    AOI.CETribalLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.CETribalLayer,
                        pane: 'CETribalLayerPane',
                        style: function (feature) {
                            return {fillColor: '#ffffbe', color: '#e69901', weight: 1.5, fillOpacity: .5};
                        }
                    });
                    AOI.NRCNearbyLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.NRCNearbyLayer,
                        pane: 'NRCNearbyLayerPane',
                        style: function (feature) {
                            return {color: '#75bc73', weight: 1.5, fillOpacity: .7};
                        }
                    });
                    AOI.NRCBarrierLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.NRCBarrierLayer,
                        pane: 'NRCBarrierLayerPane',
                        style: function (feature) {
                            return {color: '#d6ce70', weight: 1.5, fillOpacity: .7};
                        }
                    });

                    AOI.TIVessels = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.TIVessels,
                        pane: 'TIVesselsPane',
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

                    AOI.NRCSoftCoralLayer = L.esri.dynamicMapLayer({
                        url: AOIConfig.ortMapServer,
                        pane: 'NRCSoftCoralLayerPane',
                        layers: [AOIConfig.optionalLayers.NRCSoftCoralLayer],
                        opacity: .8
                    });
                    AOI.NRCStoneyCoralLayer = L.esri.dynamicMapLayer({
                        url: AOIConfig.ortMapServer,
                        pane: 'NRCStoneyCoralLayerPane',
                        layers: [AOIConfig.optionalLayers.NRCStoneyCoralLayer],
                        opacity: .8
                    });
                    AOI.ECCoastalCountiesLayer = L.esri.featureLayer({
                        url: AOIConfig.ortMapServer + AOIConfig.optionalLayers.ECCoastalCountiesLayer,
                        pane: 'ECCoastalCountiesLayerPane',
                        style: function (feature) {
                            return {color: '#b613ba', weight: 1.5, fillOpacity: 0};
                        }
                    });

                    if (AOI.ID === -9999) {
                        var featureCollection = JSON.parse(JSON.stringify(AOI.featureCollection));

                        var newarray = [];
                        angular.forEach(featureCollection.features, function (feature) {
                            var newobject = {};
                            angular.forEach(featureCollection.fields, function (field) {
                                newobject[field.name] = feature.attributes[field.name];
                            });
                            newarray.push(newobject);
                        });
                        AOI.massageData(newarray);

                    } else {
                        var queryService = new myQueryService(AOIConfig.ortMapServer + AOIConfig.ortLayerData);
                        queryService.query("AOI_ID =" + AOI.ID + "").then(function (featureCollection) {
                            AOI.name = featureCollection.features[0].properties.AOI_NAME;

                            var newarray = [];
                            angular.forEach(featureCollection.features, function (feature) {
                                var newobject = {};
                                angular.forEach(featureCollection.fields, function (field) {
                                    newobject[field.name] = feature.properties[field.name];
                                });
                                newarray.push(newobject);
                            });
                            //the idea here is , since the two arrays that can make it to .massageData are organized differently, we need to parse them into a known structure.

                            AOI.massageData(newarray);
                        });
                    }
                    AOI.isLoaded = true;
                },
                massageData: function (featureCollection) {
                    angular.forEach(featureCollection, function (feature) {

                        switch (feature.DATASET_NM) {
                            case "Anchorage_Areas":
                                AOI.TIAnchorage.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    Name: (feature.Name || 'Unknown'),
                                    PERC_COVER: (feature.PERC_COVER || 0)
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "Pilot_Boarding_Areas":
                                AOI.TIPilot.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0)
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "SATL_FishRevenue_AllYrs":
                                AOI.ECFishRevenue.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    FishingRev_value_min: (feature.FishingRev_value_min || 0),
                                    FishingRev_value_max: (feature.FishingRev_value_max || 0),
                                    FishingRev_total: (feature.FishingRev_total || 0)
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "CBRAs":
                                AOI.NRCBarrier.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0)
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "ArtificialReefs":
                                AOI.NRCReefs.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0)
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "StonyCoralALL":
                                AOI.NRCStonyCoral.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    Coral_Suitability: (feature.Coral_Suitability || '')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "SoftCoralALL":
                                AOI.NRCSoftCoral.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    Coral_Suitability: (feature.Coral_Suitability || '')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "MPA_selected":
                                AOI.NRCNearby.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    Site_Name: (feature.Site_Name || 'Unknown'),
                                    URL: (feature.URL || '')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "PrincipalPorts":
                                AOI.TIPrincipalPorts.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    PortName: (feature.PortName || 'Unknown'),
                                    Total: (feature.Total || 0),
                                    Dist_Mi: (feature.Dist_Mi || 0)
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "vessel_traffic_atl_2011":
                                AOI.TIVessel.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    all_2011_avg: (feature.all_2011_avg || 0)
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "RightWhales":
                                AOI.TIRightWhale.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    PERC_COVER: (feature.PERC_COVER || 0)
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "ShippingLanes":
                                AOI.TIShipping.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    THEMELAYER: (feature.THEMELAYER || 'Unknown'),
                                    THEMELAYER_CNT: (feature.THEMELAYER_CNT || 'Unknown')
                                });
                                AOI.TIShippingTotal += feature.THEMELAYER_CNT;
                                AOI.addMetadata(feature);
                                break;
                            case "Places":
                                AOI.CEPlaces.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    Name: (feature.Name || 'Unknown'),
                                    ST: (feature.ST || 'Unknown'),
                                    Dist_Mi: (feature.Dist_Mi || 0),
                                    Census2010: ((feature.Census2010 === -1) ? ' ' : (feature.Census2010 || ' '))
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "CoastalStates":
                            case "Coastal_Shoreline_Counties_2010":
                                AOI.ECCountyGDP.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    cntyname: (feature.cntyname || feature.st_name),
                                    MedHHInc: (feature.MedHHInc || 0),
                                    TotalHouses: (feature.TotalHouses || 0),
                                    Population: (feature.Population || 0),
                                    PercentTotGDP: (feature.PercentTotGDP || 0)
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "ENOW_2013":
                                AOI.ECEcon.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    Name: (feature.Name || 'Unknown'),
                                    cntyname: (feature.cntyname || 'Unknown'),
                                    st_name: (feature.st_name || 'Unknown'),
                                    OceanSector: (feature.OceanSector || 'Unknown'),
                                    Employment: (feature.Employment || 0),
                                    Wages: (feature.Wages || 0),
                                    GDP: (feature.GDP || 0),

                                    Emp_LivingResources: (feature.Emp_LivingResources || 0),
                                    Emp_MarineConstruction: (feature.Emp_MarineConstruction || 0),
                                    Emp_MarineTransp: (feature.Emp_MarineTransp || 0),
                                    Emp_OffshoreMineralExt: (feature.Emp_OffshoreMineralExt || 0),
                                    Emp_ShipAndBoatBuilding: (feature.Emp_ShipAndBoatBuilding || 0),
                                    Emp_TourismAndRec: (feature.Emp_TourismAndRec || 0),
                                    Wages_LivingResources: (feature.Wages_LivingResources || 0),
                                    Wages_MarineConstruction: (feature.Wages_MarineConstruction || 0),
                                    Wages_MarineTransp: (feature.Wages_MarineTransp || 0),
                                    Wages_OffshoreMineralExt: (feature.Wages_OffshoreMineralExt || 0),
                                    Wages_ShipAndBoatBuilding: (feature.Wages_ShipAndBoatBuilding || 0),
                                    Wages_TourismAndRec: (feature.Wages_TourismAndRec || 0),

                                    GDP_LivingResources: ((feature.GDP_LivingResources === -9999) ? 0 : (feature.GDP_LivingResources || 0)),
                                    GDP_MarineConstruction: ((feature.GDP_MarineConstruction === -9999) ? 0 : (feature.GDP_MarineConstruction || 0)),
                                    GDP_MarineTransp: ((feature.GDP_MarineTransp === -9999) ? 0 : (feature.GDP_MarineTransp || 0)),
                                    GDP_OffshoreMineralExt: ((feature.GDP_OffshoreMineralExt === -9999) ? 0 : (feature.GDP_OffshoreMineralExt || 0)),
                                    GDP_ShipAndBoatBuilding: ((feature.GDP_ShipAndBoatBuilding === -9999) ? 0 : (feature.GDP_ShipAndBoatBuilding || 0)),
                                    GDP_TourismAndRec: ((feature.GDP_TourismAndRec === -9999) ? 0 : (feature.GDP_TourismAndRec || 0))
                                });
                                switch (feature.OceanSector) {
                                    case "All Ocean Sectors":
                                        AOI.ECEconEmploy[AOI.ECEconEmploy.length] = [(feature.cntyname || feature.st_name), (feature.Employment || 0)];
                                        AOI.ECEconGDP[AOI.ECEconGDP.length] = [(feature.cntyname || feature.st_name), (feature.GDP || 0)];
                                        AOI.ECEconWages[AOI.ECEconWages.length] = [(feature.cntyname || feature.st_name), (feature.Wages || 0)];
                                        break;
                                }
                                AOI.addMetadata(feature);
                                break;
                            case "NMFS_HMS_Fish":
                                AOI.NRCMigratoryFish.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    LIFE_STAGE: (feature.LIFE_STAGE || 'Unknown'),
                                    SPECIES: (feature.SPECIES || 'Unknown'),
                                    PERC_COVER: (feature.PERC_COVER || 'Unknown')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "NMFS_HMS_Sharks":
                                AOI.NRCMigratorySharks.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    LIFE_STAGE: (feature.LIFE_STAGE || 'Unknown'),
                                    SPECIES: (feature.SPECIES || 'Unknown'),
                                    PERC_COVER: (feature.PERC_COVER || 'Unknown')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "NMFS_CHD_SouthAtl":
                                AOI.NRCCriticalHab.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    AREANAME: (feature.AREANAME || 'Unknown'),
                                    PERC_COVER: (feature.PERC_COVER || 'Unknown')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "SERO_HAPC_PartK":
                                AOI.NRCHabConcern.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    AREA_NAME: (feature.AREA_NAME || 'Unknown'),
                                    PERC_COVER: (feature.PERC_COVER || 'Unknown')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "Danger_Zones_and_Restricted_Areas":
                                AOI.TIDangerZones.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    boundaryType: (feature.boundaryType || 'Unknown'),
                                    agencyOfUse: (feature.agencyOfUse || 'Unknown'),
                                    PERC_COVER: (feature.PERC_COVER || 'Unknown'),
                                    Style: 'c_' + (feature.agencyOfUse || 'Unknown').substr(-4, 4)
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "Coastal_Maintained_Channels":
                                AOI.TICoastal.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0)
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "SubmarineCables":
                                AOI.TISubmarine.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    Owner: (feature.Owner || 'Unknown'),
                                    STATUS: (feature.STATUS || 'Unknown'),
                                    OwnerStatus: (feature.Owner || 'Unknown') + " - " + (feature.STATUS || 'Unknown')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "FederalAndStateWaters":
                                AOI.CEFederalAndState.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    jurisdiction: (feature.jurisdiction || 'Unknown'),
                                    perc_jurisdiction: (feature.perc_jurisdiction || 'Unknown'),
                                    Area_mi2: (feature.Area_mi2 || 'Unknown')
                                });
                                AOI.addMetadata(feature);
                                if (feature.TOTAL_CNT > 0) {
                                    if ((feature.jurisdiction.substring(0, 3)) === "Fed") {
                                        AOI.CEFederalTotal = parseInt(AOI.CEFederalTotal, 10) + parseInt(feature.Area_mi2, 10);
                                    } else  AOI.CEStateTotal = parseInt(AOI.CEStateTotal, 10) + parseInt(feature.Area_mi2, 10);
                                }
                                break;
                            case "CoastalCounties":
                                AOI.CECoastalCounties.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    cntyname: (feature.cntyname || 'Unknown'),
                                    st_abbr: (feature.st_abbr || 'Unknown'),
                                    ctystate: (feature.st_abbr || 'Unknown'),
                                    st_name: (feature.st_name || 'Unknown')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "Coastal_State_Legislative_Districts_House":
                                AOI.CEHouse.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    NAMELSAD: (feature.NAMELSAD || 'Unknown'),
                                    stateName: (feature.stateName || 'Unknown')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "Coastal_State_Legislative_Districts_Senate":
                                AOI.CESenate.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    NAMELSAD: (feature.NAMELSAD || 'Unknown'),
                                    stateName: (feature.stateName || 'Unknown')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "Coastal_Congressional_Districts_114th":
                                AOI.CECongress.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    NAMELSAD: (feature.NAMELSAD || 'Unknown'),
                                    stateName: (feature.stateName || 'Unknown')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "FederalGeoRegulations":
                                AOI.CEFedGeoRegs.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    FederalGeoRegulationsName: (feature.FederalGeoRegulationsName || 'Unknown'),
                                    FederalGeoRegulationsID: (feature.FederalGeoRegulationsID || 'Unknown'),
                                    DescriptionURL: (feature.DescriptionURL || '')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "AOI_input":
                                AOI.CEAreaOfPoly.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    Area_mi2: (feature.Area_mi2 || 'Unknown'),
                                    Area_km2: (feature.Area_km2 || 'Unknown'),
                                    Area_nm2: (feature.Area_nm2 || 'Unknown')
                                });
                                break;
                            case "crm_v1":
                                AOI.CEElevation.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    depth_min_m: (feature.depth_min_m || 'Unknown'),
                                    depth_max_m: (feature.depth_max_m || 'Unknown'),
                                    depth_mean_m: (feature.depth_mean_m || 'Unknown')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "CoastalEnergyFacilities":
                                AOI.coastfac.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    Name: (feature.Name || 'None'),
                                    Type: (feature.Type || 'None'),
                                    CAPACITY: (feature.CAPACITY || 'None'),
                                    Dist_Mi: (feature.Dist_Mi || 'None')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "OG_ResourcePotential":
                                AOI.OGresource.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    OCS_Play: (feature.OCS_Play || 'None'),
                                    UTRR_Oil: (feature.UTRR_Oil || 'None'),
                                    UTRR_Gas: (feature.UTRR_Gas || 'None'),
                                    UTRR_BOE: (feature.UTRR_BOE || 'None')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "OG_Wells":
                                AOI.OGWells.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    COMPANY_NA: (feature.COMPANY_NA || 'None'),
                                    STATUS: (feature.STATUS || 'None')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "al_20160301":
                                AOI.OGLease.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    Lease_Numb: (feature.Lease_Numb || 'None'),
                                    Lease_expt: (feature.Lease_expt || 'None')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "OilandGasPlanningAreas":
                                AOI.OGPlanA.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    Region: (feature.Region || 'unknown')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "SC_BeachProjects":
                                AOI.beachNur.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    BEACH_AREA: (feature.BEACH_AREA || 'unknown'),
                                    YEAR: (feature.YEAR || '0'),
                                    SAND_VOL_C: (feature.SAND_VOL_C || '0'),
                                    Dist_Mi: ((feature.Dist_Mi === ' ') ? '0' : feature.Dist_Mi )
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "us_oc_ms":
                                AOI.currentpwr.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    AVG_OCEAN_CURRENT: (feature.AVG_OCEAN_CURRENT || 0),
                                    SUITABILITY_OCEAN_SPEED: (feature.SUITABILITY_OCEAN_SPEED || 'NO')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "usa_mc_wm":
                                AOI.tidalpwr.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    AVG_TIDAL_CURRENT: (feature.AVG_TIDAL_CURRENT || 0),
                                    SUITABILITY_TIDAL_DEPTH: (feature.SUITABILITY_TIDAL_DEPTH || 'NO'),
                                    SUITABILITY_TIDAL_AREA: (feature.SUITABILITY_TIDAL_AREA || 'NO'),
                                    SUITABILITY_TIDAL_SPEED: (feature.SUITABILITY_TIDAL_SPEED || 'NO')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "OceanWaveResourcePotential":
                                AOI.wavepwr.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    AVG_WAVE_POWER: (feature.AVG_WAVE_POWER || 0),
                                    SUITABILITY_OCEAN_POWER: (feature.SUITABILITY_OCEAN_POWER || 'Unknown')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "OceanDisposalSites":
                                AOI.disp.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    PRIMARY_USE: (feature.primaryUse || 'Unknown')
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "MarineHydrokineticProjects":
                                if (feature.TOTAL_CNT > 0) {
                                    AOI.hydrok.push({
                                        TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                        PRIMARY_USE: (feature.energyType ) + ' projects'
                                    });
                                }
                                AOI.addMetadata(feature);
                                break;
                            case "ecstdb2014":
                                if (feature.TOTAL_CNT > 0) {
                                    AOI.surfsed.push({
                                        TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                        PRIMARY_USE: ((feature.CLASSIFICA === ' ') ? 'Unknown' : feature.CLASSIFICA )
                                    });
                                }
                                AOI.addMetadata(feature);
                                break;
                            case "Sand_n_GravelLeaseAreas": //aka Marine Minerals Leases
                                AOI.mml.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0)
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "TribalLands":
                                AOI.CETribalLands.push({
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    NAMELSAD: (feature.NAMELSAD || 'Unknown'),
                                    Dist_Mi: (feature.Dist_Mi || 0)
                                });
                                AOI.addMetadata(feature);
                                break;
                            case  "BOEM_Wind_Planning_Areas":
                                AOI.boem.push({
                                    INFO: feature.INFO,
                                    PROT_NUMBE: feature.PROT_NUMBE,
                                    LINK1: feature.LINK1,
                                    LINK2: feature.LINK2,
                                    PERC_COVER: feature.PERC_COVER,
                                    TOTAL_BLOC: feature.TOTAL_BLOC,
                                    TOTAL_CNT: feature.TOTAL_CNT,
                                    METADATA_URL: feature.METADATA_URL
                                });
                                AOI.addMetadata(feature);
                                break;
                            case "ActiveRenewableEnergyLeases":
                                AOI.arel.push({
                                    Lease_Numb: feature.Lease_Numb,
                                    Company: feature.Company,
                                    INFO: feature.INFO,
                                    PROT_NUMBE: feature.PROT_NUMBE,
                                    LINK1: feature.LINK1,
                                    LINK2: feature.LINK2,
                                    PERC_COVER: (feature.PERC_COVER || 0),
                                    TOTAL_BLOC: (feature.TOTAL_BLOC || 0),
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    METADATA_URL: feature.METADATA_URL
                                });
                                AOI.addMetadata(feature);
                                break;
                            case  "WindResourcePotential":
                                AOI.wind.push({
                                    WIND_CLASS: (feature.WIND_CLASS),
                                    AVG_WGHT: (feature.AVG_WGHT || 0).toFixed(2),
                                    PERC_COVER: (feature.PERC_COVER || 0),
                                    HOUSES_SUM: (feature.HOUSES_SUM || 0).toLocaleString(),
                                    CAPACITY: (feature.CAPACITY || 0).toLocaleString(),
                                    TOTAL_BLOC: (feature.TOTAL_BLOC || 0),
                                    TOTAL_CNT: (feature.TOTAL_CNT || 0),
                                    METADATA_URL: feature.METADATA_URL
                                });
                                AOI.addMetadata(feature);

                                if (feature.TOTAL_CNT > 0) {
                                    switch (feature.WIND_CLASS.substring(0, 3)) {
                                        case "Sup":
                                            AOI.windclass[0] = feature.PERC_COVER;
                                            break;
                                        case "Out":
                                            AOI.windclass[1] = feature.PERC_COVER;
                                            break;
                                        case "Exc":
                                            AOI.windclass[2] = feature.PERC_COVER;
                                            break;
                                        case "Goo":
                                            AOI.windclass[3] = feature.PERC_COVER;
                                            break;
                                        case "Fai":
                                            AOI.windclass[4] = feature.PERC_COVER;
                                            break;
                                        case "Uns":
                                            AOI.windclass[5] = feature.PERC_COVER;
                                            break;
                                    }
                                }
                                break;
                        }
                    });

                    var y = 35;
                    var x = 35;
                    var chartrow = 1;
                    angular.forEach(AOI.ECEcon, function (myECEcon, index) {

                        if (index && (index % 3 === 0)) {
                            y += 120;
                            x = 35;
                            chartrow++;
                        } else if (index) x += 135;

                        AOI.OceanJobContributionsSeries[index] = {
                            center: [x, y],
                            "name": myECEcon.Name,
                            "showInLegend": (index === 0 ? true : false),
                            "data": [
                                ["Marine Construction", myECEcon.GDP_MarineConstruction],
                                ["Living Resources", myECEcon.GDP_LivingResources],
                                ["Marine Transportation", myECEcon.GDP_MarineTransp],
                                ["Offshore Mineral Extraction", myECEcon.GDP_OffshoreMineralExt],
                                ["Ship and Boat Building", myECEcon.GDP_ShipAndBoatBuilding],
                                ["Tourism and Recreation", myECEcon.GDP_TourismAndRec]
                            ],
                            title: {

                                style: {color: '#4a4a4a'},
                                align: 'center',
                                format: '{name}',
                                verticalAlign: 'top',
                                y: -20
                            }
                        }

                    })


                    AOI.OceanJobContributionsChartHeight = ((chartrow * 120) + 18);


                    if (AOI.wavepwr.length > 0) {
                        if (AOI.wavepwr[0].AVG_WAVE_POWER > 40) {
                            AOI.wavepwr[0].COLOR = '#B0B497';
                        } else if (AOI.wavepwr[0].AVG_WAVE_POWER > 30.0) {
                            AOI.wavepwr[0].COLOR = '#B6BC9E';
                        } else if (AOI.wavepwr[0].AVG_WAVE_POWER > 20.0) {
                            AOI.wavepwr[0].COLOR = '#BBC1A4';
                        } else if (AOI.wavepwr[0].AVG_WAVE_POWER > 15.0) {
                            AOI.wavepwr[0].COLOR = '#C0C6A8';
                        } else if (AOI.wavepwr[0].AVG_WAVE_POWER > 10.0) {
                            AOI.wavepwr[0].COLOR = '#C9D0B1';
                        } else if (AOI.wavepwr[0].AVG_WAVE_POWER > 8.0) {
                            AOI.wavepwr[0].COLOR = '#D0D8B9';
                        } else if (AOI.wavepwr[0].AVG_WAVE_POWER > 6) {
                            AOI.wavepwr[0].COLOR = '#D5DDC0';
                        } else if (AOI.wavepwr[0].AVG_WAVE_POWER > 4.0) {
                            AOI.wavepwr[0].COLOR = '#DEE7C9';

                        } else if (AOI.wavepwr[0].AVG_WAVE_POWER > 2.0) {
                            AOI.wavepwr[0].COLOR = '#E4EFD2';
                        } else if (AOI.wavepwr[0].AVG_WAVE_POWER < 2.01) {
                            AOI.wavepwr[0].COLOR = '#EBF6D8';
                        } else {
                            AOI.wavepwr[0].COLOR = 'white';
                        }
                    }
                    AOI.windclass[6] = (AOI.windclass.reduce(function (prev, cur) {
                        return prev.toFixed(2) - cur.toFixed(2);
                    }, 100));
                    if (AOI.boem[0] == null) {
                        AOI.boem[0] = {
                            INFO: "NA",
                            PROT_NUMBE: 0,
                            LINK1: "NA",
                            LINK2: "NA",
                            PERC_COVER: 0,
                            TOTAL_BLOC: 0,
                            TOTAL_CNT: 0
                        };
                    }
                    if (AOI.arel[0] == null) {
                        AOI.arel[0] = {
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
                    AOI.TIPrincipalPorts.sort(function (a, b) {
                        return parseFloat(a.Dist_Mi) - parseFloat(b.Dist_Mi);
                    });
                    AOI.CEPlaces.sort(function (a, b) {
                        return parseFloat(a.Dist_Mi) - parseFloat(b.Dist_Mi);
                    });
                    AOI.boem.sort(function (a, b) {
                        return parseFloat(b.PERC_COVER) - parseFloat(a.PERC_COVER);
                    });
                    AOI.arel.sort(function (a, b) {
                        return parseFloat(b.PERC_COVER) - parseFloat(a.PERC_COVER);
                    });

                    if (AOI.boem[0].TOTAL_CNT === 0) {
                        AOI.boem[0].PERC_COVER = 0;
                        AOI.boem[0].TOTAL_BLOC = 0;
                    }
                    if (AOI.arel[0] == null)AOI.arel[0].TOTAL_CNT = 0;
                    if (AOI.arel[0].TOTAL_CNT === 0) {
                        AOI.arel[0].PERC_COVER = 0;
                        AOI.arel[0].TOTAL_BLOC = 0;
                    }
                    AOI.loadWindChart();
                    AOI.loadStateChart();
                    AOI.loadOceanJobEmployeesChart();
                    AOI.loadOceanJobDollarsChart();
                    AOI.loadOceanJobContributionsChart();
                    //because? and until all direct DOM manipulation is removed from code, this $apply is useful to
                    // clear some digest issue that appear as timing issues.
                    if (AOI.ID !== -9999) {

                        //$rootScope.$apply();
                    }


                },
                addMetadata: function (feature) {
                    if (feature.METADATA_URL != null) {
                        AOI.metadata.push({
                            REPORT_CAT: feature.REPORT_CAT,
                            COMMON_NM: feature.COMMON_NM,
                            METADATA_URL: feature.METADATA_URL,
                            METADATA_OWNER: feature.METADATA_OWNER,
                            METADATA_OWNER_ABV: feature.METADATA_OWNER_ABV,
                            METADATA_SORT: feature.METADATA_SORT
                        });
                    }
                },
                unloadData: function () {

                    if (AOI.isLoaded) {
                        AOI.map.removeLayer(AOI.layer);
                        AOI.map.removeLayer(AOI.oceanDisposalSites);
                        AOI.map.removeLayer(AOI.HydrokineticLeases);
                        AOI.map.removeLayer(AOI.windPlanningLayer);
                        AOI.map.removeLayer(AOI.windLeaseLayer);
                        AOI.map.removeLayer(AOI.windrpLayer);
                        AOI.map.removeLayer(AOI.marineMineralsLeases);
                        AOI.map.removeLayer(AOI.wavePower);
                        AOI.map.removeLayer(AOI.tidalPower);
                        AOI.map.removeLayer(AOI.currentPower);
                        AOI.map.removeLayer(AOI.beachNourish);
                        AOI.map.removeLayer(AOI.coastalEnergyFacilities);
                        AOI.map.removeLayer(AOI.CEElevationLayer);
                        AOI.map.removeLayer(AOI.TISubmarineLayer);
                        AOI.map.removeLayer(AOI.TIDangerZonesLayer);
                        AOI.map.removeLayer(AOI.CEPlaceLayer);
                        AOI.map.removeLayer(AOI.CETribalLayer);
                        AOI.map.removeLayer(AOI.TIVessels);
                        AOI.map.removeLayer(AOI.TIPrincipalPortsLayer);
                        AOI.map.removeLayer(AOI.NRCNearbyLayer);
                        AOI.map.removeLayer(AOI.NRCReefsLayer);
                        AOI.map.removeLayer(AOI.NRCSoftCoralLayer);
                        AOI.map.removeLayer(AOI.NRCStoneyCoralLayer);
                        AOI.map.removeLayer(AOI.NRCBarrierLayer);
                        AOI.map.removeLayer(AOI.ECCoastalCountiesLayer);

                        AOI.windLeaseLayerIsVisible = false;
                        AOI.windrpLayerIsVisible = false;
                        AOI.windPlanningLayerIsVisible = false;
                        AOI.oceanDisposalSitesIsVisible = false;
                        AOI.marineMineralsLeases = false;
                        AOI.HydrokineticLeasesIsVisible = false;
                        AOI.wavePowerIsVisable = false;
                        AOI.tidalPowerIsVisable = false;
                        AOI.currentPowerIsVisable = false;
                        AOI.beachNourishIsVisable = false;
                        AOI.coastalEnergyFacilitiesIsVisable = false;
                        AOI.CEElevationIsVisable = false;
                        AOI.TISubmarineIsVisable = false;
                        AOI.TIDangerZonesIsVisable = false;
                        AOI.CEPlaceLayerIsVisible = false;
                        AOI.TIVesselsIsVisible = false;
                        AOI.TIPrincipalPortsIsVisible = false;
                        AOI.NRCNearbyLayerIsVisible = false;
                        AOI.NRCReefsLayerIsVisible = false;
                        AOI.NRCSoftCoralLayerIsVisible = false;
                        AOI.NRCStoneyCoralLayerIsVisible = false;
                        AOI.NRCBarrierLayerIsVisible = false;
                        AOI.ECCoastalCountiesLayerIsVisible = false;


                        AOI.wind.length = 0;
                        AOI.boem.length = 0;
                        AOI.metadata.length = 0;
                        AOI.optLayer.length = 0;
                        AOI.windclass.length = 0;
                        AOI.disp.length = 0;
                        AOI.mml.length = 0;
                        AOI.hydrok.length = 0;
                        AOI.CETribalLands.length = 0;
                        AOI.surfsed.length = 0;
                        AOI.wavepwr.length = 0;
                        AOI.tidalpwr.length = 0;
                        AOI.currentpwr.length = 0;
                        AOI.beachNur.length = 0;
                        AOI.OGPlanA.length = 0;
                        AOI.OGLease.length = 0;
                        AOI.OGWells.length = 0;
                        AOI.OGresource.length = 0;
                        AOI.coastfac.length = 0;
                        AOI.CEElevation.length = 0;
                        AOI.CEAreaOfPoly.length = 0;
                        AOI.CEFedGeoRegs.length = 0;
                        AOI.CECongress.length = 0;
                        AOI.CEHouse.length = 0;
                        AOI.CESenate.length = 0;
                        AOI.CECoastalCounties.length = 0;
                        AOI.CEFederalAndState.length = 0;
                        AOI.CEFederalTotal = 0;
                        AOI.CEStateTotal = 0;
                        AOI.TISubmarine.length = 0;
                        AOI.TICoastal.length = 0;
                        AOI.TIDangerZones.length = 0;
                        AOI.NRCHabConcern.length = 0;
                        AOI.NRCCriticalHab.length = 0;
                        AOI.NRCMigratoryFish.length = 0;
                        AOI.NRCMigratorySharks.length = 0;
                        AOI.ECEcon.length = 0;
                        AOI.ECEconEmploy.length = 0;
                        AOI.ECEconGDP.length = 0;
                        AOI.ECEconWages.length = 0;
                        AOI.ECStateGDP.length = 0;
                        AOI.ECCountyGDP.length = 0;
                        AOI.OceanJobContributionsSeries.length = 0;
                        AOI.drawAreaJobId = {};
                        AOI.Shared = false;
                        AOI.CEPlaces.length = 0;
                        AOI.TIShipping.length = 0;
                        AOI.TIShippingTotal = 0;
                        AOI.TIRightWhale.length = 0;
                        AOI.TIVessel.length = 0;
                        AOI.TIPrincipalPorts.length = 0;
                        AOI.NRCNearby.length = 0;
                        AOI.NRCReefs.length = 0;
                        AOI.NRCSoftCoral.length = 0;
                        AOI.NRCStonyCoral.length = 0;
                        AOI.NRCBarrier.length = 0;
                        AOI.ECCoastalCounties.length = 0;
                        AOI.ECFishRevenue.length = 0;
                        AOI.TIAnchorage.length = 0;
                        AOI.TIPilot.length = 0;

                        AOI.hide();

                    }
                    AOI.isLoaded = false;
                },
                isLoaded: false,
                ECCoastalCountiesLayerIsVisible: false,
                toggleECCoastalCountiesLayer: function () {

                    if (!AOI.ECCoastalCountiesLayerIsVisible) {
                        AOI.ECCoastalCountiesLayer.addTo(AOI.map);
                        AOI.ECCoastalCountiesLayerIsVisible = true;
                    } else {
                        AOI.map.removeLayer(AOI.ECCoastalCountiesLayer);
                        AOI.ECCoastalCountiesLayerIsVisible = false;
                    }
                },
                NRCBarrierLayerIsVisible: false,
                toggleNRCBarrierLayer: function () {

                    if (!AOI.NRCBarrierLayerIsVisible) {
                        AOI.NRCBarrierLayer.addTo(AOI.map);
                        AOI.NRCBarrierLayerIsVisible = true;
                    } else {
                        AOI.map.removeLayer(AOI.NRCBarrierLayer);
                        AOI.NRCBarrierLayerIsVisible = false;
                    }
                },
                NRCStoneyCoralLayerIsVisible: false,
                toggleNRCStoneyCoralLayer: function () {

                    if (!AOI.NRCStoneyCoralLayerIsVisible) {
                        AOI.NRCStoneyCoralLayer.addTo(AOI.map);
                        AOI.NRCStoneyCoralLayerIsVisible = true;
                    } else {
                        AOI.map.removeLayer(AOI.NRCStoneyCoralLayer);
                        AOI.NRCStoneyCoralLayerIsVisible = false;
                    }
                },
                NRCSoftCoralLayerIsVisible: false,
                toggleNRCSoftCoralLayer: function () {

                    if (!AOI.NRCSoftCoralLayerIsVisible) {
                        AOI.NRCSoftCoralLayer.addTo(AOI.map);
                        AOI.NRCSoftCoralLayerIsVisible = true;
                    } else {
                        AOI.map.removeLayer(AOI.NRCSoftCoralLayer);
                        AOI.NRCSoftCoralLayerIsVisible = false;
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

                    if (!AOI.NRCNearbyLayerIsVisible) {
                        AOI.NRCNearbyLayer.addTo(AOI.map);
                        AOI.NRCNearbyLayerIsVisible = true;
                    } else {
                        AOI.map.removeLayer(AOI.NRCNearbyLayer);
                        AOI.NRCNearbyLayerIsVisible = false;
                    }
                },

                TIPrincipalPortsIsVisible: false,
                toggleTIPrincipalPorts: function () {


                    if (!AOI.TIPrincipalPortsIsVisible) {
                        AOI.TIPrincipalPortsLayer.addTo(AOI.map);
                        AOI.TIPrincipalPortsIsVisible = true;
                    } else {
                        AOI.map.removeLayer(AOI.TIPrincipalPortsLayer);
                        AOI.TIPrincipalPortsIsVisible = false;
                    }
                },
                TIVesselsIsVisible: false,
                toggleTIVessels: function () {


                    if (!AOI.TIVesselsIsVisible) {
                        AOI.TIVessels.addTo(AOI.map);
                        AOI.TIVesselsIsVisible = true;
                    } else {
                        AOI.map.removeLayer(AOI.TIVessels);
                        AOI.TIVesselsIsVisible = false;
                    }
                },
                CEPlaceLayerIsVisible: false,
                toggleCEPlaceLayer: function () {

                    if (!AOI.CEPlaceLayerIsVisible) {
                        AOI.CEPlaceLayer.addTo(AOI.map);
                        AOI.CETribalLayer.addTo(AOI.map);
                        AOI.CEPlaceLayerIsVisible = true;
                    } else {
                        AOI.map.removeLayer(AOI.CEPlaceLayer);
                        AOI.map.removeLayer(AOI.CETribalLayer);
                        AOI.CEPlaceLayerIsVisible = false;
                    }
                },
                windLeaseLayerIsVisible: false,
                toggleWindLeaseLayer: function () {

                    if (!AOI.windLeaseLayerIsVisible) {
                        AOI.windLeaseLayer.addTo(AOI.map);
                        AOI.windLeaseLayerIsVisible = true;
                    } else {
                        AOI.map.removeLayer(AOI.windLeaseLayer);
                        AOI.windLeaseLayerIsVisible = false;
                    }
                },
                windPlanningLayerIsVisible: false,
                toggleWindPlanningLayer: function () {
                    if (!AOI.windPlanningLayerIsVisible) {
                        AOI.windPlanningLayer.addTo(AOI.map);
                        AOI.windPlanningLayerIsVisible = true;
                    } else {
                        AOI.map.removeLayer(AOI.windPlanningLayer);
                        AOI.windPlanningLayerIsVisible = false;
                    }
                },
                oceanDisposalSitesIsVisible: false,
                toggleOceanDisposalSites: function () {

                    if (!AOI.oceanDisposalSitesIsVisible) {
                        AOI.oceanDisposalSites.addTo(AOI.map);
                        AOI.oceanDisposalSitesIsVisible = true;
                    } else {
                        AOI.map.removeLayer(AOI.oceanDisposalSites);
                        AOI.oceanDisposalSitesIsVisible = false;
                    }
                },
                HydrokineticLeasesIsVisible: false,
                toggleHydrokineticLeases: function () {

                    if (!AOI.HydrokineticLeasesIsVisible) {
                        AOI.HydrokineticLeases.addTo(AOI.map);
                        AOI.HydrokineticLeasesIsVisible = true;
                    } else {
                        AOI.map.removeLayer(AOI.HydrokineticLeases);
                        AOI.HydrokineticLeasesIsVisible = false;
                    }
                },

                marineMineralsLeasesIsVisable: false,
                toggleMarineMineralsLeases: function () {

                    if (!AOI.marineMineralsLeasesIsVisable) {
                        AOI.marineMineralsLeases.addTo(AOI.map);
                        AOI.marineMineralsLeasesIsVisable = true;
                    } else {
                        AOI.map.removeLayer(AOI.marineMineralsLeases);
                        AOI.marineMineralsLeasesIsVisable = false;
                    }
                },
                wavePowerIsVisable: false,
                togglewavePower: function () {

                    if (!AOI.wavePowerIsVisable) {
                        AOI.wavePower.addTo(AOI.map);
                        AOI.wavePowerIsVisable = true;
                    } else {
                        AOI.map.removeLayer(AOI.wavePower);
                        AOI.wavePowerIsVisable = false;
                    }
                },
                tidalPowerIsVisable: false,
                toggletidalPower: function () {

                    if (!AOI.tidalPowerIsVisable) {
                        AOI.tidalPower.addTo(AOI.map);
                        AOI.tidalPowerIsVisable = true;
                    } else {
                        AOI.map.removeLayer(AOI.tidalPower);
                        AOI.tidalPowerIsVisable = false;
                    }
                },
                currentPowerIsVisable: false,
                togglecurrentPower: function () {

                    if (!AOI.currentPowerIsVisable) {
                        AOI.currentPower.addTo(AOI.map);
                        AOI.currentPowerIsVisable = true;
                    } else {
                        AOI.map.removeLayer(AOI.currentPower);
                        AOI.currentPowerIsVisable = false;
                    }
                },
                beachNourishIsVisable: false,
                togglebeachNourish: function () {

                    if (!AOI.beachNourishIsVisable) {
                        AOI.beachNourish.addTo(AOI.map);
                        AOI.beachNourishIsVisable = true;
                    } else {
                        AOI.map.removeLayer(AOI.beachNourish);
                        AOI.beachNourishIsVisable = false;
                    }
                },
                coastalEnergyFacilitiesIsVisable: false,
                togglecoastalEnergyFacilities: function () {

                    if (!AOI.coastalEnergyFacilitiesIsVisable) {
                        AOI.coastalEnergyFacilities.addTo(AOI.map);
                        AOI.coastalEnergyFacilitiesIsVisable = true;
                    } else {
                        AOI.map.removeLayer(AOI.coastalEnergyFacilities);
                        AOI.coastalEnergyFacilitiesIsVisable = false;
                    }
                },

                windrpLayerIsVisible: false,
                toggleWindrpLayer: function () {

                    if (!AOI.windrpLayerIsVisible) {
                        AOI.windrpLayer.addTo(AOI.map);
                        AOI.windrpLayerIsVisible = true;
                    } else {
                        AOI.map.removeLayer(AOI.windrpLayer);
                        AOI.windrpLayerIsVisible = false;
                    }
                },
                CEElevationIsVisable: false,
                toggleCEElevation: function () {

                    if (!AOI.CEElevationIsVisable) {
                        AOI.CEElevationLayer.addTo(AOI.map);
                        AOI.CEElevationIsVisable = true;
                    } else {
                        AOI.map.removeLayer(AOI.CEElevationLayer);
                        AOI.CEElevationIsVisable = false;
                    }
                },
                TISubmarineIsVisable: false,
                toggleTISubmarine: function () {

                    if (!AOI.TISubmarineIsVisable) {
                        AOI.TISubmarineLayer.addTo(AOI.map);
                        AOI.TISubmarineIsVisable = true;
                    } else {
                        AOI.map.removeLayer(AOI.TISubmarineLayer);
                        AOI.TISubmarineIsVisable = false;
                    }
                },
                TIDangerZonesIsVisable: false,
                toggleTIDangerZones: function () {

                    if (!AOI.TIDangerZonesIsVisable) {
                        AOI.TIDangerZonesLayer.addTo(AOI.map);
                        AOI.TIDangerZonesIsVisable = true;
                    } else {
                        AOI.map.removeLayer(AOI.TIDangerZonesLayer);
                        AOI.TIDangerZonesIsVisable = false;
                    }
                },
                toggleFull: false,
                toggleFullSlider: function (pageID) {


                    AOI.toggleFull = !AOI.toggleFull;
                    AOI.doFullSlider(pageID);
                },
                doFullSlider: function (pageID) {


                    if (AOI.toggleFull) {

                        // the following should be changed to a more angularjs friendly approach. not supposed to be do DOM manipulation here.
                        document.getElementById("slide1").style.width = '100%';
                        document.getElementById("togglefull").style.marginLeft = '0px';
                        document.getElementById("togglefull").style.WebkitTransform = "rotate(180deg)";
                        document.getElementById("togglefull").style.msTransform = "rotate(180deg)";
                        document.getElementById("togglefull").style.transform = "rotate(180deg)";

                        var elems = document.getElementsByClassName('AOItabClass2');
                        angular.forEach(elems, function (myElement) {
                            myElement.style.display = 'inline-block';
                        })

                        if (pageID === "EM" || pageID === "CE" || pageID === "TI" || pageID === "NRC" || pageID === "EC") {

                            AOI.loadSmallMap(false);

                        }

                    } else {

                        document.getElementById("togglefull").style.marginLeft = "-25px";

                        document.getElementById("slide1").style.width = '50%';
                        var elems = document.getElementsByClassName('AOItabClass2');
                        angular.forEach(elems, function (myElement) {
                            myElement.style.display = 'none';
                        })

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
                    if (AOI.inPrintWindow) smallmap = L.map('smallmap', {preferCanvas: useCanvas}).setView([45.526, -122.667], 1);
                    else smallmap = L.map('smallmap').setView([45.526, -122.667], 1);
                    L.esri.basemapLayer('Oceans', {useCors: true}).addTo(smallmap);
                    L.esri.basemapLayer('OceansLabels').addTo(smallmap);
                    esriOceans = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
                        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
                        maxZoom: 12,
                        useCors: true
                    });

                    var minicLayer;
                    if (AOI.ID === -9999) {
                        minicLayer = L.geoJson(AOI.drawLayerShape, {
                            color: '#EB660C',
                            weight: 1.5,
                            fillOpacity: .3

                        }).addTo(smallmap);
                        AOI.minibounds = minicLayer.getBounds();
                        smallmap.fitBounds(AOI.minibounds);

                    } else {
                        minicLayer = L.esri.featureLayer({
                            url: AOIConfig.ortMapServer + AOIConfig.ortLayerAOI,
                            where: "AOI_ID =" + AOI.ID + "",
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
                            AOI.minibounds = bounds;
                            smallmap.fitBounds(bounds);
                            minicLayer.off('load');
                        });
                    }
                    smallmap.invalidateSize();
                    var test1 = false;
                    if ((AOI.inPrintWindow) && (test1)) {
                        leafletImage(smallmap, function (err, canvas) {
                            var img = document.createElement('img');
                            var dimensions = smallmap.getSize();
                            img.width = dimensions.x;
                            img.height = dimensions.y;
                            img.src = canvas.toDataURL();
                            document.getElementById('smallmap').innerHTML = '';
                            document.getElementById('smallmap').appendChild(img);
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
                    };

                },
                loadOceanJobDollarsChart: function () {


                    if (AOI.OceanJobDollarsChart) AOI.OceanJobDollarsChart = null;
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
                            "data": AOI.ECEconWages
                        }, {
                            "name": 'Goods & Services',
                            "data": AOI.ECEconGDP
                        }
                        ]

                    };
                },
                loadOceanJobEmployeesChart: function () {


                    if (AOI.OceanJobEmployeesChart) AOI.OceanJobEmployeesChart = null;
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
                            "data": AOI.ECEconEmploy
                        }]

                    };


                },
                loadWindChart: function () {


                    if (AOI.highchartsNG) AOI.highchartsNG = null;
                    AOI.highchartsNG = {
                        options: {
                            credits: {
                                enabled: false
                            },
                            chart: {
                                spacing: 0,
                                margin: 0,
                                type: 'column',
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
                            data: [AOI.windclass[0]]
                        }, {
                            showInLegend: false,
                            name: '',
                            data: [AOI.windclass[1]]
                        }, {
                            showInLegend: false,
                            name: '',
                            data: [AOI.windclass[2]]
                        }, {
                            showInLegend: false,
                            name: '',
                            data: [AOI.windclass[3]]
                        }, {
                            showInLegend: false,
                            name: '',
                            data: [AOI.windclass[4]]
                        }, {
                            showInLegend: false,
                            name: '',
                            data: [AOI.windclass[5]]
                        }, {
                            showInLegend: false,
                            name: '',
                            data: [AOI.windclass[6]]
                        }
                        ]

                    };


                },
                reloadAbort: function () {

                    setTimeout(function () {

                        $window.location.reload();

                    }, 100);


                },
                ShowURL: function () {
                    var shareURL = AOI.url[0] + '#/AOI?AOI=' + AOI.ID;
                    if (AOI.ID === -9999) {
                        shareURL = shareURL +
                            '&TI=' + AOI.drawAreaJobId.TI +
                            '&EC=' + AOI.drawAreaJobId.EC +
                            '&CE=' + AOI.drawAreaJobId.CE +
                            '&NRC=' + AOI.drawAreaJobId.NRC +
                            '&EM=' + AOI.drawAreaJobId.EM
                    }
                    return (shareURL);
                }
            };

            return AOI;
        }]);

