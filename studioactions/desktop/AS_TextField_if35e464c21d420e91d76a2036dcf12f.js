function AS_TextField_if35e464c21d420e91d76a2036dcf12f(eventobject, changedtext) {
    var self = this;

    function _ide_onTextChange_g93fb2a4382e45439ab9d0dbc5bafbf5_Callback() {}
    function _ide_onTextChange_hf1fa427ad8842e887458dded6aa5beb_Callback() {}
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
        undefined.animate(
        voltmx.ui.createAnimation({
            "100": {
                "stepConfig": {
                    "timingFunction": voltmx.anim.EASE
                },
                "opacity": 0.5,
                "displayAnimationId": "",
                "duration": 0.25,
                "delay": 0,
                "iterationCount": "1"
            }
        }), {
            "delay": 0,
            "iterationCount": 0,
            "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
            "duration": 0
        }, {
            "animationEnd": _ide_onTextChange_hf1fa427ad8842e887458dded6aa5beb_Callback
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
                "duration": 0.25,
                "delay": 0,
                "iterationCount": "1"
            }
        }), {
            "delay": 0,
            "iterationCount": 0,
            "fillMode": voltmx.anim.FILL_MODE_FORWARDS,
            "duration": 0
        }, {
            "animationEnd": _ide_onTextChange_g93fb2a4382e45439ab9d0dbc5bafbf5_Callback
        });
    }
}