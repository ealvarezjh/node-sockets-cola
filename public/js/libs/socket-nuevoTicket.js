var socket = io();
var labelTicket = $('#lblNuevoTicket');

// on: controlar la conexión al server
socket.on('connect', function() {
    console.log(':online');
});

socket.on('disconnect', function() {
    console.log(':disconnected');
});

socket.on('estadoActual', function(data) {
    labelTicket.text(data.actual)
});


$('button').on('click', function() {

    socket.emit('nuevoTicket', null,

        function(siguienteTicket) {
            labelTicket.text(siguienteTicket);
        });
});