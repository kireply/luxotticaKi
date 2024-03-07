function AS_TextField_e4a6a84e07bb44c697a01342e6ce1366(eventobject, changedtext) {
    var self = this;

    function _ide_onTextChange_ifcb8f3c1d67445f90c92855f6acafc4_Callback() {}
    function _ide_onTextChange_c6b70734eeb845928e602050c92fd4e8_Callback() {}
    var channelProperties = "";
    var channelName = "";
    var channelLogo = "";
    var channelID = "";
    channelID = self.view.txtChannelID.text;
    channelLogo = self.view.txtChannelLogo.text;
    channelProperties = self.view.txtChannelProperties.text;
    channelName = self.view.lbChannelName.selectedKeyValues[0][1];
    if ((channelID == "") || (channelID == undefined) || (channelName == "") || (channelName == undefined) || (channelName == "Select Channel Name") || (channelProperties == "") || (channelProperties == undefined)) {
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
            "animationEnd": _ide_onTextChange_c6b70734eeb845928e602050c92fd4e8_Callback
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
            "animationEnd": _ide_onTextChange_ifcb8f3c1d67445f90c92855f6acafc4_Callback
        });
    }
}