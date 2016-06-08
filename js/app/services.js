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
            mml: [],
            hydrok: [],
            optLayer: [],
            test: [],
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
            display: function (AOI_ID) {
                this.ID = AOI_ID;
                this.layer = L.esri.featureLayer({ //AOI poly (7)
                    url: ortMapServer + ortLayerAOI,
                    color: '#EB660C', weight: 3, fillOpacity: .3,
                    where: "AOI_ID =" + this.ID + "",
                    pane: 'AOIfeature'
                    //simplifyFactor: 5.0,
                    //precision: 2
                }).addTo(map);
                //console.log(" this.layer loaded " + AOI_ID);
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
                    url: ortMapServer + ortLayerOptional[0].num,
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
                    url: ortMapServer + ortLayerOptional[1].num,
                    pane: 'optionalfeature1',
                    style: function (feature) {

                        return {color: 'white', weight: 1, fillOpacity: .5};
                    }
                });
                myThis.windPlanningLayer = L.esri.featureLayer({
                    url: ortMapServer + ortLayerOptional[2].num,
                    pane: 'optionalfeature2',
                    style: function (feature) {

                        return {color: 'Black', weight: 1, fillOpacity: .5};
                    }
                });
                myThis.oceanDisposalSites = L.esri.featureLayer({
                    url: ortMapServer + ortLayerOptional[3].num,
                    pane: 'optionalfeature3',
                    style: function (feature) {
                        return {fillColor: '#FFA7A7', color: '#4A4A4A', weight: 1.5, fillOpacity: .5};
                    }
                });
                myThis.marineMineralsLeases = L.esri.featureLayer({
                    url: ortMapServer + ortLayerOptional[4].num,
                    pane: 'optionalfeature4',
                    style: function (feature) {
                        return {color: '#7300D9', weight: 4, fillOpacity: 0};
                    }
                });
                //there is no 5 yet

                myThis.HydrokineticLeases = L.esri.featureLayer({
                    url: ortMapServer + ortLayerOptional[6].num,
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
                    url: ortMapServer + ortLayerOptional[8].num,
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
                    url: ortMapServer,
                    pane: 'optionalfeature9',
                    layers: [ortLayerOptional[9].num],
                    opacity: .8,
                });
                myThis.currentPower = L.esri.dynamicMapLayer({
                    url: ortMapServer,
                    pane: 'optionalfeature10',
                    layers: [ortLayerOptional[10].num],
                    opacity: .8,
                });

                myThis.beachNourish = L.esri.featureLayer({
                    url: ortMapServer + ortLayerOptional[11].num,
                    pane: 'optionalfeature11',
                    style: function (feature) {
                        return {color: '#8B572A', weight: 4, fillOpacity: 0};
                    }
                });

                myThis.coastalEnergyFacilities = L.esri.featureLayer({
                    url: ortMapServer + ortLayerOptional[16].num,
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

                var query = L.esri.query({
                    url: ortMapServer + ortLayerData
                });

                if (myThis.ID === -9999){
                    var featureCollection = JSON.parse(JSON.stringify(myThis.featureCollection));
                    console.log(featureCollection);
                    myThis.massageData(featureCollection);

                } else {
                    query.returnGeometry(false).where("AOI_ID =" + myThis.ID + "").run(function (error, featureCollection, response) {
                       // var mFeatureCollection = JSON.parse(JSON.stringify(featureCollection));
                        console.log(featureCollection);
                        var newarray = [];
                        angular.forEach(featureCollection.features, function (feature) {
                            var newobject = {};
                            angular.forEach(featureCollection.fields, function (field) {
                                newobject[field.name] = feature.properties[field.name];
                            });
                            newarray.push(newobject);
                        });
                        //the idea here is , since the two arrays that can make it to .massageData are organized differently, we need to parse them into a know structure.
                        //this is where I stopped. COF
                        console.log(newarray);
                        myThis.massageData(featureCollection);
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
                var ack=[];

                for (var i = 0, j = featureCollection.features.length; i < j; i++) {

                    switch (featureCollection.features[i].properties.DATASET_NM) {
                        case "CoastalEnergyFacilities":
                            myThis.coastfac[bq] = {
                                TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                Name: (featureCollection.features[i].properties.Name || 'None'),
                                Type: (featureCollection.features[i].properties.Type || 'None'),
                                CAPACITY: (featureCollection.features[i].properties.CAPACITY || 'None'),
                                Dist_Mi: (featureCollection.features[i].properties.Dist_Mi || 'None')

                            };

                            if ((bq === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
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

                            bq++;
                            break;
                        case "OG_ResourcePotential":
                            myThis.OGresource[bp] = {
                                TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                OCS_Play: (featureCollection.features[i].properties.OCS_Play || 'None'),
                                UTTR_Oil: (featureCollection.features[i].properties.UTTR_Oil || 'None'),
                                UTTR_Gas: (featureCollection.features[i].properties.UTTR_Gas || 'None'),
                                UTTR_BOE: (featureCollection.features[i].properties.UTTR_BOE || 'None')

                            };

                            if ((bp === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
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

                            bp++;
                            break;
                        case "OG_Wells":
                            myThis.OGWells[bo] = {
                                TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                COMPANY_NA: (featureCollection.features[i].properties.COMPANY_NA || 'None'),
                                STATUS: (featureCollection.features[i].properties.STATUS || 'None')

                            };

                            if ((bo === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
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

                            bo++;
                            break;
                        case "al_20160301":
                            myThis.OGLease[bn] = {
                                TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                Lease_Numb: (featureCollection.features[i].properties.Lease_Numb || 'None'),
                                Lease_expt: (featureCollection.features[i].properties.Lease_expt || 'None')

                            };

                            if ((bn === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
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

                            bn++;
                            break;
                        case "OilandGasPlanningAreas":
                            myThis.OGPlanA[bm] = {
                                TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                Region: (featureCollection.features[i].properties.Region || 'unknown')

                            };

                            if ((bm === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
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

                            bm++;
                            break;
                        case "SC_BeachProjects":
                            myThis.beachNur[bl] = {
                                TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                BEACH_AREA: (featureCollection.features[i].properties.BEACH_AREA || 'unknown'),
                                YEAR: (featureCollection.features[i].properties.YEAR || '0'),
                                SAND_VOL_C: (featureCollection.features[i].properties.SAND_VOL_C || '0'),
                                Dist_Mi: ((featureCollection.features[i].properties.Dist_Mi === ' ') ? '0' : featureCollection.features[i].properties.Dist_Mi )
                            };

                            if ((bl === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
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

                            bl++;
                            break;
                        case "us_oc_ms":
                            myThis.currentpwr[bk] = {
                                TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                AVG_OCEAN_CURRENT: (featureCollection.features[i].properties.AVG_OCEAN_CURRENT || 0),
                                SUITABILITY_OCEAN_SPEED: (featureCollection.features[i].properties.SUITABILITY_OCEAN_SPEED || 'NO')
                            };

                            if ((featureCollection.features[i].properties.METADATA_URL != null)) {
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

                            bk++;
                            break;
                        case "usa_mc_wm":
                            myThis.tidalpwr[bj] = {
                                TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                AVG_TIDAL_CURRENT: (featureCollection.features[i].properties.AVG_TIDAL_CURRENT || 0),
                                SUITABILITY_TIDAL_DEPTH: (featureCollection.features[i].properties.SUITABILITY_TIDAL_DEPTH || 'NO'),
                                SUITABILITY_TIDAL_AREA: (featureCollection.features[i].properties.SUITABILITY_TIDAL_AREA || 'NO'),
                                SUITABILITY_TIDAL_SPEED: (featureCollection.features[i].properties.SUITABILITY_TIDAL_SPEED || 'NO')
                            };

                            if ((featureCollection.features[i].properties.METADATA_URL != null)) {
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

                            bj++;
                            break;
                        case "OceanWaveResourcePotential":
                            myThis.wavepwr[bi] = {
                                TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                AVG_WAVE_POWER: (featureCollection.features[i].properties.AVG_WAVE_POWER || 0),
                                SUITABILITY_OCEAN_POWER: (featureCollection.features[i].properties.SUITABILITY_OCEAN_POWER || 'Unknown')
                            };
                            //console.log(myThis.wavepwr[bi].COLOR);
                            if ((featureCollection.features[i].properties.METADATA_URL != null)) {
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

                            bi++;
                            break;

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
                            }
                            ;

                            be++;
                            break;
                        case "MarineHydrokineticProjects":
                            if (featureCollection.features[i].properties.TOTAL_CNT > 0) {
                                myThis.hydrok[bg] = {
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    PRIMARY_USE: (featureCollection.features[i].properties.energyType ) + ' projects'
                                };
                            }
                            if ((bg === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
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
                            //console.log("hydrok "+myThis.hydrok);
                            bg++;

                            break;
                        case "ecstdb2014":
                            if (featureCollection.features[i].properties.TOTAL_CNT > 0) {
                                myThis.surfsed[bh] = {
                                    TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0),
                                    PRIMARY_USE: ((featureCollection.features[i].properties.CLASSIFICA === ' ') ? 'Unknown' : featureCollection.features[i].properties.CLASSIFICA )
                                };
                            }
                            if ((bh === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
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

                            bh++;

                            break;

                        case "Sand_n_GravelLeaseAreas": //aka Marine Minerals Leases
                            myThis.mml[bf] = {
                                TOTAL_CNT: (featureCollection.features[i].properties.TOTAL_CNT || 0)
                                //PRIMARY_USE: (featureCollection.features[i].properties.primaryUse || 'Unknown')
                            };

                            if ((bf === 0) && (featureCollection.features[i].properties.METADATA_URL != null)) {
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

                            bf++;
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
                                CAPACITY: (featureCollection.features[i].properties.CAPACITY || 0).toLocaleString(),
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
                //console.log('coastfac='+AOI.coastfac[0].TOTAL_CNT);
                //console.log(myThis);
                //myThis.wavepwr.length = 0;
                //myThis.wavepwr[0].AVG_WAVE_POWER=50;
                // myThis.tidalpwr[0].AVG_TIDAL_CURRENT=1.01;
                // myThis.tidalpwr[0].SUITABILITY_TIDAL_DEPTH="YES";
                //  myThis.tidalpwr[0].SUITABILITY_TIDAL_AREA="YES";
                // myThis.currentpwr[0].AVG_OCEAN_CURRENT=2;
                // myThis.currentpwr[0].SUITABILITY_TIDAL_AREA="YES";
                //console.log( myThis.tidalpwr[0].TOTAL_CNT);
                //console.log( myThis.tidalpwr[0].AVG_TIDAL_CURRENT);

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

                windclass[6] = (windclass.reduce(function (prev, cur) {
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

              //  myThis.isLoaded = true;

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
                    this.wind.length = 0;
                    this.boem.length = 0;
                    this.metadata.length = 0;
                    this.optLayer.length = 0;
                    windclass.length = 0;
                    this.disp.length = 0;
                    this.mml.length = 0;
                    this.hydrok.length = 0;
                    this.test.length = 0;
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
            }
        };

        return AOI;
    });