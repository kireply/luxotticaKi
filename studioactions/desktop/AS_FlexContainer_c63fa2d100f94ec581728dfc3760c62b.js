function AS_FlexContainer_c63fa2d100f94ec581728dfc3760c62b(eventobject, context) {
    var self = this;
    if (context.eventType !== "leave") {
        this.view.flxCreateNewStep.backgroundColor = "000000";
        this.view.imgNewStep.src = "/add_circle_icon_modified.png";
        this.view.lblStepCreationBlack.setVisibility(false);
        this.view.lblStepCreationWhite.setVisibility(true);
        //this.view.lblStepCreation.backgroundColor = "ffffff";
    } else {
        this.view.flxCreateNewStep.backgroundColor = "ffffff";
        this.view.imgNewStep.src = "/plus.png";
        this.view.lblStepCreationWhite.setVisibility(false);
        this.view.lblStepCreationBlack.setVisibility(true);
        //this.view.lblStepCreation.backgroundColor = "000000";
    }
}