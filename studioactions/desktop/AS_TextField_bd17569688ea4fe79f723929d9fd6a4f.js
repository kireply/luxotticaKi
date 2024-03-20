function AS_TextField_bd17569688ea4fe79f723929d9fd6a4f(eventobject, changedtext) {
    var self = this;

    function _ide_onTextChange_dad21cb919b845459a3076db405bfe98_Callback() {}
    function _ide_onTextChange_ea753c318e8d4e18afc33011827f76d9_Callback() {}
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
            "animationEnd": _ide_onTextChange_ea753c318e8d4e18afc33011827f76d9_Callback
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
            "animationEnd": _ide_onTextChange_dad21cb919b845459a3076db405bfe98_Callback
        });
    }
}