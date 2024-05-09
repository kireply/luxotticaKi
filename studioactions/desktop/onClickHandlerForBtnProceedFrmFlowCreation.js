function onClickHandlerForBtnProceedFrmFlowCreation(eventobject) {
    var self = this;

    function SHOW_ALERT_ide_onClick_gc6963c1e9a648029e86d24b85a83e69_True() {}
    function SHOW_ALERT_ide_onClick_e6299d2f39764b02b98d818439f8d497_True() {}
    function INVOKE_ASYNC_SERVICE_ide_onClick_had1827f1b924009a3dd24a5c6c45355_Callback(status, FLOW_create) {
        voltmx.application.dismissLoadingScreen();
        if ((FLOW_create !== null) && (FLOW_create.opstatus === 0)) {
            voltmx.print("### APPENA CREATO FLOW N: " + FLOW_create.FLOW[0].id);
            gblFlowId = FLOW_create.FLOW[0].id;
            gblFlowDescription = self.view.txtFlowDescription.text;
            gblFlowCategory = self.view.lbCategory.selectedKeyValue[1];
            gblFlowEnvironment = self.view.lbEnvironment.selectedKeyValue[1];
            voltmx.print("### gblFlowId assegnato: " + gblFlowId);
            var ntf = new voltmx.mvc.Navigation("frmStepCreation");
            ntf.navigate({
                "lbEnvironment_value": self.view.lbEnvironment.selectedKeyValues[0][1],
                "txtFlowDescription_text": self.view.txtFlowDescription.text,
                "lbCategory_value": self.view.lbCategory.selectedKeyValues[0][1],
                "_meta_": {
                    "eventName": "",
                    "widgetId": ""
                }
            });
        } else {
            function SHOW_ALERT_ide_onClick_gc6963c1e9a648029e86d24b85a83e69_Callback() {
                SHOW_ALERT_ide_onClick_gc6963c1e9a648029e86d24b85a83e69_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_ERROR,
                "alertTitle": "Flow NOT created.",
                "yesLabel": "Ok",
                "message": "New flow NOT created. ",
                "alertHandler": SHOW_ALERT_ide_onClick_gc6963c1e9a648029e86d24b85a83e69_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
            var ntf = new voltmx.mvc.Navigation("frmFlowCreation");
            ntf.navigate();
        }
    }
    function INVOKE_ASYNC_SERVICE_ide_onClick_j409ad6e046440edb153ff6fc9e96fe2_Callback(status, FLOW_create) {
        voltmx.application.dismissLoadingScreen();
        if ((FLOW_create !== null) && (FLOW_create.opstatus === 0)) {
            voltmx.print("### APPENA CREATO FLOW N: " + FLOW_create.FLOW[0].id);
            gblFlowId = FLOW_create.FLOW[0].id;
            gblFlowDescription = self.view.txtFlowDescription.text;
            gblFlowCategory = self.view.lbCategory.selectedKeyValue[1];
            gblFlowEnvironment = self.view.lbEnvironment.selectedKeyValue[1];
            var ntf = new voltmx.mvc.Navigation("frmStepCreation");
            ntf.navigate({
                "lbEnvironment_value": self.view.lbEnvironment.selectedKeyValues[0][1],
                "txtFlowDescription_text": self.view.txtFlowDescription.text,
                "lbCategory_value": self.view.lbCategory.selectedKeyValues[0][1],
                "_meta_": {
                    "eventName": "",
                    "widgetId": ""
                }
            });
        } else {
            function SHOW_ALERT_ide_onClick_e6299d2f39764b02b98d818439f8d497_Callback() {
                SHOW_ALERT_ide_onClick_e6299d2f39764b02b98d818439f8d497_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_ERROR,
                "alertTitle": "New flow not created.",
                "message": "New flow NOT created.",
                "alertHandler": SHOW_ALERT_ide_onClick_e6299d2f39764b02b98d818439f8d497_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
            var ntf = new voltmx.mvc.Navigation("frmFlowCreation");
            ntf.navigate();
        }
    }
    var defaultFound = false;
    var formattedDate = "";
    var currentDate = new Date();
    // Ottengo i componenti della data (giorno, mese, anno)
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // I mesi partono da 0 (gennaio) quindi aggiungo 1
    var year = currentDate.getFullYear();
    // Formatta la data come stringa nel formato "YYYY-MM-DD"
    formattedDate = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
    voltmx.print("### DATA: " + formattedDate); // Stampo la data formattata
    voltmx.print("### SWITCH 1: " + this.view.swIsDefaultFlow.selectedIndex);
    voltmx.print("### SWitch 2: " + this.view.swIsSupernova.selectedIndex);
    if (self.view.swIsDefaultFlow.selectedIndex == 0) {
        gblFlowDefault = true;
    } else {
        gblFlowDefault = false;
    }
    if (self.view.swIsSupernova.selectedIndex == 0) {
        gblFlowSupernova = true;
    } else {
        gblFlowSupernova = false;
    }
    if (self.view.swShowFrameOnly.selectedIndex == 0) {
        gblFlowFrameOnly = true;
    } else {
        gblFlowFrameOnly = false;
    }
    if (self.view.swShowFramePlusLenses.selectedIndex == 0) {
        gblFlowFramePlusLenses = true;
    } else {
        gblFlowFramePlusLenses = false;
    }
    if (self.view.swShowSavingsLabel.selectedIndex == 0) {
        gblFlowSavingsLabel = true;
    } else {
        gblFlowSavingsLabel = false;
    }
    if (self.view.swActivateDistanceAndReading.selectedIndex == 0) {
        gblFlowDistanceReading = true;
    } else {
        gblFlowDistanceReading = false;
    }
    if (gblFlowDefault == true) {
        // Checking if a flow is already as default
        defaultFound = gblFlowsList.some(flow => flow.channel_id === gblChannelId && flow.default_flag === "true");
        if (defaultFound) {
            voltmx.print("### defaultFound IF TROVATO");
        } else {
            voltmx.print("### defaultFound IF NON TROVATO");
        }
        voltmx.print("### FINITO IF su defaultFound");
        if (defaultFound == true) {
            // A flow is already as default. Popup confirmation shown.
            voltmx.print("### Già presente un flusso as Default");
            this.view.flxBlur.setVisibility(true);
            this.view.flxPopupIsDefaultTrue.setVisibility(true);
        } else {
            voltmx.application.showLoadingScreen(null, "Creating new flow...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
            if (FLOW_create_inputparam == undefined) {
                var FLOW_create_inputparam = {};
            }
            FLOW_create_inputparam["serviceID"] = "mariaDB$FLOW_create";
            FLOW_create_inputparam["description"] = self.view.txtFlowDescription.text;
            FLOW_create_inputparam["category"] = self.view.lbCategory.selectedKeyValues[0][1];
            FLOW_create_inputparam["environment"] = self.view.lbEnvironment.selectedKeyValues[0][1];
            FLOW_create_inputparam["status"] = voltmx.visualizer.toString("Draft");
            FLOW_create_inputparam["a_b_test"] = voltmx.visualizer.toBoolean(false);
            FLOW_create_inputparam["steps_layout"] = voltmx.visualizer.toString("1");
            FLOW_create_inputparam["author"] = gblUserMail;
            FLOW_create_inputparam["channel_id"] = gblChannelId;
            FLOW_create_inputparam["last_modified"] = formattedDate;
            FLOW_create_inputparam["layout_id"] = voltmx.visualizer.toString("1");
            FLOW_create_inputparam["default_flag"] = gblFlowDefault;
            FLOW_create_inputparam["supernova"] = gblFlowSupernova;
            FLOW_create_inputparam["show_frame_only"] = gblFlowFrameOnly;
            FLOW_create_inputparam["show_frame_plus_lenses"] = gblFlowFramePlusLenses;
            FLOW_create_inputparam["show_savings_label"] = gblFlowSavingsLabel;
            FLOW_create_inputparam["activate_distance_and_reading"] = gblFlowDistanceReading;
            var FLOW_create_httpheaders = {};
            FLOW_create_inputparam["httpheaders"] = FLOW_create_httpheaders;
            var FLOW_create_httpconfigs = {};
            FLOW_create_inputparam["httpconfig"] = FLOW_create_httpconfigs;
            mariaDB$FLOW_create = mfintegrationsecureinvokerasync(FLOW_create_inputparam, "mariaDB", "FLOW_create", INVOKE_ASYNC_SERVICE_ide_onClick_j409ad6e046440edb153ff6fc9e96fe2_Callback);
        }
    } else {
        // Checking if there is no flow as default
        defaultFound = gblFlowsList.some(flow => flow.channel_id === gblChannelId && flow.default_flag === "true");
        if (defaultFound) {
            voltmx.print("### defaultFound ELSE TROVATO");
        } else {
            voltmx.print("### defaultFound ELSE NON TROVATO");
        }
        voltmx.print("### FINITO ELSE su defaultFound");
        if (defaultFound == false) {
            // No flow as default detected. Popup confirmation shown.
            voltmx.print("### NON ancora presente un flusso as Default");
            this.view.flxBlur.setVisibility(true);
            this.view.flxPopupIsDefaultFalse.setVisibility(true);
        } else {
            voltmx.application.showLoadingScreen(null, "Creating new flow...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
            if (FLOW_create_inputparam == undefined) {
                var FLOW_create_inputparam = {};
            }
            FLOW_create_inputparam["serviceID"] = "mariaDB$FLOW_create";
            FLOW_create_inputparam["last_modified"] = formattedDate;
            FLOW_create_inputparam["author"] = gblUserMail;
            FLOW_create_inputparam["status"] = voltmx.visualizer.toString("Draft");
            FLOW_create_inputparam["a_b_test"] = voltmx.visualizer.toBoolean(false);
            FLOW_create_inputparam["steps_layout"] = voltmx.visualizer.toString("1");
            FLOW_create_inputparam["channel_id"] = gblChannelId;
            FLOW_create_inputparam["description"] = self.view.txtFlowDescription.text;
            FLOW_create_inputparam["environment"] = self.view.lbEnvironment.selectedKeyValues[0][1];
            FLOW_create_inputparam["category"] = self.view.lbCategory.selectedKeyValues[0][1];
            FLOW_create_inputparam["layout_id"] = voltmx.visualizer.toString("1");
            FLOW_create_inputparam["supernova"] = gblFlowSupernova;
            FLOW_create_inputparam["default_flag"] = gblFlowDefault;
            var FLOW_create_httpheaders = {};
            FLOW_create_inputparam["httpheaders"] = FLOW_create_httpheaders;
            var FLOW_create_httpconfigs = {};
            FLOW_create_inputparam["httpconfig"] = FLOW_create_httpconfigs;
            mariaDB$FLOW_create = mfintegrationsecureinvokerasync(FLOW_create_inputparam, "mariaDB", "FLOW_create", INVOKE_ASYNC_SERVICE_ide_onClick_had1827f1b924009a3dd24a5c6c45355_Callback);
        }
    }
}