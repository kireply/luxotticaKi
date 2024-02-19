function AS_TextField_f1628a3fffc147b9ab0f8e691acffcb3(eventobject, changedtext) {
    var self = this;

    function _ide_onTextChange_ce2672bc0d0046fcac66965e15b0ee03_Callback() {}
    function _ide_onTextChange_bc96daea0aea4cbb94946fc88b1fea28_Callback() {}
    var channelID = "";
    var channelName = "";
    var channelLogo = "";
    var channelProperties = "";
    channelID = self.view.txtChannelID.text;
    channelLogo = self.view.txtChannelLogo.text;
    channelProperties = self.view.txtChannelProperties.text;
    channelName = self.view.lbChannelName.selectedKeyValues[0][1];
    if ((channelID == "") || (channelName == "Select Channel Name") || (channelID == undefined) || (channelName == "") || (channelName == undefined) || (channelProperties == "") || (channelProperties == undefined)) {
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
            "animationEnd": _ide_onTextChange_bc96daea0aea4cbb94946fc88b1fea28_Callback
        });
    } else {
        this.view.btnSaveNewChannel.setEnabled(true);
        self.view.txtChannelID.animate(
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
            "animationEnd": _ide_onTextChange_ce2672bc0d0046fcac66965e15b0ee03_Callback
        });
    }
}