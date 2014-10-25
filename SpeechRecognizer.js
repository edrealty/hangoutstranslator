/**
 * Created by Matt on 10/25/14.
 */

var recognition = new webkitSpeechRecognition();
recognition.continous = true;
recognition.interimResults = true;
var textArea = document.getElementById("inputID");
recognition.onresult = function (event) {

    // Calculating and saving the cursor position where the text will be displayed
    var pos = textArea.getCursorPosition() - interimResult.length;
    // Deleting an interim result from the textArea field
    textArea.val(textArea.val().replace(interimResult, ''));
    interimResult = '';
    // Restoring the cursor position
    textArea.setCursorPosition(pos);
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            insertAtCaret(textAreaID, event.results[i][0].transcript);
        } else {
            // Outputting the interim result to the text field and adding
            // an interim result marker - 0-length space
            insertAtCaret(textAreaID, event.results[i][0].transcript + '\u200B');
            interimResult += event.results[i][0].transcript + '\u200B';
        }
    }
};
recognition.lang("en");
