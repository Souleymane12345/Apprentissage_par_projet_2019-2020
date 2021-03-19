document.querySelector('#start').addEventListener('click', function (e) {
    navigator.getUserMedia({
        video: true,
        audio: true
    }, function (stream) {
        document.getElementById('cadre').style.display = "block";
        let video = document.querySelector('#live');
        video.volume = 0
    
        video.srcObject = stream
        video.play();
    }, function() {})
})