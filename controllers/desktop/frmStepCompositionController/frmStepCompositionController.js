define({ 

  //Type your controller code here
  component_instance_id : null,
  integrationService : voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB"),

  selectComponent: function(rightData, leftData){
    //       voltmx.print("### LEFT INDEX: " + JSON.stringify(left_index));
    //       voltmx.print("### RIGHT INDEX: " + JSON.stringify(right_index));
    voltmx.print("### RIGHT DATA: " + JSON.stringify(rightData));
    voltmx.print("### LEFT DATA: " + JSON.stringify(leftData));
    voltmx.print("### GLOBAL ORDER LEFT: " + gblLeftOrder);
    voltmx.print("### GLOBAL ORDER RIGHT: " + gblRightOrder);
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
      //          voltmx.print("### CIAO");
      this.view.settingsSide.flxScrollSettingsContent.removeAll();    
      this.view.settingsSide.flxScrollSettingsContent.setVisibility(true);
      //          this.view.settingsSide.txt.setVisibility(true);

      //          voltmx.print("### RIGHT DATA SELECTED COMPONENT: " + JSON.stringify(selectedComp.rightData));

      props = selectedComp.rightData;
      props.forEach(item => {
        const propComp = new ki.luxottica.editPropertyValuewithTextField({
          id: `prop${new Date().getTime()}`,
          top: '1%',
          centerX: '50%',
          bottom: '1%'
        }, {}, {});

        propComp.propertyName = item.lblPropertyName;
        propComp.onEndEditing = () => {
          let identify = selectedComp.id;
          this.onEndEditingCallback(propComp, identify);
        }
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

    //       voltmx.print("### CREATO IL CHANNEL");

    //       gblOrder += 1;
  },

  onEndEditingCallback: function(propComp, identify){
    voltmx.print("### IDENTIFY PASSED: " + identify);
    value = propComp.propertyValue;
    let left_width = parseInt(this.view.flxLeftRight.flxLeftSide.width, 10);
    let right_width = parseInt(this.view.flxLeftRight.flxRightSide.width, 10);
    let lastComp = null;
    if ( left_width > 48){
      components = this.view.flxScrollLeft.widgets();
      if (identify === null){
        // chiamata da editProperty
        lastComp = components.length > 0 ? components[components.length - 1] : null;
        let channelKey = Object.keys(lastComp).find(key => key.startsWith("channel"));
        //         debugger;
        if (lastComp[channelKey]["leftData"][0].lblComponentName === gblLastInsertedComponent){
          //                     debugger;
          //           this.component_instance_id = lastComp[channelKey]["lblComponentId"].text;
          let newData = lastComp[channelKey]["rightData"];
          newData.forEach(item => {
            if (item.lblPropertyName === propComp.propertyName) {
              item.lblPropertyValue = value; 
            }
          });
          lastComp[channelKey].flxSelectedComponentRight.segmentRight.setData(newData);
        }
      } else {
        // chiamata da selectedComponent
        //                   debugger;
        components.forEach((comp) => {
          let channelKey = Object.keys(comp).find(key => key.startsWith("channel"));
          if (channelKey === identify){
            //                         debugger;
            //             this.component_instance_id = comp[channelKey]["lblComponentId"].text;
            let newData = comp[channelKey]["rightData"];
            newData.forEach(item => {
              if (item.lblPropertyName === propComp.propertyName) {
                item.lblPropertyValue = value;
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
        lastComp = components.length > 0 ? components[components.length - 1] : null;
        let channelKey = Object.keys(lastComp).find(key => key.startsWith("channel"));
        if (lastComp[channelKey]["leftData"][0].lblComponentName === gblLastInsertedComponent){
          //                     debugger;
          //           this.component_instance_id = lastComp[channelKey]["lblComponentId"].text;
          let newData = lastComp[channelKey]["rightData"];
          newData.forEach(item => {
            if (item.lblPropertyName === propComp.propertyName) {
              item.lblPropertyValue = value;
            }
          });

          lastComp[channelKey].flxSelectedComponentRight.segmentRight.setData(newData);
        }
      } else {
        //         debugger;
        components.forEach((comp) => {
          let channelKey = Object.keys(comp).find(key => key.startsWith("channel"));
          if (channelKey === identify){
            //             debugger;
            //             this.component_instance_id = comp[channelKey]["lblComponentId"].text;
            let newData = comp[channelKey]["rightData"];
            newData.forEach(item => {
              if (item.lblPropertyName === propComp.propertyName) {
                item.lblPropertyValue = value;
              }
            });
            comp[channelKey].flxSelectedComponentRight.segmentRight.setData(newData);
          }
        });
      }
    }

    propComp.propertyValue = "";
  },

  editProperty: function(list, rightSegmentData, leftSegmentData, selected_item, selected_item_img){

    voltmx.print("### LIST: " + JSON.stringify(list));
    voltmx.print("### RIGHT SEGMENT DATA: " + JSON.stringify(rightSegmentData));
    voltmx.print("### LEFT SEGMENT DATA: " + JSON.stringify(leftSegmentData));
    voltmx.print("### SELECTED ITEM: " + JSON.stringify(selected_item));
    voltmx.print("### SELECTED ITEM IMG: " + JSON.stringify(selected_item_img));


    let index = 0;
    //     string = `channel${new Date().getTime()}`;
    //     console.log(string);

    //     voltmx.print("### FLX SCROLL SETTINGS NUMBER OF WIDGETS BEFORE REMOVE ALL - INSIDE FUNCTION: " + JSON.stringify(this.view.settingsSide.flxScrollSettingsContent.widgets().length));

    this.view.settingsSide.flxScrollSettingsContent.removeAll();

    //     voltmx.print("### FLX SCROLL SETTINGS NUMBER OF WIDGETS AFTER REMOVE ALL - INSIDE FUNCTION: " + JSON.stringify(this.view.settingsSide.flxScrollSettingsContent.widgets().length));

    this.view.settingsSide.flxScrollSettingsContent.setVisibility(true);


    for (let i = 0; i < list.length; i++) {

      console.log(list[i]);

      if (list[i].required === 'true'){
        let propertyName = list[i].name;
        let capitalizedName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1) + ": ";
        let properties = {lblPropertyName: capitalizedName, lblPropertyValue: ""}; 
        rightSegmentData.push(properties);
        console.log(rightSegmentData);
        const propComp = new ki.luxottica.editPropertyValuewithTextField({
          id: `prop${new Date().getTime()}`,
          top: '2%',
          centerX: '50%'
        }, {}, {});
        //             voltmx.print("### PROPERTY COMPONENT CREATED!");
        gblLastInsertedComponent = selected_item;
        //             voltmx.print("### GBL LAST INSERTED COMPONENT: " + gblLastInsertedComponent);
        propComp.propertyName = capitalizedName;
        propComp.propertyTemplateId = list[i].id;
        propComp.onEndEditing = () => {
          this.onEndEditingCallback(propComp, null);
        }
        this.view.settingsSide.flxScrollSettingsContent.add(propComp);
        gblPropertyTemplatesIds[list[i].component_name] = list[i].id;
      }
      index +=1;
    }
    if (this.view.settingsSide.flxScrollSettingsContent.widgets().length > 0){

      this.view.settingsSide.txt.setVisibility(false);
      // 	  voltmx.print("### SCROLL IS VISIBLE BEFORE? " + JSON.stringify(this.view.settingsSide.flxScrollSettingsContent.isVisible));
      this.view.settingsSide.flxScrollSettingsContent.setVisibility(true);
      //       voltmx.print("### SCROLL IS VISIBLE AFTER? " + JSON.stringify(this.view.settingsSide.flxScrollSettingsContent.isVisible));
      this.view.settingsSide.flxScrollSettingsContent.forceLayout();
    }

    let selected_component_data = {lblComponentName: selected_item, imgComponent: selected_item_img};
    leftSegmentData.push(selected_component_data);

    this.selectComponent(rightSegmentData, leftSegmentData);

  },

  SHOW_ALERT_Failure_Callback: function() {
    voltmx.print("### FAIL ALERT CALLBACK");
  },
  
  SHOW_ALERT_Success_Callback: function() {
    voltmx.print("### SUCCESS ALERT CALLBACK");
  },

  saveStepComposition: function(){
    let left_widgets = this.view.flxScrollLeft.widgets();
    let right_widgets = this.view.flxScrollRight.widgets();
    var numberPart = this.view.lblStepOrder.text.match(/\d+/);

    var component_instance = {
      template_name: null,
      step_id: null,
      order: null
    };

    var property_instance = {
      property_template_id: null,
      component_instance_id: null,
      value: null,
      label_id: null
    };

//     voltmx.application.showLoadingScreen(null, "Saving step ...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);

    if (left_widgets.length > 0){
      left_widgets.forEach(function(widget) {
        let channelKey = Object.keys(widget).find(key => key.startsWith("channel"));
        component_instance["template_name"] = widget[channelKey]["flxSelectedComponentLeft"]["segmentLeft"]["data"][0].lblComponentName;
        let number = parseInt(numberPart[0], 10);
        if (numberPart){
          component_instance["step_id"] = number;  
        }
        component_instance["order"] = widget[channelKey]["lblComponentOrder"].text;

        voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("COMPONENT_INSTANCE_create",{},component_instance,
                                                                                         (response) => {
          voltmx.print("### Service response: "+JSON.stringify(response));
          widget[channelKey]["lblComponentId"].text = response.COMPONENT_INSTANCE[0].id;
          property_instance["property_template_id"] = gblPropertyTemplatesIds[component_instance["template_name"]];
          property_instance["component_instance_id"] = response.COMPONENT_INSTANCE[0].id;
          property_instance["value"] = widget[channelKey]["flxSelectedComponentRight"]["segmentRight"]["data"][0].lblPropertyValue;
          voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("PROPERTY_INSTANCE_create",{},property_instance,
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
        },
                                                                                         (error) => {
          voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
          gblFail = true;
        });
      });
           
    } 

    
    
    if (right_widgets.length > 0){
              right_widgets.forEach(function(widget) {
                let channelKey = Object.keys(widget).find(key => key.startsWith("channel"));
                component_instance["template_name"] = widget[channelKey]["flxSelectedComponentLeft"]["segmentLeft"]["data"][0].lblComponentName;
                let number = parseInt(numberPart[0], 10);
                if (numberPart){
                  component_instance["step_id"] = number;  
                }
                component_instance["order"] = widget[channelKey]["lblComponentOrder"].text;

                voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("COMPONENT_INSTANCE_create",{},component_instance,
                                                                                                 (response) => {
                  voltmx.print("### Service response: "+JSON.stringify(response));
                  widget[channelKey]["lblComponentId"].text = response.COMPONENT_INSTANCE[0].id;
                  property_instance["property_template_id"] = gblPropertyTemplatesIds[component_instance["template_name"]];
                  property_instance["component_instance_id"] = response.COMPONENT_INSTANCE[0].id;
                  property_instance["value"] = widget[channelKey]["flxSelectedComponentRight"]["segmentRight"]["data"][0].lblPropertyValue;
                  voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("PROPERTY_INSTANCE_create",{},property_instance,
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
                },
                                                                                                 (error) => {
                  voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
                  gblFail = true;
                });
              });
            } 

  }






});