function AS_FlexContainer_g350cb12bee2461fa0bde21fe47e5229(eventobject, context) {
    var self = this;
    if (context.eventType !== "leave") {
        this.view.imgLogout.setVisibility(false);
        this.view.imgLogout2.setVisibility(true);
        this.view.btnLogout.skin = "CopydefBtnNormal0b046094e85d745";
    } else {
        this.view.imgLogout2.setVisibility(false);
        this.view.imgLogout.setVisibility(true);
        this.view.btnLogout.skin = "CopydefBtnNormal0fc5b48bdbdda49";
    }
}