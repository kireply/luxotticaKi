function AS_Button_d9e49462f91e4405b3ec0a7bfdac5579(eventobject) {
    var self = this;
    voltmx.application.showLoadingScreen(null, "Back to channels...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    var ntf = new voltmx.mvc.Navigation("frmChannels");
    ntf.navigate();
    voltmx.application.dismissLoadingScreen();
}