function AS_Button_c98caede5dc44213a6b2f80c2794e191(eventobject) {
    var self = this;
    voltmx.application.showLoadingScreen(null, "Back to channels...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    var ntf = new voltmx.mvc.Navigation("frmFlows");
    ntf.navigate();
    voltmx.application.dismissLoadingScreen();
}