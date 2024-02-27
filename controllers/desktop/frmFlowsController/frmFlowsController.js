define({  

 //Type your controller code here
 addFlowsData: function(){
   var integrationService = null;
   var sdkDefaultInstance = voltmx.sdk.getDefaultInstance();
   var integrationService = sdkDefaultInstance.getIntegrationService("mariaDB");
   
   var channelId = gblChannelId;
   
   function SHOW_ALERT_Successful_Login_Callback() {
     	voltmx.print("sono la callback dell'alert");
     	var navigating = new voltmx.mvc.Navigation('frmDashboard');
        navigating.navigate();
      }
   
   function SHOW_ALERT_Failure_Callback() {
     	voltmx.print("sono la callback dell'alert");
      }
   
   
   integrationService.invokeOperation("FLOW_get",{},{},
		  function(response){
     
     	  
          voltmx.application.showLoadingScreen(null, "Searching flows ...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
          voltmx.print ("### Service response: "+JSON.stringify(response));
     	  var flowsFound = response.FLOW.filter(flow => flow.channel_id === channelId);
     	  voltmx.print("### flowsFound: " + JSON.stringify(flowsFound));
     
          // Assumi che flowsFound sia già stato definito e popolato come mostrato sopra
          if (flowsFound && flowsFound.length > 0) {
              // Se flowsFound non è vuoto, procedi con il mapping e l'aggiunta al segment widget
            voltmx.print("### dentro if flowsFound");
                         
            var tempCollection = [];
            var tempData = flowsFound;
       
            for (var flow in tempData) {
              tempCollection.push({
                "lblStatus": { "text": tempData[flow]["status"]},
                "lblFlowName": { "text": tempData[flow]["channel_id"]},
                "lblDescription": { "text": tempData[flow]["description"]},
                "lblCategory": { "text": tempData[flow]["categroy"]},
                "lblDefault": { "text": tempData[flow]["defalt"]},
                "lblAuthor": { "text": tempData[flow]["author"]},
                "lblLastModified": { "text": tempData[flow]["last_ modificed"]}
              }
            )
            this.view.segFlows.setData(tempCollection);
            }
            
            
        //    for (var flow in flowsFound) {
              // Mappatura dei valori di flow sui campi del segment widget
              //voltmx.print("### flow id: " + JSON.stringify(flowsFound[flow].id));
              
              //voltmx.print("### lblStatus: " +  JSON.stringify(this.view.segFlows.lblStatus));
              /*    var segmentData = {
                      this.view.  : flow.status,
                      lbldescription: flow.description,
                      lblcategory: flow.category
                  };
                  // Chiamata alla funzione o metodo per aggiungere i dati mappati al segment widget
           		  this.view.segFlows.setData(segmentData);
             */
              
              
              
               
          //  }
            
                  
          } else {
              // Gestisci il caso in cui flowsFound è vuoto
              console.log("Nessun flow trovato per il channel_id specificato.");
          }

     
     	 /* if (flowsFound.length !== 0){
            voltmx.application.dismissLoadingScreen();
            voltmx.print("### User found, welcome");
            voltmx.ui.Alert({
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": "Success",
            "yesLabel": "Ok",
            "message": "Welcome!",
            "alertHandler": SHOW_ALERT_Successful_Login_Callback
        	}, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        	});
          } else{
            voltmx.application.dismissLoadingScreen();
            voltmx.print("### User not found");
            voltmx.ui.Alert({
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": "Fail",
            "yesLabel": "Ok",
            "message": "Login not permitted",
            "alertHandler": SHOW_ALERT_Failure_Callback
        	}, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        	});
          	}*/
  		   },
			function(error){
          	voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
          	voltmx.ui.Alert({
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": "Fail",
            "yesLabel": "Ok",
            "message": "Error from the service",
            "alertHandler": SHOW_ALERT_Failure_Callback
        	}, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        	});
        	}
  );
 }

 });