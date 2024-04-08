function onHoverHandlerForTplRowSegMenu(eventobject, context) {
    var self = this;
    voltmx.print("### dentro a HOVER Segment ");
    self.view.flxtplRowSegMenu.backgroundColor = "808080";
    self.view.flxHover.setVisibility(true);
}