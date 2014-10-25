/**
 * Created by Matt on 10/25/14.
 */



var getWords = function() {

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en";

    recognition.start();
    recognition.onresult = function (event) {
        for (var i = 0; i < event.results.length; i++) {
            console.log(event.results[i][0].transcript);
        }
        $(document).trigger("got_line");
    };

}
