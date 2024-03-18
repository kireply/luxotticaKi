define({ 

 //Type your controller code here 
 addProperties(box, index){
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
      const prop = new ki.luxottica.editPropertyValue({
        id: `channel{index}${new Date().getTime()}`,
        width: '100%',
        height: '147%',
        centerX: '50%',
        centerY: '50%'
      }, {}, {});
//       voltmx.print("### CREATO IL CHANNEL");
      flex.add(prop);
      this.view.flxChannels.add(flex);
      this.view.settingsSide.flxSettingsSideContent.add(flex);
      this.view.settingsSide.flxSettingsSideContent.forceLayout();
  }

 });