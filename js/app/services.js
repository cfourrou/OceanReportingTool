'use strict';

/* Services */


angular.module('myApp.services', []).factory('_', function () {
        return window._; // assumes underscore has already been loaded on the page
    })
    .provider('AOI', function () {
        var config = {
                ortMapServer: '',
                ortLayerAOI: '',
                ortLayerData: '',
                ortEnergyGPService: '',
                ortCommonGPService: '',
                ortTranspoGPService: '',
                ortNaturalGPService: '',
                ortEconGPService: '',
            },
            AOI;

        return {
            config: function (value) {
                config = value;
            },
            $get: ['$rootScope', '$window', function ($rootScope, $window) {


                AOI = {
                    OceanJobContributionsSeries: [],
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

                    display: function (AOI_ID) {
                        this.ID = AOI_ID;
                        if (this.ID === -9999) {
                            this.layer = L.geoJson(this.drawLayerShape, {
                                color: '#EB660C',
                                weight: 3,
                                fillOpacity: .3,
                                pane: 'AOIfeature'
                            }).addTo(map);
                            map.fitBounds(this.layer.getBounds(), {
                                padding: [50, 50]
                            });
                        } else {
                            this.layer = L.esri.featureLayer({ //AOI poly (7)
                                url: config.ortMapServer + config.ortLayerAOI,
                                color: '#EB660C', weight: 3, fillOpacity: .3,
                                where: "AOI_ID =" + this.ID + "",
                                pane: 'AOIfeature'

                                //simplifyFactor: 5.0,
                                //precision: 2
                            }).addTo(map);
                        }
                        //console.log(" this.layer loaded " + typeof(this.layer.getBounds));
                        this.isVisible = true;
                        //console.log("display: this.ID = " +AOI_ID);
                    },
                    hide: function () {
                        if (this.isVisible) {

                            //console.log("hide this.layer  =" + this.ID)
                            map.removeLayer(this.layer);
                        }
                        // probably move this somewhere better.
                        map.setView([33.51, -78.3], 6);
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
                        map.fitBounds(mbounds);


                    },
                    isVisible: false,
                    loadData: function (AOI_ID, name) {
                        // map.removeLayer(cLayer);
                        this.display(AOI_ID);
                        //this.isVisible = true;
                        var myThis = this;
                        //myThis.zoomTo();
                        myThis.name = name;
                        myThis.windrpLayer = L.esri.featureLayer({ //wind resource potential (18)
                            url: config.ortMapServer + ortLayerOptional[0].num,
                            pane: 'optionalfeature0',
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

                        myThis.windLeaseLayer = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[1].num,
                            pane: 'optionalfeature1',
                            style: function (feature) {

                                return {color: 'white', weight: 1, fillOpacity: .5};
                            }
                        });
                        myThis.windPlanningLayer = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[2].num,
                            pane: 'optionalfeature2',
                            style: function (feature) {

                                return {color: 'Black', weight: 1, fillOpacity: .5};
                            }
                        });
                        myThis.oceanDisposalSites = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[3].num,
                            pane: 'optionalfeature3',
                            style: function (feature) {
                                return {fillColor: '#FFA7A7', color: '#4A4A4A', weight: 1.5, fillOpacity: .5};
                            }
                        });
                        myThis.marineMineralsLeases = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[4].num,
                            pane: 'optionalfeature4',
                            style: function (feature) {
                                return {color: '#7300D9', weight: 4, fillOpacity: 0};
                            }
                        });
                        //there is no 5 yet

                        myThis.HydrokineticLeases = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[6].num,
                            pane: 'optionalfeature6',
                            pointToLayer: function (feature, latlng) {
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: 'img/HydrokineticLeasesGraphic.svg',
                                        iconSize: [32, 37],
                                        iconAnchor: [16, 37],
                                        popupAnchor: [0, -28]
                                    }),
                                });
                            }
                        });
                        //there is no 7 yet
                        myThis.wavePower = L.esri.featureLayer({
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

                        myThis.tidalPower = L.esri.dynamicMapLayer({
                            url: config.ortMapServer,
                            pane: 'optionalfeature9',
                            layers: [ortLayerOptional[9].num],
                            opacity: .8,
                        });
                        myThis.currentPower = L.esri.dynamicMapLayer({
                            url: config.ortMapServer,
                            pane: 'optionalfeature10',
                            layers: [ortLayerOptional[10].num],
                            opacity: .8,
                        });

                        myThis.beachNourish = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[11].num,
                            pane: 'optionalfeature11',
                            style: function (feature) {
                                return {color: '#8B572A', weight: 4, fillOpacity: 0};
                            }
                        });

                        myThis.coastalEnergyFacilities = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[16].num,
                            pane: 'optionalfeature16',
                            pointToLayer: function (feature, latlng) {
                                return L.marker(latlng, {
                                    icon: L.icon({
                                        iconUrl: 'img/CoastalEnergyGraphic.svg',
                                        iconSize: [32, 37],
                                        iconAnchor: [16, 37],
                                        popupAnchor: [0, -28]
                                    }),
                                });
                            }
                        });

                        myThis.CEElevation = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[26].num,
                            pane: 'optionalfeature26',
                            style: function (feature) {
                                return {color: '#3283BB', weight: 2, fillOpacity: 0};
                            }
                        });
                        myThis.TISubmarineLayer = L.esri.featureLayer({
                            url: config.ortMapServer + ortLayerOptional[34].num,
                            pane: 'optionalfeature34',
                            style: function (feature) {
                                return {color: '#880cf4', weight: 2, fillOpacity: 0};
                            }
                        });
                        myThis.TIDangerZonesLayer = L.esri.featureLayer({ //wind resource potential (18)
                            url: config.ortMapServer + ortLayerOptional[35].num,
                            pane: 'optionalfeature35',
                            //simplifyFactor: 5.0,
                            //precision: 3,
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


                        var query = L.esri.query({
                            url: config.ortMapServer + config.ortLayerData
                        });

                        if (myThis.ID === -9999) {
                            var featureCollection = JSON.parse(JSON.stringify(myThis.featureCollection));
                            //console.log(featureCollection);
                            var newarray = [];
                            angular.forEach(featureCollection.features, function (feature) {
                                var newobject = {};
                                angular.forEach(featureCollection.fields, function (field) {
                                    newobject[field.name] = feature.attributes[field.name];
                                });
                                newarray.push(newobject);
                            });
                            //console.log(newarray);
                            myThis.massageData(newarray);

                        } else {
                            query.returnGeometry(false).where("AOI_ID =" + myThis.ID + "").run(function (error, featureCollection, response) {
                                // var mFeatureCollection = JSON.parse(JSON.stringify(featureCollection));
                                // console.log(featureCollection);
                                var newarray = [];
                                angular.forEach(featureCollection.features, function (feature) {
                                    var newobject = {};
                                    angular.forEach(response.fields, function (field) {
                                        newobject[field.name] = feature.properties[field.name];
                                    });
                                    newarray.push(newobject);
                                });
                                //the idea here is , since the two arrays that can make it to .massageData are organized differently, we need to parse them into a known structure.

                                //console.log(newarray);
                                //console.log(newarray.length);
                                //console.log(newarray[0].AOI_ID);
                                myThis.massageData(newarray);
                            });
                        }
                        myThis.isLoaded = true;
                    }
                    ,

                    massageData: function (featureCollection) {
                        var myThis = this;
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
                        var ack = [];
                        // var za = 0;

                        for (var i = 0, j = featureCollection.length; i < j; i++) {
                            switch (featureCollection[i].DATASET_NM) {
                                case "Coastal_Shoreline_Counties_2010":
                                    myThis.ECCountyGDP[ci] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        cntyname: (featureCollection[i].cntyname || 'Unknown'),
                                        MedHHInc: (featureCollection[i].MedHHInc || 0),
                                        TotalHouses: (featureCollection[i].TotalHouses || 0),
                                        Population: (featureCollection[i].Population || 0),
                                        PercentTotGDP: (featureCollection[i].PercentTotGDP || 0),
                                        // entity:(featureCollection[i].cntyname || featureCollection[i].st_name)

                                    };


                                    if ((ci === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    ci++;
                                    break;

                                case "CoastalStates":
                                    myThis.ECStateGDP[ch] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        st_name: (featureCollection[i].st_name || 'Unknown'),
                                        MedHHInc: (featureCollection[i].MedHHInc || 0),
                                        TotalHouses: (featureCollection[i].TotalHouses || 0),
                                        Population: (featureCollection[i].Population || 0),
                                        PercentTotGDP: (featureCollection[i].PercentTotGDP || 0),
                                        // entity:(featureCollection[i].cntyname || featureCollection[i].st_name)

                                    };


                                    if ((ch === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    ch++;
                                    break;
                                case "ENOW_2013":
                                    myThis.ECEcon[cg] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        cntyname: (featureCollection[i].cntyname || 'Unknown'),
                                        st_name: (featureCollection[i].st_name || 'Unknown'),
                                        OceanSector: (featureCollection[i].OceanSector || 'Unknown'),
                                        Employment: (featureCollection[i].Employment || 0),
                                        Wages: (featureCollection[i].Wages || 0),
                                        GDP: (featureCollection[i].GDP || 0),
                                        // entity:(featureCollection[i].cntyname || featureCollection[i].st_name)

                                    };
                                    switch (featureCollection[i].OceanSector) {
                                        case "All Ocean Sectors":
                                            myThis.ECEconEmploy[myThis.ECEconEmploy.length] = [(featureCollection[i].cntyname || featureCollection[i].st_name), (featureCollection[i].Employment || 0)];
                                            myThis.ECEconGDP[myThis.ECEconGDP.length] = [(featureCollection[i].cntyname || featureCollection[i].st_name), (featureCollection[i].GDP || 0)];
                                            myThis.ECEconWages[myThis.ECEconWages.length] = [(featureCollection[i].cntyname || featureCollection[i].st_name), (featureCollection[i].Wages || 0)];
                                            break;

                                    }

                                    if ((cg === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    cg++;
                                    break;
                                case "NMFS_HMS_Fish":
                                    myThis.NRCMigratoryFish[ce] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        LIFE_STAGE: (featureCollection[i].LIFE_STAGE || 'Unknown'),
                                        SPECIES: (featureCollection[i].SPECIES || 'Unknown'),
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 'Unknown')

                                    };

                                    if ((ce === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    ce++;
                                    break;

                                case "NMFS_HMS_Sharks":
                                    myThis.NRCMigratorySharks[cf] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        LIFE_STAGE: (featureCollection[i].LIFE_STAGE || 'Unknown'),
                                        SPECIES: (featureCollection[i].SPECIES || 'Unknown'),
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 'Unknown')

                                    };

                                    if ((cf === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    cf++;
                                    break;
                                case "NMFS_CHD_SouthAtl":
                                    myThis.NRCCriticalHab[cd] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        AREANAME: (featureCollection[i].AREANAME || 'Unknown'),
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 'Unknown')

                                    };

                                    if ((cd === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    cd++;
                                    break;
                                case "SERO_HAPC_PartK":
                                    myThis.NRCHabConcern[cc] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        AREA_NAME: (featureCollection[i].AREA_NAME || 'Unknown'),
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 'Unknown')

                                    };

                                    if ((cc === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    cc++;
                                    break;
                                case "Danger_Zones_and_Restricted_Areas":
                                    myThis.TIDangerZones[cb] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        boundaryType: (featureCollection[i].boundaryType || 'Unknown'),
                                        agencyOfUse: (featureCollection[i].agencyOfUse || 'Unknown'),
                                        PERC_COVER: (featureCollection[i].PERC_COVER || 'Unknown'),
                                        Style: 'c_' + (featureCollection[i].agencyOfUse || 'Unknown').substr(-4, 4)

                                    };

                                    if ((cb === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    cb++;
                                    break;
                                case "Coastal_Maintained_Channels":
                                    myThis.TICoastal[ca] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0)


                                    };

                                    if ((ca === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    ca++;
                                    break;
                                case "SubmarineCables":
                                    myThis.TISubmarine[bz] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Owner: (featureCollection[i].Owner || 'Unknown'),
                                        STATUS: (featureCollection[i].STATUS || 'Unknown'),
                                        OwnerStatus: (featureCollection[i].Owner || 'Unknown') + " - " + (featureCollection[i].STATUS || 'Unknown')


                                    };

                                    if ((bz === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bz++;
                                    break;
                                case "FederalAndStateWaters":
                                    myThis.CEFederalAndState[by] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        jurisdiction: (featureCollection[i].jurisdiction || 'Unknown'),
                                        perc_jurisdiction: (featureCollection[i].perc_jurisdiction || 'Unknown'),
                                        Area_mi2: (featureCollection[i].Area_mi2 || 'Unknown')

                                    };

                                    if ((by === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;
                                    if (featureCollection[i].TOTAL_CNT > 0) {

                                        if ((featureCollection[i].jurisdiction.substring(0, 3)) === "Fed") {

                                            myThis.CEFederalTotal = parseInt(myThis.CEFederalTotal, 10) + parseInt(featureCollection[i].Area_mi2, 10);


                                        } else  myThis.CEStateTotal = parseInt(myThis.CEStateTotal, 10) + parseInt(featureCollection[i].Area_mi2, 10);

                                    }
                                    // console.log("in load loop fed= " + myThis.CEFederalTotal);
                                    // console.log("in load loop state= " + myThis.CEStateTotal);
                                    by++;
                                    break;
                                case "CoastalCounties":
                                    myThis.CECoastalCounties[bx] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        cntyname: (featureCollection[i].cntyname || 'Unknown'),
                                        st_abbr: (featureCollection[i].st_abbr || 'Unknown'),
                                        ctystate: (featureCollection[i].st_abbr || 'Unknown'),
                                        st_name: (featureCollection[i].st_name || 'Unknown')


                                    };

                                    if ((bx === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bx++;
                                    break;
                                case "Coastal_State_Legislative_Districts_House":
                                    myThis.CEHouse[bv] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        NAMELSAD: (featureCollection[i].NAMELSAD || 'Unknown'),
                                        stateName: (featureCollection[i].stateName || 'Unknown')


                                    };

                                    if ((bv === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bv++;
                                    break;
                                case "Coastal_State_Legislative_Districts_Senate":
                                    myThis.CESenate[bw] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        NAMELSAD: (featureCollection[i].NAMELSAD || 'Unknown'),
                                        stateName: (featureCollection[i].stateName || 'Unknown')


                                    };

                                    if ((bw === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bw++;
                                    break;
                                case "Coastal_Congressional_Districts_114th":
                                    myThis.CECongress[bu] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        NAMELSAD: (featureCollection[i].NAMELSAD || 'Unknown'),
                                        stateName: (featureCollection[i].stateName || 'Unknown')


                                    };

                                    if ((bu === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bu++;
                                    break;
                                case "FederalGeoRegulations":
                                    myThis.CEFedGeoRegs[bt] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        FederalGeoRegulationsName: (featureCollection[i].FederalGeoRegulationsName || 'Unknown'),
                                        FederalGeoRegulationsID: (featureCollection[i].FederalGeoRegulationsID || 'Unknown'),
                                        DescriptionURL: (featureCollection[i].DescriptionURL || '')


                                    };

                                    if ((bt === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bt++;
                                    break;
                                case "AOI_input":
                                    myThis.CEAreaOfPoly[bs] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Area_mi2: (featureCollection[i].Area_mi2 || 'Unknown'),
                                        Area_km2: (featureCollection[i].Area_km2 || 'Unknown'),
                                        Area_nm2: (featureCollection[i].Area_nm2 || 'Unknown')

                                    };


                                    bs++;
                                    break;
                                case "crm_v1":
                                    myThis.CEElevation[br] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        depth_min_m: (featureCollection[i].depth_min_m || 'Unknown'),
                                        depth_max_m: (featureCollection[i].depth_max_m || 'Unknown'),
                                        depth_mean_m: (featureCollection[i].depth_mean_m || 'Unknown')

                                    };

                                    if ((br === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    br++;
                                    break;
                                case "CoastalEnergyFacilities":
                                    myThis.coastfac[bq] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Name: (featureCollection[i].Name || 'None'),
                                        Type: (featureCollection[i].Type || 'None'),
                                        CAPACITY: (featureCollection[i].CAPACITY || 'None'),
                                        Dist_Mi: (featureCollection[i].Dist_Mi || 'None')

                                    };

                                    if ((bq === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bq++;
                                    break;
                                case "OG_ResourcePotential":
                                    myThis.OGresource[bp] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        OCS_Play: (featureCollection[i].OCS_Play || 'None'),
                                        UTRR_Oil: (featureCollection[i].UTRR_Oil || 'None'),
                                        UTRR_Gas: (featureCollection[i].UTRR_Gas || 'None'),
                                        UTRR_BOE: (featureCollection[i].UTRR_BOE || 'None')

                                    };

                                    if ((bp === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bp++;
                                    break;
                                case "OG_Wells":
                                    myThis.OGWells[bo] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        COMPANY_NA: (featureCollection[i].COMPANY_NA || 'None'),
                                        STATUS: (featureCollection[i].STATUS || 'None')

                                    };

                                    if ((bo === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bo++;
                                    break;
                                case "al_20160301":
                                    myThis.OGLease[bn] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Lease_Numb: (featureCollection[i].Lease_Numb || 'None'),
                                        Lease_expt: (featureCollection[i].Lease_expt || 'None')

                                    };

                                    if ((bn === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bn++;
                                    break;
                                case "OilandGasPlanningAreas":
                                    myThis.OGPlanA[bm] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        Region: (featureCollection[i].Region || 'unknown')

                                    };

                                    if ((bm === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bm++;
                                    break;
                                case "SC_BeachProjects":
                                    myThis.beachNur[bl] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        BEACH_AREA: (featureCollection[i].BEACH_AREA || 'unknown'),
                                        YEAR: (featureCollection[i].YEAR || '0'),
                                        SAND_VOL_C: (featureCollection[i].SAND_VOL_C || '0'),
                                        Dist_Mi: ((featureCollection[i].Dist_Mi === ' ') ? '0' : featureCollection[i].Dist_Mi )
                                    };

                                    if ((bl === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bl++;
                                    break;
                                case "us_oc_ms":
                                    myThis.currentpwr[bk] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        AVG_OCEAN_CURRENT: (featureCollection[i].AVG_OCEAN_CURRENT || 0),
                                        SUITABILITY_OCEAN_SPEED: (featureCollection[i].SUITABILITY_OCEAN_SPEED || 'NO')
                                    };

                                    if ((featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bk++;
                                    break;
                                case "usa_mc_wm":
                                    myThis.tidalpwr[bj] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        AVG_TIDAL_CURRENT: (featureCollection[i].AVG_TIDAL_CURRENT || 0),
                                        SUITABILITY_TIDAL_DEPTH: (featureCollection[i].SUITABILITY_TIDAL_DEPTH || 'NO'),
                                        SUITABILITY_TIDAL_AREA: (featureCollection[i].SUITABILITY_TIDAL_AREA || 'NO'),
                                        SUITABILITY_TIDAL_SPEED: (featureCollection[i].SUITABILITY_TIDAL_SPEED || 'NO')
                                    };

                                    if ((featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bj++;
                                    break;
                                case "OceanWaveResourcePotential":
                                    myThis.wavepwr[bi] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        AVG_WAVE_POWER: (featureCollection[i].AVG_WAVE_POWER || 0),
                                        SUITABILITY_OCEAN_POWER: (featureCollection[i].SUITABILITY_OCEAN_POWER || 'Unknown')
                                    };
                                    //console.log(myThis.wavepwr[bi].COLOR);
                                    if ((featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bi++;
                                    break;

                                case "OceanDisposalSites":
                                    myThis.disp[be] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        PRIMARY_USE: (featureCollection[i].primaryUse || 'Unknown')
                                    };

                                    if ((be === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    be++;
                                    break;
                                case "MarineHydrokineticProjects":
                                    if (featureCollection[i].TOTAL_CNT > 0) {
                                        myThis.hydrok[bg] = {
                                            TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                            PRIMARY_USE: (featureCollection[i].energyType ) + ' projects'
                                        };
                                    }
                                    if ((bg === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;
                                    //console.log("hydrok "+myThis.hydrok);
                                    bg++;

                                    break;
                                case "ecstdb2014":
                                    if (featureCollection[i].TOTAL_CNT > 0) {
                                        myThis.surfsed[bh] = {
                                            TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                            PRIMARY_USE: ((featureCollection[i].CLASSIFICA === ' ') ? 'Unknown' : featureCollection[i].CLASSIFICA )
                                        };
                                    }
                                    if ((bh === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bh++;

                                    break;

                                case "Sand_n_GravelLeaseAreas": //aka Marine Minerals Leases
                                    myThis.mml[bf] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0)
                                        //PRIMARY_USE: (featureCollection[i].primaryUse || 'Unknown')
                                    };

                                    if ((bf === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bf++;
                                    break;

                                case "TribalLands":
                                    myThis.CETribalLands[bd] = {
                                        TOTAL_CNT: (featureCollection[i].TOTAL_CNT || 0),
                                        NAMELSAD: (featureCollection[i].NAMELSAD || 'Unknown'),
                                        stateName: (featureCollection[i].stateName || 'Unknown')
                                    };
                                    if ((bd === 0) && (featureCollection[i].METADATA_URL != null)) {
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bd++;
                                    break;


                                case  "BOEM_Wind_Planning_Areas":
                                    myThis.boem[ba] = {
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
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        // console.log(myThis.metadata[k]);
                                        k++;

                                    }
                                    ;
                                    ba++;
                                    break;
                                case "ActiveRenewableEnergyLeases":
                                    myThis.arel[bc] = {
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
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    bc++;
                                    break;
                                case  "WindResourcePotential":
                                    myThis.wind[bb] = {
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
                                        myThis.metadata[k] = {
                                            REPORT_CAT: featureCollection[i].REPORT_CAT,
                                            COMMON_NM: featureCollection[i].COMMON_NM,
                                            METADATA_URL: featureCollection[i].METADATA_URL,
                                            METADATA_OWNER: featureCollection[i].METADATA_OWNER,
                                            METADATA_OWNER_ABV: featureCollection[i].METADATA_OWNER_ABV
                                        };
                                        k++;
                                    }
                                    ;

                                    if (featureCollection[i].TOTAL_CNT > 0) {
                                        switch (featureCollection[i].WIND_CLASS.substring(0, 3)) {
                                            case "Sup":
                                                myThis.windclass[0] = featureCollection[i].PERC_COVER;
                                                break;
                                            case "Out":
                                                myThis.windclass[1] = featureCollection[i].PERC_COVER;
                                                break;
                                            case "Exc":
                                                myThis.windclass[2] = featureCollection[i].PERC_COVER;
                                                break;
                                            case "Goo":
                                                myThis.windclass[3] = featureCollection[i].PERC_COVER;
                                                break;
                                            case "Fai":
                                                myThis.windclass[4] = featureCollection[i].PERC_COVER;
                                                break;
                                            case "Uns":
                                                myThis.windclass[5] = featureCollection[i].PERC_COVER;
                                                break;
                                        }

                                    }
                                    bb++;
                                    break;
                            }
                        }

                        // console.log("end of loop fed=" + myThis.CEFederalTotal);
                        // console.log("end of loop state=" + myThis.CEStateTotal);
                        //console.log('coastfac='+AOI.coastfac[0].TOTAL_CNT);
                        //console.log(myThis);
                        //console.log(myThis.TIDangerZones);
                        //console.log(myThis.CEElevation);
                        //myThis.wavepwr.length = 0;
                        //myThis.wavepwr[0].AVG_WAVE_POWER=50;
                        // myThis.tidalpwr[0].AVG_TIDAL_CURRENT=1.01;
                        // myThis.tidalpwr[0].SUITABILITY_TIDAL_DEPTH="YES";
                        //  myThis.tidalpwr[0].SUITABILITY_TIDAL_AREA="YES";
                        // myThis.currentpwr[0].AVG_OCEAN_CURRENT=2;
                        // myThis.currentpwr[0].SUITABILITY_TIDAL_AREA="YES";
                        //console.log( myThis.tidalpwr[0].TOTAL_CNT);
                        //console.log( myThis.tidalpwr[0].AVG_TIDAL_CURRENT);
                        if (myThis.wavepwr.length > 0) {
                            if (myThis.wavepwr[0].AVG_WAVE_POWER > 40) {
                                myThis.wavepwr[0].COLOR = '#B0B497';
                            } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 30.0) {
                                myThis.wavepwr[0].COLOR = '#B6BC9E';
                            } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 20.0) {
                                myThis.wavepwr[0].COLOR = '#BBC1A4';
                            } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 15.0) {
                                myThis.wavepwr[0].COLOR = '#C0C6A8';
                            } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 10.0) {
                                myThis.wavepwr[0].COLOR = '#C9D0B1';
                            } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 8.0) {
                                myThis.wavepwr[0].COLOR = '#D0D8B9';
                            } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 6) {
                                myThis.wavepwr[0].COLOR = '#D5DDC0';
                            } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 4.0) {
                                myThis.wavepwr[0].COLOR = '#DEE7C9';
                                //console.log("color");
                            } else if (myThis.wavepwr[0].AVG_WAVE_POWER > 2.0) {
                                myThis.wavepwr[0].COLOR = '#E4EFD2';
                            } else if (myThis.wavepwr[0].AVG_WAVE_POWER < 2.01) {
                                myThis.wavepwr[0].COLOR = '#EBF6D8';
                            } else {
                                myThis.wavepwr[0].COLOR = 'white';
                            }
                        }
                        myThis.windclass[6] = (myThis.windclass.reduce(function (prev, cur) {
                            return prev.toFixed(2) - cur.toFixed(2);
                        }, 100));
                        if (myThis.boem[0] == null) {
                            myThis.boem[0] = {
                                INFO: "NA",
                                PROT_NUMBE: 0,
                                LINK1: "NA",
                                LINK2: "NA",
                                PERC_COVER: 0,
                                TOTAL_BLOC: 0,
                                TOTAL_CNT: 0
                            };
                        }
                        if (myThis.arel[0] == null) {
                            myThis.arel[0] = {
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
                        myThis.boem.sort(function (a, b) {
                            return parseFloat(b.PERC_COVER) - parseFloat(a.PERC_COVER);
                        });
                        myThis.arel.sort(function (a, b) {
                            return parseFloat(b.PERC_COVER) - parseFloat(a.PERC_COVER);
                        });

                        if (myThis.boem[0].TOTAL_CNT === 0) {
                            myThis.boem[0].PERC_COVER = 0;
                            myThis.boem[0].TOTAL_BLOC = 0;
                        }
                        if (myThis.arel[0] == null)myThis.arel[0].TOTAL_CNT = 0;
                        if (myThis.arel[0].TOTAL_CNT === 0) {
                            myThis.arel[0].PERC_COVER = 0;
                            myThis.arel[0].TOTAL_BLOC = 0;
                        }

                        this.loadStateChart();
                        this.loadOceanJobEmployeesChart();
                        this.loadOceanJobDollarsChart();
                        this.loadOceanJobContributionsChart();
                        //because? and until all direct DOM manipulation is removed from code, this $apply is useful to clear some digest issue that appear as timing issues.
                        if (myThis.ID !== -9999)  $rootScope.$apply();


                    },
                    unloadData: function () {
                        if (this.isLoaded) {

                            map.removeLayer(this.oceanDisposalSites);
                            map.removeLayer(this.HydrokineticLeases);
                            map.removeLayer(this.windPlanningLayer);
                            map.removeLayer(this.windLeaseLayer);
                            map.removeLayer(this.windrpLayer);
                            map.removeLayer(this.marineMineralsLeases);
                            map.removeLayer(this.wavePower);
                            map.removeLayer(this.tidalPower);
                            map.removeLayer(this.currentPower);
                            map.removeLayer(this.beachNourish);
                            map.removeLayer(this.coastalEnergyFacilities);
                            map.removeLayer(this.CEElevation);
                            map.removeLayer(this.TISubmarineLayer);
                            map.removeLayer(this.TIDangerZonesLayer);

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


                            this.hide();
                            //map.setView([33.51, -68.3], 6);
                        }
                        this.isLoaded = false;
                    },
                    isLoaded: false,
                    windLeaseLayerIsVisible: false,
                    toggleWindLeaseLayer: function () {
                        if (!this.windLeaseLayerIsVisible) {
                            this.windLeaseLayer.addTo(map);
                            this.windLeaseLayerIsVisible = true;
                        } else {
                            map.removeLayer(this.windLeaseLayer);
                            this.windLeaseLayerIsVisible = false;
                        }
                    },
                    windPlanningLayerIsVisible: false,
                    toggleWindPlanningLayer: function () {
                        if (!this.windPlanningLayerIsVisible) {
                            this.windPlanningLayer.addTo(map);
                            this.windPlanningLayerIsVisible = true;
                        } else {
                            map.removeLayer(this.windPlanningLayer);
                            this.windPlanningLayerIsVisible = false;
                        }
                    },
                    oceanDisposalSitesIsVisible: false,
                    toggleOceanDisposalSites: function () {
                        if (!this.oceanDisposalSitesIsVisible) {
                            this.oceanDisposalSites.addTo(map);
                            this.oceanDisposalSitesIsVisible = true;
                        } else {
                            map.removeLayer(this.oceanDisposalSites);
                            this.oceanDisposalSitesIsVisible = false;
                        }
                    },
                    HydrokineticLeasesIsVisible: false,
                    toggleHydrokineticLeases: function () {
                        if (!this.HydrokineticLeasesIsVisible) {
                            this.HydrokineticLeases.addTo(map);
                            this.HydrokineticLeasesIsVisible = true;
                        } else {
                            map.removeLayer(this.HydrokineticLeases);
                            this.HydrokineticLeasesIsVisible = false;
                        }
                    },

                    marineMineralsLeasesIsVisable: false,
                    toggleMarineMineralsLeases: function () {
                        if (!this.marineMineralsLeasesIsVisable) {
                            this.marineMineralsLeases.addTo(map);
                            this.marineMineralsLeasesIsVisable = true;
                        } else {
                            map.removeLayer(this.marineMineralsLeases);
                            this.marineMineralsLeasesIsVisable = false;
                        }
                    },
                    wavePowerIsVisable: false,
                    togglewavePower: function () {
                        if (!this.wavePowerIsVisable) {
                            this.wavePower.addTo(map);
                            this.wavePowerIsVisable = true;
                        } else {
                            map.removeLayer(this.wavePower);
                            this.wavePowerIsVisable = false;
                        }
                    },
                    tidalPowerIsVisable: false,
                    toggletidalPower: function () {
                        if (!this.tidalPowerIsVisable) {
                            this.tidalPower.addTo(map);
                            this.tidalPowerIsVisable = true;
                        } else {
                            map.removeLayer(this.tidalPower);
                            this.tidalPowerIsVisable = false;
                        }
                    },
                    currentPowerIsVisable: false,
                    togglecurrentPower: function () {
                        if (!this.currentPowerIsVisable) {
                            this.currentPower.addTo(map);
                            this.currentPowerIsVisable = true;
                        } else {
                            map.removeLayer(this.currentPower);
                            this.currentPowerIsVisable = false;
                        }
                    },
                    beachNourishIsVisable: false,
                    togglebeachNourish: function () {
                        if (!this.beachNourishIsVisable) {
                            this.beachNourish.addTo(map);
                            this.beachNourishIsVisable = true;
                        } else {
                            map.removeLayer(this.beachNourish);
                            this.beachNourishIsVisable = false;
                        }
                    },
                    coastalEnergyFacilitiesIsVisable: false,
                    togglecoastalEnergyFacilities: function () {
                        if (!this.coastalEnergyFacilitiesIsVisable) {
                            this.coastalEnergyFacilities.addTo(map);
                            this.coastalEnergyFacilitiesIsVisable = true;
                        } else {
                            map.removeLayer(this.coastalEnergyFacilities);
                            this.coastalEnergyFacilitiesIsVisable = false;
                        }
                    },

                    windrpLayerIsVisible: false,
                    toggleWindrpLayer: function () {
                        if (!this.windrpLayerIsVisible) {
                            this.windrpLayer.addTo(map);
                            this.windrpLayerIsVisible = true;
                        } else {
                            map.removeLayer(this.windrpLayer);
                            this.windrpLayerIsVisible = false;
                        }
                    },
                    CEElevationIsVisable: false,
                    toggleCEElevation: function () {
                        if (!this.CEElevationIsVisable) {
                            this.CEElevation.addTo(map);
                            this.CEElevationIsVisable = true;
                        } else {
                            map.removeLayer(this.CEElevation);
                            this.CEElevationIsVisable = false;
                        }
                    },
                    TISubmarineIsVisable: false,
                    toggleTISubmarine: function () {
                        if (!this.TISubmarineIsVisable) {
                            this.TISubmarineLayer.addTo(map);
                            this.TISubmarineIsVisable = true;
                        } else {
                            map.removeLayer(this.TISubmarineLayer);
                            this.TISubmarineIsVisable = false;
                        }
                    },
                    TIDangerZonesIsVisable: false,
                    toggleTIDangerZones: function () {
                        if (!this.TIDangerZonesIsVisable) {
                            this.TIDangerZonesLayer.addTo(map);
                            this.TIDangerZonesIsVisable = true;
                        } else {
                            map.removeLayer(this.TIDangerZonesLayer);
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
                            ;
                            //var elems = document.getElementsByClassName('sliderbutton');
                            //for (var i = 0; i < elems.length; i++) {
                            //    elems[i].style.visibility = "hidden";
                            //}
                            //;
                            if (pageID === "EM" || pageID === "CE" || pageID === "TI" || pageID === "NRC" || pageID === "EC") {

                                //smallmap.invalidateSize();
                                //smallmap.fitBounds(this.minibounds);
                                this.loadSmallMap(false);
                                //console.log("BOOM!");
                            }
                            //document.getElementById('slbuttxt0').style.visibility = "hidden";
                        } else {

                            document.getElementById("togglefull").style.marginLeft = "-25px";

                            document.getElementById("slide1").style.width = '50%';
                            var elems = document.getElementsByClassName('AOItabClass2');
                            for (var i = 0; i < elems.length; i++) {
                                elems[i].style.display = 'none';
                            }
                            ;
                            //var elems = document.getElementsByClassName('sliderbutton');
                            //for (var i = 0; i < elems.length; i++) {
                            //    elems[i].style.visibility = "visible";
                            //}
                            //;
                            //document.getElementById('slbuttxt0').style.visibility = "visible";
                            // Code for Chrome, Safari, Opera
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
                        //var baselayerSmall = esriOceans.addTo(smallmap);

                        //console.log("AOI_ID =" + $scope.AOI.ID + "");
                        var minicLayer;
                        if (this.ID === -9999) {
                            minicLayer = L.geoJson(this.drawLayerShape, {
                                color: '#EB660C',
                                weight: 3,
                                fillOpacity: .3,

                            }).addTo(smallmap);
                            this.minibounds = minicLayer.getBounds();
                            smallmap.fitBounds(this.minibounds);
                            //   console.log(this.minibounds);
                        } else {
                            minicLayer = L.esri.featureLayer({
                                url: config.ortMapServer + config.ortLayerAOI,
                                where: "AOI_ID =" + this.ID + "",
                                color: '#EB660C',
                                weight: 3,
                                fillOpacity: .3,

                                //simplifyFactor: 5.0,
                                //precision: 3
                                //,            pane: 'miniAOIfeature'
                            }).addTo(smallmap);


                            //console.log(" minicLayer loaded " + typeof (minicLayer.getBounds));


                            minicLayer.on("load", function (evt) {
                                // create a new empty Leaflet bounds object
                                //             var geoJsonBounds = minicLayer.getBounds();
                                //             map.fitBounds(geoJsonBounds);

                                var bounds = L.latLngBounds([]);
                                // loop through the features returned by the server
                                minicLayer.eachFeature(function (layer) {
                                    // get the bounds of an individual feature

                                    var layerBounds = layer.getBounds();
                                    // extend the bounds of the collection to fit the bounds of the new feature
                                    bounds.extend(layerBounds);
                                });

                                // once we've looped through all the features, zoom the map to the extent of the collection
                                this.minibounds = bounds;
                                smallmap.fitBounds(bounds);

                                //  console.log("first small map fitbounds");

                                // unwire the event listener so that it only fires once when the page is loaded
                                minicLayer.off('load');
                            });
                        }
                        smallmap.invalidateSize();
                        var test1 = false;
                        if ((this.inPrintWindow) && (test1)) {
                            leafletImage(smallmap, function (err, canvas) {
                                // now you have canvas
                                // example thing to do with that canvas:
                                var img = document.createElement('img');
                                var dimensions = smallmap.getSize();
                                img.width = dimensions.x;
                                img.height = dimensions.y;
                                img.src = canvas.toDataURL();
                                // window.open(img.src);
                                document.getElementById('map3').innerHTML = '';
                                document.getElementById('map3').appendChild(img);
                            });
                        }

                    },
                    loadStateChart: function () {
                        if (AOI.highchartsNGState) AOI.highchartsNGState = null
                        //.log("loadstatechart fed=" + AOI.CEFederalTotal);
                        //console.log("loadstatechart state=" + AOI.CEStateTotal);

                        AOI.highchartsNGState = {
                            options: {
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
                        //windChart = Highcharts.chart('container', {
                        if (AOI.OceanJobContributionsChart) AOI.OceanJobContributionsChart = null
                        AOI.OceanJobContributionsSeries[0] = [{
                            center: [20, null],
                            "name": 'County Cork',
                            "data": [
                                ["Marine Construction", 3570000],
                                ["Living Resources", 15128000],
                                ["Offshore Mineral Extraction", 5281000]
                            ]
                        }, {
                            center: [150, null],
                            "name": 'County Galway',
                            "data": [
                                ["Marine Construction", 35700000],
                                ["Living Resources", 50128000],
                                ["Offshore Mineral Extraction", 52810000]
                            ]
                        }
                        ];
                        //console.log(AOI.OceanJobContributionsSeries[0]);
                        AOI.OceanJobContributionsChart = {
                            options: {

                                legend: {
                                    enabled: true,
                                    //align:'right',
                                    //layout:'vertical',
                                    //verticalAlign: 'center',
                                    itemStyle: {
                                        //color: '#000000',
                                        fontSize: '10px',
                                        lineHeight: '10px',
                                    }
                                },
                                tooltip: {
                                    pointFormat: '<b>${point.y:,.2f}</b>'
                                },
                                chart: {
                                    //spacing: 0,
                                    //margin: 0,
                                    type: 'pie'
                                },
                                title: {
                                    enabled: true,
                                    text: null,
                                    align: 'left',
                                    //x: 10
                                },
                                exporting: {enabled: false},
                                colors: ['#4572a7', '#aa4643', '#89a54e', '#71588f', '#4198af', '#db843d', '#93a9cf'],
                                yAxis: {

                                    title: {
                                        enabled: true
                                    },
                                    //    labels: {
                                    //        enabled: false
                                    //    },
                                    //    tickLength: 0
                                },
                                xAxis: {
                                    type: 'category',
                                    title: {
                                        enabled: true
                                    },
                                    labels: {
                                        enabled: true
                                    },
                                    //TickLength: 0
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        size: 100,
                                        dataLabels: {
                                            enabled: false,
                                        }
                                    }
                                }

                                //plotOptions: {
                                //    //series: {
                                //    //    pointWidth: 190
                                //    //},
                                //   // column: {
                                //        //stacking: 'percent'
                                //   // }
                                //}

                            },
                            loading: false,
                            series: AOI.OceanJobContributionsSeries[0]

                        }

                        ;
                        AOI.OceanJobContributionsChart.Series = AOI.OceanJobContributionsSeries[0];
                        /*  //over ride windclass for testing chart
                         // console.log(windclass[0]);
                         windclass[0]=10;
                         windclass[1]=25;
                         windclass[2]=65;
                         */
                    },
                    loadOceanJobDollarsChart: function () {
                        //windChart = Highcharts.chart('container', {
                        if (AOI.OceanJobDollarsChart) AOI.OceanJobDollarsChart = null
                        AOI.OceanJobDollarsChart = {
                            options: {
                                legend: {
                                    enabled: true,

                                    layout: 'horizontal',
                                    align: 'right',
                                    verticalAlign: 'top',
                                    floating: true,


                                    //align:'right',
                                    //layout:'vertical',
                                    //verticalAlign: 'center',
                                    itemStyle: {
                                        //color: '#000000',
                                        fontSize: '10px',
                                        lineHeight: '10px',
                                    }
                                },
                                tooltip: {
                                    pointFormat: '<b>${point.y:,.2f}</b>'
                                },
                                chart: {
                                    //spacing: 0,
                                    //margin: 0,
                                    type: 'column'
                                },
                                title: {
                                    enabled: false,
                                    text: null,
                                    align: 'left',
                                    //x: 10
                                },
                                exporting: {enabled: false},
                                colors: ['#ffc000', '#92d050', '#A6C900', '#EFCF06', '#D96704', '#A90306', '#A1A1A1'],
                                yAxis: {

                                    title: {
                                        enabled: false
                                    },
                                    //    labels: {
                                    //        enabled: false
                                    //    },
                                    //    tickLength: 0
                                },
                                xAxis: {
                                    type: 'category',
                                    title: {
                                        enabled: false
                                    },
                                    labels: {
                                        enabled: true
                                    },
                                    //TickLength: 0
                                },
                                //plotOptions: {
                                //    //series: {
                                //    //    pointWidth: 190
                                //    //},
                                //   // column: {
                                //        //stacking: 'percent'
                                //   // }
                                //}

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

                        /*  //over ride windclass for testing chart
                         // console.log(windclass[0]);
                         windclass[0]=10;
                         windclass[1]=25;
                         windclass[2]=65;
                         */
                    },
                    loadOceanJobEmployeesChart: function () {
                        //windChart = Highcharts.chart('container', {
                        if (AOI.OceanJobEmployeesChart) AOI.OceanJobEmployeesChart = null
                        AOI.OceanJobEmployeesChart = {
                            options: {
                                legend: {
                                    enabled: false
                                },
                                tooltip: {
                                    pointFormat: '<b>{point.y:,.0f}</b>'
                                },
                                chart: {
                                    //spacing: 0,
                                    //margin: 0,
                                    type: 'column'
                                },
                                title: {
                                    text: "Employees",
                                    align: 'left',
                                    //x: 10
                                },
                                exporting: {enabled: false},
                                colors: ['#4f81bd', '#4f81bd', '#A6C900', '#EFCF06', '#D96704', '#A90306', '#A1A1A1'],
                                yAxis: {

                                    title: {
                                        enabled: false
                                    },
                                    //    labels: {
                                    //        enabled: false
                                    //    },
                                    //    tickLength: 0
                                },
                                xAxis: {
                                    type: 'category',
                                    title: {
                                        enabled: false
                                    },
                                    labels: {
                                        enabled: true
                                    },
                                    //TickLength: 0
                                },
                                //plotOptions: {
                                //    //series: {
                                //    //    pointWidth: 190
                                //    //},
                                //   // column: {
                                //        //stacking: 'percent'
                                //   // }
                                //}

                            },
                            loading: false,
                            series: [{
                                "name": 'Employees',
                                "data": this.ECEconEmploy
                            }]

                        };

                        /*  //over ride windclass for testing chart
                         // console.log(windclass[0]);
                         windclass[0]=10;
                         windclass[1]=25;
                         windclass[2]=65;
                         */
                    },
                    loadWindChart: function () {
                        //windChart = Highcharts.chart('container', {
                        if (AOI.highchartsNG) AOI.highchartsNG = null
                        AOI.highchartsNG = {
                            options: {
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

                        /*  //over ride windclass for testing chart
                         // console.log(windclass[0]);
                         windclass[0]=10;
                         windclass[1]=25;
                         windclass[2]=65;
                         */
                    },
                    ShowURL: function () {
                        $window.alert("Share this URL: " + this.ID);
                    },
                };

                return AOI;
            }]
        }
    })
;