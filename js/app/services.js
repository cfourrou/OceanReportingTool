'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).factory('_', function () {
        return window._; // assumes underscore has already been loaded on the page
    })
    .service('AOI', function () {
        var AOI;

        AOI = {
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
            optLayer: [],
            test: [],
            display: function (AOI_ID) {
                this.ID = AOI_ID;
                this.layer = L.esri.featureLayer({ //AOI poly (7)
                    url: ortMapServer + ortLayerAOI, //'//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/7',
                    color: '#EB660C', weight: 3, fillOpacity:.3,
                    where: "AOI_ID =" + this.ID + "",
                    pane: 'AOIfeature',
                    simplifyFactor: 5.0,
                    precision: 2
                }).addTo(map);
                this.isVisible = true;
                console.log("display: this.ID = " +AOI_ID);
            },
            hide: function () {
                if (this.isVisible) {
                    //map.removeLayer(this.layer);
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
            loadData: function (name) {
                var myThis = this;
                console.log("loadData: mythis.ID = " +myThis.ID);
                myThis.zoomTo();
                myThis.name = name;
                myThis.windrpLayer = L.esri.featureLayer({ //wind resource potential (18)
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
                // is this really wind leases or all renewable energy leases?
                myThis.windLeaseLayer = L.esri.featureLayer({ //renewable energy leases (17)
                    url: ortMapServer + ortLayerOptional[1].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/17',
                    pane: 'optionalfeature2',
                    style: function (feature) {

                        return {color: 'white', weight: 1, fillOpacity: .5};
                    }
                });
                myThis.windPlanningLayer = L.esri.featureLayer({ //BOEM_Wind_Planning_Areas (21)
                    url: ortMapServer + ortLayerOptional[2].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/21',
                    pane: 'optionalfeature3',
                    style: function (feature) {

                        return {color: 'Black', weight: 1, fillOpacity: .5};
                    }
                });
                myThis.oceanDisposalSites = L.esri.featureLayer({ //BOEM_Wind_Planning_Areas (21)
                    url: ortMapServer + ortLayerOptional[3].num, //it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/21',
                    pane: 'optionalfeature4',
                    style: function (feature) {
                        return {color: 'Black', weight: 1, fillOpacity: .5};
                    }
                });


                // var cMapLayer1 = '//it.innovateteam.com/arcgis/rest/services/ORTData/ORTDemo/MapServer/33';

                var query = L.esri.query({
                    url: ortMapServer + ortLayerData
                });


                query.returnGeometry(false).where("AOI_ID =" + myThis.ID + "").run(function (error, featureCollection, response) {

                    var k = 0;
                    var ba = 0;
                    var bb = 0;
                    var bc = 0;
                    var bd = 0;
                    var be = 0;

                    for (var i = 0, j = featureCollection.features.length; i < j; i++) {

                        switch (featureCollection.features[i].properties.DATASET_NM) {
                            case "OceanDisposalSites":
                                myThis.disp[be] = {
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    PRIMARY_USE: (featureCollection.features[i].properties.primaryUse || 'Unknown')
                                };

                                if ((be === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                };

                                be++;
                                break;
                            case "TribalLands":
                                myThis.test[bd] = {
                                    Lease_Numb: featureCollection.features[i].properties.Lease_Numb,
                                    Company: featureCollection.features[i].properties.Company,
                                    INFO: featureCollection.features[i].properties.INFO,
                                    PROT_NUMBE: featureCollection.features[i].properties.PROT_NUMBE,
                                    LINK1: featureCollection.features[i].properties.LINK1,
                                    LINK2: featureCollection.features[i].properties.LINK2,
                                    PERC_COVER: (featureCollection.features[i].properties.PERC_COVER || 0),
                                    TOTAL_BLOC: (featureCollection.features[i].properties.TOTAL_BLOC || 0),
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    METADATA_URL: featureCollection.features[i].properties.METADATA_URL
                                };
                                if ((bd === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                bd++;
                                break;


                            case  "BOEM_Wind_Planning_Areas":
                                myThis.boem[ba] = {
                                    INFO: featureCollection.features[i].properties.INFO,
                                    PROT_NUMBE: featureCollection.features[i].properties.PROT_NUMBE,
                                    LINK1: featureCollection.features[i].properties.LINK1,
                                    LINK2: featureCollection.features[i].properties.LINK2,
                                    PERC_COVER: featureCollection.features[i].properties.PERC_COVER,
                                    TOTAL_BLOC: featureCollection.features[i].properties.TOTAL_BLOC,
                                    TOTAL_CNT: featureCollection.features[i].properties.TOTAL_CNT,
                                    METADATA_URL: featureCollection.features[i].properties.METADATA_URL
                                };
                                if ((ba === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    // console.log(myThis.metadata[k]);
                                    k++;

                                }
                                ;
                                ba++;
                                break;
                            case "ActiveRenewableEnergyLeases":
                                myThis.arel[bc] = {
                                    Lease_Numb: featureCollection.features[i].properties.Lease_Numb,
                                    Company: featureCollection.features[i].properties.Company,
                                    INFO: featureCollection.features[i].properties.INFO,
                                    PROT_NUMBE: featureCollection.features[i].properties.PROT_NUMBE,
                                    LINK1: featureCollection.features[i].properties.LINK1,
                                    LINK2: featureCollection.features[i].properties.LINK2,
                                    PERC_COVER: (featureCollection.features[i].properties.PERC_COVER || 0),
                                    TOTAL_BLOC: (featureCollection.features[i].properties.TOTAL_BLOC || 0),
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    METADATA_URL: featureCollection.features[i].properties.METADATA_URL
                                };
                                if ((bc === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                bc++;
                                break;
                            case  "WindResourcePotential":
                                myThis.wind[bb] = {
                                    WIND_CLASS: (featureCollection.features[i].properties.WIND_CLASS),
                                    AVG_WGHT: (featureCollection.features[i].properties.AVG_WGHT || 0).toFixed(2),
                                    PERC_COVER: (featureCollection.features[i].properties.PERC_COVER || 0),
                                    HOUSES_SUM: (featureCollection.features[i].properties.HOUSES_SUM || 0).toLocaleString(),
                                    TOTAL_BLOC: (featureCollection.features[i].properties.TOTAL_BLOC || 0),
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    METADATA_URL: featureCollection.features[i].properties.METADATA_URL
                                };
                                if ((bb === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
                                    myThis.metadata[k] = {
                                        REPORT_CAT: featureCollection.features[i].properties.REPORT_CAT,
                                        COMMON_NM: featureCollection.features[i].properties.COMMON_NM,
                                        METADATA_URL: featureCollection.features[i].properties.METADATA_URL,
                                        METADATA_OWNER: featureCollection.features[i].properties.METADATA_OWNER,
                                        METADATA_OWNER_ABV: featureCollection.features[i].properties.METADATA_OWNER_ABV
                                    };
                                    k++;
                                }
                                ;

                                if (featureCollection.features[i].properties.TOTAL_CNT > 0) {
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

                                }
                                bb++;
                                break;
                        }
                    }

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
                });
                myThis.isLoaded = true;
            },
            unloadData: function () {
                if (this.isLoaded) {
                    map.removeLayer(this.oceanDisposalSites);
                    map.removeLayer(this.windPlanningLayer);
                    map.removeLayer(this.windLeaseLayer);
                    this.windLeaseLayerIsVisible = false;
                    map.removeLayer(this.windrpLayer);
                    this.windrpLayerIsVisible = false;
                    this.wind.length = 0;
                    this.boem.length = 0;
                    this.metadata.length = 0;
                    this.optLayer.length = 0;
                    windclass.length = 0;
                    this.disp.length = 0;
                    this.test.length = 0;
                    this.hide();
                    //map.setView([33.51, -68.3], 6);
                }
                this.isLoaded = false;
            },
            isLoaded: false,
            windLeaseLayerIsVisible: false,
            toggleWindLeaseLayer: function () {
                if (!this.windLeaseLayerIsVisible){
                    this.windLeaseLayer.addTo(map);
                    this.windLeaseLayerIsVisible = true;
                } else {
                    map.removeLayer(this.windLeaseLayer);
                    this.windLeaseLayerIsVisible = false;
                }
            },
            windPlanningLayerIsVisible: false,
            toggleWindPlanningLayer: function () {
                if (!this.windPlanningLayerIsVisible){
                    this.windPlanningLayer.addTo(map);
                    this.windPlanningLayerIsVisible = true;
                } else {
                    map.removeLayer(this.windPlanningLayer);
                    this.windPlanningLayerIsVisible = false;
                }
            },
            oceanDisposalSitesIsVisible: false,
            toggleOceanDisposalSites: function () {
                if (!this.oceanDisposalSitesIsVisible){
                    this.oceanDisposalSites.addTo(map);
                    this.oceanDisposalSitesIsVisible = true;
                } else {
                    map.removeLayer(this.oceanDisposalSites);
                    this.oceanDisposalSitesIsVisible = false;
                }
            },

            windrpLayerIsVisible: false,
            toggleWindrpLayer: function (){
                if (!this.windrpLayerIsVisible){
                    this.windrpLayer.addTo(map);
                    this.windrpLayerIsVisible = true;
                } else {
                    map.removeLayer(this.windrpLayer);
                    this.windrpLayerIsVisible = false;
                }
            }
        };

        return AOI;
    });
