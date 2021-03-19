
$(function() {
    var socket = io.connect('https://localhost:7560');

    $('#btn_on').click(function(){
        socket.emit('boutton_led', '1');
    });

    $('#btn_off').click(function(){
        socket.emit('boutton_led', '0');
    });
    
    $('#btn_on1').click(function(){
        socket.emit('boutton_led', '2');
    });

    $('#btn_off1').click(function(){
        socket.emit('boutton_led', '3');
    });

    $('#btn_on2').click(function(){
        socket.emit('boutton_led', '4');
    });

    $('#btn_off2').click(function(){
        socket.emit('boutton_led', '5');
    });

    $('#prise_on1').click(function(){
        socket.emit('boutton_led', 'E');
    });

    $('#prise_off1').click(function(){
        socket.emit('boutton_led', 'F');
    });

    $('#rob_on1').click(function(){
        socket.emit('boutton_led','G');
    });

    $('#rob_off1').click(function(){
        socket.emit('boutton_led','H');
    });


    // iniit 

    socket.emit('boutton_led', '0');
})

