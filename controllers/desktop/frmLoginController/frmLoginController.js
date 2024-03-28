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
      "addTilesTitlePrefix": {
        "required": false,
        "type": "tuple",
        "mode": "switch",
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
        "default": null,
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
      "enableLargeIcons": {
        "required": false,
        "default": "true",
        "mode": "switch",
        "type": "boolean"
      },
      "tilesFeaturesListLayout": {
        "mode": "dropdown",
        "required": false,
        "default": "BULLET_POINTS",
        "type": "union"
      },
      "hideSign": {
        "required": false,
        "default": "true",
        "type": "boolean",
        "mode": "switch"
      },
      "includedLabel": {
        "required": false,
        "default": "Included",
        "type": "string",
        "mode": "label"
      },
      "clearTitle": {
        "required": false,
        "default": "Clear",
        "type": "string",
        "mode": "label"
      },
      "clearDescription": {
        "required": false,
        "default": "Traditional, transparent lenses perfect for everyday use",
        "type": "string",
        "mode": "label"
      }
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
    "props": {
      "position": {
        "required": true,
        "type": "string",
        "mode": "dropdown",
        "default": null
      }
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
                targetDigitalOptometry: null
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
                                                        };
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

                                                        // aggiungi logica per invocare il DB con la create del property template
                                                        voltmx.print("### CREATE PROPERTY TEMPLATE!");
                                                        integrationService.invokeOperation("PROPERTY_TEMPLATE_create", {}, props_template, 
                                                                                           (response) => {
                                                          voltmx.print ("### Service response: "+JSON.stringify(response));            
                                                        }, error => {
                                                          voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
                                                        });
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
            var userInfo = response.USER.filter(user => user.email === email);
            gblUserName = userInfo[0].name;
            gblUserSurname = userInfo[0].surname;
            gblUserMail = userInfo[0].email;
            voltmx.print("### userInfo: " + JSON.stringify(userInfo));
            voltmx.print("### gblUserName: " + gblUserName);
            voltmx.print("### gblUserSurname: " + gblUserSurname);
            voltmx.print("### gblUserMail: " + gblUserMail);
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