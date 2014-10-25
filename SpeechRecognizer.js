/**
 * Created by Matt on 10/25/14.
 */

var recognition = new webkitSpeechRecognition();
recognition.continous = true;
recognition.interimResults = true;
recognition.onresult = function(event) {
    console.log(event);
}
recognition.lang("en");
recognition.start();