define({ 

  //Type your controller code here
  //   component_instance_id : null,
  integrationService : voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB"),
  modes: {},
  
  
  
  // This function is called at the end of executing functions "editProperty", "cloneComponent" or "deleteComponent"
  selectComponent: function(rightData, leftData, instance, nested, lastComponentWidth){
    voltmx.print("### RIGHT DATA: " + JSON.stringify(rightData));
    voltmx.print("### LEFT DATA: " + JSON.stringify(leftData));
    voltmx.print("### MODES: " + JSON.stringify(this.modes));

    const flex = new voltmx.ui.FlexContainer({
      id: `flex${new Date().getTime()}`,
      width: '96%',
      height: '40%',
      top: '2%',
      bottom: '2%',
      left: '2%',
      right: '2%',
      responsiveConfig: {
        "span": {
          "640": 12,
          "1024": 6,
          "1366": 12
        }
      },
    }, {}, {}); 
    //       voltmx.print("### BUILDED FLEX");
    //const tile = new com.hcl.demo.uifactory.Tile({
    const selectedComp = new ki.luxottica.selectedComponentwithContract({
      id: `component${new Date().getTime()}`,
      width: (!this.view.flxNestedBlur.isVisible ? '100%' : `${parseInt(lastComponentWidth, 10) - 10}%`), // if true, user is selecting a nested
      height: (!this.view.flxNestedBlur.isVisible ? '100%' : `${parseInt(lastComponentWidth, 10) - 10}%`) // if true, user is selecting a nested
    }, {}, {});
    
    
    //let componentArray;
    //let nestedComponentsObj;
    if ( (parseInt(selectedComp.width, 10)) != 100) {  // if the component is nested
      componentArray = this.modes[gblFatherNest];
      nestedComponentsObj = componentArray.find(item => item.hasOwnProperty('nestedComponents'));
      if ( nestedComponentsObj ){nestedComponentsObj.nestedComponents.push(selectedComp.id); }
    }

    
    
    
    //whenever a component in one of the two halves is clicked
    const selectedCompEventHandler = () => {
      this.view.settingsSide.flxScrollSettingsContent.removeAll();    
      this.view.settingsSide.flxScrollSettingsContent.setVisibility(true);
      this.view.settingsSide.txt.setVisibility(false);
      
      // if the component info icon is clicked
      if (gblInfoIcon) {
        this.view.flxComponentImage.imgComponent.src = selectedComp.leftData[0].modalImgComponent;
        this.view.flxComponentImage.setVisibility(true);
      }
      
      // voltmx.print("### RIGHT DATA SELECTED COMPONENT: " + JSON.stringify(selectedComp.rightData));

      props = selectedComp.rightData;
      voltmx.print("### selectedComp.leftData: " + selectedComp.leftData);
      voltmx.print("### selectedComp.leftData stringify: " + JSON.stringify(selectedComp.leftData) );
      // let searchKey = selectedComp.leftData[0].lblComponentName + instance + (gblCurrentStepOrder).toString();
      let searchKey = selectedComp.leftData[0].lblComponentName;
      voltmx.print("### search: " + JSON.stringify(selectedComp.leftData[0].modalImgComponent) );
      let foundComponentConfig = Object.keys(this.modes).find(key => key.startsWith(searchKey));
      if (foundComponentConfig) {
        props.forEach(item => {
          let propComp = null;
          const found = this.modes[foundComponentConfig].find(element => element.name === item.lblPropertyName); //found = {name: mode}
          if (found.mode === "dropdown"){
            propComp = new ki.luxottica.editPropertyValuewithDropdown({
              id: `prop${new Date().getTime()}`,
              top: '2%',
              centerX: '50%'
            }, {}, {});
            propComp.listBoxMasterData = found.masterData;
            if (found.default !== null){
              propComp.listBoxPropertyValue.selectedKey = found.default;  
            } else {
              propComp.listBoxPropertyValue.selectedKey = found.masterData[0][0];
            }
            propComp.onSelection = () => {
              let identify = selectedComp.id;
              this.onEndEditingCallback(propComp, identify, true, false);
            };
          } else if (found.mode === "label") {
            propComp = new ki.luxottica.editPropertyValuewithTextField({
              id: `prop${new Date().getTime()}`,
              top: '2%',
              centerX: '50%'
            }, {}, {});
            //           gblFlowId = 128;
            let label_key = item.lblPropertyValue;
            propComp.propertyValue = label_key;
            propComp.txtPropertyValueTextField.setEnabled(true); // QUI
          } else if (found.mode === "switch") {
            propComp = new ki.luxottica.editPropertyValuewithSwitch({
              id: `prop${new Date().getTime()}`,
              top: '2%',
              centerX: '50%'
            }, {}, {});
            propComp.onSlide = () => {
              let identify = selectedComp.id;
              this.onEndEditingCallback(propComp, identify, false, true);
            };	  
          } else {
            propComp = new ki.luxottica.editPropertyValuewithTextField({
              id: `prop${new Date().getTime()}`,
              top: '2%',
              centerX: '50%'
            }, {}, {});
            propComp.onEndEditing = () => {
              voltmx.print("### EDITING CONCLUSO");
              let identify = selectedComp.id;
              this.onEndEditingCallback(propComp, identify, false, false);
            };
          }
          propComp.propertyName = item.lblPropertyName;
          voltmx.print("### ITEM: " + item);
          voltmx.print("### ITEM stringify: " + JSON.stringify(item) );
          
          voltmx.print("### propComp: " + propComp);
          
          this.view.settingsSide.flxScrollSettingsContent.add(propComp);
        });
      }
      
      this.showOrHideMoveCloneDelete(selectedComp);
      
    };
    
    // the click on any part of the selected component execute the same eventHandler.
    selectedComp.onRowClickTeaser = selectedCompEventHandler;
    selectedComp.onRowClickTeaserRight = selectedCompEventHandler;
    selectedComp.onSelectedCompClickTeaser = selectedCompEventHandler;
    
    selectedComp.onClickUp = () => {
      this.clickedArrow("up", selectedComp);
    };
    
    selectedComp.onClickDown = () => {
      this.clickedArrow("down", selectedComp);
    };
    
    selectedComp.onClickAddNested = () => {
      this.view.flxNestedBlur.setVisibility(true);
      gblFatherNest = selectedComp.leftData[0].lblComponentName + "_" + selectedComp.componentOrder + "_" + gblCurrentStepOrder;
      //nestedSelection = true;
    };
    
    selectedComp.onClickClone = () => {
      this.cloneComponent(selectedComp.id);
    };
    
    selectedComp.onClickDelete = () => {
      this.deleteComponent(selectedComp.id);
    };

    selectedComp.flxSelectedComponentLeft.segmentLeft.setData(leftData);
    selectedComp.flxSelectedComponentRight.segmentRight.setData(rightData);
    
    if (nested === true) {
      selectedComp.flxAddNestedVisible = true;
    }
    
    flex.add(selectedComp);      

    let left_width = parseInt(this.view.flxLeftRight.flxLeftSide.width, 10);
    let right_width = parseInt(this.view.flxLeftRight.flxRightSide.width, 10);

    if ( left_width > 48){
      //vuol dire che il pannello di sinistra è aperto
      voltmx.print("### IF LEFT WIDTH");
      selectedComp.componentOrder = instance;
      voltmx.print("### COMPONENT ORDER: " + selectedComp.componentOrder);
      this.view.flxContainerStepCreation.flxLeftRight.flxLeftSide.imgNoComponentsLeft.setVisibility(false);
      this.view.flxContainerStepCreation.flxLeftRight.flxLeftSide.lblNoComponentsLeft.setVisibility(false);
      this.view.flxContainerStepCreation.flxLeftRight.flxLeftSide.txtStartPhraseLeft.setVisibility(false);
      this.view.flxScrollLeft.setVisibility(true);
      this.view.flxScrollLeft.add(flex);
      this.view.flxScrollLeft.forceLayout();
      this.showOrHideMoveCloneDelete(selectedComp);
    }
    if ( right_width > 48){
      //vuol dire che il pannello di destra è aperto
      voltmx.print("### IF RIGHT WIDTH");
      voltmx.print("### COMPONENT ORDER: " + selectedComp.componentOrder);
      
      this.view.flxContainerStepCreation.flxLeftRight.flxRightSide.imgNoComponentsRight.setVisibility(false);
      this.view.flxContainerStepCreation.flxLeftRight.flxRightSide.lblNoComponentsRight.setVisibility(false);
      this.view.flxContainerStepCreation.flxLeftRight.flxRightSide.txtStartPhraseRight.setVisibility(false);
      if (gblCurrentStepOrder > 1){
        let right_widgets = this.view.flxRightSide.widgets();
        let targetWidget = right_widgets.find(widget => widget.id === "flxScrollRight" + gblCurrentStepOrder);
        if (targetWidget){
          targetWidget.add(flex);
          targetWidget.forceLayout();
        }
      } else {
        this.view.flxScrollRight.setVisibility(true);
        this.view.flxScrollRight.add(flex);
        this.view.flxScrollRight.forceLayout();
      }
      selectedComp.componentOrder = instance;
      this.showOrHideMoveCloneDelete(selectedComp);
    }
    
      this.view.flxNestedBlur.setVisibility(false);
      this.showOrHideMoveCloneDelete(selectedComp);

  }, //end of function "selectComponent"

  
  
  
  
  
  // this function should update the component selected with the settings edited on the right Setting Side
  onEndEditingCallback: function(propComp, identify, dropdown, switched){  //identity = selectedComponent.id
    let value = null;
    if (dropdown){
       value = propComp.listBoxPropertyValue.selectedKeyValue[1];
    } else if (switched){
      value = propComp.propertyValue;
  	}  else {
      value = propComp.propertyValue;
    }
    let left_width = parseInt(this.view.flxLeftRight.flxLeftSide.width, 10);
    let right_width = parseInt(this.view.flxLeftRight.flxRightSide.width, 10);
    let lastComp = null;
    
    if ( left_width > 48){
      components = this.view.flxScrollLeft.widgets();
      if (identify === null){
        // chiamata da editProperty
        lastComp = components.length > 0 ? components[components.length - 1] : null;
        let componentKey = Object.keys(lastComp).find(key => key.startsWith("component"));
        if (lastComp[componentKey]["leftData"][0].lblComponentName === gblLastInsertedComponent){
          let newData = lastComp[componentKey]["rightData"];
          
          newData.forEach(item => {
            if (item.lblPropertyName === propComp.propertyName) {
              if (switched){
                if (value === 0){
                  item.lblPropertyValue = "True";
                } else {
                  item.lblPropertyValue = "False";
                }
              } else {
                item.lblPropertyValue = value; 
              }
            }
          });
          lastComp[componentKey].flxSelectedComponentRight.segmentRight.setData(newData);
        }
      } else {
        // chiamata da selectedComponent
        components.forEach((comp) => {
          let componentKey = Object.keys(comp).find(key => key.startsWith("component"));
          if (componentKey === identify){
            let newData = comp[componentKey]["rightData"];
            newData.forEach(item => {
              if (item.lblPropertyName === propComp.propertyName) {
                if (switched){
                  if (value === 0){
                    item.lblPropertyValue = "True";
                  } else {
                    item.lblPropertyValue = "False";
                  }
                } else {
                  item.lblPropertyValue = value; 
                }
              }
            });
            comp[componentKey].flxSelectedComponentRight.segmentRight.setData(newData);
          }
        });
      }
    }
    if ( right_width > 48){
      components = this.view.flxScrollRight.widgets();
      if (identify === null) {
        // chiamata da editProperty
        lastComp = components.length > 0 ? components[components.length - 1] : null;
        let componentKey = Object.keys(lastComp).find(key => key.startsWith("component"));
        if (lastComp[componentKey]["leftData"][0].lblComponentName === gblLastInsertedComponent){
          let newData = lastComp[componentKey]["rightData"];
          newData.forEach(item => {
            if (item.lblPropertyName === propComp.propertyName) {
              if (switched){
                if (value === 0){
                  item.lblPropertyValue = "True";
                } else {
                  item.lblPropertyValue = "False";
                }
              } else {
                item.lblPropertyValue = value; 
              }
            }
          });

          lastComp[componentKey].flxSelectedComponentRight.segmentRight.setData(newData);
        }
      } else {
        // chiamata da selectedComponent
        components.forEach((comp) => {
          let componentKey = Object.keys(comp).find(key => key.startsWith("component"));
          if (componentKey === identify){
            let newData = comp[componentKey]["rightData"];
            newData.forEach(item => {
              if (item.lblPropertyName === propComp.propertyName) {
                if (switched){
                  if (value === 0){
                    item.lblPropertyValue = "True";
                  } else {
                    item.lblPropertyValue = "False";
                  }
                } else {
                  item.lblPropertyValue = value; 
                }
              }
            });
            comp[componentKey].flxSelectedComponentRight.segmentRight.setData(newData);
          }
        });
      }
    }
	
    if ((!switched) && (!dropdown)){
      propComp.propertyValue = "";
    }
  },  // end of function "onEditingCallback".

  
  
  
  
  /* This function is called when the user select a component from one of the two segments on the left of the form (Configurable and Simple).
  * We retrieve from the db the data related to the component selected (calling the service PROPERTY_TEMPLATE_CustomQuery)
  * and we pass them to the function as parameters. */
  editProperty: function(list, rightSegmentData, leftSegmentData, selected_item, selected_item_img, selected_item_modal_img){

    voltmx.print("### LIST: " + JSON.stringify(list));
//     LIST: [{"mode":"dropdown","default":"bottom-left","component_name":"RXC_BRAND_FOOTER","name":"position","id":"129","type":"string","position_values":"top-left, top-right, bottom-left, bottom-right, center","required":"false"},{"mode":"label","default":"Frame size","component_name":"RXC_BRAND_FOOTER","name":"frameSize","id":"130","type":"string","position_values":"top-left, top-right, bottom-left, bottom-right, center","required":"false"}]
    voltmx.print("### RIGHT SEGMENT DATA: " + JSON.stringify(rightSegmentData));  // starts empty (es. [])
    voltmx.print("### LEFT SEGMENT DATA: " + JSON.stringify(leftSegmentData));  // starts empty (es. [])
    voltmx.print("### SELECTED ITEM: " + JSON.stringify(selected_item));  // es. "RXC_TITLE_DESCRIPTION"
    voltmx.print("### SELECTED ITEM IMG: " + JSON.stringify(selected_item_img));  // es. "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_TITLE_DESCRIPTION.png"
    voltmx.print("### SELECTED ITEM MODAl IMG: " + JSON.stringify(selected_item_modal_img));  // es. "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_TITLE_DESCRIPTION.png"
    

    let index = 0;
    //     let modes = [];
    this.view.settingsSide.flxScrollSettingsContent.removeAll();
    this.view.settingsSide.flxScrollSettingsContent.setVisibility(true);
    let instance = null;
    let lastComponentWidth = null;
    let left_width = parseInt(this.view.flxLeftRight.flxLeftSide.width, 10);
    let right_width = parseInt(this.view.flxLeftRight.flxRightSide.width, 10);
    
    // left side is open. we are putting the selected component in the left side. (preview Section)
    if (left_width > 48){
      let components_inside_filtered = this.view.flxScrollLeft.widgets().filter(widget =>
                                                           Object.keys(widget).some(key => key.startsWith("component"))
                                                          );
      let length = components_inside_filtered.length
      if (length > 0){
        let lastComponent = components_inside_filtered[length - 1];
        let lastComponentKey = Object.keys(lastComponent).find(key => key.startsWith("component")); 
        lastComponentWidth = lastComponent[lastComponentKey].width;
      }
      let count = length; 
      instance = (count + 1).toString();
    }
    
    // right side is open. we are putting the selected component in the right side. (step Section)
    if (right_width > 48) {
      if (gblCurrentStepOrder > 1){
        let right_widgets = this.view.flxRightSide.widgets();
        let targetWidget = right_widgets.find(widget => widget.id === "flxScrollRight" + gblCurrentStepOrder);
        if (targetWidget){
          let components_inside = targetWidget.widgets();
          let components_inside_filtered = components_inside.filter(widget =>
                                               Object.keys(widget).some(key => key.startsWith("component"))
                                              );
          let length = components_inside_filtered.length
          if (length > 0){
            let lastComponent = components_inside_filtered[length - 1];
            let lastComponentKey = Object.keys(lastComponent).find(key => key.startsWith("component")); 
            lastComponentWidth = lastComponent[lastComponentKey].width;
          }
          let count = length; 
          instance = (count + 1).toString();
        }
      } else {
        let components_inside_filtered = this.view.flxScrollRight.widgets().filter(widget =>
                                                              Object.keys(widget).some(key => key.startsWith("component"))
                                                             );
        let length = components_inside_filtered.length
        if (length > 0){
          let lastComponent = components_inside_filtered[length - 1];
          let lastComponentKey = Object.keys(lastComponent).find(key => key.startsWith("component")); 
          lastComponentWidth = lastComponent[lastComponentKey].width;
        }
        let count = length; 
        instance = (count + 1).toString();
      }
    }
    
    // creating the component key based on his name, number of instance and number of father step. es. "RXC_TITLE_DESCRIPTION_1_1"
    let compKey = selected_item + "_" + instance + "_" + (gblCurrentStepOrder).toString();
    this.modes[compKey] = [];
	
    const position_masterData = {
      position: "position_values",
      attribute: "availableAttributes",
      viewMode: "viewModes",
      nestedViewMode: "nestedViewModes",
      tilesFeaturesListLayout: "tilesFeaturesListLayout",
      targetDigitalOptometry: "targetDigitalOptometry"
    };
    
    let nested = false;
    gblLastInsertedComponent = selected_item;
    for (let i = 0; i < list.length; i++) {

      voltmx.print("### list[i]: " + JSON.stringify(list[i]) );
     // console.log(list[i]);

      let propertyName = list[i].name;
      if(propertyName === "nestedComponents") { // nestedComponents (or we could put configurable)
        nested = true;
        this.modes[compKey].push({"nestedComponents": [] });
        continue;
      }
      
      
      let capitalizedName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1) + ": ";
      let properties = {lblPropertyName: capitalizedName, lblPropertyValue: ""}; 
//       gblLastInsertedComponent = selected_item;
      console.log(rightSegmentData);
      let propComp = null;
      
      if (list[i].mode === "dropdown"){
        propComp = new ki.luxottica.editPropertyValuewithDropdown({
          id: `prop${new Date().getTime()}`,
          top: '2%',
          centerX: '50%'
        }, {}, {});
        
        propComp.listBoxPlaceholder=`Please select a value`;
        
        voltmx.print("### POSITION_MASTERDATA: " + JSON.stringify(position_masterData[list[i].name]));
        let masterDataValues = position_masterData[list[i].name];
        voltmx.print("### MASTER DATA VALUES: " + JSON.stringify(masterDataValues) );
        voltmx.print("### list[i]: " + JSON.stringify(list[i]) );
        let masterDataString = list[i][masterDataValues];
        voltmx.print("### MASTER DATA STRING[0]: " + JSON.stringify(masterDataString[0]));  // undefined
        let valuesArray = masterDataString.split(", ");
        let masterDataList = [];
        
        
        valuesArray.forEach((value, index) => {
          let id = `lb${index + 1}`;
          masterDataList.push([id, value.trim()]);
        });
        propComp.listBoxMasterData = masterDataList;
        let key = null;
        if ("default" in list[i] && list[i].default !== null){
          key = masterDataList.find(elemento => elemento[1] === list[i].default)[0];
          properties.lblPropertyValue = list[i].default;
        } else {
          key = "lb1";
          const raw = masterDataList.find(elemento => elemento[0] === key);
          voltmx.print("### RAW: " + JSON.stringify(raw));
          properties.lblPropertyValue = raw[1];
        }
        propComp.listBoxPropertyValue.selectedKey = key;
        this.modes[compKey].push({"name": capitalizedName, "mode": "dropdown", "masterData": masterDataList, "default": key});
        propComp.onSelection = () => {
          this.onEndEditingCallback(propComp, null, true, false);
        };
        if (!gblPropertyTemplatesIds[list[i].component_name]) {
          gblPropertyTemplatesIds[list[i].component_name] = [];
        }
        let elem = {};
        elem[list[i].id] = { "name": list[i].name, "mode": "dropdown" };
        gblPropertyTemplatesIds[list[i].component_name].push(elem);
      } else if (list[i].mode === "label") {
        propComp = new ki.luxottica.editPropertyValuewithTextField({
          id: `prop${new Date().getTime()}`,
          top: '2%',
          centerX: '50%'
        }, {}, {});
        //gblFlowId = 128; //to comment in the global flow of the application
        //let label_key = `${gblFlowId}_${list[i].name}_${this.view.lblStepTitleIntoStepComposition.text}_${instance}_${i+1}`; // LABEL QUI
        let label_key = `${gblFlowId}_${list[i].name}_${this.view.lblStepTitleIntoStepComposition.text}_${instance}_${i+1}`;
        voltmx.print("### LABEL KEY: " + JSON.stringify(label_key));
        propComp.propertyValue = label_key;
        propComp.txtPropertyValueTextField.setEnabled(true); // QUI
        properties["lblPropertyValue"] = label_key;
		this.modes[compKey].push({"name": capitalizedName, "mode": "label"});
        if (!gblPropertyTemplatesIds[list[i].component_name]) {
          gblPropertyTemplatesIds[list[i].component_name] = [];
        }
        let elem = {};
        elem[list[i].id] = { "name": list[i].name, "mode": "label" , "default": list[i].default};
        gblPropertyTemplatesIds[list[i].component_name].push(elem);
      } else if (list[i].mode === "switch"){
        propComp = new ki.luxottica.editPropertyValuewithSwitch({
          id: `prop${new Date().getTime()}`,
          top: '2%',
          centerX: '50%'
        }, {}, {});
        propComp.onSlide = () => {
          this.onEndEditingCallback(propComp, null, false, true);
        };
        this.modes[compKey].push({"name": capitalizedName, "mode": "switch"});
        if (!gblPropertyTemplatesIds[list[i].component_name]) {
          gblPropertyTemplatesIds[list[i].component_name] = [];
        }
        let elem = {};
        elem[list[i].id] = { "name": list[i].name, "mode": "switch" };
        gblPropertyTemplatesIds[list[i].component_name].push(elem);
        if (propComp.propertyValue === 0){
          properties["lblPropertyValue"] = "True";
        } else {
          properties["lblPropertyValue"] = "False";
        }
      } else {
        propComp = new ki.luxottica.editPropertyValuewithTextField({
          id: `prop${new Date().getTime()}`,
          top: '2%',
          centerX: '50%'
        }, {}, {});
        propComp.onEndEditing = () => {
          voltmx.print("### EDITING CONCLUSO 2");          
          this.onEndEditingCallback(propComp, null, false, false);
        };
        this.modes[compKey].push({"name": capitalizedName, "mode": "textfield"});
        if (!gblPropertyTemplatesIds[list[i].component_name]) {
          gblPropertyTemplatesIds[list[i].component_name] = [];
        }
        let elem = {};
        //       elem[list[i].id] = list[i].name;
        elem[list[i].id] = { "name": list[i].name, "mode": "textfield" };
        gblPropertyTemplatesIds[list[i].component_name].push(elem);
      }
      propComp.propertyName = capitalizedName;
      propComp.propertyTemplateId = list[i].id;
      this.view.settingsSide.flxScrollSettingsContent.add(propComp);
      index +=1;
      rightSegmentData.push(properties);  // popolating the RIGHT data of the component
    }
    if (this.view.settingsSide.flxScrollSettingsContent.widgets().length > 0){
      this.view.settingsSide.txt.setVisibility(false);
      this.view.settingsSide.flxScrollSettingsContent.setVisibility(true);
      this.view.settingsSide.flxScrollSettingsContent.forceLayout();
    }
    let selected_component_data = {lblComponentName: selected_item, imgComponent: selected_item_img, modalImgComponent: selected_item_modal_img};
    leftSegmentData.push(selected_component_data);  // popolating the LEFT data of the component
	
    voltmx.print("### selected_component_data: " + selected_component_data);
    voltmx.print("### selected_component_data STRINGIFY: " + JSON.stringify(selected_component_data) );
    
    voltmx.print("### leftSegmentData: " + leftSegmentData);
    voltmx.print("### leftSegmentData STRINGIFY: " + JSON.stringify(leftSegmentData) );
    
    this.selectComponent(rightSegmentData, leftSegmentData, instance, nested, lastComponentWidth);
	
  }, // end of function editProperty.

  
  
  
  
  
  
  
  SHOW_ALERT_Failure_Callback: function() {
    voltmx.print("### FAIL ALERT CALLBACK");
  },
  
  
  
  SHOW_ALERT_Success_Callback: function() {
    voltmx.print("### SUCCESS ALERT CALLBACK");
  },

  
  
  // function invoked when Save Button is clicked (invoked from action editor)
  saveStepComposition: function(){
    
    voltmx.application.showLoadingScreen(null, "Saving step...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    
    voltmx.print("### GBL PROPERTY TEMPLATES IDS: " + JSON.stringify(gblPropertyTemplatesIds));
    let left_widgets = this.view.flxScrollLeft.widgets();
    let steps = this.view.flxRightSide.widgets();
    //gblFlowId = 128; //to comment in the global flow of the application
    if (left_widgets.length > 0){
      voltmx.print("### SONO A SINISTRA");
      left_widgets.forEach(function(widget) {
        var component_instance_left = {
          template_name: null,
          step_id: null,
          order: null
        };
        var property_instance_left = {
          property_template_id: null,
          component_instance_id: null,
          value: null,
          label_id: null
        };
        let componentKey = Object.keys(widget).find(key => key.startsWith("component"));
        component_instance_left["template_name"] = widget[componentKey]["flxSelectedComponentLeft"]["segmentLeft"]["data"][0].lblComponentName;
        
        let entry = Object.entries(gblIdOrderSteps).find(([id, order]) => order === "1");
        let number = entry ? entry[0] : undefined;
        
        component_instance_left["step_id"] = number;
        component_instance_left["order"] = widget[componentKey]["lblComponentOrder"].text;

        voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("COMPONENT_INSTANCE_create",{},component_instance_left,
                                                                                         (response) => {
          voltmx.print("### Service response: "+JSON.stringify(response));
          widget[componentKey]["lblComponentId"].text = response.COMPONENT_INSTANCE[0].id;
          property_instance_left["component_instance_id"] = response.COMPONENT_INSTANCE[0].id;
          let props_left = widget[componentKey]["flxSelectedComponentRight"]["segmentRight"]["data"];
          props_left.forEach(function(prop_left) {
            let cleanedStr_left = prop_left.lblPropertyName.replace(/[^a-zA-Z0-9]+$/, '').replace(/^[^a-zA-Z0-9]+/, '');
			let camelCaseStr_left = cleanedStr_left.charAt(0).toLowerCase() + cleanedStr_left.slice(1);
            let prop_name_left = camelCaseStr_left;
            let elementoTrovato_left = gblPropertyTemplatesIds[component_instance_left["template_name"]].find(item_left => {
              let [id_left, obj_left] = Object.entries(item_left)[0];
              return obj_left["name"] === prop_name_left;
            });
            let prop_id_left = Object.keys(elementoTrovato_left);
            if (elementoTrovato_left[prop_id_left[0]].mode === "label"){
              let label = {
                id: prop_left.lblPropertyValue,
                flow_id: gblFlowId, 
                en_GB: elementoTrovato_left[prop_id_left[0]].default
              };
              voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("LABEL_create", {}, label, 
                                                                                               (response) => {
                voltmx.print("### Service response: " + JSON.stringify(response));
                property_instance_left["value"] = prop_left.lblPropertyValue;
                property_instance_left["label_id"] = prop_left.lblPropertyValue;
                property_instance_left["property_template_id"] = prop_id_left[0];
                voltmx.print("### PROP LEFT: " + JSON.stringify(property_instance_left));
                voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("PROPERTY_INSTANCE_create",{},property_instance_left,
                                                                                                 (response) => {
                  voltmx.print ("### Service response: "+JSON.stringify(response));
                },
                                                                                                 (error) => {
                  voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
                  voltmx.ui.Alert({
                    "alertType": constants.ALERT_TYPE_INFO,
                    "alertTitle": "Fail",
                    "yesLabel": "Ok",
                    "message": "Save not permitted: an error occurred.",
                    "alertHandler": this.SHOW_ALERT_Failure_Callback
                  }, {
                    "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                  });
                  gblFail = true;
                }
               );
              }, 
                                                                                               (error) => {
                voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
              });
            } else {
              property_instance_left["value"] = prop_left.lblPropertyValue;
              property_instance_left["property_template_id"] = prop_id_left[0];
              voltmx.print("### PROP LEFT: " + JSON.stringify(property_instance_left));
              voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("PROPERTY_INSTANCE_create",{},property_instance_left,
                                                                                             (response) => {
              voltmx.print ("### Service response: "+JSON.stringify(response));
            },
                                                                                             (error) => {
              voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
              //             voltmx.application.dismissLoadingScreen();
              voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_INFO,
                "alertTitle": "Fail",
                "yesLabel": "Ok",
                "message": "Save not permitted: an error occurred.",
                "alertHandler": this.SHOW_ALERT_Failure_Callback
              }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
              });
              gblFail = true;
            }
           );
           } 
          });
        },
                                                                                         (error) => {
          voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
          gblFail = true;
        });
      });
           
    } 

    
    let associatedId = null;
    let scrolls = steps.filter(step => step.id.startsWith("flxScrollRight"));
    
    let mode_dict = this.modes;
    let children = [];
    let childIds = new Set();
    let parentIds = new Set();
    
    scrolls.forEach(scroll => {
      let number = 0;
      if (scroll.id === "flxScrollRight"){
        let entry = Object.entries(gblIdOrderSteps).find(([id, order]) => order === "1");
        number = entry ? entry[0] : undefined;
        
      } else {
        let match = scroll.id.match(/flxScrollRight(\d+)$/);
        if (match) {
          let temp = match[1];
          let entry = Object.entries(gblIdOrderSteps).find(([id, order]) => order === temp);
          number = entry ? entry[0] : undefined;
        }
      }
      let right_widgets = scroll.widgets();
      
      
      // modifica qui per i Nested Components
      if (right_widgets.length > 0){
        voltmx.print("### SONO A DESTRA DENTRO " + `${scroll.id}`);
        
        // Estrazione degli ID dei componenti per facilitare le operazioni
        let componentIdMap = right_widgets.reduce((acc, widget) => {
            let componentKey = Object.keys(widget).find(key => key.startsWith("component"));
            acc[widget[componentKey].id] = widget[componentKey];
            return acc;
        }, {});

        // Filtraggio dei componenti, mantenendo quelli che non hanno figli diretti in `new_components`
        right_widgets.forEach(widget => {
//             debugger;
            let componentKey = Object.keys(widget).find(key => key.startsWith("component"));
            const id = widget[componentKey].id;
//             AGGIUSTA LA PARTE FINALE -> metti "component_instance_right["step_id"]" al posto di "1"
            let completeKey = widget[componentKey]["flxSelectedComponentLeft"]["segmentLeft"]["data"][0].lblComponentName + "_" + widget[componentKey]["lblComponentOrder"].text + "_" + "1";
            let keyArray = mode_dict[completeKey];
            let nestedObjs = keyArray.find(item => item.hasOwnProperty('nestedComponents'));
            if (nestedObjs && nestedObjs.nestedComponents.length > 0){
              parentIds.add(id);
              nestedObjs.nestedComponents.forEach(childId => {
                if (childId in componentIdMap){
                  children.push({[childId] : componentIdMap[childId]});
                  childIds.add(childId);
                }
              });
            }
        });
        
        right_widgets = right_widgets.filter(widget => {
          let componentKey = Object.keys(widget).find(key => key.startsWith("component"));
          const id = widget[componentKey].id;
          return parentIds.has(id) && !childIds.has(id);  // Solo padri che non sono anche figli
        });
        
       
        print("right widgets after: " + right_widgets);
        print("children after: " + children);
        
//         debugger;
        
        right_widgets.forEach(widget => {
 
          var component_instance_right = {
            template_name: null,
            step_id: null,
            order: null
          };
          var property_instance_right = {
            property_template_id: null,
            component_instance_id: null,
            value: null,
            label_id: null
          };
          let componentKey = Object.keys(widget).find(key => key.startsWith("component"));
          component_instance_right["template_name"] = widget[componentKey]["flxSelectedComponentLeft"]["segmentLeft"]["data"][0].lblComponentName;
          
//          AGGIUSTA -> METTI QUESTA RIGA component_instance_right["step_id"] = number;  
          component_instance_right["step_id"] = 352;
          component_instance_right["order"] = widget[componentKey]["lblComponentOrder"].text;
         
                           
          voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("COMPONENT_INSTANCE_create",{},component_instance_right,
                                                                                           (response) => {
            voltmx.print("### Service response SONO A DESTRA DENTRO: "+JSON.stringify(response));
            let widgInsideComp = widget[componentKey];
            this.componentCreateCallback(widgInsideComp, property_instance_right, response, component_instance_right);
            let component_id = response.COMPONENT_INSTANCE[0].id;
            // AGGIUSTA -> TOGLI "1" E METTI UN'ALTRA COSA (VEDI DOVE DEFINISCI NUMBER, DOVRESTI PRENDERE L'OPPOSTO DI NUMBER DENTRO GBLIDORDERSTEPS)
            let completeKey = component_instance_right["template_name"] + "_" + component_instance_right["order"] + "_" + "1";
            let componentArray = this.modes[completeKey];
            let nestedComponentsObj = componentArray.find(item =>item.hasOwnProperty('nestedComponents'));
            let child = null;
            if (nestedComponentsObj && nestedComponentsObj.nestedComponents.length > 0) {
              var component_instance_nested_right = {
                template_name: null,
                step_id: null,
                order: null
              };
              var property_instance_nested_right = {
                property_template_id: null,
                component_instance_id: null,
                value: null,
                label_id: null
              };
              nestedComponentsObj.nestedComponents.forEach(childId => {
                let childObj = children.find(child => childId in child);
                child = childObj ? childObj[childId] : undefined;
                component_instance_nested_right["template_name"] = child["flxSelectedComponentLeft"]["segmentLeft"]["data"][0].lblComponentName;
//                 AGGIUSTA -> METTI QUESTA RIGA component_instance_right["step_id"] = number;  
                component_instance_nested_right["step_id"] = 352;
                component_instance_nested_right["order"] = child["lblComponentOrder"].text;
                voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("COMPONENT_INSTANCE_create",{},component_instance_nested_right,
                                                                                           (response) => {
                  voltmx.print("### Service response SONO A DESTRA DENTRO UN NESTED: "+JSON.stringify(response));
                  this.componentCreateCallback(child, property_instance_nested_right, response, component_instance_nested_right);
                  let component_nested_id = response.COMPONENT_INSTANCE[0].id;
                  let nested_component = {
                    component_instance_id: component_nested_id,
                    component_instance_father_id: component_id
                  };
                  voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("NESTED_COMPONENT_create",{},nested_component,
                                                                                           (response) => {
              		voltmx.print("### Service response HO CREATO UN NESTED COMPONENT NEL DB: "+JSON.stringify(response));
                  }, (error) => {
                    voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
                    gblFail = true;
                  });
                  // AGGIUSTA -> TOGLI "1" E METTI UN'ALTRA COSA (VEDI DOVE DEFINISCI NUMBER, DOVRESTI PRENDERE L'OPPOSTO DI NUMBER DENTRO GBLIDORDERSTEPS)
                  let completeKeyInsideNested = component_instance_nested_right["template_name"] + "_" + component_instance_nested_right["order"] + "_" + "1";
                  let componentArrayInsideNested = this.modes[completeKeyInsideNested];
                  let nestedComponentsObjInsideNested = componentArrayInsideNested.find(item =>item.hasOwnProperty('nestedComponents'));
                  let childInsideNested = null;
                  if (nestedComponentsObjInsideNested && nestedComponentsObjInsideNested.nestedComponents.length > 0) {
                    var component_instance_nested_right_Inside = {
                      template_name: null,
                      step_id: null,
                      order: null
                    };
                    var property_instance_nested_right_Inside = {
                      property_template_id: null,
                      component_instance_id: null,
                      value: null,
                      label_id: null
                    };
                    nestedComponentsObjInsideNested.nestedComponents.forEach(childIdInsideNested => {
                      let childObjInsideNested = children.find(child => childIdInsideNested in child);
                      childInsideNested = childObjInsideNested ? childObjInsideNested[childIdInsideNested] : undefined;
                      component_instance_nested_right_Inside["template_name"] = childInsideNested["flxSelectedComponentLeft"]["segmentLeft"]["data"][0].lblComponentName;
                      //AGGIUSTA -> METTI QUESTA RIGA component_instance_right["step_id"] = number;  
                      component_instance_nested_right_Inside["step_id"] = 352;
                      component_instance_nested_right_Inside["order"] = childInsideNested["lblComponentOrder"].text;
                      voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("COMPONENT_INSTANCE_create",{},component_instance_nested_right_Inside,
                                                                                                       (response) => {
                        voltmx.print("### Service response SONO A DESTRA DENTRO UN NESTED MA INSIDE: "+JSON.stringify(response));
                        this.componentCreateCallback(child, property_instance_nested_right, response, component_instance_nested_right);
                        let component_nested_id_Inside = response.COMPONENT_INSTANCE[0].id;
                        let nested_component_Inside = {
                          component_instance_id: component_nested_id_Inside,
                          component_instance_father_id: component_nested_id
                        };
                        
                        voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("NESTED_COMPONENT_create",{},nested_component_Inside,
                                                                                                         (response) => {
                          voltmx.print("### Service response SONO A DESTRA DENTRO UN NESTED MA INSIDE: "+JSON.stringify(response));
                        }, (error) => {
                          voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
                          gblFail = true;
                        });

                      }, (error) => {
                        voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
                        gblFail = true;
                      });
                    });
                  }
                }, (error) => {
                  voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
                  gblFail = true;
                });
              });
            }
          }, (error) => {
            voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
            gblFail = true;
          });
        });
      } 
    });
    voltmx.application.dismissLoadingScreen();
  },   // end of function saveStepComposition
  
  
  // Callback of the COMPONENT_CREATE service, in which property instances and labels of the just created component instance are created
  // Dovrebbe essere aggiustato e reso generico anche per il "left side", per ora funziona solo per il "right side"
  componentCreateCallback: function(widget, property_instance_right, response, component_instance_right){
    widget["lblComponentId"].text = response.COMPONENT_INSTANCE[0].id;  // chiave primaria nel DB, a cui Nested Component deve puntare per trovare il padre
    property_instance_right["component_instance_id"] = response.COMPONENT_INSTANCE[0].id;
    let props_right = widget["flxSelectedComponentRight"]["segmentRight"]["data"];
    props_right.forEach(function(prop_right) {
      let cleanedStr = prop_right.lblPropertyName.replace(/[^a-zA-Z0-9]+$/, '').replace(/^[^a-zA-Z0-9]+/, '');
      let camelCaseStr = cleanedStr.charAt(0).toLowerCase() + cleanedStr.slice(1);
      let prop_name_right = camelCaseStr;
      let elementoTrovato_right = gblPropertyTemplatesIds[component_instance_right["template_name"]].find(item_right => {
        let [id_right, obj_right] = Object.entries(item_right)[0];
        return obj_right["name"] === prop_name_right;
      });
      let prop_id_right = Object.keys(elementoTrovato_right);
      if (elementoTrovato_right[prop_id_right[0]].mode === "label"){
        gblFlowId = 338 // TO BE COMMENTED
        let label_right = {
          id: prop_right.lblPropertyValue,
          flow_id: gblFlowId, 
          en_GB: elementoTrovato_right[prop_id_right[0]].default
        };
        voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("LABEL_create", {}, label_right, 
                                                                                         (response) => {
          voltmx.print("### Service response: " + JSON.stringify(response));
          property_instance_right["label_id"] = prop_right.lblPropertyValue;
          property_instance_right["value"] = prop_right.lblPropertyValue;
          property_instance_right["property_template_id"] = prop_id_right[0];
          voltmx.print("### PROP RIGHT: " + JSON.stringify(property_instance_right));
          voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("PROPERTY_INSTANCE_create",{},property_instance_right,
                                                                                           (response) => {
            voltmx.print ("### Service response: "+JSON.stringify(response));
          },
                                                                                           (error) => {
            voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
            voltmx.ui.Alert({
              "alertType": constants.ALERT_TYPE_INFO,
              "alertTitle": "Fail",
              "yesLabel": "Ok",
              "message": "Save not permitted: an error occurred.",
              "alertHandler": this.SHOW_ALERT_Failure_Callback
            }, {
              "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
            gblFail = true;
          }
                                                                                          );
        }, 
                                                                                         (error) => {
          voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
        });
      } else {
        property_instance_right["value"] = prop_right.lblPropertyValue;
        property_instance_right["property_template_id"] = prop_id_right[0];
        voltmx.print("### PROP RIGHT: " + JSON.stringify(property_instance_right));
        voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("PROPERTY_INSTANCE_create",{},property_instance_right,
                                                                                         (response) => {
          voltmx.print ("### Service response: "+JSON.stringify(response));
        },
                                                                                         (error) => {
          voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
          voltmx.ui.Alert({
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": "Fail",
            "yesLabel": "Ok",
            "message": "Save not permitted: an error occurred.",
            "alertHandler": this.SHOW_ALERT_Failure_Callback
          }, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
          });
          gblFail = true;
        }
                                                                                        );
      }
    });
  },
  
    
  // this function creates the new step (and the related box, at the top right)
  addNewStep: function(left_position){
    let index = gblLastInsertedStep + 1;

    gblLastInsertedStep += 1;
    gblCurrentStepOrder = gblLastInsertedStep;
    
    // query that returns all Steps (and infos/attributes) related to the @flow given as parameter.
    voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("STEP_flow_CustomQuery", {}, {flow_id : gblFlowId}, (response) => {
      voltmx.print("### Service response: "+JSON.stringify(response));
      response.records.forEach(record => {
        gblIdOrderSteps[record.id] = record.order;
      });
    }, (error) => {
      voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
    });
    
    let left_position_dp = left_position + "dp";
    voltmx.print("### left_position_dp: " + left_position_dp);
    
    const box = new ki.luxottica.boxStep({
      id: `boxStep${index}`,
      left: `${left_position_dp}`,
      centerY: '50%',
      //width: '60%',
    }, {}, {});
    

    box.stepOrder = "Step " + index;
    box.stepTitle = gblCurrentStepTitle;
    
    box.onClickTeaser = () => {
      let steps_widgets = this.view.flxSteps.widgets();
      let flxScrolls = this.view.flxRightSide.widgets();
      let current_id = box.id;   // ex. "boxStep3"
      
      let numberAsString = current_id.replace("boxStep", "");
      let stepNumber = parseInt(numberAsString, 10);
      let current_scroll = 'flxScrollRight' + stepNumber;
      
      for (let i = 1; i <= gblLastInsertedStep; i++) {  // ciclying over each step
        let expectedId = 'boxStep' + i;
        let expectedScroll = 'flxScrollRight' + i;
        // Procedi solo se non stiamo trattando il widget corrente
        if (expectedId !== current_id) {
          let widget = steps_widgets.find(w => w.id === expectedId);
          if (widget) {
            voltmx.print("&&& DENTRO if widget");
            widget.flxBoxStep.backgroundColor = "FFFFFF00"; // white
            widget.imgDeleteStep.isVisible = false;
            widget.imgEditStep.isVisible = false;
            widget.lblStepOrder.fontColor = "00000000"; //black
            widget.lblStepTitle.fontColor = "00000000";
            let scroll = flxScrolls.find(s => s.id === expectedScroll);
            if (scroll) {
              scroll.isVisible = false;
            }
          } else {
            let widget_new = steps_widgets.find(w => w.id === "flxBoxFirstStep");
            if (widget_new) {
              voltmx.print("&&& DENTRO if widget_new");
              widget_new.backgroundColor = "FFFFFF00"; 
              widget_new.imgDeleteStep.isVisible = false;
              widget_new.imgEditStep.isVisible = false;
              widget_new.lblStepOrder.fontColor = "00000000";
              widget_new.lblStepTitleIntoStepComposition.fontColor = "00000000";
              this.view.flxRightSide.flxScrollRight.setVisibility(false);
            }
          }
        } else {  // treating the current step
          voltmx.print("&&& DENTRO ELSE ");
          let widget = steps_widgets.find(w => w.id === current_id);
          widget.flxBoxStep.backgroundColor = "00000000";
          widget.imgDeleteStep.isVisible = true;
          widget.imgEditStep.isVisible = true;
          widget.lblStepOrder.fontColor = "FFFFFF00";
          widget.lblStepTitle.fontColor = "FFFFFF00";
          let scroll = flxScrolls.find(s => s.id === current_scroll);
            if (scroll) {
              scroll.isVisible = true;
            }
          gblCurrentStepOrder = stepNumber;
          voltmx.print("### CURRENT STEP ORDER: " + JSON.stringify(gblCurrentStepOrder));
        } 
      }
      this.view.settingsSide.flxScrollSettingsContent.removeAll();
      this.view.settingsSide.flxScrollSettingsContent.setVisibility(false);
      this.view.settingsSide.txt.setVisibility(true);
    };  // end box.onCLickTeaser
    
    
    
    box.onTouchEndDeleteTeaser = () => {
      let scroll = this.findCurrentFlexScroll();
      this.view.flxRightSide.remove(scroll);
      this.view.flxScrollRight.setVisibility(true);
      
      let widget = this.view.flxSteps.widgets().find(w => w.id === box.id);
      
      this.view.flxSteps.flxBoxFirstStep.backgroundColor = "00000000";
      this.view.flxSteps.flxBoxFirstStep.imgDeleteStep.isVisible = true;
      this.view.flxSteps.flxBoxFirstStep.imgEditStep.isVisible = true;
      this.view.flxSteps.flxBoxFirstStep.lblStepOrder.fontColor = "FFFFFF00";
      this.view.flxSteps.flxBoxFirstStep.lblStepTitleIntoStepComposition.fontColor = "FFFFFF00";
      
      this.view.flxSteps.remove(widget);
      
      gblCurrentStepOrder = 1;

    };
    
    this.view.flxSteps.add(box);

    this.view.flxScrollRight.setVisibility(false);

    const flex = new voltmx.ui.FlexScrollContainer({
      id: `flxScrollRight${index}`,
      width: '100%',
      height: '100%',
      responsiveConfig: {
        "span": {
          "640": 12,
          "1024": 6,
          "1366": 12
        }
      }
    }, {}, {});


    // creating a new flex scroll for each Step (containing the components selected and inserted in that specific Step)
    flex.layoutType = voltmx.flex.FLOW_VERTICAL;
    flex.enableScrolling = true;
    flex.scrollDirection = voltmx.flex.SCROLL_VERTICAL;
    this.view.flxRightSide.add(flex);
    this.view.settingsSide.flxScrollSettingsContent.removeAll();
    this.view.settingsSide.flxScrollSettingsContent.setVisibility(false);
    this.view.settingsSide.txt.setVisibility(true);
    
    box.onClickTeaser();
    
  },  // end of function "addNewStep"
  
  
  
  
  
  
  
  
  
  findCurrentFlexScroll: function(){
    let scroll = null;
    let left_width = parseInt(this.view.flxLeftRight.flxLeftSide.width, 10);
    let right_width = parseInt(this.view.flxLeftRight.flxRightSide.width, 10);
    // initially I have to understand in which flex I am
    // if I am in the left side
    if (left_width > 48) {
      scroll = this.view.flxScrollLeft;
    }
    // if I am in the right side
    if (right_width > 48){
      if (gblCurrentStepOrder === 1){
        scroll = this.view.flxScrollRight;
      } else {
        let right_widgets = this.view.flxRightSide.widgets();
        // find the current flex
        let targetWidget = right_widgets.find(widget => widget.id === "flxScrollRight" + gblCurrentStepOrder);
        if (targetWidget){
          scroll = targetWidget;
        }
      }
    }
    return scroll
    
  },  // end of function "findCurrentFlexScroll"
  
  
  
  
  
  
  
  
  clickedArrow: function(direction, selectedComp){
    let scroll = this.findCurrentFlexScroll();
    let scroll_widgets = scroll.widgets();

    // find the current widget index
    let currentWidgetIndex = scroll_widgets.findIndex(widget => widget.hasOwnProperty(selectedComp.id));
    let currentWidgetProperty = null;
    let previousWidgetProperty = null;
    let nextWidgetProperty = null;
    if (currentWidgetIndex !== -1) {
      // obtain the currrent widget from the previously find index
      let currentWidget = scroll_widgets[currentWidgetIndex];
      // obtain the associated property
      currentWidgetProperty = currentWidget[selectedComp.id];
	  
      if (direction === "up"){
        // obtain the previous widget
        let previousWidget = currentWidgetIndex >= 0 ? scroll_widgets[currentWidgetIndex - 1] : null;
        let previousWidgetKey = Object.keys(previousWidget).find(key => key.startsWith("component"));
        if (previousWidgetKey) {
          previousWidgetProperty = previousWidget[previousWidgetKey];
        } 
      } else {
        // obtain the next widget
        let nextWidget = currentWidgetIndex >= 0 ? scroll_widgets[currentWidgetIndex + 1] : null;
        let nextWidgetKey = Object.keys(nextWidget).find(key => key.startsWith("component"));
        if (nextWidgetKey) {
          nextWidgetProperty = nextWidget[nextWidgetKey];
        }
      }
      //         console.log("Found Widget:", currentWidget);
      //         console.log("Previous Widget:", previousWidget);
    } else {
      console.log("Widget non trovato.");
    }

    let currentLeftData = currentWidgetProperty.leftData;
    let currentRightData = currentWidgetProperty.rightData;
    let currentOrder = currentWidgetProperty.componentOrder;
    if (direction === "up"){
      // swapping data between previous and current components
      let previousLeftData = previousWidgetProperty.leftData;
      let previousRightData = previousWidgetProperty.rightData;
      let previousOrder = previousWidgetProperty.componentOrder;
      
      // changing last inserted component name
      if (currentLeftData[0].lblComponentName === gblLastInsertedComponent){
         gblLastInsertedComponent = previousLeftData[0].lblComponentName;
      }

      // adjusting keys for label properties
      currentRightData.forEach(item => {
        // using a regex to check format with at least three underscores
        if (/^[^_]+_.*_.*_.*$/.test(item.lblPropertyValue)) {
          let parts = item.lblPropertyValue.split('_');
          if (parts.length >= 4) {
            // edit the second last element
            parts[parts.length - 2] = previousOrder;
            // recompose the modified string
            item.lblPropertyValue = parts.join('_');
          }
        }
      });

      // adjusting keys for label properties
      previousRightData.forEach(item => {
        // using a regex to check format with at least three underscores
        if (/^[^_]+_.*_.*_.*$/.test(item.lblPropertyValue)) {
          let parts = item.lblPropertyValue.split('_');
          if (parts.length >= 4) {
            // edit the second last element
            parts[parts.length - 2] = currentOrder;
            // recompose the modified string
            item.lblPropertyValue = parts.join('_');
          }
        }
      });

      previousWidgetProperty.leftData = currentLeftData;
      previousWidgetProperty.rightData = currentRightData;

      currentWidgetProperty.leftData = previousLeftData;
      currentWidgetProperty.rightData = previousRightData;  
    } else {
      // swapping data between next and current components
      let nextLeftData = nextWidgetProperty.leftData;
      let nextRightData = nextWidgetProperty.rightData;
      let nextOrder = nextWidgetProperty.componentOrder;
      
      // changing last inserted component name
      if (nextLeftData[0].lblComponentName === gblLastInsertedComponent){
         gblLastInsertedComponent = currentLeftData[0].lblComponentName;
      }

      // adjusting keys for label properties
      currentRightData.forEach(item => {
        // using a regex to check format with at least three underscores
        if (/^[^_]+_.*_.*_.*$/.test(item.lblPropertyValue)) {
          let parts = item.lblPropertyValue.split('_');
          if (parts.length >= 4) {
            // edit the second last element
            parts[parts.length - 2] = nextOrder;
            // recompose the modified string
            item.lblPropertyValue = parts.join('_');
          }
        }
      });

      // adjusting keys for label properties
      nextRightData.forEach(item => {
        // using a regex to check format with at least three underscores
        if (/^[^_]+_.*_.*_.*$/.test(item.lblPropertyValue)) {
          let parts = item.lblPropertyValue.split('_');
          if (parts.length >= 4) {
            // edit the second last element
            parts[parts.length - 2] = currentOrder;
            // recompose the modified string
            item.lblPropertyValue = parts.join('_');
          }
        }
      });

      nextWidgetProperty.leftData = currentLeftData;
      nextWidgetProperty.rightData = currentRightData;

      currentWidgetProperty.leftData = nextLeftData;
      currentWidgetProperty.rightData = nextRightData;
    }

    // graphic stuffs
    selectedComp.arrowUpVisible = false;
    selectedComp.arrowDownVisible = false;
    selectedComp.flxMoveVisible = false;
    selectedComp.cloneDeleteVisible = false;
    selectedComp.flxAddNestedVisible = false;
    this.view.settingsSide.flxScrollSettingsContent.removeAll();
    this.view.settingsSide.flxScrollSettingsContent.setVisibility(false);
    this.view.settingsSide.txt.setVisibility(true);
    
  },  // end of function "clickedArrow"
  
  
  
  
  
  
  
  
  
  showOrHideMoveCloneDelete: function(selectedComp){
    let scroll = this.findCurrentFlexScroll();
    let scroll_widgets = scroll.widgets();
    let max = 0;
    scroll_widgets.forEach( widget => {
      let widget_key = Object.keys(widget).find(key => key.startsWith("component"));
      let order = parseInt(widget[widget_key].componentOrder, 10);
      if (order > max){
        max = order;
      }
    });
    if (selectedComp.componentOrder === "1"){
        selectedComp.arrowDownVisible = true;
      } else if (selectedComp.componentOrder === (max).toString()){
        selectedComp.arrowUpVisible = true;
      } else {
        selectedComp.arrowUpVisible = true;
        selectedComp.arrowDownVisible = true;
      }
      
      selectedComp.flxMoveVisible = true;
      selectedComp.cloneDeleteVisible = true;
      selectedComp.flxAddNestedVisible = true;
      
      // hiding other components' arrows, clone/delete box and "add nested button"
      scroll_widgets.forEach( widg => {
        let widget_key = Object.keys(widg).find(key => key.startsWith("component"));
        if (widg[widget_key].id !== selectedComp.id){
          widg[widget_key].arrowUpVisible = false;
          widg[widget_key].arrowDownVisible = false;
          widg[widget_key].flxMoveVisible = false;
          widg[widget_key].cloneDeleteVisible = false;
          widg[widget_key].flxAddNestedVisible = false;
        }
      });
    
  },  // end of functon "showOrHideMoveCloneDelete" 
  
  
  
  
  
  
  
  
  cloneComponent: function(id){
    let scroll = this.findCurrentFlexScroll();
    let scroll_widgets = scroll.widgets();
    let new_scroll_widgets = [];
    
    scroll_widgets.forEach( widget => {
      let widget_key = Object.keys(widget).find(key => key.startsWith("component"));
      new_scroll_widgets.push([widget[widget_key].leftData, widget[widget_key].rightData]);
      if(widget[widget_key].id === id){
        new_scroll_widgets.push([widget[widget_key].leftData, widget[widget_key].rightData]);
      }
    });
    
    scroll.removeAll();
    new_scroll_widgets.forEach( (new_widget, index) => {
      let instance = (index + 1).toString();
      new_widget[1].forEach(prop => {
        if (/^[^_]+_.*_.*_.*$/.test(prop.lblPropertyValue)) {
          let parts = prop.lblPropertyValue.split("_");
          if (parts.length >= 4) { 
            parts[parts.length - 2] = instance; 
            prop.lblPropertyValue = parts.join("_"); 
          }
        }
      });
      gblLastInsertedComponent = new_widget[0][0].lblComponentName;
//       debugger;
      this.selectComponent(new_widget[1], new_widget[0], instance, false);
    });
    
  },  // end of function "cloneComponent".
  
  
  
  
  
  
  
  
  deleteComponent: function(id){
    let scroll = this.findCurrentFlexScroll();
    let scroll_widgets = scroll.widgets();
    let new_scroll_widgets = [];
    
    scroll_widgets.forEach( widget => {
      let widget_key = Object.keys(widget).find(key => key.startsWith("component"));
      if(widget[widget_key].id != id){
        new_scroll_widgets.push([widget[widget_key].leftData, widget[widget_key].rightData]);
      }
    });
    
    scroll.removeAll();
    new_scroll_widgets.forEach( (new_widget, index) => {
      let instance = (index + 1).toString();
      new_widget[1].forEach(prop => {
        if (/^[^_]+_.*_.*_.*$/.test(prop.lblPropertyValue)) {
          let parts = prop.lblPropertyValue.split("_");
          if (parts.length >= 4) { 
            parts[parts.length - 2] = instance; 
            prop.lblPropertyValue = parts.join("_"); 
          }
        }
      });
      gblLastInsertedComponent = new_widget[0][0].lblComponentName;
//       debugger;
      this.selectComponent(new_widget[1], new_widget[0], instance, false);
    });
  },    // end of function "deleteComponent".
  
  
  
  
  
  // this function laod the flow's data already existing (steps and components)
  loadFlowData: function(flow_id){
    
    // TODO
    
    
    
  }
  
  
  

});