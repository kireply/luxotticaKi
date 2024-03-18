function AS_Segment_f131ad30e5c84ce7bfdcd46ba16d798a(eventobject, sectionNumber, rowNumber) {
    var self = this;
    var flow = this.view.segFlows.selectedRowItems[0];
    voltmx.print("### FLOW JSON: " + JSON.stringify(flow));
    gblFlowId = parseInt(flow.id.match(/\d+/)[0]); //extracting only the id number
    gblFlowCategory = flow.category;
    gblFlowName = flow.id; // full Flow name Ex. RB_EYE_00001
    gblFlowStatus = flow.status;
    voltmx.print("### Flow Id: " + gblFlowId);
    voltmx.print("### Flow Name: " + gblFlowName);
    if (gblDuplicateIcon) {
        // Titles
        this.view.lblDuplicateFlow.text = "Duplicate Flow - " + gblFlowName;
        this.view.lblDuplicateFlow2.text = "Duplicate Flow - " + gblFlowName;
        // Channel
        this.view.lbSelectChannel.masterData = [
            ["lb1", "Select the channel in which duplicate the flow"],
            ["lb2", gblChannelName]
        ];
        this.view.lbSelectChannel.selectedKey = "lb1";
        this.view.flxPopupDuplicateFlowLarge.flxContainerFlowDuplication.flxDuplicationFlow.txtFlowDescription.text = flow.description;
        this.view.flxPopupDuplicateFlowLarge.flxContainerFlowDuplication.flxDuplicationFlow.swIsDefaultFlow.selectedIndex = (flow.default_flag === "true" ? 0 : 1);
        this.view.flxPopupDuplicateFlowLarge.flxContainerFlowDuplication.flxDuplicationFlow.swIsSupernova.selectedIndex = (flow.supernova === "true" ? 0 : 1);
        voltmx.print("### Flow description: " + flow.description);
        this.view.flxBlur.setVisibility(true);
        this.view.flxPopupDuplicateFlowSmall.setVisibility(true);
    }
    if (gblEditIcon) {
        // Title
        this.view.lblEditFlow.text = "Edit Flow - " + gblFlowName;
        // Channel
        this.view.lbChannelEdit.masterData = [
            ["lb1", gblChannelName]
        ];
        this.view.lbChannelEdit.selectedKey = "lb1";
        this.view.lbChannelEdit.setEnabled(false);
        this.view.lbChannelEdit.opacity = 0.5;
        this.view.lblChannelEdit.opacity = 0.5;
        // Flow name
        this.view.txtFlowNameEdit.text = flow.id; // !! POTREBBE SERVIRE PATH INTERO!!!
        this.view.txtFlowNameEdit.setEnabled(false);
        this.view.txtFlowNameEdit.opacity = 0.5;
        this.view.lblFlowNameEdit.opacity = 0.5;
        // Flow description
        this.view.txtFlowDescription.text = flow.description; // !! POTREBBE SERVIRE PATH INTERO!!!
        // Flow category
        this.view.lbCategoryEdit.masterData = [
            ["lb1", flow.category]
        ];
        this.view.lbCategoryEdit.selectedKey = "lb1";
        this.view.lbCategoryEdit.setEnabled(false);
        this.view.lbCategoryEdit.opacity = 0.5;
        this.view.lblCategoryEdit.opacity = 0.5;
        // Flow environment
        //this.view.flxContainerFlowEdit.flxEditFlow.lbCategoryEdit;
        //isDefault
        this.view.swIsDefaultFlowEdit.selectedIndex = (flow.default_flag === "true" ? 0 : 1);
        //isSupernova
        this.view.swIsSupernovaEdit.selectedIndex = (flow.supernova === "true" ? 0 : 1);
        this.view.flxBlur.setVisibility(true);
        this.view.flxPopupEditFlow.setVisibility(true);
    }
}