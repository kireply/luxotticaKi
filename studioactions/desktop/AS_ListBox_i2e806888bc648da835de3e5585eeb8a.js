function AS_ListBox_i2e806888bc648da835de3e5585eeb8a(eventobject) {
    var self = this;

    function _ide_onSelection_d9e98140d9414acb99b06ac095039c9b_Callback() {}
    function _ide_onSelection_bc11b2c4654c4d28823d2405a6ad8505_Callback() {}
    var channelID = "";
    var channelName = "";
    var channelLogo = "";
    var channelProperties = "";
    channelID = self.view.txtChannelID.text;
    channelLogo = self.view.txtChannelLogo.text;
    channelName = self.view.lbChannelName.selectedKeyValues[0][1];
    channelProperties = self.view.txtChannelProperties.text;
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
            "animationEnd": _ide_onSelection_bc11b2c4654c4d28823d2405a6ad8505_Callback
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
            "animationEnd": _ide_onSelection_d9e98140d9414acb99b06ac095039c9b_Callback
        });
    }
}