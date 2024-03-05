define(['./Inherits', './NativeController'], function(Inherits, NativeController) {
  var voltmxLoggerModule = require('com/voltmxmp/texttospeech/voltmxLogger');
  var voltmxLog = voltmxLog || {};
  voltmxLog.logger = (new voltmxLoggerModule("Text To Speech Component")) || function() {};
  voltmxLog.logger.setLogLevel("DEBUG");
  voltmxLog.logger.enableServerLogging = true;

  var NativeControllerDesktop = function(componentInstance) {
    this.componentInstance = componentInstance;
    NativeController(this);
  };

  Inherits(NativeControllerDesktop, NativeController);

  /**
     * @function speechToText
     * @private
     * @description: This is first step for recognition
     */
  NativeControllerDesktop.prototype.speakTTS = function(text) {
    try {
      voltmxLog.logger.trace("----------Entering speakTTS Function---------", voltmxLog.logger.FUNCTION_ENTRY);
      this.speechSynthesisUtterance = new SpeechSynthesisUtterance();
      this.synth = window.speechSynthesis;
      this.speechSynthesisUtterance.text = text;
      this.speechSynthesisUtterance.volume = this.componentInstance.setWebVolume;
      this.speechSynthesisUtterance.rate = this.componentInstance.setRate;
      this.speechSynthesisUtterance.pitch = this.componentInstance.setPitch;
      this.speechSynthesisUtterance.lang = this.componentInstance.setWebLanguage;
      this.speechSynthesisUtterance.onstart = this.componentInstance.onTTSSpeechStart.bind(this.componentInstance);
      this.speechSynthesisUtterance.onend = this.componentInstance.endOfSpeech.bind(this.componentInstance);
      this.speechSynthesisUtterance.onError = this.onSpeechError.bind(this);
      this.synth.speak(this.speechSynthesisUtterance);
      voltmxLog.logger.trace("----------Exiting speakTTS Function---------", voltmxLog.logger.FUNCTION_EXIT);
    } catch (exception) {
      voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
    }
  };
  /**
     * @function onSpeechError
     * @private
     * @description: this event is invoked when an error occured while speaking or invkoing the tts
     */
  NativeControllerDesktop.prototype.onSpeechError = function(error) {
    try {
      voltmxLog.logger.trace("----------Entering onSpeechError Function---------", voltmxLog.logger.FUNCTION_ENTRY);
      voltmxLog.logger.trace("----------Exiting onSpeechError Function---------", voltmxLog.logger.FUNCTION_EXIT);
      throw error;
    } catch (exception) {
      voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
      if(exception.type === "CUSTOM"){
        throw exception;
      }
    }
  };
  /**
     * @function stopRecognition
     * @private
     * @description: This function will stop the recognition and gives the final result of the speech
     */
  NativeControllerDesktop.prototype.stop = function() {
    try {
      voltmxLog.logger.trace("----------Entering stop Function---------", voltmxLog.logger.FUNCTION_ENTRY);
      this.synth.cancel();
      voltmxLog.logger.trace("----------Exiting stop Function---------", voltmxLog.logger.FUNCTION_EXIT);
    } catch (exception) {
      voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
      if(exception.type === "CUSTOM"){
        throw exception;
      }
    }
  };

  return NativeControllerDesktop;
});
