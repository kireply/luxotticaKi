define([],function (){
  var voltmxLoggerModule = require('com/voltmxmp/texttospeech/voltmxLogger');
  var voltmxLog = voltmxLog || {};
  voltmxLog.logger = (new voltmxLoggerModule("Text To Speech Component")) || function() {};
  voltmxLog.logger.setLogLevel("DEBUG");
  voltmxLog.logger.enableServerLogging = true;

  var NativeController=function(componentInstance){
    this.componentInstance = componentInstance;
  };
  /**
     * @function getClasses
     * @private
     * @description: this function is implemented in platform native controller
     */
  NativeController.prototype.speakTTS=function(){
    try {
      voltmxLog.logger.trace("----------Entering stopRecognition Function---------", voltmxLog.logger.FUNCTION_ENTRY);
      throw {
        "type":"DEV",
        "Error": "Method doesn't implemented",
        "message": "You have to implement the method speakTTS!"
      };
    } catch (exception) {
      voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
      if(exception.type === "CUSTOM"){
        throw exception;
      }
    }
  };
  /**
     * @function getClasses
     * @private
     * @description: this function is implemented in platform native controller
     */
  NativeController.prototype.stop=function(){
    try {
      voltmxLog.logger.trace("----------Entering stopRecognition Function---------", voltmxLog.logger.FUNCTION_ENTRY);
      throw {
        "type":"DEV",
        "Error": "Method doesn't implemented",
        "message": "You have to implement the method stop!"
      };
    } catch (exception) {
      voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
      if(exception.type === "CUSTOM"){
        throw exception;
      }
    }
  };
  return NativeController;
});