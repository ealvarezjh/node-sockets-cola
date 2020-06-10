# Sockets - Aplicación de cola

Es una aplicación web que genera y asigna tickets específicando un escritorio, cuenta con una pantalla pública para la visualización de los clientes.

Contiene los siguientes componentes:

- Este es un pequeño servidor de express listo para ejecutarse y servir la carpeta public en la web.

- Los tickets son registrados en un archivo .json.
    El cuál contiene:
        * Cantidad de tickets generados.
        * Fecha del día.
        * Tickets generados y/o pendientes.
        * Ticket atendidos y/o en cola.

- Uso de sockets para la actualización de pantalla pública y otras solicitudes del sistema.

* Se agregó un pequeño sonido al sistema al momente de atender tickets.

Recuerden que deben de reconstruir los módulos de node con el comando:

```
npm install
```