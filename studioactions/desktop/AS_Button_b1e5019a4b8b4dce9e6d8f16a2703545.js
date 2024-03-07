function AS_Button_b1e5019a4b8b4dce9e6d8f16a2703545(eventobject) {
    var self = this;

    function SHOW_ALERT_ide_onClick_bb13917ba71b4f579bef7c47a4db9bc5_True() {
        voltmx.print("### sono entrato nel FALSE");
    }
    function SHOW_ALERT_ide_onClick_e1de415f78784827ae9df0a313d7746c_True() {
        voltmx.print("### sono entrato nel true");
    }
    function INVOKE_ASYNC_SERVICE_ide_onClick_c3d672d31c38480fb08a0112aa03c4db_Callback(status, CHANNEL_create) {
        if ((CHANNEL_create !== null) && (CHANNEL_create.opstatus === 0)) {
            function SHOW_ALERT_ide_onClick_e1de415f78784827ae9df0a313d7746c_Callback() {
                SHOW_ALERT_ide_onClick_e1de415f78784827ae9df0a313d7746c_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_INFO,
                "alertTitle": "Success",
                "yesLabel": "Ok",
                "message": "Channel succesfully created.",
                "alertHandler": SHOW_ALERT_ide_onClick_e1de415f78784827ae9df0a313d7746c_Callback
            }, {
                "iconPosition": constants.ALERT_ICON_POSITION_LEFT
            });
            var ntf = new voltmx.mvc.Navigation("frmChannels");
            ntf.navigate();
        } else {
            function SHOW_ALERT_ide_onClick_bb13917ba71b4f579bef7c47a4db9bc5_Callback() {
                SHOW_ALERT_ide_onClick_bb13917ba71b4f579bef7c47a4db9bc5_True();
            }
            voltmx.ui.Alert({
                "alertType": constants.ALERT_TYPE_ERROR,
                "alertTitle": "Error",
                "yesLabel": "OK",
                "message": "Channel NOT created.",
                "alertHandler": SHOW_ALERT_ide_onClick_bb13917ba71b4f579bef7c47a4db9bc5_Callback
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
    mariaDB$CHANNEL_create = mfintegrationsecureinvokerasync(CHANNEL_create_inputparam, "mariaDB", "CHANNEL_create", INVOKE_ASYNC_SERVICE_ide_onClick_c3d672d31c38480fb08a0112aa03c4db_Callback);
}