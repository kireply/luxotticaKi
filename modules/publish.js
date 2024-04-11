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

  var JSON_default = gblDefaultComponents;
  
  /*
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
  */

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
  const getSectionFlow = (component_params) => new Promise((resolve, reject) => {
    voltmx.sdk.getDefaultInstance().getIntegrationService("mariaDB").invokeOperation("Components_CustomQuery", {}, component_params, (response) => {
      voltmx.print ("### Service response: "+JSON.stringify(response));
      voltmx.print("### RECORDS: " + JSON.stringify(response.records));
      let groupedByStepOrder = response.records.reduce((acc, record) => {
        // Utilizza step_order come chiave per il raggruppamento
        let stepOrder = record.step_order;
        // Se non esiste un array per questo step_order, crealo
        if (!acc[stepOrder]) {
          acc[stepOrder] = [];
        }
        // Aggiungi il record corrente all'array di questo step_order
        acc[stepOrder].push(record);
        return acc;
      }, {});

      Object.keys(groupedByStepOrder).forEach(stepOrder => {
        let recordsForStepOrder = groupedByStepOrder[stepOrder];
        let component = {};
        recordsForStepOrder.forEach(record => {
          let uniqueKey = `${record.component_template_name}_${record.component_order}`;
          if (!component[uniqueKey]) {
            component[uniqueKey] = { id: record.component_template_name, order: parseInt(record.component_order, 10), properties: [] };
          }
          component[uniqueKey].properties.push({
            name: record.property_template_name,
            value: record.property_value
          });           
        });

        let componentsArray = Object.values(component).map(component_item => {
          let transformedComponent = {
            id: component_item.id,
            order: component_item.order
          };
          component_item.properties.forEach(prop => {
            if (prop.value === "true" || prop.value === "True"){
              prop.value = true;
            } else if (prop.value === "false" || prop.value === "False"){
              prop.value = false;
            }
            transformedComponent[prop.name] = prop.value;
          });
          return transformedComponent;
        });

        // Aggiungi i componenti al passo corrispondente in JSON_step
        let stepIndex = JSON_step.steps.findIndex(step => step.definingAttributes.order === stepOrder);

        JSON_step.steps[stepIndex].components = componentsArray;

      });
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
