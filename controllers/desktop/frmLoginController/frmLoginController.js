define({ 

 
 verifyLoggeduser: function(){
   var integrationService = null;
   var sdkDefaultInstance = voltmx.sdk.getDefaultInstance();
   integrationService = sdkDefaultInstance.getIntegrationService("mariaDB");
   
   var email = this.view.txtEmail.text;
   var password = this.view.txtPassword.text;
   
   
   var JSON_string = `{
  "RXC_BRAND_LOGO": {
    "displayName": "RXC_BRAND_LOGO",
    "layout": ["previewSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_BRAND_LOGO.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_BRAND_LOGO.png",
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
  "RXC_0_POWER_POPUP": {
    "displayName": "RXC_0_POWER_POPUP",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_0_POWER_POPUP.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_0_POWER_POPUP.png",
    "defaultComponent": true,
    "props": {
      "labels": [
        {
          "key": "continueModal_titleNoAdd",
          "default": "ARE YOU SURE YOU WANT TO CONTINUE?"
        },
        {
          "key": "continueModal_messageNoAdd",
          "default": "Please make sure to enter the Addition (ADD) value if it is listed in your prescription, otherwise please proceed without."
        },
        {
          "key": "continueModal_continueNoAdd",
          "default": "Continue without (add)"
        },
        {
          "key": "continueModal_title",
          "default": "Send prescription later"
        },
        {
          "key": "continueModal_message",
          "default": "By clicking on continue, you will be skipping the prescription step. We’ll ask for it after your order, either by uploading it or having us call your doctor."
        },
        {
          "key": "continueModal_continue",
          "default": "Yes, continue"
        },
        {
          "key": "continueModal_cancel",
          "default": "No, go back"
        },
        {
          "key": "noPowerModal_title",
          "default": "continue with non-prescription lenses"
        },
        {
          "key": "noPowerModal_subtitle",
          "default": "You have not entered a prescription for your glasses. Would you like to proceed with non-prescription lenses?"
        },
        {
          "key": "noPowerModal_continue",
          "default": "yes, continue"
        },
        {
          "key": "noPowerModal_cancel",
          "default": "no, cancel"
        }
      ]
    }
  },
  "RXC_BRAND_FOOTER": {
    "displayName": "RXC_BRAND_FOOTER",
    "layout": ["previewSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_BRAND_FOOTER.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_BRAND_FOOTER.png",
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
  "RXC_ATTRIBUTE_TILE_LIST": {
    "displayName": "RXC_ATTRIBUTE_TILE_LIST",
    "layout": ["stepSection"],
    "availableAttributes": [
      "type",
      "brand",
      "clear",
      "bluelight",
      "transition",
      "sun",
      "treatment",
      "thickness",
      "addons",
      "designtype",
      "colorcategory",
      "warrantyOptions"
    ],
    "nestedViewModes": ["inside", "outside"],
    "viewModes": ["immediate", "after selection"],
    "tilesFeaturesListLayout": ["BULLET_POINTS", "CHIPS"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_ATTRIBUTE_TILE_LIST.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_ATTRIBUTE_TILE_LIST.png",
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
  "RXC_CALL_MY_DOCTOR": {
    "displayName": "RXC_CALL_MY_DOCTOR",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_CALL_MY_DOCTOR.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_CALL_MY_DOCTOR.png",
    "defaultComponent": true,
    "props": {
      "labels": [
        {
          "key": "title",
          "default": ""
        },
        {
          "key": "description",
          "default": ""
        },
        {
          "key": "didntFind",
          "default": "Didn't find your doctor?"
        },
        {
          "key": "addManually",
          "default": "Add manually"
        },
        {
          "key": "changeSubmissionMethod",
          "default": "Change submission method"
        },
        {
          "key": "confirmAndContinue",
          "default": "Confirm & continue"
        },
        {
          "key": "searchByTitle",
          "default": "Search your eye doctor by"
        },
        {
          "key": "phoneNumberSliderLabel",
          "default": "Phone number"
        },
        {
          "key": "clinicOrDoctorNameSliderLabel",
          "default": "Clinic or doctor name"
        },
        {
          "key": "missingInfoError",
          "default": "Complete the missing informations"
        },
        {
          "key": "phoneNumberInputLabel",
          "default": "Doctor phone number"
        },
        {
          "key": "searchLabel",
          "default": "Search"
        },
        {
          "key": "clinicOrDoctorNameInputLabel",
          "default": "Clinic or doctor name"
        },
        {
          "key": "cityInputLabel",
          "default": "City"
        },
        {
          "key": "doctorNotFoundTitle",
          "default": "We couldn't find your doctor."
        },
        {
          "key": "doctorNotFoundAdd",
          "default": "Please add more details or "
        },
        {
          "key": "doctorNotFoundLink",
          "default": "add a new doctor."
        },
        {
          "key": "doctorNameTableLabel",
          "default": "Doctor name"
        },
        {
          "key": "clinicNameTableLabel",
          "default": "Clinic name"
        },
        {
          "key": "addressTableLabel",
          "default": "Address"
        },
        {
          "key": "phoneTableLabel",
          "default": "Phone"
        },
        {
          "key": "faxTableLabel",
          "default": "Fax"
        },
        {
          "key": "chooseTableLabel",
          "default": "Choose"
        },
        {
          "key": "phoneTableHeaderLabel",
          "default": "Phone number"
        },
        {
          "key": "changeTableLabel",
          "default": "Change"
        },
        {
          "key": "wrongDoctorTableLabel",
          "default": "Wrong doctor?"
        },
        {
          "key": "pupillaryDistanceSubtitle",
          "default": "You can select the default settings of 61 for women and 64 for men if you have an average or low prescription. If you have a strong prescription or if you want to know your exact Pupillary Distance, please "
        },
        {
          "key": "pupillaryDistanceMisurePDAction",
          "default": "measure your Pupillary Distance."
        },
        {
          "key": "iHaveTwoPd",
          "default": "I have 2 Pupillary Distance numbers"
        },
        {
          "key": "pdLeft",
          "default": "Left"
        },
        {
          "key": "pdRight",
          "default": "Right"
        },
        {
          "key": "pupillaryDistanceWarningValue",
          "default": "Please input your pupillary distance, if you don’t have it you can use the default from the above or you can "
        },
        {
          "key": "whatIsIt",
          "default": "What is PD (Pupillary Distance)"
        },
        {
          "key": "alerts_pdValueWarningDigitalOptometrySmaller",
          "default": "The selected Pupillary Distance is smaller than average, we suggest double checking your prescription. You can leave the default values written above or you can "
        },
        {
          "key": "alerts_pdValueWarningDigitalOptometryLarger",
          "default": "The selected Pupillary Distance is larger than average, we suggest double checking your prescription. You can leave the default values written above or you can "
        },
        {
          "key": "alerts_pdValueWarningSmaller",
          "default": "The selected Pupillary Distance is smaller than average, we suggest double checking your prescription.</b></br>You can leave the default setting of 63 which is the average measurement for adults.<br>If we need any more information about your prescription, one of our experts will be in touch."
        },
        {
          "key": "alerts_pdValueWarningLarger",
          "default": "The selected Pupillary Distance is larger than average, we suggest double checking your prescription.</b></br>You can leave the default setting of 63 which is the average measurement for adults.<br>If we need any more information about your prescription, one of our experts will be in touch."
        }
      ]
    }
  },
  "RXC_CHIPS_LIST": {
    "displayName": "RXC_CHIPS_LIST",
    "layout": ["stepSection"],
    "availableAttributes": [
      "type",
      "brand",
      "clear",
      "bluelight",
      "transition",
      "sun",
      "treatment",
      "thickness",
      "addons",
      "designtype",
      "colorcategory",
      "warrantyOptions"
    ],
    "nestedViewModes": ["inside", "outside"],
    "viewModes": ["immediate", "after selection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_CHIPS_LIST.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_CHIPS_LIST.png",
    "configurable": true,
    "defaultComponent": false,
    "props": {
      "attribute": {
        "required": true,
        "type": "string",
        "mode": "dropdown",
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
        "default": "outside",
        "mode": "dropdown"
      },
      "nestedComponents": {
        "required": false,
        "type": "Array",
        "default": null,
        "elements": "Object"
      },
      "labels": [
        {
          "key": "title",
          "default": null
        },
        {
          "key": "description",
          "default": null
        }
      ]
    }
  },
  "RXC_COLOR_PICKER": {
    "displayName": "RXC_COLOR_PICKER",
    "layout": ["stepSection"],
    "availableAttributes": ["color"],
    "nestedViewModes": ["inside", "outside"],
    "viewModes": ["immediate", "after selection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_COLOR_PICKER.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_COLOR_PICKER.png",
    "configurable": true,
    "defaultComponent": false,
    "props": {
      "attribute": {
        "required": true,
        "type": "string",
        "mode": "dropdown",
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
        "default": "outside",
        "mode": "dropdown"
      },
      "nestedComponents": {
        "required": false,
        "type": "Array",
        "default": null,
        "elements": "Object"
      },
      "labels": [
        {
          "key": "title",
          "default": "color: "
        },
        {
          "key": "description",
          "default": ""
        }
      ]
    }
  },
  "RXC_CRASH_POPUP": {
    "displayName": "RXC_CRASH_POPUP",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_CRASH_POPUP.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_CRASH_POPUP.png",
    "defaultComponent": true,
    "props": {
      "labels": [
        {
          "key": "errorTitle",
          "default": "Something went wrong..."
        },
        {
          "key": "errorDescription",
          "default": "We’re experiencing some technical difficulties, we apologize. In the meantime, if you have any questions or need assistance, feel free to <a href='#'>contact our customer service.</a>"
        },
        {
          "key": "buttonLabel",
          "default": "Back"
        }
      ]
    }
  },
  "RXC_EXIT_POPUP": {
    "displayName": "RXC_EXIT_POPUP",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_EXIT_POPUP.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_EXIT_POPUP.png",
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
  "RXC_FOOTER": {
    "displayName": "RXC_FOOTER",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_FOOTER.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_FOOTER.png",
    "defaultComponent": false,
    "props": {
      "showAddToBag": {
        "required": false,
        "type": "boolean",
        "mode": "switch",
        "default": false
      },
      "labels": [
        {
          "key": "insuranceButtonLabel",
          "default": "Add insurance benefits"
        },
        {
          "key": "applyingInsurance",
          "default": "Applying insurance benefits"
        },
        {
          "key": "insuranceLabelRemove",
          "default": "Remove insurance benefits"
        },
        {
          "key": "includedLabel",
          "default": "Included"
        },
        {
          "key": "totalFrameLens_frame",
          "default": "Frame price"
        },
        {
          "key": "totalFrameLens_frameLensTotal",
          "default": "Frame + lenses price"
        },
        {
          "key": "bundleFrameLensStartingAt",
          "default": "Frame + Lenses starting at"
        },
        {
          "key": "confirmButton",
          "default": "Continue"
        },
        {
          "key": "totalFrameLens_total",
          "default": "Total"
        },
        {
          "key": "addToBagLabel",
          "default": "Confirm and add to bag"
        },
        {
          "key": "paymentInstallments_modal_paypal",
          "default": "With ###PAYMENT_TYPE###, pay in ###INSTALLMENTS### easy payments of just ###MONTHLY_PRICE###"
        },
        {
          "key": "paymentInstallments_modal_title",
          "default": "Shop now. Pay later."
        },
        {
          "key": "paymentInstallments_modal_subtitle",
          "default": "Select ###PAYMENT_TYPE### as your payment method at checkout  to pay in interest-free installments, with no hidden fees."
        },
        {
          "key": "paymentInstallments_modal_affirm",
          "default": "With ###PAYMENT_TYPE###, pay in ###INSTALLMENTS### interest-free payments of just ###MONTHLY_PRICE###"
        },
        {
          "key": "paymentInstallments_modal_afterpay",
          "default": "With ###PAYMENT_TYPE###, make ###INSTALLMENTS### interest-free payments, every two weeks."
        },
        {
          "key": "paymentInstallments_modal_klarna",
          "default": "With ###PAYMENT_TYPE###, pay in ###INSTALLMENTS### interest-free payments of just ###MONTHLY_PRICE###"
        },
        {
          "key": "paymentInstallments_modal_terms",
          "default": "You must be over 18, a resident of the U.S., and meet additional eligibility criteria to qualify. Late fees may apply.  <a href='#' style= 'color:rgba(87, 93, 155, 1); font-weight: 600; letter-spacing:0.16px'>Click here</a> for complete terms. Loans to California residents made or arranged are pursuant to a California Finance Lenders Law"
        },
        {
          "key": "paymentInstallments_modal_learnMore",
          "default": "Learn more"
        },
        {
          "key": "paymentInstallments_installmentsLabel",
          "default": "Pay over time in interest-free installments with ###PAYMENT_TYPE###"
        }
      ]
    }
  },
  "RXC_HEAD_NAV": {
    "displayName": "RXC_HEAD_NAV",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_HEAD_NAV.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_HEAD_NAV.png",
    "defaultComponent": false,
    "props": {
      "labels": [
        {
          "key": "insuranceButtonLabel",
          "default": "Add insurance benefits"
        },
        {
          "key": "applyingInsurance",
          "default": "Applying insurance benefits"
        },
        {
          "key": "insuranceLabelRemove",
          "default": "Remove insurance benefits"
        },
        {
          "key": "includedLabel",
          "default": "Included"
        },
        {
          "key": "totalFrameLens_frame",
          "default": "Frame price:"
        },
        {
          "key": "totalFrameLens_frameLensTotal",
          "default": "Frame + lenses price:"
        },
        {
          "key": "bundleFrameLensStartingAt",
          "default": "Frame + Lenses starting at"
        }
      ]
    }
  },
  "RXC_FRAME_IMAGE": {
    "displayName": "RXC_FRAME_IMAGE",
    "layout": ["previewSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_FRAME_IMAGE.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_FRAME_IMAGE.png",
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
  "RXC_HOW_TO_READ_YOUR_PRESCRIPTION_MODAL": {
    "displayName": "RXC_HOW_TO_READ_YOUR_PRESCRIPTION_MODAL",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_HOW_TO_READ_YOUR_PRESCRIPTION_MODAL.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_HOW_TO_READ_YOUR_PRESCRIPTION_MODAL.png",
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
          "default": "(Right Eye)"
        },
        {
          "key": "rightEye_description",
          "default": "'OD stands for oculus dexter which is Latin for right eye.'"
        },
        {
          "key": "leftEye_name",
          "default": "(Left Eye)"
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
        },
        {
          "key": "rightEye_initials",
          "default": "OD"
        },
        {
          "key": "leftEye_initials",
          "default": "OS"
        },
        {
          "key": "sphere",
          "default": "SPH (Sphere)"
        },
        {
          "key": "cylinder",
          "default": "CYL (Cylinder)"
        },
        {
          "key": "selectPlaceholder",
          "default": "None"
        }
      ]
    }
  },
  "RXC_MANUAL_INPUT_READERS": {
    "displayName": "RXC_MANUAL_INPUT_READERS",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_MANUAL_INPUT_READERS.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_MANUAL_INPUT_READERS.png",
    "defaultComponent": true,
    "props": {
      "labels": []
    }
  },
  "RXC_MANUAL_LIST": {
    "displayName": "RXC_MANUAL_LIST",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_MANUAL_LIST.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_MANUAL_LIST.png",
    "defaultComponent": false,
    "props": {
      "svg": {
        "required": false,
        "type": "boolean",
        "mode": "switch",
        "default": "false"
      },
      "labels": [
        {
          "key": "manualCardTitle",
          "default": "Fill it in online"
        },
        {
          "key": "manualCardDescription",
          "default": "Enter your prescription manually"
        },
        {
          "key": "manualCardBadge",
          "default": ""
        },
        {
          "key": "manualCardReviewTitle",
          "default": "Entered manually"
        },
        {
          "key": "accountCardTitle",
          "default": "Use saved prescription"
        },
        {
          "key": "accountCardDescription",
          "default": "Log in and select saved prescription from My Account"
        },
        {
          "key": "accountCardBadge",
          "default": ""
        },
        {
          "key": "accountCardReviewTitle",
          "default": "Loaded from the account"
        },
        {
          "key": "callMyDoctorCardTitle",
          "default": "Have us call your doctor"
        },
        {
          "key": "callMyDoctorCardDescription",
          "default": "We'll get your prescription directly from your doctor. Delivery may take longer"
        },
        {
          "key": "callMyDoctorCardBadge",
          "default": ""
        },
        {
          "key": "callMyDoctorCardReviewTitle",
          "default": "We'll call your doctor"
        },
        {
          "key": "uploadCardTitle",
          "default": "Upload image"
        },
        {
          "key": "uploadCardDescription",
          "default": "We accept: .pdf, .png .jpg .tiff .gif .bmp .docx(max 10 MB) and IWork pages. Delivery may take longer"
        },
        {
          "key": "uploadCardBadge",
          "default": ""
        },
        {
          "key": "uploadCardReviewTitle",
          "default": "Uploaded"
        },
        {
          "key": "sendItLaterCardTitle",
          "default": "Send it later"
        },
        {
          "key": "sendItLaterCardDescription",
          "default": "We will ask for your prescription later. Your oreder might take longer to process"
        },
        {
          "key": "sendItLaterCardReviewTitle",
          "default": "We'll ask for it after the checkout"
        }
      ]
    }
  },
  "RXC_PD_MODAL": {
    "displayName": "RXC_PD_MODAL",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_PD_MODAL.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_PD_MODAL.png",
    "defaultComponent": true,
    "props": {
      "labels": []
    }
  },
  "RXC_PD_OPTY_MODAL": {
    "displayName": "RXC_PD_OPTY_MODAL",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_PD_OPTY_MODAL.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_PD_OPTY_MODAL.png",
    "defaultComponent": true,
    "props": {
      "labels": [
        {
          "key": "title",
          "default": "How to measure your Pupillary Distance"
        },
        {
          "key": "appSubtitle",
          "default": "Your Pupillary Distance, or PD, is the distance in millimeters (mm) from the center of one pupil to the center of the other. It indicates exactly which part of the lens you look through, ensuring optimal comfort and clarity. You can measure with the app or manually."
        },
        {
          "key": "manuallySubtitle",
          "default": "Your Pupillary Distance, or PD, is the distance in millimeters (mm) from the center of one pupil to the center of the other. You can measure with the app or manually."
        },
        {
          "key": "toggle_app",
          "default": "WITH THE APP"
        },
        {
          "key": "toggle_manually",
          "default": "MANUALLY"
        },
        {
          "key": "opthyDesc",
          "default": "<b>Get your glasses just right with Opthy.</b><br/><p>Opthy measures your Pupillary Distance, allowing you to find the most comfortable, personalized fit.</p><p>App available on iPhone X and above.</p>"
        },
        {
          "key": "manuallyContent",
          "default": "<div>If you want, you can measure your Pupillary Distance (PD) yourself by following these steps?:</div><ul><li>Grab a small ruler in one hand, and have your pencil and paper handy.</li><li>Now position yourself approximately 8 inches (20 cm) away from a mirror.</li><li>Close your left eye and align the 0 over the center of your right pupil.</li><li>Measure the distance from your right to your left pupil.</li><li>The number that lines up directly over your left pupil is your PD (an average PD for an adult ranges between 58 and 65).</li></ul>"
        }
      ]
    }
  },
  "RXC_PRESCRIPTION_PANEL": {
    "displayName": "RXC_PRESCRIPTION_PANEL",
    "layout": ["stepSection"],
    "targetDigitalOptometry": ["Single Vision", "Progessive"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_PRESCRIPTION_PANEL.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_PRESCRIPTION_PANEL.png",
    "defaultComponent": true,
    "props": {
      "enablePrism": {
        "required": false,
        "type": "boolean",
        "mode": "switch",
        "default": null
      },
      "enablePrismComment": {
        "required": false,
        "type": "boolean",
        "mode": "switch",
        "default": null
      },
      "enableDigitalOptometry": {
        "required": false,
        "type": "boolean",
        "mode": "switch",
        "default": null
      },
      "targetDigitalOptometry": {
        "required": false,
        "type": "string",
        "mode": "dropdown",
        "default": null
      },
      "enableAgreementCheckbox": {
        "required": false,
        "type": "boolean",
        "mode": "switch",
        "default": null
      },
      "labels": [
        {
          "key": "pupillaryDistanceSubtitle",
          "default": "You can select the default settings of 61 for women and 64 for men if you have an average or low prescription. If you have a strong prescription or if you want to know your exact Pupillary Distance, please "
        },
        {
          "key": "selectNewFrame",
          "default": "Select new frame"
        },
        {
          "key": "title",
          "default": "Enter your prescription"
        },
        {
          "key": "subtitle"
        },
        {
          "key": "rightEye_initials",
          "default": "OD"
        },
        {
          "key": "rightEye_name",
          "default": "(Right)"
        },
        {
          "key": "leftEye_initials",
          "default": "OS"
        },
        {
          "key": "leftEye_name",
          "default": "(Left)"
        },
        {
          "key": "sphere",
          "default": "SPH (Sphere)"
        },
        {
          "key": "cylinder",
          "default": "CYL (Cylinder)"
        },
        {
          "key": "axis",
          "default": "Axis"
        },
        {
          "key": "add",
          "default": "Add"
        },
        {
          "key": "vertical",
          "default": "Vertical (Δ)"
        },
        {
          "key": "baseDirection",
          "default": "Base Direction"
        },
        {
          "key": "horizontal",
          "default": "Horizontal (Δ)"
        },
        {
          "key": "pupillaryDistance",
          "default": "PD (Pupillary distance)"
        },
        {
          "key": "pdLeft",
          "default": "Left"
        },
        {
          "key": "pdRight",
          "default": "Right"
        },
        {
          "key": "iHaveTwoPd",
          "default": "I have 2 Pupillary Distance numbers"
        },
        {
          "key": "commentsTitle",
          "default": "Comments"
        },
        {
          "key": "applyButton",
          "default": "Continue"
        },
        {
          "key": "applyButtonSave",
          "default": "Save and continue"
        },
        {
          "key": "howToRead",
          "default": "How to read your prescription"
        },
        {
          "key": "pupillaryDistanceWarningValue",
          "default": "Please input your pupillary distance, if you don’t have it you can use the default from the above or you can "
        },
        {
          "key": "pupillaryDistanceMisurePDAction",
          "default": "measure your Pupillary Distance."
        },
        {
          "key": "pupillaryDistanceMisurePDActionHowToRead",
          "default": "measure your PD"
        },
        {
          "key": "pupillaryDistanceWarningTooltip",
          "default": "Provide text for this tooltip"
        },
        {
          "key": "moreOptions",
          "default": "More options"
        },
        {
          "key": "incompatibleFrame",
          "default": "We're sorry - the frames you’ve chosen aren't compatible with your prescription.<br/>Please select another style. Have questions? You can <a href='https?://www.glasses.com/gl-us/contact-us'>contact our Customer Service</a> team."
        },
        {
          "key": "incompatibleLenses",
          "default": "We're sorry, the prescription you've entered isn't compatible with our lenses offered online. Find a store near you or contact our <a href='https?://www.glasses.com/gl-us/contact-us'>Customer Service</a> team for more information."
        },
        {
          "key": "incompatibleLensTypeErrorSingle",
          "default": "You selected single vision lenses, but your saved prescription is for progressive lenses. We have updated your prescription below. Please check that it’s still valid."
        },
        {
          "key": "incompatibleLensTypeErrorProgressive",
          "default": "You selected progressive lenses, but your saved prescription is for single vision lenses. We have updated your prescription below. Please check that it’s still valid."
        },
        {
          "key": "clearAll",
          "default": "clear all"
        },
        {
          "key": "alerts_pdValueWarningDigitalOptometrySmaller",
          "default": "The selected Pupillary Distance is smaller than average, we suggest double checking your prescription. You can leave the default values written above or you can "
        },
        {
          "key": "alerts_pdValueWarningDigitalOptometryLarger",
          "default": "The selected Pupillary Distance is larger than average, we suggest double checking your prescription. You can leave the default values written above or you can "
        },
        {
          "key": "alerts_pdValueWarningSmaller",
          "default": "The selected Pupillary Distance is smaller than average, we suggest double checking your prescription.</b></br>You can leave the default setting of 63 which is the average measurement for adults.<br>If we need any more information about your prescription, one of our experts will be in touch."
        },
        {
          "key": "alerts_pdValueWarningLarger",
          "default": "The selected Pupillary Distance is larger than average, we suggest double checking your prescription.</b></br>You can leave the default setting of 63 which is the average measurement for adults.<br>If we need any more information about your prescription, one of our experts will be in touch."
        },
        {
          "key": "alerts_pdValueWarning2",
          "default": "The selected Pupillary Distance is smaller than average, we suggest double checking your prescription. If you don’t have the Pupillary Distance here ."
        },
        {
          "key": "alerts_missingBaseDir",
          "default": "Please choose the base direction for your prism"
        },
        {
          "key": "alerts_missingPrismValues",
          "default": "Please choose the prism value"
        },
        {
          "key": "alerts_missingValues",
          "default": "Complete the missing values"
        },
        {
          "key": "alerts_incompatibleWithPrescriptionTitle",
          "default": "Sorry! The frame you’ve chosen isn’t compatible with your prescription"
        },
        {
          "key": "alerts_incompatibleWithPackagesTitle",
          "default": "Sorry! The prescription you've chosen isn't compatible with any of our available lenses for this frame"
        },
        {
          "key": "alerts_shopCompatible",
          "default": "Shop compatible frames"
        },
        {
          "key": "alerts_clearAll",
          "default": "Clear all"
        },
        {
          "key": "alerts_agreementTextMobile",
          "default": "By clicking this box, I confirm that the prescription values entered above are taken from a valid (not expired) prescription issued to me, signed by a licensed optometrist or ophthalmologist."
        },
        {
          "key": "alerts_axisRangeError",
          "default": "The AXIS values you’ve inserted are not correct! These values must be between 1 and 180."
        },
        {
          "key": "alerts_axisZeroError",
          "default": "The AXIS values you’ve inserted are not correct! If CYL value is higher or lower than 0,  AXIS values can’t be 0."
        },
        {
          "key": "alerts_sphPositiveNegativeWarning",
          "default": "You’ve inserted 1 positive and 1 negative value, which is very rare. <br>We suggest double checking your prescription. If this is correct, you can proceed."
        },
        {
          "key": "alerts_pdValueWarning",
          "default": "The selected Pupillary Distance is outside the normal range, we suggest double checking your prescription. You can leave the default setting of 63 which is the average measurement for adults. If we need any more information about your prescription, one of our experts will be in touch."
        },
        {
          "key": "alerts_requiredToProceed",
          "default": "This is required to proceed"
        },
        {
          "key": "alerts_incompatibleWithPrescriptionBody",
          "default": "but don’t worry, compatible frames are available"
        },
        {
          "key": "alerts_agreementText",
          "default": "By clicking this box, I confirm that the prescription values entered above are taken from a valid (not expired) prescription issued to me, signed by a licensed optometrist or ophthalmologist."
        },
        {
          "key": "issueDate_label",
          "default": "Issue date (MM/YYYY)"
        },
        {
          "key": "issueDate_missingError",
          "default": "Please insert date"
        },
        {
          "key": "issueDate_formatError",
          "default": "The date entered is not valid"
        },
        {
          "key": "issueDate_tooltipText",
          "default": "Before submitting your prescription, please check the expiration date to make sure it is current and valid. We only accept prescriptions that have been issued within the last 2 years. By selecting the tick box and continuing below, you agree to our privacy policy and T&Cs."
        },
        {
          "key": "addPrismValues",
          "default": "My prescription includes prism values"
        },
        {
          "key": "whatIsIt",
          "default": "What is PD (Pupillary Distance)"
        },
        {
          "key": "editTitle",
          "default": "Edit your prescription"
        },
        {
          "key": "withoutPrescriptionFromMyAccount",
          "default": "You don’t have a prescription saved in your account. Add your prescription below and save it for future purchases or go back and choose another method."
        },
        {
          "key": "californian_toggle",
          "default": "Are you a California resident?"
        },
        {
          "key": "californian_info",
          "default": "Please note that besides adding prescription values manually, California residents are also required to electronically transmit their valid prescription."
        },
        {
          "key": "californian_infoCMD",
          "default": "Please note that besides adding prescription values manually, <b>California residents are also required to electronically transmit their valid prescription</b>. Choose an option to proceed."
        },
        {
          "key": "californian_chooseTitle",
          "default": "CHOOSE HOW TO SEND YOUR PRESCRIPTION"
        },
        {
          "key": "californian_uploadTitle",
          "default": "UPLOAD YOUR PRESCRIPTION"
        },
        {
          "key": "californian_uploadDesc",
          "default": "We accept the following file formats?: .pdf, .png, .jpeg, .gif, .tiff, .bmp, .docx (max 10 MB) and IWork pages."
        },
        {
          "key": "californian_uploadButton",
          "default": "Upload"
        },
        {
          "key": "californian_callMyDoc",
          "default": "CALL MY DOCTOR"
        },
        {
          "key": "californian_callMyDocButton",
          "default": "FIND YOUR DOCTOR"
        },
        {
          "key": "californian_yes",
          "default": "YES"
        },
        {
          "key": "californian_no",
          "default": "NO"
        },
        {
          "key": "californian_modalMissingPrescription_title",
          "default": "Missing prescription values"
        },
        {
          "key": "californian_modalMissingPrescription_subtitle",
          "default": "If you don’t fill the values we won’t be able to suggest the right lens for you"
        },
        {
          "key": "californian_modalMissingPrescription_bottonYes",
          "default": "YES, CONTINUE"
        },
        {
          "key": "californian_modalMissingPrescription_bottonNo",
          "default": "NO, GO BACK"
        },
        {
          "key": "proceedCheckbox",
          "default": "By clicking this box, I confirm that the prescription values entered above are taken from a unexpired written prescription issued to me, signed by a licensed optometrist or ophthalmologist."
        },
        {
          "key": "proceedCheckboxError",
          "default": "Required to proceed"
        },
        {
          "key": "savePrescriptionInAccount",
          "default": "Save prescription in My Account"
        },
        {
          "key": "newPrescriptionNameError",
          "default": "Prescription name field cannot be empty"
        },
        {
          "key": "prescriptionName",
          "default": "Prescription name"
        },
        {
          "key": "description",
          "default": "Insert the parameters you find on your prescription in the table below."
        },
        {
          "key": "selectPlaceholder",
          "default": "None"
        },
        {
          "key": "samePrescriptionBothEyesLabel",
          "default": "Same prescription for both eyes"
        },
        {
          "key": "prescriptionUploaded",
          "default": "Prescription Uploaded"
        },
        {
          "key": "somethingWentWrong",
          "default": "Sorry, something went wrong."
        },
        {
          "key": "fileTooBigErrorTitle",
          "default": "File is too big"
        },
        {
          "key": "fileTooBigErrorDescription",
          "default": "Your file size is too big. Maximum upload ###FILE_SIZE### MB"
        },
        {
          "key": "tryAgain",
          "default": "Please try again"
        },
        {
          "key": "upload",
          "default": "Upload"
        },
        {
          "key": "uploadDifferentFile",
          "default": "Upload different file"
        }
      ]
    }
  },
  "RXC_PRESCRIPTION_DETAILS_MODAL": {
    "displayName": "RXC_PRESCRIPTION_DETAILS_MODAL",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_PRESCRIPTION_DETAILS_MODAL.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_PRESCRIPTION_DETAILS_MODAL.png",
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
          "default": "Vertical (Δ)"
        },
        {
          "key": "baseDirection",
          "default": "Base Direction"
        },
        {
          "key": "horizontal",
          "default": "Horizontal (Δ)"
        },
        {
          "key": "noneLabel",
          "default": "None"
        }
      ]
    }
  },
  "RXC_REVIEW_PANEL": {
    "displayName": "RXC_REVIEW_PANEL",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_REVIEW_PANEL.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_REVIEW_PANEL.png",
    "defaultComponent": false,
    "props": {
      "enableAccordionReview": {
        "required": false,
        "default": "true",
        "type": "boolean",
        "mode": "switch"
      },
      "labels": [
        {
          "key": "advancedPrescription_confirmedTitle",
          "default": "Prescription"
        },
        {
          "key": "type_confirmedTitle",
          "default": "Vision need:"
        },
        {
          "key": "brand_confirmedTitle",
          "default": "Lens brand:"
        },
        {
          "key": "lensBundle_confirmedTitle",
          "default": "Lens bundle:"
        },
        {
          "key": "treatmentsFamily_confirmedTitle",
          "default": "Lens type:"
        },
        {
          "key": "gvpTreatment_confirmedTitle",
          "default": "Lens Package:"
        },
        {
          "key": "thickness_confirmedTitle",
          "default": "Thickness:"
        },
        {
          "key": "designType_confirmedTitle",
          "default": "Design Type:"
        },
        {
          "key": "treatments_confirmedTitle",
          "default": "Treatment:"
        },
        {
          "key": "lensColor_confirmedTitle",
          "default": "Color:"
        },
        {
          "key": "color_confirmedTitle",
          "default": "Color:"
        },
        {
          "key": "addOns_confirmedTitle",
          "default": "Finishings:"
        },
        {
          "key": "alreadyIncluded_confirmedTitle",
          "default": "Already Included:"
        },
        {
          "key": "protectionplan_confirmedTitle",
          "default": "Protection plan"
        },
        {
          "key": "noTreatment",
          "default": "No treatment"
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
        },
        {
          "key": "title",
          "default": "Review your selections"
        },
        {
          "key": "discountTitle",
          "default": "40% off prescription lenses is automatically applied"
        },
        {
          "key": "firstLineReview",
          "default": "Frame:"
        },
        {
          "key": "lensRecapTitle",
          "default": "Lenses:"
        },
        {
          "key": "insuranceButtonLabel",
          "default": "Add insurance benefits"
        },
        {
          "key": "insuranceButtonLabelRemove",
          "default": "Remove insurance benefits"
        },
        {
          "key": "oneYearCoverageAdd",
          "default": "Add"
        },
        {
          "key": "seeDetails",
          "default": "See details"
        },
        {
          "key": "paymentInstallments_modal_paypal",
          "default": "With ###PAYMENT_TYPE###, pay in ###INSTALLMENTS### easy payments of just ###MONTHLY_PRICE###"
        },
        {
          "key": "paymentInstallments_modal_title",
          "default": "Shop now. Pay later."
        },
        {
          "key": "paymentInstallments_modal_subtitle",
          "default": "Select ###PAYMENT_TYPE### as your payment method at checkout  to pay in interest-free installments, with no hidden fees."
        },
        {
          "key": "paymentInstallments_modal_affirm",
          "default": "With ###PAYMENT_TYPE###, pay in ###INSTALLMENTS### interest-free payments of just ###MONTHLY_PRICE###"
        },
        {
          "key": "paymentInstallments_modal_afterpay",
          "default": "With ###PAYMENT_TYPE###, make ###INSTALLMENTS### interest-free payments, every two weeks."
        },
        {
          "key": "paymentInstallments_modal_klarna",
          "default": "With ###PAYMENT_TYPE###, pay in ###INSTALLMENTS### interest-free payments of just ###MONTHLY_PRICE###"
        },
        {
          "key": "paymentInstallments_modal_terms",
          "default": "You must be over 18, a resident of the U.S., and meet additional eligibility criteria to qualify. Late fees may apply.  <a href='#' style= 'color:rgba(87, 93, 155, 1); font-weight: 600; letter-spacing:0.16px'>Click here</a> for complete terms. Loans to California residents made or arranged are pursuant to a California Finance Lenders Law"
        },
        {
          "key": "paymentInstallments_modal_learnMore",
          "default": "Learn more"
        },
        {
          "key": "paymentInstallments_installmentsLabel",
          "default": "Pay over time in interest-free installments with ###PAYMENT_TYPE###"
        },
        {
          "key": "subtitle",
          "default": "Your glasses will come with best in class Ray-Ban technology."
        },
        {
          "key": "tooltip",
          "default": "Ensure your eyewear with an extended warranty for unlimited repair and replacement at any LensCrafters store."
        },
        {
          "key": "prescriptionValues",
          "default": "Prescription Values"
        },
        {
          "key": "filePreviewTitle",
          "default": "Your prescription"
        },
        {
          "key": "fallbackImageMessageTitle",
          "default": "Lens color preview not available"
        },
        {
          "key": "fallbackImageMessageSubtitle",
          "default": "No worries, you will receive your frame with the lens color you selected."
        },
        {
          "key": "totalFrameLens_total",
          "default": "Total"
        },
        {
          "key": "addToBagLabel",
          "default": "Confirm and add to bag"
        }
      ]
    }
  },
  "RXC_SLIDER": {
    "displayName": "RXC_SLIDER",
    "layout": ["stepSection"],
    "availableAttributes": ["brand"],
    "nestedViewModes": ["inside", "outside"],
    "viewModes": ["immediate", "after selection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_SLIDER.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_SLIDER.png",
    "configurable": true,
    "defaultComponent": false,
    "props": {
      "attribute": {
        "required": true,
        "type": "string",
        "mode": "dropdown",
        "default": null
      },
      "showInfoIcon": {
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
        "default": "outside",
        "mode": "dropdown"
      },
      "nestedComponents": {
        "required": false,
        "type": "Array",
        "default": null,
        "elements": "Object"
      },
      "labels": [
        {
          "key": "title",
          "default": null
        },
        {
          "key": "description",
          "default": null
        }
      ]
    }
  },
  "RXC_SWATCH_LIST": {
    "displayName": "RXC_SWATCH_LIST",
    "layout": ["stepSection"],
    "availableAttributes": ["color", "frameColor"],
    "nestedViewModes": ["inside", "outside"],
    "viewModes": ["immediate", "after selection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_SWATCH_LIST.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_SWATCH_LIST.png",
    "configurable": true,
    "defaultComponent": false,
    "props": {
      "price": {
        "required": true,
        "type": "boolean",
        "mode": "switch",
        "default": null
      },
      "attribute": {
        "required": false,
        "type": "string",
        "mode": "dropdown",
        "default": "color"
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
        "default": "outside",
        "mode": "dropdown"
      },
      "nestedComponents": {
        "required": false,
        "type": "Array",
        "default": null,
        "elements": "Object"
      },
      "labels": [
        {
          "key": "includedLabel",
          "default": null
        }
      ]
    }
  },
  "RXC_TITLE_DESCRIPTION": {
    "displayName": "RXC_TITLE_DESCRIPTION",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_TITLE_DESCRIPTION.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_TITLE_DESCRIPTION.png",
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
          "key": "steps_addOns_label"
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
        },
        {
          "key": "tooltip_antiReflective",
          "default": "Reduce reflections and provides an invisible shield. It resists glare, dust and smudges for all round clearer vision."
        },
        {
          "key": "tooltip_uvProtection",
          "default": "Hard protective layers to the front and back of the lenses for maximum UV and scratch protection."
        },
        {
          "key": "tooltip_antiScratch",
          "default": "Protects your lens surface from harsh impacts"
        },
        {
          "key": "tooltip_blueLight",
          "default": "Reduces exposure to blue light from digital screens and sun rays, which can help reduce eye fatigue"
        }
      ]
    }
  },
  "RXC_TOGGLE": {
    "displayName": "RXC_TOGGLE",
    "layout": ["stepSection"],
    "availableAttributes": ["polar"],
    "nestedViewModes": ["inside", "outside"],
    "viewModes": ["immediate", "after selection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_TOGGLE.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_TOGGLE.png",
    "configurable": true,
    "defaultComponent": false,
    "props": {
      "attribute": {
        "required": true,
        "type": "string",
        "mode": "dropdown",
        "default": null
      },
      "showInfoIcon": {
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
        "default": "outside",
        "mode": "dropdown"
      },
      "nestedComponents": {
        "required": false,
        "type": "Array",
        "default": null,
        "elements": "Object"
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
          "key": "tooltipText",
          "default": null
        },
        {
          "key": "label",
          "default": null
        }
      ]
    }
  },
  "RXC_UPLOAD_PRESCRIPTION": {
    "displayName": "RXC_UPLOAD_PRESCRIPTION",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_UPLOAD_PRESCRIPTION.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_UPLOAD_PRESCRIPTION.png",
    "defaultComponent": true,
    "props": {
      "labels": [
        {
          "key": "title",
          "default": ""
        },
        {
          "key": "description",
          "default": ""
        },
        {
          "key": "uploadDifferentFile",
          "default": "Upload different file"
        },
        {
          "key": "changeMethod",
          "default": "Change sending method"
        },
        {
          "key": "somethingWentWrong",
          "default": "Sorry, something went wrong."
        },
        {
          "key": "fileTooBigErrorTitle",
          "default": "File is too big"
        },
        {
          "key": "fileTooBigErrorDescription",
          "default": "Your file size is too big. Maximum upload ###FILE_SIZE### MB"
        },
        {
          "key": "tryAgain",
          "default": "Please try again"
        },
        {
          "key": "upload",
          "default": "Upload"
        },
        {
          "key": "confirmAndContinue",
          "default": "Confirm & continue"
        },
        {
          "key": "alerts_agreementText",
          "default": "By clicking this box, I confirm that the prescription values entered above are taken from a valid (not expired) prescription issued to me, signed by a licensed optometrist or ophthalmologist."
        },
        {
          "key": "alerts_requiredToProceed",
          "default": "This is required to proceed"
        },
        {
          "key": "prescriptionUploaded",
          "default": "Prescription Uploaded"
        },
        {
          "key": "californian_uploadDesc",
          "default": "We accept the following file formats?: .pdf, .png, .jpeg, .gif, .tiff, .bmp, .docx (max 10 MB) and IWork pages."
        },
        {
          "key": "pupillaryDistanceSubtitle",
          "default": "You can select the default settings of 61 for women and 64 for men if you have an average or low prescription. If you have a strong prescription or if you want to know your exact Pupillary Distance, please "
        },
        {
          "key": "pupillaryDistanceMisurePDAction",
          "default": "measure your Pupillary Distance."
        },
        {
          "key": "iHaveTwoPd",
          "default": "I have 2 Pupillary Distance numbers"
        },
        {
          "key": "pdLeft",
          "default": "Left"
        },
        {
          "key": "pdRight",
          "default": "Right"
        },
        {
          "key": "pupillaryDistanceWarningValue",
          "default": "Please input your pupillary distance, if you don’t have it you can use the default from the above or you can "
        },
        {
          "key": "whatIsIt",
          "default": "What is PD (Pupillary Distance)"
        },
        {
          "key": "alerts_pdValueWarningDigitalOptometrySmaller",
          "default": "The selected Pupillary Distance is smaller than average, we suggest double checking your prescription. You can leave the default values written above or you can "
        },
        {
          "key": "alerts_pdValueWarningDigitalOptometryLarger",
          "default": "The selected Pupillary Distance is larger than average, we suggest double checking your prescription. You can leave the default values written above or you can "
        },
        {
          "key": "alerts_pdValueWarningSmaller",
          "default": "The selected Pupillary Distance is smaller than average, we suggest double checking your prescription.</b></br>You can leave the default setting of 63 which is the average measurement for adults.<br>If we need any more information about your prescription, one of our experts will be in touch."
        },
        {
          "key": "alerts_pdValueWarningLarger",
          "default": "The selected Pupillary Distance is larger than average, we suggest double checking your prescription.</b></br>You can leave the default setting of 63 which is the average measurement for adults.<br>If we need any more information about your prescription, one of our experts will be in touch."
        }
      ]
    }
  },
  "RXC_USE_SAVED_PRESCRIPTION": {
    "displayName": "RXC_USE_SAVED_PRESCRIPTION",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_USE_SAVED_PRESCRIPTION.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_USE_SAVED_PRESCRIPTION.png",
    "defaultComponent": true,
    "props": {
      "labels": [
        {
          "key": "title",
          "default": "Select your prescription"
        },
        {
          "key": "subtitle",
          "default": "Choose the preferred prescription and we’ll take care of the rest.  Can’t find it?"
        },
        {
          "key": "subtitleAdd",
          "default": "Add a new prescription"
        },
        {
          "key": "prescriptionName",
          "default": "Prescription name"
        },
        {
          "key": "uploadedOn",
          "default": "Last updated: "
        },
        {
          "key": "today",
          "default": "Today"
        },
        {
          "key": "yesterday",
          "default": "Yesterday"
        },
        {
          "key": "justUpdated",
          "default": "Just updated"
        },
        {
          "key": "olderThanYearBanner",
          "default": "This prescription was uploaded 1 year ago. Please check if it is still valid."
        },
        {
          "key": "addPrescriptionButton",
          "default": "Add new prescription"
        },
        {
          "key": "showPrescriptionLabel",
          "default": "show prescription"
        },
        {
          "key": "expired",
          "default": "expired"
        },
        {
          "key": "issueDate",
          "default": "Issue date"
        }
      ]
    }
  },
  "RXC_YOUR_SELECTIONS": {
    "displayName": "RXC_YOUR_SELECTIONS",
    "layout": ["previewSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_YOUR_SELECTIONS.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_YOUR_SELECTIONS.png",
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
        "default": "top-right"
      },
      "labels": [
        {
          "key": "yourSelections",
          "default": "Your selections"
        },
        {
          "key": "editButton",
          "default": "Edit"
        },
        {
          "key": "advancedPrescription_confirmedTitle",
          "default": "Prescription:"
        },
        {
          "key": "type_confirmedTitle",
          "default": "Vision need:"
        },
        {
          "key": "brand_confirmedTitle",
          "default": "Lens brand:"
        },
        {
          "key": "lensBundle_confirmedTitle",
          "default": "Lens bundle:"
        },
        {
          "key": "treatmentsFamily_confirmedTitle",
          "default": "Lens type:"
        },
        {
          "key": "gvpTreatment_confirmedTitle",
          "default": "Lens Package:"
        },
        {
          "key": "thickness_confirmedTitle",
          "default": "Thickness:"
        },
        {
          "key": "designType_confirmedTitle",
          "default": "Design Type:"
        },
        {
          "key": "treatments_confirmedTitle",
          "default": "Treatment:"
        },
        {
          "key": "lensColor_confirmedTitle",
          "default": "Color:"
        },
        {
          "key": "color_confirmedTitle",
          "default": "Color:"
        },
        {
          "key": "addOns_confirmedTitle",
          "default": "Finishings:"
        },
        {
          "key": "alreadyIncluded_confirmedTitle",
          "default": "Already Included:"
        },
        {
          "key": "protectionplan_confirmedTitle",
          "default": "Protection plan"
        },
        {
          "key": "includedLabel",
          "default": "Included"
        },
        {
          "key": "noTreatment",
          "default": "No treatment"
        }
      ]
    }
  },
  "RXC_ADD_DOCTOR_MODAL": {
    "displayName": "RXC_ADD_DOCTOR_MODAL",
    "layout": ["stepSection"],
    "previewImage": "https://rxc.luxottica.com/rxc3/fe/images/components/preview/RXC_ADD_DOCTOR_MODAL.png",
    "modalImage": "https://rxc.luxottica.com/rxc3/fe/images/components/modal/RXC_ADD_DOCTOR_MODAL.png",
    "position_values": [
      "top-left",
      "top-right",
      "bottom-left",
      "bottom-right",
      "center"
    ],
    "defaultComponent": true,
    "props": {
      "labels": [
        {
          "key": "title",
          "default": "Add new doctor"
        },
        {
          "key": "clinicOrDoctorName",
          "default": "Clinic or doctor name"
        },
        {
          "key": "phoneNumber",
          "default": "Phone number"
        },
        {
          "key": "addDoctor",
          "default": "Add new doctor"
        },
        {
          "key": "missingInfoError",
          "default": "Complete the missing informations"
        }
      ]
    }
  }
}
`
   
   /* PROVA DI FETCH A URL COMPONENTS_SCHEMA
   
   function leggiContenutoDaURL(url) {
     // Utilizza la Fetch API per recuperare il contenuto dell'URL
     fetch(url)
       .then(response => {
       // Verifica se la richiesta è stata completata con successo
       if (!response.ok) {
         throw new Error('Errore nella richiesta');
       }
       // Leggi il corpo della risposta come testo
       return response.text();
     })
       .then(data => {
       // Gestisci il contenuto ottenuto dalla risposta
       voltmx.print('### URL chiamato: ', JSON.stringify(data) );
     })
       .catch(error => {
       // Gestisci eventuali errori
       console.error('Si è verificato un errore:', error);
     });
   }

   // Esempio di utilizzo della funzione
   const url = 'https://rxc.luxottica.com/rxc3/fe/test/v1.0.0/components_schema.json';
   leggiContenutoDaURL(url);
   voltmx.print("### URL chiamato");
   
   */
   
   
   // when the login is succesfull
   function enter() {
     	voltmx.print("sono la callback dell'alert");
//      	var navigating = new voltmx.mvc.Navigation('frmDashboard');
//         navigating.navigate();
     
     
//         voltmx.print("### JSON STRING:" + JSON_string);
//         var obj = JSON.parse(JSON_string);
//         var value = obj[Object.keys(obj)[1]].displayName;
//         voltmx.print("### NAME: " + value);
     
       integrationService.invokeOperation("COMPONENT_TEMPLATE_LENGTH_CustomQuery", {},{}, 
                                               (response) => {  // Query che restituisce il numero di righe nella tabella COMPONENT_TEMPLATE
         
         voltmx.print("### Success response: " + JSON.stringify(response));
         
         if (response.records[0]["number"] > 0) {  // some COMPONENTS already existing on DB
           
           // // Query che restituisce la lista con tutti i COMPONENTI (e i relativi valori nella tabella PROPERTY_TEMPLATE) che hanno l'attributo "defaultComponent": true
           integrationService.invokeOperation("DEFAULT_COMPONENTS_CustomQuery", {},{}, 
                                               (default_response) => {
             voltmx.print("### Success response: " + JSON.stringify(default_response));
             
             let structuredData = Object.values(default_response.records.reduce((acc, record) => {
               // Se non esiste già un oggetto per il nome del componente, crealo
               if (!acc[record.component_name]) {
                 acc[record.component_name] = { id: record.component_name };
               }
               // Aggiungi ogni proprietà del record come chiave dell'oggetto del componente
               acc[record.component_name][record.name] = record.default;

               return acc;
             }, {}) );
             gblDefaultComponents = structuredData;
             
           }, (error) => {
             voltmx.print("### Error ");
           });
           
         } else {  // No COMPONENTS saved on DB yet, we proceed to save them now
           
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
                 } else {  // la proprietà non è un array
                   console.log(`${prop}: ${JSON.stringify(component[prop])}`);
                   if (component_template.hasOwnProperty(prop)) { // Assegna a component_template se prop è una chiave di component_template                          
                     component_template[prop] = component[prop];
                   }
                 }
               }
             });
             // Stampa i valori delle variabili per verificare
             console.log(component_template);
             voltmx.print("&&& component_template: " + JSON.stringify(component_template) );
             //             debugger;
             //aggiungi logica per invocare il DB con la create del component template
             voltmx.print("### CREATE COMPONENT TEMPLATE!");
             integrationService.invokeOperation("COMPONENT_TEMPLATE_create", {}, component_template, 
                                                (response) => {
               voltmx.print ("### Service response: "+JSON.stringify(response));
               let isADefaultComponent = response.COMPONENT_TEMPLATE[0].defaultComponent;
               if (component.props) {

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

               }
             }, error => {
               voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
             });

           });
       }
         
       }, error => {
            	voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
            }
            
        );
     
      
     
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
   }  // end of function "enter"
   
   
   
   		
   function SHOW_ALERT_Failure_Callback() {
     voltmx.print("sono la callback dell'alert");
   }

   
   
   
   integrationService.invokeOperation("USER_get",{},{},
                                      function(response){
     voltmx.application.showLoadingScreen(null, "Searching user ...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
     voltmx.print ("### Service response: "+JSON.stringify(response));
     var userFound = response.USER.some(user => user.email === email && user.password === password);
     voltmx.print("### USER email: " + email);
     if (userFound){
       gblUserMail = email;
       voltmx.application.dismissLoadingScreen();
       voltmx.print("### User found, welcome");
       enter();

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