function AS_Button_ce8e3f0dae2c4a1ca71ff64956e0825f(eventobject) {
    var self = this;

    function SHOW_ALERT_ide_onClick_j02f17875895466ea5ba383ae81be036_True() {
        voltmx.print("### sono entrato nel FALSE");
    }
    function SHOW_ALERT_ide_onClick_c6b07babe319418f84018716079956b6_True() {
        voltmx.print("### sono entrato nel true");
    }
    function INVOKE_ASYNC_SERVICE_ide_onClick_j43d24e6e1ed4c18abd42e2f844e83ad_Callback(status, CHANNEL_create) {
        if ((CHANNEL_create !== null) && (CHANNEL_create.opstatus === 0)) {
            function SHOW_ALERT_ide_onClick_c6b07babe319418f84018716079956b6_Callback() {
                SHOW_ALERT_ide_onClick_c6b07babe319418f84018716079956b6_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_INFO,
                "alertTitle": "Success",
                "yesLabel": "Ok",
                "message": "Channel succesfully created.",
                "alertHandler": SHOW_ALERT_ide_onClick_c6b07babe319418f84018716079956b6_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
            var ntf = new voltmx.mvc.Navigation("frmChannels");
            ntf.navigate();
        } else {
            function SHOW_ALERT_ide_onClick_j02f17875895466ea5ba383ae81be036_Callback() {
                SHOW_ALERT_ide_onClick_j02f17875895466ea5ba383ae81be036_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_ERROR,
                "alertTitle": "Error",
                "yesLabel": "OK",
                "message": "Channel NOT created.",
                "alertHandler": SHOW_ALERT_ide_onClick_j02f17875895466ea5ba383ae81be036_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
            var ntf = new voltmx.mvc.Navigation("frmChannelCreation");
            ntf.navigate();
        }
    }
    if (CHANNEL_create_inputparam == undefined) {
        var CHANNEL_create_inputparam = {};
    }
    CHANNEL_create_inputparam["serviceID"] = "mariaDB$CHANNEL_create";
    CHANNEL_create_inputparam["id"] = self.view.txtChannelID.text;
    CHANNEL_create_inputparam["logo"] = self.view.txtChannelLogo.text;
    CHANNEL_create_inputparam["properties_file"] = self.view.txtChannelProperties.text;
    CHANNEL_create_inputparam["name"] = self.view.lbChannelName.selectedKeyValues[0][1];
    var CHANNEL_create_httpheaders = {};
    CHANNEL_create_inputparam["httpheaders"] = CHANNEL_create_httpheaders;
    var CHANNEL_create_httpconfigs = {};
    CHANNEL_create_inputparam["httpconfig"] = CHANNEL_create_httpconfigs;
    mariaDB$CHANNEL_create = mfintegrationsecureinvokerasync(CHANNEL_create_inputparam, "mariaDB", "CHANNEL_create", INVOKE_ASYNC_SERVICE_ide_onClick_j43d24e6e1ed4c18abd42e2f844e83ad_Callback);
}