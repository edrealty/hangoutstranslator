/**
 * Created by Matt on 10/25/14.
 */

/*
var getWords = function() {

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en";

    recognition.start();
    recognition.onresult = function (event) {
        for (var i = 0; i < event.results.length; i++) {
            console.log(event.results[i][0].transcript);
            displayCaption(event.results[i][0].transcript);
        }
        //$(document).trigger("got_line");
        getWords();
    };

}

getWords();
//$(document).on("got_line", function() { getWords() });
*/

var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;


final_transcript = '';
recognition.start();

recognition.onresult = function(event) {
    //var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            console.log(event.results[i][0].transcript);
            displayCaption(event.results[i][0].transcript);

            final_transcript += Date().toString() + " ";
            final_transcript += gapi.hangout.getLocalParticipant().person.displayName;
            final_transcript += ": " + event.results[i][0].transcript + "\n";
        } else {
            //console.log(event.results[i][0].transcript);
            //displayCaption(event.results[i][0].transcript);
            //interim_transcript += event.results[i][0].transcript;
        }
    }
    getTranscript();
}

recognition.onerror = function(event) {
    console.log("ERROR");
}
recognition.onstart = function(event) {
    console.log("STARTING");
}
recognition.onend = function(event) {
    console.log("STOPPING");
    recognition.start();
}


function getTranscript() {
    console.log(final_transcript);
    return final_transcript;
}

gapi.hangout.onParticipantsRemoved.add(function() {
    if (gapi.hangout.getParticipants().length == 1) {
        alert("HEY DONT LEAVE");
    }
});
