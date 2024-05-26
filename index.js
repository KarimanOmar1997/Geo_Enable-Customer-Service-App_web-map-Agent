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
      const layerBlock = document.createElement("calcite-block");
      layerBlock.id = layer.title;
      layerBlock.heading = layer.title;
      layerBlock.open = true;

      layerBlockArray.push(layerBlock);
      // Create an array of layerViews to be able to highlight selected features.
      if (layer.type === "feature") {
        const layerView = await view.whenLayerView(layer);
        layerViews.push(layerView);
      }
    });

    // Function to update data on the map
    function updateMapData() {
      map.layers.forEach(async (layer) => {
        await layer.load();
        // Assuming "map" is your ArcGIS Map object
        // Assuming "featureLayer" is the layer you want to update
        layer.refresh(); // Refresh the layer
      })
    }

    // Periodically check for updates (e.g., every 5 minutes)
    setInterval(updateMapData, 3000);

    // =========================================================== intial layers ========================================

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

    const IraqTitle = 'Iraq'
    const GovernerateTitle = 'Governerate'
    const CellsTitle = 'Cell'
    const sitesFinalTitle = 'Site'
    const Cell_Site_Data_Jammer_SitesTitle = 'Jammer_Sites'

    const CCTicketsFCExportFeatures = new FeatureLayer({
      url: 'https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Asia_cell_data_v6/FeatureServer/4'
    });
    const RFIsFC = new FeatureLayer({
      url: 'https://services3.arcgis.com/N0l9vjYH8GLn5HZh/arcgis/rest/services/Asia_cell_data_v6/FeatureServer/5'
    });
    const HPSMTickets = new FeatureLayer({
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
      returnGeometryEnabled: true,
      container: document.getElementById("tableDiv-Sites")
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
      returnGeometryEnabled: true,
      container: document.getElementById("tableDiv-Cells")
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
      returnGeometryEnabled: true,
      container: document.getElementById("tableDiv-JammerSites")
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


      container: document.getElementById("tableDiv-CCTicketsFC")
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

    featureTableCells.on("selection-change", (event) => {
   
    });
    featureTableSites.on("selection-change", (event) => {
    });
    featureTableJammerSites.on("selection-change", (event) => {
    });
    featureTableOutagesData.on("selection-change", (event) => {
    });
    featureTableRFIsFC.on("selection-change", (event) => {
    });
    featureTableCCTickets.on("selection-change", (event) => {
    });
    featureTableNMSIncident.on("selection-change", (event) => {
    });

    function tablesButtonsForSpatilData(table, layer, container) {

      const selectionContener = document.createElement('div')
      selectionContener.classList.add('d-flex', 'gap-3')
      document.getElementById(container).appendChild(selectionContener);
      const showSelectionButton = document.createElement('button');
      showSelectionButton.textContent = 'Show Selection';
      showSelectionButton.classList.add('esri-button', 'esri-button--secondary');

      // Add event listener for "Show Selection" button
      showSelectionButton.addEventListener('click', function () {
        // Get the selected features
        table.filterBySelection()
      });

      // Add "Show Selection" button to the table container
      selectionContener.appendChild(showSelectionButton);

      // Create "Show All" button
      const showAllButton = document.createElement('button');
      showAllButton.textContent = 'Show All';
      showAllButton.classList.add('esri-button', 'esri-button--secondary');

      // Add event listener for "Show All" button
      showAllButton.addEventListener('click', function () {
        // Clear any existing selection
        table.clearSelectionFilter()
      });

      // Add "Show All" button to the table container
      selectionContener.appendChild(showAllButton);

      // Create "Zoom To Selection" button
      const zoomToSelectionButton = document.createElement('button');
      zoomToSelectionButton.textContent = 'Zoom To Selection';
      zoomToSelectionButton.classList.add('esri-button', 'esri-button--secondary');

      // Add event listener for Zoom To Selection" button
      zoomToSelectionButton.addEventListener('click', function () {
        // Clear any existing selection
        table.zoomToSelection()
      });

      // Add "Zoom To Selection" button to the table container
      selectionContener.appendChild(zoomToSelectionButton);

      // Create "clear Selection" button
      const clearSelectionButton = document.createElement('button');
      clearSelectionButton.textContent = 'Clear Selection';
      clearSelectionButton.classList.add('esri-button', 'esri-button--secondary');

      // Add event listener for "clear Selection" button
      clearSelectionButton.addEventListener('click', function () {
        // Clear any existing selection
        table.clearSelection()
      });

      // Add "clear Selection" button to the table container
      selectionContener.appendChild(clearSelectionButton);

      async function downloadCSV() {
        const queryParams = {
          where: "1=1", // Query to retrieve all features (you can adjust this according to your needs)
          outFields: ["*"] // Specify the fields you want to include in the result
        };

        // Query features
        const result = await layer.queryFeatures(queryParams);

        // Get all features from the FeatureTable

        const allFeatures = result.features;

        // Extract attributes from each feature
        const csvContent = [];
        csvContent.push(Object.keys(allFeatures[0].attributes).join(',')); // Add headers

        allFeatures.forEach(feature => {
          const values = Object.values(feature.attributes).map(value => {
            // Ensure values are properly formatted (e.g., handle commas within values)
            if (typeof value === 'string') {
              return `"${value.replace(/"/g, '""')}"`;
            } else {
              return value;
            }
          });
          csvContent.push(values.join(','));
        });

        // Convert to CSV string
        const csvString = csvContent.join('\n');

        // Download CSV file
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Create a button to trigger CSV download
      const downloadCSVButton = document.createElement('button');
      downloadCSVButton.textContent = 'Download CSV';
      downloadCSVButton.classList.add('esri-button', 'esri-button--secondary');
      downloadCSVButton.addEventListener('click', downloadCSV);

      // Add the button to the table container
      selectionContener.appendChild(downloadCSVButton);

    }

    function tablesButtonsForTabularData(table, layer, container) {

      const selectionContener = document.createElement('div')
      selectionContener.classList.add('d-flex', 'gap-3')
      document.getElementById(container).appendChild(selectionContener);
      const showSelectionButton = document.createElement('button');
      showSelectionButton.textContent = 'Show Selection';
      showSelectionButton.classList.add('esri-button', 'esri-button--secondary');

      // Add event listener for "Show Selection" button
      showSelectionButton.addEventListener('click', function () {
        // Get the selected features
        table.filterBySelection()
      });

      // Add "Show Selection" button to the table container
      selectionContener.appendChild(showSelectionButton);

      // Create "Show All" button
      const showAllButton = document.createElement('button');
      showAllButton.textContent = 'Show All';
      showAllButton.classList.add('esri-button', 'esri-button--secondary');

      // Add event listener for "Show All" button
      showAllButton.addEventListener('click', function () {
        // Clear any existing selection
        table.clearSelectionFilter()
      });

      // Add "Show All" button to the table container
      selectionContener.appendChild(showAllButton);

      // Create "clear Selection" button
      const clearSelectionButton = document.createElement('button');
      clearSelectionButton.textContent = 'Clear Selection';
      clearSelectionButton.classList.add('esri-button', 'esri-button--secondary');

      // Add event listener for "clear Selection" button
      clearSelectionButton.addEventListener('click', function () {
        // Clear any existing selection
        table.clearSelection()
      });

      // Add "clear Selection" button to the table container
      selectionContener.appendChild(clearSelectionButton);

      async function downloadCSV() {
        const queryParams = {
          where: "1=1", // Query to retrieve all features (you can adjust this according to your needs)
          outFields: ["*"] // Specify the fields you want to include in the result
        };

        // Query features
        const result = await layer.queryFeatures(queryParams);

        // Get all features from the FeatureTable

        const allFeatures = result.features;

        // Extract attributes from each feature
        const csvContent = [];
        csvContent.push(Object.keys(allFeatures[0].attributes).join(',')); // Add headers

        allFeatures.forEach(feature => {
          const values = Object.values(feature.attributes).map(value => {
            // Ensure values are properly formatted (e.g., handle commas within values)
            if (typeof value === 'string') {
              return `"${value.replace(/"/g, '""')}"`;
            } else {
              return value;
            }
          });
          csvContent.push(values.join(','));
        });

        // Convert to CSV string
        const csvString = csvContent.join('\n');

        // Download CSV file
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Create a button to trigger CSV download
      const downloadCSVButton = document.createElement('button');
      downloadCSVButton.textContent = 'Download CSV';
      downloadCSVButton.classList.add('esri-button', 'esri-button--secondary');
      downloadCSVButton.addEventListener('click', downloadCSV);

      // Add the button to the table container
      selectionContener.appendChild(downloadCSVButton);

    }

    tablesButtonsForSpatilData(featureTableSites, sitesFinal, "tableDiv-Sites")
    tablesButtonsForSpatilData(featureTableCells, Cells, "tableDiv-Cells")
    tablesButtonsForSpatilData(featureTableJammerSites, Cell_Site_Data_Jammer_Sites, "tableDiv-JammerSites")
    tablesButtonsForTabularData(featureTableOutagesData, featureLayerOutagesData, "tableDiv-OutagesData")
    tablesButtonsForTabularData(featureTableRFIsFC, RFIsFC, "tableDiv-RFIsFC")
    tablesButtonsForTabularData(featureTableCCTickets, CCTicketsFCExportFeatures, "tableDiv-CCTicketsFC")
    tablesButtonsForTabularData(featureTableNMSIncident, featureLayerNMSIncident, "tableDiv-NMSIncident")

    const loaders = document.getElementsByClassName("loader");
    const buttonaddons = document.getElementsByClassName("button-addon");

    const showLoader = () => {

      Array.from(loaders).forEach((loader) => {
        loader.style.display = "block";
      });

      Array.from(buttonaddons).forEach((buttonaddon) => {
        buttonaddon.style.display = "none";
      });

    };

    const hideLoader = () => {
      Array.from(loaders).forEach((loader) => {
        loader.style.display = "none";
      });

      Array.from(buttonaddons).forEach((buttonaddon) => {
        buttonaddon.style.display = "block";
      });

    };

    
    // Add this action to the popup so it is always available in this view
    const getSitesDetailsAction = {
      title: "sitesDetails",
      id: "sitesDetails-this",
    };
    // Add this action to the popup so it is always available in this view
    const getCellsDetailsAction = {
      title: "cellsDetails",
      id: "cellsDetails-this",
    };

    const sitesTemplate = {
      // autocasts as new PopupTemplate()
      title: "{site_id}",
      content: [{
        // Pass in the fields to display
        type: "fields",
        fieldInfos: [{
          fieldName: "site_id",
          label: "Site ID"
        }
          , {
          fieldName: "ID",
          label: "ID"
        }
          , {
          fieldName: "plan_longitude",
          label: "Plan Longitude"
        }
          , {
          fieldName: "plan_latitude",
          label: "Plan Latitude"
        }
        ]
      }],
      actions: [getSitesDetailsAction]
    };

    const cellsTemplate = {
      // autocasts as new PopupTemplate()
      title: "{CELLID}",
      content: [{
        // Pass in the fields to display
        type: "fields",
        fieldInfos: [{
          fieldName: "UNIQUEID",
          label: "UNIQUEID"
        }
          , {
          fieldName: "SITEID",
          label: "SITEID"
        }
          , {
          fieldName: "CELLID",
          label: "CELLID"
        }
          , {
          fieldName: "SITEX",
          label: "SITEX"
        }
          , {
          fieldName: "SITEY",
          label: "SITEY"
        }
        ]
      }],
      actions: [getCellsDetailsAction]
    };

    sitesFinal.popupTemplate = sitesTemplate
    Cells.popupTemplate = cellsTemplate
    // Execute each time the "Measure Length" is clicked
    async function getSitesDetails(event) {
      console.log('event', event);
      document.getElementById("Data_Container_By_Select").innerHTML = " "
      layerBlockArray.forEach((block) => {
        while (block.lastElementChild) {
          block.removeChild(block.lastElementChild);
        }
      });
      console.log(view.popup);
      // Call fetchFeatures and pass in the click event location.
      const fetchFeaturesResponse = await view.popup.features;
      console.log('fetchFeaturesResponse', fetchFeaturesResponse);
      // Iterate through the returned graphics once the allGraphicsPromise resolves.
      // const graphics = await fetchFeaturesResponse.allGraphicsPromise;
      const graphics = await view.popup.features;
      if (graphics.length > 0) {
        graphics.forEach((graphic) => {
          // For each layer's calcite block, loop through the graphics and add
          // the graphic to a feature widget into that block.
          console.log('graphics', graphics);
          layerBlockArray.forEach((block) => {
            const layerTitle = graphic.layer.title;
            if (block.heading === layerTitle) {
              panel.appendChild(block);
              const featureChild = new Feature({
                container: document.createElement("div"),
                graphic: graphic
              });
              block.appendChild(featureChild.container);
       
              if (block.id == sitesFinalTitle) {

                siteGeomatry = featureChild.graphic.geometry
                getSitesFeatureLayer(featureChild.graphic.attributes.site_id)
                console.log(block);
              }

            }
          });
        });
      }
    }
    async function getCellsDetails(event) {
      console.log('event', event);
      document.getElementById("Data_Container_By_Select").innerHTML = " "
      layerBlockArray.forEach((block) => {
        while (block.lastElementChild) {
          block.removeChild(block.lastElementChild);
        }
      });
      console.log(view.popup);
      // Call fetchFeatures and pass in the click event location.
      const fetchFeaturesResponse = await view.popup.features;
      console.log('fetchFeaturesResponse', fetchFeaturesResponse);
      // Iterate through the returned graphics once the allGraphicsPromise resolves.
      // const graphics = await fetchFeaturesResponse.allGraphicsPromise;
      const graphics = await view.popup.features;
      if (graphics.length > 0) {
        graphics.forEach((graphic) => {
          // For each layer's calcite block, loop through the graphics and add
          // the graphic to a feature widget into that block.
          console.log('graphics', graphics);
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

                // console.log(featureChild.graphic.attributes.site_id);
                getCellsFeatureLayer(featureChild.graphic.attributes.CELLID, featureChild.graphic.attributes.UNIQUEID)
                console.log(block);
              }

            }
          });
        });
      }
    }

    // Event handler that fires each time an action is clicked.
    reactiveUtils.on(
      () => view.popup,
      "trigger-action",
      (event) => {  // Execute the measureThis() function if the measure-this action is clicked
        if (event.action.id === "sitesDetails-this") {
          getSitesDetails(event);
        } else if (event.action.id === "cellsDetails-this") {
          getCellsDetails(event)
        }
      });

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
          field: "ccticket_num",
          stops: [
            { value: 0, color: 'green', label: "0" },
            { value: 2, color: 'orange', label: "2" },
            { value: 5, color: 'red', label: "5" }
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
          field: "outage_num",
          stops: [
            { value: 0, color: 'green', label: "0" },
            { value: 2, color: 'orange', label: "2" },
            { value: 5, color: 'red', label: "5" }
          ]
        }
      ]
    };

    const colors = ["#d92b30", "#3cccb4", "#ffdf3c", "#c27c30", "#f260a1"];

    const commonProperties = {
      type: "simple-fill",
      width: "4px",
      style: "solid",
      outline: {
        color: [0, 0, 0, 1], // Black color with full opacity
        width: 1 // Adjust the width of the outline as needed
      }
    };

    // Symbol for Interstate highways
    const fwySym = {
      type: "simple-fill",
      width: "4px",
      style: "solid",
      outline: {
        color: [255, 165, 0, 1], // Black color with full opacity
        width: 1 // Adjust the width of the outline as needed
      },
      color: [255, 165, 0, 0.20]
    };

    // Symbol for U.S. Highways
    const hwySym = {
      type: "simple-fill",
      width: "4px",
      style: "solid",
      outline: {
        color: [60, 179, 113, 1], // Black color with full opacity
        width: 1 // Adjust the width of the outline as needed
      },
      color: [60, 179, 113, 0.20]
    };

    // Symbol for state highways
    const stateSym = {
      type: "simple-fill",
      width: "4px",
      style: "solid",
      outline: {
        color: [180, 0, 255, 1], // Black color with full opacity
        width: 1 // Adjust the width of the outline as needed
      },
      color: [180, 0, 255, 0.20]
    };

    // Symbol for other major highways
    const otherSym = {
      ...commonProperties,
      color: colors[4]
    };
    const hwyRenderer = {
      type: "unique-value", // autocasts as new UniqueValueRenderer()
      legendOptions: {
        title: "Cells By Technology"
      },
      defaultSymbol: otherSym,
      defaultLabel: "Other",
      field: "technology",

      uniqueValueInfos: [
        {
          value: "2G", // code for interstates/freeways
          symbol: fwySym,
          label: "2G"
        },
        {
          value: "3G", // code for U.S. highways
          symbol: hwySym,
          label: "3G"
        },
        {
          value: "4G", // code for U.S. highways
          symbol: stateSym,
          label: "4G"
        }
      ]

    };

    document.getElementById("NumberOfTicketsButton").addEventListener("click", function () {
      Cells.renderer = NumberOfTicketsRenderer;
    });
    document.getElementById("NumberOutagesRenderer").addEventListener("click", function () {
      Cells.renderer = NumberOutagesRenderer;
    });
    document.getElementById("netWorkType").addEventListener("click", function () {

      Cells.renderer = hwyRenderer;

    });

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
      // featureTableHPSMTickets.highlightIds.removeAll();
      featureTableRFIsFC.highlightIds.removeAll();
      featureTableCCTickets.highlightIds.removeAll();
      featureTableNMSIncident.highlightIds.removeAll();
      featureTableJammerSites.highlightIds.removeAll();
      featureTableSites.highlightIds.removeAll();
      featureTableCells.highlightIds.removeAll();
      featureTableOutagesData.highlightIds.removeAll();

      document.getElementById("Data_Container_By_Select").innerHTML = " "

      layerBlockArray.forEach((block) => {
        while (block.lastElementChild) {
          block.removeChild(block.lastElementChild);
        }
      });
    });

    const searchWidget = new Search({
      view: view,
      allPlaceholder: "Site ID Or Phone number Or Cell ID",
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
        {
          layer: Cells,
          searchFields: ["CELLID"],
          displayField: "CELLID",
          exactMatch: false,
          // outFields: ["*"],
          name: "Cells",
          placeholder: "example: 806575886"
        },
        {
          layer: Cells,
          searchFields: ["phon_num"],
          displayField: "phon_num",
          exactMatch: false,
          // outFields: ["*"],
          name: "CCTicketsFC",
          placeholder: "example: 010123456789"
        },

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
      unit: "kilometers", // Set unit to kilometers
      visible: false
    });
    const areaMeasurement2D = new AreaMeasurement2D({
      view,
      unit: "square-kilometers", // Set unit to square kilometers for area measurement
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

    function getSitesFeatureLayer(site_id) {

      document.getElementById("Data_Container_By_Select").innerHTML = ' '
      console.log("site id", site_id);
      if (site_id) {

        const queryParamsOutages = {
          where: `site_id = '${site_id}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
        const queryCC = {
          where: `siteid = '${site_id}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };

        const queryCells = {
          where: `SITEID = '${site_id}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
        const queryNMSIncident = {
          where: `ASIA_SITEID = '${site_id}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };

        //  // Execute the query

        featureLayerOutagesData.queryFeatures(queryParamsOutages)
          .then(function (result) {
            // Handle the query result
            if (result.features.length > 0) {
              document.getElementById("Data_Container_By_Select").innerHTML += `
           <div class="accordion-item">
           <h2 class="accordion-header" id="headingThree">
             <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
               Outages
             </button>
           </h2>
           <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
             <div class="accordion-body" id="collapseThreeBodySelect">
             </div>
           </div>
         </div>
           `
              for (let index = 0; index < result.features.length; index++) {
                const element = result.features[index];
                const objectId = element.attributes.OBJECTID;
                if (!featureTableOutagesData.highlightIds.includes(objectId)) {
                  featureTableOutagesData.highlightIds.add(objectId);
                }
                const clearanceTimeDateObj = new Date(element.attributes.clearance_time);
                const closeTimeDateObj = new Date(element.attributes.close_time);
                document.getElementById("collapseThreeBodySelect").innerHTML += `
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
            } else {
              document.getElementById("Data_Container_By_Select").innerHTML += `
            <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
            No Outages Found
            </button>`
            }
          })
          .catch(function (error) {
            // Handle errors
            console.error("Error performing query:", error);
          });

        CCTicketsFCExportFeatures.queryFeatures(queryCC)
          .then(function (result) {
            if (result.features.length > 0) {
              // Handle the query result
              document.getElementById("Data_Container_By_Select").innerHTML += `
           <div class="accordion-item">
           <h2 class="accordion-header" id="headingCCTickets">
             <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCCTickets" aria-expanded="false" aria-controls="collapseCCTickets">
             CC Tickets
             </button>
           </h2>
           <div id="collapseCCTickets" class="accordion-collapse collapse" aria-labelledby="headingCCTickets" data-bs-parent="#accordionExample">
             <div class="accordion-body" id="collapseCCTicketsBodySelect"}>
             </div>
           </div>
         </div>
           `
              for (let index = 0; index < result.features.length; index++) {
                const element = result.features[index];

                const objectId = element.attributes.OBJECTID;
                if (!featureTableCCTickets.highlightIds.includes(objectId)) {
                  featureTableCCTickets.highlightIds.add(objectId);
                }
                let sdOpenTime = new Date(element.attributes.sd_open_time);
                let SD = new Date(element.attributes.sd);
                let imOpenTime = new Date(element.attributes.im_open_time);
                let sdCloseTime = new Date(element.attributes.sd_close_time);
                let sdResolutionTime = new Date(element.attributes.sd_resolution_time);
                let problemTime = new Date(element.attributes.problem_time);
                document.getElementById("collapseCCTicketsBodySelect").innerHTML += `
             <table  class="mt-3 table table-striped table-bordered">
             <thead>
               <th colspan="2">CGI: ${element.attributes.cgi ? element.attributes.cgi : " "}</th>
             </thead>
           <tbody>
             <tr>
               <th>IM ID: </th>
               <td> ${element.attributes.im_id ? element.attributes.im_id : " "}</td>
             </tr>
             <tr>
               <th>SD ID: </th>
               <td> ${element.attributes.sd_id ? element.attributes.sd_id : " "}</td>
             </tr>
             <tr>
               <th>IM Group: </th>
               <td> ${element.attributes.im_group ? element.attributes.im_group : " "}</td>
             </tr>
             <tr>
               <th>SD Open Time: </th>
               <td> ${sdOpenTime ? sdOpenTime.toUTCString() : " "}</td>
             </tr>
             <tr>
               <th>SD Opened By: </th>
               <td> ${element.attributes.sd_opened_by ? element.attributes.sd_opened_by : " "}</td>
             </tr>
             <tr>
               <th>SD: </th>
               <td> ${SD ? SD.toUTCString() : " "}</td>
             </tr>
             <tr>
               <th>IM Opened By: </th>
               <td> ${element.attributes.im_opened_by ? element.attributes.im_opened_by : " "}</td>
             </tr>
             <tr>
               <th>SD Status: </th>
               <td> ${element.attributes.sd_status ? element.attributes.sd_status : " "}</td>
             </tr>
             <tr>
               <th>IM Status: </th>
               <td> ${element.attributes.im__status ? element.attributes.im__status : " "}</td>
             </tr>
             <tr>
               <th>IM Open Time: </th>
               <td> ${imOpenTime ? imOpenTime.toUTCString() : " "}</td>
             </tr>
          
             <tr>
               <th>Subcategory: </th>
               <td> ${element.attributes.subcategory ? element.attributes.subcategory : " "}</td>
             </tr>
             <tr>
               <th>SD Close Time: </th>
               <td> ${sdCloseTime ? sdCloseTime.toUTCString() : " "}</td>
             </tr>
             <tr>
               <th>SD Resolution Time: </th>
               <td> ${sdResolutionTime ? sdResolutionTime.toUTCString() : " "}</td>
             </tr>
             <tr>
               <th>Problem Time: </th>
               <td> ${problemTime ? problemTime.toUTCString() : " "}</td>
             </tr>
             <tr>
             <th>cc slt: </th>
             <td> ${element.attributes.cc_slt ? element.attributes.cc_slt : " "}</td>
           </tr>
             <tr>
             <th>Cemu Ola Status: </th>
             <td> ${element.attributes.cemu_ola_status ? element.attributes.cemu_ola_status : " "}</td>
           </tr>
             <tr>
             <th>General Outages: </th>
             <td> ${element.attributes.general_outage ? element.attributes.general_outage : " "}</td>
            </tr>
             <tr>
             <th>Sla Status: </th>
             <td> ${element.attributes.sla_status ? element.attributes.sla_status : " "}</td>
            </tr>
             <tr>
             <th>Affected Service: </th>
             <td> ${element.attributes.affected_service ? element.attributes.affected_service : " "}</td>
            </tr>
             <tr>
             <th>Gouvernorate: </th>
             <td> ${element.attributes.gouvernorate ? element.attributes.gouvernorate : " "}</td>
            </tr>
             <tr>
             <th>Resolution: </th>
             <td> ${element.attributes.resolution ? element.attributes.resolution : " "}</td>
            </tr>
             <tr>
             <th>Asia Bscs Rate Plan: </th>
             <td> ${element.attributes.asia_bscs_rate_plan ? element.attributes.asia_bscs_rate_plan : " "}</td>
            </tr>
             <tr>
             <th>Asia Bscs Balance: </th>
             <td> ${element.attributes.asia_bscs_balance ? element.attributes.asia_bscs_balance : " "}</td>
            </tr>
             <tr>
             <th>Resolution Code: </th>
             <td> ${element.attributes.resolution_code ? element.attributes.resolution_code : " "}</td>
            </tr>
             <tr>
             <th>Category: </th>
             <td> ${element.attributes.category ? element.attributes.category : " "}</td>
            </tr>
             <tr>
             <th>Description: </th>
             <td> ${element.attributes.description ? element.attributes.description : " "}</td>
            </tr>
             <tr>
             <th>Cemu Comment: </th>
             <td> ${element.attributes.cemu_comment ? element.attributes.cemu_comment : " "}</td>
            </tr>
             <tr>
             <th>Escalate Ticket: </th>
             <td> ${element.attributes.escalate_ticket ? element.attributes.escalate_ticket : " "}</td>
            </tr>
             <tr>
             <th>Contact Msisdn: </th>
             <td> ${element.attributes.contact_msisdn ? element.attributes.contact_msisdn : " "}</td>
            </tr>
             <tr>
             <th>Cell ID: </th>
             <td> ${element.attributes.cell_id ? element.attributes.cell_id : " "}</td>
            </tr>
             <tr>
             <th>Msisdn: </th>
             <td> ${element.attributes.msisdn ? element.attributes.msisdn : " "}</td>
            </tr>
             <tr>
             <th>Cell Name: </th>
             <td> ${element.attributes.cell_name ? element.attributes.cell_name : " "}</td>
            </tr>
             <tr>
             <th>Site ID: </th>
             <td> ${element.attributes.siteid ? element.attributes.siteid : " "}</td>
            </tr>
            </tr>
             <tr>
             <th>Customer Segment: </th>
             <td> ${element.attributes.customer_segment ? element.attributes.customer_segment : " "}</td>
            </tr>
             <tr>
             <th>Site Name: </th>
             <td> ${element.attributes.sitename ? element.attributes.sitename : " "}</td>
            </tr>
             <tr>
             <th>CMC: </th>
             <td> ${element.attributes.cmc ? element.attributes.cmc : " "}</td>
            </tr>
             <tr>
             <th>Reopened: </th>
             <td> ${element.attributes.reopened ? element.attributes.reopened : " "}</td>
            </tr>
             <tr>
             <th>CMC waiting: </th>
             <td> ${element.attributes.cmc_waiting ? element.attributes.cmc_waiting : " "}</td>
            </tr>
             <tr>
             <th>CMC ID: </th>
             <td> ${element.attributes.cmc_id ? element.attributes.cmc_id : " "}</td>
            </tr>
             <tr>
             <th>Closed By ID: </th>
             <td> ${element.attributes.closed_by_id ? element.attributes.closed_by_id : " "}</td>
            </tr>
             <tr>
             <th>Region: </th>
             <td> ${element.attributes.region ? element.attributes.region : " "}</td>
            </tr>
             <tr>
             <th>Resolve By: </th>
             <td> ${element.attributes.resolved_by ? element.attributes.resolved_by : " "}</td>
            </tr>
             <tr>
             <th>Expected Resolution Date: </th>
             <td> ${element.attributes.expected_resolution_date ? element.attributes.expected_resolution_date : " "}</td>
            </tr>
             <tr>
             <th>Auto Governorate: </th>
             <td> ${element.attributes.auto_governorate ? element.attributes.auto_governorate : " "}</td>
            </tr>
             <tr>
             <th>Channel: </th>
             <td> ${element.attributes.channel ? element.attributes.channel : " "}</td>
            </tr>
             <tr>
             <th>Phone Number: </th>
             <td> ${element.attributes.phone_number ? element.attributes.phone_number : " "}</td>
            </tr>
             <tr>
             <th>CGI: </th>
             <td> ${element.attributes.cgi ? element.attributes.cgi : " "}</td>
            </tr>
           </tbody>
         </table>
           `
                // console.log("OutagesData",element.attributes);
              }
            } else {
              document.getElementById("Data_Container_By_Select").innerHTML += `
            <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
            No CC Tickets Found
            </button>`
            }
          })
          .catch(function (error) {
            // Handle errors
            document.getElementById("Data_Container_By_Select").innerHTML += `
             <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
             No CC Tickets Found
             </button>`
            console.error("Error performing query:", error);

          });

        Cells.queryFeatures(queryCells)
          .then(function (result) {
            if (result.features.length > 0) {
              // Handle the query result
              document.getElementById("Data_Container_By_Select").innerHTML += `
           <div class="accordion-item">
           <h2 class="accordion-header" id="headingCells">
             <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCells" aria-expanded="false" aria-controls="collapseCells">
             Cells
             </button>
           </h2>
           <div id="collapseCells" class="accordion-collapse collapse" aria-labelledby="headingCells" data-bs-parent="#accordionExample">
             <div class="accordion-body" id="collapseCellsBodySelect"}>
             </div>
           </div>
         </div>
           `
              for (let index = 0; index < result.features.length; index++) {
                const element = result.features[index];
                const objectId = element.attributes.OBJECTID;
                if (!featureTableCells.highlightIds.includes(objectId)) {
                  featureTableCells.highlightIds.add(objectId);
                }
                document.getElementById("collapseCellsBodySelect").innerHTML += `
             <table  class="mt-3 table table-striped table-bordered">
             <thead>
               <th colspan="2">UNIQUEID: ${element.attributes.UNIQUEID ? element.attributes.UNIQUEID : " "}</th>
             </thead>
           <tbody>
             <tr>
               <th>SITEID: </th>
               <td> ${element.attributes.SITEID ? element.attributes.SITEID : " "}</td>
             </tr>
             <tr>
               <th>CELLID: </th>
               <td> ${element.attributes.CELLID ? element.attributes.CELLID : " "}</td>
             </tr>
             <tr>
               <th>SITEX: </th>
               <td> ${element.attributes.SITEX ? element.attributes.SITEX : " "}</td>
             </tr>
       
             <tr>
               <th>SITEY: </th>
               <td> ${element.attributes.SITEY ? element.attributes.SITEY : " "}</td>
             </tr>
        
             <tr>
               <th>AZIMUTH: </th>
               <td> ${element.attributes.AZIMUTH ? element.attributes.AZIMUTH : " "}</td>
             </tr>
             <tr>
               <th>AZIMSRC: </th>
               <td> ${element.attributes.AZIMSRC ? element.attributes.AZIMSRC : " "}</td>
             </tr>
             <tr>
               <th>BEAMWIDTH: </th>
               <td> ${element.attributes.BEAMWIDTH ? element.attributes.BEAMWIDTH : " "}</td>
             </tr>

             <tr>
               <th>BEAMSRC: </th>
               <td> ${element.attributes.BEAMSRC ? element.attributes.BEAMSRC : " "}</td>
             </tr>
             <tr>
             <th>RADIUS: </th>
             <td> ${element.attributes.RADIUS ? element.attributes.RADIUS : " "}</td>
           </tr>
             <tr>
             <th>RADIUSUNIT: </th>
             <td> ${element.attributes.RADIUSUNIT ? element.attributes.RADIUSUNIT : " "}</td>
           </tr>
             <tr>
             <th>RADIUSSRC: </th>
             <td> ${element.attributes.RADIUSSRC ? element.attributes.RADIUSSRC : " "}</td>
            </tr>
             <tr>
             <th>ID: </th>
             <td> ${element.attributes.id ? element.attributes.id : " "}</td>
            </tr>
             <tr>
             <th>Number Cab: </th>
             <td> ${element.attributes.number_cab ? element.attributes.number_cab : " "}</td>
            </tr>
             <tr>
             <th>Site Name: </th>
             <td> ${element.attributes.site_name ? element.attributes.site_name : " "}</td>
            </tr>
             <tr>
             <th>Area: </th>
             <td> ${element.attributes.areaa ? element.attributes.areaa : " "}</td>
            </tr>
             <tr>
             <th>Cell Name: </th>
             <td> ${element.attributes.cell_name ? element.attributes.cell_name : " "}</td>
            </tr>
             <tr>
             <th>Full Name: </th>
             <td> ${element.attributes.full_name ? element.attributes.full_name : " "}</td>
            </tr>
             <tr>
             <th>BSC Name: </th>
             <td> ${element.attributes.bsc_name ? element.attributes.bsc_name : " "}</td>
            </tr>
             <tr>
             <th>BSC Region: </th>
             <td> ${element.attributes.bsc_region ? element.attributes.bsc_region : " "}</td>
            </tr>
             <tr>
             <th>BSC Provin: </th>
             <td> ${element.attributes.bsc_provin ? element.attributes.bsc_provin : " "}</td>
            </tr>
             <tr>
             <th>Clutter: </th>
             <td> ${element.attributes.clutter ? element.attributes.clutter : " "}</td>
            </tr>
             <tr>
             <th>Phase Year: </th>
             <td> ${element.attributes.phase_year ? element.attributes.phase_year : " "}</td>
            </tr>
             <tr>
             <th>Phase Numb: </th>
             <td> ${element.attributes.phase_numb ? element.attributes.phase_numb : " "}</td>
            </tr>
             <tr>
             <th>status: </th>
             <td> ${element.attributes.status ? element.attributes.status : " "}</td>
            </tr>
             <tr>
             <th>priority: </th>
             <td> ${element.attributes.priority ? element.attributes.priority : " "}</td>
            </tr>
             <tr>
             <th>Search RIN: </th>
             <td> ${element.attributes.search_rin ? element.attributes.search_rin : " "}</td>
            </tr>
             <tr>
             <th>Remark: </th>
             <td> ${element.attributes.remark ? element.attributes.remark : " "}</td>
            </tr>
            </tr>
             <tr>
             <th>RF Region: </th>
             <td> ${element.attributes.rf_region ? element.attributes.rf_region : " "}</td>
            </tr>
             <tr>
             <th>RF Provinc: </th>
             <td> ${element.attributes.rf_provinc ? element.attributes.rf_provinc : " "}</td>
            </tr>
             <tr>
             <th>Site Type: </th>
             <td> ${element.attributes.site_type ? element.attributes.site_type : " "}</td>
            </tr>
             <tr>
             <th>IN OUT: </th>
             <td> ${element.attributes.in_out ? element.attributes.in_out : " "}</td>
            </tr>
             <tr>
             <th>Cell Vendo: </th>
             <td> ${element.attributes.cell_vendo ? element.attributes.cell_vendo : " "}</td>
            </tr>
             <tr>
             <th>BTS Type: </th>
             <td> ${element.attributes.bts_type ? element.attributes.bts_type : " "}</td>
            </tr>
             <tr>
             <th>Band Type: </th>
             <td> ${element.attributes.band_type ? element.attributes.band_type : " "}</td>
            </tr>
             <tr>
             <th>TRX NUM: </th>
             <td> ${element.attributes.trx_num ? element.attributes.trx_num : " "}</td>
            </tr>
             <tr>
             <th>CU Type: </th>
             <td> ${element.attributes.cu_type ? element.attributes.cu_type : " "}</td>
            </tr>
             <tr>
             <th>District: </th>
             <td> ${element.attributes.district ? element.attributes.district : " "}</td>
            </tr>
             <tr>
             <th>Edge: </th>
             <td> ${element.attributes.edge ? element.attributes.edge : " "}</td>
            </tr>
             <tr>
             <th>Sector NUM: </th>
             <td> ${element.attributes.sector_num ? element.attributes.sector_num : " "}</td>
            </tr>
             <tr>
             <th>LAC: </th>
             <td> ${element.attributes.lac ? element.attributes.lac : " "}</td>
            </tr>
             <tr>
             <th>Vendor Ant: </th>
             <td> ${element.attributes.vendor_ant ? element.attributes.vendor_ant : " "}</td>
            </tr>
             <tr>
             <th>Antenna TY: </th>
             <td> ${element.attributes.antenna_ty ? element.attributes.antenna_ty : " "}</td>
            </tr>
             <tr>
             <th>Antenna HE: </th>
             <td> ${element.attributes.antenna_he ? element.attributes.antenna_he : " "}</td>
            </tr>
             <tr>
             <th>Mechanical: </th>
             <td> ${element.attributes.mechanical ? element.attributes.mechanical : " "}</td>
            </tr>
             <tr>
             <th>Electrical: </th>
             <td> ${element.attributes.electrical ? element.attributes.electrical : " "}</td>
            </tr>
             <tr>
             <th>Electrical 1: </th>
             <td> ${element.attributes.electric_1 ? element.attributes.electric_1 : " "}</td>
            </tr>
             <tr>
             <th>Electrical 2: </th>
             <td> ${element.attributes.electric_2 ? element.attributes.electric_2 : " "}</td>
            </tr>
             <tr>
             <th>Electrical 3: </th>
             <td> ${element.attributes.electric_3 ? element.attributes.electric_3 : " "}</td>
            </tr>
             <tr>
             <th>Electrical 4: </th>
             <td> ${element.attributes.electric_4 ? element.attributes.electric_4 : " "}</td>
            </tr>
             <tr>
             <th>Electrical 5: </th>
             <td> ${element.attributes.electric_5 ? element.attributes.electric_5 : " "}</td>
            </tr>
             <tr>
             <th>Sector STA: </th>
             <td> ${element.attributes.sector_sta ? element.attributes.sector_sta : " "}</td>
            </tr>
             <tr>
             <th>Antenna GA: </th>
             <td> ${element.attributes.antenna_ga ? element.attributes.antenna_ga : " "}</td>
            </tr>
             <tr>
             <th>Power Clas: </th>
             <td> ${element.attributes.power_clas ? element.attributes.power_clas : " "}</td>
            </tr>
             <tr>
             <th>Erip: </th>
             <td> ${element.attributes.erip ? element.attributes.erip : " "}</td>
            </tr>
             <tr>
             <th>ON Air DAT: </th>
             <td> ${element.attributes.on_air_dat ? element.attributes.on_air_dat : " "}</td>
            </tr>
             <tr>
             <th>CellC ID HE: </th>
             <td> ${element.attributes.cell_id_he ? element.attributes.cell_id_he : " "}</td>
            </tr>
             <tr>
             <th>Geo City: </th>
             <td> ${element.attributes.geo_city ? element.attributes.geo_city : " "}</td>
            </tr>
             <tr>
             <th>Geo Region: </th>
             <td> ${element.attributes.geo_region ? element.attributes.geo_region : " "}</td>
            </tr>
             <tr>
             <th>Bkey Prs C: </th>
             <td> ${element.attributes.bkey_prs_c ? element.attributes.bkey_prs_c : " "}</td>
            </tr>
             <tr>
             <th>Sub Distri: </th>
             <td> ${element.attributes.sub_distri ? element.attributes.sub_distri : " "}</td>
            </tr>
             <tr>
             <th>Technology: </th>
             <td> ${element.attributes.technology ? element.attributes.technology : " "}</td>
            </tr>
             <tr>
             <th>ECI: </th>
             <td> ${element.attributes.eci ? element.attributes.eci : " "}</td>
            </tr>
             <tr>
             <th>LAC OR TAC: </th>
             <td> ${element.attributes.lac_or_tac ? element.attributes.lac_or_tac : " "}</td>
            </tr>
             <tr>
             <th>RAT Type: </th>
             <td> ${element.attributes.rat_type ? element.attributes.rat_type : " "}</td>
            </tr>
             <tr>
             <th>Enode Bid: </th>
             <td> ${element.attributes.enode_bid ? element.attributes.enode_bid : " "}</td>
            </tr>
           </tbody>
         </table>
           `
                // console.log("OutagesData",element.attributes);
              }
            } else {
              document.getElementById("Data_Container_By_Select").innerHTML += `
            <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
            No Cells Found
            </button>`
            }
          })
          .catch(function (error) {
            // Handle errors
            document.getElementById("Data_Container_By_Select").innerHTML += `
             <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
             No Cells Found
             </button>`
            console.error("Error performing query:", error);

          });
        featureLayerNMSIncident.queryFeatures(queryNMSIncident)
          .then(function (result) {
            if (result.features.length > 0) {
              // Handle the query result
              document.getElementById("Data_Container_By_Select").innerHTML += `
           <div class="accordion-item">
           <h2 class="accordion-header" id="headingNMSIncident">
             <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNMSIncident" aria-expanded="false" aria-controls="collapseNMSIncident">
             NMS Incident
             </button>
           </h2>
           <div id="collapseNMSIncident" class="accordion-collapse collapse" aria-labelledby="headingNMSIncident" data-bs-parent="#accordionExample">
             <div class="accordion-body" id="collapseNMSIncidentBodySelect"}>
             </div>
           </div>
         </div>
           `
              for (let index = 0; index < result.features.length; index++) {
                const element = result.features[index];
                const objectId = element.attributes.OBJECTID;
                if (!featureTableNMSIncident.highlightIds.includes(objectId)) {
                  featureTableNMSIncident.highlightIds.add(objectId);
                }
                document.getElementById("collapseNMSIncidentBodySelect").innerHTML += `
             <table  class="mt-3 table table-striped table-bordered">
             <thead>
               <th colspan="2">Site_ID: ${element.attributes.ASIA_SITEID ? element.attributes.ASIA_SITEID : " "}</th>
             </thead>
           <tbody>
             <tr>
               <th>Cell_ID: </th>
               <td> ${element.attributes.ASIA_CELL_ID ? element.attributes.ASIA_CELL_ID : " "}</td>
             </tr>
             <tr>
               <th>OPEN_TIME: </th>
               <td> ${element.attributes.OPEN_TIME ? element.attributes.OPEN_TIME : " "}</td>
             </tr>
             <tr>
               <th>CLOSE_TIME: </th>
               <td> ${element.attributes.CLOSE_TIME ? element.attributes.CLOSE_TIME : " "}</td>
             </tr>
       
             <tr>
               <th>STATUS: </th>
               <td> ${element.attributes.STATUS ? element.attributes.STATUS : " "}</td>
             </tr>
        
             <tr>
               <th>OUTAGE_TYPE: </th>
               <td> ${element.attributes.OUTAGE_TYPE ? element.attributes.OUTAGE_TYPE : " "}</td>
             </tr>
             <tr>
               <th>AFFECTED_SERVICES: </th>
               <td> ${element.attributes.AFFECTED_SERVICES ? element.attributes.AFFECTED_SERVICES : " "}</td>
             </tr>
             <tr>
               <th>CATEGORY: </th>
               <td> ${element.attributes.CATEGORY ? element.attributes.CATEGORY : " "}</td>
             </tr>
             <tr>
               <th>SUBCATEGORY: </th>
               <td> ${element.attributes.SUBCATEGORY ? element.attributes.SUBCATEGORY : " "}</td>
             </tr>
           </tbody>
         </table>
           `
                // console.log("OutagesData",element.attributes);
              }
            } else {
              document.getElementById("Data_Container_By_Select").innerHTML += `
            <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
            No NMS Incident Found
            </button>`
            }
          })
          .catch(function (error) {
            // Handle errors
            document.getElementById("Data_Container_By_Select").innerHTML += `
             <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
             No NMS Incident Found
             </button>`
            console.error("Error performing query:", error);

          });

      } else {
        document.getElementById("Data_Container_By_Select").innerHTML = `<h3 style="color:gray"> No Data Found </h3>`
      }
    }

    function getCellsFeatureLayer(cell_id, cgi) {

      //  document.getElementById("Data_Container_By_Search").innerHTML =` `
      document.getElementById("Data_Container_By_Select").innerHTML = ' '
      console.log("cell_id", cell_id);
      if (cell_id && cgi) {

        const queryParamsOutages = {
          where: `cell_id = '${cell_id}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
        const queryCC = {
          where: `cgi = '${cgi}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };
        const queryNMSIncident = {
          where: `ASIA_CELL_ID = '${cell_id}'`, // Specify your query criteria
          outFields: ["*"] // Specify the fields you want to retrieve
        };

        //  // Execute the query

        featureLayerOutagesData.queryFeatures(queryParamsOutages)
          .then(function (result) {
            // Handle the query result
            if (result.features.length > 0) {
              document.getElementById("Data_Container_By_Select").innerHTML += `
           <div class="accordion-item">
           <h2 class="accordion-header" id="headingThree">
             <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
               Outages
             </button>
           </h2>
           <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
             <div class="accordion-body" id="collapseThreeBodySelect">
             </div>
           </div>
         </div>
           `
              for (let index = 0; index < result.features.length; index++) {
                const element = result.features[index];
                const objectId = element.attributes.OBJECTID;
                if (!featureTableOutagesData.highlightIds.includes(objectId)) {
                  featureTableOutagesData.highlightIds.add(objectId);
                }
                const clearanceTimeDateObj = new Date(element.attributes.clearance_time);
                const closeTimeDateObj = new Date(element.attributes.close_time);
                document.getElementById("collapseThreeBodySelect").innerHTML += `
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
            } else {
              document.getElementById("Data_Container_By_Select").innerHTML += `
            <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
            No Outages Found
            </button>`
            }
          })
          .catch(function (error) {
            // Handle errors
            console.error("Error performing query:", error);
          });

        CCTicketsFCExportFeatures.queryFeatures(queryCC)
          .then(function (result) {
            if (result.features.length > 0) {
              // Handle the query result
              document.getElementById("Data_Container_By_Select").innerHTML += `
           <div class="accordion-item">
           <h2 class="accordion-header" id="headingCCTickets">
             <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCCTickets" aria-expanded="false" aria-controls="collapseCCTickets">
             CC Tickets
             </button>
           </h2>
           <div id="collapseCCTickets" class="accordion-collapse collapse" aria-labelledby="headingCCTickets" data-bs-parent="#accordionExample">
             <div class="accordion-body" id="collapseCCTicketsBodySelect"}>
             </div>
           </div>
         </div>
           `
              for (let index = 0; index < result.features.length; index++) {
                const element = result.features[index];
                const objectId = element.attributes.OBJECTID;
                if (!featureTableCCTickets.highlightIds.includes(objectId)) {
                  featureTableCCTickets.highlightIds.add(objectId);
                }
                let sdOpenTime = new Date(element.attributes.sd_open_time);
                let SD = new Date(element.attributes.sd);
                let imOpenTime = new Date(element.attributes.im_open_time);
                let sdCloseTime = new Date(element.attributes.sd_close_time);
                let sdResolutionTime = new Date(element.attributes.sd_resolution_time);
                let problemTime = new Date(element.attributes.problem_time);
                document.getElementById("collapseCCTicketsBodySelect").innerHTML += `
             <table  class="mt-3 table table-striped table-bordered">
             <thead>
               <th colspan="2">CGI: ${element.attributes.cgi ? element.attributes.cgi : " "}</th>
             </thead>
           <tbody>
             <tr>
               <th>IM ID: </th>
               <td> ${element.attributes.im_id ? element.attributes.im_id : " "}</td>
             </tr>
             <tr>
               <th>SD ID: </th>
               <td> ${element.attributes.sd_id ? element.attributes.sd_id : " "}</td>
             </tr>
             <tr>
               <th>IM Group: </th>
               <td> ${element.attributes.im_group ? element.attributes.im_group : " "}</td>
             </tr>
             <tr>
               <th>SD Open Time: </th>
               <td> ${sdOpenTime ? sdOpenTime.toUTCString() : " "}</td>
             </tr>
             <tr>
               <th>SD Opened By: </th>
               <td> ${element.attributes.sd_opened_by ? element.attributes.sd_opened_by : " "}</td>
             </tr>
             <tr>
               <th>SD: </th>
               <td> ${SD ? SD.toUTCString() : " "}</td>
             </tr>
             <tr>
               <th>IM Opened By: </th>
               <td> ${element.attributes.im_opened_by ? element.attributes.im_opened_by : " "}</td>
             </tr>
             <tr>
               <th>SD Status: </th>
               <td> ${element.attributes.sd_status ? element.attributes.sd_status : " "}</td>
             </tr>
             <tr>
               <th>IM Status: </th>
               <td> ${element.attributes.im__status ? element.attributes.im__status : " "}</td>
             </tr>
             <tr>
               <th>IM Open Time: </th>
               <td> ${imOpenTime ? imOpenTime.toUTCString() : " "}</td>
             </tr>
          
             <tr>
               <th>Subcategory: </th>
               <td> ${element.attributes.subcategory ? element.attributes.subcategory : " "}</td>
             </tr>
             <tr>
               <th>SD Close Time: </th>
               <td> ${sdCloseTime ? sdCloseTime.toUTCString() : " "}</td>
             </tr>
             <tr>
               <th>SD Resolution Time: </th>
               <td> ${sdResolutionTime ? sdResolutionTime.toUTCString() : " "}</td>
             </tr>
             <tr>
               <th>Problem Time: </th>
               <td> ${problemTime ? problemTime.toUTCString() : " "}</td>
             </tr>
             <tr>
             <th>cc slt: </th>
             <td> ${element.attributes.cc_slt ? element.attributes.cc_slt : " "}</td>
           </tr>
             <tr>
             <th>Cemu Ola Status: </th>
             <td> ${element.attributes.cemu_ola_status ? element.attributes.cemu_ola_status : " "}</td>
           </tr>
             <tr>
             <th>General Outages: </th>
             <td> ${element.attributes.general_outage ? element.attributes.general_outage : " "}</td>
            </tr>
             <tr>
             <th>Sla Status: </th>
             <td> ${element.attributes.sla_status ? element.attributes.sla_status : " "}</td>
            </tr>
             <tr>
             <th>Affected Service: </th>
             <td> ${element.attributes.affected_service ? element.attributes.affected_service : " "}</td>
            </tr>
             <tr>
             <th>Gouvernorate: </th>
             <td> ${element.attributes.gouvernorate ? element.attributes.gouvernorate : " "}</td>
            </tr>
             <tr>
             <th>Resolution: </th>
             <td> ${element.attributes.resolution ? element.attributes.resolution : " "}</td>
            </tr>
             <tr>
             <th>Asia Bscs Rate Plan: </th>
             <td> ${element.attributes.asia_bscs_rate_plan ? element.attributes.asia_bscs_rate_plan : " "}</td>
            </tr>
             <tr>
             <th>Asia Bscs Balance: </th>
             <td> ${element.attributes.asia_bscs_balance ? element.attributes.asia_bscs_balance : " "}</td>
            </tr>
             <tr>
             <th>Resolution Code: </th>
             <td> ${element.attributes.resolution_code ? element.attributes.resolution_code : " "}</td>
            </tr>
             <tr>
             <th>Category: </th>
             <td> ${element.attributes.category ? element.attributes.category : " "}</td>
            </tr>
             <tr>
             <th>Description: </th>
             <td> ${element.attributes.description ? element.attributes.description : " "}</td>
            </tr>
             <tr>
             <th>Cemu Comment: </th>
             <td> ${element.attributes.cemu_comment ? element.attributes.cemu_comment : " "}</td>
            </tr>
             <tr>
             <th>Escalate Ticket: </th>
             <td> ${element.attributes.escalate_ticket ? element.attributes.escalate_ticket : " "}</td>
            </tr>
             <tr>
             <th>Contact Msisdn: </th>
             <td> ${element.attributes.contact_msisdn ? element.attributes.contact_msisdn : " "}</td>
            </tr>
             <tr>
             <th>Cell ID: </th>
             <td> ${element.attributes.cell_id ? element.attributes.cell_id : " "}</td>
            </tr>
             <tr>
             <th>Msisdn: </th>
             <td> ${element.attributes.msisdn ? element.attributes.msisdn : " "}</td>
            </tr>
             <tr>
             <th>Cell Name: </th>
             <td> ${element.attributes.cell_name ? element.attributes.cell_name : " "}</td>
            </tr>
             <tr>
             <th>Site ID: </th>
             <td> ${element.attributes.siteid ? element.attributes.siteid : " "}</td>
            </tr>
            </tr>
             <tr>
             <th>Customer Segment: </th>
             <td> ${element.attributes.customer_segment ? element.attributes.customer_segment : " "}</td>
            </tr>
             <tr>
             <th>Site Name: </th>
             <td> ${element.attributes.sitename ? element.attributes.sitename : " "}</td>
            </tr>
             <tr>
             <th>CMC: </th>
             <td> ${element.attributes.cmc ? element.attributes.cmc : " "}</td>
            </tr>
             <tr>
             <th>Reopened: </th>
             <td> ${element.attributes.reopened ? element.attributes.reopened : " "}</td>
            </tr>
             <tr>
             <th>CMC waiting: </th>
             <td> ${element.attributes.cmc_waiting ? element.attributes.cmc_waiting : " "}</td>
            </tr>
             <tr>
             <th>CMC ID: </th>
             <td> ${element.attributes.cmc_id ? element.attributes.cmc_id : " "}</td>
            </tr>
             <tr>
             <th>Closed By ID: </th>
             <td> ${element.attributes.closed_by_id ? element.attributes.closed_by_id : " "}</td>
            </tr>
             <tr>
             <th>Region: </th>
             <td> ${element.attributes.region ? element.attributes.region : " "}</td>
            </tr>
             <tr>
             <th>Resolve By: </th>
             <td> ${element.attributes.resolved_by ? element.attributes.resolved_by : " "}</td>
            </tr>
             <tr>
             <th>Expected Resolution Date: </th>
             <td> ${element.attributes.expected_resolution_date ? element.attributes.expected_resolution_date : " "}</td>
            </tr>
             <tr>
             <th>Auto Governorate: </th>
             <td> ${element.attributes.auto_governorate ? element.attributes.auto_governorate : " "}</td>
            </tr>
             <tr>
             <th>Channel: </th>
             <td> ${element.attributes.channel ? element.attributes.channel : " "}</td>
            </tr>
             <tr>
             <th>Phone Number: </th>
             <td> ${element.attributes.phone_number ? element.attributes.phone_number : " "}</td>
            </tr>
             <tr>
             <th>CGI: </th>
             <td> ${element.attributes.cgi ? element.attributes.cgi : " "}</td>
            </tr>
           </tbody>
         </table>
           `
                // console.log("OutagesData",element.attributes);
              }
            } else {
              document.getElementById("Data_Container_By_Select").innerHTML += `
            <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
            No CC Tickets Found
            </button>`
            }
          })
          .catch(function (error) {
            // Handle errors
            document.getElementById("Data_Container_By_Select").innerHTML += `
             <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
             No CC Tickets Found
             </button>`
            console.error("Error performing query:", error);

          });
        featureLayerNMSIncident.queryFeatures(queryNMSIncident)
          .then(function (result) {
            if (result.features.length > 0) {
              // Handle the query result
              document.getElementById("Data_Container_By_Select").innerHTML += `
           <div class="accordion-item">
           <h2 class="accordion-header" id="headingNMSIncident">
             <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNMSIncident" aria-expanded="false" aria-controls="collapseNMSIncident">
             NMS Incident
             </button>
           </h2>
           <div id="collapseNMSIncident" class="accordion-collapse collapse" aria-labelledby="headingNMSIncident" data-bs-parent="#accordionExample">
             <div class="accordion-body" id="collapseNMSIncidentBodySelect"}>
             </div>
           </div>
         </div>
           `
              for (let index = 0; index < result.features.length; index++) {
                const element = result.features[index];

                const objectId = element.attributes.OBJECTID;
                if (!featureTableNMSIncident.highlightIds.includes(objectId)) {
                  featureTableNMSIncident.highlightIds.add(objectId);
                }
                document.getElementById("collapseNMSIncidentBodySelect").innerHTML += `
             <table  class="mt-3 table table-striped table-bordered">
             <thead>
               <th colspan="2">Site_ID: ${element.attributes.ASIA_SITEID ? element.attributes.ASIA_SITEID : " "}</th>
             </thead>
           <tbody>
             <tr>
               <th>Cell_ID: </th>
               <td> ${element.attributes.ASIA_CELL_ID ? element.attributes.ASIA_CELL_ID : " "}</td>
             </tr>
             <tr>
               <th>OPEN_TIME: </th>
               <td> ${element.attributes.OPEN_TIME ? element.attributes.OPEN_TIME : " "}</td>
             </tr>
             <tr>
               <th>CLOSE_TIME: </th>
               <td> ${element.attributes.CLOSE_TIME ? element.attributes.CLOSE_TIME : " "}</td>
             </tr>
       
             <tr>
               <th>STATUS: </th>
               <td> ${element.attributes.STATUS ? element.attributes.STATUS : " "}</td>
             </tr>
        
             <tr>
               <th>OUTAGE_TYPE: </th>
               <td> ${element.attributes.OUTAGE_TYPE ? element.attributes.OUTAGE_TYPE : " "}</td>
             </tr>
             <tr>
               <th>AFFECTED_SERVICES: </th>
               <td> ${element.attributes.AFFECTED_SERVICES ? element.attributes.AFFECTED_SERVICES : " "}</td>
             </tr>
             <tr>
               <th>CATEGORY: </th>
               <td> ${element.attributes.CATEGORY ? element.attributes.CATEGORY : " "}</td>
             </tr>
             <tr>
               <th>SUBCATEGORY: </th>
               <td> ${element.attributes.SUBCATEGORY ? element.attributes.SUBCATEGORY : " "}</td>
             </tr>
           </tbody>
         </table>
           `
                // console.log("OutagesData",element.attributes);
              }
            } else {
              document.getElementById("Data_Container_By_Select").innerHTML += `
            <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
            No NMS Incident Found
            </button>`
            }
          })
          .catch(function (error) {
            // Handle errors
            document.getElementById("Data_Container_By_Select").innerHTML += `
             <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
             No NMS Incident Found
             </button>`
            console.error("Error performing query:", error);

          });

        RFIsFC.queryFeatures(queryCC)
          .then(function (result) {
            if (result.features.length > 0) {
              // Handle the query result
              document.getElementById("Data_Container_By_Select").innerHTML += `
           <div class="accordion-item">
           <h2 class="accordion-header" id="headingRFIs">
             <button class="accordion-button collapsed fw-bold text-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRFIs" aria-expanded="false" aria-controls="collapseRFIs">
             RFIs
             </button>
           </h2>
           <div id="collapseRFIs" class="accordion-collapse collapse" aria-labelledby="headingRFIs" data-bs-parent="#accordionExample">
             <div class="accordion-body" id="collapseRFIsBodySelect"}>
             </div>
           </div>
         </div>
           `
              for (let index = 0; index < result.features.length; index++) {
                const element = result.features[index];

                const objectId = element.attributes.OBJECTID;
                if (!featureTableRFIsFC.highlightIds.includes(objectId)) {
                  featureTableRFIsFC.highlightIds.add(objectId);
                }
                let Creation_Date_Time = new Date(element.attributes.Creation_Date_Time);
                document.getElementById("collapseRFIsBodySelect").innerHTML += `
             <table  class="mt-3 table table-striped table-bordered">
             <thead>
               <th colspan="2">CGI: ${element.attributes.cgi ? element.attributes.cgi : " "}</th>
             </thead>
           <tbody>
             <tr>
               <th>Interaction ID: </th>
               <td> ${element.attributes.Interaction_ID ? element.attributes.Interaction_ID : " "}</td>
             </tr>
             <tr>
               <th>Category: </th>
               <td> ${element.attributes.Category ? element.attributes.Category : " "}</td>
             </tr>
             <tr>
               <th>Affected_Service: </th>
               <td> ${element.attributes.Affected_Service ? element.attributes.Affected_Service : " "}</td>
             </tr>

             <tr>
               <th>User_ID: </th>
               <td> ${element.attributes.User_ID ? element.attributes.User_ID : " "}</td>
             </tr>
             <tr>
               <th>SD: </th>
               <td> ${Creation_Date_Time ? Creation_Date_Time.toUTCString() : " "}</td>
             </tr>
             <tr>
               <th>User_Name: </th>
               <td> ${element.attributes.User_Name ? element.attributes.User_Name : " "}</td>
             </tr>
             <tr>
               <th>User_Location: </th>
               <td> ${element.attributes.User_Location ? element.attributes.User_Location : " "}</td>
             </tr>
             <tr>
               <th>Balance: </th>
               <td> ${element.attributes.Balance ? element.attributes.Balance : " "}</td>
             </tr>
             <tr>
               <th>Customer_Plan: </th>
               <td> ${element.attributes.Customer_Plan ? element.attributes.Customer_Plan : " "}</td>
             </tr>
            <tr>
             <th>Customer_Segment: </th>
             <td> ${element.attributes.Customer_Segment ? element.attributes.Customer_Segment : " "}</td>
           </tr>
             <tr>
             <th>Ticket_Status: </th>
             <td> ${element.attributes.Ticket_Status ? element.attributes.Ticket_Status : " "}</td>
           </tr>
             <tr>
             <th>Service_Recipient_MSISDN: </th>
             <td> ${element.attributes.Service_Recipient_MSISDN ? element.attributes.Service_Recipient_MSISDN : " "}</td>
            </tr>
             <tr>
             <th>Contact_MSISDN: </th>
             <td> ${element.attributes.Contact_MSISDN ? element.attributes.Contact_MSISDN : " "}</td>
            </tr>
             <tr>
             <th>Approval_Status: </th>
             <td> ${element.attributes.Approval_Status ? element.attributes.Approval_Status : " "}</td>
            </tr>
             <tr>
             <th>Closure_Code: </th>
             <td> ${element.attributes.Closure_Code ? element.attributes.Closure_Code : " "}</td>
            </tr>
             <tr>
             <th>PRODUCT_TYPE: </th>
             <td> ${element.attributes.PRODUCT_TYPE ? element.attributes.PRODUCT_TYPE : " "}</td>
            </tr>
             <tr>
             <th>CMC: </th>
             <td> ${element.attributes.CMC ? element.attributes.CMC : " "}</td>
            </tr>
             <tr>
             <th>CMC_Waiting: </th>
             <td> ${element.attributes.CMC_Waiting ? element.attributes.CMC_Waiting : " "}</td>
            </tr>
             <tr>
             <th>ASIA_CMC_ID </th>
             <td> ${element.attributes.ASIA_CMC_ID ? element.attributes.ASIA_CMC_ID : " "}</td>
            </tr>
             <tr>
             <th>SUBCATEGORY: </th>
             <td> ${element.attributes.SUBCATEGORY ? element.attributes.SUBCATEGORY : " "}</td>
            </tr>
             <tr>
             <th>RATE_PLAN: </th>
             <td> ${element.attributes.RATE_PLAN ? element.attributes.RATE_PLAN : " "}</td>
            </tr>
             <tr>
             <th>AUTO_GOVERNORATE: </th>
             <td> ${element.attributes.AUTO_GOVERNORATE ? element.attributes.AUTO_GOVERNORATE : " "}</td>
            </tr>
           
           </tbody>
         </table>
           `
                // console.log("OutagesData",element.attributes);
              }
            } else {
              document.getElementById("Data_Container_By_Select").innerHTML += `
            <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
            No RFIs Found
            </button>`
            }
          })
          .catch(function (error) {
            // Handle errors
            document.getElementById("Data_Container_By_Select").innerHTML += `
             <button class="accordion-button collapsed border fw-bold text-danger " type="button" >
             No RFIs Found
             </button>`
            console.error("Error performing query:", error);

          });

      } else {
        document.getElementById("Data_Container_By_Select").innerHTML = `<h3 style="color:gray"> No Data Found </h3>`
      }
    }

    // Listen for when the view is stationary.
    // If true, set the table to display only the attributes
    // for the features falling within this extent.

    reactiveUtils.when(
      () => view.stationary,
      () => {
        // Filter out and show only the visible features in the feature table.
        featureTableSites.filterGeometry = view.extent;
        // featureTableHPSMTickets.filterGeometry = view.extent;

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
      // featureTableHPSMTickets.highlightIds.removeAll();
      featureTableSites.highlightIds.removeAll();

      featureTableRFIsFC.highlightIds.removeAll();
      featureTableCCTickets.highlightIds.removeAll();
      featureTableNMSIncident.highlightIds.removeAll();
      featureTableJammerSites.highlightIds.removeAll();
      featureTableCells.highlightIds.removeAll();
      featureTableOutagesData.highlightIds.removeAll();

      candidate = response.results.find((result) => {
        if (result.graphic.layer === sitesFinal) {
          return result.graphic &&
            result.graphic.layer &&
            result.graphic.layer === sitesFinal
        }

        else if (result.graphic.layer === Cell_Site_Data_Jammer_Sites) {
          return result.graphic &&
            result.graphic.layer &&
            result.graphic.layer === Cell_Site_Data_Jammer_Sites

        }

        else if (result.graphic.layer === Cells) {
          return result.graphic &&
            result.graphic.layer &&
            result.graphic.layer === Cells

        }


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
        // console.log("candidate.graphic : ", candidate.layer.title);
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
          // console.log("candidate", candidate);
          const queryParams = {
            where: `OBJECTID = ${objectId}`, // Specify your query criteria
            outFields: ["*"] // Specify the fields you want to retrieve
          };

          sitesFinal.queryFeatures(queryParams)
            .then(function (result) {
              if (result.features.length > 0) {
                getSitesFeatureLayer(result.features[0].attributes.site_id)
              }
            })
            .catch(function (error) {
              // Handle errors
              console.error("Error performing query:", error);
            });
        }

        else if (candidate.layer.title == CellsTitle) {


          if (featureTableCells.highlightIds.includes(objectId)) {
            // Remove feature from current selection if feature
            // is already added to highlightIds collection
            featureTableCells.highlightIds.remove(objectId);
          } else {

            featureTableCells.highlightIds.add(objectId);
          }
          console.log("candidate", candidate);
          const queryParams = {
            where: `OBJECTID = ${objectId}`, // Specify your query criteria
            outFields: ["*"] // Specify the fields you want to retrieve
          };

          Cells.queryFeatures(queryParams)
            .then(function (result) {
              if (result.features.length > 0) {

                getCellsFeatureLayer(result.features[0].attributes.CELLID, result.features[0].attributes.UNIQUEID)
              }
            })
            .catch(function (error) {
              // Handle errors
              console.error("Error performing query:", error);
            });
        }


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

      }
    });

    // Watch the featureTableSites's highlightIds.length property,
    // and get the count of highlighted features within
    // the table.
    ////////////////////////// get CCAffectedService list /////////////////////
    try {
      // Fetch all values for the "" field from the feature layer
      const allValuesResponseCCAffectedService = await CCTicketsFCExportFeatures.queryFeatures();

      // Extract all values from the query response
      const allCCAffectedServiceValues = allValuesResponseCCAffectedService.features.map(feature => feature.attributes.affected_service);

      // Filter out duplicate values locally
      const uniquCCAffectedServiceValues = [...new Set(allCCAffectedServiceValues)];

      // Populate autocomplete options with the unique values
      const autocompleteInputCCAffectedService = document.getElementById("SearchInputAffectedService");
      autocompleteInputCCAffectedService.setAttribute("list", "AffectedServiceList");

      // Check if datalist already exists
      let datalist = document.getElementById("AffectedServiceList");
      if (!datalist) {
        datalist = document.createElement("datalist");
        datalist.id = "AffectedServiceList";
        document.body.appendChild(datalist);
      } else {
        // Clear existing options
        datalist.innerHTML = '';
      }

      // Add unique values to the datalist
      uniquCCAffectedServiceValues.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        datalist.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching CCAffectedService values:", error);
    }

    ///////////////////////////////////////////////////////////////
    ////////////////////////// get CCSubcategory list /////////////////////
    try {
      // Fetch all values for the "" field from the feature layer
      const allValuesResponseCCSubcategory = await CCTicketsFCExportFeatures.queryFeatures();

      // Extract all values from the query response
      const allCCSubcategoryValues = allValuesResponseCCSubcategory.features.map(feature => feature.attributes.subcategory);

      // Filter out duplicate values locally
      const uniquCCSubcategoryValues = [...new Set(allCCSubcategoryValues)];

      // Populate autocomplete options with the unique values
      const autocompleteInputCCSubcategory = document.getElementById("SearchInputCCSubcategory");
      autocompleteInputCCSubcategory.setAttribute("list", "CCSubcategoryList");

      // Check if datalist already exists
      let datalist = document.getElementById("CCSubcategoryList");
      if (!datalist) {
        datalist = document.createElement("datalist");
        datalist.id = "CCSubcategoryList";
        document.body.appendChild(datalist);
      } else {
        // Clear existing options
        datalist.innerHTML = '';
      }

      // Add unique values to the datalist
      uniquCCSubcategoryValues.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        datalist.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching CCSubcategory values:", error);
    }

    ///////////////////////////////////////////////////////////////

    ////////////////////////// get CCArea list /////////////////////
    try {
      // Fetch all values for the "" field from the feature layer
      const allValuesResponseCCArea = await CCTicketsFCExportFeatures.queryFeatures();

      // Extract all values from the query response
      const allCCAreaValues = allValuesResponseCCArea.features.map(feature => feature.attributes.areaa);

      // Filter out duplicate values locally
      const uniquCCAreaValues = [...new Set(allCCAreaValues)];

      // Populate autocomplete options with the unique values
      const autocompleteInputCCArea = document.getElementById("SearchInputCCArea");
      autocompleteInputCCArea.setAttribute("list", "CCAreaList");

      // Check if datalist already exists
      let datalist = document.getElementById("CCAreaList");
      if (!datalist) {
        datalist = document.createElement("datalist");
        datalist.id = "CCAreaList";
        document.body.appendChild(datalist);
      } else {
        // Clear existing options
        datalist.innerHTML = '';
      }

      // Add unique values to the datalist
      uniquCCAreaValues.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        datalist.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching CCSubcategory values:", error);
    }

    ///////////////////////////////////////////////////////////////
    // Add an event listener to the first input list to filter the second input list
    document.getElementById("SearchInputAffectedService").addEventListener("input", async function () {
      try {
        const allValuesResponseCCSubcategory = await CCTicketsFCExportFeatures.queryFeatures();
        const selectedAffectedService = this.value; // Get the selected value
        if (selectedAffectedService) {
          const filteredCCSubcategoryValues = allValuesResponseCCSubcategory.features
            .filter(feature => feature.attributes.affected_service === selectedAffectedService) // Filter by the selected value
            .map(feature => feature.attributes.subcategory); // Extract subcategory values

          // Clear existing options
          const datalist = document.getElementById("CCSubcategoryList");
          datalist.innerHTML = '';

          // Add unique filtered values to the datalist
          const uniqueFilteredCCSubcategoryValues = [...new Set(filteredCCSubcategoryValues)];
          uniqueFilteredCCSubcategoryValues.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            datalist.appendChild(option);
          });
        } else {
          const allValuesResponseCCSubcategory = await CCTicketsFCExportFeatures.queryFeatures();

          // Extract all values from the query response
          const allCCSubcategoryValues = allValuesResponseCCSubcategory.features.map(feature => feature.attributes.subcategory);

          // Filter out duplicate values locally
          const uniquCCSubcategoryValues = [...new Set(allCCSubcategoryValues)];

          // Populate autocomplete options with the unique values
          const autocompleteInputCCSubcategory = document.getElementById("SearchInputCCSubcategory");
          autocompleteInputCCSubcategory.setAttribute("list", "CCSubcategoryList");

          // Check if datalist already exists
          let datalist = document.getElementById("CCSubcategoryList");
          if (!datalist) {
            datalist = document.createElement("datalist");
            datalist.id = "CCSubcategoryList";
            document.body.appendChild(datalist);
          } else {
            // Clear existing options
            datalist.innerHTML = '';
          }

          // Add unique values to the datalist
          uniquCCSubcategoryValues.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            datalist.appendChild(option);
          });
        }

      } catch (error) {
        console.error("Error filtering CCSubcategory values:", error);
      }
    });
    // Add an event listener to the first input list to filter the second input list
    document.getElementById("SearchInputCCSubcategory").addEventListener("input", async function () {
      try {
        const allValuesResponseCCArea = await CCTicketsFCExportFeatures.queryFeatures();
        const selectedCCArea = this.value; // Get the selected value
        if (selectedCCArea) {
          const filteredCCAreaValues = allValuesResponseCCArea.features
            .filter(feature => feature.attributes.subcategory === selectedCCArea) // Filter by the selected value
            .map(feature => feature.attributes.areaa); // Extract subcategory values

          // Clear existing options
          const datalist = document.getElementById("CCAreaList");
          datalist.innerHTML = '';

          // Add unique filtered values to the datalist
          const uniqueFilteredCCAreaValues = [...new Set(filteredCCAreaValues)];
          uniqueFilteredCCAreaValues.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            datalist.appendChild(option);
          });
        } else {
          // Fetch all values for the "" field from the feature layer
          const allValuesResponseCCArea = await CCTicketsFCExportFeatures.queryFeatures();

          // Extract all values from the query response
          const allCCAreaValues = allValuesResponseCCArea.features.map(feature => feature.attributes.areaa);

          // Filter out duplicate values locally
          const uniquCCAreaValues = [...new Set(allCCAreaValues)];

          // Populate autocomplete options with the unique values
          const autocompleteInputCCArea = document.getElementById("SearchInputCCArea");
          autocompleteInputCCArea.setAttribute("list", "CCAreaList");

          // Check if datalist already exists
          let datalist = document.getElementById("CCAreaList");
          if (!datalist) {
            datalist = document.createElement("datalist");
            datalist.id = "CCAreaList";
            document.body.appendChild(datalist);
          } else {
            // Clear existing options
            datalist.innerHTML = '';
          }

          // Add unique values to the datalist
          uniquCCAreaValues.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            datalist.appendChild(option);
          });
        }

      } catch (error) {
        console.error("Error filtering CCArea values:", error);
      }
    });

    ////////////////////////// get RFIProductType list /////////////////////
    try {
      // Fetch all values for the "" field from the feature layer
      const allValuesResponseRFIProductType = await RFIsFC.queryFeatures(
        //   {
        //   where :'PRODUCT_TYPE IS NOT NULL'
        // }
      );

      // Extract all values from the query response
      const allRFIProductTypeValues = allValuesResponseRFIProductType.features.map(feature => feature.attributes.PRODUCT_TYPE);

      // Filter out duplicate values locally
      const uniquRFIProductTypeValues = [...new Set(allRFIProductTypeValues)];

      // Populate autocomplete options with the unique values
      const autocompleteInputRFIProductType = document.getElementById("SearchInputProductType");
      autocompleteInputRFIProductType.setAttribute("list", "RFIProductTypeList");

      // Check if datalist already exists
      let datalist = document.getElementById("RFIProductTypeList");
      if (!datalist) {
        datalist = document.createElement("datalist");
        datalist.id = "RFIProductTypeList";
        document.body.appendChild(datalist);
      } else {
        // Clear existing options
        datalist.innerHTML = '';
      }

      // Add unique values to the datalist
      uniquRFIProductTypeValues.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        datalist.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching RFIProductType values:", error);
    }

    ///////////////////////////////////////////////////////////////
    ////////////////////////// get RFIsSubcategory list /////////////////////
    try {
      // Fetch all values for the "" field from the feature layer
      const allValuesResponseRFIsSubcategory = await RFIsFC.queryFeatures(
        //   {
        //   where :'SUBCATEGORY IS NOT NULL'
        // }
      );

      // Extract all values from the query response
      const allRFIsSubcategoryValues = allValuesResponseRFIsSubcategory.features.map(feature => feature.attributes.SUBCATEGORY);

      // Filter out duplicate values locally
      const uniqeRFIsSubcategoryValues = [...new Set(allRFIsSubcategoryValues)];

      // Populate autocomplete options with the unique values
      const autocompleteInputRFIsSubcategory = document.getElementById("SearchInputRFIsSubcategory");
      autocompleteInputRFIsSubcategory.setAttribute("list", "RFIsSubcategoryList");

      // Check if datalist already exists
      let datalist = document.getElementById("RFIsSubcategoryList");
      if (!datalist) {
        datalist = document.createElement("datalist");
        datalist.id = "RFIsSubcategoryList";
        document.body.appendChild(datalist);
      } else {
        // Clear existing options
        datalist.innerHTML = '';
      }

      // Add unique values to the datalist
      uniqeRFIsSubcategoryValues.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        datalist.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching RFIsSubcategory values:", error);
    }

    ///////////////////////////////////////////////////////////////
    ////////////////////////// get RFIsArea list /////////////////////
    try {
      // Fetch all values for the "" field from the feature layer
      const allValuesResponseRFIsArea = await RFIsFC.queryFeatures(
        //   {
        //   where :'SUBCATEGORY IS NOT NULL'
        // }
      );

      // Extract all values from the query response
      const allRFIsAreaValues = allValuesResponseRFIsArea.features.map(feature => feature.attributes.Affected_Service);

      // Filter out duplicate values locally
      const uniqeRFIsAreaValues = [...new Set(allRFIsAreaValues)];

      // Populate autocomplete options with the unique values
      const autocompleteInputRFIsArea = document.getElementById("SearchInputRFIsArea");
      autocompleteInputRFIsArea.setAttribute("list", "RFIsAreaList");

      // Check if datalist already exists
      let datalist = document.getElementById("RFIsAreaList");
      if (!datalist) {
        datalist = document.createElement("datalist");
        datalist.id = "RFIsAreaList";
        document.body.appendChild(datalist);
      } else {
        // Clear existing options
        datalist.innerHTML = '';
      }

      // Add unique values to the datalist
      uniqeRFIsAreaValues.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        datalist.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching RFIsArea values:", error);
    }

    ///////////////////////////////////////////////////////////////
    // Add an event listener to the first input list to filter the second input list
    document.getElementById("SearchInputProductType").addEventListener("input", async function () {
      try {
        const allValuesResponseRFIsSubcategory = await RFIsFC.queryFeatures();
        const selectedRFIsProductType = this.value; // Get the selected value
        if (selectedRFIsProductType) {
          const filteredRFIsSubcategoryValues = allValuesResponseRFIsSubcategory.features
            .filter(feature => feature.attributes.PRODUCT_TYPE === selectedRFIsProductType) // Filter by the selected value
            .map(feature => feature.attributes.SUBCATEGORY); // Extract subcategory values

          // Clear existing options
          const datalist = document.getElementById("RFIsSubcategoryList");
          datalist.innerHTML = '';

          // Add unique filtered values to the datalist
          const uniqueFilteredRFIsSubcategoryValues = [...new Set(filteredRFIsSubcategoryValues)];
          uniqueFilteredRFIsSubcategoryValues.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            datalist.appendChild(option);
          });
        } else {
          // Fetch all values for the "" field from the feature layer
          const allValuesResponseRFIsSubcategory = await RFIsFC.queryFeatures(
            //   {
            //   where :'SUBCATEGORY IS NOT NULL'
            // }
          );

          // Extract all values from the query response
          const allRFIsSubcategoryValues = allValuesResponseRFIsSubcategory.features.map(feature => feature.attributes.SUBCATEGORY);

          // Filter out duplicate values locally
          const uniqeRFIsSubcategoryValues = [...new Set(allRFIsSubcategoryValues)];

          // Populate autocomplete options with the unique values
          const autocompleteInputRFIsSubcategory = document.getElementById("SearchInputRFIsSubcategory");
          autocompleteInputRFIsSubcategory.setAttribute("list", "RFIsSubcategoryList");

          // Check if datalist already exists
          let datalist = document.getElementById("RFIsSubcategoryList");
          if (!datalist) {
            datalist = document.createElement("datalist");
            datalist.id = "RFIsSubcategoryList";
            document.body.appendChild(datalist);
          } else {
            // Clear existing options
            datalist.innerHTML = '';
          }

          // Add unique values to the datalist
          uniqeRFIsSubcategoryValues.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            datalist.appendChild(option);
          });
        }

      } catch (error) {
        console.error("Error filtering CCSubcategory values:", error);
      }
    });
    // Add an event listener to the first input list to filter the second input list
    document.getElementById("SearchInputRFIsSubcategory").addEventListener("input", async function () {
      try {
        const allValuesResponseRFIsArea = await RFIsFC.queryFeatures();
        const selectedRFIsSubcategory = this.value; // Get the selected value
        if (selectedRFIsSubcategory) {
          const filteredRFIsAreaValues = allValuesResponseRFIsArea.features
            .filter(feature => feature.attributes.SUBCATEGORY === selectedRFIsSubcategory) // Filter by the selected value
            .map(feature => feature.attributes.Affected_Service); // Extract subcategory values

          // Clear existing options
          const datalist = document.getElementById("RFIsAreaList");
          datalist.innerHTML = '';

          // Add unique filtered values to the datalist
          const uniqueFilteredRFIsAreaValues = [...new Set(filteredRFIsAreaValues)];
          uniqueFilteredRFIsAreaValues.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            datalist.appendChild(option);
          });
        } else {
          const allValuesResponseRFIsArea = await RFIsFC.queryFeatures(
            //   {
            //   where :'SUBCATEGORY IS NOT NULL'
            // }
          );

          // Extract all values from the query response
          const allRFIsAreaValues = allValuesResponseRFIsArea.features.map(feature => feature.attributes.Affected_Service);

          // Filter out duplicate values locally
          const uniqeRFIsAreaValues = [...new Set(allRFIsAreaValues)];

          // Populate autocomplete options with the unique values
          const autocompleteInputRFIsArea = document.getElementById("SearchInputRFIsArea");
          autocompleteInputRFIsArea.setAttribute("list", "RFIsAreaList");

          // Check if datalist already exists
          let datalist = document.getElementById("RFIsAreaList");
          if (!datalist) {
            datalist = document.createElement("datalist");
            datalist.id = "RFIsAreaList";
            document.body.appendChild(datalist);
          } else {
            // Clear existing options
            datalist.innerHTML = '';
          }

          // Add unique values to the datalist
          uniqeRFIsAreaValues.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            datalist.appendChild(option);
          });
        }

      } catch (error) {
        console.error("Error filtering CCArea values:", error);
      }
    });
    ////////////////////////// get OutagesAffectedService list /////////////////////
    try {
      // Fetch all values for the "" field from the feature layer
      const allValuesResponseOutagesAffectedService = await featureLayerOutagesData.queryFeatures(
        //   {
        //   where :'SUBCATEGORY IS NOT NULL'
        // }
      );

      // Extract all values from the query response
      const allOutagesAffectedServiceValues = allValuesResponseOutagesAffectedService.features.map(feature => feature.attributes.service_affected);

      // Filter out duplicate values locally
      const uniqeOutagesAffectedServiceValues = [...new Set(allOutagesAffectedServiceValues)];

      // Populate autocomplete options with the unique values
      const autocompleteInputOutagesAffectedService = document.getElementById("SearchInputOutagesAffectedService");
      autocompleteInputOutagesAffectedService.setAttribute("list", "OutagesAffectedServiceList");

      // Check if datalist already exists
      let datalist = document.getElementById("OutagesAffectedServiceList");
      if (!datalist) {
        datalist = document.createElement("datalist");
        datalist.id = "OutagesAffectedServiceList";
        document.body.appendChild(datalist);
      } else {
        // Clear existing options
        datalist.innerHTML = '';
      }

      // Add unique values to the datalist
      uniqeOutagesAffectedServiceValues.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        datalist.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching OutagesAffectedService values:", error);
    }

    ///////////////////////////////////////////////////////////////
    ////////////////////////// get OutagesSiteID list /////////////////////
    try {
      // Fetch all values for the "" field from the feature layer
      const allValuesResponseOutagesSiteID = await featureLayerOutagesData.queryFeatures(
        //   {
        //   where :'SUBCATEGORY IS NOT NULL'
        // }
      );

      // Extract all values from the query response
      const allOutagesSiteIDValues = allValuesResponseOutagesSiteID.features.map(feature => feature.attributes.site_id);

      // Filter out duplicate values locally
      const uniqeOutagesSiteIDValues = [...new Set(allOutagesSiteIDValues)];

      // Populate autocomplete options with the unique values
      const autocompleteInputOutagesSiteID = document.getElementById("SearchInputOutagesCellID");
      autocompleteInputOutagesSiteID.setAttribute("list", "OutagesSiteIDList");

      // Check if datalist already exists
      let datalist = document.getElementById("OutagesSiteIDList");
      if (!datalist) {
        datalist = document.createElement("datalist");
        datalist.id = "OutagesSiteIDList";
        document.body.appendChild(datalist);
      } else {
        // Clear existing options
        datalist.innerHTML = '';
      }

      // Add unique values to the datalist
      uniqeOutagesSiteIDValues.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        datalist.appendChild(option);
      });
    } catch (error) {
      console.error("Error fetching OutagesSiteID values:", error);
    }

    ///////////////////////////////////////////////////////////////
    const SearchInputAffectedService = document.getElementById("SearchInputAffectedService");
    const buttonSearchInputAffectedService = document.getElementById("button-SearchInputAffectedService");
    buttonSearchInputAffectedService.addEventListener("click", async () => {
      const value = SearchInputAffectedService.value;
      console.log(value);
      // Ensure featureTableOutagesData and featureLayerOutagesData are properly initialized
      try {
        showLoader();
        // Clear existing highlights
        if (value) {
          handles.removeAll();
          // featureTableHPSMTickets.highlightIds.removeAll();
          featureTableSites.highlightIds.removeAll();
          featureTableRFIsFC.highlightIds.removeAll();
          featureTableCCTickets.highlightIds.removeAll();
          featureTableNMSIncident.highlightIds.removeAll();
          featureTableJammerSites.highlightIds.removeAll();
          featureTableCells.highlightIds.removeAll();
          featureTableOutagesData.highlightIds.removeAll();
          const arrSites = [];
          const arrCells = [];
          const queryParams = {
            where: `affected_service = '${value}'`, // Specify your query criteria
            outFields: ["*"] // Specify the fields you want to retrieve
          };

          // Query features
          const resultCCTickets = await CCTicketsFCExportFeatures.queryFeatures(queryParams);

          // Handle the query result
          resultCCTickets.features.forEach(async (feature) => {
            arrSites.push(feature.attributes.siteid);
            arrCells.push(feature.attributes.cgi);
            const objectId = feature.attributes.OBJECTID; // Access objectId directly from feature.attributes
            if (!featureTableCCTickets.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTableCCTickets.highlightIds.add(objectId);
            }
          });
          if (arrCells.length > 0) {
            // console.log(feature.attributes.original_event_time);
            const queryParamsCells = {
              where: "UNIQUEID IN ('" + arrCells.join("','") + "')", // Specify your query criteria
              outFields: ["*"],// Specify the fields you want to retrieve
              returnGeometry: true,
            };
            const resultCells = await Cells.queryFeatures(queryParamsCells);
            resultCells.features.forEach(async (feature) => {
              const objectId = feature.attributes.OBJECTID;
              if (!featureTableCells.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableCells.highlightIds.add(objectId);
              }
            })
      
          }
          if (arrSites.length > 0) {
            const queryParamsSites = {

              where: "site_id IN ('" + arrSites.join("','") + "')", // Specify your query criteria
              outFields: ["*"] ,// Specify the fields you want to retrieve
              returnGeometry: true,
            };

            const resultSites = await sitesFinal.queryFeatures(queryParamsSites);
            resultSites.features.forEach(async (feature) => {

              const objectId = feature.attributes.OBJECTID;
              if (!featureTableSites.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableSites.highlightIds.add(objectId);
              }
            })
            // Zoom to the extent of the query result
            if (resultSites.features.length > 0) {
              // const extent = esri.geometry.Extent.fromJSON(result.features[0].geometry.extent);
              console.log(resultSites.features[0]);
              // view.goTo(extent);
              view.goTo({
                target: resultSites.features[0].geometry,
                zoom: 13
              });
            }

          }
        }

      } catch (error) {
        console.error("Error querying features:", error);
      } finally {
        hideLoader();
      }
    });

    const SearchInputCCSubcategory = document.getElementById("SearchInputCCSubcategory");
    const buttonSearchInputCCSubcategory = document.getElementById("button-SearchInputCCSubcategory");
    buttonSearchInputCCSubcategory.addEventListener("click", async () => {
      const value = SearchInputCCSubcategory.value;
      console.log(value);
      try {
        showLoader();
        if (value) {

          // Clear existing highlights
          handles.removeAll();
          // featureTableHPSMTickets.highlightIds.removeAll();
          featureTableSites.highlightIds.removeAll();
          featureTableRFIsFC.highlightIds.removeAll();
          featureTableCCTickets.highlightIds.removeAll();
          featureTableNMSIncident.highlightIds.removeAll();
          featureTableJammerSites.highlightIds.removeAll();
          featureTableCells.highlightIds.removeAll();
          featureTableOutagesData.highlightIds.removeAll();
          const arrSites = [];
          const arrCells = [];
          const queryParams = {
            where: `subcategory = '${value}'`, // Specify your query criteria
            outFields: ["*"] // Specify the fields you want to retrieve
          };

          // Query features
          const resultCCTickets = await CCTicketsFCExportFeatures.queryFeatures(queryParams);

          // Handle the query result
          resultCCTickets.features.forEach(async (feature) => {
            arrSites.push(feature.attributes.siteid);
            arrCells.push(feature.attributes.cgi);
            const objectId = feature.attributes.OBJECTID; // Access objectId directly from feature.attributes
            if (!featureTableCCTickets.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTableCCTickets.highlightIds.add(objectId);
            }
          });

          if (arrCells.length > 0) {
            // console.log(feature.attributes.original_event_time);
            const queryParamsCells = {
              where: "UNIQUEID IN ('" + arrCells.join("','") + "')", // Specify your query criteria
              outFields: ["*"],// Specify the fields you want to retrieve
              returnGeometry: true,
            };
            const resultCells = await Cells.queryFeatures(queryParamsCells);
            resultCells.features.forEach(async (feature) => {
              const objectId = feature.attributes.OBJECTID;
              if (!featureTableCells.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableCells.highlightIds.add(objectId);
              }
            })
      
          }
          if (arrSites.length > 0) {
            const queryParamsSites = {
              where: "site_id IN ('" + arrSites.join("','") + "')", // Specify your query criteria
              outFields: ["*"] ,// Specify the fields you want to retrieve
              returnGeometry: true,
            };

            const resultSites = await sitesFinal.queryFeatures(queryParamsSites);
            resultSites.features.forEach(async (feature) => {

              const objectId = feature.attributes.OBJECTID;
              if (!featureTableSites.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableSites.highlightIds.add(objectId);
              }
            })

            // Zoom to the extent of the query result
            if (resultSites.features.length > 0) {
              // const extent = esri.geometry.Extent.fromJSON(result.features[0].geometry.extent);
              console.log(resultSites.features[0]);
              // view.goTo(extent);
              view.goTo({
                target: resultSites.features[0].geometry,
                zoom: 13
              });
            }
          }
        }
      } catch (error) {
        console.error("Error querying features:", error);
      } finally {
        hideLoader();
      }
    });

    const SearchInputCCArea = document.getElementById("SearchInputCCArea");
    const buttonSearchInputCCArea = document.getElementById("button-SearchInputCCArea");
    buttonSearchInputCCArea.addEventListener("click", async () => {
      const value = SearchInputCCArea.value;
      console.log(value);
      try {
        showLoader();
        if (value) {
          // Clear existing highlights
          handles.removeAll();
          // featureTableHPSMTickets.highlightIds.removeAll();
          featureTableSites.highlightIds.removeAll();
          featureTableRFIsFC.highlightIds.removeAll();
          featureTableCCTickets.highlightIds.removeAll();
          featureTableNMSIncident.highlightIds.removeAll();
          featureTableJammerSites.highlightIds.removeAll();
          featureTableCells.highlightIds.removeAll();
          featureTableOutagesData.highlightIds.removeAll();
          const arrSites = [];
          const arrCells = [];
          const queryParamsCCTickets = {
            where: `areaa = '${value}'`, // Specify your query criteria
            outFields: ["*"] // Specify the fields you want to retrieve
          };

          // Query features
          const resultCCTickets = await CCTicketsFCExportFeatures.queryFeatures(queryParamsCCTickets);

          // Handle the query result
          resultCCTickets.features.forEach(async (feature) => {
            arrSites.push(feature.attributes.siteid);
            arrCells.push(feature.attributes.cgi);
            const objectId = feature.attributes.OBJECTID; // Access objectId directly from feature.attributes
            if (!featureTableCCTickets.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTableCCTickets.highlightIds.add(objectId);
            }
          });
          if (arrCells.length > 0) {
            // console.log(feature.attributes.original_event_time);
            const queryParamsCells = {
              where: "UNIQUEID IN ('" + arrCells.join("','") + "')", // Specify your query criteria
              outFields: ["*"],// Specify the fields you want to retrieve
              returnGeometry: true,
            };
            const resultCells = await Cells.queryFeatures(queryParamsCells);
            resultCells.features.forEach(async (feature) => {
              const objectId = feature.attributes.OBJECTID;
              if (!featureTableCells.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableCells.highlightIds.add(objectId);
              }
            })
      
          }
          if (arrSites.length > 0) {
            const queryParamsSites = {
              where: "site_id IN ('" + arrSites.join("','") + "')", // Specify your query criteria
              outFields: ["*"] ,// Specify the fields you want to retrieve
              returnGeometry: true,
            };

            const resultSites = await sitesFinal.queryFeatures(queryParamsSites);
            resultSites.features.forEach(async (feature) => {

              const objectId = feature.attributes.OBJECTID;
              if (!featureTableSites.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableSites.highlightIds.add(objectId);
              }
            })

            // Zoom to the extent of the query result
            if (resultSites.features.length > 0) {
              // const extent = esri.geometry.Extent.fromJSON(result.features[0].geometry.extent);
              console.log(resultSites.features[0]);
              // view.goTo(extent);
              view.goTo({
                target: resultSites.features[0].geometry,
                zoom: 13
              });
            }
          }
        }

      } catch (error) {
        console.error("Error querying features:", error);
      } finally {
        hideLoader();
      }

    });

    const SearchInputProductType = document.getElementById("SearchInputProductType");
    const buttonSearchInputProductType = document.getElementById("button-SearchInputProductType");
    buttonSearchInputProductType.addEventListener("click", async () => {
      const value = SearchInputProductType.value;
      console.log(value);
      try {
        showLoader();
        if (value) {
          // Clear existing highlights
          handles.removeAll();
          // featureTableHPSMTickets.highlightIds.removeAll();
          featureTableSites.highlightIds.removeAll();
          featureTableRFIsFC.highlightIds.removeAll();
          featureTableCCTickets.highlightIds.removeAll();
          featureTableNMSIncident.highlightIds.removeAll();
          featureTableJammerSites.highlightIds.removeAll();
          featureTableCells.highlightIds.removeAll();
          featureTableOutagesData.highlightIds.removeAll();
          const arrSites = [];
          const arrCells = [];
          const queryParams = {
            where: `PRODUCT_TYPE = '${value}'`, // Specify your query criteria
            outFields: ["*"] // Specify the fields you want to retrieve
          };

          // Query features
          const resultRFIsFC = await RFIsFC.queryFeatures(queryParams);

          // Handle the query result
          resultRFIsFC.features.forEach(async (feature) => {
            arrCells.push(feature.attributes.cgi);
            const objectId = feature.attributes.OBJECTID; // Access objectId directly from feature.attributes
            if (!featureTableRFIsFC.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTableRFIsFC.highlightIds.add(objectId);
            }
          });

          if (arrCells.length > 0) {
            // console.log(feature.attributes.original_event_time);
            const queryParamsCells = {
              where: "UNIQUEID IN ('" + arrCells.join("','") + "')", // Specify your query criteria
              outFields: ["*"],// Specify the fields you want to retrieve
              returnGeometry: true,
            };
            const resultCells = await Cells.queryFeatures(queryParamsCells);
            resultCells.features.forEach(async (feature) => {
              arrSites.push(feature.attributes.SITEID);
              const objectId = feature.attributes.OBJECTID;
              if (!featureTableCells.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableCells.highlightIds.add(objectId);
              }
            })
      
          }
          if (arrSites.length > 0) {
            const queryParamsSites = {
              where: "site_id IN ('" + arrSites.join("','") + "')", // Specify your query criteria
              outFields: ["*"] ,// Specify the fields you want to retrieve
              returnGeometry: true,
            };

            const resultSites = await sitesFinal.queryFeatures(queryParamsSites);
            resultSites.features.forEach(async (feature) => {

              const objectId = feature.attributes.OBJECTID;
              if (!featureTableSites.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableSites.highlightIds.add(objectId);
              }
            })

            // Zoom to the extent of the query result
            if (resultSites.features.length > 0) {
              // const extent = esri.geometry.Extent.fromJSON(result.features[0].geometry.extent);
              console.log(resultSites.features[0]);
              // view.goTo(extent);
              view.goTo({
                target: resultSites.features[0].geometry,
                zoom: 13
              });
            }
          }
        }
      } catch (error) {
        console.error("Error querying features:", error);
      } finally {
        hideLoader();
      }
    });

    const SearchInputRFIsSubcategory = document.getElementById("SearchInputRFIsSubcategory");
    const buttonSearchInputRFIsSubcategory = document.getElementById("button-SearchInputRFIsSubcategory");
    buttonSearchInputRFIsSubcategory.addEventListener("click", async () => {
      const value = SearchInputRFIsSubcategory.value;
      console.log(value);
      try {
        showLoader();
        if (value) {
          // Clear existing highlights
          handles.removeAll();
          // featureTableHPSMTickets.highlightIds.removeAll();
          featureTableSites.highlightIds.removeAll();
          featureTableRFIsFC.highlightIds.removeAll();
          featureTableCCTickets.highlightIds.removeAll();
          featureTableNMSIncident.highlightIds.removeAll();
          featureTableJammerSites.highlightIds.removeAll();
          featureTableCells.highlightIds.removeAll();
          featureTableOutagesData.highlightIds.removeAll();
          const arrSites = [];
          const arrCells = [];
          const queryParams = {
            where: `SUBCATEGORY = '${value}'`, // Specify your query criteria
            outFields: ["*"] // Specify the fields you want to retrieve
          };

          // Query features
          const result = await RFIsFC.queryFeatures(queryParams);

          // Handle the query result
          result.features.forEach(async (feature) => {
            arrCells.push(feature.attributes.cgi);
            const objectId = feature.attributes.OBJECTID; // Access objectId directly from feature.attributes
            if (!featureTableRFIsFC.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTableRFIsFC.highlightIds.add(objectId);
            }
          });

          if (arrCells.length > 0) {
            // console.log(feature.attributes.original_event_time);
            const queryParamsCells = {
              where: "UNIQUEID IN ('" + arrCells.join("','") + "')", // Specify your query criteria
              outFields: ["*"],// Specify the fields you want to retrieve
              returnGeometry: true,
            };
            const resultCells = await Cells.queryFeatures(queryParamsCells);
            resultCells.features.forEach(async (feature) => {
              arrSites.push(feature.attributes.SITEID);
              const objectId = feature.attributes.OBJECTID;
              if (!featureTableCells.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableCells.highlightIds.add(objectId);
              }
            })
      
          }
          if (arrSites.length > 0) {
            const queryParamsSites = {
              where: "site_id IN ('" + arrSites.join("','") + "')", // Specify your query criteria
              outFields: ["*"] ,// Specify the fields you want to retrieve
              returnGeometry: true,
            };

            const resultSites = await sitesFinal.queryFeatures(queryParamsSites);
            resultSites.features.forEach(async (feature) => {

              const objectId = feature.attributes.OBJECTID;
              if (!featureTableSites.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableSites.highlightIds.add(objectId);
              }
            })

            // Zoom to the extent of the query result
            if (resultSites.features.length > 0) {
              // const extent = esri.geometry.Extent.fromJSON(result.features[0].geometry.extent);
              console.log(resultSites.features[0]);
              // view.goTo(extent);
              view.goTo({
                target: resultSites.features[0].geometry,
                zoom: 13
              });
            }
          }
        }
      } catch (error) {
        console.error("Error querying features:", error);
      } finally {
        hideLoader();
      }
    });

    const SearchInputRFIsArea = document.getElementById("SearchInputRFIsArea");
    const buttonSearchInputRFIsArea = document.getElementById("button-SearchInputRFIsArea");
    buttonSearchInputRFIsArea.addEventListener("click", async () => {
      const value = SearchInputRFIsArea.value;
      console.log(value);
      try {
        showLoader();
        if (value) {
          // Clear existing highlights
          handles.removeAll();
          // featureTableHPSMTickets.highlightIds.removeAll();
          featureTableSites.highlightIds.removeAll();
          featureTableRFIsFC.highlightIds.removeAll();
          featureTableCCTickets.highlightIds.removeAll();
          featureTableNMSIncident.highlightIds.removeAll();
          featureTableJammerSites.highlightIds.removeAll();
          featureTableCells.highlightIds.removeAll();
          featureTableOutagesData.highlightIds.removeAll();
          const arrSites = [];
          const arrCells = [];
          const queryParams = {
            where: `Affected_Service = '${value}'`, // Specify your query criteria
            outFields: ["*"] // Specify the fields you want to retrieve
          };

          // Query features
          const result = await RFIsFC.queryFeatures(queryParams);

          // Handle the query result
          result.features.forEach(async (feature) => {
            arrCells.push(feature.attributes.cgi);
            const objectId = feature.attributes.OBJECTID; // Access objectId directly from feature.attributes
            if (!featureTableRFIsFC.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTableRFIsFC.highlightIds.add(objectId);
            }
          });

          if (arrCells.length > 0) {
            // console.log(feature.attributes.original_event_time);
            const queryParamsCells = {
              where: "UNIQUEID IN ('" + arrCells.join("','") + "')", // Specify your query criteria
              outFields: ["*"],// Specify the fields you want to retrieve
              returnGeometry: true,
            };
            const resultCells = await Cells.queryFeatures(queryParamsCells);
            resultCells.features.forEach(async (feature) => {
              arrSites.push(feature.attributes.SITEID);
              const objectId = feature.attributes.OBJECTID;
              if (!featureTableCells.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableCells.highlightIds.add(objectId);
              }
            })
      
          }
          if (arrSites.length > 0) {
            const queryParamsSites = {
              where: "site_id IN ('" + arrSites.join("','") + "')", // Specify your query criteria
              outFields: ["*"] ,// Specify the fields you want to retrieve
              returnGeometry: true,
            };

            const resultSites = await sitesFinal.queryFeatures(queryParamsSites);
            resultSites.features.forEach(async (feature) => {

              const objectId = feature.attributes.OBJECTID;
              if (!featureTableSites.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableSites.highlightIds.add(objectId);
              }
            })

            // Zoom to the extent of the query result
            if (resultSites.features.length > 0) {
              // const extent = esri.geometry.Extent.fromJSON(result.features[0].geometry.extent);
              console.log(resultSites.features[0]);
              // view.goTo(extent);
              view.goTo({
                target: resultSites.features[0].geometry,
                zoom: 13
              });
            }
          }

        }
      } catch (error) {
        console.error("Error querying features:", error);
      } finally {
        hideLoader();
      }
    });

    const SearchInputOutagesAffectedService = document.getElementById("SearchInputOutagesAffectedService");
    const buttonSearchInputOutagesAffectedService = document.getElementById("button-SearchInputOutagesAffectedService");
    buttonSearchInputOutagesAffectedService.addEventListener("click", async () => {
      const value = SearchInputOutagesAffectedService.value;
      console.log(value);
      // Ensure featureTableOutagesData and featureLayerOutagesData are properly initialized
      try {
        showLoader();
        if (value) {
          // Clear existing highlights
          handles.removeAll();
          // featureTableHPSMTickets.highlightIds.removeAll();
          featureTableSites.highlightIds.removeAll();
          featureTableRFIsFC.highlightIds.removeAll();
          featureTableCCTickets.highlightIds.removeAll();
          featureTableNMSIncident.highlightIds.removeAll();
          featureTableJammerSites.highlightIds.removeAll();
          featureTableCells.highlightIds.removeAll();
          featureTableOutagesData.highlightIds.removeAll();
          const arrSites = [];
          const arrCells = [];
          const queryParams = {
            where: `service_affected = ${value}`, // Specify your query criteria
            outFields: ["*"] // Specify the fields you want to retrieve
          };

          // Query features
          const result = await featureLayerOutagesData.queryFeatures(queryParams);

          // Handle the query result
          result.features.forEach(async (feature) => {
            arrSites.push(feature.attributes.site_id);
            arrCells.push(feature.attributes.cell_id);
            const objectId = feature.attributes.OBJECTID; // Access objectId directly from feature.attributes
            if (featureTableOutagesData.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTableOutagesData.highlightIds.remove(objectId);
            } else {
              featureTableOutagesData.highlightIds.add(objectId);
            }
          });

          if (arrCells.length > 0) {
            const queryParamsCells = {
              where: "CELLID IN ('" + arrCells.join("','") + "')", // Specify your query criteria
              outFields: ["*"],// Specify the fields you want to retrieve
              returnGeometry: true,
            };
            const resultCells = await Cells.queryFeatures(queryParamsCells);
            resultCells.features.forEach(async (feature) => {
              const objectId = feature.attributes.OBJECTID;
              if (!featureTableCells.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableCells.highlightIds.add(objectId);
              }
            })
          }

          if (arrSites.length > 0) {
            const queryParamsSites = {
              where: "site_id IN ('" + arrSites.join("','") + "')", // Specify your query criteria
              outFields: ["*"] ,// Specify the fields you want to retrieve
              returnGeometry: true,
            };

            const resultSites = await sitesFinal.queryFeatures(queryParamsSites);
            resultSites.features.forEach(async (feature) => {
              const objectId = feature.attributes.OBJECTID;
              if (!featureTableSites.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableSites.highlightIds.add(objectId);
              }
            })
            // Zoom to the extent of the query result
            if (resultSites.features.length > 0) {
              // const extent = esri.geometry.Extent.fromJSON(result.features[0].geometry.extent);
              console.log(resultSites.features[0]);
              // view.goTo(extent);
              view.goTo({
                target: resultSites.features[0].geometry,
                zoom: 13
              });
            }

          }

        }
      } catch (error) {
        console.error("Error querying features:", error);
      } finally {
        hideLoader();
      }
    });

    const SearchInputOutagesCellID = document.getElementById("SearchInputOutagesCellID");
    const SearchInputOutagbuttonSearchInputOutagesCellIDesCellID = document.getElementById("button-SearchInputOutagesCellID");
    SearchInputOutagbuttonSearchInputOutagesCellIDesCellID.addEventListener("click", async () => {
      const value = SearchInputOutagesCellID.value;
      console.log(value);
      // Ensure featureTableOutagesData and featureLayerOutagesData are properly initialized
      try {
        showLoader();
        if (value) {
          // Clear existing highlights
          handles.removeAll();
          featureTableSites.highlightIds.removeAll();
          featureTableRFIsFC.highlightIds.removeAll();
          featureTableCCTickets.highlightIds.removeAll();
          featureTableNMSIncident.highlightIds.removeAll();
          featureTableJammerSites.highlightIds.removeAll();
          featureTableCells.highlightIds.removeAll();
          featureTableOutagesData.highlightIds.removeAll();
          const arrCells = [];
          const arrSites = [];
          const queryParams = {
            where: `site_id = '${value}'`, // Specify your query criteria
            outFields: ["*"] // Specify the fields you want to retrieve
          };

          // Query features
          const result = await featureLayerOutagesData.queryFeatures(queryParams);

          // Handle the query result
          result.features.forEach(async (feature) => {
            arrSites.push(feature.attributes.site_id);
            arrCells.push(feature.attributes.cell_id);
            const objectId = feature.attributes.OBJECTID; // Access objectId directly from feature.attributes
            if (featureTableOutagesData.highlightIds.includes(objectId)) {
              // Remove feature from current selection if already highlighted
              featureTableOutagesData.highlightIds.remove(objectId);
            } else {
              featureTableOutagesData.highlightIds.add(objectId);
            }
          });

          if (arrCells.length > 0) {
            const queryParamsCells = {
              where: "CELLID IN ('" + arrCells.join("','") + "')", // Specify your query criteria
              outFields: ["*"],// Specify the fields you want to retrieve
              returnGeometry: true,
            };
            const resultCells = await Cells.queryFeatures(queryParamsCells);
            resultCells.features.forEach(async (feature) => {
              const objectId = feature.attributes.OBJECTID;
              if (!featureTableCells.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableCells.highlightIds.add(objectId);
              }
            })
          }

          if (arrSites.length > 0) {
            const queryParamsSites = {
              where: "site_id IN ('" + arrSites.join("','") + "')", // Specify your query criteria
              outFields: ["*"] ,// Specify the fields you want to retrieve
              returnGeometry: true,
            };

            const resultSites = await sitesFinal.queryFeatures(queryParamsSites);
            resultSites.features.forEach(async (feature) => {
              const objectId = feature.attributes.OBJECTID;
              if (!featureTableSites.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableSites.highlightIds.add(objectId);
              }
            })

            // Zoom to the extent of the query result
            if (resultSites.features.length > 0) {
              // const extent = esri.geometry.Extent.fromJSON(result.features[0].geometry.extent);
              console.log(resultSites.features[0]);
              // view.goTo(extent);
              view.goTo({
                target: resultSites.features[0].geometry,
                zoom: 13
              });
            }

          }

        }
      } catch (error) {
        console.error("Error querying features:", error);
      } finally {
        hideLoader();
      }
    });

    let Sdate;
    let Edate;

    const SearchInputOutagesOriginalEventTimeStartDate = document.getElementById("SearchInputOutagesOriginalEventTimeStartDate");
    SearchInputOutagesOriginalEventTimeStartDate.addEventListener("change", async () => {
      const value = SearchInputOutagesOriginalEventTimeStartDate.value;
      console.log(value);
      const currentDate = new Date(value);
      // Get the time zone offset for Cairo, Egypt (GMT+2)
      let offset = 2 * 60 * 60 * 1000; // Convert hours to milliseconds

      // Calculate the new time by adding the offset to the current time
      let newTime = currentDate.getTime() + offset;

      // Create a new date object with the adjusted time
      let cairoDate = new Date(newTime);

      // Format the date as ISO string without milliseconds
      let isoString = currentDate.toISOString().slice(0, 19); // Remove milliseconds and timezone
      Sdate = currentDate
      console.log(isoString); // Output the ISO string format in GMT+2 (Cairo, Egypt)
    })

    const SearchInputOutagesOriginalEventTimeEndDate = document.getElementById("SearchInputOutagesOriginalEventTimeEndDate");
    SearchInputOutagesOriginalEventTimeEndDate.addEventListener("change", async () => {
      const value = SearchInputOutagesOriginalEventTimeEndDate.value;
      const currentDate = new Date(value);
      console.log(value);
 
         // Get the time zone offset for Cairo, Egypt (GMT+2)
         let offset = 2 * 60 * 60 * 1000; // Convert hours to milliseconds
 
         // Calculate the new time by adding the offset to the current time
         let newTime = currentDate.getTime() + offset;
 
         // Create a new date object with the adjusted time
         let cairoDate = new Date(newTime);
 
         // Format the date as ISO string without milliseconds
         let isoString = currentDate.toISOString().slice(0, 19); // Remove milliseconds and timezone
 
         Edate = currentDate
 
         console.log(isoString); // Output the ISO string format in GMT+2 (Cairo, Egypt)
    })

    const buttonSearchInputOutagesOriginalEventTimeEndDate = document.getElementById("button-SearchInputOutagesOriginalEventTimeEndDate");
    buttonSearchInputOutagesOriginalEventTimeEndDate.addEventListener("click", async () => {


      // Ensure featureTableOutagesData and featureLayerOutagesData are properly initialized
      try {
        
        showLoader();

        if (Sdate && Edate) {
          // Clear existing highlights
          handles.removeAll();
          featureTableSites.highlightIds.removeAll();
          featureTableRFIsFC.highlightIds.removeAll();
          featureTableCCTickets.highlightIds.removeAll();
          featureTableNMSIncident.highlightIds.removeAll();
          featureTableJammerSites.highlightIds.removeAll();
          featureTableCells.highlightIds.removeAll();
          featureTableOutagesData.highlightIds.removeAll();
          const arrCells = [];
          const arrSites = [];
          const queryParams = {
            where: `OBJECTID IS NOT NULL`, // Assuming original_event_time is a date field
            outFields: ["*"] // Specify the fields you want to retrieve
          };

          // Query features
          const result = await featureLayerOutagesData.queryFeatures(queryParams);

          // Handle the query result
          result.features.forEach(async (Outagesfeature) => {
            if (new Date(Outagesfeature.attributes.original_event_time) <= Edate && new Date(Outagesfeature.attributes.original_event_time) >= Sdate) {
              arrSites.push(Outagesfeature.attributes.site_id);
              arrCells.push(Outagesfeature.attributes.cell_id);
              const objectId = Outagesfeature.attributes.OBJECTID;
              if (!featureTableOutagesData.highlightIds.includes(objectId)) {
                featureTableOutagesData.highlightIds.add(objectId);
              }
            }
          });

          if (arrCells.length > 0) {
            const queryParamsCells = {
              where: "CELLID IN ('" + arrCells.join("','") + "')", // Specify your query criteria
              outFields: ["*"],// Specify the fields you want to retrieve
              returnGeometry: true,
            };
            const resultCells = await Cells.queryFeatures(queryParamsCells);
            resultCells.features.forEach(async (feature) => {
              const objectId = feature.attributes.OBJECTID;
              if (!featureTableCells.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableCells.highlightIds.add(objectId);
              }
            })
          }

          if (arrSites.length > 0) {
            const queryParamsSites = {
              where: "site_id IN ('" + arrSites.join("','") + "')", // Specify your query criteria
              outFields: ["*"] ,// Specify the fields you want to retrieve
              returnGeometry: true,
            };

            const resultSites = await sitesFinal.queryFeatures(queryParamsSites);
            resultSites.features.forEach(async (feature) => {
              const objectId = feature.attributes.OBJECTID;
              if (!featureTableSites.highlightIds.includes(objectId)) {
                // Remove feature from current selection if already highlighted
                featureTableSites.highlightIds.add(objectId);
              }
            })

            // Zoom to the extent of the query result
            if (resultSites.features.length > 0) {
              // const extent = esri.geometry.Extent.fromJSON(result.features[0].geometry.extent);
              console.log(resultSites.features[0]);
              // view.goTo(extent);
              view.goTo({
                target: resultSites.features[0].geometry,
                zoom: 13
              });
            }

          }

        }
      } catch (error) {
        console.error("Error querying features:", error);
      } finally {
        hideLoader();
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