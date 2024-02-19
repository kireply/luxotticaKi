function AS_TextField_c7ff8326a1cb41108b41add5f5f7f9fd(eventobject, changedtext) {
    var self = this;

    function _ide_onTextChange_b40e27eeedd64a629d789b702a245884_Callback() {}
    function _ide_onTextChange_j72aa4deee6e4183b997664a05a89dc1_Callback() {}
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
        undefined.animate(
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
            "animationEnd": _ide_onTextChange_j72aa4deee6e4183b997664a05a89dc1_Callback
        });
    } else {
        this.view.btnSaveNewChannel.setEnabled(true);
        undefined.animate(
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
            "animationEnd": _ide_onTextChange_b40e27eeedd64a629d789b702a245884_Callback
        });
    }
}