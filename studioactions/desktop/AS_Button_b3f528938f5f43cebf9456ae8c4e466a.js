function AS_Button_b3f528938f5f43cebf9456ae8c4e466a(eventobject) {
    var self = this;

    function SHOW_ALERT_ide_onClick_d7c8b58950334fccb80378e4b813e09f_True() {
        var ntf = new voltmx.mvc.Navigation("frmStepComposition");
        ntf.navigate({
            "lblStepTitle_text": self.view.lblStepTitle.text,
            "lblStepTitle_isVisible": self.view.lblStepTitle.isVisible,
            "txtStepTitle_text": self.view.txtStepTitle.text,
            "_meta_": {
                "eventName": "onClick",
                "widgetId": ""
            }
        });
    }
    function SHOW_ALERT_ide_onClick_bf94f7c23c89466d964d8d97e56a94da_True() {}
    function INVOKE_ASYNC_SERVICE_ide_onClick_f72088244f4643abb77990d7f7c540ec_Callback(status, STEP_create) {
        voltmx.application.dismissLoadingScreen();
        if ((STEP_create !== null) && (STEP_create.opstatus === 0)) {
            function SHOW_ALERT_ide_onClick_d7c8b58950334fccb80378e4b813e09f_Callback() {
                SHOW_ALERT_ide_onClick_d7c8b58950334fccb80378e4b813e09f_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_INFO,
                "alertTitle": "New step created.",
                "yesLabel": "Ok",
                "message": "New step successfully created!",
                "alertHandler": SHOW_ALERT_ide_onClick_d7c8b58950334fccb80378e4b813e09f_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
        } else {
            function SHOW_ALERT_ide_onClick_bf94f7c23c89466d964d8d97e56a94da_Callback() {
                SHOW_ALERT_ide_onClick_bf94f7c23c89466d964d8d97e56a94da_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_ERROR,
                "alertTitle": "New step NOTcreated.",
                "yesLabel": "Ok",
                "message": "New step NOT created!",
                "alertHandler": SHOW_ALERT_ide_onClick_bf94f7c23c89466d964d8d97e56a94da_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
        }
    }
    var isPrescriptionStep = false;
    voltmx.print("### Flow ID: " + gblFlowId);
    voltmx.print("### Flow Name: " + gblFlowName);
    var Autoproceed = false;
    var Autoskip = false;
    var hasGreyout = false;
    if (self.view.swIsPrescriptionStep.selectedIndex == 0) {
        isPrescriptionStep = true;
    }
    if (self.view.swAutoproceed.selectedIndex == 0) {
        Autoproceed = true;
    }
    if (self.view.swAutoskip.selectedIndex == 0) {
        Autoskip = true;
    }
    if (self.view.swHasGreyout.selectedIndex == 0) {
        hasGreyout = true;
    }
    voltmx.application.showLoadingScreen(null, "Creating new step...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    if (STEP_create_inputparam == undefined) {
        var STEP_create_inputparam = {};
    }
    STEP_create_inputparam["serviceID"] = "mariaDB$STEP_create";
    STEP_create_inputparam["flow_id"] = voltmx.visualizer.toNumber(gblFlowId);
    STEP_create_inputparam["number"] = voltmx.visualizer.toNumber(gblFlowId);
    STEP_create_inputparam["title"] = self.view.txtStepTitle.text;
    STEP_create_inputparam["prescription_step"] = isPrescriptionStep;
    STEP_create_inputparam["autoproceed"] = Autoproceed;
    STEP_create_inputparam["autoskip"] = Autoskip;
    STEP_create_inputparam["has_greyout"] = hasGreyout;
    STEP_create_inputparam["analytics_id"] = self.view.lbAnalytics.selectedKeyValues[0][1];
    STEP_create_inputparam["order"] = voltmx.visualizer.toNumber("1");
    STEP_create_inputparam["autoproceed_label"] = self.view.txtAutoproceedButtonLabel.text;
    var STEP_create_httpheaders = {};
    STEP_create_inputparam["httpheaders"] = STEP_create_httpheaders;
    var STEP_create_httpconfigs = {};
    STEP_create_inputparam["httpconfig"] = STEP_create_httpconfigs;
    mariaDB$STEP_create = mfintegrationsecureinvokerasync(STEP_create_inputparam, "mariaDB", "STEP_create", INVOKE_ASYNC_SERVICE_ide_onClick_f72088244f4643abb77990d7f7c540ec_Callback);
}