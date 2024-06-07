function onPostShowHandlerForFrmLabelCopy(eventobject) {
    var self = this;
    this.view.channelTemplatewithContract.channelLogo = gblChannelLogo;
    this.view.channelTemplatewithContract.channelInfo = gblChannelName + " - #" + gblChannelId;
}