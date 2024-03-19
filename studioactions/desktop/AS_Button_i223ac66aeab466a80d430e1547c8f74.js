function AS_Button_i223ac66aeab466a80d430e1547c8f74(eventobject) {
    var self = this;

    function _ide_onClick_ee082938949c4d2d9593f3db4f315be0_Callback() {}
    self.view.btnBack.animate(
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
        "animationEnd": _ide_onClick_ee082938949c4d2d9593f3db4f315be0_Callback
    });
    voltmx.application.showLoadingScreen(null, "Back to channels...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    var ntf = new voltmx.mvc.Navigation("frmChannels");
    ntf.navigate();
    voltmx.application.dismissLoadingScreen();
}