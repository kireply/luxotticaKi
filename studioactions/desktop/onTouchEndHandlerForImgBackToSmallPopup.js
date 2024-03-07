function onTouchEndHandlerForImgBackToSmallPopup(eventobject, x, y) {
    var self = this;
    this.view.flxPopupDuplicateFlowLarge.setVisibility(false);
    this.view.flxPopupDuplicateFlowSmall.setVisibility(true);
}