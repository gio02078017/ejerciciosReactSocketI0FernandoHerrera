//servidor express
//const app = require('express')();
const express = require('express');
const app = express();

//servidor de sockets
const server = require('http').createServer(app);

//configuracion del socket server
const io = require('socket.io')(server);

//Desplegar el directorio publico
app.use(express.static(__dirname +"/public"));

/*io.on('connection', () => { 
    console.log("cliente conectado");
});*/

io.on('connection', (socket) => { 
    console.log("cliente conectado");
    console.log(socket.id);
    //socket.emit('mensaje-bienvenida', 'Bienvenido al server');
    socket.emit('mensaje-bienvenida', {
        msg: 'Bienvenido al server',
        fecha: new Date() 
    });
    socket.on('mensaje-cliente', (data)=> {
        console.log(data);
    });
    socket.on('mensaje-to-server', (data)=> {
        console.log(data);
        //socket.emit solo envia al cliente que emitio antes
        //socket.emit('mensaje-from-server', data);
        
        //io.emit envia a todos los clientes conectados
        io.emit('mensaje-from-server', data);
    });
});

server.listen(8080, () => {
   console.log("Server corriendo en el puerto 8080"); 
});