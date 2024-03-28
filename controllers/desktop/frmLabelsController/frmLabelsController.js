/*
define({ 

  onViewCreated(){
    
    const eventManager = {};
    eventManager.subscribe('excelData', (jsonString) => {
      this.view.flxScrollLabels.removeAll();
      const excelData = JSON.parse(jsonString);
      if(excelData.length > 0){
        excelData.forEach((rowObject, index) => {
          if(index === 0){
            const rowHeader = new com.hcl.mario.Row({
              id: `row${new Date().getTime()}`
            });
            rowHeader.removeAllCells();
            Object.keys(rowObject).forEach((cellName) => {
              rowHeader.addCell(cellName);
            });
            rowHeader.doLayout = () => {
              const rowHeight = rowHeader.frame.height;
              if(rowHeight){
                rowHeader.getCells().forEach((cell) => {
                  cell.skin = 'skinHeader';
                  cell.height = `${rowHeight}dp`;
                });
              }
            };
            this.view.flxScrollLabels.add(rowHeader);
          }
          const row = new com.hcl.mario.Row({
            id: `row${new Date().getTime()}`
          });
          row.removeAllCells();
          Object.keys(rowObject).forEach((cellName) => {
            row.addCell(rowObject[cellName]);
          });
          row.doLayout = () => {
            const rowHeight = row.frame.height;
            if(rowHeight){
              row.getCells().forEach((cell) => {
                cell.skin = index % 2 === 0 ? 'skinYellow' : 'skinGreen';
                cell.height = `${rowHeight}dp`;
              });
            }
          };
          this.view.flxScrollLabels.add(row);

        });
        this.view.flxScrollLabels.forceLayout();
      }
    });

    this.view.init = () => {
      this.view.btnUploadLabels.onClick = () => {
        voltmx.io.FileSystem.browse({
          selectMultipleFiles: false,
          filter: [".xlsx"]
        }, (evt, selection) => {
          let fileReader = new FileReader();
          fileReader.readAsBinaryString(evt.target.files[0]);
          fileReader.onload = (event) => {
            this.view.bwsUpload.evaluateJavaScript(`app.importData("${btoa(event.target.result)}")`);
          };    
        });
      };
    };
  }
});
*/

/*
define({ 

  onViewCreated(){
    this.view.init = () => {
     this.view.btnDownloadLabels.onClick = () => this.exportData();
    };
  },

  exportData(){
    let numRows, numColumns;
    const currentBreakpoint = voltmx.application.getCurrentBreakpoint();
    if(currentBreakpoint === 640){
      numRows = 6;
      numColumns = 2;
    } else if(currentBreakpoint === 1024){
      numRows = 4;
      numColumns = 4; //3
    } else {
      numRows = 4;   // 3
      numColumns = 4;
    }

    const tableData = [];

    for(let i = 1; i <= numRows; i++){
      const rowData = [];
      for(let j = 1; j <= numColumns; j++){
        rowData.push(this.view[`txt${i * j}`].text);
      }
      tableData.push(rowData);
    }

    this.view.bwsDownload.evaluateJavaScript(`app.exportData('${JSON.stringify(tableData)}')`);

  }


});
*/


define({ 
  getExcel: function () {
        var config = {
            selectMultipleFiles: false,
            filter: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]
        };
    	let jsonWidget = this.view.txtAreaJSON;
        voltmx.io.FileSystem.browse(config, event => {
            alert('ciao ' + event.target.files[0].name);
            //voltmx.print("### PRINT: " + JSON.stringify(event, ' ', 2));
            const reader = new FileReader();
            reader.onload = (e) => {
                let data = e.target.result;
                let workbook = XLSX.read(data, {
                    type: "binary"
                });
                //voltmx.print("### DATA: " + data);
                //voltmx.print("### WORKBOOK: " + JSON.stringify(workbook));
                //voltmx.print(workbook);
                workbook.SheetNames.forEach(sheet => {
                    let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                    voltmx.print("### rowObject: " + rowObject);
                    gblLabelsList = rowObject;
                    voltmx.print("### gblLabels stringify: " + JSON.stringify(gblLabelsList));
                  	
                  // saving the number of labels' columns (in order to know how many pages we have to show)
                    gblLabelsList.forEach(obj => {
                        const numColumns = Object.keys(obj).length;
                        if (numColumns > gblLabelsColumns) {
                            gblLabelsColumns = numColumns;
                        }
                    });
                  
                  this.view.btnPrevious.setVisibility(true);
                  this.view.btnNext.setVisibility(true);
                  this.view.btnPrevious.setEnabled(false);
                  this.view.btnPrevious.opacity = 0.5;
                  
                  var maxPages = Math.ceil(gblLabelsColumns / 5); // this method rounds up to the nearest integer
              
                  if (gblLabelsPage === maxPages) { // only one page needed (the document only have 5 columns)
                    this.view.btnNext.setEnabled(false);
                    this.view.btnNext.opacity = 0.5;
                  }
                  
                    //voltmx.print(JSON.stringify(rowObject, ' ', 4));
                  	//return rowObject;
                  //jsonWidget.text = JSON.stringify(rowObject, ' ',4);
                  //voltmx.print("### jsonWidget.text: " + jsonWidget.text);
                  
                  // setting the first 5 columns to display
                  var firstKeys = Object.keys(gblLabelsList[0]).slice(0, 5);
                  //voltmx.print("### firstKey: " + firstKeys);
                  
                  this.view.segLabels.widgetDataMap = {lb1: firstKeys[0],lb2: firstKeys[1],lb3: firstKeys[2],lb4: firstKeys[3], lb5: firstKeys[4]};
				  
                  var showLabels = parseInt(this.view.lbShowEntries.selectedKeyValue[1], 10);  // 10 is for the decimal
                  var data = gblLabelsList.slice(0, ++showLabels); //++ because the first row is used for the header
                  
                  this.view.segLabels.setData(data);           
                });
            };
            reader.readAsBinaryString(event.target.files[0]);
        });  
	},
  
  xlsxVersion: function() {
    //voltmx.print("### XLSX.version: " + XLSX.version);
    
    return; //XLSX.version;
  }
});

