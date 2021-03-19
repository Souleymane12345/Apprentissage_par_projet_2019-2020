let detection = document.getElementById('video');
let startDemo = document.getElementById('start2');
//let p = document.getElementById('surveillance');
var sound = new Howl({
  src: ['/assets/tensorflow/police.mp3'],
  volume: 0.5
});


function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
  }

  if (getUserMediaSupported()) {
    startDemo.addEventListener('click', enableCam);
  } else {
    console.warn('getUserMedia() is not supported by your browser');
  }

function enableCam(event){
    if (!model) {
        return;
      }

      event.target.classList.add('disabled');
            
      const constraints = {
        video: true
      };
    
      navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        detection.srcObject = stream;
        detection.addEventListener('loadeddata', predictWebcam);
      });
}

// Placeholder function for next step.
function predictWebcam() {
}

// Store the resulting model in the global scope of our app.
var model = undefined;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment 
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
cocoSsd.load().then(function (loadedModel) {
  model = loadedModel;
  // Show demo section now model is ready to use.
});

var children = [];

function predictWebcam() {
  model.detect(video).then(function (predictions) {
    for (let i = 0; i < children.length; i++) {
      liveView.removeChild(children[i]);
    }
    children.splice(0);

    for (let n = 0; n < predictions.length; n++) {
        console.log(predictions[n].bbox);
        
      if (predictions[n].score > 0.8) {
        /*const p = document.createElement('p');
        p.innerText = predictions[n].class  + ' - with ' 
            + Math.round(parseFloat(predictions[n].score) * 100) 
            + '% confidence.';
        p.style = 'margin-left: ' + predictions[n].bbox[0] + 'px; margin-top: '
            + (predictions[n].bbox[1] - 10) + 'px; width: ' 
            + (predictions[n].bbox[2] - 10) + 'px; top: 0; left: 0;';

        const highlighter = document.createElement('div');
        highlighter.setAttribute('class', 'highlighter');
        highlighter.style = 'left: ' + predictions[n].bbox[0] + 'px; top: '
            + predictions[n].bbox[1] + 'px; width: ' 
            + predictions[n].bbox[2] + 'px; height: '
            + predictions[n].bbox[3] + 'px;';

        liveView.appendChild(highlighter);
        liveView.appendChild(p);
        children.push(highlighter);
        children.push(p);*/

        //p.innerHTML = "il y a quelquun dans la piece !";
        console.log('le voleurr');
        
        sound.play();
      } else {
       // p.innerHTML = "";
        sound.pause();
      }
      
    }
    
    window.requestAnimationFrame(predictWebcam);
  });
}


function stopSound() {
  if (sound.playing()) {
    sound.stop();
  }
}