function AS_FlexContainer_b98b3dea413e4e46b5cecc43e62747b2(eventobject) {
    var self = this;

    function INVOKE_OBJECT_SERVICE_ide_preShow_h688432e05d7403591280c87d26f8735_Callback(User) {
        self.view.segListUsers.setData(User.records);
    }
    voltmx.application.showLoadingScreen(null, "Fetching users ...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    if (User_inputparam == undefined) {
        var User_inputparam = {};
    }
    User_inputparam["serviceID"] = "UsersStorage$User$get";
    User_inputparam["options"] = {
        "access": "online",
        "CRUD_TYPE": "get"
    };
    var User_httpheaders = {};
    User_inputparam["httpheaders"] = User_httpheaders;
    var User_httpconfigs = {};
    User_inputparam["httpconfig"] = User_httpconfigs;
    UsersStorage$User$get = mfobjectsecureinvokerasync(User_inputparam, "UsersStorage", "User", INVOKE_OBJECT_SERVICE_ide_preShow_h688432e05d7403591280c87d26f8735_Callback);
}