require([
  "esri/config",
  "esri/views/MapView",
  "esri/WebMap",
  "esri/widgets/LayerList",
  "esri/widgets/BasemapGallery",
  "esri/widgets/Legend",
  "esri/widgets/Expand",
  "esri/layers/FeatureLayer",
  "esri/widgets/Search",
  "esri/core/Handles",
  "esri/widgets/Feature",
  "esri/widgets/Popup",
  "esri/core/reactiveUtils",
  "esri/Graphic",
  "esri/rest/locator",
  "esri/widgets/AreaMeasurement2D",
  "esri/widgets/DistanceMeasurement2D",
  "esri/widgets/Compass",
  "esri/widgets/Home",
  "esri/widgets/Locate",
  "esri/widgets/Print",
  "esri/widgets/Fullscreen",
  "esri/widgets/FeatureTable"
], (
  esriConfig,
  MapView,
  WebMap,
  LayerList,
  BasemapGallery,
  Legend,
  Expand,
  FeatureLayer,
  Search,
  Handles,
  Feature,
  Popup,
  reactiveUtils,
  Graphic,
  locator,
  AreaMeasurement2D,
  DistanceMeasurement2D,
  Compass,
  Home,
  Locate,
  Print,
  Fullscreen,
  FeatureTable
) => {
  (async () => {
    let webmapId = "6ec29318183e49aca041c577e78cf86d";
    if (window.location.href.indexOf("?id=") > 0) {
      webmapId = window.location.href.split("?id=")[1];
    }

    /******************************************************
     * Creates a new webmap instance. A WebMap can reference
     * a PortalItem ID that represents a WebMap saved to
     * arcgis.com or an on-premise portal.
     * To load a WebMap from an on-premise portal, set the portal
     * url with esriConfig.portalUrl (see above).
     ************************************************************/
    const handles = new Handles();
    let layerBlockArray = [];
    let layerViews = [];
    const panel = document.getElementById("Data_Container_By_Select_all");
    const map = new WebMap({
      portalItem: {
        id: webmapId
      }
    });

    const view = new MapView({
      map: map,
      container: "viewDiv",
      popupEnabled: false,
      popup: new Popup()
    });

    // When view is ready
    await map.when();
    map.layers.forEach(async (layer) => {
      await layer.load();
      // Create a new Calcite block for each layer and add to an array to access later.


      console.log(" layer.title :", layer.title);
      if (layer.title == "CCTickets_RFI") {
        layer.allLayers.forEach(async (layer) => {
          const layerBlock = document.createElement("calcite-block");
          console.log("layer.allLayers", layer);
          layerBlock.id = layer.title;
          layerBlock.heading = layer.title;
          layerBlock.open = true;
          layerBlockArray.push(layerBlock);
        })

      } else {
        const layerBlock = document.createElement("calcite-block");
        layerBlock.id = layer.title;
        layerBlock.heading = layer.title;
        layerBlock.open = true;
        layerBlockArray.push(layerBlock);
      }
      // Create an array of layerViews to be able to highlight selected features.
      if (layer.type === "feature") {
        const layerView = await view.whenLayerView(layer);
        layerViews.push(layerView);
      }
    });
    console.log("to get 0 :", map.layers.getItemAt(0).title);
    console.log("to get 1 :", map.layers.getItemAt(1).title);
    console.log("to get 2 :", map.layers.getItemAt(2).title);
    console.log("to get 3 :", map.layers.getItemAt(3).title);
    console.log("to get 4 :", map.layers.getItemAt(4).title);
  
    const Iraq = map.layers.getItemAt(0);
    const Governerate = map.layers.getItemAt(1);
    const Cells = map.layers.getItemAt(2);
    const sitesFinal = map.layers.getItemAt(3);
    const Cell_Site_Data_Jammer_Sites = map.layers.getItemAt(4);
    // const NetworkArea = map.layers.getItemAt(2);
    // const CoveragebyRSRP_85_CoveragebyRSRP_44_85 = map.layers.getItemAt(3);
    // const NetworkCoverage = map.layers.getItemAt(4);
    // const FiberIssues_WFL1 = map.layers.getItemAt(11);
    const IraqTitle = 'Iraq'
    const GovernerateTitle = 'Governerate'
    // const NetworkAreaTitle = 'Network Area'
    // const CoveragebyRSRP_85_CoveragebyRSRP_44_85Title = 'CoveragebyRSRP_85 - CoveragebyRSRP_44_85'
    // const NetworkCoverageTitle = 'Network Coverage'
    const CellsTitle = 'Cell'
    // const HPSMTicketsTitle = 'HPSM Tickets'
    const sitesFinalTitle = 'Site'
    // const RFIsFCTitle = 'RFIs FC'
    // const CCTicketsFCExportFeaturesTitle = 'CCTicketsFC ExportFeatures'
    const Cell_Site_Data_Jammer_SitesTitle = 'Jammer_Sites'
    // const FiberIssues_WFL1Title = 'FiberIssues_WFL1'
    
    const CCTicketsFCExportFeatures = new FeatureLayer({
      url: 'https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Asia_cell_data_v6/FeatureServer/4'
      });
    const RFIsFC = new FeatureLayer({
      url: 'https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Asia_cell_data_v6/FeatureServer/5'
      });
    const HPSMTickets =  new FeatureLayer({
    url: 'https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Asia_cell_data_v6/FeatureServer/7'
    });
    const featureLayerInterference = new FeatureLayer({
      url: "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Cell_Site_Data/FeatureServer/6"
    });
    
    const featureLayerNMSIncident = new FeatureLayer({
      url: "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/NMS_Incident/FeatureServer/4"
    });
    
    const featureLayerMaintenanceSiteOperation = new FeatureLayer({
      url: "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Asia_Cell_V4/FeatureServer/4"
    });
    
    const featureLayerOutagesData = new FeatureLayer({
      url: "https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Asia_Cell_V4/FeatureServer/5"
    });

    const coverageStatusRenderer = {
      type: "unique-value",
      legendOptions: {
        title: "coverage_status"
      },
      field: "coverage_status",
      uniqueValueInfos: [{
        value: "Strong",
        label: "Strong",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#6ed51b",
          outline: null
        }
      }
        ,
      {
        value: "Average",
        label: "Average",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#fda51b",
          outline: null
        }
      }
        ,
      {
        value: "Poor",
        label: "Poor",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#e91d1b",
          outline: null
        }
      }
      ]
    };

    const maintentanceRenderer = {
      type: "unique-value",
      legendOptions: {
        title: "maintentance"
      },
      field: "maintentance",
      uniqueValueInfos: [{
        value: "yes",
        label: "yes",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "red",
          outline: null
        }
      }, {
        value: "no",
        label: "no",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "green",
          outline: null
        }
      }]
    };

    const outageRenderer = {
      type: "unique-value",
      legendOptions: {
        title: "outage"
      },
      field: "outage",
      uniqueValueInfos: [{
        value: "yes",
        label: "yes",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "red",
          outline: null
        }
      }, {
        value: "no",
        label: "no",
        symbol: {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "green",
          outline: null
        }
      }]
    };

    const NumberOfTicketsRenderer = {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: "#238443",
        outline: null
      },
      // use opacity to visualize median household income
      visualVariables: [
        {
          type: "color",
          field: "number_of_tickets",
          stops: [
            { value: 1, color: 'green', label: "1" },
            { value: 50, color: 'orange', label: "50" },
            { value: 100, color: 'red', label: "100" }
          ]
        }
      ]
    };

    const NumberOutagesRenderer = {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: "#238443",
        outline: null
      },
      // use opacity to visualize median household income
      visualVariables: [
        {
          type: "color",
          field: "number_of_outages",
          stops: [
            { value: 1, color: 'green', label: "1" },
            { value: 50, color: 'orange', label: "50" },
            { value: 100, color: 'red', label: "100" }
          ]
        }
      ]
    };


    document.getElementById("coverageStatusButton").addEventListener("click", function () {
      Cells.renderer = coverageStatusRenderer;
    });
    document.getElementById("maintentanceButton").addEventListener("click", function () {
      Cells.renderer = maintentanceRenderer;
    });
    document.getElementById("outageButton").addEventListener("click", function () {
      Cells.renderer = outageRenderer;
    });
    document.getElementById("NumberOfTicketsButton").addEventListener("click", function () {
      Cells.renderer = NumberOfTicketsRenderer;
    });
    document.getElementById("NumberOutagesRenderer").addEventListener("click", function () {
      Cells.renderer = NumberOutagesRenderer;
    });
    function gitTotalAllRFIAndCCTickets() {
      RFIsFC.when(function () {
        RFIsFC.queryFeatureCount().then(function (count) {
          console.log("Total number of features:", count);
          // You can display this number wherever you want, for example:
          document.getElementById("totalRFI").innerText = count;
        }).catch(function (error) {
          console.error("Error getting feature count:", error);
        });
      });
      CCTicketsFCExportFeatures.when(function () {
        CCTicketsFCExportFeatures.queryFeatureCount().then(function (count) {
          console.log("Total number of features:", count);
          // You can display this number wherever you want, for example:
          document.getElementById("totalCCTickets").innerText = count;
        }).catch(function (error) {
          console.error("Error getting feature count:", error);
        });
      });
    }
    gitTotalAllRFIAndCCTickets()
    //  console.log("to get 10 :",map.layers.getItemAt(10).title);
    sitesFinal.popupTemplate = {
      title: "{site_id}",
      outFields: ["*"],
      returnGeometry: true,
      fieldInfos: [
        {
          fieldName: "site_id",
          label: "Site ID:"
        },
        {
          fieldName: "ID",
          label: "ID:"
        }
        ,
        {
          fieldName: "plan_latitude",
          label: "Latitude:"
        }
        ,
        {
          fieldName: "plan_longitude",
          label: "Longitude:"
        }
      ],
      content: [
        // Add FieldContent to popup template.
        {
          type: "fields"
        },
        // Create RelationshipContent with the relationship between
        // the units and fires.
        {
          type: "relationship",
          // The numeric ID value for the defined relationship on the service.
          // This can be found on the service.
          relationshipId: 0,
          description: "",
          // Display two related fire features in the list of related features.
          displayCount: 1,
          title: "Maintenance Site Operation Data",
          // Order the related features by the 'GIS_ACRES' in descending order.
          orderByFields: {
            field: "site_id",
            order: "desc"
          }
        },
        // // Create RelationshipContent with the relationship between
        // // the units and wildfire protection facility statistics table.
        {
          type: "relationship",
          relationshipId: 1,
          description: "",
          // Display only the one unit
          displayCount: 1,
          title: "Outages Data",
          // Order list of related records by the 'NAME' field in ascending order.
          orderByFields: {
            field: "site_id",
            order: "asc"
          }
        },
      ]
    }
    // HPSMTickets.popupTemplate = {
    //   title: "{phone_number}",
    //   outFields: ["*"],
    //   returnGeometry: true,
    //   fieldInfos: [
    //     {
    //       fieldName: "im_id",
    //       label: "Im ID:",
    //     },
    //     {
    //       fieldName: "phone_number",
    //       label: "Phone Number:"
    //     },
    //     {
    //       fieldName: "sd_id",
    //       label: "SD ID:"
    //     },
    //     {
    //       fieldName: "sd_open_time",
    //       label: "SD Open Time:"
    //     },
    //     {
    //       fieldName: "sd_opened_by",
    //       label: "SD Opened By:"
    //     }
    //     ,
    //     {
    //       fieldName: "sd",
    //       label: "SD:"
    //     }
    //     ,
    //     {
    //       fieldName: "sd_status",
    //       label: "SD Status:"
    //     }
    //     ,
    //     {
    //       fieldName: "area",
    //       label: "Area:"
    //     }
    //     ,
    //     {
    //       fieldName: "subcategory",
    //       label: "Subcategory:"
    //     }
    //     ,
    //     {
    //       fieldName: "sd_close_time",
    //       label: "SD Close Time:"
    //     }
    //     ,
    //     {
    //       fieldName: "sd_resolution_time",
    //       label: "SD Resolution Time:"
    //     }
    //     ,
    //     {
    //       fieldName: "general_outage",
    //       label: "General Outage"
    //     }
    //     ,
    //     {
    //       fieldName: "sla_status",
    //       label: "Sla Status:"
    //     }
    //     ,
    //     {
    //       fieldName: "affected_service",
    //       label: "Affected Service:"
    //     }
    //     ,
    //     {
    //       fieldName: "gouvernorate",
    //       label: "Gouvernorate:"
    //     }
    //     ,
    //     {
    //       fieldName: "resolution",
    //       label: "Resolution:"
    //     }
    //     ,
    //     {
    //       fieldName: "resolution_code",
    //       label: "Resolution Code:"
    //     }
    //     ,
    //     {
    //       fieldName: "cell_id",
    //       label: "Cell ID:"
    //     }
    //     ,
    //     {
    //       fieldName: "cell_name",
    //       label: "Cell Name:"
    //     }
    //     ,
    //     {
    //       fieldName: "siteid",
    //       label: "Siteid:"
    //     }
    //     ,
    //     {
    //       fieldName: "customer_segment",
    //       label: "Customer Segment:"
    //     }
    //     ,
    //     {
    //       fieldName: "sitename",
    //       label: "Sitename:"
    //     }
    //     ,
    //     {
    //       fieldName: "reopened",
    //       label: "Reopened:"
    //     }
    //     ,
    //     {
    //       fieldName: "resolved_by",
    //       label: "Resolved by:"
    //     }
    //     ,
    //     {
    //       fieldName: "region",
    //       label: "Region:"
    //     }
    //     ,
    //     {
    //       fieldName: "resolved_by",
    //       label: "Resolved By:"
    //     }
    //     ,
    //     {
    //       fieldName: "expected_resolution_date",
    //       label: "Expected Resolution Date:"
    //     }
    //   ],
    //   content: [
    //     // Add FieldContent to popup template.
    //     {
    //       type: "fields"
    //     },
    //     // Create RelationshipContent with the relationship between
    //     // the units and fires.
    //     {
    //       type: "relationship",
    //       // The numeric ID value for the defined relationship on the service.
    //       // This can be found on the service.
    //       relationshipId: 4,
    //       description: "",
    //       // Display two related fire features in the list of related features.
    //       displayCount: 1,
    //       title: "Maintenance Site Operation Data",
    //       // Order the related features by the 'GIS_ACRES' in descending order.
    //       orderByFields: {
    //         field: "site_id",
    //         order: "desc"
    //       }
    //     },
    //     // // Create RelationshipContent with the relationship between
    //     // // the units and wildfire protection facility statistics table.
    //     {
    //       type: "relationship",
    //       relationshipId: 5,
    //       description: "",
    //       // Display only the one unit
    //       displayCount: 1,
    //       title: "Outages Data",
    //       // Order list of related records by the 'NAME' field in ascending order.
    //       orderByFields: {
    //         field: "site_id",
    //         order: "asc"
    //       }
    //     },
    //   ]
    // }
    // map.layers.getItemAt(5).popupTemplate = {
    //   title: "{site_name}",
    //   outFields: ["*"],
    //   returnGeometry: true,
    //   fieldInfos: [
    //     {
    //       fieldName: "site_id",
    //       label: "Site ID:"
    //     },
    //     {
    //       fieldName: "site_name",
    //       label: "site name:"
    //     },
    //     {
    //       fieldName: "latitude",
    //       label: "latitude:"
    //     },
    //     {
    //       fieldName: "longitude",
    //       label: "latitude:"
    //     },
    //     {
    //       fieldName: "covergae_area_id",
    //       label: "covergae area id:"
    //     },
    //     {
    //       fieldName: "coverage_status",
    //       label: "coverage status:"
    //     },
    //     {
    //       fieldName: "coverage_status_date_time",
    //       label: "coverage status date time:"
    //     },
    //     {
    //       fieldName: "coverage_location",
    //       label: "coverage location:"
    //     },
    //     {
    //       fieldName: "cgi",
    //       label: "cgi:"
    //     },
    //     {
    //       fieldName: "outage",
    //       label: "outage:"
    //     },
    //     {
    //       fieldName: "maintentance",
    //       label: "maintentance:"
    //     },
    //     {
    //       fieldName: "gov",
    //       label: "gov:"
    //     },
    //     {
    //       fieldName: "network_type",
    //       label: "network type:"
    //     },
    //   ],
    //   content: [
    //     // Add FieldContent to popup template.
    //     {
    //       type: "fields"
    //     },
    //     // Create RelationshipContent with the relationship between
    //     // the units and fires.
    //     {
    //       type: "relationship",
    //       // The numeric ID value for the defined relationship on the service.
    //       // This can be found on the service.
    //       relationshipId: 2,
    //       description: "",
    //       // Display two related fire features in the list of related features.
    //       displayCount: 1,
    //       title: "Sites Data",
    //       // Order the related features by the 'GIS_ACRES' in descending order.
    //       orderByFields: {
    //         field: "site_id",
    //         order: "desc"
    //       }
    //     },
    //     // // Create RelationshipContent with the relationship between
    //     // // the units and wildfire protection facility statistics table.
    //     {
    //       type: "relationship",
    //       relationshipId: 6,
    //       description: "",
    //       // Display only the one unit
    //       displayCount: 1,
    //       title: "CCTicketsFC Data",
    //       // Order list of related records by the 'NAME' field in ascending order.
    //       orderByFields: {
    //         field: "siteid",
    //         order: "asc"
    //       }
    //     },
    //   ]
    // }
    // On view click, first remove all the previously added features (if any).
    reactiveUtils.on(
      () => view,
      "click",
      async (event) => {
        // Remove any existing highlighted features
        //  handles.removeAll();
        document.getElementById("Data_Container_By_Select").innerHTML = " "
        layerBlockArray.forEach((block) => {
          while (block.lastElementChild) {
            block.removeChild(block.lastElementChild);
          }
        });

        // Call fetchFeatures and pass in the click event location.
        const fetchFeaturesResponse = await view.popup.fetchFeatures(event);

        // Iterate through the returned graphics once the allGraphicsPromise resolves.
        const graphics = await fetchFeaturesResponse.allGraphicsPromise;
        if (graphics.length > 0) {
          graphics.forEach((graphic) => {
            // For each layer's calcite block, loop through the graphics and add
            // the graphic to a feature widget into that block.
            layerBlockArray.forEach((block) => {
              const layerTitle = graphic.layer.title;
              if (block.heading === layerTitle) {
                panel.appendChild(block);
                const featureChild = new Feature({
                  container: document.createElement("div"),
                  graphic: graphic
                });
                block.appendChild(featureChild.container);
                if (block.id == CellsTitle) {

                  console.log(featureChild.graphic.attributes.CELLID);
                  getSitesFeatureLayer(featureChild.graphic.attributes.CELLID, featureChild.graphic.attributes.cgi, "select_on_map")
                  console.log(block);
                }
                // block.appendChild(featureChild.container);
                // If the graphic comes from a feature layer, add a highlight
                // to that feature using the layerView.highlight method.
                if (graphic.layer.type === "feature") {
                  layerViews.forEach((layerView) => {
                    if (graphic.layer.title === layerView.layer.title) {
                      //  handles.add(layerView.highlight(graphic));
                    }
                  });
                }
              }
            });
          });
        }
      }
    );

    // add legend, layerlist and basemapGallery widgets
    view.ui.add(
      [
        new Expand({
          content: new Legend({
            view: view
          }),
          view: view,
          group: "top-left"
        }),
        new Expand({
          content: new LayerList({ view: view }),
          view: view,
          group: "top-left"
        }),
        new Expand({
          content: new BasemapGallery({
            view: view
          }),
          view: view,
          expandIcon: "basemap",
          group: "top-left"
        }),
        new Expand({
          content: controls,
          view: view,
          expandIcon: "filter",
          group: "top-left"
        })
      ],
      "top-left"
    );

    view.ui.add("clear-selection", "top-left");

    document.getElementById("clear-selection").addEventListener("click", () => {
      handles.removeAll();
      featureTableHPSMTickets.highlightIds.removeAll();
      featureTableRFIsFC.highlightIds.removeAll();
      featureTableCCTickets.highlightIds.removeAll();
      featureTableJammerSites.highlightIds.removeAll();
      featureTableSites.highlightIds.removeAll();
      // featureTableNetworkCoverage.highlightIds.removeAll();
      featureTableCells.highlightIds.removeAll();
      featureTableOutagesData.highlightIds.removeAll();

      document.getElementById("Data_Container_By_Select").innerHTML = " "
      gitTotalAllRFIAndCCTickets()
      ChartRFIA(0, "Affected_Service", "chart-RFIAffected");
      ChartRFIA(0, "SUBCATEGORY", "chart-RFISubcategory");
      ChartRFIA(0, "PRODUCT_TYPE", "chart-RFIPRODUCTTYPE");
      ChartCCTickets(0, "affected_service", "chart-CCTicketsAffected");
      ChartCCTickets(0, "subcategory", "chart-CCTicketsSubcategory");
      ChartCCTickets(0, "area", "chart-CCTicketsArea");
      layerBlockArray.forEach((block) => {
        while (block.lastElementChild) {
          block.removeChild(block.lastElementChild);
        }
      });
    });

    const searchWidget = new Search({
      view: view,
      allPlaceholder: "Site id Or Phone number",
      includeDefaultSources: false,
      sources: [
        {
          layer: sitesFinal,
          searchFields: ["site_id"],
          displayField: "site_id",
          exactMatch: false,
          // outFields: ["*"],
          name: "Sites",
          placeholder: "example: BAG0400"
        },
        // {
        //   layer: HPSMTickets,
        //   searchFields: ["phone_number"],
        //   displayField: "phone_number",
        //   exactMatch: false,
        //   // outFields: ["*"],
        //   name: "CCTicketsFC",
        //   placeholder: "example: 010123456789"
        // },
        // {
        //   name: "ArcGIS World Geocoding Service",
        //   placeholder: "example: Nuuk, GRL",
        //   apiKey: "AAPK8439fc9a325c4593a3234a4fbafe73caXK2STpUubI24-8zi9egsX2fCBrOdoOUY5qDXEAIHWamfxipss0ffj3zCLo7amIE6"
        //   ,
        //   singleLineFieldName: "SingleLine",
        //   url: "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer"
        // }
      ]
    });

    // Add the search widget to the top left corner of the view
    view.ui.add(searchWidget, {
      position: "top-right"
    });

    // add the toolbar for the measurement widgets
    view.ui.add("topbar", "top-right");
    view.ui.add("classification", "bottom-left");

    // create the measurement widgets and hide them by default
    const distanceMeasurement2D = new DistanceMeasurement2D({
      view,
      visible: false
    });
    const areaMeasurement2D = new AreaMeasurement2D({
      view,
      visible: false
    });

    // event listener for distance measurements
    document.getElementById("distanceButton").addEventListener("click", function () {
      //  setActiveWidget(null);
      if (!this.classList.contains("active")) {
        setActiveWidget("distance");
      } else {
        setActiveButton(null);
      }
    });

    // event listener for area measurements
    document.getElementById("areaButton").addEventListener("click", function () {
      setActiveWidget(null);
      if (!this.classList.contains("active")) {
        setActiveWidget("area");
      } else {
        setActiveButton(null);
      }
    });

    document.getElementById('clearButton').addEventListener("click", () => {
      clearMeasurements();
    });

    // Clears all measurements
    function clearMeasurements() {
      setActiveWidget(null);
    }

    function setActiveWidget(type) {
      switch (type) {
        case "distance":
          areaMeasurement2D.visible = false;
          distanceMeasurement2D.visible = true;
          distanceMeasurement2D.viewModel.start();
          setActiveButton(document.getElementById("distanceButton"));
          break;
        case "area":
          distanceMeasurement2D.visible = false;
          areaMeasurement2D.visible = true;
          areaMeasurement2D.viewModel.start();
          setActiveButton(document.getElementById("areaButton"));
          break;
        case null:
          areaMeasurement2D.visible = false;
          distanceMeasurement2D.visible = false;
          break;
      }
    }

    function setActiveButton(selectedButton) {
      // focus the view to activate keyboard shortcuts for sketching
      view.focus();

    }

    const homeBtn = new Home({
      view: view
    });

    // Add the home button to the top left corner of the view
    view.ui.add(homeBtn, "top-right");

    const locateBtn = new Locate({
      view: view
    });

    // Add the locate widget to the top left corner of the view
    view.ui.add(locateBtn, {
      position: "top-right"
    });

    /********************************
    * Create a compass widget object.
     *********************************/

    const compassWidget = new Compass({
      view: view
    });

    view.ui.add(
      [
        new Expand({
          content: new Print({
            view: view,
            // specify your own print service
            printServiceUrl:
              "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
          }),
          view: view,
          group: "top-right"
        }),
      ],
      "top-right"
    );

    const applicationDiv = document.getElementById("applicationDiv");

    view.ui.add(
      new Fullscreen({
        view: view,
        element: applicationDiv
      }),
      "top-right"
    );


    // Add the Compass widget to the top left corner of the view
    view.ui.add(compassWidget, "top-right");


    // const typeSelect = document.getElementById("type-select");

    // typeSelect.addEventListener("change", async () => {
    //   const value = typeSelect.value;
    //   // const layerHPSM = map.layers.getItemAt(6);
    //   // const CCTicketsFCExportFeatures = map.layers.getItemAt(9);
    //   await HPSMTickets.load();
    //   await CCTicketsFCExportFeatures.load();
    //   // Create an array of layerViews to be able to highlight selected features.
    //   if (HPSMTickets.type === "feature") {
    //     // const layerView = await view.whenLayerView(layer);

    //     HPSMTickets.definitionExpression =
    //       value === "all"
    //         ? null
    //         : `sd_status = '${value}'`

    //   }
    //   if (CCTicketsFCExportFeatures.type === "feature") {
    //     // const layerViewCCTicketsFC = await view.whenLayerView(layerCCTicketsFC);

    //     CCTicketsFCExportFeatures.definitionExpression =
    //       value === "all"
    //         ? null
    //         : `sd_status = '${value}'`

    //   }
    //   // });
    // });

    const SearchInputAffectedService = document.getElementById("SearchInputAffectedService");
    SearchInputAffectedService.addEventListener("change", async () => {
      const value = SearchInputAffectedService.value;
      console.log(value);
      // const layer = map.layers.getItemAt(6);
      await CCTicketsFCExportFeatures.load();
      // Create an array of layerViews to be able to highlight selected features.
      if (CCTicketsFCExportFeatures.type === "feature") {

        CCTicketsFCExportFeatures.definitionExpression = value === ""
          ? null
          : `affected_service = '${value}'`

      }
    });

    const SearchInputCCSubcategory = document.getElementById("SearchInputCCSubcategory");
    SearchInputCCSubcategory.addEventListener("change", async () => {
      const value = SearchInputCCSubcategory.value;
      console.log(value);
      // const layer = map.layers.getItemAt(6);
      await CCTicketsFCExportFeatures.load();
      // Create an array of layerViews to be able to highlight selected features.
      if (CCTicketsFCExportFeatures.type === "feature") {

        CCTicketsFCExportFeatures.definitionExpression = value === ""
          ? null
          : `subcategory = '${value}'`

      }
    });

    const SearchInputCCArea = document.getElementById("SearchInputCCArea");
    SearchInputCCArea.addEventListener("change", async () => {
      const value = SearchInputCCArea.value;
      console.log(value);
      // const layer = map.layers.getItemAt(6);
      await CCTicketsFCExportFeatures.load();
      // Create an array of layerViews to be able to highlight selected features.
      if (CCTicketsFCExportFeatures.type === "feature") {

        CCTicketsFCExportFeatures.definitionExpression = value === ""
          ? null
          : `area = '${value}'`

      }
    });

    const SearchInputProductType = document.getElementById("SearchInputProductType");
    SearchInputProductType.addEventListener("change", async () => {
      const value = SearchInputProductType.value;
      console.log(value);
      // const layer = map.layers.getItemAt(6);
      await RFIsFC.load();
      // Create an array of layerViews to be able to highlight selected features.
      if (RFIsFC.type === "feature") {

        RFIsFC.definitionExpression = value === ""
          ? null
          : `PRODUCT_TYPE = '${value}'`

      }
    });

    const SearchInputRFIsSubcategory = document.getElementById("SearchInputRFIsSubcategory");
    SearchInputRFIsSubcategory.addEventListener("change", async () => {
      const value = SearchInputRFIsSubcategory.value;
      console.log(value);
      // const layer = map.layers.getItemAt(6);
      await RFIsFC.load();
      // Create an array of layerViews to be able to highlight selected features.
      if (RFIsFC.type === "feature") {

        RFIsFC.definitionExpression = value === ""
          ? null
          : `SUBCATEGORY = '${value}'`

      }
    });

    const SearchInputRFIsArea = document.getElementById("SearchInputRFIsArea");
    SearchInputRFIsArea.addEventListener("change", async () => {
      const value = SearchInputRFIsArea.value;
      console.log(value);
      // const layer = map.layers.getItemAt(6);
      await RFIsFC.load();
      // Create an array of layerViews to be able to highlight selected features.
      if (RFIsFC.type === "feature") {

        RFIsFC.definitionExpression = value === ""
          ? null
          : `User_Location = '${value}'`

      }
    });


    document.getElementById("SearchBTN").addEventListener("click", searchOnMap);

    function searchOnMap() {
      var addressVar = document.getElementById("SearchInput").value
      // console.log(addressVar);
      const geocodingServiceUrl = "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

      const params = {
        address: {
          "address": addressVar
        }
      }

      locator.addressToLocations(geocodingServiceUrl, params).then((results) => {

        showResult(results);
      });


      function showResult(results) {
        if (results.length) {
          var query = results[0];
          // console.log(query);
          const result = results[0];
          // console.log(result.location.longitude.toFixed(5) + "," + result.location.latitude.toFixed(5))
          view.graphics.add(new Graphic({
            symbol: {
              type: "simple-marker",
              color: "#000000",
              size: "8px",
              outline: {
                color: "#ffffff",
                width: "1px"
              }
            },
            geometry: result.location,
            attributes: {
              title: "Address",
              address: result.address,
              score: result.score
            },
            popupTemplate: {
              title: "{title}",
              content: result.address + "<br><br>" + result.location.longitude.toFixed(5) + "," + result.location.latitude.toFixed(5)
            }
          }
          ));
          if (results.length) {
            const g = view.graphics.getItemAt(view.graphics._items.length - 1);
            view.openPopup({
              features: [g],
              location: g.geometry
            });
            getDitalls(g.geometry)
          }
          view.goTo({
            target: result.location,
            zoom: 13
          });
        }
      }
    };

    function getDitalls(point) {

      var query = Cells.createQuery();

      // Set the geometry for the query
      query.geometry = point;

      // Execute the query
      Cells.queryFeatures(query).then(function (result) {
        // Check if any features were found
        if (result.features.length > 0) {
          var polygon = result.features[result.features.length - 1]; // Assuming you want the first polygon if there are multiple intersections
          // Do something with the polygon, e.g., access attributes: polygon.attributes
          // console.log(polygon.attributes.site_id);
          getSitesFeatureLayer(polygon.attributes.CELLID, polygon.attributes.cgi,  "search")
        } else {
          // console.log("Point is not within any polygon.");
          document.getElementById("Data_Container_By_Search").innerHTML = `<h3 style="color:gray"> No Data Found </h3>`
        }
      }).catch(function (error) {
        console.error("Error during query: ", error);
      });
    }

    // Define the query parameters
    function getSitesFeatureLayer(cell_id, cgi, caller) {

      document.getElementById("Data_Container_By_Search").innerHTML = ` `
      document.getElementById("Data_Container_By_Select").innerHTML = ` `
      console.log("ffffff", cell_id);
      if (cell_id) {

        var queryParamsForCells = {
          where: `CELLID = '${cell_id}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
        var queryParamsForMaintenanceAndOutagesData = {
          where: `cell_id = '${cell_id}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
        var queryParamsRFIAndCCTickets = {
          where: `cgi = '${cgi}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
        // Execute the query


        if (caller == "search") {
          Cells.queryFeatures(queryParamsForCells)
            .then(function (result) {
              // Handle the query result
              if (result.features.length > 0) {
                document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
                <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Network Coverage Data
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body" id=${caller == "search" ? "collapseOneBodySearch" : "collapseOneBodySelect"}>
                  </div>
                </div>
              </div>
                `
   
                 for (let index = 0; index < result.features.length; index++) {
                   const element = result.features[index];
                   document.getElementById(caller == "search" ? "collapseOneBodySearch" : "collapseOneBodySelect").innerHTML += `
                  <table  class="mt-3 table table-striped table-bordered">
                  <thead>
                    <th colspan="2">Site ID: ${element.attributes.site_id ? element.attributes.site_id : " "}</th>
                  </thead>
                <tbody>
                  <tr>
                    <th>Coverage Status: </th>
                    <td> ${element.attributes.coverage_status ? element.attributes.coverage_status : " "}</td>
                  </tr>
                  <tr>
                    <th>Coverage Status Date Time: </th>
                    <td> ${element.attributes.coverage_status_date_time ? element.attributes.coverage_status_date_time : " "}</td>
                  </tr>
                  <tr>
                    <th>Coverage Location: </th>
                    <td> ${element.attributes.coverage_location ? element.attributes.coverage_location : " "}</td>
                  </tr>
                  <tr>
                    <th>CGI: </th>
                    <td> ${element.attributes.cgi ? element.attributes.cgi : " "}</td>
                  </tr>
                  <tr>
                    <th>Site Name: </th>
                    <td> ${element.attributes.site_name ? element.attributes.site_name : " "}</td>
                  </tr>
                  <tr>
                    <th>Latitude: </th>
                    <td> ${element.attributes.latitude ? element.attributes.latitude : " "}</td>
                  </tr>
                  <tr>
                    <th>Longitude: </th>
                    <td> ${element.attributes.longitude ? element.attributes.longitude : " "}</td>
                  </tr>
          
                </tbody>
              </table>
                `
                   // console.log("site",element.attributes);
                 }
              }else{
                document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
                <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
                No cells Found
                </button>`
              }

            }).catch(function (error) {
              // Handle errors
              console.error("Error performing query:", error);
            });
            CCTicketsFCExportFeatures.queryFeatures(queryParamsRFIAndCCTickets)
            .then(function (result) {
              // Check if features are available
              if (result && result.features) {
                // Get the total number of features
                var count = result.features.length;
                console.log("Total number of features:", count);
                // Display the count wherever you want
                document.getElementById("totalCCTickets").innerText = count;
              } else {
                console.error("Error: No features found in the result.");
                document.getElementById("totalCCTickets").innerText = 0;
              }
            }).catch(function (error) {
              console.error("Error querying features:", error);
            });
            RFIsFC.queryFeatures(queryParamsRFIAndCCTickets)
            .then(function (result) {
              // Check if features are available
              if (result && result.features) {
                // Get the total number of features
                var count = result.features.length;
                console.log("Total number of features:", count);
                // Display the count wherever you want
                document.getElementById("totalRFI").innerText = count;
              } else {
                console.error("Error: No features found in the result.");
                document.getElementById("totalRFI").innerText = 0;
              }
            }).catch(function (error) {
              console.error("Error querying features:", error);
            });
        }

        // Execute the query
        ChartRFIA(cgi, "Affected_Service", "chart-RFIAffected");
        ChartRFIA(cgi, "SUBCATEGORY", "chart-RFISubcategory");
        ChartRFIA(cgi, "PRODUCT_TYPE", "chart-RFIPRODUCTTYPE");
        ChartCCTickets(cgi, "affected_service", "chart-CCTicketsAffected");
        ChartCCTickets(cgi, "subcategory", "chart-CCTicketsSubcategory");
        ChartCCTickets(cgi, "area", "chart-CCTicketsArea");


          featureLayerMaintenanceSiteOperation.queryFeatures(queryParamsForMaintenanceAndOutagesData)
          .then(function (result) {

            // Handle the query result
            if (result.features.length > 0) {
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
              <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Maintenance Site Operation Data
                </button>
              </h2>
              <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body" id=${caller == "search" ? "collapseTwoBodySearch" : "collapseTwoBodySelect"}>
                </div>
              </div>
             </div>
              `
 
             for (let index = 0; index < result.features.length; index++) {
               const element = result.features[index];
               var perationDateObj = new Date(element.attributes.peration_date)
               document.getElementById(caller == "search" ? "collapseTwoBodySearch" : "collapseTwoBodySelect").innerHTML += `
                <table  class="mt-3 table table-striped table-bordered">
                <thead>
                  <th colspan="2">Cell ID: ${element.attributes.cell_id ? element.attributes.cell_id : " "}</th>
                </thead>
              <tbody>
                <tr>
                  <th>Operation Category: </th>
                  <td> ${element.attributes.operation_category ? element.attributes.operation_category : " "}</td>
                </tr>
                <tr>
                  <th>Operation ID: </th>
                  <td> ${element.attributes.operation_id ? element.attributes.operation_id : " "}</td>
                </tr>
                <tr>
                  <th>Operation Name: </th>
                  <td> ${element.attributes.operation_name ? element.attributes.operation_name : " "}</td>
                </tr>
                <tr>
                  <th>Peration Date: </th>
                  <td> ${perationDateObj ? perationDateObj.toUTCString() : " "}</td>
                </tr>
                <tr>
                  <th>Site ID: </th>
                  <td> ${element.attributes.site_id ? element.attributes.site_id : " "}</td>
                </tr>
                <tr>
                  <th>Status: </th>
                  <td> ${element.attributes.status ? element.attributes.status : " "}</td>
                </tr>
              </tbody>
            </table>
              `
               // console.log("MaintenanceSiteOperation",element.attributes);
             }
            }else{
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
              <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
              No Maintenance Site Operation Found
              </button>`
            }


          }).catch(function (error) {
            // Handle errors
            console.error("Error performing query:", error);
          });
          // Execute the query
          featureLayerOutagesData.queryFeatures(queryParamsForMaintenanceAndOutagesData)
          .then(function (result) {
            // Handle the query result
            if (result.features.length > 0) {
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
              <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Outages Data
                </button>
              </h2>
              <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body" id=${caller == "search" ? "collapseThreeBodySearch" : "collapseThreeBodySelect"}>
                </div>
              </div>
            </div>
              `
               for (let index = 0; index < result.features.length; index++) {
                 const element = result.features[index];
                 var clearanceTimeDateObj = new Date(element.attributes.clearance_time);
                 var closeTimeDateObj = new Date(element.attributes.close_time);
                 document.getElementById(caller == "search" ? "collapseThreeBodySearch" : "collapseThreeBodySelect").innerHTML += `
                <table  class="mt-3 table table-striped table-bordered">
                <thead>
                  <th colspan="2">Incident ID: ${element.attributes.incident_id ? element.attributes.incident_id : " "}</th>
                </thead>
              <tbody>
                <tr>
                  <th>Affected Sector: </th>
                  <td> ${element.attributes.affected_sector ? element.attributes.affected_sector : " "}</td>
                </tr>
                <tr>
                  <th>Affectedobject: </th>
                  <td> ${element.attributes.affectedobject ? element.attributes.affectedobject : " "}</td>
                </tr>
                <tr>
                  <th>Alarm Number: </th>
                  <td> ${element.attributes.alarm_number ? element.attributes.alarm_number : " "}</td>
                </tr>
                <tr>
                  <th>Alarm Severity: </th>
                  <td> ${element.attributes.alarm_severity ? element.attributes.alarm_severity : " "}</td>
                </tr>
                <tr>
                  <th>Assignment: </th>
                  <td> ${element.attributes.assignment ? element.attributes.assignment : " "}</td>
                </tr>
                <tr>
                  <th>Cell ID: </th>
                  <td> ${element.attributes.cell_id ? element.attributes.cell_id : " "}</td>
                </tr>
                <tr>
                  <th>Clearance Time: </th>
                  <td> ${clearanceTimeDateObj ? clearanceTimeDateObj.toUTCString() : " "}</td>
                </tr>
                <tr>
                  <th>Close Time: </th>
                  <td> ${closeTimeDateObj ? closeTimeDateObj.toUTCString() : " "}</td>
                </tr>
                <tr>
                  <th>Cluster: </th>
                  <td> ${element.attributes.cluster ? element.attributes.cluster : " "}</td>
                </tr>
                <tr>
                  <th>Duration: </th>
                  <td> ${element.attributes.duration ? element.attributes.duration : " "}</td>
                </tr>
                <tr>
                  <th>Element: </th>
                  <td> ${element.attributes.element ? element.attributes.element : " "}</td>
                </tr>
                <tr>
                  <th>Incident ID: </th>
                  <td> ${element.attributes.incident_id ? element.attributes.incident_id : " "}</td>
                </tr>
                <tr>
                  <th>Kpi Category: </th>
                  <td> ${element.attributes.kpi_category ? element.attributes.kpi_category : " "}</td>
                </tr>
                <tr>
                  <th>Kpi Subcategory: </th>
                  <td> ${element.attributes.kpi_subcategory ? element.attributes.kpi_subcategory : " "}</td>
                </tr>
                <tr>
                  <th>NE Name: </th>
                  <td> ${element.attributes.ne_name ? element.attributes.ne_name : " "}</td>
                </tr>
                <tr>
                  <th>Notification ID: </th>
                  <td> ${element.attributes.notification_id ? element.attributes.notification_id : " "}</td>
                </tr>
                <tr>
                  <th>Open Time: </th>
                  <td> ${element.attributes.open_time ? element.attributes.open_time : " "}</td>
                </tr>
                <tr>
                  <th>Original_event Time: </th>
                  <td> ${element.attributes.original_event_time ? element.attributes.original_event_time : " "}</td>
                </tr>
                <tr>
                  <th>Problem Category: </th>
                  <td> ${element.attributes.problem_category ? element.attributes.problem_category : " "}</td>
                </tr>
                <tr>
                  <th>Province City: </th>
                  <td> ${element.attributes.province_city ? element.attributes.province_city : " "}</td>
                </tr>
                <tr>
                  <th>Reason: </th>
                  <td> ${element.attributes.reason ? element.attributes.reason : " "}</td>
                </tr>
                <tr>
                  <th>Resolution: </th>
                  <td> ${element.attributes.resolution ? element.attributes.resolution : " "}</td>
                </tr>
                <tr>
                  <th>Resolution Code: </th>
                  <td> ${element.attributes.resolution_code ? element.attributes.resolution_code : " "}</td>
                </tr>
                <tr>
                  <th>Service Affected: </th>
                  <td> ${element.attributes.service_affected ? element.attributes.service_affected : " "}</td>
                </tr>
                <tr>
                  <th>Site ID: </th>
                  <td> ${element.attributes.site_id ? element.attributes.site_id : " "}</td>
                </tr>
                <tr>
                  <th>Site Name: </th>
                  <td> ${element.attributes.site_name ? element.attributes.site_name : " "}</td>
                </tr>
                <tr>
                  <th>Status: </th>
                  <td> ${element.attributes.status ? element.attributes.status : " "}</td>
                </tr>
                <tr>
                  <th>Update Time: </th>
                  <td> ${element.attributes.update_time ? element.attributes.update_time : " "}</td>
                </tr>
              </tbody>
            </table>
              `
                 // console.log("OutagesData",element.attributes);
               }
            }else{
              document.getElementById(caller == "search" ? "Data_Container_By_Search" : "Data_Container_By_Select").innerHTML += `
              <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
              No Outages Data Found
              </button>`
            }

          }).catch(function (error) {
            // Handle errors
            console.error("Error performing query:", error);
          });
          CCTicketsFCExportFeatures.queryFeatures(queryParamsRFIAndCCTickets)
          .then(function (result) {
            // Check if features are available
            if (result && result.features) {
              // Get the total number of features
              var count = result.features.length;
              console.log("Total number of features:", count);
              // Display the count wherever you want
              document.getElementById("totalCCTickets").innerText = count;
            } else {
              console.error("Error: No features found in the result.");
              document.getElementById("totalCCTickets").innerText = 0;
            }
          }).catch(function (error) {
            console.error("Error querying features:", error);
          });
          RFIsFC.queryFeatures(queryParamsRFIAndCCTickets)
          .then(function (result) {
            // Check if features are available
            if (result && result.features) {
              // Get the total number of features
              var count = result.features.length;
              console.log("Total number of features:", count);
              // Display the count wherever you want
              document.getElementById("totalRFI").innerText = count;
            } else {
              console.error("Error: No features found in the result.");
              document.getElementById("totalRFI").innerText = 0;
            }
          }).catch(function (error) {
            console.error("Error querying features:", error);
          });


      } else {
        document.getElementById("totalRFI").innerText = 0;
        document.getElementById("totalCCTickets").innerText = 0;
        ChartRFIA(1, "Affected_Service", "chart-RFIAffected");
        ChartRFIA(1, "SUBCATEGORY", "chart-RFISubcategory");
        ChartRFIA(1, "PRODUCT_TYPE", "chart-RFIPRODUCTTYPE");
        ChartCCTickets(1, "affected_service", "chart-CCTicketsAffected");
        ChartCCTickets(1, "subcategory", "chart-CCTicketsSubcategory");
        ChartCCTickets(1, "area", "chart-CCTicketsArea");
        if (caller == "search") {
          document.getElementById("Data_Container_By_Search").innerHTML = `<h3 style="color:gray"> No Data Found </h3>`
        } else if (caller == "select_on_map") {
          document.getElementById("Data_Container_By_Select").innerHTML = `<h3 style="color:gray"> No Data Found </h3>`
        }
      }
    }

    // ========================================charts==============================================

    // const layerHPSM = map.layers.getItemAt(6);
    // const layerRFI = map.layers.getItemAt(8)
    // const layerCCTickets = map.layers.getItemAt(9)

    // console.log(layer);
    // await HPSMTickets.load();
    await RFIsFC.load();
    await CCTicketsFCExportFeatures.load();
    // let layerViewHPSM = await view.whenLayerView(HPSMTickets);
    // let layerRFIView = await view.whenLayerView(RFIsFC);
    // let layerCCTicketsView = await view.whenLayerView(CCTicketsFCExportFeatures);


    // prepare data for total Tickets by time of day chart
    let charts = [], hourData = [], hourLabels = [];

    // Tickets by time of day chart
    // run stats query to return total number of Tickets by time of day
    // stats results will be grouped by the time of day
    const hourResult = await runQuery("1=1", "extract(hour from sd_open_time)");
    for (let feature of hourResult.features) {
      hourData.push(feature.attributes["count"]);
      // console.log(feature);
      // hourLabels.push(feature.attributes["EXPR_1"]+2>12?(feature.attributes["EXPR_1"]+2)-12:feature.attributes["EXPR_1"]+2);
      let hourInIraq = (feature.attributes["EXPR_1"]); // Ensure it wraps around if exceeding 24 hours
      hourLabels.push(hourInIraq);
    }

    // create a bar chart showing total number of Tickets by time of day
    updateChart("chart-day", hourData, hourLabels, false, 100);

    // Tickets by time by months
    // run stats query to return total number of Tickets by months
    let monthData = [];
    let monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthResult = await runQuery("1=1", "extract(month from sd_open_time)");
    for (let feature of monthResult.features) {
      // console.log(feature.attributes["count"]);
      monthData.push(feature.attributes["count"]);
    }

    // create a bar chart showing total number of Tickets by months
    updateChart("chart-month", monthData, monthLabels, false, 50);
    // run stats query to return total number of Tickets by week days
    let weekData = [];

    // Tickets by days of week
    // week day labels are used for the total number of Tickets by week days
    const weekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    // create a bar chart showing total number of Tickets by week days
    updateChart("chart-week", weekData, weekLabels, false, 50);

    let SDStatusData = [], SDStatusLabels = [];
    // Tickets by time of day chart
    // run stats query to return total number of Tickets by time of day
    // stats results will be grouped by the time of day
    const SDStatusResult = await runHPSM("1=1", "sd_status");
    // for (let feature of SDStatusResult.features) {
    //   SDStatusData.push(feature.attributes["count"]);
    //   // console.log(feature.attributes);
    //   SDStatusLabels.push(feature.attributes["sd_status"]);
    // }

    Object.keys(SDStatusResult).forEach(key => {
      const value = SDStatusResult[key];
      SDStatusData.push(value);
      SDStatusLabels.push(key);
    });

    // create a bar chart showing total number of Tickets by time of day
    updateChart("chart-SDStatus", SDStatusData, SDStatusLabels, false, 50);


    async function ChartRFIA(cgi, fieldName, contenar) {
      console.log("test");
      let RFIData = [], RFILabels = [];
      // Tickets by time of day chart
      // run stats query to return total number of Tickets by time of day
      // stats results will be grouped by the time of day
      const RFIResult = await runRFIQuery(cgi, fieldName);
      // for (let feature of RFIResult.features) {
      // for (let feature of RFIResult) {
      //   RFIData.push(feature.attributes["count"]);
      //   // console.log(feature.attributes);
      //   RFILabels.push(feature.attributes[fieldName]);
      // }
      Object.keys(RFIResult).forEach(key => {
        const value = RFIResult[key];
        RFIData.push(value);
        RFILabels.push(key);
      });

      // create a bar chart showing total number of Tickets by time of day
      updatePieChart(contenar, RFIData, RFILabels, false, 50);
    }
    async function ChartCCTickets(cgi, fieldName, contenar) {
      console.log("test");
      let CCTicketsData = [], CCTicketsLabels = [];
      // Tickets by time of day chart
      // run stats query to return total number of Tickets by time of day
      // stats results will be grouped by the time of day
      const CCTicketsResult = await runCCTicketsQuery(cgi, fieldName);
      // for (let feature of CCTicketsResult) {
      //   CCTicketsData.push(feature.attributes["count"]);
      //   // console.log(feature.attributes);
      //   CCTicketsLabels.push(feature.attributes[fieldName]);
      // }
      Object.keys(CCTicketsResult).forEach(key => {
        const value = CCTicketsResult[key];
        CCTicketsData.push(value);
        CCTicketsLabels.push(key);
      });

      // create a bar chart showing total number of Tickets by time of day
      updateChart(contenar, CCTicketsData, CCTicketsLabels, false, 50);
    }

    ChartRFIA(0, "Affected_Service", "chart-RFIAffected");
    ChartRFIA(0, "SUBCATEGORY", "chart-RFISubcategory");
    ChartRFIA(0, "PRODUCT_TYPE", "chart-RFIPRODUCTTYPE");
    ChartCCTickets(0, "affected_service", "chart-CCTicketsAffected");
    ChartCCTickets(0, "subcategory", "chart-CCTicketsSubcategory");
    ChartCCTickets(0, "area", "chart-CCTicketsArea");

    let SUBCATEGORYData = [], SUBCATEGORYLabels = [];
    // Tickets by time of day chart
    // run stats query to return total number of Tickets by time of day
    // stats results will be grouped by the time of day
    const SUBCATEGORYResult = await runHPSM("1=1", "subcategory");
    // for (let feature of SUBCATEGORYResult.features) {
    //   SUBCATEGORYData.push(feature.attributes["count"]);
    //   // console.log(feature.attributes);
    //   SUBCATEGORYLabels.push(feature.attributes["subcategory"]);
    // }

    Object.keys(SUBCATEGORYResult).forEach(key => {
      const value = SUBCATEGORYResult[key];
      SUBCATEGORYData.push(value);
      SUBCATEGORYLabels.push(key);
    });

    // create a bar chart showing total number of Tickets by time of day
    updatePieChart("chart-subcategory", SUBCATEGORYData, SUBCATEGORYLabels, false, 50);


    let dayDistributionChart = updateChart("chart-day-distribution", [], hourLabels, true, 50);

    // this function is called 3 times when the app loads and generates
    // count stats for Tickets 1. by time of day 2. by day of week and 3. by month
    async function runQuery(where, groupStats) {
      // create a query object that honors the layer settings
      const currentDate = new Date();

      // Calculate date and time 24 hours ago
      const twentyFourHoursAgo = new Date(currentDate - 24 * 60 * 60 * 1000);
      console.log(twentyFourHoursAgo.toISOString());

      let query = HPSMTickets.createQuery();
      query.where = `sd_open_time >= '${twentyFourHoursAgo.toISOString()}'`;
      query.outStatistics = [
        {
          statisticType: "count",
          onStatisticField: "*",
          outStatisticFieldName: "count"
        }
      ];
      query.groupByFieldsForStatistics = [groupStats];
      query.orderByFields = [groupStats];
      let result = await HPSMTickets.queryFeatures(query);
      return result;
    }
    async function runHPSM(where, groupStats) {
      // create a query object that honors the layer settings
      // let query = HPSMTickets.createQuery();
      const currentDate = new Date();

      // Calculate date and time 24 hours ago
      const twentyFourHoursAgo = new Date(currentDate - 24 * 60 * 60 * 1000);
      console.log(twentyFourHoursAgo.toISOString());
      // AND cgi = 'BAG0400'
      // if (cgi) {
      //   query.where = `Creation_Date_Time >= '${twentyFourHoursAgo.toISOString()}' AND cgi = '${cgi}'`;
      // } else {
      //   query.where = `Creation_Date_Time >= '${twentyFourHoursAgo.toISOString()}'`;
      // }
      // query.outStatistics = [
      //   {
      //     statisticType: "count",
      //     onStatisticField: "*",
      //     outStatisticFieldName: "count"
      //   }
      // ];
      // query.groupByFieldsForStatistics = [groupStats];
      // query.orderByFields = [groupStats];


      // let result = await RFIsFC.queryFeatures(query);

      // const top1Subcategories = result.features.slice(0, 10)
      // console.log("top1Subcategories", top1Subcategories);

      //======================================================= by top 10 records ===================================

      const queryParams = {
        where: `sd_open_time >= '${twentyFourHoursAgo.toISOString()}'`, // Specify your query parameters
        outFields: '*', // Specify the fields you want to retrieve
        returnGeometry: true,
        orderByFields: "sd_open_time DESC",
        // resultRecordCount: 1,
      };
      let resultQuery = await HPSMTickets.queryFeatures(queryParams);
      const top10features = resultQuery.features.slice(0, 10)

      const subcategoryCounts = {};
      top10features.forEach(function (feature) {
        const subcategory = feature.attributes[groupStats]; // Assuming your subcategory field is 'Subcategory'
        if (subcategory in subcategoryCounts) {
          subcategoryCounts[subcategory]++;
        } else {
          subcategoryCounts[subcategory] = 1;
        }
      });

      // 4. Sort subcategories by ticket count
      const sortedSubcategories = Object.keys(subcategoryCounts).sort(function (a, b) {
        return subcategoryCounts[b] - subcategoryCounts[a];
      });

      const top10Subcategories = sortedSubcategories.slice(0, 10);

      const subcategoryCounts2 = {};

      top10Subcategories.forEach(function (feature) {

        subcategoryCounts2[feature] = subcategoryCounts[feature]

      })

      return subcategoryCounts2;
    }
    async function runRFIQuery(cgi, groupStats) {
      // create a query object that honors the layer settings
      let query = RFIsFC.createQuery();
      const currentDate = new Date();

      // Calculate date and time 24 hours ago
      const twentyFourHoursAgo = new Date(currentDate - 24 * 60 * 60 * 1000);
      console.log(twentyFourHoursAgo.toISOString());
      // AND cgi = 'BAG0400'
      if (cgi) {
        query.where = `Creation_Date_Time >= '${twentyFourHoursAgo.toISOString()}' AND cgi = '${cgi}'`;
      } else {
        query.where = `Creation_Date_Time >= '${twentyFourHoursAgo.toISOString()}'`;
      }
      query.outStatistics = [
        {
          statisticType: "count",
          onStatisticField: "*",
          outStatisticFieldName: "count"
        }
      ];
      query.groupByFieldsForStatistics = [groupStats];
      query.orderByFields = [groupStats];


      let result = await RFIsFC.queryFeatures(query);

      const top1Subcategories = result.features.slice(0, 10)
      console.log("top1Subcategories", top1Subcategories);

      //======================================================= by top 10 records ===================================

      const queryParams = {
        where: cgi ? `Creation_Date_Time >= '${twentyFourHoursAgo.toISOString()}' AND cgi = '${cgi}'` : `Creation_Date_Time >= '${twentyFourHoursAgo.toISOString()}'`, // Specify your query parameters
        outFields: '*', // Specify the fields you want to retrieve
        returnGeometry: true,
        orderByFields: "Creation_Date_Time DESC",
        // resultRecordCount: 1,
      };
      let resultQuery = await RFIsFC.queryFeatures(queryParams);
      const top10features = resultQuery.features.slice(0, 10)

      const subcategoryCounts = {};
      top10features.forEach(function (feature) {
        const subcategory = feature.attributes[groupStats]; // Assuming your subcategory field is 'Subcategory'
        if (subcategory in subcategoryCounts) {
          subcategoryCounts[subcategory]++;
        } else {
          subcategoryCounts[subcategory] = 1;
        }
      });

      // 4. Sort subcategories by ticket count
      const sortedSubcategories = Object.keys(subcategoryCounts).sort(function (a, b) {
        return subcategoryCounts[b] - subcategoryCounts[a];
      });

      const top10Subcategories = sortedSubcategories.slice(0, 10);

      const subcategoryCounts2 = {};

      top10Subcategories.forEach(function (feature) {

        subcategoryCounts2[feature] = subcategoryCounts[feature]

      })

      return subcategoryCounts2;
    }

    async function runCCTicketsQuery(cgi, groupStats) {
      // create a query object that honors the layer settings
      let query = CCTicketsFCExportFeatures.createQuery();
      const currentDate = new Date();

      // Calculate date and time 24 hours ago
      const twentyFourHoursAgo = new Date(currentDate - 24 * 60 * 60 * 1000);
      console.log(twentyFourHoursAgo.toISOString());
      // AND cgi = 'BAG0400'
      if (cgi) {
        query.where = `problem_time >= '${twentyFourHoursAgo.toISOString()}' AND cgi = '${cgi}'`;
      } else {
        query.where = `problem_time >= '${twentyFourHoursAgo.toISOString()}'`;
      }
      query.outStatistics = [
        {
          statisticType: "count",
          onStatisticField: "*",
          outStatisticFieldName: "count"
        }
      ];
      query.groupByFieldsForStatistics = [groupStats];
      query.orderByFields = [groupStats];

      let result = await CCTicketsFCExportFeatures.queryFeatures(query);

      const top1Subcategories = result.features.slice(0, 10)

      console.log("top1Subcategories", top1Subcategories);

      //======================================================= by top 10 records ===================================

      const queryParams = {
        where: cgi ? `problem_time >= '${twentyFourHoursAgo.toISOString()}' AND cgi = '${cgi}'` : `sd_open_time >= '${twentyFourHoursAgo.toISOString()}'`, // Specify your query parameters
        outFields: '*', // Specify the fields you want to retrieve
        returnGeometry: true,
        orderByFields: "problem_time DESC",
        // resultRecordCount: 1,
      };
      let resultQuery = await CCTicketsFCExportFeatures.queryFeatures(queryParams);
      const top10features = resultQuery.features.slice(0, 10)

      const subcategoryCounts = {};
      top10features.forEach(function (feature) {
        const subcategory = feature.attributes[groupStats]; // Assuming your subcategory field is 'Subcategory'
        if (subcategory in subcategoryCounts) {
          subcategoryCounts[subcategory]++;
        } else {
          subcategoryCounts[subcategory] = 1;
        }
      });

      // 4. Sort subcategories by ticket count
      const sortedSubcategories = Object.keys(subcategoryCounts).sort(function (a, b) {
        return subcategoryCounts[b] - subcategoryCounts[a];
      });

      const top10Subcategories = sortedSubcategories.slice(0, 10);

      const subcategoryCounts2 = {};

      top10Subcategories.forEach(function (feature) {

        subcategoryCounts2[feature] = subcategoryCounts[feature]

      })

      return subcategoryCounts2;

    }
    

    // Keeps track of a selected bar on monthly or week day chart
    // We use this info to toggle the clicked bar color
    let previouslySelectedBarIndex = null;

    // this function is called when user hover the mouse over Tickets charts.
    // Tickets layer view feature effect will be updated to highlight features
    // that fall within the selected time, week day or month
    async function applyFilterToTicketsData(event, chart) {
      const activePoints = chart.getElementsAtEvent(event);
      // user did not click on a bar. stop here.
      console.log("event", event);
      console.log("chart", chart);
      console.log(activePoints);
      if (activePoints.length == 0) {
        return;
      }
      const chartData = activePoints[0]["_chart"].config.data;
      const idx = activePoints[0]["_index"];

      // There is a selected bar already. Clear up the previous selection before applying a new change
      if (previouslySelectedBarIndex >= 0) {
        // change the bar color back to blue
        if (event.target.id != "chart-subcategory") {
          // console.log('in',event.target.id);

          // changeBarColor(chart, previouslySelectedBarIndex, "#007AC2");
        }
        // clear the feature effect and reset the previous index
        if (previouslySelectedBarIndex === idx) {
          previouslySelectedBarIndex = null;
          // layerViewHPSM.featureEffect = undefined;
          // layerCCTicketsView.featureEffect = undefined;

          if (dayDistributionChart) {
            dayDistributionChart.data.datasets[0].data = [];
            dayDistributionChart.update();
            dayChartBreakDownBlock.heading = "Click on the graph bar to see hourly chart";
          }
          return;
        }
      }

      // feature effect will be applied based on the chart bar user clicked on
      if (activePoints[0]) {
        const label = chartData.labels[idx];

        if (event.target.id != "chart-subcategory") {
          // console.log('in if',event.target.id);
          // changeBarColor(chart, idx, "red");
        }
        previouslySelectedBarIndex = idx;
        let where;
        // apply effect to Tickets happened during the selected hour
        console.log(event.target.id);
        if (event.target.id == "chart-dayCanvas") {
          const queryValue = label;
          where = `extract(hour from sd_open_time) = ${queryValue}`;
          // console.log(where);
        } else if (event.target.id == "chart-monthCanvas") {

          // apply effect to Tickets happened during the selected month
          const queryValue = monthLabels.indexOf(label) + 1;
          where = `extract(month from sd_open_time) = ${queryValue}`;
          const title = "Tickets by days in " + label;
          // dayDistributionStats(where, "extract(day from sd_open_time)", title);
        } else if (event.target.id == "chart-SDStatusCanvas") {
          // apply effect to Tickets happened during the selected month
          const queryValue = label;
          where = `sd_status = '${queryValue}'`;
        } else if (event.target.id == "chart-subcategoryCanvas") {
          // apply effect to Tickets happened during the selected month
          const queryValue = label;
          where = `subcategory = '${queryValue}'`;
        } else if (event.target.id == "chart-weekCanvas") {
          // apply effect to Tickets happened during the selected week day
          const queryValue = weekLabels.indexOf(label) + 1;
          where = `sd_open_time = ${queryValue}`;
          where = `DAY_WEEK = ${queryValue}`;
          const title = "Tickets by hours on " + label;
          // dayDistributionStats(where, "extract(hour from sd_open_time)", title);
        }
        // layerViewHPSM.featureEffect = {
        //   filter: {
        //     where
        //   },
        //   excludedEffect: "blur(2px) opacity(0) grayscale(0.2)"
        // };
        // layerCCTicketsView.featureEffect = {
        //   filter: {
        //     where
        //   },
        //   excludedEffect: "blur(2px) opacity(0) grayscale(0.2)"
        // };
      }
    }

    async function dayDistributionStats(where, groupStats, label) {
      const result = await runQuery(where, groupStats);
      let chartData = [], chartLabels = [];

      for (let feature of result.features) {
        chartData.push(feature.attributes["count"]);
        chartLabels.push(feature.attributes["EXPR_1"]);
      }

      if (dayChartBreakDownBlock.style.display === "none") {
        dayChartBreakDownBlock.style.display = "block";
      }

      dayChartBreakDownBlock.heading = label;
      dayDistributionChart.data.datasets[0].data = chartData;
      dayDistributionChart.data.labels = chartLabels;

      const backgroundColors = Array(chartData.length).fill("#007AC2");
      dayDistributionChart.data.datasets[0].backgroundColor = backgroundColors;
      dayDistributionChart.update();
    }

    // called from applyFilterToTicketsData function to update the clicked bar color
    function changeBarColor(chart, index, color) {
      chart.data.datasets[0].backgroundColor[index] = color;
      chart.update();
    }
    //=============================== update sunday ==========================
    // UI controls visible in the upper right panel
    let activeGraph = "day";
    const chartChoiceControl = document.getElementById("type-chips");
    // const chartBlock = document.getElementById("chart-block");
    const chartDay = document.getElementById("chart-day");
    const chartWeek = document.getElementById("chart-week");
    const chartMonth = document.getElementById("chart-month");
    const dayChartBreakDownBlock = document.getElementById("chart-day-distribution");

    // Show the corresponding chart when user clicks one of the three buttons
    chartChoiceControl?.addEventListener("calciteChipGroupSelect", (event) => {
      // clear feature effect on the layer view and clicked bar chart
      for (let chart of charts) {
        // changeBarColor(chart, previouslySelectedBarIndex, "#007AC2");
      }
      // layerCCTicketsView.featureEffect = undefined;
      // layerViewHPSM.featureEffect = undefined;
      previouslySelectedBarIndex = null;
      // dayChartBreakDownBlock.style.display = "none";
      chartDay.style.display = "none";
      chartWeek.style.display = "none";
      chartMonth.style.display = "none";
      switch (event.target.selectedItems[0].value) {
        case "day":
          // chartBlock.heading = "Total Tickets by time of day";
          chartDay.style.display = "block";
          break;
        case "week":
          // chartBlock.heading = "Total Tickets by day of week";
          chartWeek.style.display = "block";
          break;
        case "month":
          // chartBlock.heading = "Total Tickets by month";
          chartMonth.style.display = "block";
        default:
      }
    }
    );

    // this function is called when the app loads. It creates three charts showing
    // total Tickets by time of day, by day of the week and months

    function updatePieChart(canvas, data, labels, remove, max) {
      const canvasElement = document.getElementById(canvas);
      const child = document.getElementById(canvas + 'Canvas')
      if (child) {
        canvasElement.removeChild(child);
      }
      const canvas2 = document.createElement("canvas")
      canvas2.classList.add = 'canvas'
      canvas2.id = canvas + 'Canvas'
      canvas2.width = '400'
      canvas2.height = '300'
      canvasElement.appendChild(canvas2)
      // Get the canvas element and render the chart in it
      let chart = new Chart(canvas2.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              backgroundColor: [
                "#9e549c",
                "#f789d8",
                "#149dcf",
                "#ed5050",
                "#ffde3e",
                "#a6c736",
                "#b7804a",
                "#fc9220",
                "#9e9e9e"
              ],
              data: data
            }
          ]
        },
        options: {
          responsive: false,
          cutoutPercentage: 0,
          legend: {
            position: "bottom"
          },
          title: {
            display: true,
            text: ""
          }
        },
        size: 50
      });
      if (!remove) {
        charts.push(chart);
        // add mouse-move event listener on the charts so that we can display features
        // corresponding to the selected by on the chart
        canvas2.addEventListener("click", async () => {
          const data = await applyFilterToTicketsData(event, chart);
        });
      }

      return chart;
    }

    function updateChart(canvas, data, labels, remove, max) {

      const backgroundColors = Array(data.length).fill("#007AC2");
      const canvasElement = document.getElementById(canvas);
      const child = document.getElementById(canvas + 'Canvas')
      if (child) {
        canvasElement.removeChild(child);
      }
      const canvas2 = document.createElement("canvas")
      canvas2.classList.add = 'canvas'
      canvas2.id = canvas + 'Canvas'
      canvas2.width = '400'
      canvas2.height = '270'
      canvasElement.appendChild(canvas2)
      // Get the canvas element and render the chart in it
      let chart = new Chart(canvas2.getContext("2d"), {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              backgroundColor: backgroundColors,
              data: data
            }
          ]
        },
        options: {
          responsive: false,
          legend: {
            display: false
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: max
                }
              }
            ]
          },
          tooltips: {
            displayColors: false,
            callbacks: {
              label: (tooltipItem, data) => {
                const total =
                  data.datasets[tooltipItem.datasetIndex].data[
                  tooltipItem.index
                  ];
                return (
                  data.labels[tooltipItem.index] +
                  " - Total Tickets: " +
                  total
                );
              }
            }
          }
        }
      });
      if (!remove) {
        charts.push(chart);
        // add mouse-move event listener on the charts so that we can display features
        // corresponding to the selected by on the chart
        canvas2.addEventListener("click", async () => {
          const data = await applyFilterToTicketsData(event, chart);
        });
      }

      return chart;
    }


    // =========================================================== tables ========================================

    // Create the feature table
    const featureTableSites = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: sitesFinal,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        }
      },

      container: document.getElementById("tableDiv-Sites")
    });

    const featureTableHPSMTickets = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: HPSMTickets,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        }
      },
      container: document.getElementById("tableDiv-HPSMTickets")
    });

    const featureTableMaintenanceSiteOperation = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: featureLayerMaintenanceSiteOperation,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: false
        }
      },

      container: document.getElementById("tableDiv-MaintenanceSiteOperation")
    });

    const featureTableOutagesData = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: featureLayerOutagesData,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: false
        }
      },

      container: document.getElementById("tableDiv-OutagesData")
    });

    // const featureTableNetworkCoverage = new FeatureTable({
    //   view: view, // Required for feature highlight to work
    //   layer: NetworkCoverage,
    //   visibleElements: {
    //     // Autocast to VisibleElements
    //     menuItems: {
    //       clearSelection: true,

    //       refreshData: true,
    //       toggleColumns: true,
    //       selectedRecordsShowAllToggle: true,
    //       selectedRecordsShowSelectedToggle: true,
    //       zoomToSelection: true
    //     }
    //   },

    //   container: document.getElementById("tableDiv-NetworkCoverage")
    // });

    const featureTableRFIsFC = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: RFIsFC,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        }
      },
        tableTemplate: {
           // Autocast to TableTemplate
           columnTemplates: [
             // Takes an array of FieldColumnTemplate and GroupColumnTemplate
         
              {
                type: "OBJECTID",
                fieldName: "OBJECTID",
                label: "OBJECTID"
              },
              {
                type: "field",
                fieldName: "Creation_Date_Time",
                label: "Creation_Date_Time",
                direction: "desc"
              }
              ,
              {
                type: "field",
                fieldName: "Interaction_ID",
                label: "Interaction_ID"
              },
              {
                type: "field",
                fieldName: "Category",
                label: "Category"
              }
              ,
              {
                type: "field",
                fieldName: "Affected_Service",
                label: "Affected_Service"
              }
              ,
              {
                type: "field",
                fieldName: "User_ID",
                label: "User_ID"
              }
              ,
              {
                type: "field",
                fieldName: "User_Name",
                label: "User_Name"
              }
              ,
              {
                type: "field",
                fieldName: "User_Location",
                label: "User_Location"
              }
              ,
          
              {
                type: "field",
                fieldName: "Balance",
                label: "Balance"
              }
              ,
              {
                type: "field",
                fieldName: "Customer_Plan",
                label: "Customer_Plan"
              }
              ,
              {
                type: "field",
                fieldName: "Customer_Segment",
                label: "Customer_Segment"
              }
              ,
              {
                type: "field",
                fieldName: "Ticket_Status",
                label: "Ticket_Status"
              }
              ,
              {
                type: "field",
                fieldName: "Service_Recipient_MSISDN",
                label: "Service_Recipient_MSISDN"
              }
              ,
              {
                type: "field",
                fieldName: "Contact_MSISDN",
                label: "Contact_MSISDN"
              }
              ,
              {
                type: "field",
                fieldName: "Approval_Status",
                label: "Approval_Status"
              }
              ,
              {
                type: "field",
                fieldName: "Closure_Code",
                label: "Closure_Code"
              }
              ,
              {
                type: "field",
                fieldName: "PRODUCT_TYPE",
                label: "PRODUCT_TYPE"
              }
              ,
              {
                type: "field",
                fieldName: "CMC",
                label: "CMC"
              }
              ,
              {
                type: "field",
                fieldName: "CMC_Waiting",
                label: "CMC_Waiting"
              }
              ,
              {
                type: "field",
                fieldName: "ASIA_CMC_ID",
                label: "ASIA_CMC_ID"
              }
              ,
              {
                type: "field",
                fieldName: "SUBCATEGORY",
                label: "SUBCATEGORY"
              }
              ,
              {
                type: "field",
                fieldName: "RATE_PLAN",
                label: "RATE_PLAN"
              }
              ,
              {
                type: "field",
                fieldName: "AUTO_GOVERNORATE",
                label: "AUTO_GOVERNORATE"
              }
              ,
              {
                type: "field",
                fieldName: "cgi",
                label: "cgi"
              }
              ,
              {
                type: "GlobalID",
                fieldName: "GlobalID",
                label: "GlobalID"
              }
           ]
         },

      container: document.getElementById("tableDiv-RFIsFC")
    });

    const featureTableCCTickets = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: CCTicketsFCExportFeatures,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        }
      },
      tableTemplate: {
        // Autocast to TableTemplate
        columnTemplates: [
          // Takes an array of FieldColumnTemplate and GroupColumnTemplate
      
           {
             type: "OBJECTID",
             fieldName: "OBJECTID",
             label: "OBJECTID"
           }
           ,
           {
             type: "field",
             fieldName: "problem_time",
             label: "problem_time",
             direction: "desc"
           }
           ,
           {
             type: "field",
             fieldName: "im_id",
             label: "IM ID"
           },
           {
             type: "field",
             fieldName: "sd_id",
             label: "SD ID"
           }
           ,
           {
             type: "field",
             fieldName: "im_group",
             label: "IM Group"
           }
           ,
           {
             type: "field",
             fieldName: "sd_open_time",
             label: "SD OPEN_TIME"
           }
           ,
           {
             type: "field",
             fieldName: "sd_opened_by",
             label: "SD opened By"
           }
           ,
           {
             type: "field",
             fieldName: "sd",
             label: "SD"
           }
           ,
           {
             type: "field",
             fieldName: "im_opened_by",
             label: "IM OPENED_BY",
        
           }
           ,
           {
             type: "field",
             fieldName: "sd_status",
             label: "SD Status"
           }
           ,
           {
             type: "field",
             fieldName: "im__status",
             label: "IM _STATUS"
           }
           ,
           {
             type: "field",
             fieldName: "im_open_time",
             label: "IM OPEN_TIME"
           }
           ,
           {
             type: "field",
             fieldName: "area",
             label: "area"
           }
           ,
           {
             type: "field",
             fieldName: "subcategory",
             label: "SUBCATEGORY"
           }
           ,
           {
             type: "field",
             fieldName: "sd_close_time",
             label: "SD CLOSE_TIME"
           }
           ,
           {
             type: "field",
             fieldName: "sd_resolution_time",
             label: "SD RESOLUTION_TIME"
           }
           ,
           {
             type: "field",
             fieldName: "cc_slt",
             label: "CC_SLT"
           }
           ,
           {
             type: "field",
             fieldName: "cemu_ola_status",
             label: "CEMU OLA Status"
           }
           ,
           {
             type: "field",
             fieldName: "general_outage",
             label: "GENERAL_OUTAGE"
           }
           ,
           {
             type: "field",
             fieldName: "sla_status",
             label: "SLA_status"
           }
           ,
           {
             type: "field",
             fieldName: "affected_service",
             label: "Affected Service"
           }
           ,
           {
             type: "field",
             fieldName: "gouvernorate",
             label: "GOUVERNORATE"
           }
           ,
           {
             type: "field",
             fieldName: "resolution",
             label: "RESOLUTION"
           }
           ,
           {
             type: "field",
             fieldName: "asia_bscs_rate_plan",
             label: "ASIA_BSCS_RATE_PLAN"
           }
           ,
           {
             type: "field",
             fieldName: "asia_bscs_balance",
             label: "ASIA_BSCS_BALANCE"
           }
           ,
           {
             type: "field",
             fieldName: "resolution_code",
             label: "RESOLUTION_CODE"
           }
           ,
           {
             type: "field",
             fieldName: "category",
             label: "CATEGORY"
           }
           ,
           {
             type: "field",
             fieldName: "description",
             label: "DESCRIPTION"
           }
           ,
           {
             type: "field",
             fieldName: "cemu_comment",
             label: "CEMU Comment"
           }
           ,
           {
             type: "field",
             fieldName: "escalate_ticket",
             label: "Escalate Ticket"
           }
           ,
           {
             type: "field",
             fieldName: "contact_msisdn",
             label: "CONTACT_MSISDN"
           }
           ,
           {
             type: "field",
             fieldName: "cell_id",
             label: "CELL_ID"
           }
           ,
           {
             type: "field",
             fieldName: "msisdn",
             label: "MSISDN"
           }
           ,
           {
             type: "field",
             fieldName: "cell_name",
             label: "CELL_NAME"
           }
           ,
           {
             type: "field",
             fieldName: "siteid",
             label: "SITEID"
           }
           ,
           {
             type: "field",
             fieldName: "customer_segment",
             label: "CUSTOMER_SEGMENT"
           }
           ,
           {
             type: "field",
             fieldName: "sitename",
             label: "SITENAME"
           }
           ,
           {
             type: "field",
             fieldName: "cmc",
             label: "CMC"
           }
           ,
           {
             type: "field",
             fieldName: "reopened",
             label: "REOPENED"
           }
           ,
           {
             type: "field",
             fieldName: "cmc_waiting",
             label: "CMC Waiting"
           }
           ,
           {
             type: "field",
             fieldName: "cmc_id",
             label: "CMC_ID"
           }
           ,
           {
             type: "field",
             fieldName: "closed_by_id",
             label: "CLOSED BY ID"
           }
           ,
           {
             type: "field",
             fieldName: "region",
             label: "Region"
           }
           ,
           {
             type: "field",
             fieldName: "resolved_by",
             label: "RESOLVED_BY"
           }
           ,
           {
             type: "field",
             fieldName: "expected_resolution_date",
             label: "EXPECTED RESOLUTION DATE"
           }
           ,
           {
             type: "field",
             fieldName: "auto_governorate",
             label: "AUTO-GOVERNORATE"
           }
           ,
           {
             type: "field",
             fieldName: "channel",
             label: "CHANNEL"
           }
           ,
           {
             type: "field",
             fieldName: "phone_number",
             label: "Phone number"
           }
           ,
           {
             type: "field",
             fieldName: "cgi",
             label: "cgi"
           }
         
           ,
           {
             type: "GlobalID",
             fieldName: "GlobalID",
             label: "GlobalID"
           }
        ]
      },

      container: document.getElementById("tableDiv-CCTicketsFC")
    });

    const featureTableJammerSites = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: Cell_Site_Data_Jammer_Sites,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        }
      },

      container: document.getElementById("tableDiv-JammerSites")
    });

    const featureTableInterference = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: featureLayerInterference,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: false
        }
      },

      container: document.getElementById("tableDiv-Interference")
    });

    const featureTableNMSIncident = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: featureLayerNMSIncident,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: false
        }
      },

      container: document.getElementById("tableDiv-NMSIncident")
    });

    const featureTableCells = new FeatureTable({
      view: view, // Required for feature highlight to work
      layer: Cells,
      visibleElements: {
        // Autocast to VisibleElements
        menuItems: {
          clearSelection: true,
          refreshData: true,
          toggleColumns: true,
          selectedRecordsShowAllToggle: true,
          selectedRecordsShowSelectedToggle: true,
          zoomToSelection: true
        }
      },

      container: document.getElementById("tableDiv-Cells")
    });

    // Listen for when the view is stationary.
    // If true, set the table to display only the attributes
    // for the features falling within this extent.

    reactiveUtils.when(
      () => view.stationary,
      () => {
        // Filter out and show only the visible features in the feature table.
        featureTableSites.filterGeometry = view.extent;
        featureTableHPSMTickets.filterGeometry = view.extent;
        // featureTableNetworkCoverage.filterGeometry = view.extent;
        featureTableRFIsFC.filterGeometry = view.extent;
        featureTableCCTickets.filterGeometry = view.extent;
        featureTableJammerSites.filterGeometry = view.extent;
        featureTableCells.filterGeometry = view.extent;
      },
      {
        initial: true
      }
    );

    // Listen for the view's click event and access the associated graphic.

    view.on("immediate-click", async (event) => {
      const response = await view.hitTest(event);
      handles.removeAll();
      featureTableHPSMTickets.highlightIds.removeAll();
      featureTableSites.highlightIds.removeAll();
      // featureTableNetworkCoverage.highlightIds.removeAll();
      featureTableRFIsFC.highlightIds.removeAll();
      featureTableCCTickets.highlightIds.removeAll();
      featureTableJammerSites.highlightIds.removeAll();
      featureTableCells.highlightIds.removeAll();
      featureTableOutagesData.highlightIds.removeAll();
      gitTotalAllRFIAndCCTickets()
      ChartRFIA(0, "Affected_Service", "chart-RFIAffected");
      ChartRFIA(0, "SUBCATEGORY", "chart-RFISubcategory");
      ChartRFIA(0, "PRODUCT_TYPE", "chart-RFIPRODUCTTYPE");
      ChartCCTickets(0, "affected_service", "chart-CCTicketsAffected");
      ChartCCTickets(0, "subcategory", "chart-CCTicketsSubcategory");
      ChartCCTickets(0, "area", "chart-CCTicketsArea");
      candidate = response.results.find((result) => {
        if (result.graphic.layer === sitesFinal) {
          return result.graphic &&
            result.graphic.layer &&
            result.graphic.layer === sitesFinal
        }
        // else if (result.graphic.layer === HPSMTickets) {
        //   return result.graphic &&
        //     result.graphic.layer &&
        //     result.graphic.layer === HPSMTickets

        // }
        // else if (result.graphic.layer === RFIsFC) {
        //   return result.graphic &&
        //     result.graphic.layer &&
        //     result.graphic.layer === RFIsFC

        // }
        else if (result.graphic.layer === Cell_Site_Data_Jammer_Sites) {
          return result.graphic &&
            result.graphic.layer &&
            result.graphic.layer === Cell_Site_Data_Jammer_Sites

        }
        // else if (result.graphic.layer === NetworkCoverage) {
        //   return result.graphic &&
        //     result.graphic.layer &&
        //     result.graphic.layer === NetworkCoverage

        // }
        // else if (result.graphic.layer === CCTicketsFCExportFeatures) {
        //   return result.graphic &&
        //     result.graphic.layer &&
        //     result.graphic.layer === CCTicketsFCExportFeatures

        // }
        else if (result.graphic.layer === Cells) {
          return result.graphic &&
            result.graphic.layer &&
            result.graphic.layer === Cells

        }
        // else if (result.graphic.layer === FiberIssues_WFL1) {
        //   return result.graphic &&
        //     result.graphic.layer &&
        //     result.graphic.layer === FiberIssues_WFL1

        // }

        // else if (result.graphic.layer === CoveragebyRSRP_85_CoveragebyRSRP_44_85) {
        //   return result.graphic &&
        //     result.graphic.layer &&
        //     result.graphic.layer === CoveragebyRSRP_85_CoveragebyRSRP_44_85

        // }
        // else if (result.graphic.layer === NetworkArea) {
        //   return result.graphic &&
        //     result.graphic.layer &&
        //     result.graphic.layer === NetworkArea

        // }
        else if (result.graphic.layer === Governerate) {
          return result.graphic &&
            result.graphic.layer &&
            result.graphic.layer === Governerate

        }

      });

      // Add the graphic's ObjectId into the collection of highlightIds.
      // Check that the featureTableSites.highlightIds collection
      // does not include an already highlighted feature.
      if (candidate) {
        console.log("candidate.graphic : ", candidate.layer.title);
        const objectId = candidate.graphic.getObjectId();
        if (candidate.layer.title == sitesFinalTitle) {

          if (featureTableSites.highlightIds.includes(objectId)) {
            // Remove feature from current selection if feature
            // is already added to highlightIds collection
            featureTableSites.highlightIds.remove(objectId);
          } else {
            featureTableSites.highlightIds.add(objectId);
            // Add this feature to the featureTableSites highlightIds collection
          }
        }
        // else if (candidate.layer.title == HPSMTicketsTitle) {


        //   if (featureTableHPSMTickets.highlightIds.includes(objectId)) {
        //     // Remove feature from current selection if feature
        //     // is already added to highlightIds collection
        //     featureTableHPSMTickets.highlightIds.remove(objectId);
        //   } else {
            
        //     featureTableHPSMTickets.highlightIds.add(objectId);
        //   }
        // }
        else if (candidate.layer.title == CellsTitle) {


          if (featureTableCells.highlightIds.includes(objectId)) {
            // Remove feature from current selection if feature
            // is already added to highlightIds collection
            featureTableCells.highlightIds.remove(objectId);
          } else {
            
            featureTableCells.highlightIds.add(objectId);
          }
        }
        // else if (candidate.layer.title == NetworkCoverageTitle) {


        //   if (featureTableNetworkCoverage.highlightIds.includes(objectId)) {
        //     // Remove feature from current selection if feature
        //     // is already added to highlightIds collection
        //     featureTableNetworkCoverage.highlightIds.remove(objectId);
        //   } else {
        //     
        //     featureTableNetworkCoverage.highlightIds.add(objectId);
        //   }
        // }
        // else if (candidate.layer.title == RFIsFCTitle) {


        //   if (featureTableRFIsFC.highlightIds.includes(objectId)) {
        //     // Remove feature from current selection if feature
        //     // is already added to highlightIds collection
        //     featureTableRFIsFC.highlightIds.remove(objectId);
        //   } else {
            
        //     featureTableRFIsFC.highlightIds.add(objectId);
        //   }
        // }
        // else if (candidate.layer.title == CCTicketsFCExportFeaturesTitle) {


        //   if (featureTableCCTickets.highlightIds.includes(objectId)) {
        //     // Remove feature from current selection if feature
        //     // is already added to highlightIds collection
        //     featureTableCCTickets.highlightIds.remove(objectId);
        //   } else {
            
        //     featureTableCCTickets.highlightIds.add(objectId);
        //   }
        // }
        else if (candidate.layer.title == Cell_Site_Data_Jammer_SitesTitle) {


          if (featureTableJammerSites.highlightIds.includes(objectId)) {
            // Remove feature from current selection if feature
            // is already added to highlightIds collection
            featureTableJammerSites.highlightIds.remove(objectId);
          } else {
            
            featureTableJammerSites.highlightIds.add(objectId);
          }
        }
        else if (candidate.layer.title == GovernerateTitle) {
          if (candidate.graphic.layer.type === "feature") {
            layerViews.forEach((layerView) => {
              if (candidate.graphic.layer.title === layerView.layer.title) {
                handles.add(layerView.highlight(candidate.graphic));
              }
            });
          }
        }
        // else if (candidate.layer.title == CoveragebyRSRP_85_CoveragebyRSRP_44_85Title) {
        //   if (candidate.graphic.layer.type === "feature") {
        //     layerViews.forEach((layerView) => {
        //       if (candidate.graphic.layer.title === layerView.layer.title) {
        //         handles.add(layerView.highlight(candidate.graphic));
        //       }
        //     });
        //   }
        // }
        // else if (candidate.layer.title == NetworkAreaTitle) {
        //   if (candidate.graphic.layer.type === "feature") {
        //     layerViews.forEach((layerView) => {
        //       if (candidate.graphic.layer.title === layerView.layer.title) {
        //         handles.add(layerView.highlight(candidate.graphic));
        //       }
        //     });
        //   }
        // }
        // else if (candidate.layer.title == FiberIssues_WFL1Title) {
        //   if (candidate.graphic.layer.type === "feature") {
        //     layerViews.forEach((layerView) => {
        //       if (candidate.graphic.layer.title === layerView.layer.title) {
        //         handles.add(layerView.highlight(candidate.graphic));
        //       }
        //     });
        //   }
        // }
      }
    });

    // Watch the featureTableSites's highlightIds.length property,
    // and get the count of highlighted features within
    // the table.

    const SearchInputOutagesAffectedService = document.getElementById("SearchInputOutagesAffectedService");
    SearchInputOutagesAffectedService.addEventListener("change", async () => {
      const value = SearchInputOutagesAffectedService.value;
      
      // Ensure featureTableOutagesData and featureLayerOutagesData are properly initialized
      try {
        // Clear existing highlights
        featureTableSites.highlightIds.removeAll();
        featureTableOutagesData.highlightIds.removeAll();
    
        const queryParams = {
          where: `service_affected = '${value}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
    
        // Query features
        const result = await featureLayerOutagesData.queryFeatures(queryParams);
        
        // Handle the query result
        result.features.forEach(async(feature) => {
          console.log(feature.attributes.original_event_time);
          const queryParams = {
            where: `site_id = '${feature.attributes.site_id}'`, // Specify your query criteria
            outFields: ["*"] // Specify the fields you want to retrieve
          };
          const result = await sitesFinal.queryFeatures(queryParams);
          result.features.forEach(async(feature) => {
            const objectId = feature.attributes.OBJECTID;
            if (!featureTableSites.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTableSites.highlightIds.add(objectId);
            } 
          })
          
          // if (candidate) {
            const objectId = feature.attributes.OBJECTID; // Access objectId directly from feature.attributes
            if (featureTableOutagesData.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTableOutagesData.highlightIds.remove(objectId);
            } else {
              featureTableOutagesData.highlightIds.add(objectId);
            }
          // }
        });
      } catch (error) {
        console.error("Error querying features:", error);
      }
    });
    const SearchInputOutagesCellID = document.getElementById("SearchInputOutagesCellID");
    SearchInputOutagesCellID.addEventListener("change", async () => {
      const value = SearchInputOutagesCellID.value;
      
      // Ensure featureTableOutagesData and featureLayerOutagesData are properly initialized
      try {
        // Clear existing highlights
        featureTableSites.highlightIds.removeAll();
        featureTableOutagesData.highlightIds.removeAll();
    
        const queryParams = {
          where: `cell_id = '${value}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
    
        // Query features
        const result = await featureLayerOutagesData.queryFeatures(queryParams);
        
        // Handle the query result
        result.features.forEach(async(feature) => {
          console.log(feature.attributes.original_event_time);
          const queryParams = {
            where: `site_id = '${feature.attributes.site_id}'`, // Specify your query criteria
            outFields: ["*"] // Specify the fields you want to retrieve
          };
          const result = await sitesFinal.queryFeatures(queryParams);
          result.features.forEach(async(feature) => {
            const objectId = feature.attributes.OBJECTID;
            if (!featureTableSites.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTableSites.highlightIds.add(objectId);
            } 
          })
          
          // if (candidate) {
            const objectId = feature.attributes.OBJECTID; // Access objectId directly from feature.attributes
            if (featureTableOutagesData.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTableOutagesData.highlightIds.remove(objectId);
            } else {
              featureTableOutagesData.highlightIds.add(objectId);
            }
          // }
        });
      } catch (error) {
        console.error("Error querying features:", error);
      }
    });

    let Sdate; 
    let Edate;

    const SearchInputOutagesOriginalEventTimeStartDate = document.getElementById("SearchInputOutagesOriginalEventTimeStartDate");
    SearchInputOutagesOriginalEventTimeStartDate.addEventListener("change", async () => {
      const value = SearchInputOutagesOriginalEventTimeStartDate.value;
      const currentDate = new Date(value);
      // Get the time zone offset for Cairo, Egypt (GMT+2)
      let offset = 2 * 60 * 60 * 1000; // Convert hours to milliseconds
  
      // Calculate the new time by adding the offset to the current time
      let newTime = currentDate.getTime() + offset;
  
      // Create a new date object with the adjusted time
      let cairoDate = new Date(newTime);
  
      // Format the date as ISO string without milliseconds
      let isoString = currentDate.toISOString().slice(0, 19); // Remove milliseconds and timezone
      Sdate = isoString
      console.log(isoString); // Output the ISO string format in GMT+2 (Cairo, Egypt)
    })

    const SearchInputOutagesOriginalEventTimeEndDate = document.getElementById("SearchInputOutagesOriginalEventTimeEndDate");
    SearchInputOutagesOriginalEventTimeEndDate.addEventListener("change", async () => {
      const value = SearchInputOutagesOriginalEventTimeEndDate.value;
      const currentDate = new Date(value);
      
      // Ensure featureTableOutagesData and featureLayerOutagesData are properly initialized
      try {
        // Clear existing highlights
        featureTableSites.highlightIds.removeAll();
        featureTableOutagesData.highlightIds.removeAll();
    
        // Get the time zone offset for Cairo, Egypt (GMT+2)
        let offset = 2 * 60 * 60 * 1000; // Convert hours to milliseconds
    
        // Calculate the new time by adding the offset to the current time
        let newTime = currentDate.getTime() + offset;
    
        // Create a new date object with the adjusted time
        let cairoDate = new Date(newTime);
    
        // Format the date as ISO string without milliseconds
        let isoString = currentDate.toISOString().slice(0, 19); // Remove milliseconds and timezone
        
        Edate = isoString

        console.log(isoString); // Output the ISO string format in GMT+2 (Cairo, Egypt)

        if ( Sdate && Edate ) {
          
          const queryParams = {
            where: `original_event_time >= '${Sdate}' AND original_event_time <= '${Edate}'`, // Assuming original_event_time is a date field
            outFields: ["*"] // Specify the fields you want to retrieve
          };
        
          // Query features
          const result = await featureLayerOutagesData.queryFeatures(queryParams);
      
          // Handle the query result
          result.features.forEach(async (feature) => {
            const siteId = feature.attributes.site_id;
      
            const siteQueryParams = {
              where: `site_id = '${siteId}'`,
              outFields: ["*"]
            };
      
            const siteResult = await sitesFinal.queryFeatures(siteQueryParams);
      
            siteResult.features.forEach((siteFeature) => {
              const objectId = siteFeature.attributes.OBJECTID;
              if (!featureTableSites.highlightIds.includes(objectId)) {
                featureTableSites.highlightIds.add(objectId);
              }
            });
      
            const objectId = feature.attributes.OBJECTID;
            if (featureTableOutagesData.highlightIds.includes(objectId)) {
              featureTableOutagesData.highlightIds.remove(objectId);
            } else {
              featureTableOutagesData.highlightIds.add(objectId);
            }
          });
        }
      } catch (error) {
        console.error("Error querying features:", error);
      }
    });
    

    
    

    reactiveUtils.watch(
      () => featureTableSites.highlightIds.length,
      (highlightIdsCount) => {
        // Iterate through the filters within the table.
        // If the active filter is "Show selection",
        // changes made to highlightIds (adding/removing)
        // are reflected.

        featureTableSites.viewModel.activeFilters.forEach((filter) => {
          if (filter.type === "selection") {
            selectionIdCount = filter.objectIds.length; // the filtered selection's id count
            // Check that the filter selection count is equal to the
            // highlightIds collection count. If not, update filter selection.
            if (selectionIdCount !== highlightIdsCount) {
              featureTableSites.filterBySelection();
            }
          }
        });
      }
    );
    // reactiveUtils.watch(
    //   () => featureTableNetworkCoverage.highlightIds.length,
    //   (highlightIdsCount) => {
    //     // Iterate through the filters within the table.
    //     // If the active filter is "Show selection",
    //     // changes made to highlightIds (adding/removing)
    //     // are reflected.

    //     featureTableNetworkCoverage.viewModel.activeFilters.forEach((filter) => {
    //       if (filter.type === "selection") {
    //         selectionIdCount = filter.objectIds.length; // the filtered selection's id count
    //         // Check that the filter selection count is equal to the
    //         // highlightIds collection count. If not, update filter selection.
    //         if (selectionIdCount !== highlightIdsCount) {
    //           featureTableNetworkCoverage.filterBySelection();
    //         }
    //       }
    //     });
    //   }
    // );
    reactiveUtils.watch(
      () => featureTableRFIsFC.highlightIds.length,
      (highlightIdsCount) => {
        // Iterate through the filters within the table.
        // If the active filter is "Show selection",
        // changes made to highlightIds (adding/removing)
        // are reflected.

        featureTableRFIsFC.viewModel.activeFilters.forEach((filter) => {
          if (filter.type === "selection") {
            selectionIdCount = filter.objectIds.length; // the filtered selection's id count
            // Check that the filter selection count is equal to the
            // highlightIds collection count. If not, update filter selection.
            if (selectionIdCount !== highlightIdsCount) {
              featureTableRFIsFC.filterBySelection();
            }
          }
        });
      }
    );
    reactiveUtils.watch(
      () => featureTableCCTickets.highlightIds.length,
      (highlightIdsCount) => {
        // Iterate through the filters within the table.
        // If the active filter is "Show selection",
        // changes made to highlightIds (adding/removing)
        // are reflected.

        featureTableCCTickets.viewModel.activeFilters.forEach((filter) => {
          if (filter.type === "selection") {
            selectionIdCount = filter.objectIds.length; // the filtered selection's id count
            // Check that the filter selection count is equal to the
            // highlightIds collection count. If not, update filter selection.
            if (selectionIdCount !== highlightIdsCount) {
              featureTableCCTickets.filterBySelection();
            }
          }
        });
      }
    );
    reactiveUtils.watch(
      () => featureTableJammerSites.highlightIds.length,
      (highlightIdsCount) => {
        // Iterate through the filters within the table.
        // If the active filter is "Show selection",
        // changes made to highlightIds (adding/removing)
        // are reflected.

        featureTableJammerSites.viewModel.activeFilters.forEach((filter) => {
          if (filter.type === "selection") {
            selectionIdCount = filter.objectIds.length; // the filtered selection's id count
            // Check that the filter selection count is equal to the
            // highlightIds collection count. If not, update filter selection.
            if (selectionIdCount !== highlightIdsCount) {
              featureTableJammerSites.filterBySelection();
            }
          }
        });
      }
    );
    reactiveUtils.watch(
      () => featureTableHPSMTickets.highlightIds.length,
      (highlightIdsCount) => {
        // Iterate through the filters within the table.
        // If the active filter is "Show selection",
        // changes made to highlightIds (adding/removing)
        // are reflected.

        featureTableHPSMTickets.viewModel.activeFilters.forEach((filter) => {
          if (filter.type === "selection") {
            selectionIdCount = filter.objectIds.length; // the filtered selection's id count
            // Check that the filter selection count is equal to the
            // highlightIds collection count. If not, update filter selection.
            if (selectionIdCount !== highlightIdsCount) {
              featureTableHPSMTickets.filterBySelection();
            }
          }
        });
      }
    );
    reactiveUtils.watch(
      () => featureTableCells.highlightIds.length,
      (highlightIdsCount) => {
        // Iterate through the filters within the table.
        // If the active filter is "Show selection",
        // changes made to highlightIds (adding/removing)
        // are reflected.

        featureTableCells.viewModel.activeFilters.forEach((filter) => {
          if (filter.type === "selection") {
            selectionIdCount = filter.objectIds.length; // the filtered selection's id count
            // Check that the filter selection count is equal to the
            // highlightIds collection count. If not, update filter selection.
            if (selectionIdCount !== highlightIdsCount) {
              featureTableCells.filterBySelection();
            }
          }
        });
      }
    );




  })();
});