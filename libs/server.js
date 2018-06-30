import express from 'express';
import SocketIo from 'socket.io';

export default function startServer(port) {
    let io = SocketIo(http);
    const app = express();
    let status;

    app.get('/', function (req, res) {
        return status;
    });
    app.listen(port, function () {
        console.log('motion sensor listening on port ' + port + '!');
    });

    return function(data) {
        status = data;
        io.emit(data, { for: 'everyone' });
    }
}
