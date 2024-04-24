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
  
  // IMPORT function
  getExcel: function () {
        var config = {
            selectMultipleFiles: false,
            filter: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]
        };
    	let jsonWidget = this.view.txtAreaJSON;
        voltmx.io.FileSystem.browse(config, event => {
            //alert('file caricato: ' + event.target.files[0].name);
            //voltmx.print("### PRINT: " + JSON.stringify(event, ' ', 2));
            const reader = new FileReader();
            reader.onload = (e) => {
              let data = e.target.result;
              let workbook = XLSX.read(data, {
                type: "binary"
              });
              //voltmx.print("### DATA: " + data);
              //voltmx.print("### WORKBOOK: " + JSON.stringify(workbook));
              voltmx.print(workbook);
              workbook.SheetNames.forEach(sheet => {
                let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
                voltmx.print("### rowObject: " + rowObject);
                gblLabelsList = rowObject;

                // New empty object for the header row
                let headerRow = {}; 
                // Saving header keys and their own values
                Object.keys(gblLabelsList[0]).forEach(function(key) {
                  headerRow[key] = key;
                });
                gblLabelsList.unshift(headerRow);
                voltmx.print("### gblLabels stringify: " + JSON.stringify(gblLabelsList));


                // Copying the list but removing the "id" key
                list = gblLabelsList.map(function(obj) {
                  // Crea una copia dell'oggetto corrente
                  var newObj = Object.assign({}, obj);
                  // Rimuovi la chiave "id" dall'oggetto corrente
                  delete newObj.id;
                  return newObj;
                });

                gblLabelsColumns = 0;
                gblLabelsPage = 1;
                gblLabelsFileUploaded = true; 
                // saving the number of labels' columns (in order to know how many pages we have to show)
                list.forEach(obj => {
                  const numColumns = Object.keys(obj).length;
                  if (numColumns > gblLabelsColumns) {
                    gblLabelsColumns = numColumns;
                  }
                });

                this.view.btnPrevious.setEnabled(false);
                this.view.btnPrevious.opacity = 0.5;

                var maxPages = Math.ceil(gblLabelsColumns / 5); // this method rounds up to the nearest integer
                voltmx.print("### max pages = " + maxPages);
                voltmx.print("### max pages full = " + (gblLabelsColumns / 5) );
                voltmx.print("### gblLabelsColumns = " + gblLabelsColumns);
                voltmx.print("### gblLabelsPage = " + gblLabelsPage);

                if (gblLabelsPage === maxPages) { // only one page needed (the document only have 5 columns)
                  this.view.btnNext.setEnabled(false);
                  this.view.btnNext.opacity = 0.5;
                }

                //voltmx.print(JSON.stringify(rowObject, ' ', 4));
                //return rowObject;
                //jsonWidget.text = JSON.stringify(rowObject, ' ',4);
                //voltmx.print("### jsonWidget.text: " + jsonWidget.text);

                // setting the first 5 columns to display
                var firstKeys = Object.keys(list[0]).slice(0, 5);
                //voltmx.print("### firstKey: " + firstKeys);

                //gblLabelsList2.splice(1, 0, headerRow); // Duplicating the Header so that it don't get lost in the mapping
                this.view.segLabels.widgetDataMap = {lb1: firstKeys[0],lb2: firstKeys[1],lb3: firstKeys[2],lb4: firstKeys[3], lb5: firstKeys[4]};

                var showLabels = parseInt(this.view.lbShowEntries.selectedKeyValue[1], 10);  // 10 is for the decimal
                var data = list.slice(0, ++showLabels); //++ because the first row is used for the header

                this.view.segLabels.setData(data);
                voltmx.print("### gblLabels DOPO UPLOAD: " + JSON.stringify(gblLabelsList));
                voltmx.print("### list DOPO UPLOAD: " + JSON.stringify(list));
                });
            };
            reader.readAsBinaryString(event.target.files[0]);
        });  
	},
  
  
  
  xlsxVersion: function() {
    //voltmx.print("### XLSX.version: " + XLSX.version);
    
    return; //XLSX.version;
  }, 
  
  
  // EXPORT function
  exportData(){
    //let numRows, numColumns;
    //var tableData = [];
    //let k = 1;
    //let colHeaders = ['Col1', 'Col2', 'Col3', 'Col4', 'Col5', 'Col6', 'Col7', 'Col8', 'Col9', 'Col10'];
    //
    //	Calculating the exact number of rows and of columns according to the Breakpoint of the flex Container containg the cells
    //
  /*  const currentBreakpoint = voltmx.application.getCurrentBreakpoint();
    if (currentBreakpoint === 640){
      numRows = 6;
      numColumns = 2;
    } else if(currentBreakpoint === 1024){
      numRows = 4;
      numColumns = 3;
    } else {
      numRows = 3;
      numColumns = 4;
    }
    //
    //	Parsing the list of cells
	//
    for (let i = 0; i < numRows; i++){
      const rowData = {};
      //
      //	We build an "object" whose fields are named like the "Column Headers" and whose value is the content of the relevant cell
      //
      for (let j = 0; j < numColumns; j++){
        rowData[colHeaders[j]] = this.view[`txt${k}`].text;
        k++;
      }
      //
      //	we push the  object representing the "row" onto the array representing the "worksheet"
      //
      tableData.push(rowData);
    }  */
    
    //voltmx.print("### gblLabelsList: " + JSON.stringify(gblLabelsList, ' ', 4));
    
    //	Creating the Workbook and filling it
    var worksheet = XLSX.utils.json_to_sheet(gblLabelsList.slice(1));  // adding .slice(1) to remove the duplicate header that this export API would create
    var workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, this.view.txtWorksheetName.text);
    
    voltmx.print("### worksheet: " + JSON.stringify(worksheet) );
    voltmx.print("### workbook: " + JSON.stringify(workbook) );
    
    //	Creating the file
    XLSX.writeFile(workbook, this.view.txtFileName.text, { compression: true });
  } 
  
  
});

