function onClickHandlerForButtonBack(eventobject) {
    var self = this;

    function STYLE_ACTION_ee80d85d549343f1971da7a02cd1c03c_Callback() {}
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
        "animationEnd": STYLE_ACTION_ee80d85d549343f1971da7a02cd1c03c_Callback
    });
    voltmx.application.showLoadingScreen(null, "Back to channels...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    var ntf = new voltmx.mvc.Navigation("frmChannels");
    ntf.navigate();
    voltmx.application.dismissLoadingScreen();
}