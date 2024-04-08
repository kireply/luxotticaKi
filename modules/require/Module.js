

define(function () {
  
   
    fetchChannels = function(){
    return new Promise((resolve, reject) => {
      voltmx.print("### INSIDE fetchChannels");
      var integrationService = null;
      var sdkDefaultInstance = voltmx.sdk.getDefaultInstance();
      var integrationService = sdkDefaultInstance.getIntegrationService("mariaDB");
 
      integrationService.invokeOperation("CHANNEL_get",{},{},
         (response) => {
          voltmx.application.showLoadingScreen(null, "Searching channels ...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
          voltmx.print ("### Service response: "+JSON.stringify(response));
          voltmx.print ("### CHANNELS: " + JSON.stringify(response.CHANNEL));
          /*
          CHANNELS: [{"name":"DolceGabbana","logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ray-Ban_logo.svg/772px-Ray-Ban_logo.svg.png","id":"DG","properties_file":"p4"},{"name":"RayBan","logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ray-Ban_logo.svg/772px-Ray-Ban_logo.svg.png","id":"RB","properties_file":"p5"}]
          */
          this.channels = response.CHANNEL;
          voltmx.print("### CHANNELS ATTRIBUTE: " + JSON.stringify(this.channels));
          voltmx.application.dismissLoadingScreen();
          resolve(this.channels);
         },
         (error) => {
          voltmx.print("### Error in the invocation of the service: " + JSON.stringify(error));
          reject(error);
        }
      );
    });
  };
   
    return {
      
      fetchChannels: this.fetchChannels
        
    };
});








