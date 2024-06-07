function AS_TextField_b0ecc6a0082d4a7f93049fdb2a1f8af1(eventobject, changedtext) {
    var self = this;
    var labelSearched = this.view.txtSearchLabel.text;
    if (labelSearched !== "") {
        voltmx.print("### dentro IF filtro label");
        // filtering by id or by labels in each key-value
        var filteredList = gblLabelsList.filter(elemento => {
            return Object.values(elemento).some(valore => valore.toLowerCase().includes(labelSearched.toLowerCase()));
        });
        voltmx.print("### filteredList stringify: " + JSON.stringify(filteredList));
        //var filteredList = gblLabelsList.filter(label => label.id.toLowerCase().includes(labelSearched.toLowerCase()));
        this.view.segLabels.setData(filteredList);
    } else { // no filter, show entire list
        this.view.segLabels.setData(gblLabelsList);
    }
}