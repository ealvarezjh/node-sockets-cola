var socket = io();
var labelTicket = $('small');

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {

    window.location = 'index.html';
    throw new Error('El necesario indicar el escritorio.')
}

var escritorio = searchParams.get('escritorio');

$('#escritorio').text('Escritorio ' + escritorio);

$('#btnAsignar').on('click', function() {

    socket.emit('atenderTicket', { escritorio },

        function(resp) {

            if (resp === 'No hay tickets pendientes.') {
                labelTicket.text(resp);
                alert(resp);
                return;
            }

            labelTicket.text('Ticket ' + resp.numeroTicket)

        });

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
});