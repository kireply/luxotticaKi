function AS_Button_h3b518518b0347e58ad8f3d856c6e649(eventobject) {
    var self = this;

    function SHOW_ALERT_ide_onClick_e2f4ff3ebc5a414e9945683da7a7b6f3_True() {}
    function SHOW_ALERT_ide_onClick_d1e23cd45fe04f31b5e14d585f078409_True() {}
    function INVOKE_ASYNC_SERVICE_ide_onClick_i5dff0fccf4344eb892adfe544db488b_Callback(status, FLOW_update) {
        voltmx.application.dismissLoadingScreen();
        if (FLOW_update.opstatus !== 0) {
            function SHOW_ALERT_ide_onClick_e2f4ff3ebc5a414e9945683da7a7b6f3_Callback() {
                SHOW_ALERT_ide_onClick_e2f4ff3ebc5a414e9945683da7a7b6f3_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_ERROR,
                "alertTitle": "Last Default Flow NOT updated correctly.",
                "yesLabel": "Ok",
                "message": "Last Default Flow NOT updated correctly.",
                "alertHandler": SHOW_ALERT_ide_onClick_e2f4ff3ebc5a414e9945683da7a7b6f3_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
        }
    }
    function INVOKE_ASYNC_SERVICE_ide_onClick_b3b3e5d7d6374c76bb17452e3dba7b6b_Callback(status, FLOW_create) {
        voltmx.application.dismissLoadingScreen();
        if ((FLOW_create !== null) && (FLOW_create.opstatus === 0)) {
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
                    "eventName": "onClick",
                    "widgetId": "btnConfirmPopupIsDefaultTrue"
                }
            });
        } else {
            function SHOW_ALERT_ide_onClick_d1e23cd45fe04f31b5e14d585f078409_Callback() {
                SHOW_ALERT_ide_onClick_d1e23cd45fe04f31b5e14d585f078409_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_ERROR,
                "alertTitle": "New flow NOT created.",
                "yesLabel": "Ok",
                "message": "New flow NOT created.",
                "alertHandler": SHOW_ALERT_ide_onClick_d1e23cd45fe04f31b5e14d585f078409_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
            var ntf = new voltmx.mvc.Navigation("frmFlowCreation");
            ntf.navigate();
        }
    }
    var formattedDate = "";
    var currentDate = new Date();
    // Ottengo i componenti della data (giorno, mese, anno)
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // I mesi partono da 0 (gennaio) quindi aggiungo 1
    var year = currentDate.getFullYear();
    // Formatta la data come stringa nel formato "YYYY-MM-DD"
    formattedDate = year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day);
    voltmx.print("### DATA: " + formattedDate); // Stampo la data formattata
    var lastDefaultFlowId = 0;
    var lastDefaultFlowChannelId = "";
    var lastDefaultFlowDescription = "";
    var lastDefaultFlowABTest = false;
    var lastDefaultFlowEnvironment = "";
    var lastDefaultFlowStatus = "";
    var lastDefaultFlowSupernova = false;
    var lastDefaultFlowCategory = "";
    var lastDefaultFlowAuthor = "";
    var lastDefaultFlowLastModified = "";
    var lastDefaultFlowLayoutId = "";
    var lastDefaultFlow = gblFlowsList.filter(flow => flow.default_flag.includes("true"));
    // saving data of last default flow in order to update it (as NOT default)
    var lastDefaultId = lastDefaultFlow[0].id;
    lastDefaultFlowId = parseInt(lastDefaultId.split('_').pop());
    lastDefaultFlowChannelId = lastDefaultFlow[0].channel_id;
    lastDefaultFlowDescription = lastDefaultFlow[0].description;
    lastDefaultFlowABTest = lastDefaultFlow[0].a_b_test;
    lastDefaultFlowEnvironment = lastDefaultFlow[0].environment;
    lastDefaultFlowStatus = lastDefaultFlow[0].status;
    lastDefaultFlowSupernova = lastDefaultFlow[0].supernova;
    lastDefaultFlowCategory = lastDefaultFlow[0].category;
    lastDefaultFlowAuthor = lastDefaultFlow[0].author;
    lastDefaultFlowLastModified = lastDefaultFlow[0].last_modified;
    lastDefaultFlowLayoutId = lastDefaultFlow[0].layout_id;
    voltmx.print("### lastDefaultFlowId: " + lastDefaultFlowId);
    voltmx.print("### lastDefaultFlow: " + JSON.stringify(lastDefaultFlowId));
    voltmx.application.showLoadingScreen(null, "Creating new flow...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    if (FLOW_create_inputparam == undefined) {
        var FLOW_create_inputparam = {};
    }
    FLOW_create_inputparam["serviceID"] = "mariaDB$FLOW_create";
    FLOW_create_inputparam["last_modified"] = formattedDate;
    FLOW_create_inputparam["author"] = gblUserMail;
    FLOW_create_inputparam["channel_id"] = gblChannelId;
    FLOW_create_inputparam["steps_layout"] = voltmx.visualizer.toString("steps");
    FLOW_create_inputparam["a_b_test"] = voltmx.visualizer.toBoolean(false);
    FLOW_create_inputparam["description"] = self.view.txtFlowDescription.text;
    FLOW_create_inputparam["environment"] = self.view.lbEnvironment.selectedKeyValues[0][1];
    FLOW_create_inputparam["category"] = self.view.lbCategory.selectedKeyValues[0][1];
    FLOW_create_inputparam["status"] = voltmx.visualizer.toString("Draft");
    FLOW_create_inputparam["layout_id"] = voltmx.visualizer.toString("1");
    FLOW_create_inputparam["default_flag"] = gblFlowDefault;
    FLOW_create_inputparam["supernova"] = gblFlowSupernova;
    var FLOW_create_httpheaders = {};
    FLOW_create_inputparam["httpheaders"] = FLOW_create_httpheaders;
    var FLOW_create_httpconfigs = {};
    FLOW_create_inputparam["httpconfig"] = FLOW_create_httpconfigs;
    mariaDB$FLOW_create = mfintegrationsecureinvokerasync(FLOW_create_inputparam, "mariaDB", "FLOW_create", INVOKE_ASYNC_SERVICE_ide_onClick_b3b3e5d7d6374c76bb17452e3dba7b6b_Callback);
    voltmx.application.showLoadingScreen(null, "Updating flows...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    if (FLOW_update_inputparam == undefined) {
        var FLOW_update_inputparam = {};
    }
    FLOW_update_inputparam["serviceID"] = "mariaDB$FLOW_update";
    FLOW_update_inputparam["id"] = lastDefaultFlowId;
    FLOW_update_inputparam["channel_id"] = lastDefaultFlowChannelId;
    FLOW_update_inputparam["description"] = lastDefaultFlowDescription;
    FLOW_update_inputparam["a_b_test"] = lastDefaultFlowABTest;
    FLOW_update_inputparam["environment"] = lastDefaultFlowEnvironment;
    FLOW_update_inputparam["status"] = lastDefaultFlowStatus;
    FLOW_update_inputparam["default_flag"] = voltmx.visualizer.toBoolean(false);
    FLOW_update_inputparam["supernova"] = lastDefaultFlowSupernova;
    FLOW_update_inputparam["category"] = lastDefaultFlowCategory;
    FLOW_update_inputparam["author"] = lastDefaultFlowAuthor;
    FLOW_update_inputparam["last_modified"] = lastDefaultFlowLastModified;
    FLOW_update_inputparam["layout_id"] = lastDefaultFlowLayoutId;
    var FLOW_update_httpheaders = {};
    FLOW_update_inputparam["httpheaders"] = FLOW_update_httpheaders;
    var FLOW_update_httpconfigs = {};
    FLOW_update_inputparam["httpconfig"] = FLOW_update_httpconfigs;
    mariaDB$FLOW_update = mfintegrationsecureinvokerasync(FLOW_update_inputparam, "mariaDB", "FLOW_update", INVOKE_ASYNC_SERVICE_ide_onClick_i5dff0fccf4344eb892adfe544db488b_Callback);
}