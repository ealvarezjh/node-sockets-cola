const fs = require('fs');

// Representa un ticket generado a un escritorio especifico
class Ticket {

    constructor(numeroTicket, escritorioAsignado) {
        this.numeroTicket = numeroTicket;
        this.escritorioAsignado = escritorioAsignado;
    }
}


class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();

        this.ticketsPendientes = []; // contiene los tickets en cola sin resolver
        this.ticketsEnAtencion = [];

        let data = require('../data/data.json');

        if (this.hoy === data.hoy) {

            this.ultimo = data.ultimo;
            // carga los tickets en cola desde el archivo data.json
            this.ticketsPendientes = data.tickets;
            this.ticketsEnAtencion = data.ticketsEnAtencion;

        } else {

            this.reiniciarTicket();
        }

    }


    // Método para continuar con el conteo
    siguienteTicket() {

        this.ultimo += 1;

        // agregamos un nuevo ticket a la cola
        let ticket = new Ticket(this.ultimo, null);
        this.ticketsPendientes.push(ticket);


        this.grabarData();

        return `Ticket ${ this.ultimo }`;
    }


    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`;
    }


    getUltimos4() {
        return this.ticketsEnAtencion;

    }



    atenderTicket(escritorioAsignado) {

        if (this.ticketsPendientes.length == 0) {
            return 'No hay tickets pendientes.';
        }

        // console.log(this.ticketsPendientes.length);
        let numeroTicket = this.ticketsPendientes[0].numeroTicket;
        this.ticketsPendientes.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorioAsignado);
        this.ticketsEnAtencion.unshift(atenderTicket);

        // Se atenderan solo 4 tickets a la vez
        if (this.ticketsEnAtencion.length > 4) {
            this.ticketsEnAtencion.splice(-1, 1);
        }

        console.log('ultimos 4');
        console.log(this.ticketsEnAtencion);

        this.grabarData();

        return atenderTicket;
    }


    // Método para reiniciar el conteo (cada día)
    reiniciarTicket() {

        this.ultimo = 0;
        this.ticketsPendientes = [];
        this.ticketsEnAtencion = [];

        console.log('Conteo de tickets reiniciado...');
        this.grabarData();
    }


    // Método general para grabar cambios en data.json
    grabarData() {

        let nuevaData = {
            ultimo: this.ultimo,
            hoy: this.hoy,

            // se actualiza la data de tickets en cola cada vez que se llame al método grabarData()
            tickets: this.ticketsPendientes,
            ticketsEnAtencion: this.ticketsEnAtencion
        }

        let nuevaDataString = JSON.stringify(nuevaData);
        fs.writeFileSync('./server/data/data.json', nuevaDataString);

    }
}


module.exports = {

    TicketControl

}