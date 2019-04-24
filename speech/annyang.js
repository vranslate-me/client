import {ReactNativeContext, Module} from 'react-360-web';

export default class Annyang extends Module {
  _rnctx: ReactNativeContext;
  recognition: Object;

  constructor(ctx) {
    super("Annyang")

    // Variables
    this._rnctx = ctx;

    if(annyang)
      // console.log("annyang init success");
      annyang.setLanguage('id')
  }

  setNativeContext(rnctx: ReactNativeContext) {
    // Context
    this._rnctx = rnctx;
  }

  setLanguage(language) {
    if(annyang) {
      // console.log('set language to', language)
      annyang.setLanguage(language)
    }
  }

  $start(resolve,reject) {
    this.startListening();

    // Get the speech recognition from annyang
    this.recognition = annyang.getSpeechRecognizer();

    var thisRef = this;

    // Override method onresult
    this.recognition.onresult = function(event) {

      // Get the speech result
      var SpeechResults = event.results[event.resultIndex];

      if(thisRef._rnctx !== 'undefined')
        thisRef._rnctx.invokeCallback(resolve, [SpeechResults[0].transcript]);

    }

  }


  startListening() {
    // Stop annyang if its listening
    if(annyang.isListening) {
      stop();
    }
    // Start again
    // console.log("Start");
    annyang.start();
  }

  stop() {
    annyang.abort()
    // console.log("Stop")
  }

}