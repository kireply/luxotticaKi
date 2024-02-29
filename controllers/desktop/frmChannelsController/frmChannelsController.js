define({ 

  tiles:[],
  channels:[],

  onViewCreated(){
//     this.view.init = () => {

//       this.tiles = data.tiles;
// //       this.view.btnAdd.onClick = () =>{
// //         this.addTile(this.tiles[0],0);
// //       }
//     };
	this.view.preShow = async () => {
      try{
        await this.fetchChannels(); // aspetta che fetchChannels sia completato
        voltmx.print("### CHANNELS INSIDE ON VIEW: " + JSON.stringify(this.channels));
    	//this.view.preShow = () => this.reloadData();
        this.reloadData();
      } catch (error){
        voltmx.print("### Error: " + JSON.stringify(error));
      }
    };
  },

  reloadData(){
    voltmx.print("### CHANNELS INSIDE ON RELOAD: " + JSON.stringify(this.channels));
    //this.view.flxTiles.removeAll();
    this.view.flxChannels.removeAll();
    this.channels.forEach((box, index) => {this.addTile(box,index)});
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
      voltmx.print("### BUILDED FLEX");
      //const tile = new com.hcl.demo.uifactory.Tile({
      const channel = new ki.luxottica.channelTemplate({
        id: `channel{index}${new Date().getTime()}`,
        width: '95%',
        height: '120dp',
        centerX: '50%',
        centerY: '50%'
      }, {}, {});
      voltmx.print("### BUILDED CHANNEL: " + JSON.stringify(channel));
      channel.glassLogo = box.logo;
      channel.glassTitle = box.title;
      flex.add(channel);
      this.view.flxChannels.add(flex);
    this.view.flxChannels.forceLayout();
  }

 

});