function AS_Button_d0fbe03277a045c8807bf803d3f018c8(eventobject) {
    var self = this;

    function SHOW_ALERT_ide_onClick_ec0b44002dd84464a0c06d31717a51e6_True() {}
    function INVOKE_ASYNC_SERVICE_ide_onClick_hb204982f5da459e85e76c9b965c142b_Callback(status, FLOW_create) {
        voltmx.application.dismissLoadingScreen();
        voltmx.print("### FLOW_create.errmsg: " + FLOW_create.errmsg);
        voltmx.print("### FLOW_create.opstatus: " + FLOW_create.opstatus);
        voltmx.print("### gblUserMail: " + gblUserMail);
        if ((FLOW_create.opstatus === 0) && (FLOW_create !== null)) {
            gblDuplicateIcon = false;
            self.view.flxPopupDuplicateFlowLarge.setVisibility(false);
            self.view.flxBlur.setVisibility(false);
            // E successivamente navigo nuovamente su form così da aggiornarlo
            var ntf = new voltmx.mvc.Navigation("frmFlows");
            ntf.navigate();
        } else {
            function SHOW_ALERT_ide_onClick_ec0b44002dd84464a0c06d31717a51e6_Callback() {
                SHOW_ALERT_ide_onClick_ec0b44002dd84464a0c06d31717a51e6_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_ERROR,
                "alertTitle": "Flow NOT duplicated.",
                "message": "Flow NOT duplicated.",
                "alertHandler": SHOW_ALERT_ide_onClick_ec0b44002dd84464a0c06d31717a51e6_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
            gblDuplicateIcon = false;
            self.view.flxPopupDuplicateFlowLarge.setVisibility(false);
            self.view.flxBlur.setVisibility(false);
            // E successivamente navigo nuovamente su form così da aggiornarlo
            var ntf = new voltmx.mvc.Navigation("frmFlows");
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
    voltmx.print("### SWITCH 1: " + this.view.swIsDefaultFlow.selectedIndex);
    voltmx.print("### SWitch 2: " + this.view.swIsSupernova.selectedIndex);
    var isDefault = "";
    var isSupernova = "";
    if (self.view.swIsDefaultFlow.selectedIndex == 0) {
        isDefault = "true";
    } else {
        isDefault = "false";
    }
    if (self.view.swIsSupernova.selectedIndex == 0) {
        isSupernova = "true";
    } else {
        isSupernova = "false";
    }
    voltmx.application.showLoadingScreen(null, "Creating new flow...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    if (FLOW_create_inputparam == undefined) {
        var FLOW_create_inputparam = {};
    }
    FLOW_create_inputparam["serviceID"] = "mariaDB$FLOW_create";
    FLOW_create_inputparam["description"] = self.view.txtFlowDescription.text;
    FLOW_create_inputparam["category"] = self.view.lbCategory2.selectedKeyValues[0][1];
    FLOW_create_inputparam["environment"] = self.view.lbEnvironment2.selectedKeyValues[0][1];
    FLOW_create_inputparam["a_b_test"] = voltmx.visualizer.toBoolean(false);
    FLOW_create_inputparam["steps_layout"] = voltmx.visualizer.toString("steps");
    FLOW_create_inputparam["author"] = gblUserMail;
    FLOW_create_inputparam["channel_id"] = gblChannelId;
    FLOW_create_inputparam["last_modified"] = formattedDate;
    FLOW_create_inputparam["status"] = voltmx.visualizer.toString("Draft");
    FLOW_create_inputparam["layout_id"] = voltmx.visualizer.toString("1");
    FLOW_create_inputparam["default_flag"] = self.view.swIsDefaultFlow1.state;
    FLOW_create_inputparam["supernova"] = self.view.swIsSupernova1.state;
    var FLOW_create_httpheaders = {};
    FLOW_create_inputparam["httpheaders"] = FLOW_create_httpheaders;
    var FLOW_create_httpconfigs = {};
    FLOW_create_inputparam["httpconfig"] = FLOW_create_httpconfigs;
    mariaDB$FLOW_create = mfintegrationsecureinvokerasync(FLOW_create_inputparam, "mariaDB", "FLOW_create", INVOKE_ASYNC_SERVICE_ide_onClick_hb204982f5da459e85e76c9b965c142b_Callback);
}