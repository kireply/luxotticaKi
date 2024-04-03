define({ 

 //Type your controller code here
 verifyLoggeduser: function(){
   var integrationService = null;
   var sdkDefaultInstance = voltmx.sdk.getDefaultInstance();
   integrationService = sdkDefaultInstance.getIntegrationService("mariaDB");
   
   var email = this.view.txtEmail.text;
   var password = this.view.txtPassword.text;
   
   var JSON_string = `{
   "RXC_ATTRIBUTE_TILE_LIST": {
    "displayName": "RXC_ATTRIBUTE_TILE_LIST",
    "layout": ["stepSection"],
    "availableAttributes": ["*", "warrantyOptions"],
    "nestedViewModes": ["inside", "outside"],
    "viewModes": ["immediate", "after selection"],
    "tilesFeaturesListLayout": ["BULLET_POINTS", "CHIPS"],
    "previewImage": "",
    "modalImage": "",
    "configurable": true,
	"defaultComponent": false,
    "props": {
		      "svg": {
        "required": false,
        "type": "boolean",
        "mode": "switch",
        "default": null
      },
      "attribute": {
        "required": true,
        "type": "string",
        "mode": "dropdown",
        "default": null
      },
      "activateMoneySavingsBadge": {
        "required": false,
        "type": "boolean",
        "mode": "switch",
        "default": null
      },
      "valueDependency": {
        "required": false,
        "type": "string",
        "mode": "textfield",
        "default": null
      },
      "viewMode": {
        "required": false,
        "type": "string",
        "default": "immediate",
        "mode": "dropdown"
      },
      "nestedViewMode": {
        "required": false,
        "type": "string",
        "default": "inside",
        "mode": "dropdown"
      },
      "nestedComponents": {
        "required": true,
        "type": "Array",
        "default": null,
        "elements": "Object"
      },
      "autoProceed": {
        "required": false,
        "type": "boolean",
        "mode": "switch",
        "default": "true"
      },
      "tilesFeaturesListLayout": {
        "mode": "dropdown",
        "required": false,
        "default": "BULLET_POINTS",
        "type": "string"
      },
      "enableLargeIcons": {
        "required": false,
        "default": "true",
        "type": "boolean",
        "mode": "switch"
      },
      "hideSign": {
        "required": false,
        "default": "true",
        "type": "boolean",
        "mode": "switch"
      },
      "labels": [
        {
          "key": "includedLabel",
          "default": "Included"
        },
        {
          "key": "clearTitle",
          "default": "Clear"
        },
        {
          "key": "clearDescription",
          "default": "Traditional, transparent lenses perfect for everyday use"
        },
        {
          "key": "bluelightTitle",
          "default": "Blue-light filtering"
        },
        {
          "key": "bluelightDescription",
          "default": "Reduces exposure to blue light from digital screens, which can help prevent eye-fatigue."
        },
        {
          "key": "transitionTitle",
          "default": "Transition ® Signature ® GEN 8™"
        },
        {
          "key": "transitionDescription",
          "default": "One pair for indoors and outdoors with Transitions® lenses: quickly darken and fade to clear, so you never have to change glasses."
        },
        {
          "key": "sunTitle",
          "default": "Sun"
        },
        {
          "key": "sunDescription",
          "default": "Choose from different lens colors and tints."
        },
        {
          "key": "proceedAsIs",
          "default": "Proceed as is"
        },
        {
          "key": "protectionPlanAsIs",
          "default": "No, proceed without the Protection Plan"
        }
      ]
    }
  },
  "RXC_BRAND_LOGO": {
    "displayName": "RXC_BRAND_LOGO",
    "layout": ["previewSection"],
    "previewImage": "",
    "modalImage": "",
    "position_values": [
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
      "center"
    ],
    "defaultComponent": false,
    "props": {
      "position": {
        "required": false,
        "type": "string",
        "mode": "dropdown",
        "default": "bottom-left"
      },
      "labels": []
    }
  },
  "RXC_BRAND_FOOTER": {
    "displayName": "RXC_BRAND_FOOTER",
    "layout": ["previewSection"],
    "previewImage": "",
    "modalImage": "",
    "position_values": [
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
      "center"
    ],
    "defaultComponent": false,
    "props": {
      "position": {
        "required": false,
        "type": "string",
        "mode": "dropdown",
        "default": "bottom-left"
      },
      "labels": [
        {
          "key": "frameSize",
          "default": "Frame size"
        }
      ]
    }
  },
  "RXC_FRAME_IMAGE": {
    "displayName": "RXC_FRAME_IMAGE",
    "layout": ["previewSection"],
    "previewImage": "",
    "modalImage": "",
    "position_values": [
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
      "center"
    ],
    "defaultComponent": false,
    "props": {
      "position": {
        "required": false,
        "type": "string",
        "mode": "dropdown",
        "default": "center"
      },
      "labels": [
        {
          "key": "indoor",
          "default": "indoor"
        },
        {
          "key": "outdoor",
          "default": "outdoor"
        }
      ]
    }
  },
  "RXC_TITLE_DESCRIPTION": {
    "displayName": "RXC_TITLE_DESCRIPTION",
    "layout": ["stepSection"],
    "previewImage": "",
    "modalImage": "",
    "defaultComponent": false,
    "props": {
      "accordion": {
        "required": false,
        "type": "boolean",
        "mode": "switch",
        "default": "false"
      },
      "labels": [
        {
          "key": "title",
          "default": null
        },
        {
          "key": "description",
          "default": null
        },
        {
          "key": "steps_addOns_label",
          "default": null
        },
        {
          "key": "accordionLabel",
          "default": "Already included in your lens"
        },
        {
          "key": "uvProtection",
          "default": "UV protection"
        },
        {
          "key": "antiScratch",
          "default": "Scratch resistant"
        },
        {
          "key": "premium",
          "default": "Add anti-reflective and anti-smudge treatments "
        }
      ]
    }
  }
 }`
   
   function SHOW_ALERT_Successful_Login_Callback() {
     	voltmx.print("sono la callback dell'alert");
//      	var navigating = new voltmx.mvc.Navigation('frmDashboard');
//         navigating.navigate();
     
     
     
     
//         voltmx.print("### JSON STRING:" + JSON_string);
//         var obj = JSON.parse(JSON_string);
//         var value = obj[Object.keys(obj)[1]].displayName;
//         voltmx.print("### NAME: " + value);
     
     
        var data = JSON.parse(JSON_string);

        Object.keys(data).forEach(componentKey => {
            var component = data[componentKey];
            console.log(`### ${componentKey} ###`);
          
            // Definizioni iniziali delle variabili
            var component_template = {
                name: null,
                displayName: null,
                layout: null,
                previewImage: null,
                modalImage: null,
                availableAttributes: null,
                nestedViewModes: null,
                configurable: null,
                position_values: null,
                viewModes: null,
                tilesFeaturesListLayout: null,
                targetDigitalOptometry: null,
                defaultComponent: null
            };
           
            component_template["name"] = componentKey;

            // Stampa tutte le proprietà e assegna i valori alle variabili se necessario
            Object.keys(component).forEach(prop => {
                if (prop !== "props") {
                    // Controlla se la proprietà è un array
                    if (Array.isArray(component[prop])) {
                        // Concatena gli elementi dell'array in una stringa unica separata da virgole
                        console.log(`${prop}: ${component[prop].join(', ')}`);
                        if (component_template.hasOwnProperty(prop)) { // Assegna a component_template se prop è una chiave di component_template
                            component_template[prop] = component[prop].join(', ');
                        }
                    } else {
                        console.log(`${prop}: ${JSON.stringify(component[prop])}`);
                        if (component_template.hasOwnProperty(prop)) { // Assegna a component_template se prop è una chiave di component_template
                            component_template[prop] = component[prop];
                        }
                    }
                }
            });
            // Stampa i valori delle variabili per verificare
            console.log(component_template);
//             debugger;
			//aggiungi logica per invocare il DB con la create del component template
            voltmx.print("### CREATE COMPONENT TEMPLATE!");
            integrationService.invokeOperation("COMPONENT_TEMPLATE_create", {}, component_template, 
                                               (response) => {
               										voltmx.print ("### Service response: "+JSON.stringify(response));
                                                    // Gestione speciale per 'props'
                                                    if (component.props) {
                                                      console.log(`### Gestione speciale per props di ${componentKey} ###`);
                                                      // EACH PROPERTY
                                                      Object.keys(component.props).forEach(propKey => {
                                                        var props_template = {
                                                          name: null, 
                                                          component_name: componentKey,
                                                          required: null,
                                                          default: null,
                                                          type: null,
                                                          mode: null
                                                        }
                                                        // Controllo se la propKey corrente è 'labels'
                                                        if (propKey === "labels"){
                                                          if (component.props[propKey].length > 0) {
                                                            component.props[propKey].forEach(label => {
                                                              props_template["name"] = label.key;
                                                              props_template["component_name"] = componentKey;
                                                              props_template["required"] = false;
                                                              props_template["default"] = label.default;
                                                              props_template["type"] = "string";
                                                              props_template["mode"] = "label";
                                                              console.log(props_template);
                                                              // logica per invocare il DB con la create del property template
                                                              voltmx.print("### CREATE PROPERTY TEMPLATE FOR LABEL!");
                                                              integrationService.invokeOperation("PROPERTY_TEMPLATE_create", {}, props_template, 
                                                                                                 (response) => {
                                                                voltmx.print("### Service response: " + JSON.stringify(response));            
                                                              }, error => {
                                                                voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
                                                              }
                                                              );
                                                            });
                                                          }
                                                        } else {
                                                        props_template["name"] = propKey;
                                                        var prop = component.props[propKey];
                                                        console.log(`${propKey}: ${JSON.stringify(prop)}`);
                                                        Object.keys(prop).forEach(propValues => {
                                                          value = prop[propValues];
                                                          voltmx.print(`### PROP VALUE: ${propValues} = ${JSON.stringify(value)}`);
                                                          if (props_template.hasOwnProperty(propValues)){
                                                            props_template[propValues] = value;
                                                          }  
                                                        });
                                                        console.log(props_template);

                                                        // logica per invocare il DB con la create del property template
                                                        voltmx.print("### CREATE PROPERTY TEMPLATE!");
                                                        integrationService.invokeOperation("PROPERTY_TEMPLATE_create", {}, props_template, 
                                                                                           (response) => {
                                                          voltmx.print ("### Service response: "+JSON.stringify(response));            
                                                        }, error => {
                                                          voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
                                                        });
                                                        }
                                                        
                                                      });
                                                    }
//                                                     component_ids[componentKey] = response.COMPONENT_TEMPLATE[0].id;
            }, error => {
            	voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
            });
            
        });
      
      integrationService.invokeOperation("CHANNEL_get",{},{},
         (response) => {
          voltmx.print ("### Service response: "+JSON.stringify(response));
          voltmx.print ("### CHANNELS: " + JSON.stringify(response.CHANNEL));
          /*
          CHANNELS: [{"name":"DolceGabbana","logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ray-Ban_logo.svg/772px-Ray-Ban_logo.svg.png","id":"DG","properties_file":"p4"},{"name":"RayBan","logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ray-Ban_logo.svg/772px-Ray-Ban_logo.svg.png","id":"RB","properties_file":"p5"}]
          */
//           this.channels = response.CHANNEL;
          if (response.CHANNEL.length > 0){
            gblNavigatedFromLogin = true;
            gblChannels = response.CHANNEL;
            var navigating = new voltmx.mvc.Navigation('frmChannels');
            navigating.navigate();
          } else {
            var navigating = new voltmx.mvc.Navigation('frmChannelCreation');
        	navigating.navigate();
          }
         },
         (error) => {
          voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
          reject(error);
        }
      );
      }
   
   		
      function SHOW_ALERT_Failure_Callback() {
     	voltmx.print("sono la callback dell'alert");
      }
   
   
   integrationService.invokeOperation("USER_get",{},{},
		  function(response){
          voltmx.application.showLoadingScreen(null, "Searching user ...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
          voltmx.print ("### Service response: "+JSON.stringify(response));
     	  var userFound = response.USER.some(user => user.email === email && user.password === password);
     	  if (userFound){
            voltmx.application.dismissLoadingScreen();
            voltmx.print("### User found, welcome");
            voltmx.ui.Alert({
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": "Success",
            "yesLabel": "Ok",
            "message": "Welcome!",
            "alertHandler": SHOW_ALERT_Successful_Login_Callback
        	}, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        	});
          } else{
            voltmx.application.dismissLoadingScreen();
            voltmx.print("### User not found");
            voltmx.ui.Alert({
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": "Fail",
            "yesLabel": "Ok",
            "message": "Login not permitted",
            "alertHandler": SHOW_ALERT_Failure_Callback
        	}, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        	});
          	}
  		   },
			function(error){
          	voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
          	voltmx.ui.Alert({
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": "Fail",
            "yesLabel": "Ok",
            "message": "Error from the service",
            "alertHandler": SHOW_ALERT_Failure_Callback
        	}, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        	});
        	}
  );
 }

 });