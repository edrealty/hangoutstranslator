$(document).ready(function() {

    $('#stringToShow').on('change', function() {
        var temp = gapi.hangout.av.effects.createImageResource(
          createTextOverlay($(this).val()));
        // Create this non-moving overlay that will be 100% of the width
        // of the video feed.
        textOverlay = temp.createOverlay(
          {'scale':
           {'magnitude': 0.5,
            'reference': gapi.hangout.av.effects.ScaleReference.WIDTH}});
        // Put the text x-centered and near the bottom of the frame
        textOverlay.setPosition(0, 0.45);
    }

    // Track our overlays for re-use later
    var overlays = [];
    var textOverlay;

    /** Responds to buttons
     * @param {string} name Item to show.
     */
    function showOverlay(name) {
      hideAllOverlays();
      currentItem = name;
      setControlVisibility(true);
      overlays[currentItem].setVisible(true);
      updateControls();
    }

    function showNothing() {
      currentItem = null;
      hideAllOverlays();
      setControlVisibility(false);
    }

    function setControlVisibility(val) {
      if (val) {
        overlayControls.style.visibility = 'visible';
      } else {
        overlayControls.style.visibility = 'hidden';
      }
    }

    /** For removing every overlay */
    function hideAllOverlays() {
      for (var index in overlays) {
        overlays[index].setVisible(false);
      }
      disposeArbitraryOverlay();
      keepAnimating = false;
    }

    function createTextOverlay(string) {
      // Create a canvas to draw on
      var canvas = document.createElement('canvas');
      canvas.setAttribute('width', 166);
      canvas.setAttribute('height', 100);
      
      var context = canvas.getContext('2d');

      // Draw background
      context.fillStyle = '#BBB';
      context.fillRect(0,0,166,50);

      // Draw text
      context.font = '32pt Impact';
      context.lineWidth = 6;
      context.lineStyle = '#000';
      context.fillStyle = '#FFF';
      context.fillColor = '#ffff00';
      context.fillColor = '#ffff00';
      context.textAlign = 'center';
      context.textBaseline = 'bottom';
      context.strokeText(string, canvas.width / 2, canvas.height / 2);
      context.fillText(string, canvas.width / 2, canvas.height / 2);

      return canvas.toDataURL();
    }

    /** Initialize our constants, build the overlays */
    function createOverlays() {
      var fancy = gapi.hangout.av.effects.createImageResource(
          createTextOverlay('Hello!'));
      // Create this non-moving overlay that will be 100% of the width
      // of the video feed.
      overlays['fancy'] = fancy.createOverlay(
          {'scale':
           {'magnitude': 0.5,
            'reference': gapi.hangout.av.effects.ScaleReference.WIDTH}});
      // Put the text x-centered and near the bottom of the frame
      overlays['fancy'].setPosition(0, 0.45);
    }

    // Animated
    var frameCount = 0;

    var animatedResource = null;
    var animatedOverlay = null;

    function updateAnimatedOverlay(time) {  
        var oldResource = animatedResource;
        var oldOverlay = animatedOverlay;

        animatedResource = gapi.hangout.av.effects.createImageResource(
        createTextOverlay('Tick: ' + frameCount));
        // Create this non-moving overlay that will be 50% of the width
        // of the video feed.
        animatedOverlay = animatedResource.createOverlay(
        {'scale':
         {'magnitude': 0.5,
              'reference': gapi.hangout.av.effects.ScaleReference.WIDTH}});
        // Put the text x-centered and near the bottom of the frame
        animatedOverlay.setPosition(0, 0.45);
        animatedOverlay.setVisible(true);

        if (oldResource) {
        // This will also dispose of the related overlay.
        oldResource.dispose();
        oldResource = null;
        }
    }

    function animLoop() {
        if (keepAnimating) {
        window.setTimeout(animLoop, 1000);
        frameCount++;
        updateAnimatedOverlay(frameCount);
        }
    }

    function showAnimatedOverlay() {
        showNothing();
        keepAnimating = true;
        animLoop();
    }

    createOverlays();

    // SOUND

    function init() {
      gapi.hangout.onApiReady.add(function(eventObj) {
        console.log("everything ready");
        document.querySelector('#fullUI').style.visibility = 'visible';
      });
    }

    gadgets.util.registerOnLoadHandler(init);
}
