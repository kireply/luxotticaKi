define(['./Inherits', './NativeController'], function(Inherits, NativeController) {
  var voltmxLog = voltmxLog || {};
  var voltmxLoggerModule = require("com/voltmxmp/texttospeech/voltmxLogger");
  voltmxLog.logger = (new voltmxLoggerModule("Text To Speech Component")) || function() {};
  voltmxLog.logger.setLogLevel("DEBUG");

  var NativeControllerAndroid = function(componentInstance) {
    this.componentInstance = componentInstance;
    NativeController(componentInstance);
    this.importClasses();
    this.textToSpeech = new this.textToSpeechClass(this.konyContext, new this.MySpeechListner());
    var state = this.textToSpeech.setOnUtteranceProgressListener(new this.utteranceListener());
    voltmxLog.logger.trace("State-----"+ state, voltmxLog.logger.DATA_STORE);
    var callback = {
      onbackground: this.componentInstance.background.bind(this.componentInstance)
    };
    voltmx.application.setApplicationCallbacks(callback);
  };

  Inherits(NativeControllerAndroid, NativeController);

  /**
     * @function importClasses
     * @private
     * @description: this function will import all the classes from the franeworks and store in the nativeClasses variable
     */
  NativeControllerAndroid.prototype.importClasses = function() {
    try {
      voltmxLog.logger.trace("----------Entering importClasses Function---------", voltmxLog.logger.FUNCTION_ENTRY);
      var textToSpeechError = -1;
      this.konyMain = java.import("com.konylabs.android.KonyMain");
      this.textToSpeechClass = java.import('android.speech.tts.TextToSpeech');
      this.Locale = java.import("java.util.Locale");
      this.hashMap = java.import("java.util.HashMap");
      this.konyContext = this.konyMain.getActivityContext();
      this.MySpeechListner = java.newClass('MySpeechListner', 'java.lang.Object', ['android.speech.tts.TextToSpeech$OnInitListener'], {
        onInit: function(status) {
          if (status === textToSpeechError) {
            throw this.TextToSpeech.ERROR;
          }
        }
      });
      this.utteranceListener = java.newClass("utteranceListener", "android.speech.tts.UtteranceProgressListener", [], {
        onStart: this.componentInstance.onTTSSpeechStart.bind(this.componentInstance),
        onDone: this.componentInstance.endOfSpeech.bind(this.componentInstance),
        onError: this.onSpeechError.bind(this),
        onTTSSpeechStart: null,
        endOfSpeech: null
      });
      voltmxLog.logger.trace("----------Exiting importClasses Function---------", voltmxLog.logger.FUNCTION_EXIT);
      return this;
    } catch (exception) {
      voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
      this.componentInstance.endOfSpeech();
      if(exception.type === "CUSTOM"){
        throw exception;
      }
    }
  };
  /**
     * @function onSpeechError
     * @private
     * @description: this event is invoked when an error occured while speaking or invkoing the tts
     */
  NativeControllerAndroid.prototype.onSpeechError = function(error) {
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
     * @function speakTTS
     * @private
     * @description: this function start speaking
     */
  NativeControllerAndroid.prototype.speakTTS = function(text) {
    try {
      voltmxLog.logger.trace("----------Entering speakTTS Function---------", voltmxLog.logger.FUNCTION_ENTRY);
      if (this.validateLang(this.componentInstance.setAndroidLanguage)) {
        this.textToSpeech.setSpeechRate(Number(parseFloat(this.componentInstance.setRate).toFixed()));
        //                 alert('native'+Number(parseFloat(this.componentInstance.setRate).toFixed(2)));
        this.textToSpeech.setLanguage(this.Locale[this.componentInstance.setAndroidLanguage]);
        var hashMapObj = new this.hashMap();
        hashMapObj.put("utteranceId", "UniqueID");
        this.componentInstance.speakenStatus = this.textToSpeech.speak(text, this.textToSpeechClass.QUEUE_FLUSH, hashMapObj);
        if (this.componentInstance.speakenStatus !== 0) {
          voltmxLog.logger.trace("----------Exiting speakTTS Function---------", voltmxLog.logger.FUNCTION_EXIT);
          throw {
            "type":"CUSTOM",
            "ERROR": "TTSError",
            "message": "TTS was not configured right"
          };
        }
      } else {
        voltmxLog.logger.trace("----------Exiting speakTTS Function---------", voltmxLog.logger.FUNCTION_EXIT);
        throw {
          "Error": "invalidLanguage",
          "message": "language data is missing or not supported"
        };
      }
      voltmxLog.logger.trace("----------Exiting speakTTS Function---------", voltmxLog.logger.FUNCTION_EXIT);
    } catch (exception) {
      voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
      if(exception.type === "CUSTOM"){
        throw exception;
      }
    }
  };
  /**
     * @function validateLang
     * @private
     * @description: this function will validate language property
     */
  NativeControllerAndroid.prototype.validateLang = function(lng) {
    try {
      voltmxLog.logger.trace("----------Entering validateLang Function---------", voltmxLog.logger.FUNCTION_ENTRY);
      if (this.textToSpeech.isLanguageAvailable(this.Locale[lng]) === -2.0 || this.textToSpeech.isLanguageAvailable(this.Locale[lng]) === -1.0) {
        voltmxLog.logger.trace("----------Exiting validateLang Function---------", voltmxLog.logger.FUNCTION_EXIT);
        return false;
      } else {
        voltmxLog.logger.trace("----------Exiting validateLang Function---------", voltmxLog.logger.FUNCTION_EXIT);
        return true;
      }
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
  NativeControllerAndroid.prototype.stop = function() {
    try {
      voltmxLog.logger.trace("----------Exiting stop Function---------", voltmxLog.logger.FUNCTION_ENTRY);
      this.textToSpeech.stop();
      voltmxLog.logger.trace("----------Exiting stop Function---------", voltmxLog.logger.FUNCTION_EXIT);
    } catch (exception) {
      voltmxLog.logger.error(JSON.stringify(exception), voltmxLog.logger.EXCEPTION);
      if(exception.type === "CUSTOM"){
        throw exception;
      }
    }
  };

  return NativeControllerAndroid;

});
