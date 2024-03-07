function AS_TextField_c538a50541dc48c0b13c7cd52a1559bb(eventobject, changedtext) {
    var self = this;

    function _ide_onTextChange_da87681b301f42cdb292e7c8d7589b25_Callback() {}
    function _ide_onTextChange_a5280b6251064cef9cd665f66c5687e2_Callback() {}
    var channelID = "";
    var channelName = "";
    var channelLogo = "";
    var channelProperties = "";
    channelID = self.view.txtChannelID.text;
    channelLogo = self.view.txtChannelLogo.text;
    channelProperties = self.view.txtChannelProperties.text;
    channelName = self.view.lbChannelName.selectedKeyValues[0][1];
    if ((channelID == "") || (channelID.length == undefined) || (channelName == "") || (channelName == undefined) || (channelProperties == "") || (channelProperties == undefined) || (channelName == "Select Channel Name")) {
        this.view.btnSaveNewChannel.setEnabled(false);
        self.view.btnSaveNewChannel.animate(
        voltmx.ui.createAnimation({
            "100": {
                "stepConfig": {
                    "timingFunction": voltmx.anim.EASE
                },
                "opacity": 0.5,
                "displayAnimationId": "",
                "duration": 0,
                "delay": 0,
                "iterationCount": ""
            }
        }), {
            "delay": 0,
            "iterationCount": 0,
            "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
            "duration": 0
        }, {
            "animationEnd": _ide_onTextChange_a5280b6251064cef9cd665f66c5687e2_Callback
        });
    } else {
        this.view.btnSaveNewChannel.setEnabled(true);
        self.view.btnSaveNewChannel.animate(
        voltmx.ui.createAnimation({
            "100": {
                "stepConfig": {
                    "timingFunction": voltmx.anim.EASE
                },
                "opacity": 1,
                "displayAnimationId": "",
                "duration": 0,
                "delay": 0,
                "iterationCount": ""
            }
        }), {
            "delay": 0,
            "iterationCount": 0,
            "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
            "duration": 0
        }, {
            "animationEnd": _ide_onTextChange_da87681b301f42cdb292e7c8d7589b25_Callback
        });
    }
}