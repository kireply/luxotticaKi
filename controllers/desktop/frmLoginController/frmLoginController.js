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
    "previewImage": "https://www.francese-live.academy/wp-content/uploads/2017/04/adresse.png",
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
    "previewImage": "https://www.salvatorepumo.it/wp-content/uploads/2024/01/logo-ray-ban-oggi.jpg",
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
    "previewImage": "https://www.ubs.com/content/sites/ch/it/corporates/foundation/young-company-offer/jcr:content/mainpar/toplevelgrid/col3/textimage/image.580.png/1566566910402.png",
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
    "previewImage": "https://shop.otticadegiglio.it/cdn/shop/products/000000410007_2_540x.jpg?v=1686579970",
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
    "previewImage": "https://prints.ultracoloringpages.com/df614a4369e3f9855b45719d56e528ef.png",
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
  },
  "RXC_EXIT_POPUP": {
    "displayName": "RXC_EXIT_POPUP",
    "layout": ["stepSection"],
    "previewImage": "",
    "modalImage": "",
    "defaultComponent": true,
    "props": {
      "labels": [
        {
          "key": "exitTitle",
          "default": "Are you sure you want to exit?"
        },
        {
          "key": "exitSubtitle",
          "default": "Your lens selection will not be saved"
        },
        {
          "key": "exitYes",
          "default": "Yes, exit"
        },
        {
          "key": "exitContinueEditing",
          "default": "No, continue"
        },
        {
          "key": "exitSave",
          "default": "Save and continue shopping"
        }
      ]
    }
  },
  "RXC_HOW_TO_READ_YOUR_PRESCRIPTION_MODAL": {
    "displayName": "RXC_HOW_TO_READ_YOUR_PRESCRIPTION_MODAL",
    "layout": ["stepSection"],
    "previewImage": "",
    "modalImage": "",
    "defaultComponent": true,
    "props": {
      "labels": [
        {
          "key": "title",
          "default": "How to read your prescription"
        },
        {
          "key": "subtitle",
          "default": "If you have a prescription for eyeglasses, the prescription information will typically include the following:"
        },
        {
          "key": "rightEye_name",
          "default": " OD (Right Eye)"
        },
        {
          "key": "rightEye_description",
          "default": "'OD stands for oculus dexter which is Latin for right eye.'"
        },
        {
          "key": "leftEye_name",
          "default": " OS (Left Eye)"
        },
        {
          "key": "leftEye_description",
          "default": "'OS stands for oculus sinister which is Latin for “left eye”.'"
        },
        {
          "key": "sphere_name",
          "default": "Sphere (SPH) - also known as Power (PWR)"
        },
        {
          "key": "sphere_description",
          "default": "They mean the same thing: the strength of your prescription. If you're nearsighted you will have a minus (-) before your values, and if you’re or farsighted you will have a plus (+)."
        },
        {
          "key": "cylinder_name",
          "default": "Cylinder (CYL)"
        },
        {
          "key": "cylinder_description",
          "default": "This is for people with astigmatism. This is when one part of the eye needs more correction than the rest. The Cylinder value is written with a minus (-) sign."
        },
        {
          "key": "axis_name",
          "default": "Axis"
        },
        {
          "key": "axis_description",
          "default": "This is only for people with astigmatism. The axis is a number between 0 and 180 and determines the orientation of the Cylinder (CYL)."
        },
        {
          "key": "add_name",
          "default": "Add"
        },
        {
          "key": "add_description",
          "default": "This indicates the additional magnifying power that is added to the lens to correct presbyopia, a common age-related condition that affects near vision."
        },
        {
          "key": "infoText",
          "default": "If any of this information isn’t included in your prescription, you can leave the field blank."
        },
        {
          "key": "customerService",
          "default": "Not sure about something? Call our Customer Service experts"
        }
      ]
    }
  },
  "RXC_PRESCRIPTION_DETAILS_MODAL": {
    "displayName": "RXC_PRESCRIPTION_DETAILS_MODAL",
    "layout": ["stepSection"],
    "previewImage": "",
    "modalImage": "",
    "defaultComponent": true,
    "props": {
      "labels": [
        {
          "key": "title",
          "default": "Your prescription details"
        },
        {
          "key": "edit",
          "default": "Edit prescription"
        },
        {
          "key": "sphere",
          "default": "SPH"
        },
        {
          "key": "cylinder",
          "default": "CYL"
        },
        {
          "key": "axis",
          "default": "Axis"
        },
        {
          "key": "add",
          "default": "ADD"
        },
        {
          "key": "pd",
          "default": "PD"
        },
        {
          "key": "od",
          "default": "OD"
        },
        {
          "key": "right",
          "default": "Right"
        },
        {
          "key": "left",
          "default": "Left"
        },
        {
          "key": "os",
          "default": "OS"
        },
        {
          "key": "vertical",
          "default": "Vertical Prism (Δ)"
        },
        {
          "key": "baseDirection",
          "default": "Base Direction"
        },
        {
          "key": "horizontal",
          "default": "Horizontal Prism (Δ)"
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
              										let isADefaultComponent = response.COMPONENT_TEMPLATE[0].defaultComponent;
                                                    if (component.props) {
                                                      if (isADefaultComponent === "false"){
                                                        // Il componente non è di default
                                                        console.log(`### Gestione delle props di ${componentKey} che non è un componente di default`);
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
                                                      } else {
                                                        let result = { id: componentKey };
                                                        component.props.labels.forEach(label => {
                                                          result[label.key] = label.default;
                                                        });
                                                        gblDefaultComponents.push(result);
                                                        voltmx.print("### GBL DEFAULT COMPONENTS: " + JSON.stringify(gblDefaultComponents));
                                                      }
                                                    }
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