define({ 

 //Type your controller code here
 verifyLoggeduser: function(){
   var integrationService = null;
   var sdkDefaultInstance = voltmx.sdk.getDefaultInstance();
   var integrationService = sdkDefaultInstance.getIntegrationService("mariaDB");
   
   var email = this.view.txtEmail.text;
   var password = this.view.txtPassword.text;
   
   function SHOW_ALERT_Successful_Login_Callback() {
     	voltmx.print("sono la callback dell'alert");
     	var navigating = new voltmx.mvc.Navigation('frmDashboard');
        navigating.navigate();
      }
   
   function SHOW_ALERT_Failure_Callback() {
     	voltmx.print("sono la callback dell'alert");
      }
   
   
   integrationService.invokeOperation("USER_get",{},{},
		  function(response){
          voltmx.application.showLoadingScreen(null, "Searching user ...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
          voltmx.print ("### Service response: "+JSON.stringify(response));
     	  var userFound = response.USER.some(user => user.email === email && user.password === password);
     	  if (userFound){
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
          	}
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