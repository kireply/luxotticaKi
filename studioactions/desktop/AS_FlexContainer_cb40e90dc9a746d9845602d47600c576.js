function AS_FlexContainer_cb40e90dc9a746d9845602d47600c576(eventobject) {
    var self = this;
    this.view.flxBlur.setVisibility(true);
    this.view.flxPopupNewStep.setVisibility(true);
    this.view.btnProceed.setEnabled(false);
    this.view.btnProceed.opacity = 0.5;
}