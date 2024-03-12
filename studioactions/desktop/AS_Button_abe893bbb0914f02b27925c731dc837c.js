function AS_Button_abe893bbb0914f02b27925c731dc837c(eventobject) {
    var self = this;

    function SHOW_ALERT_ide_onClick_a5cdeedcdea241e2acfdb1a3dc030a88_True() {}
    function SHOW_ALERT_ide_onClick_hb4b60e4172d474899752544cffbc2ca_True() {}
    function SHOW_ALERT_ide_onClick_bcfa74c91ee249208a81b1645759361a_True() {}
    function SHOW_ALERT_ide_onClick_cff64cfa294e4b29b06dde907b950df8_True() {}
    function INVOKE_ASYNC_SERVICE_ide_onClick_i080265c17054e8d99b8b1569569e431_Callback(status, FLOW_create) {
        voltmx.application.dismissLoadingScreen();
        if ((FLOW_create !== null) && (FLOW_create.opstatus === 0)) {
            function SHOW_ALERT_ide_onClick_hb4b60e4172d474899752544cffbc2ca_Callback() {
                SHOW_ALERT_ide_onClick_hb4b60e4172d474899752544cffbc2ca_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_INFO,
                "alertTitle": "New flow created.",
                "yesLabel": "Ok",
                "message": "New flow succesfully created. ",
                "alertHandler": SHOW_ALERT_ide_onClick_hb4b60e4172d474899752544cffbc2ca_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
            idNewFlow = FLOW_create.FLOW[0].id;
            var ntf = new voltmx.mvc.Navigation("frmStepCreation");
            ntf.navigate({
                "variable_isDefault": isDefault,
                "lbEnvironment_value": self.view.lbEnvironment.selectedKeyValues[0][1],
                "txtFlowDescription_text": self.view.txtFlowDescription.text,
                "variable_idNewFlow": idNewFlow,
                "lbCategory_value": self.view.lbCategory.selectedKeyValues[0][1],
                "_meta_": {
                    "eventName": "onClick",
                    "widgetId": "btnProceed"
                }
            });
        } else {
            function SHOW_ALERT_ide_onClick_a5cdeedcdea241e2acfdb1a3dc030a88_Callback() {
                SHOW_ALERT_ide_onClick_a5cdeedcdea241e2acfdb1a3dc030a88_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_ERROR,
                "alertTitle": "Flow NOT created.",
                "yesLabel": "Ok",
                "message": "New flow NOT created. ",
                "alertHandler": SHOW_ALERT_ide_onClick_a5cdeedcdea241e2acfdb1a3dc030a88_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
            var ntf = new voltmx.mvc.Navigation("frmFlowCreation");
            ntf.navigate();
        }
    }
    function INVOKE_ASYNC_SERVICE_ide_onClick_c97d4d77b8214a019cdf36e03a837846_Callback(status, FLOW_create) {
        voltmx.application.dismissLoadingScreen();
        if ((FLOW_create !== null) && (FLOW_create.opstatus === 0)) {
            function SHOW_ALERT_ide_onClick_cff64cfa294e4b29b06dde907b950df8_Callback() {
                SHOW_ALERT_ide_onClick_cff64cfa294e4b29b06dde907b950df8_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_INFO,
                "alertTitle": "New flow created.",
                "yesLabel": "Ok",
                "message": "New flow succesfully created.",
                "alertHandler": SHOW_ALERT_ide_onClick_cff64cfa294e4b29b06dde907b950df8_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
            idNewFlow = FLOW_create.FLOW[0].id;
            var ntf = new voltmx.mvc.Navigation("frmStepCreation");
            ntf.navigate({
                "variable_isDefault": isDefault,
                "lbEnvironment_value": self.view.lbEnvironment.selectedKeyValues[0][1],
                "txtFlowDescription_text": self.view.txtFlowDescription.text,
                "variable_idNewFlow": idNewFlow,
                "lbCategory_value": self.view.lbCategory.selectedKeyValues[0][1],
                "_meta_": {
                    "eventName": "onClick",
                    "widgetId": "btnProceed"
                }
            });
        } else {
            function SHOW_ALERT_ide_onClick_bcfa74c91ee249208a81b1645759361a_Callback() {
                SHOW_ALERT_ide_onClick_bcfa74c91ee249208a81b1645759361a_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_ERROR,
                "alertTitle": "New flow not created.",
                "message": "New flow NOT created.",
                "alertHandler": SHOW_ALERT_ide_onClick_bcfa74c91ee249208a81b1645759361a_Callback
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
    var idNewFlow = "";
    var isDefault = false;
    var isSupernova = false;
    if (self.view.swIsDefaultFlow.selectedIndex == 0) {
        isDefault = true;
    }
    if (self.view.swIsSupernova.selectedIndex == 0) {
        isSupernova = true;
    }
    if (isDefault == true) {
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
            FLOW_create_inputparam["steps_layout"] = voltmx.visualizer.toString("steps");
            FLOW_create_inputparam["author"] = gblUserMail;
            FLOW_create_inputparam["channel_id"] = gblChannelId;
            FLOW_create_inputparam["default_flag"] = voltmx.visualizer.toBoolean(isDefault);
            FLOW_create_inputparam["supernova"] = voltmx.visualizer.toBoolean(isSupernova);
            FLOW_create_inputparam["last_modified"] = formattedDate;
            var FLOW_create_httpheaders = {};
            FLOW_create_inputparam["httpheaders"] = FLOW_create_httpheaders;
            var FLOW_create_httpconfigs = {};
            FLOW_create_inputparam["httpconfig"] = FLOW_create_httpconfigs;
            mariaDB$FLOW_create = mfintegrationsecureinvokerasync(FLOW_create_inputparam, "mariaDB", "FLOW_create", INVOKE_ASYNC_SERVICE_ide_onClick_c97d4d77b8214a019cdf36e03a837846_Callback);
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
            FLOW_create_inputparam["default_flag"] = isDefault;
            FLOW_create_inputparam["steps_layout"] = voltmx.visualizer.toString("steps");
            FLOW_create_inputparam["supernova"] = isSupernova;
            FLOW_create_inputparam["channel_id"] = gblChannelId;
            FLOW_create_inputparam["description"] = self.view.txtFlowDescription.text;
            FLOW_create_inputparam["environment"] = self.view.lbEnvironment.selectedKeyValues[0][1];
            FLOW_create_inputparam["category"] = self.view.lbCategory.selectedKeyValues[0][1];
            var FLOW_create_httpheaders = {};
            FLOW_create_inputparam["httpheaders"] = FLOW_create_httpheaders;
            var FLOW_create_httpconfigs = {};
            FLOW_create_inputparam["httpconfig"] = FLOW_create_httpconfigs;
            mariaDB$FLOW_create = mfintegrationsecureinvokerasync(FLOW_create_inputparam, "mariaDB", "FLOW_create", INVOKE_ASYNC_SERVICE_ide_onClick_i080265c17054e8d99b8b1569569e431_Callback);
        }
    }
}