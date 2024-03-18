function AS_TextField_cbda65fe769a45f5a8b5a795663b57eb(eventobject, changedtext) {
    var self = this;
    //backup to original list every time the selection changes
    //self.view.segFlows.setData(gblFlowsList);
    var filteredByChannel = gblFlowsList.filter(flow => flow.channel_id === gblChannelId);
    // Retrieving all filters
    var nameSelected = this.view.txtSearchFlowName.text;
    var categorySelected = this.view.lbCategory.selectedKeyValue[1];
    var statusSelected = this.view.lbStatus.selectedKeyValue[1];
    var environmentSelected = this.view.lbEnvironment.selectedKeyValue[1];
    //voltmx.print("### Category: " + categorySelected);
    // Apply all filters one by one on cascade
    if (nameSelected !== "") { // name selected, unique
        voltmx.print("### dentro IF filtri");
        var filteredByName = filteredByChannel.filter(flow => flow.id.toLowerCase().includes(nameSelected.toLowerCase()));
        self.view.segFlows.setData(filteredByName);
        this.view.lbCategory.selectedKey = "lb1";
        this.view.lbStatus.selectedKey = "lb1";
        this.view.lbEnvironment.selectedKey = "lb1";
        this.view.lbCategory.setEnabled(false);
        this.view.lbStatus.setEnabled(false);
        this.view.lbEnvironment.setEnabled(false);
    } else { // name not selected, sum up all the other filters if selected
        this.view.lbCategory.setEnabled(true);
        this.view.lbStatus.setEnabled(true);
        this.view.lbEnvironment.setEnabled(true);
        voltmx.print("### dentro ELSE filtri");
        var filteredByCategory = filteredByChannel;
        if (categorySelected !== "Category: All") {
            filteredByCategory = filteredByChannel.filter(flow => flow.category === categorySelected);
        }
        var filteredByStatus = filteredByCategory;
        if (statusSelected !== "Status: All") {
            filteredByStatus = filteredByCategory.filter(flow => flow.status === statusSelected);
        }
        var filteredByEnvironment = filteredByStatus;
        if (environmentSelected !== "Environment: All") {
            filteredByEnvironment = filteredByStatus.filter(flow => flow.environment === environmentSelected);
        }
        self.view.segFlows.setData(filteredByEnvironment);
    }
    //self.view.segFlows.widgetDataMap = {lblStatus: "status", lblFlowName: "id", lblDescription: "description", lblCategory: "category", lblDefault: "default_flag", lblEnvironment: "environment", lblAuthor: "author", lblLastModified: "last_modified"};
    //self.view.segFlows.setData(flowsFound);
    //voltmx.print("### PROVA: " + self.view.segFlows.data[1].description);
}