define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
    },
    latCurrent: 0,
    longCurrent: 0,
    bGotGPS: false,
    timeLastGetGPS: 0,

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
    },

    getCurrentLocation: function()
    {
      var self = this;
      var positionoptions = {
        timeout: 15000
      }; // 15 secs 
      positionoptions.enableHighAccuracy = true;
      voltmx.location.getCurrentPosition(successcallback, errorcallback, positionoptions);

      //Callback that is executed on success of getCurrentPosition function.
      function successcallback(position) {
        /*var geoPosition = "Latitude: " + position.coords.latitude;
    geoPosition = geoPosition + " Longitude: " + position.coords.longitude;
    geoPosition = geoPosition + " Altitude: " + position.coords.altitude;
    geoPosition = geoPosition + " Accuracy: " + position.coords.accuracy;
    geoPosition = geoPosition + " Altitude Accuracy: " + position.coords.altitudeAccuracy;
    geoPosition = geoPosition + " Heading: " + position.coords.heading;
    geoPosition = geoPosition + " Speeding: " + position.coords.speeding;
    geoPosition = geoPosition + " Timestamp: " + position.timestamp;
    alert(geoPosition);*/
        self.timeLastGetGPS = (new Date().getTime()) / 1000 / 60;  // in minutes.
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        self.latCurrent = lat;
        self.longCurrent = long;
        self.bGotGPS = true;
        self.view.flxMain.skin = "skinCompQTempGreen";
        //alert(lat+" "+long);
      }
      // Callback that is executed on error of getCurrentPosition function.
      function errorcallback(positionerror) {
        var errorMesg = "GPS Error: " + positionerror.code;
        errorMesg = errorMesg + "; message: " + positionerror.message;
        alert(errorMesg);
      }
    },

    getTempNow: function () 
    {
      var self = this;

      function getTempNow_Callback(status, getTemperature) {
        if (getTemperature.opstatus == 0) {
          let tmpTemp = getTemperature.current_weather.temperature;
          tmpTemp = Math.floor(tmpTemp);
          tmpTemp = Number.parseInt(tmpTemp);
          self.view.lblTemp.text = tmpTemp;
          self.view.forceLayout();
          self.view.texttospeech.speakOut("The current temperature is " + tmpTemp + " degrees.");
        }
      }

      if (self.bGotGPS)
      {
        let timeNowMinutes = (new Date().getTime()) / 1000 / 60;  // minutes.
        
        // If it has been too long since last GPS read, don't get temperature.
        if ((timeNowMinutes - self.timeLastGetGPS) > self.view.lblResetMinutes.text)
        {
          self.bGotGPS = false;
          self.view.flxMain.skin = "skinCompQTempBlack";
          self.getCurrentLocation();
        }
        else
        {
          if (getTemperature_inputparam == undefined) {
            var getTemperature_inputparam = {};
          }
          getTemperature_inputparam["serviceID"] = "fisTemperature$getTemperature";
          getTemperature_inputparam["lat"] = self.latCurrent;
          getTemperature_inputparam["long"] = self.longCurrent;
          var getTemperature_httpheaders = {};
          getTemperature_inputparam["httpheaders"] = getTemperature_httpheaders;
          var getTemperature_httpconfigs = {};
          getTemperature_inputparam["httpconfig"] = getTemperature_httpconfigs;
          fisTemperature$getTemperature = mfintegrationsecureinvokerasync(getTemperature_inputparam, "fisTemperature", "getTemperature", getTempNow_Callback);
        }
      }
    },



  };
});