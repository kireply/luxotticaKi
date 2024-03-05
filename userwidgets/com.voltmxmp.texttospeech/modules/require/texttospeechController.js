/**
 * Created by Team Kony.
 * Copyright (c) 2017 Kony Inc. All rights reserved.
 */
define(['./ControllerImplementation'], function(ControllerImplementation) {
  var voltmxLoggerModule = require('com/voltmxmp/texttospeech/voltmxLogger');
  var voltmxmp = voltmxmp || {};
  voltmxmp.logger = (new voltmxLoggerModule("Text To Speech Component")) || function() {};
  voltmxmp.logger.setLogLevel("DEBUG");
  return {
    /**
         * @function constructor
         * @private
         * @params {Object} baseConfig, layoutConfig, pspConfig
         */
    constructor: function(baseConfig, layoutConfig, pspConfig) {
//       var analytics=require("com/voltmxL/"+"texttospeech"+"/analytics");
//       analytics.notifyAnalytics();
      voltmxmp.logger.trace("----------Entering constructor---------", voltmxmp.logger.FUNCTION_ENTRY);
      this._minimumPitch = 0.5;
      this._deviceName = voltmx.os.deviceInfo().name;
      this.seed = Math.random();
      this._maximunPitch = 2.0;
      this._minimumSpeechRate = 0.0;
      this._maximumSpeechRate = 5.0;
      this._isSpeechOn = false;
      this.controllerImpl = new ControllerImplementation(this, baseConfig.id);
      voltmxmp.logger.trace("----------Exiting constructor ---------", voltmxmp.logger.FUNCTION_EXIT);
    },
    /**
         * @function initGetterSetters
         * @private
         * @description: Logic for getters/setters of custom properties
         */
    initGettersSetters: function() {
      voltmxmp.logger.trace("----------Entering initGetterSetters---------", voltmxmp.logger.FUNCTION_ENTRY);
      defineGetter(this, "setRate", function() {
        return this._setRate;
      });
      defineSetter(this, "setRate", function(val) {
        this.setSpeechRate(val);
      });
      defineGetter(this, "setIphoneLanguage", function() {
        return this._iphoneLanguage;
      });
      defineSetter(this, "setIphoneLanguage", function(val) {
        this._iphoneLanguage = val;
      });
      defineGetter(this, "setAndroidLanguage", function() {
        return this._androidLanguage;
      });
      defineSetter(this, "setAndroidLanguage", function(val) {
        this._androidLanguage = val;
      });
      defineGetter(this, "volume", function() {
        return this._volume;
      });
      defineSetter(this, "volume", function(val) {
        this._volume = Number(val);
      });
      defineGetter(this, "preUtteranceDelay", function() {
        return this._preUtteranceDelay;
      });
      defineSetter(this, "preUtteranceDelay", function(val) {
        this._preUtteranceDelay = Number(val);
      });
      defineGetter(this, "postUtteranceDelay", function() {
        return this._postUtteranceDelay;
      });
      defineSetter(this, "postUtteranceDelay", function(val) {
        this._postUtteranceDelay = Number(val);
      });
      defineGetter(this, "pitchMultiplier", function() {
        return this._pitchMultiplier;
      });
      defineSetter(this, "pitchMultiplier", function(val) {
        this.setPitchValue(Number(val));
      });
      defineGetter(this, "stopSpeechApibehaviour", function() {
        return this._stopSpeechAt;
      });
      defineSetter(this, "stopSpeechApibehaviour", function(val) {
        this._stopSpeechAt = val;
      });
      defineGetter(this, "setWebLanguage", function() {
        return this._setWebLanguage;
      });
      defineSetter(this, "setWebLanguage", function(val) {
        this._setWebLanguage = val;
      });
      defineGetter(this, "setPitch", function() {
        return this._setPitch;
      });
      defineSetter(this, "setPitch", function(val) {
        this._setPitch = Number(val);
      });
      defineGetter(this, "setWebVolume", function() {
        return this._setWebVolume;
      });
      defineSetter(this, "setWebVolume", function(val) {
        this._setWebVolume = Number(val);
      });
      voltmxmp.logger.trace("----------Exiting initGettersSetters ---------", voltmxmp.logger.FUNCTION_EXIT);
    },
    /**
         * @function setPitchValue
         * @private
         * @description: validate pitch value
         */
    setPitchValue: function(val) {
      try {
        voltmxmp.logger.trace("----------Entering setPitchValue Function---------", voltmxmp.logger.FUNCTION_ENTRY);
        if (val >= this._minimumPitch && val <= this._maximunPitch) {
          this._pitchMultiplier = val;
        } else {
          throw {
            "type": "CUSTOM",
            "Error": "InvalidValue",
            "message": "pitch value is too high or too low"
          };
        }
        voltmxmp.logger.trace("----------Exiting setPitchValue Function---------", voltmxmp.logger.FUNCTION_EXIT);
      } catch (exception) {
        voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
        if (exception.type === "CUSTOM") {
          throw exception;
        }
      }
    },
    /**
         * @function setSpeechRate
         * @private
         * @description: validate speech rate
         */
    setSpeechRate: function(val) {
      try {
        voltmxmp.logger.trace("----------Entering setSpeechRate Function---------", voltmxmp.logger.FUNCTION_ENTRY);
        if (val && !isNaN(Number(val))) {
          if (this._deviceName === "iPhone" || this._deviceName === "iPad") {
            if (val > AVSpeechUtteranceMinimumSpeechRate && val < AVSpeechUtteranceMaximumSpeechRate) {
              this._setRate = parseFloat(val);
            } else {
              throw {
                "type": "CUSTOM",
                "Error": "invalidvalue",
                "message": "speech rate is too high or too low"
              };
            }
          }
          if (this._deviceName === "android") {
            if (val > this._minimumSpeechRate && val < this._maximumSpeechRate) {
              this._setRate = parseFloat(val);
            } else {
              throw {
                "type": "CUSTOM",
                "Error": "invalidvalue",
                "message": "speech rate is too high or too low"
              };
            }
          }
          else if(this._deviceName.toLowerCase() === "thinclient"){
            this._setRate = parseFloat(val);
          }
        } else {
          throw {
            "type": "CUSTOM",
            "Error": "invalidNumber",
            "message": "setSpeechRate function doesn't accept null or invalid value"
          };
        }
        voltmxmp.logger.trace("----------Exiting setSpeechRate Function---------", voltmxmp.logger.FUNCTION_EXIT);
      } catch (exception) {
        voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
        this.endOfSpeech();
        if (exception.type === "CUSTOM") {
          throw exception;
        }
      }
    },
    /**
         * @function background
         * @private
         * @description: for android component on destroy is handled
         */
    background: function() {
      try {
        voltmxmp.logger.trace("----------Entering background Function---------", voltmxmp.logger.FUNCTION_ENTRY);
        if (this._isSpeechOn) {
          this.view.imgSpeechOn.setVisibility(false);
          this.view.imgSpeechOff.setVisibility(true);
          if (this.speechOff !== undefined && this.speechOff !== null) {
            this.speechOff();
          }
          this._isSpeechOn = false;
        }
        this.stopSpeech();
        voltmxmp.logger.trace("----------Exiting background Function---------", voltmxmp.logger.FUNCTION_EXIT);
      } catch (exception) {
        voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
        if (exception.type === "CUSTOM") {
          throw exception;
        }
      }

    },

    /**
         * @function onTTSSpeechStart
         * @private
         * @description: this function is called when speech is started
         */
    onTTSSpeechStart: function(s) {
      try {
        voltmxmp.logger.trace("----------Entering onAndroidSpeechStart Function---------", voltmxmp.logger.FUNCTION_ENTRY);
        voltmxmp.logger.info(s.toString(), voltmxmp.logger.SUCCESS_CALLBACK);
        voltmxmp.logger.trace("----------Exiting onAndroidSpeechStart Function---------", voltmxmp.logger.FUNCTION_EXIT);
      } catch (exception) {
        voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
        if (exception.type === "CUSTOM") {
          throw exception;
        }
      }
    },
    /**
         * @function speakOut
         * @private
         * @description: This function call individual platform functions
         */
    speakOut: function(text) {
      try {
        voltmxmp.logger.trace("----------Entering speakOut Function---------", voltmxmp.logger.FUNCTION_ENTRY);
        if (text !== undefined && text !== null && text !== "") {
          this.controllerImpl.speakTTS(text);
        } else {
          throw {
            "type": "CUSTOM",
            "Error": "invalidText",
            "message": "speakOut function doesn't accept null value"
          };
        }
        voltmxmp.logger.trace("----------Exiting speakOut Function---------", voltmxmp.logger.FUNCTION_EXIT);
      } catch (exception) {
        voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
        this.endOfSpeech();
        if (exception.type === "CUSTOM") {
          throw exception;
        }
      }
    },
    /**
         * @function stopSpeech
         * @private
         * @description: this function stops speaking
         */
    stopSpeech: function() {
      try {
        voltmxmp.logger.trace("----------Entering stopSpeech Function---------", voltmxmp.logger.FUNCTION_ENTRY);
        this.controllerImpl.stop();
        voltmxmp.logger.trace("----------Exiting stopSpeech Function---------", voltmxmp.logger.FUNCTION_EXIT);
      } catch (exception) {
        voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
        if (exception.type === "CUSTOM") {
          throw exception;
        }
      }
    },
    /**
         * @function endOfSpeech
         * @private
         * @description: this function is called when an end os speech
         */
    endOfSpeech: function() {
      try {
        voltmxmp.logger.trace("----------Entering endOfSpeech Function---------", voltmxmp.logger.FUNCTION_ENTRY);
        if (this._isSpeechOn) {
          this.speechOnClick();
        }
        voltmxmp.logger.trace("----------Exiting endOfSpeech Function---------", voltmxmp.logger.FUNCTION_EXIT);
      } catch (exception) {
        voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
        if (exception.type === "CUSTOM") {
          throw exception;
        }
      }
    },
    /**
         * @function speechClick
         * @private
         * @description: Ui changes
         */
    speechOnClick: function() {
      try {
        voltmxmp.logger.trace("----------Entering speechOnClick Function---------", voltmxmp.logger.FUNCTION_ENTRY);
        if (this._isSpeechOn) {
          this.view.imgSpeechOn.setVisibility(false);
          this.view.imgSpeechOff.setVisibility(true);
          this.view.forceLayout();
          if (this.speechOff !== undefined && this.speechOff !== null && typeof this.speechOff === 'function') {
            this.speechOff();
          }
          this._isSpeechOn = false;
        } else {
          this.view.imgSpeechOn.setVisibility(true);
          this.view.imgSpeechOff.setVisibility(false);
          this.view.forceLayout();
          this._isSpeechOn = true;
          if (this.speechOn !== undefined && this.speechOn !== null && typeof this.speechOn === 'function') {
            this.speechOn();
          }
        }
        voltmxmp.logger.trace("----------Exiting speechOnClick Function---------", voltmxmp.logger.FUNCTION_EXIT);
      } catch (exception) {
        voltmxmp.logger.error(JSON.stringify(exception), voltmxmp.logger.EXCEPTION);
        if (exception.type === "CUSTOM") {
          throw exception;
        }
      }
    }
  };
});