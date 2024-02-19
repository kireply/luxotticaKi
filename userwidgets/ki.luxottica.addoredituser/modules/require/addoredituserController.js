define(function() {

  return {

    /**
     * This object represents a new complaint 
     **/
    UserObject : {
      "Name":"",
      "Surname":"",
      "Mail":""
    },
    

    /**
  	 * This funtion is responsible to create a new complaint or a request
  	 **/
    submit : function () {
      voltmx.print ("Entering into ki.luxottica.addoredituser : submit");
      //this.UserObject.Name = this.view.flxMainCompileUser.txtName.text;
      //this.UserObject.Surname = this.view.flxMainCompileUser.txtSurname.text;
      //this.UserObject.Mail = this.view.flxMainCompileUser.txtCompileUserEmail.text;

      //voltmx.print ("### UserObject: " + JSON.stringify(this.UserObject));
      
      function SHOW_ALERT_fbdd4271c94d4cc1b1385a078477b4a4_Callback() {
            SHOW_ALERT_fbdd4271c94d4cc1b1385a078477b4a4_True();
      }

      //var objSvc = null;
      //var dataObject = null;
      //objSvc = voltmx.sdk.getCurrentInstance().getObjectService("UsersStorage", {"access":"online"});
      var intSvc = null;
      var sdkDefaultInstance = voltmx.sdk.getDefaultInstance();
      var integrationService = sdkDefaultInstance.getIntegrationService("mariaDB");
      
      
      var name = this.view.flxMainCompileUser.txtName.text;
      var surname = this.view.flxMainCompileUser.txtSurname.text;
      var email = this.view.flxMainCompileUser.txtCompileUserEmail.text;
      var password = this.view.flxMainCompileUser.txtCompileUserPassword.text;

      // Costruisci i parametri di input per l'operazione USER_get
      var inputData = {
        "name": name,
        "surname": surname,
        "email": email,
        "password": password 
      };

      //dataObject = new voltmx.sdk.dto.DataObject("User");
      //dataObject.addField("Name",this.UserObject.Name);
      //dataObject.addField("Surname",this.UserObject.Surname);
      //dataObject.addField("Mail",this.UserObject.Mail);
      if ("Add" === this.addOrEditOrDeleteUser) {
        voltmx.application.showLoadingScreen(null, "Adding new user ...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
        intSvc.invokeOperation("USER_create",{},inputData,
		  function(response){									
          voltmx.print ("### Record added: "+JSON.stringify(response));
		  voltmx.ui.Alert({
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": "Success",
            "yesLabel": "Ok",
            "message": "User added",
            "alertHandler": SHOW_ALERT_fbdd4271c94d4cc1b1385a078477b4a4_Callback
        	}, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        	});
  			},
			function(error){
          	voltmx.print("### Error in record add: " + JSON.stringify(error));
          	voltmx.ui.Alert({
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": "Fail",
            "yesLabel": "Ok",
            "message": "Error in adding this user",
            "alertHandler": SHOW_ALERT_fbdd4271c94d4cc1b1385a078477b4a4_Callback
        	}, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        	});
        	});
        /*var options = {"dataObject":dataObject};
        objSvc.create(options,
        function(response) {
        	voltmx.print("### Record added: " + JSON.stringify(response));
          	voltmx.ui.Alert({
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": "Success",
            "yesLabel": "Ok",
            "message": "User added",
            "alertHandler": SHOW_ALERT_fbdd4271c94d4cc1b1385a078477b4a4_Callback
        	}, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        	});
        },
        function(error) {
            voltmx.print("### Error in record add: " + JSON.stringify(error));
          	voltmx.ui.Alert({
            "alertType": constants.ALERT_TYPE_INFO,
            "alertTitle": "Fail",
            "yesLabel": "Ok",
            "message": "Error in adding this user",
            "alertHandler": SHOW_ALERT_fbdd4271c94d4cc1b1385a078477b4a4_Callback
        	}, {
            "iconPosition": constants.ALERT_ICON_POSITION_LEFT
        	});
        });*/

      } else if ("Edit" === this.addOrEditOrDeleteUser) {
		voltmx.application.showLoadingScreen(null, "Editing user ...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
        var options = {"dataObject":dataObject};
        var userID = null;
        objSvc.fetch(options,
          (response) => { 
              for (var i = 0; i < response.records.length; i++) {
                  voltmx.print("### sono nel for");
                  var user = response.records[i];
                  voltmx.print("### user: " + JSON.stringify(user));
                  voltmx.print("### user Mail: " + JSON.stringify(user.Mail));
                  if (user.Mail === this.UserObject.Mail) { 
                      userID = user.UserID;
                      voltmx.print("### utente trovato");
                      break;
                  } else {
                      voltmx.print("### not found");
                  }
              }
              voltmx.print("### cerco l'utente desiderato");

              dataObject.addField("UserID", userID);
              var options2 = {"dataObject":dataObject};
              voltmx.print("### faccio l'update");
              objSvc.update(options2,
              function(response) {
                  voltmx.print("### Record updated: " + JSON.stringify(response));
                  voltmx.ui.Alert({
                  "alertType": constants.ALERT_TYPE_INFO,
                  "alertTitle": "Success",
                  "yesLabel": "Ok",
                  "message": "User updated",
                  "alertHandler": SHOW_ALERT_fbdd4271c94d4cc1b1385a078477b4a4_Callback
                  }, {
                  "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                  });
              },
              function(error) {
                  voltmx.print("Error in record update: " + JSON.stringify(error));
                  voltmx.ui.Alert({
                  "alertType": constants.ALERT_TYPE_INFO,
                  "alertTitle": "Fail",
                  "yesLabel": "Ok",
                  "message": "Error in editing this user",
                  "alertHandler": SHOW_ALERT_fbdd4271c94d4cc1b1385a078477b4a4_Callback
                  }, {
                  "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                  });
              });
          },
          (error) => {
              voltmx.print("### Failed to fetch: " + JSON.stringify(error));
          });
 
      } else {
        voltmx.print("### delete");
		voltmx.application.showLoadingScreen(null, 'deleting user ...', constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, {});
        var options = {"dataObject":dataObject};
        var userID = null;
        objSvc.fetch(options,
          (response) => { 
              for (var i = 0; i < response.records.length; i++) {
                  voltmx.print("### sono nel for");
                  var user = response.records[i];
                  voltmx.print("### user: " + JSON.stringify(user));
                  voltmx.print("### user Mail: " + JSON.stringify(user.Mail));
                  if (user.Mail === this.UserObject.Mail) { 
                      userID = user.UserID;
                      voltmx.print("### utente trovato");
                      break;
                  } else {
                      voltmx.print("### not found");
                  }
              }
              voltmx.print("### cerco l'utente desiderato");

              dataObject.addField("UserID", userID);
              var options2 = {"dataObject":dataObject};
              voltmx.print("### faccio la delete");
              objSvc.deleteRecord({
                   "dataObject": dataObject
                   }, function(response) {
                  voltmx.print("### Record updated: " + JSON.stringify(response));
                  voltmx.ui.Alert({
                  "alertType": constants.ALERT_TYPE_INFO,
                  "alertTitle": "Success",
                  "yesLabel": "Ok",
                  "message": "User updated",
                  "alertHandler": SHOW_ALERT_fbdd4271c94d4cc1b1385a078477b4a4_Callback
                  }, {
                  "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                  });
              
              }, function(error) {
                  voltmx.print("Error in record update: " + JSON.stringify(error));
                  voltmx.ui.Alert({
                  "alertType": constants.ALERT_TYPE_INFO,
                  "alertTitle": "Fail",
                  "yesLabel": "Ok",
                  "message": "Error in editing this user",
                  "alertHandler": SHOW_ALERT_fbdd4271c94d4cc1b1385a078477b4a4_Callback
                  }, {
                  "iconPosition": constants.ALERT_ICON_POSITION_LEFT
                  });
             });
          },
          (error) => {
              voltmx.print("### Failed to delete: " + JSON.stringify(error));
          });
      }
      voltmx.application.dismissLoadingScreen();
      var navigating = new voltmx.mvc.Navigation('frmDashboard')
      navigating.navigate();
      voltmx.print ("Exiting out of ki.luxottica.addoredituser : submit");
      
    }

  };
});