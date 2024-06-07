function AS_Button_h0425d41f96043ae9e7fdc1f48fce3ea(eventobject) {
    var self = this;
    /* 
When clicking on "Next", the rows of the segment must display the next 5 rows in the gblLabesl list
*/
    var maxPages = Math.ceil(gblLabelsColumns / 5); // this method rounds up to the nearest integer
    voltmx.print("col: " + gblLabelsColumns);
    voltmx.print("maxP: " + maxPages);
    if (gblLabelsPage < maxPages) {
        // Copying the list but removing the "id" key
        var list = gblLabelsList.map(function(obj) {
            var newObj = Object.assign({}, obj);
            delete newObj.id;
            return newObj;
        });
        this.view.btnPrevious.setEnabled(true);
        this.view.btnPrevious.opacity = 1;
        ++gblLabelsPage; // moving to new page
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
        this.view.btnPrevious.setEnabled(true);
        this.view.btnPrevious.opacity = 1;
        if (gblLabelsPage === maxPages) { // last page reached
            this.view.btnNext.setEnabled(false);
            this.view.btnNext.opacity = 0.5;
        }
    }
}