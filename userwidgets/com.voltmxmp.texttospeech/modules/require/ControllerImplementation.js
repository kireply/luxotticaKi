define([], function() {
  var path = 'com/voltmxmp/texttospeech/';
  var voltmxLoggerModule = require(path + 'voltmxLogger');
  var voltmxLog = voltmxLog || {};
  voltmxLog.logger = (new voltmxLoggerModule("Text To Speech  Component")) || function() {};
  voltmxLog.logger.setLogLevel("DEBUG");
  voltmxLog.logger.enableServerLogging = true;

  var ControllerImplementation = function(componentInstance) {
    voltmxLog.logger.trace("----------Entering ControllerImplementation Function---------", voltmxLog.logger.FUNCTION_ENTRY);
    this.componentInstance = componentInstance;
    this.getNativeController = function() {
      try {
        voltmxLog.logger.trace("----------Entering getNativeController Function---------", voltmxLog.logger.FUNCTION_ENTRY);
        if (this.nativeControllerInstance === undefined) {
          var deviceName = voltmx.os.deviceInfo().name;
          var platformName = null;
          if (deviceName.toLowerCase() === 'iphone' || deviceName.toLowerCase() === 'ipad') {
            platformName = 'IOS.js';
          } else if (deviceName.toLowerCase() === 'android') {
            platformName = 'Android.js';
          }
          else if (deviceName.toLowerCase() === 'thinclient'){
            platformName = 'DesktopWeb';
          }
          var nativeControllerPath = path + 'NativeController' + platformName;
          var nativeController = require(nativeControllerPath);
          this.nativeControllerInstance = new nativeController(this.componentInstance);
        }
        voltmxLog.logger.trace("----------Exiting getNativeController Function---------", voltmxLog.logger.FUNCTION_EXIT);
        return this.nativeControllerInstance;
      } catch (exception) {
        voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
        if (exception.type === "CUSTOM") {
          throw exception;
        }
      }
    };
    /**
         * @function speakTTS
         * @private
         * @description: This function is for call speak
         */
    this.speakTTS = function(text) {
      try {
        voltmxLog.logger.trace("----------Entering speakTTS Function---------", voltmxLog.logger.FUNCTION_ENTRY);
        this.getNativeController().speakTTS(text);
        voltmxLog.logger.trace("----------Exiting speakTTS Function---------", voltmxLog.logger.FUNCTION_EXIT);
      } catch (exception) {
        voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
        if (exception.type === "CUSTOM") {
          throw exception;
        }
      }
    };
    this.stop = function() {
      try {
        voltmxLog.logger.trace("----------Entering stop Function---------", voltmxLog.logger.FUNCTION_ENTRY);
        this.getNativeController().stop();
        voltmxLog.logger.trace("----------Exiting stop Function---------", voltmxLog.logger.FUNCTION_EXIT);
      } catch (exception) {
        voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
        if (exception.type === "CUSTOM") {
          throw exception;
        }
      }
    };
    voltmxLog.logger.trace("----------Exiting ControllerImplementation Function---------", voltmxLog.logger.FUNCTION_EXIT);
  };

  return ControllerImplementation;
});