function AS_FlexContainer_i985e3dae0334c65bf98d29787ea6ba4(eventobject, context) {
    var self = this;
    if (context.eventType !== "leave") {
        this.view.imgLogout.setVisibility(false);
        this.view.imgLogout1.setVisibility(true);
        this.view.btnLogout.skin = "CopydefBtnNormal0b046094e85d745";
    } else {
        this.view.imgLogout1.setVisibility(false);
        this.view.imgLogout.setVisibility(true);
        this.view.btnLogout.skin = "CopydefBtnNormal0fc5b48bdbdda49";
    }
}