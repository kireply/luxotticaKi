define({
 
//   tiles:[],
  channels:[],
 
  onViewCreated(){
//     this.view.init = () => {
 
//       this.tiles = data.tiles;
// //       this.view.btnAdd.onClick = () =>{
// //         this.addTile(this.tiles[0],0);
// //       }
//     };
    this.view.preShow = async () => {
      //try{
//         await this.fetchChannels(); // aspetta che fetchChannels sia completato
        if (gblNavigatedFromLogin === true){
          this.channels = gblChannels;
          gblNavigatedFromLogin = false;
        } else {
          await this.fetchChannels(); // aspetta che fetchChannels sia completato
        }
//         var previousForm = voltmx.application.getPreviousForm();
//         voltmx.print("### PREVIOUS FORM: " + previousForm);
//         voltmx.print("### GBL CHANNELS: " + JSON.stringify(gblChannels));
      	
        voltmx.print("### CHANNELS INSIDE ON VIEW: " + JSON.stringify(this.channels));
        this.reloadData();
    };
  },
 
  reloadData(){
//     voltmx.print("### CHANNELS INSIDE ON RELOAD: " + JSON.stringify(this.channels));
    this.view.flxChannels.removeAll();
    this.channels.forEach((box, index) => {this.addTile(box,index)});
    this.addTile(null, 99);
//     content = this.view.flxChannels.widgets();
//     content.forEach(function(widget) {
//        debugger;  
//     });
  },
  fetchChannels(){
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
  },
  addTile(box, index){
      voltmx.print("### INSIDE addTile");
      voltmx.print("### BOX: " + JSON.stringify(box));
      /*
      BOX: {"name":"DolceGabbana","logo":"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ray-Ban_logo.svg/772px-Ray-Ban_logo.svg.png","id":"DG","properties_file":"p4"}
      */
      voltmx.print("### INDEX: " + JSON.stringify(index));
      const flex = new voltmx.ui.FlexContainer({
        id: `flex${index}${new Date().getTime()}`,
        height: `130dp`,
        responsiveConfig: {
          "span": {
            "640": 12,
            "1024": 6,
            "1366": 4
          }
        },
      }, {}, {});
//       voltmx.print("### BUILDED FLEX");
      //const tile = new com.hcl.demo.uifactory.Tile({
      const channel = new ki.luxottica.channelTemplatewithContract({
        id: `channel{index}${new Date().getTime()}`,
        width: '100%',
        height: '147%',
        centerX: '50%',
        centerY: '50%'
      }, {}, {});
//       voltmx.print("### CREATO IL CHANNEL");
      if (box !== null) {
        channel.channelLogo = box.logo;
      	channel.channelInfo = box.name;
        channel.channelIdentifier = box.id;
        channel.channelProperties = box.properties_file;
        channel.channelId = index;
        channel.onClickTeaser = () => {
      	//TODO ACTIONS WHILE CLICKING ON THE TILE
          if (gblInfoIcon === true){
  //           voltmx.print("### SET VISIBILITY");         
            this.view.flxPopupChannelInfo.txtChannelID.text = channel.channelIdentifier;
            this.view.flxPopupChannelInfo.txtChannelLogo.text = channel.channelLogo;
            this.view.flxPopupChannelInfo.txtChannelProperties.text = channel.channelProperties;
            this.view.flxPopupChannelInfo.lbChannelName.masterData = [ ["lb1", channel.channelInfo] ];
            this.view.flxPopupChannelInfo.lbChannelName.selectedKey = "lb1";
            this.view.flxPopupChannelInfo.setVisibility(true);
          } else {
  //           voltmx.print("### NAVIGATE");
            gblChannelLogo = box.logo;
            gblChannelName = box.name;
            gblChannelId = box.id;
            gblChannelProperties = box.properties_file;
            voltmx.print("### GLOBAL INFO: " + gblChannelName);
            voltmx.print("### GLOBAL LOGO: " + gblChannelLogo);
            var navigationManager = new voltmx.mvc.Navigation("frmFlows");
            navigationManager.navigate();
          }
        };
        channel.onHoverTeaser = (widgRef, context) => {
          
          voltmx.print("### button hover event executed: " + context.eventType);

          if (context.eventType !== "leave"){
          	  channel.flxChannel.borderWidth = 0;
              channel.flxChannel.borderColor = "ffffff";
          } else {
              channel.flxChannel.borderWidth = 1;
          	  channel.flxChannel.borderColor = "000000";
          }
        }
      }
      else {
//        voltmx.print("### INSIDE ELSE");
       channel.channelLogo = "/plus.png";
       channel.channelInfo = "Add New Channel";
       channel.channelId = index;
       channel.imgInfoVisible = false;
       channel.onClickTeaser = () => {
         this.view.flxPopupCreateNewChannelInsideFrmChannels.setVisibility(true);
       }
//        voltmx.print("### CHANNEL INFO: " + channel.channelInfo);
//        voltmx.print("### CHANNEL LOGO: " + channel.channelLogo);
//        voltmx.print("### CHANNEL ID: " + channel.channelId);
//        channel.channelImgInfo.setVisibility(false);
      }
//       voltmx.print("### CHANNEL INFO: " + channel.channelInfo);
//       voltmx.print("### CHANNEL LOGO: " + channel.channelLogo);
//       voltmx.print("### CHANNEL ID: " + channel.channelId);
      flex.add(channel);
      this.view.flxChannels.add(flex);
    this.view.flxChannels.forceLayout();
  }
  
  
 
});