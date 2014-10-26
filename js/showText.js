// Track our overlays for re-use later
var textOverlay;
var lastOverlay;

function createTextOverlay(string) {
  // Create a canvas to draw on
  var canvas = document.createElement('canvas');
  canvasWidth = 4000;
  canvasHeight = 800;
  canvas.setAttribute('width', canvasWidth);
  canvas.setAttribute('height', canvasHeight);
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  
  var context = canvas.getContext('2d');
  /*
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  */

  context.imageSmoothingEnabled = true;

  // Draw text
  context.font = '256pt serif';
  context.lineWidth = 10;
  context.lineStyle = '#000000';
  context.fillStyle = '#FFFFFF';
  context.textAlign = 'center';
  context.textBaseline = 'bottom';
  context.strokeText(string, canvas.width / 2, canvas.height / 2);
  context.fillText(string, canvas.width / 2, canvas.height / 2);

  return canvas.toDataURL();
}

function displayCaption(string) {
    lastOverlay = textOverlay;

    var temp = gapi.hangout.av.effects.createImageResource(
      createTextOverlay(string));
    // Create this non-moving overlay that will be 100% of the width
    // of the video feed.
    textOverlay = temp.createOverlay(
      {'scale':
       {'magnitude': 0.5,
        'reference': gapi.hangout.av.effects.ScaleReference.WIDTH}});
    // Put the text x-centered and near the bottom of the frame
    textOverlay.setPosition(0, 0.45);

    if (lastOverlay != null) {
        lastOverlay.setVisible(false);
    }
    textOverlay.setVisible(true);
}


function init() {
    gapi.hangout.onApiReady.add(function(eventObj) {
        console.log("everything ready");

        gapi.hangout.data.setValue(
            gapi.hangout.getLocalParticipant().person.id, "en");
        console.log("my language " + gapi.hangout.data.getState()[gapi.hangout.getLocalParticipant().person.id]);

        $('#mylanguage').on('change', function() {
            gapi.hangout.data.setValue(
                gapi.hangout.getLocalParticipant().person.id, $("#mylanguage").val());

        console.log("my language " + gapi.hangout.data.getState()[gapi.hangout.getLocalParticipant().person.id]);
        });

        $('#startTranslation').on('click', function() {
            setTimeout(function() {
                captureVoice();
            }, 2000);
        });

        $('sendTranscript').on('click', function() {
            var id = gapi.hangout.getLocalParticipant().person.id;
            var tid = id + gapi.hangout.data.getValue(id);
            getTranscript(tid);
        });
    });
}

gadgets.util.registerOnLoadHandler(init);

