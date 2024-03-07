function AS_Form_eca71cff7074467abe17e2c659747eff(eventobject) {
    var self = this;

    function INVOKE_ASYNC_SERVICE_ide_postShow_cc924e82c4e2477eac048e571c0738a7_Callback(status, FLOW_get) {
        voltmx.application.dismissLoadingScreen();
        if ((FLOW_get !== null) && (FLOW_get.opstatus === 0)) {
            voltmx.print("### sono nell'if indentato");
            var tempCollection7916 = [];
            var tempData7067 = FLOW_get.FLOW;
            for (var each6039 in tempData7067) {
                tempCollection7916.push({
                    "lblStatus": {
                        "text": tempData7067[each6039]["status"]
                    },
                    "lblFlowName": {
                        "text": voltmx.visualizer.toString(tempData7067[each6039]["id"])
                    },
                    "lblDescription": {
                        "text": tempData7067[each6039]["description"]
                    },
                    "lblCategory": {
                        "text": tempData7067[each6039]["category"]
                    },
                    "lblDefault": {
                        "text": voltmx.visualizer.toString(tempData7067[each6039]["default_flag"])
                    },
                    "lblEnvironment": {
                        "text": tempData7067[each6039]["environment"]
                    },
                    "lblAuthor": {
                        "text": tempData7067[each6039]["author"]
                    },
                    "lblLastModified": {
                        "text": voltmx.visualizer.toString(tempData7067[each6039]["last_modified"])
                    },
                });
            }
            self.view.segFlows.setData(tempCollection7916);
            gblFlowsList = FLOW_get.FLOW;
            //voltmx.print("### stampa segFlow: " + this.view.segFlows);
            //voltmx.print("### stampa segFlow[0][0] " + this.view.segFlows[0][0]);
            // Ottieni il riferimento al widget di segmento
            //var segmentWidget = this.view.segFlows; // sostituisci con l'id del tuo segment widget
            // Ottieni i dati del segmento
            //var data1 = segmentWidget.data;
            //voltmx.print("PROVA: " + this.view.segFlows.data[1].description);
            voltmx.print("### STAMPA DI gblFlowsList: " + JSON.stringify(gblFlowsList));
            // Retrieving selected Channel's flows
            var flowsFound = gblFlowsList.filter(flow => flow.channel_id === gblChannelId);
            voltmx.print("### TROVATO flowsFound: " + JSON.stringify(flowsFound));
            self.view.segFlows.widgetDataMap = {
                lblStatus: "status",
                lblFlowName: "id",
                lblDescription: "description",
                lblCategory: "category",
                lblDefault: "default_flag",
                lblEnvironment: "environment",
                lblAuthor: "author",
                lblLastModified: "last_modified"
            };
            self.view.segFlows.setData(flowsFound);
            voltmx.print("### PROVA: " + self.view.segFlows.data[1].description);
            voltmx.print("### PROVA2: " + JSON.stringify(self.view.segFlows.data));
            // Mapping the labels of the Segment template with the data to pass.
            //self.view.segTemp.widgetDataMap = {lblStatus: "status", lblFlowName: "id", lblDescription: "description", lblCategory: "category", lblDefault: "default_flag", lblEnvironment: "environment", lblAuthor: "author", lblLastModified: "last_modified"};
            //var gblFlowsList2 = [{"a_b_test":"false","environment":"Dev","supernova":"false","author":"Author","steps_layout":"steps","description":"First description","id":"1","category":"Eyeglasses","last_modified":"2024-02-23","default_flag":"false","channel_id":"RB","status":"Active"}];
            //self.view.segTemp.setData(gblFlowsList2);
            //voltmx.print("### Popolato il segTemp con gblFlowsList2");
            // Itera su ogni riga del segmento
            /*for (var i = 0; i < data.length; i++) {
  // Ottieni la riga corrente
  var row = data[i];
  voltmx.print("### ROW: " + row);
  voltmx.print("### ROW[1]: " + row[1]);
  // Controlla il valore di lblStatus
  if (row.lblStatus.text === "Active") {
    // Setta l'attributo src di imgStatus se lblStatus è 'active'
    row.imgStatus.src = "green.png";
    voltmx.print("### IF ACTIVE");
  } else if (row.lblStatus.text === "Archived") {
    // Setta l'attributo src di imgStatus se lblStatus non è 'active'
    row.imgStatus.src = "yellow.png";
    voltmx.print("### IF ARCHIVED");
  } else {
    row.imgStatus.src = "grey.png";
    voltmx.print("### IF DRAFT");
  }

}
// Aggiorna il segmento con i nuovi dati
segmentWidget.setData(data);
*/
            voltmx.print("### METODO CONCLUSO");
        } else {
            voltmx.print("### non sono entrato nell'if");
        }
    }
    this.view.channelTemplate.imgLogo.src = gblChannelLogo;
    this.view.channelTemplate.lblChannelInfo.text = gblChannelName + " - #" + gblChannelId;
    voltmx.print("### gblChannelId: " + gblChannelId);
    voltmx.print("### gblChannelName: " + gblChannelName);
    voltmx.application.showLoadingScreen(null, "Fetching flows...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
    if (FLOW_get_inputparam == undefined) {
        var FLOW_get_inputparam = {};
    }
    FLOW_get_inputparam["serviceID"] = "mariaDB$FLOW_get";
    var FLOW_get_httpheaders = {};
    FLOW_get_inputparam["httpheaders"] = FLOW_get_httpheaders;
    var FLOW_get_httpconfigs = {};
    FLOW_get_inputparam["httpconfig"] = FLOW_get_httpconfigs;
    mariaDB$FLOW_get = mfintegrationsecureinvokerasync(FLOW_get_inputparam, "mariaDB", "FLOW_get", INVOKE_ASYNC_SERVICE_ide_postShow_cc924e82c4e2477eac048e571c0738a7_Callback);
}