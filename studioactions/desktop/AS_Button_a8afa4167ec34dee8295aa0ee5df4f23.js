function AS_Button_a8afa4167ec34dee8295aa0ee5df4f23(eventobject) {
    var self = this;
    voltmx.application.showLoadingScreen(null, "Logging out...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    var ntf = new voltmx.mvc.Navigation("frmLogin");
    ntf.navigate();
    voltmx.application.dismissLoadingScreen();
}