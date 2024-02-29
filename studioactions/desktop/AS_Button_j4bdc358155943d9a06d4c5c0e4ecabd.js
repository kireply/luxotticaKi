function AS_Button_j4bdc358155943d9a06d4c5c0e4ecabd(eventobject) {
    var self = this;
    voltmx.application.showLoadingScreen(null, "Logging out...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    var ntf = new voltmx.mvc.Navigation("frmLogin");
    ntf.navigate();
    voltmx.application.dismissLoadingScreen();
}