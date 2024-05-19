//Type your code here

async function publish() {
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
    },
    genericImage: null,
    assetsCDN: null,
    projectImage: null,
    frameOnlyLensUPC: null,
    showFrameOnly: null,
    showFramePlusLenses: null,
    showSavingsLabel: null,
    activateDistanceAndReading: null,
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

  var JSON_default = gblDefaultComponents;  //gblDefaultComponents is loaded with all the default components in the Login controller (we do not need to edit this variable)
  
  // TO BE COMMENTED ====================================================
//   gblFlowId = "488";

  var flow_id_param = {
    flow_id : gblFlowId
  };

  var component_params = {
    flow_id : gblFlowId,
    section_type: null
  };
  
  var nested_params = {
    flow_id : gblFlowId
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
      JSON_flow["genericImage"] = response.records[0].genericImage;
      JSON_flow["assetsCDN"] = response.records[0].assetsCDN;
      JSON_flow["projectImage"] = response.records[0].projectImage;
      JSON_flow["frameOnlyLensUPC"] = response.records[0].frameOnlyLensUPC;
      JSON_flow["showFrameOnly"] = response.records[0].showFrameOnly;
      JSON_flow["showFramePlusLenses"] = response.records[0].showFramePlusLenses;
      JSON_flow["showSavingsLabel"] = response.records[0].showSavingsLabel;
      JSON_flow["activateDistanceAndReading"] = response.records[0].activateDistanceAndReading;

      voltmx.print("### JSON FLOW: " + JSON.stringify(JSON_flow));
      
      Object.keys(JSON_flow).forEach(key => {
        let value = JSON_flow[key];

        // Converti i valori specifici che potrebbero essere stringhe "true"/"True" o "false"/"False"
        if (["isSupernova", "genericImage", "assetsCDN", "projectImage", "frameOnlyLensUPC", "showFrameOnly", "showFramePlusLenses", "showSavingsLabel", "activateDistanceAndReading"].includes(key)) {
          if (value === "true" || value === "True") {
            value = true;
          } else if (value === "false" || value === "False") {
            value = false;
          }
        }

        // Assegna il valore convertito (se necessario) a JSON_flow
        if (key.includes("sizes_")) {
          // Per i valori annidati dentro "sizes"
          let sizeKey = key.split("_")[1]; // Assume che il formato sia "sizes_X"
          JSON_flow["layout"]["sizes"][sizeKey] = value;
        } else if (key.startsWith("layout_")) {
          // Per i valori annidati dentro "layout"
          let layoutKey = key.split("_")[1]; // Assume che il formato sia "layout_X"
          JSON_flow["layout"][layoutKey] = value;
        } else {
          // Per tutti gli altri valori direttamente all'interno di JSON_flow
          JSON_flow[key] = value;
        }
      });
      
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
//         voltmx.print("### RECORD: " + JSON.stringify(record));
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
      response.records.forEach(record => {
        let stepComposition = {
          definingAttributes: {
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

        // Mappatura dinamica dei valori
        Object.keys(keyMapping).forEach(attr => {
          // Converte i valori booleani stringa in booleani
          let value = record[attr];
          if(value === "true" || value === "True") value = true;
          else if(value === "false" || value === "False") value = false;

//           stepComposition.definingAttributes[mappedAttr] = value;
          const mappedAttr = keyMapping[attr];
          stepComposition.definingAttributes[mappedAttr] = value;
        });

        JSON_step.steps.push(stepComposition);
      });

      voltmx.print("### JSON STEP: " + JSON.stringify(JSON_step));
      resolve(JSON_step);
    }, (error) => {
      voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
    });
  });

  JSON_step = await getStepFlow(flow_id_param);

  component_params["section_type"] = "stepSection";
  const getSectionFlow = (component_params, nested_params) => new Promise((resolve, reject) => {
    // Prima chiamata al database per ottenere le relazioni padre-figlio
    voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("NESTED_COMPONENT_CustomQuery", {}, nested_params, (nestedResponse) => {
      const parentChildMap = nestedResponse.records.reduce((acc, item) => {
        acc[item.component_instance_father_id] = item.component_instance_id;
        return acc;
      }, {});
      
//       debugger;

      // Seconda chiamata al database per ottenere i componenti e le loro proprietà
      voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("Components_CustomQuery", {}, component_params, (response) => {
        voltmx.print("### Service response: " + JSON.stringify(response));
        let groupedByStepOrder = response.records.reduce((acc, record) => {
          let stepOrder = record.step_order;
          if (!acc[stepOrder]) {
            acc[stepOrder] = [];
          }
          acc[stepOrder].push(record);
          return acc;
        }, {});
        
        let componentIdMap = response.records.reduce((acc, record) => {
          const key = `${record.component_template_name}_${record.component_order}_${record.step_order}`;
          acc[key] = record.component_id;
          return acc;
        }, {});
        
//         debugger;

        Object.keys(groupedByStepOrder).forEach(stepOrder => {
          let recordsForStepOrder = groupedByStepOrder[stepOrder];
          let componentMap = {};

          // Costruisci componenti con properties
          recordsForStepOrder.forEach(record => {
            let uniqueKey = `${record.component_template_name}_${record.component_order}_${record.step_order}`;
            if (!componentMap[uniqueKey]) {
              componentMap[uniqueKey] = {
                id: record.component_template_name,
                order: parseInt(record.component_order, 10),
                nestedComponents: []
              };
            }
            let processedValue = record.property_value ? (record.property_value.toLowerCase() === "true" ? true : (record.property_value.toLowerCase() === "false" ? false : record.property_value)) : record.property_value; 
            componentMap[uniqueKey][record.property_template_name] = processedValue;
          });
          
//           debugger;
          
          // Inizialmente, memorizza gli ID dei componenti che sono stati aggiunti come nestedComponents
          let nestedComponentIds = new Set();

          Object.entries(parentChildMap).forEach(([parentId, childId]) => {
            const parentKey = Object.keys(componentIdMap).find(key => componentIdMap[key] === parentId);
            const childKey = Object.keys(componentIdMap).find(key => componentIdMap[key] === childId);

            if (parentKey && childKey && componentMap[parentKey] && componentMap[childKey]) {
              if (!componentMap[parentKey].nestedComponents) {
                componentMap[parentKey].nestedComponents = [];
              }
              componentMap[parentKey].nestedComponents.push(componentMap[childKey]);
              nestedComponentIds.add(childKey); // Aggiungi l'ID del figlio all'insieme degli ID annidati
            }
          });

          // Ora rimuovi tutti gli elementi da componentMap che sono stati aggiunti come nestedComponents
          nestedComponentIds.forEach(id => {
            delete componentMap[id];
          });
          
//           // Imposta nestedComponents a null se è vuoto
//           Object.values(componentMap).forEach(component => {
//             if (component.nestedComponents.length === 0) {
//               component.nestedComponents = null;
//             }
//           });
          
          // Funzione per impostare nestedComponents a null se è vuoto
          const cleanEmptyNestedComponents = (component) => {
            let stack = [component];
            while (stack.length > 0) {
              let currentComponent = stack.pop();
              if (currentComponent.nestedComponents) {
                currentComponent.nestedComponents.forEach(nestedComponent => stack.push(nestedComponent));
                if (currentComponent.nestedComponents.length === 0) {
                  currentComponent.nestedComponents = null;
                } else {
                  currentComponent.nestedComponents.forEach(nestedComponent => {
                    if (nestedComponent.nestedComponents.length === 0) {
                      nestedComponent.nestedComponents = null;
                    }
                  });
                }
              }
            }
          };

          // Pulisci i nestedComponents vuoti per ogni componente
          Object.values(componentMap).forEach(component => {
            cleanEmptyNestedComponents(component);
          });

          // Il componentMap risultante non conterrà duplicati a livello di radice
          console.log(componentMap);

//           debugger;

          // Prepara i componenti per l'output
          let componentsArray = Object.values(componentMap);

          // Assegna i componenti al passo corrispondente in JSON_step
          let stepIndex = JSON_step.steps.findIndex(step => step.definingAttributes.order === stepOrder);
          if (stepIndex !== -1) {
            JSON_step.steps[stepIndex].components = componentsArray;
          }
        });

        resolve(JSON_step);
      }, (error) => {
        voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
        reject(error);
      });
    }, (error) => {
      voltmx.print("### Error retrieving nested components: " + JSON.stringify(error));
      reject(error);
    });
  });



  JSON_step = await getSectionFlow(component_params, nested_params);
  
//   debugger;

  /* sorting the steps based on their "order"
  JSON_step.steps[0].components.sort((a, b) => a.order - b.order);
  voltmx.print("### JSON_step sorted: " + JSON.stringify(JSON_step)); */
  
  // for each list of components in each step
  JSON_step.steps.forEach(step => {
    // sorting the steps based on their "order"
    step.components.sort((a, b) => a.order - b.order);
  });

  var JSON_output = {
    definingAttributes: JSON_flow,
    previewSection: JSON_preview,
    stepSection: JSON_step,
    defaultComponents: JSON_default
  };

  voltmx.print("### JSON OUTPUT: " + JSON.stringify(JSON_output));

}
