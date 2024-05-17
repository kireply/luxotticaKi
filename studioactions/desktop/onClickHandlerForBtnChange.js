function onClickHandlerForBtnChange(eventobject) {
    var self = this;

    function SHOW_ALERT_d633f49a95de488db87c1c40f492ef60_True() {
        // Showing "Save Step" label and "Create" button for save in Popup
        this.view.lblNewStep.setVisibility(true);
        this.view.lblChangeStep.setVisibility(false);
        this.view.btnProceed.setVisibility(true);
        this.view.btnChange.setVisibility(false);
        this.view.txtStepTitle.text = "";
    }
    function INVOKE_SERVICE_ce9193fd0f094230922941422d267a6e_Callback(status, STEP_update) {
        voltmx.application.dismissLoadingScreen();
        if (STEP_update.opstatus === 0) {
            // Showing "Save Step" label and "Create" button for save in Popup
            this.view.lblNewStep.setVisibility(true);
            this.view.lblChangeStep.setVisibility(false);
            this.view.btnProceed.setVisibility(true);
            this.view.btnChange.setVisibility(false);
            this.view.txtStepTitle.text = "";
        } else {
            function SHOW_ALERT_d633f49a95de488db87c1c40f492ef60_Callback() {
                SHOW_ALERT_d633f49a95de488db87c1c40f492ef60_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_ERROR,
                "alertTitle": "Step NOT updated correctly.",
                "yesLabel": "Ok",
                "message": "Step NOT updated correctly.",
                "alertHandler": SHOW_ALERT_d633f49a95de488db87c1c40f492ef60_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
        }
    }
    var varPrescription = false;
    if (self.view.swIsPrescriptionStep.selectedIndex == 0) {
        varPrescription = true;
    }
    var varAutoproceed = false;
    if (self.view.swAutoproceed.selectedIndex == 0) {
        varAutoproceed = true;
    }
    var varAutoskip = false;
    if (self.view.swAutoskip.selectedIndex == 0) {
        varAutoskip = true;
    }
    var varGreyout = false;
    if (self.view.swHasGreyout.selectedIndex == 0) {
        varGreyout = true;
    }
    voltmx.application.showLoadingScreen(null, "Updating Step...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    if (STEP_update_inputparam == undefined) {
        var STEP_update_inputparam = {};
    }
    STEP_update_inputparam["serviceID"] = "mariaDB$STEP_update";
    STEP_update_inputparam["flow_id"] = voltmx.visualizer.toNumber(gblFlowId);
    STEP_update_inputparam["id"] = gblStepIdToChange;
    STEP_update_inputparam["order"] = gblCurrentStepOrder;
    STEP_update_inputparam["title"] = self.view.txtStepTitle.text;
    STEP_update_inputparam["analytics_id"] = self.view.lbAnalytics.selectedKeyValues[0][1];
    STEP_update_inputparam["autoproceed_label"] = self.view.lblAutoproceedButtonLabel.text;
    STEP_update_inputparam["prescription_step"] = varPrescription;
    STEP_update_inputparam["autoproceed"] = varAutoproceed;
    STEP_update_inputparam["autoskip"] = varAutoskip;
    STEP_update_inputparam["has_greyout"] = varGreyout;
    var STEP_update_httpheaders = {};
    STEP_update_inputparam["httpheaders"] = STEP_update_httpheaders;
    var STEP_update_httpconfigs = {};
    STEP_update_inputparam["httpconfig"] = STEP_update_httpconfigs;
    mariaDB$STEP_update = mfintegrationsecureinvokerasync(STEP_update_inputparam, "mariaDB", "STEP_update", INVOKE_SERVICE_ce9193fd0f094230922941422d267a6e_Callback);
}