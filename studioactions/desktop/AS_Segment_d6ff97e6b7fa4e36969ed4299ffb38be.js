function AS_Segment_d6ff97e6b7fa4e36969ed4299ffb38be(eventobject, sectionNumber, rowNumber) {
    var self = this;
    if (gblInfoIcon == "true") {
        // SHOW POPUP OF CHANNEL'S INFO
        voltmx.print("### inizio metodo row click generico");
        var channel = this.view.segChannels.selectedRowItems[0];
        voltmx.print("### selected row - channel: " + JSON.stringify(channel));
        gblChannelId = channel.lblChannelId.text;
        gblChannelName = channel.lblChannelName.text;
        gblChannelLogo = channel.imgLogo.src;
        gblChannelProperties = channel.lblChannelProperties.text;
        voltmx.print("### var globale id : " + gblChannelId);
        voltmx.print("### var globale nome : " + gblChannelName);
        voltmx.print("### var globale logo : " + gblChannelLogo);
        voltmx.print("### var globale propietà : " + gblChannelProperties);
        voltmx.print("### fine metodo row click generico");
        self.view.flxPopupChannelInfo.setVisibility(true);
        this.view.txtChannelID.setEnabled(false);
        this.view.lbChannelName.setEnabled(false);
        this.view.txtChannelLogo.setEnabled(false);
        this.view.txtChannelProperties.setEnabled(false);
        this.view.flxPopupChannelInfo.txtChannelID.text = gblChannelId;
        this.view.flxPopupChannelInfo.txtChannelLogo.text = gblChannelLogo;
        this.view.flxPopupChannelInfo.txtChannelProperties.text = gblChannelProperties;
        this.view.flxPopupChannelInfo.lbChannelName.masterData = [
            ["lb1", gblChannelName]
        ];
        this.view.flxPopupChannelInfo.lbChannelName.selectedKey = "lb1";
        voltmx.print("### finito con l'autocompletamento");
    } else {
        // NAVIGATE TO CHANNEL'S FLOWS
        voltmx.print("### inizio metodo row click generico");
        var channel = this.view.segChannels.selectedRowItems[0];
        voltmx.print("### selected row - channel: " + JSON.stringify(channel));
        gblChannelId = channel.lblChannelId.text;
        gblChannelName = channel.lblChannelName.text;
        gblChannelLogo = channel.imgLogo.src;
        gblChannelProperties = channel.lblChannelProperties.text;
        voltmx.print("### var globale id : " + gblChannelId);
        voltmx.print("### var globale nome : " + gblChannelName);
        voltmx.print("### var globale logo : " + gblChannelLogo);
        voltmx.print("### var globale propietà : " + gblChannelProperties);
        voltmx.print("### fine metodo row click generico");
        voltmx.print("### valore gblIconInfo: " + gblInfoIcon + " FINISH");
        var ntf = new voltmx.mvc.Navigation("frmFlows");
        ntf.navigate();
    }
}