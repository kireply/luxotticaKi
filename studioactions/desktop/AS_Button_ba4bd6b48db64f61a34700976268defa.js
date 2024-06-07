function AS_Button_ba4bd6b48db64f61a34700976268defa(eventobject) {
    var self = this;
    /* 
When clicking on "Previous", the rows of the segment must display the previous 5 rows in the gblLabesl list
*/
    // Copying the list but removing the "id" key
    var list = gblLabelsList.map(function(obj) {
        var newObj = Object.assign({}, obj);
        delete newObj.id;
        return newObj;
    });
    if (gblLabelsPage > 2) {
        this.view.btnNext.setEnabled(true);
        this.view.btnNext.opacity = 1;
        --gblLabelsPage; // moving to new page
        var x = gblLabelsPage - 1;
        var firstKeys = Object.keys(list[0]).slice((5 * x), (5 * gblLabelsPage));
        this.view.segLabels.widgetDataMap = {
            lb1: firstKeys[0],
            lb2: firstKeys[1],
            lb3: firstKeys[2],
            lb4: firstKeys[3],
            lb5: firstKeys[4]
        };
        // checking for the selected number of labels to show
        var showLabels = parseInt(this.view.lbShowEntries.selectedKeyValue[1], 10); // 10 is for the decimal
        var data = list.slice(0, ++showLabels); //++ because the first row is used for the header
        this.view.segLabels.setData(data);
        if (gblLabelsPage === 1) {
            this.view.btnPrevious.setEnabled(false);
            this.view.btnPrevious.opacity = 0.5;
        }
    } else {
        --gblLabelsPage; // moving to first page (page 1)
        var firstKeys = Object.keys(list[0]).slice(0, 5);
        this.view.segLabels.widgetDataMap = {
            lb1: firstKeys[0],
            lb2: firstKeys[1],
            lb3: firstKeys[2],
            lb4: firstKeys[3],
            lb5: firstKeys[4]
        };
        // checking for the selected number of labels to show
        var showLabels = parseInt(this.view.lbShowEntries.selectedKeyValue[1], 10); // 10 is for the decimal
        var data = list.slice(0, ++showLabels); //++ because the first row is used for the header
        this.view.segLabels.setData(data);
        this.view.btnNext.setEnabled(true);
        this.view.btnNext.opacity = 1;
        this.view.btnPrevious.setEnabled(false);
        this.view.btnPrevious.opacity = 0.5;
    }
}