define({ 

  //Type your controller code here
  component_instance_id : null,
  integrationService : voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB"),

  selectComponent: function(rightData, leftData, modes){
    voltmx.print("### RIGHT DATA: " + JSON.stringify(rightData));
    voltmx.print("### LEFT DATA: " + JSON.stringify(leftData));
    voltmx.print("### MODES: " + JSON.stringify(modes));
//     voltmx.print("### GLOBAL ORDER LEFT: " + gblLeftOrder);
//     voltmx.print("### GLOBAL ORDER RIGHT: " + gblRightOrder);
    const flex = new voltmx.ui.FlexContainer({
      id: `flex${new Date().getTime()}`,
      width: '96%',
      height: '27%',
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
      id: `channel${new Date().getTime()}`,
      width: '100%',
      height: '100%',
      centerX: '50%',
      centerY: '50%',
    }, {}, {});

    selectedComp.onRowClickTeaser = () => {
      this.view.settingsSide.flxScrollSettingsContent.removeAll();    
      this.view.settingsSide.flxScrollSettingsContent.setVisibility(true);
      //          this.view.settingsSide.txt.setVisibility(true);

      //          voltmx.print("### RIGHT DATA SELECTED COMPONENT: " + JSON.stringify(selectedComp.rightData));

      props = selectedComp.rightData;
      props.forEach(item => {
        let propComp = null;
        const found = modes.find(element => element.name === item.lblPropertyName); //found = {name: mode}
        if (found.mode === "dropdown"){
          propComp = new ki.luxottica.editPropertyValuewithDropdown({
            id: `prop${new Date().getTime()}`,
            top: '2%',
            centerX: '50%'
          }, {}, {});
          propComp.listBoxMasterData = found.masterData;
          propComp.listBoxPropertyValue.selectedKey = found.default;
          propComp.onSelection = () => {
            let identify = selectedComp.id;
            this.onEndEditingCallback(propComp, identify, true, false);
          }
        } else if (found.mode === "label") {
          propComp = new ki.luxottica.editPropertyValuewithTextField({
            id: `prop${new Date().getTime()}`,
            top: '2%',
            centerX: '50%'
          }, {}, {});
//           gblFlowId = 128;
          let label_key = item.lblPropertyValue;
          propComp.propertyValue = label_key;
          propComp.txtPropertyValueTextField.setEnabled(false);
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
            let identify = selectedComp.id;
            this.onEndEditingCallback(propComp, identify, false, false);
          }
        }
        propComp.propertyName = item.lblPropertyName;
        this.view.settingsSide.flxScrollSettingsContent.add(propComp);
      });


    };

    //self.view.selectedComponent.flxSelectedComponentRight.segmentRight.setData(rightSegmentData);
    // self.view.selectedComponent.flxSelectedComponentLeft.segmentLeft.setData(leftSegmentData);
    selectedComp.flxSelectedComponentLeft.segmentLeft.setData(leftData);
    selectedComp.flxSelectedComponentRight.segmentRight.setData(rightData);
    //       selectedComp.componentOrder = gblOrder.toString();
    selectedComp.componentId = this.component_instance_id;


    flex.add(selectedComp);      

    let left_width = parseInt(this.view.flxLeftRight.flxLeftSide.width, 10);
    let right_width = parseInt(this.view.flxLeftRight.flxRightSide.width, 10);

    if ( left_width > 48){
      //vuol dire che il pannello di sinistra è aperto
      //   self.view.flxSelectedComponent.setVisibility(true);
      voltmx.print("### IF LEFT WIDTH");
      //         gblSelectedComponentLeft = true;
      selectedComp.componentOrder = gblLeftOrder.toString();
      voltmx.print("### COMPONENT ORDER: " + selectedComp.componentOrder);
      this.view.flxContainerStepCreation.flxLeftRight.flxLeftSide.imgNoComponentsLeft.setVisibility(false);
      this.view.flxContainerStepCreation.flxLeftRight.flxLeftSide.lblNoComponentsLeft.setVisibility(false);
      this.view.flxContainerStepCreation.flxLeftRight.flxLeftSide.txtStartPhraseLeft.setVisibility(false);
      this.view.flxScrollLeft.setVisibility(true);
      this.view.flxScrollLeft.add(flex);
      this.view.flxScrollLeft.forceLayout();
      gblLeftOrder += 1;
    }
    if ( right_width > 48){
      //vuol dire che il pannello di destra è aperto
      //   self.view.flxSelectedComponentRight.setVisibility(true);
      voltmx.print("### IF RIGHT WIDTH");
      //         gblSelectedComponentRight = true;
      selectedComp.componentOrder = gblRightOrder.toString();
      voltmx.print("### COMPONENT ORDER: " + selectedComp.componentOrder);
      this.view.flxContainerStepCreation.flxLeftRight.flxRightSide.imgNoComponentsRight.setVisibility(false);
      this.view.flxContainerStepCreation.flxLeftRight.flxRightSide.lblNoComponentsRight.setVisibility(false);
      this.view.flxContainerStepCreation.flxLeftRight.flxRightSide.txtStartPhraseRight.setVisibility(false);
      this.view.flxScrollRight.setVisibility(true);
      this.view.flxScrollRight.add(flex);
      this.view.flxScrollRight.forceLayout();
      gblRightOrder += 1;
    }

  },

  onEndEditingCallback: function(propComp, identify, dropdown, switched){
    let value = null;
    if (dropdown){
       value = propComp.listBoxPropertyValue.selectedKeyValue[1];
    } else if (switched){
      value = propComp.propertyValue;
  	}  else {
      value = propComp.propertyValue;
    }
    //     voltmx.print("### VALUE: " + value);
    let left_width = parseInt(this.view.flxLeftRight.flxLeftSide.width, 10);
    let right_width = parseInt(this.view.flxLeftRight.flxRightSide.width, 10);
    let lastComp = null;
    if ( left_width > 48){
      components = this.view.flxScrollLeft.widgets();
      if (identify === null){
        // chiamata da editProperty
        lastComp = components.length > 0 ? components[components.length - 1] : null;
        let channelKey = Object.keys(lastComp).find(key => key.startsWith("channel"));
        if (lastComp[channelKey]["leftData"][0].lblComponentName === gblLastInsertedComponent){
          let newData = lastComp[channelKey]["rightData"];
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
          lastComp[channelKey].flxSelectedComponentRight.segmentRight.setData(newData);
        }
      } else {
        // chiamata da selectedComponent
        components.forEach((comp) => {
          let channelKey = Object.keys(comp).find(key => key.startsWith("channel"));
          if (channelKey === identify){
            let newData = comp[channelKey]["rightData"];
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
            comp[channelKey].flxSelectedComponentRight.segmentRight.setData(newData);
          }
        });
      }
    }
    if ( right_width > 48){
      components = this.view.flxScrollRight.widgets();
      if (identify === null) {
        // chiamata da editProperty
        lastComp = components.length > 0 ? components[components.length - 1] : null;
        let channelKey = Object.keys(lastComp).find(key => key.startsWith("channel"));
        if (lastComp[channelKey]["leftData"][0].lblComponentName === gblLastInsertedComponent){
          let newData = lastComp[channelKey]["rightData"];
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

          lastComp[channelKey].flxSelectedComponentRight.segmentRight.setData(newData);
        }
      } else {
        // chiamata da selectedComponent
        components.forEach((comp) => {
          let channelKey = Object.keys(comp).find(key => key.startsWith("channel"));
          if (channelKey === identify){
            let newData = comp[channelKey]["rightData"];
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
            comp[channelKey].flxSelectedComponentRight.segmentRight.setData(newData);
          }
        });
      }
    }
	
    if ((!switched) && (!dropdown)){
      propComp.propertyValue = "";
    }
  },

  editProperty: function(list, rightSegmentData, leftSegmentData, selected_item, selected_item_img){

    voltmx.print("### LIST: " + JSON.stringify(list));
//     LIST: [{"mode":"dropdown","default":"bottom-left","component_name":"RXC_BRAND_FOOTER","name":"position","id":"129","type":"string","position_values":"top-left, top-right, bottom-left, bottom-right, center","required":"false"},{"mode":"label","default":"Frame size","component_name":"RXC_BRAND_FOOTER","name":"frameSize","id":"130","type":"string","position_values":"top-left, top-right, bottom-left, bottom-right, center","required":"false"}]
    voltmx.print("### RIGHT SEGMENT DATA: " + JSON.stringify(rightSegmentData));
    voltmx.print("### LEFT SEGMENT DATA: " + JSON.stringify(leftSegmentData));
    voltmx.print("### SELECTED ITEM: " + JSON.stringify(selected_item));
    voltmx.print("### SELECTED ITEM IMG: " + JSON.stringify(selected_item_img));


    let index = 0;
    let modes = [];
    this.view.settingsSide.flxScrollSettingsContent.removeAll();
    this.view.settingsSide.flxScrollSettingsContent.setVisibility(true);
	
    const position_masterData = {
      position: "position_values",
      attribute: "availableAttributes",
      viewMode: "viewModes",
      nestedViewMode: "nestedViewModes",
      tilesFeaturesListLayout: "tilesFeaturesListLayout",
      targetDigitalOptometry: "targetDigitalOptometry"
    }

    for (let i = 0; i < list.length; i++) {

      console.log(list[i]);

//       if (list[i].required === 'true'){
      let propertyName = list[i].name;
      let capitalizedName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1) + ": ";
      let properties = {lblPropertyName: capitalizedName, lblPropertyValue: ""}; 
//       rightSegmentData.push(properties);
      gblLastInsertedComponent = selected_item;
      console.log(rightSegmentData);
      let propComp = null;
      if (list[i].mode === "dropdown"){
        propComp = new ki.luxottica.editPropertyValuewithDropdown({
          id: `prop${new Date().getTime()}`,
          top: '2%',
          centerX: '50%'
        }, {}, {});
        propComp.listBoxPlaceholder=`Please select a value`;
        let masterDataValues = position_masterData[list[i].name];
        let masterDataString = list[i][masterDataValues];
        voltmx.print("### MASTER DATA STRING: " + JSON.stringify(masterDataString));
        let valuesArray = masterDataString.split(", ");
        let masterDataList = [];
//         propComp.listBoxPropertyValue.placeholder="Please select a value";
        valuesArray.forEach((value, index) => {
          let id = `lb${index + 1}`;
          masterDataList.push([id, value.trim()]);
//           voltmx.print("### FINAL LIST: " + JSON.stringify(masterDataList));
        });
        propComp.listBoxMasterData = masterDataList;
        let key = "lb1";
        if ("default" in list[i] && list[i].default !== null){
          key = masterDataList.find(elemento => elemento[1] === list[i].default)[0];
        }
        propComp.listBoxPropertyValue.selectedKey = key;
        modes.push({"name": capitalizedName, "mode": "dropdown", "masterData": masterDataList, "default": key});
        propComp.onSelection = () => {
          this.onEndEditingCallback(propComp, null, true, false);
        };
//         voltmx.print("### PLACEHOLDER: " + JSON.stringify(propComp.listBoxPlaceholder));
      } else if (list[i].mode === "label") {
        propComp = new ki.luxottica.editPropertyValuewithTextField({
          id: `prop${new Date().getTime()}`,
          top: '2%',
          centerX: '50%'
        }, {}, {});
        gblFlowId = 128; //to comment in the global flow of the application
        let left_width = parseInt(this.view.flxLeftRight.flxLeftSide.width, 10);
        let right_width = parseInt(this.view.flxLeftRight.flxRightSide.width, 10);
        let label_key = ``;
        if (left_width > 48){
          label_key = `${gblFlowId}_[${list[i].name}_${this.view.lblStepTitleIntoStepComposition.text}_${gblLeftOrder}_${i+1}]`;
        }
        if (right_width > 48){
          label_key = `${gblFlowId}_[${list[i].name}_${this.view.lblStepTitleIntoStepComposition.text}_${gblRightOrder}_${i+1}]`;
        }
        voltmx.print("### LABEL KEY: " + JSON.stringify(label_key));
        propComp.propertyValue = label_key;
        propComp.txtPropertyValueTextField.setEnabled(false);
        properties["lblPropertyValue"] = label_key;
		modes.push({"name": capitalizedName, "mode": "label"});        
      } else if (list[i].mode === "switch"){
        propComp = new ki.luxottica.editPropertyValuewithSwitch({
          id: `prop${new Date().getTime()}`,
          top: '2%',
          centerX: '50%'
        }, {}, {});
        propComp.onSlide = () => {
          this.onEndEditingCallback(propComp, null, false, true);
        };
        modes.push({"name": capitalizedName, "mode": "switch"});
      } else {
        propComp = new ki.luxottica.editPropertyValuewithTextField({
          id: `prop${new Date().getTime()}`,
          top: '2%',
          centerX: '50%'
        }, {}, {});
        propComp.onEndEditing = () => {
          this.onEndEditingCallback(propComp, null, false, false);
        };
        modes.push({"name": capitalizedName, "mode": "textfield"});
      }
      propComp.propertyName = capitalizedName;
      propComp.propertyTemplateId = list[i].id;
      this.view.settingsSide.flxScrollSettingsContent.add(propComp);
      if (!gblPropertyTemplatesIds[list[i].component_name]) {
        gblPropertyTemplatesIds[list[i].component_name] = [];
      }
      let elem = {};
      elem[list[i].id] = list[i].name;
      gblPropertyTemplatesIds[list[i].component_name].push(elem);
//       }
      index +=1;
      rightSegmentData.push(properties);
    }
    if (this.view.settingsSide.flxScrollSettingsContent.widgets().length > 0){
      this.view.settingsSide.txt.setVisibility(false);
      this.view.settingsSide.flxScrollSettingsContent.setVisibility(true);
      this.view.settingsSide.flxScrollSettingsContent.forceLayout();
    }
    let selected_component_data = {lblComponentName: selected_item, imgComponent: selected_item_img};
    leftSegmentData.push(selected_component_data);

    this.selectComponent(rightSegmentData, leftSegmentData, modes);

  },

  SHOW_ALERT_Failure_Callback: function() {
    voltmx.print("### FAIL ALERT CALLBACK");
  },
  
  SHOW_ALERT_Success_Callback: function() {
    voltmx.print("### SUCCESS ALERT CALLBACK");
  },

  saveStepComposition: function(){
    voltmx.print("### GBL PROPERTY TEMPLATES IDS: " + JSON.stringify(gblPropertyTemplatesIds));
    let left_widgets = this.view.flxScrollLeft.widgets();
    let right_widgets = this.view.flxScrollRight.widgets();
    var numberPart = this.view.lblStepOrder.text.match(/\d+/);


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
        let channelKey = Object.keys(widget).find(key => key.startsWith("channel"));
        component_instance_left["template_name"] = widget[channelKey]["flxSelectedComponentLeft"]["segmentLeft"]["data"][0].lblComponentName;
        let number = parseInt(numberPart[0], 10);
        if (numberPart){
          component_instance_left["step_id"] = number;  
        }
        component_instance_left["order"] = widget[channelKey]["lblComponentOrder"].text;

        voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("COMPONENT_INSTANCE_create",{},component_instance_left,
                                                                                         (response) => {
          voltmx.print("### Service response: "+JSON.stringify(response));
          widget[channelKey]["lblComponentId"].text = response.COMPONENT_INSTANCE[0].id;
          property_instance_left["component_instance_id"] = response.COMPONENT_INSTANCE[0].id;
          let props_left = widget[channelKey]["flxSelectedComponentRight"]["segmentRight"]["data"];
          props_left.forEach(function(prop_left) {
            property_instance_left["value"] = prop_left.lblPropertyValue;
            let cleanedStr_left = prop_left.lblPropertyName.replace(/[^a-zA-Z0-9]+$/, '').replace(/^[^a-zA-Z0-9]+/, '');
			let camelCaseStr_left = cleanedStr_left.charAt(0).toLowerCase() + cleanedStr_left.slice(1);
            let prop_name_left = camelCaseStr_left;
            let elementoTrovato_left = gblPropertyTemplatesIds[component_instance_left["template_name"]].find(item_left => {
              let [id_left, tipoItem_left] = Object.entries(item_left)[0];
              return tipoItem_left === prop_name_left;
            });
            let prop_id_left = Object.keys(elementoTrovato_left);
            property_instance_left["property_template_id"] = prop_id_left[0];
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
          });
        },
                                                                                         (error) => {
          voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
          gblFail = true;
        });
      });
           
    } 

    if (right_widgets.length > 0){
      voltmx.print("### SONO A DESTRA");
      
      right_widgets.forEach(function(widget) {
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
        let channelKey = Object.keys(widget).find(key => key.startsWith("channel"));
        component_instance_right["template_name"] = widget[channelKey]["flxSelectedComponentLeft"]["segmentLeft"]["data"][0].lblComponentName;
        let number = parseInt(numberPart[0], 10);
        if (numberPart){
          component_instance_right["step_id"] = number;  
        }
        component_instance_right["order"] = widget[channelKey]["lblComponentOrder"].text;

        voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("COMPONENT_INSTANCE_create",{},component_instance_right,
                                                                                         (response) => {
          voltmx.print("### Service response: "+JSON.stringify(response));
          widget[channelKey]["lblComponentId"].text = response.COMPONENT_INSTANCE[0].id;
          property_instance_right["component_instance_id"] = response.COMPONENT_INSTANCE[0].id;
          let props_right = widget[channelKey]["flxSelectedComponentRight"]["segmentRight"]["data"];
          props_right.forEach(function(prop_right) {
            property_instance_right["value"] = prop_right.lblPropertyValue;
            let cleanedStr = prop_right.lblPropertyName.replace(/[^a-zA-Z0-9]+$/, '').replace(/^[^a-zA-Z0-9]+/, '');
			let camelCaseStr = cleanedStr.charAt(0).toLowerCase() + cleanedStr.slice(1);
            let prop_name_right = camelCaseStr;
            let elementoTrovato_right = gblPropertyTemplatesIds[component_instance_right["template_name"]].find(item_right => {
              let [id_right, tipoItem_right] = Object.entries(item_right)[0];
              return tipoItem_right === prop_name_right;
            });
            let prop_id_right = Object.keys(elementoTrovato_right);
            property_instance_right["property_template_id"] = prop_id_right[0];
            voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("PROPERTY_INSTANCE_create",{},property_instance_right,
                                                                                             (response) => {
              voltmx.print ("### Service response: "+JSON.stringify(response));
            },
                                                                                             (error) => {
              voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
              //                     voltmx.application.dismissLoadingScreen();
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
          });
        },
                                                                                         (error) => {
          voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
          gblFail = true;
        });
      });
            } 

  }
  
  /*
  publish: async () => {
    var JSON_flow = {
        channel: null,
        category: null,
        isSupernova: null,
        layout: {
          id: null,
          type: null,
          sizes: {
            previewSection: null,
            stepSection: null
          },
          previewImage: null
        }
      };
    var JSON_preview = {
      components: []
    };
    
    var JSON_step = {
      steps: []
    };
    
    var JSON_step_composition = {
      definingAttributes : {
        order: null,
        title: null,
        autoProceed: null,
        autoProceedLabel: null,
        autoSkip: null,
        hasGreyout: null,
        analytics_ID: null
      },
      components: []
    };
    
    var JSON_default_new = gblDefaultComponents;
    var JSON_default = [
      {
        id: "RXC_EXIT_POPUP",
        exitTitle: "Are you sure you want to exit?",
        exitSubtitle: "Your lens selection will not be saved",
        exitYes: "Yes, exit",
        exitContinueEditing: "No, continue",
        exitSave: "Save and continue shopping",
      },
      {
        id: "RXC_CRASH_POPUP",
        errorTitle: "Something went wrong...",
        errorDescription:
        "We’re experiencing some technical difficulties, we apologize. In the meantime, if you have any questions or need assistance, feel free to <a href='#'>contact our customer service.</a>",
        buttonLabel: "Back",
      },
      {
        id: "RXC_HOW_TO_READ_YOUR_PRESCRIPTION_MODAL",
        title: "How to read your prescription",
        subtitle:
        "If you have a prescription for eyeglasses, the prescription information will typically include the following:",
        rightEye_name: " OD (Right Eye)",
        rightEye_description:
        'OD stands for "oculus dexter" which is Latin for "right eye".',
        leftEye_name: " OS (Left Eye)",
        leftEye_description:
        'OS stands for "oculus sinister" which is Latin for “left eye”.',
        sphere_name: "Sphere (SPH) - also known as Power (PWR)",
        sphere_description:
        "They mean the same thing: the strength of your prescription. If you're nearsighted you will have a minus (-) before your values, and if you’re or farsighted you will have a plus (+).",
        cylinder_name: "Cylinder (CYL)",
        cylinder_description:
        "This is for people with astigmatism. This is when one part of the eye needs more correction than the rest. The Cylinder value is written with a minus (-) sign.",
        axis_name: "Axis",
        axis_description:
        "This is only for people with astigmatism. The axis is a number between 0 and 180 and determines the orientation of the Cylinder (CYL).",
        add_name: "Add",
        add_description:
        "This indicates the additional magnifying power that is added to the lens to correct presbyopia, a common age-related condition that affects near vision.",
        infoText:
        "If any of this information isn’t included in your prescription, you can leave the field blank.",
        customerService:
        "Not sure about something? Call our Customer Service experts",
      },
      {
        id: "RXC_MANUAL_INPUT_READERS",
      },
      {
        id: "RXC_PD_MODAL",
      },
      {
        id: "RXC_PD_OPTY_MODAL",
      },
      {
        id: "RXC_PRESCRIPTION_DETAILS_MODAL",
        title: "Your prescription details",
        edit: "Edit prescription",
        sphere: "SPH",
        cylinder: "CYL",
        axis: "Axis",
        add: "ADD",
        pd: "PD",
        od: "OD",
        right: "Right",
        left: "Left",
        os: "OS",
        vertical: "Vertical Prism (Δ)",
        baseDirection: "Base Direction",
        horizontal: "Horizontal Prism (Δ)",
      },
      {
        id: "RXC_0_POWER_POPUP",
        continueModal_titleNoAdd: "ARE YOU SURE YOU WANT TO CONTINUE?",
        continueModal_messageNoAdd:
        "Please make sure to enter the Addition (ADD) value if it is listed in your prescription, otherwise please proceed without.",
        continueModal_continueNoAdd: "Continue without (add)",
        continueModal_title: "Send prescription later",
        continueModal_message:
        "By clicking on continue, you will be skipping the prescription step. We’ll ask for it after your order, either by uploading it or having us call your doctor.",
        continueModal_continue: "Yes, continue",
        continueModal_cancel: "No, go back",
        noPowerModal_title: "continue with non-prescription lenses",
        noPowerModal_subtitle:
        "You have not entered a prescription for your glasses. Would you like to proceed with non-prescription lenses?",
        noPowerModal_continue: "yes, continue",
        noPowerModal_cancel: "no, cancel",
      },
      {
        id: "RXC_PRESCRIPTION_PANEL",
        pupillaryDistanceSubtitle:
        "You can select the default settings of 61 for women and 64 for men if you have an average or low prescription. If you have a strong prescription or if you want to know your exact Pupillary Distance, please ",
        selectNewFrame: "Select new frame",
        title: "Enter your prescription",
        description:
        "Insert the parameters you find on your prescription in the table below.",
        rightEye_initials: "OD",
        rightEye_name: "(Right)",
        leftEye_initials: "OS",
        leftEye_name: "(Left)",
        sphere: "SPH (Sphere)",
        cylinder: "CYL (Cylinder)",
        axis: "Axis",
        add: "Add",
        selectPlaceholder: "None",
        vertical: "Vertical (Δ)",
        baseDirection: "Base Direction",
        horizontal: "Horizontal (Δ)",
        pupillaryDistance: "PD (Pupillary distance)",
        pdLeft: "Left",
        pdRight: "Right",
        iHaveTwoPd: "I have 2 Pupillary Distance numbers",
        commentsTitle: "Comments",
        applyButton: "Continue",
        applyButtonSave: "Save and continue",
        howToRead: "How to read your prescription",
        pupillaryDistanceWarningValue:
        "Please input your pupillary distance, if you don’t have it you can use the default from the above or you can ",
        pupillaryDistanceMisurePDAction: "measure your Pupillary Distance.",
        pupillaryDistanceMisurePDActionHowToRead: "measure your PD",
        pupillaryDistanceWarningTooltip: "Provide text for this tooltip",
        moreOptions: "More options",
        incompatibleFrame:
        "We're sorry - the frames you’ve chosen aren't compatible with your prescription.<br/>Please select another style. Have questions? You can <a href='https?://www.glasses.com/gl-us/contact-us'>contact our Customer Service</a> team.",
        incompatibleLenses:
        "We're sorry, the prescription you've entered isn't compatible with our lenses offered online. Find a store near you or contact our <a href='https?://www.glasses.com/gl-us/contact-us'>Customer Service</a> team for more information.",
        incompatibleLensTypeErrorSingle:
        "You selected single vision lenses, but your saved prescription is for progressive lenses. We have updated your prescription below. Please check that it’s still valid.",
        incompatibleLensTypeErrorProgressive:
        "You selected progressive lenses, but your saved prescription is for single vision lenses. We have updated your prescription below. Please check that it’s still valid.",
        clearAll: "clear all",
        alerts_pdValueWarningDigitalOptometrySmaller:
        "The selected Pupillary Distance is smaller than average, we suggest double checking your prescription. You can leave the default values written above or you can ",
        alerts_pdValueWarningDigitalOptometryLarger:
        "The selected Pupillary Distance is larger than average, we suggest double checking your prescription. You can leave the default values written above or you can ",
        alerts_pdValueWarningSmaller:
        "The selected Pupillary Distance is smaller than average, we suggest double checking your prescription.</b></br>You can leave the default setting of 63 which is the average measurement for adults.<br>If we need any more information about your prescription, one of our experts will be in touch.",
        alerts_pdValueWarningLarger:
        "The selected Pupillary Distance is larger than average, we suggest double checking your prescription.</b></br>You can leave the default setting of 63 which is the average measurement for adults.<br>If we need any more information about your prescription, one of our experts will be in touch.",
        alerts_pdValueWarning2:
        "The selected Pupillary Distance is smaller than average, we suggest double checking your prescription. If you don’t have the Pupillary Distance here .",
        alerts_missingBaseDir: "Please choose the base direction for your prism",
        alerts_missingPrismValues: "Please choose the prism value",
        alerts_missingValues: "Complete the missing values",
        alerts_incompatibleWithPrescriptionTitle:
        "Sorry! The frame you’ve chosen isn’t compatible with your prescription",
        alerts_incompatibleWithPackagesTitle:
        "Sorry! The prescription you've chosen isn't compatible with any of our available lenses for this frame",
        alerts_shopCompatible: "Shop compatible frames",
        alerts_clearAll: "Clear all",
        alerts_agreementTextMobile:
        "By clicking this box, I confirm that the prescription values entered above are taken from a valid (not expired) prescription issued to me, signed by a licensed optometrist or ophthalmologist.",
        alerts_axisRangeError:
        "The AXIS values you’ve inserted are not correct! These values must be between 1 and 180.",
        alerts_axisZeroError:
        "The AXIS values you’ve inserted are not correct! If CYL value is higher or lower than 0,  AXIS values can’t be 0.",
        alerts_sphPositiveNegativeWarning:
        "You’ve inserted 1 positive and 1 negative value, which is very rare. <br>We suggest double checking your prescription. If this is correct, you can proceed.",
        alerts_pdValueWarning:
        "The selected Pupillary Distance is outside the normal range, we suggest double checking your prescription. You can leave the default setting of 63 which is the average measurement for adults. \nIf we need any more information about your prescription, one of our experts will be in touch.",
        alerts_requiredToProceed: "This is required to proceed",
        alerts_incompatibleWithPrescriptionBody:
        "but don’t worry, compatible frames are available",
        alerts_agreementText:
        "By clicking this box, I confirm that the prescription values entered above are taken from a valid (not expired) prescription issued to me, signed by a licensed optometrist or ophthalmologist.",
        digitalOptometry_title: "How to measure your Pupillary Distance",
        digitalOptometry_appSubtitle:
        "Your Pupillary Distance, or PD, is the distance in millimeters (mm) from the center of one pupil to the center of the other. It indicates exactly which part of the lens you look through, ensuring optimal comfort and clarity. You can measure with the app or manually.",
        digitalOptometry_manuallySubtitle:
        "Your Pupillary Distance, or PD, is the distance in millimeters (mm) from the center of one pupil to the center of the other. You can measure with the app or manually.",
        digitalOptometry_toggle_app: "WITH THE APP",
        digitalOptometry_toggle_manually: "MANUALLY",
        digitalOptometry_opthyDesc:
        "<b>Get your glasses just right with Opthy.</b><br/><p>Opthy measures your Pupillary Distance, allowing you to find the most comfortable, personalized fit.</p><p>App available on iPhone X and above.</p>",
        digitalOptometry_manuallyContent:
        "<div>If you want, you can measure your Pupillary Distance (PD) yourself by following these steps?:</div><ul><li>Grab a small ruler in one hand, and have your pencil and paper handy.</li><li>Now position yourself approximately 8 inches (20 cm) away from a mirror.</li><li>Close your left eye and align the 0 over the center of your right pupil.</li><li>Measure the distance from your right to your left pupil.</li><li>The number that lines up directly over your left pupil is your PD (an average PD for an adult ranges between 58 and 65).</li></ul>",
        issueDate_label: "Issue date (MM/YYYY)",
        issueDate_missingError: "Please insert date",
        issueDate_formatError: "The date entered is not valid",
        issueDate_tooltipText:
        "Before submitting your prescription, please check the expiration date to make sure it is current and valid. We only accept prescriptions that have been issued within the last 2 years. By selecting the tick box and continuing below, you agree to our privacy policy and T&Cs.",
        samePrescriptionBothEyesLabel: "Same prescription for both eyes",
        addPrismValues: "My prescription includes prism values",
        whatIsIt: "What is PD (Pupillary Distance)",
        editTitle: "Edit your prescription",
        withoutPrescriptionFromMyAccount:
        "You don’t have a prescription saved in your account. Add your prescription below and save it for future purchases or go back and choose another method.",
        californian_toggle: "Are you a California resident?",
        californian_info:
        "Please note that besides adding prescription values manually, California residents are also required to electronically transmit their valid prescription.",
        californian_infoCMD:
        "Please note that besides adding prescription values manually, <b>California residents are also required to electronically transmit their valid prescription</b>. Choose an option to proceed.",
        californian_chooseTitle: "CHOOSE HOW TO SEND YOUR PRESCRIPTION",
        californian_uploadTitle: "UPLOAD YOUR PRESCRIPTION",
        californian_uploadDesc:
        "We accept the following file formats?: .pdf, .png, .jpeg, .gif, .tiff, .bmp, .docx (max 10 MB) and IWork pages.",
        californian_uploadButton: "Upload",
        californian_callMyDoc: "CALL MY DOCTOR",
        californian_callMyDocButton: "FIND YOUR DOCTOR",
        californian_yes: "YES",
        californian_no: "NO",
        californian_modalMissingPrescription_title: "Missing prescription values",
        californian_modalMissingPrescription_subtitle:
        "If you don’t fill the values we won’t be able to suggest the right lens for you",
        californian_modalMissingPrescription_bottonYes: "YES, CONTINUE",
        californian_modalMissingPrescription_bottonNo: "NO, GO BACK",
        proceedCheckbox:
        "By clicking this box, I confirm that the prescription values entered above are taken from a unexpired written prescription issued to me, signed by a licensed optometrist or ophthalmologist.",
        proceedCheckboxError: "Required to proceed",
        savePrescriptionInAccount: "Save prescription in My Account",
        newPrescriptionNameError: "Prescription name field cannot be empty",
        prescriptionName: "Prescription name",
      },
      {
        id: "RXC_CALL_MY_DOCTOR",
      },
      {
        id: "RXC_UPLOAD_PRESCRIPTION",
      },
      {
        id: "RXC_USE_SAVED_PRESCRIPTION",
        title: "Select your prescription",
        subtitle:
        "Choose the preferred prescription and we’ll take care of the rest. \n Can’t find it?",
        subtitleAdd: "Add a new prescription",
        prescriptionName: "Prescription name",
        addPrescriptionButton: "Add new prescription",
        uploadedOn: "Last updated: ",
        today: "Today",
        yesterday: "Yesterday",
        justUpdated: "Just updated",
        olderThanYearBanner:
        "This prescription was uploaded 1 year ago. Please check if it is still valid.",
        showPrescription: "show prescription",
      }
    ];
    
    gblFlowId = "128";
    
    var flow_id_param = {
      flow_id : gblFlowId
    };
    
    var component_params = {
      flow_id : gblFlowId,
      section_type: null
    };
        
    
    const getJSONFlow = (flow_id_param) => new Promise((resolve, reject) => {
      voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("FLOW_CustomQuery", {}, flow_id_param, (response) => {
        voltmx.print ("### Service response: "+JSON.stringify(response));
        voltmx.print("### RECORDS: " + JSON.stringify(response.records));
        
//       RECORDS: [{"channel_name":"RayBan","layout_id":"1","sizes_stepSection":"step size","layout_type":"type","category":"Eyeglasses","sizes_previewSection":"preview si","layout_previewImage":"image","isSupernova":"false"}]
      
        JSON_flow["channel"] = response.records[0].channel_name;
        JSON_flow["category"] = response.records[0].category;
        JSON_flow["isSupernova"] = response.records[0].isSupernova;
        JSON_flow["layout"]["id"] = response.records[0].layout_id;
        JSON_flow["layout"]["type"] = response.records[0].layout_type;
        JSON_flow["layout"]["sizes"]["previewSection"] = response.records[0].sizes_previewSection;
        JSON_flow["layout"]["sizes"]["stepSection"] = response.records[0].sizes_stepSection;
        JSON_flow["layout"]["previewImage"] = response.records[0].layout_previewImage;

        voltmx.print("### JSON FLOW: " + JSON.stringify(JSON_flow));
      	resolve(JSON_flow);
        
      }, (error) => {
        voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
        reject(error);
      });
    });
    
    JSON_flow = await getJSONFlow(flow_id_param);
    
      component_params["section_type"] = "previewSection";
    
      const getPreviewFlow = (component_params) => new Promise((resolve, reject) => {
        voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("Components_CustomQuery", {}, component_params, (response) => {
        voltmx.print ("### Service response: "+JSON.stringify(response));
        voltmx.print("### RECORDS: " + JSON.stringify(response.records));
        let component = {};
        //       let records_test = [{"property_template_name":"position","component_template_name":"RXC_BRAND_FOOTER","property_value":"ciao"},{"property_template_name":"test","component_template_name":"RXC_BRAND_FOOTER","property_value":"test_value"}, {"property_template_name":"position","component_template_name":"RXC_BRAND_LOGO","property_value":"top-left"}, {"property_template_name":"position","component_template_name":"RXC_BRAND_IMAGE","property_value":"top-left"}];
        response.records.forEach((record) => {
          voltmx.print("### RECORD: " + JSON.stringify(record));
          let uniqueKey = `${record.component_template_name}_${record.component_order}`;
          if (!component[uniqueKey]) {
            component[uniqueKey] = { id: record.component_template_name, properties: [] };
          }
          component[uniqueKey].properties.push({
            name: record.property_template_name,
            value: record.property_value
          });      
        });
//         Object.values(component).forEach(item => JSON_preview["components"].push(item));
          let componentsArrayPreview = Object.values(component).map(component_item => {
            let transformedComponentPreview = {
              id: component_item.id
            };
            // Aggiungi ciascuna proprietà come chiave diretta del componente
            component_item.properties.forEach(prop => {
              transformedComponentPreview[prop.name] = prop.value;
            });
            return transformedComponentPreview;
          });
          // Aggiungi l'array dei componenti a JSON_step_composition["components"]
          JSON_preview["components"] = componentsArrayPreview;
        voltmx.print("### JSON PREVIEW: " + JSON.stringify(JSON_preview["components"]));
        resolve(JSON_preview);
      }, (error) => {
        voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
        reject(error);
    });
        
      });
    
    JSON_preview = await getPreviewFlow(component_params);
    
    const getStepFlow = (flow_id_param) => new Promise((resolve, reject) => {
    voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("STEP_flow_CustomQuery", {}, flow_id_param, (response) => {
      voltmx.print ("### Service response: "+JSON.stringify(response));
      voltmx.print("### RECORDS: " + JSON.stringify(response.records));
      // Mappatura dei nomi delle chiavi dall'input a JSON_step_composition
      const keyMapping = {
        "order": "order",
        "title": "title",
        "autoproceed": "autoProceed",
        "autoproceed_label": "autoProceedLabel",
        "autoskip": "autoSkip",
        "has_greyout": "hasGreyout",
        "analytics_id": "analytics_ID"
      };
      // Mappatura dinamica dei valori
      Object.keys(JSON_step_composition["definingAttributes"]).forEach(attr => {
        // Trova la chiave corrispondente in input usando keyMapping
        const inputKey = Object.keys(keyMapping).find(key => keyMapping[key] === attr);
        // Assegna il valore dall'input, se esiste; altrimenti, lascia null
        JSON_step_composition["definingAttributes"][attr] = response.records[0][inputKey] || null;
      });
      voltmx.print("### JSON STEP COMPOSITION: " + JSON.stringify(JSON_step_composition));
      resolve(JSON_step_composition);
    }, (error) => {
      voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
    });
    });
                                                       
    JSON_step_composition = await getStepFlow(flow_id_param);
    
    component_params["section_type"] = "stepSection";
    const getSectionFlow = (component_params) => new Promise((resolve, reject) => {
    voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("Components_CustomQuery", {}, component_params, (response) => {
      voltmx.print ("### Service response: "+JSON.stringify(response));
      voltmx.print("### RECORDS: " + JSON.stringify(response.records));
      let component = {};
//       let records_test = [{"property_template_name":"position","component_template_name":"RXC_BRAND_FOOTER","property_value":"ciao"},{"property_template_name":"test","component_template_name":"RXC_BRAND_FOOTER","property_value":"test_value"}, {"property_template_name":"position","component_template_name":"RXC_BRAND_LOGO","property_value":"top-left"}, {"property_template_name":"position","component_template_name":"RXC_BRAND_IMAGE","property_value":"top-left"}];
      response.records.forEach((record) => {
      	voltmx.print("### RECORD: " + JSON.stringify(record));
        let uniqueKey = `${record.component_template_name}_${record.component_order}`;
        if (!component[uniqueKey]) {
            component[uniqueKey] = { id: record.component_template_name, order: parseInt(record.component_order, 10), properties: [] };
        }
        component[uniqueKey].properties.push({
          name: record.property_template_name,
          value: record.property_value
        });      
      });
//       Object.values(component).forEach(item => JSON_step_composition["components"].push(item));
      // Trasforma l'oggetto dei componenti in un array e aggiusta la struttura secondo le esigenze
      let componentsArray = Object.values(component).map(component_item => {
        let transformedComponent = {
          id: component_item.id,
          order: component_item.order
        };
        // Aggiungi ciascuna proprietà come chiave diretta del componente
        component_item.properties.forEach(prop => {
          transformedComponent[prop.name] = prop.value;
        });
        return transformedComponent;
      });
      // Aggiungi l'array dei componenti a JSON_step_composition["components"]
      JSON_step_composition["components"] = componentsArray;
      
      voltmx.print("### JSON STEP COMPOSITION: " + JSON.stringify(JSON_step_composition["components"]));
      JSON_step["steps"].push(JSON_step_composition);
      resolve(JSON_step);
    }, (error) => {
      voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
    });
    });
    
    JSON_step = await getSectionFlow(component_params);
    
    
    var JSON_output = {
      definingAttributes: JSON_flow,
      previewSection: JSON_preview,
      stepSection: JSON_step,
      defaultComponents: JSON_default
    };

    voltmx.print("### JSON OUTPUT: " + JSON.stringify(JSON_output));
    
    
    
  }
  */






});