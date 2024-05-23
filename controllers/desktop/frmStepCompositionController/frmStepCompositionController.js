define({ 

  //Type your controller code here
  //   component_instance_id : null,
  integrationService : voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB"),
  modes: {},
  father: null,
  
  
  
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
    let insertingNested = (this.view.flxNestedBlur.isVisible || gblIsNestedInsideEdit);
    
    const selectedComp = new ki.luxottica.selectedComponentwithContract({
      id: `component${new Date().getTime()}`,
      width: (!insertingNested ? '100%' : `${parseInt(lastComponentWidth, 10) - 10}%`), // if true, user is selecting a nested OR loading function is inserting a nested
      height: (!insertingNested ? '100%' : `${parseInt(lastComponentWidth, 10) - 10}%`) // if true, user is selecting a nested OR loading function is inserting a nested
    }, {}, {});
    
    
    //let componentArray;
    //let nestedComponentsObj;
    if ( (parseInt(selectedComp.width, 10)) != 100) {  // if the component is nested
      componentArray = this.modes[gblFatherNest];
      nestedComponentsObj = componentArray.find(item => item.hasOwnProperty('nestedComponents'));
      if ( nestedComponentsObj ){nestedComponentsObj.nestedComponents.push(selectedComp.id); }
    }

    
    
    
    //whenever a component already inserted in one of the two halves is clicked
    const selectedCompEventHandler = () => {
      
      // if none of the two halves is open, the functionalities are not available (content is blured)
      let left_width = parseInt(this.view.flxLeftRight.flxLeftSide.width, 10);
      let right_width = parseInt(this.view.flxLeftRight.flxRightSide.width, 10);
      //TODO: finish check

      this.view.settingsSide.flxScrollSettingsContent.removeAll();    
      this.view.settingsSide.flxScrollSettingsContent.setVisibility(true);
      this.view.settingsSide.txt.setVisibility(false);
      
      // if the component info icon is clicked
      if (gblInfoIcon) {
        this.view.flxComponentImage.imgComponent.src = selectedComp.leftData[0].modalImgComponent;
        this.view.flxComponentImage.setVisibility(true);
      }
      
      // voltmx.print("### RIGHT DATA SELECTED COMPONENT: " + JSON.stringify(selectedComp.rightData));

      let props = selectedComp.rightData;
      voltmx.print("### selectedComp.leftData: " + selectedComp.leftData);
      voltmx.print("### selectedComp.leftData stringify: " + JSON.stringify(selectedComp.leftData) );
      let searchKey = selectedComp.leftData[0].lblComponentName + "_" + instance + "_" + (gblCurrentStepOrder).toString();  // SCOMMENTATO
      //let searchKey = selectedComp.leftData[0].lblComponentName;
      voltmx.print("### search: " + JSON.stringify(selectedComp.leftData[0].modalImgComponent) );
      let foundComponentConfig = Object.keys(this.modes).find(key => key.startsWith(searchKey));
      //debugger;
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
            propComp.propertyValue = item.lblPropertyValue;
            propComp.propertyLabelKey = found.key;
            propComp.txtPropertyValueTextField.setEnabled(true); // QUI
            
            propComp.onEndEditing = () => {
              let identify = selectedComp.id;
              this.onEndEditingCallback(propComp, identify, false, false);
            };
            
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
            if ((item.lblPropertyName === "AttributeDependency: ")){ //is the attributeDependency property of the nested
              propComp.propertyValue = item.lblPropertyValue;
              propComp.txtPropertyValueTextField.setEnabled(false);  //true
            }
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
      this.father = selectedComp;
      
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
    
    if (nested === true && !gblEditingRightSide) {
      voltmx.print("### ENTRATO IN IF NESTED === TRUE");
      selectedComp.flxAddNestedVisible = true;
    }
    
    flex.add(selectedComp);      

    let left_width = parseInt(this.view.flxLeftRight.flxLeftSide.width, 10);
    let right_width = parseInt(this.view.flxLeftRight.flxRightSide.width, 10);

    if ( left_width > 48 || gblEditingLeftSide){
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
      //this.showOrHideMoveCloneDelete(selectedComp);
    }
    if ( right_width > 48 || gblEditingRightSide){
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
      
      
      if (gblEditingLeftSide || gblEditingRightSide) {
        selectedComp["lblComponentId"].text = gblComponentId;
      }
      
      
      //this.showOrHideMoveCloneDelete(selectedComp);
    }

    this.view.flxNestedBlur.setVisibility(false);

    // if we are loading the components, we don't need to show this functionalities at first (but only when clicked)
    if (!gblEditingLeftSide && !gblEditingRightSide) {
      this.showOrHideMoveCloneDelete(selectedComp);
    }
    

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
    let components = null;
    
    if ( left_width > 48 || gblEditingLeftSide ){
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
    if ( right_width > 48 || gblEditingRightSide){
      let correctScroll = this.findCurrentFlexScroll();  // finding the correct flex scroll to manage/update
      components = correctScroll.widgets();
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
            let name = comp[componentKey]["leftData"][0].lblComponentName;
            let instance = comp[componentKey].lblComponentOrder.text;
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
                  if (item.lblPropertyName === "Attribute: "){
                    let compKey = name + "_" + instance + "_" + (gblCurrentStepOrder).toString();
                    let modeList = this.modes[compKey];
                    let obj = modeList.find(item =>item.hasOwnProperty('nestedComponents'));
                    let nestedList = null;
                    if (obj && obj.nestedComponents.length > 0){
                      nestedList = obj.nestedComponents;
                      nestedList.forEach(nested => {
                        components.forEach(newcomp => {
                          let componentKey = Object.keys(newcomp).find(key => key.startsWith("component"));
                          if (componentKey === nested){
                            let newDataNested = newcomp[componentKey]["rightData"];
                            let obj = newDataNested.find(item => item.lblPropertyName === "AttributeDependency: ");
                            obj.lblPropertyValue = value;
                            newcomp[componentKey].flxSelectedComponentRight.segmentRight.setData(newDataNested);
                          }
                        });
                      });
                    }
                    item.lblPropertyValue = value; 
                  } else {
                    item.lblPropertyValue = value; 
                  }
                }
              }
            });
            comp[componentKey].flxSelectedComponentRight.segmentRight.setData(newData);
          }
        });
      }
    }
	
  /*  if ((!switched) && (!dropdown)){
      propComp.propertyValue = "";
    }*/
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

    // se è uguale a zero, lo stiamo richiamando nel momento dell'aggiunta di un componente nello step, altrimenti lo stiamo chiamando nell'apertura (edit) di un flusso
    let edit = false; 
    if (rightSegmentData.length !== 0) {
      edit = true;
    }

    let index = 0;
    //     let modes = [];
    this.view.settingsSide.flxScrollSettingsContent.removeAll();
    this.view.settingsSide.flxScrollSettingsContent.setVisibility(true);
    let instance = null;
    let lastComponentWidth = null;
    let left_width = parseInt(this.view.flxLeftRight.flxLeftSide.width, 10);
    let right_width = parseInt(this.view.flxLeftRight.flxRightSide.width, 10);
    
    // left side is open. we are putting the selected component in the left side. (preview Section)
    if ( left_width > 48 || gblEditingLeftSide ){
      let components_inside_filtered = this.view.flxScrollLeft.widgets().filter(widget =>
                                                           Object.keys(widget).some(key => key.startsWith("component"))
                                                          );
      let length = components_inside_filtered.length;
      if (length > 0){
        let lastComponent = components_inside_filtered[length - 1];
        let lastComponentKey = Object.keys(lastComponent).find(key => key.startsWith("component")); 
        lastComponentWidth = lastComponent[lastComponentKey].width;
      }
      let count = length; 
      instance = (count + 1).toString();
    }
    
    // right side is open. we are putting the selected component in the right side. (step Section)
    if ( right_width > 48 || gblEditingRightSide) {
      if (gblCurrentStepOrder > 1){
        let right_widgets = this.view.flxRightSide.widgets();
        let targetWidget = right_widgets.find(widget => widget.id === "flxScrollRight" + gblCurrentStepOrder);
        if (targetWidget){
          let components_inside = targetWidget.widgets();
          let components_inside_filtered = components_inside.filter(widget =>
                                               Object.keys(widget).some(key => key.startsWith("component"))
                                              );
          let length = components_inside_filtered.length;
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
        let length = components_inside_filtered.length;
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
      debugger;
      if(propertyName === "attribute") { // nestedComponents (or we could put configurable)
        nested = true;
        this.modes[compKey].push({"nestedComponents": [] });
      }
      
      if(((propertyName === "valueDependency") || (propertyName === "attributeDependency")) && (!(this.view.flxNestedBlur.isVisible || gblIsNestedInsideEdit))){ //da aggiungere OR 
        continue;
      }
            
      // trasformo le iniziali in maiuscolo e aggiungo i due punti alla fine.
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
        if (!gblPropertyTemplatesIds[list[i].component_name + "_" + instance]) {
          gblPropertyTemplatesIds[list[i].component_name + "_" + instance] = [];
        }
        let elem = {};
        elem[list[i].id] = { "name": list[i].name, "mode": "dropdown" };
        gblPropertyTemplatesIds[list[i].component_name + "_" + instance].push(elem);
        
      } else if (list[i].mode === "label") {
        propComp = new ki.luxottica.editPropertyValuewithTextField({
          id: `prop${new Date().getTime()}`,
          top: '2%',
          centerX: '50%'
        }, {}, {});
        
        //gblFlowId = 128; //to comment in the global flow of the application
        //let label_key = `${gblFlowId}_${list[i].name}_${this.view.lblStepTitleIntoStepComposition.text}_${instance}_${i+1}`; // LABEL QUI
        
        // retrieving the current step title (to insert into the final label_key)
        let label_key = null;
        var steps = null;
        var stepTitle = null;
        if (gblCurrentStepOrder < 2) {
          label_key = `${gblFlowId}_${list[i].name}_${this.view.lblStepTitleIntoStepComposition.text}_${instance}_${i+1}`;
        } else {
          steps = this.view.flxSteps.widgets();
          voltmx.print("### gblCurrentStepOrder: " + gblCurrentStepOrder);
          stepTitle = steps[gblCurrentStepOrder].stepTitle;
          label_key = `${gblFlowId}_${list[i].name}_${stepTitle}_${instance}_${i+1}`;
          voltmx.print("### stepTitle: " + stepTitle);
          voltmx.print("### label_key: " + label_key);
        }
        
        voltmx.print("### LABEL KEY: " + JSON.stringify(label_key));
        if (gblFetchedLabels.length > 0 && (gblEditingLeftSide || gblEditingRightSide)) {  // ci troviamo nel caricamento di componenti esistenti
          let record = gblFetchedLabels.find(temp => temp.id === label_key);
          debugger;
          if(!("en_GB" in record) || record["en_GB"] === null || record["en_GB"] === "") {
            propComp.propertyValue = label_key  // se "en_GB" è null o stringa vuota allora ci teniamo la chiave
          } else {
            propComp.propertyValue = record["en_GB"];  // altrimenti, assegnamo la traduzione
          }
        } else {
          debugger;
          // caso in cui stiamo inserendo in una delle due sezioni un nuovo componente
          if(!("default" in list[i]) || list[i].default === null || list[i].default === "") { // se ha delle labels con traduzioni di default, mostriamo quelle
            propComp.propertyValue = label_key;
            properties["lblPropertyValue"] = label_key;
          } else {  // altrimenti, mostriamo la chiave della label
            propComp.propertyValue = list[i].default;
            properties["lblPropertyValue"] = list[i].default;
          }
          
        }
        
        //propComp.propertyValue = label_key;
        propComp.propertyLabelKey = label_key;
        propComp.txtPropertyValueTextField.setEnabled(true); // QUI
        //properties["lblPropertyValue"] = label_key;
        
        propComp.onEndEditing = () => {
          this.onEndEditingCallback(propComp, null, false, false);
        };
        
		this.modes[compKey].push({"name": capitalizedName, "mode": "label", "key": label_key});
        if (!gblPropertyTemplatesIds[list[i].component_name + "_" + instance]) {
          gblPropertyTemplatesIds[list[i].component_name + "_" + instance] = [];
        }
        let elem = {};
        elem[list[i].id] = { "name": list[i].name, "mode": "label" , "default": list[i].default, "key": label_key};
        
        gblPropertyTemplatesIds[list[i].component_name + "_" + instance].push(elem);
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
        if (!gblPropertyTemplatesIds[list[i].component_name + "_" + instance]) {
          gblPropertyTemplatesIds[list[i].component_name + "_" + instance] = [];
        }
        let elem = {};
        elem[list[i].id] = { "name": list[i].name, "mode": "switch" };
        gblPropertyTemplatesIds[list[i].component_name + "_" + instance].push(elem);
        if (propComp.propertyValue === 0){
          properties["lblPropertyValue"] = "True";
        } else {
          properties["lblPropertyValue"] = "False";
        }
      } else {  // case for text box (different from label)
        propComp = new ki.luxottica.editPropertyValuewithTextField({
          id: `prop${new Date().getTime()}`,
          top: '2%',
          centerX: '50%'
        }, {}, {});
        if ((propertyName === "attributeDependency") && (this.view.flxNestedBlur.isVisible || gblIsNestedInsideEdit)){ //is the attributeDependency property of the nested
          let obj = this.father.rightData.find(item => item.lblPropertyName === "Attribute: ");
          let value = obj ? obj.lblPropertyValue : null;
          propComp.propertyValue = value;
          properties["lblPropertyValue"] = value;
          propComp.txtPropertyValueTextField.setEnabled(false);
        }
        propComp.onEndEditing = () => {
          voltmx.print("### EDITING CONCLUSO 2");          
          this.onEndEditingCallback(propComp, null, false, false);
        };
        this.modes[compKey].push({"name": capitalizedName, "mode": "textfield"});
        if (!gblPropertyTemplatesIds[list[i].component_name + "_" + instance]) {
          gblPropertyTemplatesIds[list[i].component_name + "_" + instance] = [];
        }
        let elem = {};
        //       elem[list[i].id] = list[i].name;
        elem[list[i].id] = { "name": list[i].name, "mode": "textfield" };
        gblPropertyTemplatesIds[list[i].component_name + "_" + instance].push(elem);
      }
      
      propComp.propertyName = capitalizedName;
      propComp.propertyTemplateId = list[i].id;
      this.view.settingsSide.flxScrollSettingsContent.add(propComp);
      index +=1;
      
      if (!edit) {
         rightSegmentData.push(properties);  // popolating the RIGHT data of the component
      }
     
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
    
    //debugger;
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

    //voltmx.application.showLoadingScreen(null, "Saving step...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});

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
            let elementoTrovato_left = gblPropertyTemplatesIds[component_instance_left["template_name"] + "_" + component_instance_left["order"]].find(item_left => {
              let [id_left, obj_left] = Object.entries(item_left)[0];
              return obj_left["name"] === prop_name_left;
            });
            let prop_id_left = Object.keys(elementoTrovato_left);
            if (elementoTrovato_left[prop_id_left[0]].mode === "label"){
              /*    let label = {
                id: prop_left.lblPropertyValue,
                flow_id: gblFlowId, 
                en_GB: elementoTrovato_left[prop_id_left[0]].default
              };
              */


			  
              let translations = {};
              // we have the ids and all translation different from english GB
              if (gblFetchedLabels.length > 0) {
              /*  let result = gblFetchedLabels.reduce((acc, record) => {
                  // per ogni record salviamo l'id
                  let filteredRecord = { id: record.id }; // Inizia con "id"
                  for (let key in record) {
                    // recuperiamo tutti gli id che non servono e che NON sono GB (lingua default) 
                    if (key !== 'flow_id' && key !== 'en_GB' && key !== 'id') {
                      filteredRecord[key] = record[key];
                    }
                  }
                  acc.push(filteredRecord);
                  return acc;
                }, []);  */

                
                let record = gblFetchedLabels.find(record => record.id === elementoTrovato_left[prop_id_left[0]].key);

                if (record) {
                  for (let key in record) {
                    if (key !== 'id' && key !== 'flow_id' && key !== 'en_GB') {
                      translations[key] = record[key];
                    }
                  }
                }

              }

              let label = {
                id: elementoTrovato_left[prop_id_left[0]].key,
                flow_id: gblFlowId, 
                en_GB: prop_left.lblPropertyValue === elementoTrovato_left[prop_id_left[0]].key ? elementoTrovato_left[prop_id_left[0]].default : prop_left.lblPropertyValue
              };

              if (Object.keys(translations).length > 0) {
                // Concatenare translations con label_right
                Object.assign(label, translations);  
              }
              
              
             

              voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("LABEL_create", {}, label, 
                                                                                               (response) => {
                voltmx.print("### Service response: " + JSON.stringify(response));
                property_instance_left["label_id"] = response.LABEL[0].id; //prop_left.lblPropertyValue
                property_instance_left["value"] = response.LABEL[0].en_GB; //prop_left.lblPropertyValue;
                property_instance_left["property_template_id"] = prop_id_left[0];
                voltmx.print("### PROP LEFT: " + JSON.stringify(property_instance_left));
                voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("PROPERTY_INSTANCE_create",{},property_instance_left,
                                                                                                 (response) => {
                  voltmx.print ("### Service response: "+JSON.stringify(response));
                },
                                                                                                 (error) => {
                  voltmx.print("### Error in the invocation of the service PROPERTY_INSTANCE_create: " + JSON.stringify(error));
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
                voltmx.print("### Error in the invocation of the service LABEL_create: " + JSON.stringify(error));
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
                voltmx.print("### Error in the invocation of the service PROPERTY_INSTANCE_create: " + JSON.stringify(error));
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
          voltmx.print("### Error in the invocation of the service COMPONENT_INSTANCE_create: " + JSON.stringify(error));
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
    let savedComponentIds = new Set();

    scrolls.forEach(scroll => {
      let number = 0;
      let step_id = 0;
      if (scroll.id === "flxScrollRight"){
        let entry = Object.entries(gblIdOrderSteps).find(([id, order]) => order === "1");
        number = entry ? entry[0] : undefined;
        step_id = entry ? entry[1] : undefined;

      } else {
        let match = scroll.id.match(/flxScrollRight(\d+)$/);
        if (match) {
          let temp = match[1];
          let entry = Object.entries(gblIdOrderSteps).find(([id, order]) => order === temp);
          number = entry ? entry[0] : undefined;
          step_id = entry ? entry[1] : undefined;
        }
      }
      let right_widgets = scroll.widgets();

      voltmx.print("### gblIdOrderSteps: " + gblIdOrderSteps);
      //       debugger;
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

          let completeKey = widget[componentKey]["flxSelectedComponentLeft"]["segmentLeft"]["data"][0].lblComponentName + "_" + widget[componentKey]["lblComponentOrder"].text + "_" + step_id;
          let keyArray = mode_dict[completeKey];
          //           debugger;
          let nestedObjs = keyArray.find(item => item.hasOwnProperty('nestedComponents'));
          if (nestedObjs && nestedObjs.nestedComponents.length > 0){
            if (!childIds.has(id)){
              parentIds.add(id);
            }
            nestedObjs.nestedComponents.forEach(childId => {
              if (childId in componentIdMap){
                children.push({[childId] : componentIdMap[childId]});
                childIds.add(childId);
              }
            });
          } else {
            // Se il componente non ha figli e non è già un figlio, aggiungilo ai parentIds
            if (!childIds.has(id)) {
              parentIds.add(id);
            }
          }
        });


        right_widgets = right_widgets.filter(widget => {
          let componentKey = Object.keys(widget).find(key => key.startsWith("component"));
          const id = widget[componentKey].id;
          return parentIds.has(id) || (!parentIds.has(id) && !childIds.has(id));
        });

        //         debugger;


        voltmx.print("right widgets after: " + right_widgets);
        voltmx.print("children after: " + children);

        const saveComponent = (component, step_id, parentComponentId = null) => {
          if (!component || savedComponentIds.has(component.id)) return;

          let component_instance_right = {
            template_name: null,
            step_id: null,
            order: null
          };
          let property_instance_right = {
            property_template_id: null,
            component_instance_id: null,
            value: null,
            label_id: null
          };

          component_instance_right["template_name"] = component["flxSelectedComponentLeft"]["segmentLeft"]["data"][0].lblComponentName;
          component_instance_right["step_id"] = number;
          component_instance_right["order"] = component["lblComponentOrder"].text;

          voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("COMPONENT_INSTANCE_create", {}, component_instance_right, (response) => {
            voltmx.print("### Service response SONO A DESTRA DENTRO: " + JSON.stringify(response));
            this.componentCreateCallback(component, property_instance_right, response, component_instance_right);
            let component_id = response.COMPONENT_INSTANCE[0].id;

            if (parentComponentId) {
              let nested_component = {
                component_instance_id: component_id,
                component_instance_father_id: parentComponentId
              };
              voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("NESTED_COMPONENT_create", {}, nested_component, (nestedResponse) => {
                voltmx.print("### Service response HO CREATO UN NESTED COMPONENT NEL DB: " + JSON.stringify(nestedResponse));
              }, (error) => {
                voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
                gblFail = true;
              });
            }

            savedComponentIds.add(component.id);

            let nestedComponentsKey = component["flxSelectedComponentLeft"]["segmentLeft"]["data"][0].lblComponentName + "_" + component["lblComponentOrder"].text + "_" + step_id;
            let nestedComponentsArray = this.modes[nestedComponentsKey];
            let nestedComponentsObj = nestedComponentsArray.find(item => item.hasOwnProperty('nestedComponents'));

            if (nestedComponentsObj && nestedComponentsObj.nestedComponents.length > 0) {
              nestedComponentsObj.nestedComponents.forEach(childId => {
                let childObj = children.find(child => childId in child);
                let child = childObj ? childObj[childId] : undefined;
                if (child) saveComponent(child, step_id, component_id);
              });
            }
          }, (error) => {
            voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
            gblFail = true;
          });
        };

        right_widgets.forEach(widget => {
          let componentKey = Object.keys(widget).find(key => key.startsWith("component"));
          let component = widget[componentKey];
          saveComponent(component, step_id);
        });

      } 
    });
    
    //voltmx.application.dismissLoadingScreen();
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
      let elementoTrovato_right = gblPropertyTemplatesIds[component_instance_right["template_name"] + "_" + component_instance_right["order"]].find(item_right => {
        let [id_right, obj_right] = Object.entries(item_right)[0];
        return obj_right["name"] === prop_name_right;
      });
      debugger;
      let prop_id_right = Object.keys(elementoTrovato_right);
      if (elementoTrovato_right[prop_id_right[0]].mode === "label"){
        debugger;
      //  gblFlowId = 338  TO BE COMMENTED
       /*  let label_right = {
           id: prop_right.lblPropertyValue,
           flow_id: gblFlowId, 
           en_GB: elementoTrovato_right[prop_id_right[0]].default
         };
        */
        
        let translations = {};
        // we have the ids and all translation different from english GB
        if (gblFetchedLabels.length > 0) {
    /*      let result = gblFetchedLabels.reduce((acc, record) => {
            let filteredRecord = { id: record.id }; // Inizia con "id"
            for (let key in record) {
              if (key !== 'flow_id' && key !== 'en_GB' && key !== 'id') {
                filteredRecord[key] = record[key];
              }
            }
            acc.push(filteredRecord);
            return acc;
          }, []);  */
          debugger;
          let record = gblFetchedLabels.find(record => record.id === elementoTrovato_right[prop_id_right[0]].key);
		  
          if (record) {
            for (let key in record) {
              if (key !== 'id' && key !== 'flow_id' && key !== 'en_GB') {
                translations[key] = record[key];
              }
            }
          }

        }
        
        let label_right = {
          id: elementoTrovato_right[prop_id_right[0]].key,
          flow_id: gblFlowId, 
          en_GB: prop_right.lblPropertyValue === elementoTrovato_right[prop_id_right[0]].key ? elementoTrovato_right[prop_id_right[0]].default : prop_right.lblPropertyValue
        };
        
        if (Object.keys(translations).length > 0) {
          // Concatenare translations con label_right
          Object.assign(label_right, translations);  
        }
        debugger;
        
        voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("LABEL_create", {}, label_right, 
                                                                                         (response) => {
          voltmx.print("### Service response: " + JSON.stringify(response));
          property_instance_right["label_id"] = response.LABEL[0].id;  // prop_right.lblPropertyValue;
          property_instance_right["value"] = response.LABEL[0].en_GB;  // prop_right.lblPropertyValue;
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
        },   // end of LABEL_create
              
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
  addNewStep: function(left_position, title){
    let index = gblLastInsertedStep + 1;

    gblLastInsertedStep += 1;
    gblCurrentStepOrder = gblLastInsertedStep;
    
    /*
    // query that returns all Steps (and infos/attributes) related to the @flow given as parameter.
    voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("STEP_flow_CustomQuery", {}, {flow_id : gblFlowId}, (response) => {
      voltmx.print("### Service STEP_flow_CustomQuery response: "+JSON.stringify(response));
      response.records.forEach(record => {
        gblIdOrderSteps[record.id] = record.order;
      });
      
    }, (error) => {
      voltmx.print("### Error in the invocation of the service STEP_flow_CustomQuery: " + JSON.stringify(error));
    });
    
    */
    
    let left_position_dp = left_position + "dp";
    voltmx.print("### left_position_dp: " + left_position_dp);
    
    const box = new ki.luxottica.boxStep({
      id: `boxStep${index}`,
      left: `${left_position_dp}`,
      centerY: '50%',
      //width: '60%',
    }, {}, {});
    

    box.stepOrder = "Step " + index;
    // box.stepTitle = gblCurrentStepTitle;
    box.stepTitle = title;
    
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
          gblCurrentStepTitle = widget.lblStepTitle.text;
          voltmx.print("### CURRENT STEP ORDER: " + JSON.stringify(gblCurrentStepOrder));
        } 
      }
      this.view.settingsSide.flxScrollSettingsContent.removeAll();
      this.view.settingsSide.flxScrollSettingsContent.setVisibility(false);
      this.view.settingsSide.txt.setVisibility(true);
    };  // end box.onCLickTeaser
    
    
    box.onTouchEndEditTeaser = () => {
      
      gblStepBoxToChange = box;
      // Showing "Change Step" label and "Save changes" button for edit in Popup
      this.view.flxPopupNewStep.setVisibility(true);
      this.view.lblNewStep.setVisibility(false);
      this.view.lblChangeStep.setVisibility(true);
      this.view.btnProceed.setVisibility(false);
      this.view.btnChange.setVisibility(true);
      newOrder = gblCurrentStepOrder.toString();

      voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("STEP_CustomQueryGetSingleStep", {}, {flow_id : gblFlowId, order: newOrder}, (STEP_CustomQueryGetSingleStep) => { 

        voltmx.print("### CLICCATO SU MATITINA");
        voltmx.print("### gblCurrentStepOrder: " + gblCurrentStepOrder);
        voltmx.print("### gblCurrentStepTitle: " + gblCurrentStepTitle);
        voltmx.print("### gblFlowId: " + gblFlowId);
        voltmx.print("### newOrder: " + newOrder);
        voltmx.print("### this.view.lblStepTitleIntoStepComposition: " + this.view.lblStepTitleIntoStepComposition.text);
        newTitle = this.view.lblStepTitleIntoStepComposition.text;

        if (STEP_CustomQueryGetSingleStep.STEP !== null) {
          voltmx.print("### record in CustomQueryGetSingleStep: " + JSON.stringify(STEP_CustomQueryGetSingleStep.records));
          // Assigning Step's data to each field
          //let newFlowId = STEP_CustomQueryGetSingleStep.records[0].flow_id;
          //let newOrder = STEP_CustomQueryGetSingleStep.records[0].order.toString();
          gblStepIdToChange = STEP_CustomQueryGetSingleStep.records[0].id;
          let newTitle = STEP_CustomQueryGetSingleStep.records[0].title;
          let newPrescription = STEP_CustomQueryGetSingleStep.records[0].prescription_step === "true" ? 0 : 1;
          let newAutoproceed = STEP_CustomQueryGetSingleStep.records[0].autoproceed === "true" ? 0 : 1;
          let newAutoskip = STEP_CustomQueryGetSingleStep.records[0].autoskip === "true" ? 0 : 1;
          let newGreyout = STEP_CustomQueryGetSingleStep.records[0].has_greyout === "true" ? 0 : 1;
          let newAnalytics = STEP_CustomQueryGetSingleStep.records[0].analytics_id;
          let newAutoproceedLabel = STEP_CustomQueryGetSingleStep.records[0].autoproceed_label;
          
          // now mapping this variables to the Popup for edit.
          this.view.txtStepTitle.text = newTitle;
          this.view.swIsPrescriptionStep.selectedIndex = newPrescription;
          this.view.swAutoproceed.selectedIndex = newAutoproceed;
          this.view.swAutoskip.selectedIndex = newAutoskip;
          this.view.swHasGreyout.selectedIndex = newGreyout;
          this.view.txtAutoproceedButtonLabel.text = newAutoproceedLabel;
        }


      }, (error) => {
        voltmx.print("### Error in service from Console");
      });


    };
    
    
    
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
    if (left_width > 48 || gblEditingLeftSide) {
      scroll = this.view.flxScrollLeft;
    }
    // if I am in the right side
    if (right_width > 48 || gblEditingRightSide){
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
    
    // if component have attribute: "Attribute", it can have nested components
    let obj = selectedComp.rightData.find(item => item.lblPropertyName === "Attribute: ");
    if (obj) {  
      selectedComp.flxAddNestedVisible = true;
    }

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
  
  
  // this function process all the steps related to a section (eather left or right) based on the list given in input and the order
  processSteps: function(listToProcess, order, componentsImages, propertyTemplates, nestedComponents) {
    
    // Filtra e raggruppa i record per component_template_name + component_order
    // dentro a componentDataDict ci sono tutti i componenti di uno step
    let componentDataDict = listToProcess.reduce((acc, reference) => {
      if (reference.step_order === order) {
        const key = `${reference.component_template_name}_${reference.component_id}_${reference.component_order}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push({ [reference.property_template_name]: reference.property_value });
      }
      return acc;
    }, {});

    // Estrazione delle chiavi (dei componenti) e ordinamento dei componenti in base al numero finale (es. "RXC_ATTRIBUTE_TILE_LIST_2")
    let sortedKeys = Object.keys(componentDataDict).sort((a, b) => {
      let orderA = parseInt(a.split('_').slice(-2)[1], 10); // Estrae il penultimo elemento come order
      let orderB = parseInt(b.split('_').slice(-2)[1], 10); // Estrae il penultimo elemento come order
      return orderA - orderB;
    });

    // Creazione di un nuovo oggetto ordinato
    let sortedDict = {};
    sortedKeys.forEach(key => {
      sortedDict[key] = componentDataDict[key];
    });
    
    // Raggruppa i records (delle immagini preview e modal) per component_name e component_order
    let groupedComponentsImages = componentsImages.reduce((acc, record) => {
      if (record.step_order === order) {
        let key = `${record.component_name}_${record.component_order}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(record);
      }
      return acc;
    }, {});
    
    debugger;
    // Raggruppa i records (di property templates) per component_name e component_order
    let groupedPropertyTemplates = propertyTemplates.reduce((acc, record) => {
      if (record.step_order === order) {
        let key = `${record.component_name}_${record.component_order}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        // Crea un nuovo oggetto con solo i campi desiderati
        let filteredRecord = Object.keys(record).reduce((filtered, field) => {
          if (!['step_order', 'component_order'].includes(field)) {
            filtered[field] = record[field];
          }
          return filtered;
        }, {});
        acc[key].push(filteredRecord);
      }
      return acc;
    }, {});


    // lista di dizionari dove la chiave è il padre e il valore è il figlio
    let parentChildMap = nestedComponents.reduce((acc, item) => {
      acc[item.component_instance_father_id] = item.component_instance_id;
      return acc;
    }, {});

    //debugger;

    let previewImage;
    let modalImage;
    
    // Iterazione sull'oggetto e log della parte della chiave senza il numero finale.
    // forEach che effettivamente processa i componenti.
    Object.entries(sortedDict).forEach(([key, value]) => {
      //let componentName = key.substring(0, key.lastIndexOf('_'));
      let componentName = key.split('_').slice(0, -2).join('_');
      let componentId = key.split('_').slice(-2, -1)[0];
      gblComponentId = componentId;
      
      // Dividi la chiave in parti
      let keyParts = key.split('_');
      // Rimuovi solo l'id e conserva il nome del componente e l'ordine
      let componentKey = keyParts.slice(0, -2).concat(keyParts.slice(-1)).join('_');
      //debugger;
      
      
      modalImage = groupedComponentsImages[componentKey][0].modalImage;
      previewImage = groupedComponentsImages[componentKey][0].previewImage;
      
      let list = groupedPropertyTemplates[componentKey];
      
      let transformedValue = value.map(item => {
        let [lblPropertyName, lblPropertyValue] = Object.entries(item)[0];
        // Controlla se il valore di una chiave è undefined e assegna una stringa vuota se lo è
        if (lblPropertyValue === undefined) {
          lblPropertyValue = "";
        }
        return { lblPropertyName, lblPropertyValue };
      });
      
      transformedValue.forEach(item => {
        let propertyName = item.lblPropertyName;
        let capitalizedName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1) + ": ";
        item.lblPropertyName = capitalizedName;
      });
      
      // Controlla se l'id è presente tra i valori dell'oggetto
      let values = Object.values(parentChildMap); // values contiene gli id dei figli (in dizionario).
      let isPresent = values.includes(componentId.toString());  // il component che stiamo processando è un figlio (innestato)
      
      if (isPresent) {
        //debugger;
        gblIsNestedInsideEdit = true;
        
        let scroll = this.findCurrentFlexScroll();
        let widgets = scroll.widgets();
        widgets.forEach(widget => {
          
          let componentKey = Object.keys(widget).find(key => key.startsWith("component"));
          // Trova la chiave associata al valore specificato
          //let parentId = Object.entries(parentChildMap).find(([key, val]) => val === componentId)?.[0];
          let entry = Object.entries(parentChildMap).find(([key, val]) => val === componentId);
          let parentId;
          if (entry) {
            parentId = entry[0];
          } else {
            parentId = undefined; // o qualsiasi altro valore predefinito che desiderato
          }
          
          if (widget[componentKey]["lblComponentId"].text === parentId) {
            gblFatherNest = widget[componentKey].leftData[0].lblComponentName + "_" + widget[componentKey].componentOrder + "_" + gblCurrentStepOrder;
            this.father = widget[componentKey];
          }
        });
        
      }
      //debugger;
      
      this.editProperty(list, transformedValue, [], componentName, previewImage, modalImage);
      
      //probabilmente dopo aver richiamato editProperty, risetta la variabile gblIsNestedInsideEdit a false.
      gblIsNestedInsideEdit = false;
    });
    
  }, // end of function processSteps.
  
  
  
  
  
  // this function laod the flow's data already existing (steps and components)
  loadFlowData: function(flow_id, stepsList, stepSectionList, previewSectionList, nestedComponents, componentsImages, propertyTemplates){  // stepsList è il risultato di STEP_flow_CustomQuery.records
    
    voltmx.application.showLoadingScreen(null, "Loading components...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    //checking input parameters content
    voltmx.print("### flow_id: " + flow_id);
    voltmx.print("### stepsList: " + JSON.stringify(stepsList) );
    voltmx.print("### stepSectionList: " + JSON.stringify(stepSectionList) );
    voltmx.print("### previewSectionList: " + JSON.stringify(previewSectionList) );
    voltmx.print("### nestedComponents: " + JSON.stringify(nestedComponents) );
    voltmx.print("### componentsImages: " + JSON.stringify(componentsImages) );
    voltmx.print("### propertyTemplates: " + JSON.stringify(propertyTemplates) );

    
    
    // resetting all global variables
    // Simple
    gblFirststepTitle = "";
    gblStepIdToChange = 0;
    gblStepBoxToChange = "";
    gblCurrentStepOrder = 1;
    gblCurrentStepTitle = "";
    gblLastInsertedStep = 1;
    gblFatherNest = "";
	// Collections
    gblPropertyTemplatesIds = {};
    gblIdOrderSteps = {};
    
    let left_position = 0;
    let steps_widgets = null;
    
    // setting the first step title
    this.view.lblStepTitleIntoStepComposition.text = stepsList[0].title;
    gblIdOrderSteps[stepsList[0].id] = stepsList[0].order;
    
    gblEditingLeftSide = true;
    //inside left
    this.processSteps(previewSectionList,"1", componentsImages, propertyTemplates, nestedComponents);
    gblEditingLeftSide = false; // after we are done with the function "processSteps", we set the boolean to false again.
    
    gblEditingRightSide = true;

    voltmx.print("### SONO DOPO CALLBACK SERVIZIO");
    
    // inside right
    this.processSteps(stepSectionList,"1", componentsImages, propertyTemplates, nestedComponents);
    
    stepsList.slice(1).forEach(record => {
      // retrieving the steps in order to know the correct position of the steps to insert (in the scroll flxSteps)
      steps_widgets = this.view.flxSteps.widgets();
      voltmx.print("### FLEX STEPS NUMBER OF WIDGETS: " + JSON.stringify(steps_widgets.length));

      if (steps_widgets.length <= 2){  // only add box and first box
        this.view.flxBoxFirstStep.backgroundColor = "FFFFFF00";
        this.view.flxBoxFirstStep.imgDeleteStep.setVisibility(false);
        this.view.flxBoxFirstStep.imgEditStep.setVisibility(false);
        this.view.flxBoxFirstStep.lblStepOrder.fontColor = "00000000";
        this.view.flxBoxFirstStep.lblStepTitleIntoStepComposition.fontColor = "00000000";
        //left_position = parseInt(self.view.flxBoxFirstStep.left, 10) + parseInt(self.view.flxBoxFirstStep.width, 10) + 1;
        left_position = parseInt(this.view.flxBoxFirstStep.left, 10) + 80 + 10;  //80 width of firstBox + 10 to keep some space  
      } else {  // there's already more than one step
        let lastStep = 'boxStep' + gblLastInsertedStep;
        steps_widgets.forEach(widget => {
          if (widget.id === lastStep) {
            widget.flxBoxStep.backgroundColor = "FFFFFF00";
            widget.imgDeleteStep.isVisible = false;
            widget.imgEditStep.isVisible = false;
            widget.lblStepOrder.fontColor = "00000000";
            widget.lblStepTitle.fontColor = "00000000";
            //left_position = parseInt(widget.left, 10) + parseInt(widget.width, 10) + 1;
            left_position = parseInt(widget.left, 10) + 80 + 10;
          }
        });
      }

      gblIdOrderSteps[record.id] = record.order;
      this.addNewStep(left_position, record.title);
      voltmx.print("### CURRENT STEP ORDER in forEach: " + JSON.stringify(gblCurrentStepOrder));
      
      this.processSteps(stepSectionList, record.order, componentsImages, propertyTemplates, nestedComponents);
      
    }); // end of forEach

    gblEditingRightSide = false;

    this.view.settingsSide.flxScrollSettingsContent.setVisibility(false);
    this.view.settingsSide.txt.setVisibility(true);
    
    voltmx.application.dismissLoadingScreen();
  }
  
  
});