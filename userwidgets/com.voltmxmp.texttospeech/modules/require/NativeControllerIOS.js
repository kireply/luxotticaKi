define(['./Inherits', './NativeController'], function(Inherits, NativeController) {
  var voltmxLog = voltmxLog || {};
  var voltmxLoggerModule = require("com/voltmxmp/texttospeech/voltmxLogger");
  voltmxLog.logger = (new voltmxLoggerModule("Text To Speech Component")) || function() {};
  voltmxLog.logger.setLogLevel("DEBUG");

  var NativeControllerIOS = function(componentInstance) {
    this.componentInstance = componentInstance;
    NativeController(componentInstance);
    this.importClasses();
    this.avSpeechSynthesizer = this.utteranceDelegate.alloc().jsinit();
    this.avSpeechSynthesizer.delegate = this.avSpeechSynthesizer;
  };

  Inherits(NativeControllerIOS, NativeController);

  /**
     * @function importClasses
     * @private
     * @description: this function will import all the classes from the franeworks and store in the nativeClasses variable
     */
  NativeControllerIOS.prototype.importClasses = function() {
    try {
      voltmxLog.logger.trace("----------Entering importClasses Function---------", voltmxLog.logger.FUNCTION_ENTRY);
      this.seed = Math.random();
      this.audioSession = objc.import('AVAudioSession').sharedInstance();
      this.avSpeechSynthesisVoice = objc.import("AVSpeechSynthesisVoice");
      this.avSpeechUtterance = objc.import("AVSpeechUtterance");
      var x = (Math.sin(this.seed++) * 10000);
      var randomNumber = x - Math.floor(x);
      this.utteranceDelegate = objc.newClass('utteranceDelegate' + randomNumber, 'AVSpeechSynthesizer', ['AVSpeechSynthesizerDelegate'], {
        speechSynthesizerDidFinishSpeechUtterance: this.componentInstance.endOfSpeech.bind(this.componentInstance),
        speechSynthesizerDidStartSpeechUtterance: this.componentInstance.onTTSSpeechStart.bind(this.componentInstance)
      });
      voltmxLog.logger.trace("----------Exiting importClasses Function---------", voltmxLog.logger.FUNCTION_EXIT);
    } catch (exception) {
      voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
      if(exception.type === "CUSTOM"){
        throw exception;
      }
    }
  };
  /**
     * @function speakTTS
     * @private
     * @description: this function start speaking
     */
  NativeControllerIOS.prototype.speakTTS = function(text) {
    try {
      voltmxLog.logger.trace("----------Entering speakTTS Function---------", voltmxLog.logger.FUNCTION_ENTRY);
      this.audioSession.setModeError(AVAudioSessionModeSpokenAudio, undefined);
      this.audioSession.setActiveError(true, undefined);
      var avUtterance = this.avSpeechUtterance.speechUtteranceWithString(text);
      avUtterance.rate = Number(this.componentInstance.setRate);
      avUtterance.prefersAssistiveTechnologySettings = true;
      avUtterance.preUtteranceDelay = Number(this.componentInstance.preUtteranceDelay);
      avUtterance.postUtteranceDelay = Number(this.componentInstance.postUtteranceDelay);
      avUtterance.volume = Number(this.componentInstance.volume);
      avUtterance.pitchMultiplier = Number(this.componentInstance.pitchMultiplier);
      avUtterance.voice = this.avSpeechSynthesisVoice.voiceWithLanguage(this.componentInstance.setIphoneLanguage);
      this.avSpeechSynthesizer.speakUtterance(avUtterance);
      voltmxLog.logger.trace("----------Exiting speakTTS Function---------", voltmxLog.logger.FUNCTION_EXIT);
    } catch (exception) {
      voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
      if(exception.type === "CUSTOM"){
        throw exception;
      }
    }
  };
  /**
     * @function stop
     * @private
     * @description: this function stop speaking
     */
  NativeControllerIOS.prototype.stop = function() {
    try {
      voltmxLog.logger.trace("----------Exiting stop Function---------", voltmxLog.logger.FUNCTION_ENTRY);
      if (this.componentInstance.stopSpeechApibehaviour !== "stop after finishing current word") {
        this.avSpeechSynthesizer.stopSpeakingAtBoundary(AVSpeechBoundaryImmediate);
      } else {
        this.avSpeechSynthesizer.stopSpeakingAtBoundary(AVSpeechBoundaryWord);
      }
      voltmxLog.logger.trace("----------Exiting stop Function---------", voltmxLog.logger.FUNCTION_EXIT);
    } catch (exception) {
      voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
      if(exception.type === "CUSTOM"){
        throw exception;
      }
    }
  };

  return NativeControllerIOS;

});
