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
function captureVoice() {

    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    

    var id = gapi.hangout.getLocalParticipant().person.id;
    var transcriptid = id + "" + gapi.hangout.data.getValue(id);
    gapi.hangout.data.setValue(transcriptid, "");

    recognition.lang = gapi.hangout.data.getValue(id);

    var theirid = '';
    var theirtranscriptid = '';

    recognition.start();

    recognition.onresult = function(event) {
        //var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                line = event.results[i][0].transcript;

                console.log(line);

                id = gapi.hangout.getLocalParticipant().person.id;
                transcriptid = id + "" + gapi.hangout.data.getValue(id);

                console.log("my id " + id);
                console.log("mytranscriptid " + transcriptid);
                console.log("my language " + gapi.hangout.data.getValue(id));

                updateTranscript(transcriptid, gapi.hangout.data.getValue(id), line);
                if (gapi.hangout.getEnabledParticipants().length > 1) {
                    console.log("SomeoneElse");
                    for (i = 0; i < 2; i++) {
                        potentialid = gapi.hangout.getEnabledParticipants()[i].person.id;
                        if (id != potentialid) {
                            theirid = potentialid;
                            console.log(theirid);
                        }
                    }
                    console.log(gapi.hangout.data.getState());
                }
                if (theirid) {
                    theirtranscriptid = theirid + 
                        gapi.hangout.data.getValue(theirid);

                    updateTranscript(theirtranscriptid, 
                            gapi.hangout.data.getValue(theirid), line);

                    displayCaption(translateSentence(line, gapi.hangout.data.getValue(id), gapi.hangout.data.getValue(theirid)));
                } else {
                    displayCaption(translateSentence(line, gapi.hangout.data.getValue(id), gapi.hangout.data.getValue(id)));
                }

                    
                /*
                setTimeout(function() {
                    getTranscript(transcriptid);
                    if (theirtranscriptid) {
                        getTranscript(theirtranscriptid);
                    }
                }, 2000);
                */

            } else {
                //console.log(event.results[i][0].transcript);
                //displayCaption(event.results[i][0].transcript);
                //interim_transcript += event.results[i][0].transcript;
            }
        }
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

}

function updateTranscript(tid, lang, line) {
    //console.log("transcriptid " + tid);

    var currentTranscript = gapi.hangout.data.getState()[tid];
    //console.log("currentTranscript " + currentTranscript);
    
    currentTranscript += Date().toString() + " ";
    currentTranscript += gapi.hangout.getLocalParticipant().person.displayName;
    currentTranscript += ": " + line + "\n";

    //console.log("should be new " + currentTranscript);

    gapi.hangout.data.setValue("" + tid, "" + currentTranscript);
    //console.log("actually new " + gapi.hangout.data.getState()[tid]);
}
 

function getTranscript(tid) {
    final_transcript = gapi.hangout.data.getValue(tid);
    console.log("finaltranscript " + final_transcript);
    var data = { receiver: "orndorffgrant@gmail.com", 
        transcript: final_transcript };
    $.ajax({
        url: "https://morning-crag-1532.herokuapp.com/s",
        type: "POST",
        data: data//,
        //dataType: "jsonp"
    });

    return final_transcript;
}

/*
gapi.hangout.onParticipantsRemoved.add(function() {
    if (gapi.hangout.getParticipants().length == 1) {
        alert("HEY DONT LEAVE");
    }
});
*/

window.onbeforeunload = function() {
    confirm();
    alert();
}
