function AS_Button_cf7fbd452c684861a62273655a0951e3(eventobject) {
    var self = this;
    voltmx.application.showLoadingScreen(null, "Loading page...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    var ntf = new voltmx.mvc.Navigation("frmFlowCreation");
    ntf.navigate();
    voltmx.application.dismissLoadingScreen();
}