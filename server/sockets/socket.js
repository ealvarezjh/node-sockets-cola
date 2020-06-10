const { io } = require('../server');

const { TicketControl } = require('../classes/TicketControl');

let ticket = new TicketControl();


io.on('connection', (client) => {



    // Escuchar el cliente
    client.on('nuevoTicket', (data, callback) => {

        callback(ticket.siguienteTicket());

    });

    // Envíamos el último ticket registrado
    client.emit('estadoActual', {

        actual: ticket.getUltimoTicket(),
        ultimos4: ticket.getUltimos4()

    });


    // 
    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {

            callback({
                ok: false,
                msg: 'Es necesario indicar un escritorio.'
            });
        }

        let atenderTicket = ticket.atenderTicket(data.escritorio);

        callback(atenderTicket);


        client.broadcast.emit('ultimos4', {

            ultimos4: ticket.getUltimos4()
        });
    });
});