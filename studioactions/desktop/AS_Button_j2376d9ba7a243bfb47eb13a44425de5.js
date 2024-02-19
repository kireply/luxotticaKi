function AS_Button_j2376d9ba7a243bfb47eb13a44425de5(eventobject) {
    var self = this;

    function INVOKE_IDENTITY_SERVICE_ide_onClick_i9d19279bd4c407498dec7336ef67a2c_Success(response) {
        voltmx.application.dismissLoadingScreen();
        var ntf = new voltmx.mvc.Navigation("frmDashboard");
        ntf.navigate();
    }
    function INVOKE_IDENTITY_SERVICE_ide_onClick_i9d19279bd4c407498dec7336ef67a2c_Failure(error) {
        voltmx.application.dismissLoadingScreen();

        function SHOW_ALERT_ide_onClick_i263a4c96ff44074931d5f1d6e4a4616_Callback() {
            SHOW_ALERT_ide_onClick_i263a4c96ff44074931d5f1d6e4a4616_True();
        }
        voltmx.ui.Alert({
            "alertType": constants.ALERT_TYPE_ERROR,
            "alertTitle": "Login",
            "yesLabel": "Ok",
            "message": "Invalid Credentials.",
            "alertHandler": SHOW_ALERT_ide_onClick_i263a4c96ff44074931d5f1d6e4a4616_Callback
        }, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        });
    }
    function SHOW_ALERT_ide_onClick_i263a4c96ff44074931d5f1d6e4a4616_True() {}
    voltmx.application.showLoadingScreen(null, "Log in ...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    if (login_inputparam == undefined) {
        var login_inputparam = {};
    }
    login_inputparam["serviceID"] = "LuxotticaKiIdentity$login";
    login_inputparam["operation"] = "login";
    login_inputparam["userid"] = self.view.txtEmail.text;
    login_inputparam["password"] = self.view.txtPassword.text;
    LuxotticaKiIdentity$login = mfidentityserviceinvoker("LuxotticaKiIdentity", login_inputparam, INVOKE_IDENTITY_SERVICE_ide_onClick_i9d19279bd4c407498dec7336ef67a2c_Success, INVOKE_IDENTITY_SERVICE_ide_onClick_i9d19279bd4c407498dec7336ef67a2c_Failure);
}